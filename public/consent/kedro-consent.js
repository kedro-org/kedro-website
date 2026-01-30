/**
 * Kedro Ecosystem Consent Management
 * ===================================
 *
 * Manages cookie consent and analytics across all Kedro web properties:
 * - kedro.org, demo.kedro.org, docs.kedro.org
 *
 * Usage: <script src="https://kedro.org/consent/kedro-consent.js" defer></script>
 *
 * @version 1.0.0
 * @license Apache-2.0
 */

(function () {
  'use strict';

  // ============================================
  // CONSTANTS
  // ============================================

  const LOG_PREFIX = '[kedro-consent]';

  const HEAP_METHODS = [
    'addEventProperties',
    'addUserProperties',
    'clearEventProperties',
    'identify',
    'resetIdentity',
    'removeEventProperty',
    'setEventProperties',
    'track',
    'unsetEventProperty'
  ];

  const CONFIG = {
    revision: 1,
    cookieName: 'kedro_cc',
    cookieExpiry: 182, // ~6 months
    defaultHeapId: '4039408868'
  };

  /**
   * Get the base URL for vendor assets.
   * - On localhost: use relative path (local files)
   * - On production: use absolute kedro.org URL
   */
  function getVendorBaseUrl() {
    const hostname = window.location.hostname;
    
    // Localhost - use relative path for local development
    if (hostname === 'localhost' || hostname === '127.0.0.1') {
      return '/consent/vendor';
    }
    
    // Production - always load from kedro.org (single source of truth)
    return 'https://kedro.org/consent/vendor';
  }

  // Heap App IDs mapped by hostname/path pattern
  const HEAP_IDS = {
    'kedro.org': { prod: '666783228', dev: '801262615' },
    'demo.kedro.org': { prod: '2388822444' },
    'demo.kedro.org/kedro-builder': { prod: '4039408868' },
    'docs.kedro.org': { prod: '537308175', dev: '2164194004' },
    'docs.kedro.org/projects/kedro-viz': { prod: '522942930', dev: '2164194004' },
    'docs.kedro.org/projects/kedro-datasets': { prod: '1625763777', dev: '2164194004' }
  };

  const COLORS = {
    accent: '#ffc900',
    accentHover: '#e6b500',
    bgGrey: '#1e1e1f',
    bgGreyLight: '#151515',
    bgGreyHover: '#2a2a2a',
    fontDark: '#0b0b0b',
    fontGrey: '#8e8e8e',
    fontWhite: '#ffffff',
    greyBorder: '#434343'
  };

  // ============================================
  // UTILITY HELPERS
  // ============================================

  function log(message, data) {
    if (data !== undefined) {
      console.debug(LOG_PREFIX, message, data);
    } else {
      console.debug(LOG_PREFIX, message);
    }
  }

  function logError(message, error) {
    console.error(LOG_PREFIX, message, error || '');
  }

  function logWarn(message) {
    console.warn(LOG_PREFIX, message);
  }

  function isLocalhost(hostname) {
    const h = hostname || window.location.hostname;
    return h === 'localhost' || h === '127.0.0.1';
  }

  function isKedroDomain(hostname) {
    const h = hostname || window.location.hostname;
    return h === 'kedro.org' ||
      h === 'www.kedro.org' ||
      h.endsWith('.kedro.org');
  }

  // ============================================
  // HEAP STUB (Queue calls before consent)
  // ============================================

  function createHeapStub() {
    // Already loaded by Heap itself
    if (window.heap && window.heap.loaded) {
      return;
    }

    // Existing non-array stub from another script - mark as stubbed and keep it
    if (window.heap && !Array.isArray(window.heap)) {
      window.heap.stubbed = true;
      return;
    }

    // Preserve any existing queue
    const queue = Array.isArray(window.heap) ? window.heap : [];
    window.heap = queue;
    window.heap.stubbed = true;

    // Stub all Heap methods to queue calls
    HEAP_METHODS.forEach((method) => {
      window.heap[method] = (...args) => {
        queue.push([method, ...args]);
      };
    });
  }

  // Initialize stub immediately
  createHeapStub();

  // ============================================
  // ENVIRONMENT & HEAP ID DETECTION
  // ============================================

  function getEnvironment() {
    const hostname = window.location.hostname;
    const pathname = window.location.pathname;

    // Only docs.kedro.org uses dev environment for /latest/
    if (hostname === 'docs.kedro.org' && pathname.includes('/latest/')) {
      return 'dev';
    }
    return 'prod';
  }

  function getHeapAppId() {
    let hostname = window.location.hostname;

    if (isLocalhost(hostname)) {
      return CONFIG.defaultHeapId;
    }

    const pathname = window.location.pathname;
    const env = getEnvironment();

    // Handle www prefix
    if (hostname === 'www.kedro.org') {
      hostname = 'kedro.org';
    }

    // Try path-specific match first (more specific)
    const pathKeys = Object.keys(HEAP_IDS).filter((key) => key.includes('/'));

    for (const key of pathKeys) {
      const parts = key.split('/');
      const keyHost = parts[0];
      const keyPath = `/${parts.slice(1).join('/')}`;

      if (hostname === keyHost && pathname.startsWith(keyPath)) {
        const config = HEAP_IDS[key];
        return config[env] || config.prod || CONFIG.defaultHeapId;
      }
    }

    // Try hostname-only match
    if (HEAP_IDS[hostname]) {
      const hostConfig = HEAP_IDS[hostname];
      return hostConfig[env] || hostConfig.prod || CONFIG.defaultHeapId;
    }

    return CONFIG.defaultHeapId;
  }

  // ============================================
  // COOKIE HELPERS
  // ============================================

  /**
   * Get cookie domain for consent cookie.
   * Returns null for localhost/non-kedro domains to avoid invalid cookies.
   * Returns '.kedro.org' for production to enable cross-subdomain sharing.
   */
  function getCookieDomain() {
    const hostname = window.location.hostname;

    // Localhost - omit domain attribute (return null)
    if (isLocalhost(hostname)) {
      return null;
    }

    // Production kedro domains - use .kedro.org for cross-subdomain sharing
    if (isKedroDomain(hostname)) {
      return '.kedro.org';
    }

    // Other domains - omit domain attribute to avoid invalid cookies
    return null;
  }

  /**
   * Check if any Heap cookies exist.
   */
  function hasHeapCookies() {
    const cookies = document.cookie.split(';');
    return cookies.some((cookie) => cookie.trim().startsWith('_hp'));
  }

  /**
   * Clear all Heap cookies (_hp*).
   * Called when user withdraws consent or when no valid consent exists.
   */
  function clearHeapCookies() {
    try {
      const cookieDomain = getCookieDomain();
      const hostname = window.location.hostname;
      const domains = cookieDomain ? [cookieDomain, hostname] : [hostname];
      const cookies = document.cookie.split(';');
      let cleared = false;

      cookies.forEach((cookie) => {
        const name = cookie.split('=')[0].trim();
        if (name.startsWith('_hp')) {
          cleared = true;
          domains.forEach((domain) => {
            document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=${domain}`;
            document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
          });
        }
      });

      if (cleared) {
        log('Heap cookies cleared');
      }
    } catch (e) {
      logError('Failed to clear Heap cookies:', e);
    }
  }

  // ============================================
  // ASSET LOADING
  // ============================================

  function loadAsset(type, url) {
    return new Promise((resolve, reject) => {
      let el;

      if (type === 'css') {
        el = document.createElement('link');
        el.rel = 'stylesheet';
        el.href = url;
        el.onload = resolve;
        // Don't block consent init if CSS fails - just log and continue
        el.onerror = () => {
          logError('Failed to load CSS:', url);
          resolve(); // Resolve anyway to not block initialization
        };
      } else {
        el = document.createElement('script');
        el.src = url;
        el.onload = resolve;
        el.onerror = () => {
          logError('Failed to load script:', url);
          reject(new Error(`Script load failed: ${url}`));
        };
      }

      document.head.appendChild(el);
    });
  }

  // ============================================
  // HEAP ANALYTICS
  // ============================================

  function loadHeap() {
    const appId = getHeapAppId();

    if (!appId) {
      log('Heap disabled for this environment');
      return;
    }

    // Already loaded
    if (window.heap && window.heap.loaded) {
      log('Heap already loaded');
      return;
    }

    // Prevent duplicate loads
    if (window.kedroHeapLoading) {
      return;
    }
    window.kedroHeapLoading = true;

    // Preserve queued calls before replacing heap object
    const queuedCalls = Array.isArray(window.heap) ? window.heap.slice() : [];
    const wasStubbed = window.heap && window.heap.stubbed;
    let replayed = false;

    function replayQueuedCalls() {
      if (replayed || !wasStubbed || queuedCalls.length === 0) {
        return;
      }
      replayed = true;

      log(`Replaying ${queuedCalls.length} queued Heap calls`);
      queuedCalls.forEach((call) => {
        if (Array.isArray(call) && call.length > 0) {
          const [method, ...args] = call;
          if (window.heap && typeof window.heap[method] === 'function') {
            window.heap[method](...args);
          }
        }
      });
    }

    // Initialize Heap
    window.heap = [];
    window.heap.appid = appId;
    window.heap.config = {
      disableTextCapture: true,
      secureCookie: true
    };

    // Create method stubs for Heap's async loading
    HEAP_METHODS.forEach((method) => {
      window.heap[method] = (...args) => {
        window.heap.push([method, ...args]);
      };
    });

    // Load Heap script
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://cdn.heapanalytics.com/js/heap-${appId}.js`;

    script.onload = () => {
      replayQueuedCalls();
      window.kedroAnalyticsReady = true;
      dispatchReadyEvent();
      log('Heap loaded with App ID:', appId);
    };

    script.onerror = () => {
      logError('Failed to load Heap script');
      window.kedroHeapLoading = false;
      
      // Dispatch failure event so listeners know Heap won't load
      dispatchAnalyticsFailedEvent();
    };

    document.head.appendChild(script);
  }

  function dispatchReadyEvent() {
    try {
      window.dispatchEvent(new CustomEvent('kedro:analytics:ready'));
    } catch (e) {
      logWarn('Could not dispatch analytics ready event');
    }
  }

  function dispatchAnalyticsFailedEvent() {
    try {
      window.dispatchEvent(new CustomEvent('kedro:analytics:failed'));
    } catch (e) {
      // Silently fail
    }
  }

  // ============================================
  // CUSTOM STYLES
  // ============================================

  function injectCustomStyles() {
    const styles = [
      '/* Kedro Consent Branding */',
      ':root {',
      `  --cc-bg: ${COLORS.bgGrey};`,
      `  --cc-primary-color: ${COLORS.fontWhite};`,
      `  --cc-secondary-color: ${COLORS.fontGrey};`,
      `  --cc-btn-primary-bg: ${COLORS.accent};`,
      `  --cc-btn-primary-color: ${COLORS.fontDark};`,
      `  --cc-btn-primary-hover-bg: ${COLORS.accentHover};`,
      `  --cc-btn-primary-hover-color: ${COLORS.fontDark};`,
      `  --cc-btn-secondary-bg: ${COLORS.bgGreyLight};`,
      `  --cc-btn-secondary-color: ${COLORS.fontWhite};`,
      `  --cc-btn-secondary-hover-bg: ${COLORS.bgGreyHover};`,
      `  --cc-btn-secondary-hover-color: ${COLORS.fontWhite};`,
      `  --cc-separator-border-color: ${COLORS.greyBorder};`,
      `  --cc-cookie-category-block-bg: ${COLORS.bgGreyLight};`,
      `  --cc-cookie-category-block-hover-bg: ${COLORS.bgGreyHover};`,
      `  --cc-toggle-readonly-bg: ${COLORS.accent};`,
      `  --cc-toggle-on-bg: ${COLORS.accent};`,
      '  --cc-overlay-bg: rgba(0, 0, 0, 0.65);',
      '}',
      '',
      '#cc-main {',
      '  font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;',
      '}',
      '',
      '.cm__btn, .pm__btn {',
      '  border-radius: 4px;',
      '  font-weight: 500;',
      '}',
      '',
      '.cm__title, .pm__title {',
      '  font-weight: 600;',
      '}'
    ];

    const styleEl = document.createElement('style');
    styleEl.id = 'kedro-consent-styles';
    styleEl.textContent = styles.join('\n');
    document.head.appendChild(styleEl);
  }

  // ============================================
  // COOKIECONSENT CONFIGURATION
  // ============================================

  function getCookieConsentConfig() {
    const cookieDomain = getCookieDomain();

    // Build cookie config - only include domain if valid
    const cookieConfig = {
      name: CONFIG.cookieName,
      path: '/',
      secure: window.location.protocol === 'https:',
      expiresAfterDays: CONFIG.cookieExpiry,
      sameSite: 'Lax'
    };

    if (cookieDomain) {
      cookieConfig.domain = cookieDomain;
    }

    return {
      root: document.body,
      mode: 'opt-in',
      autoShow: true,
      revision: CONFIG.revision,
      manageScriptTags: false,
      autoClearCookies: true,
      hideFromBots: true,

      cookie: cookieConfig,

      guiOptions: {
        consentModal: {
          layout: 'bar inline',
          position: 'bottom',
          equalWeightButtons: true,
          flipButtons: false
        },
        preferencesModal: {
          layout: 'box',
          position: 'right',
          equalWeightButtons: true,
          flipButtons: false
        }
      },

      categories: {
        necessary: { enabled: true, readOnly: true },
        analytics: {
          enabled: false,
          readOnly: false,
          autoClear: {
            cookies: [{ name: /^_hp/ }],
            reloadPage: false
          }
        }
      },

      language: {
        default: 'en',
        autoDetect: 'document',
        translations: {
          en: getEnglishTranslations()
        }
      },

      onFirstConsent: handleConsent,
      onConsent: handleConsent,
      onChange: handleConsentChange
    };
  }

  function getEnglishTranslations() {
    return {
      consentModal: {
        title: 'We value your privacy',
        description: 'We use analytics cookies to understand how you use our website and improve your experience. You can accept or decline analytics cookies below.',
        acceptAllBtn: 'Accept Analytics',
        acceptNecessaryBtn: 'Decline Analytics',
        showPreferencesBtn: 'Manage Preferences'
      },
      preferencesModal: {
        title: 'Cookie Preferences',
        acceptAllBtn: 'Accept Analytics',
        acceptNecessaryBtn: 'Decline Analytics',
        savePreferencesBtn: 'Save Preferences',
        closeIconLabel: 'Close',
        sections: [
          {
            title: 'Cookie Usage',
            description: 'We use cookies to ensure the basic functionalities of the website and to enhance your online experience. You can choose to opt-in or opt-out of analytics cookies.'
          },
          {
            title: 'Strictly Necessary Cookies',
            description: 'This category includes only the consent preference cookie that remembers your choice. No other cookies are set without your permission.',
            linkedCategory: 'necessary',
            cookieTable: {
              caption: 'Necessary cookies',
              headers: {
                name: 'Name',
                domain: 'Domain',
                description: 'Description',
                expiration: 'Expiration'
              },
              body: [{
                name: CONFIG.cookieName,
                domain: '.kedro.org',
                description: 'Stores your cookie consent preferences.',
                expiration: '6 months'
              }]
            }
          },
          {
            title: 'Analytics Cookies',
            description: 'These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously.',
            linkedCategory: 'analytics',
            cookieTable: {
              caption: 'Analytics cookies',
              headers: {
                name: 'Name',
                domain: 'Domain',
                description: 'Description',
                expiration: 'Expiration'
              },
              body: [{
                name: '_hp2_*',
                domain: '.kedro.org',
                description: 'Heap Analytics - Used to track user interactions and improve our services.',
                expiration: '1 year'
              }]
            }
          }
        ]
      }
    };
  }

  // ============================================
  // CONSENT HANDLERS
  // ============================================

  function handleConsent(param) {
    log('Consent:', param.cookie);
    if (CookieConsent.acceptedCategory('analytics')) {
      loadHeap();
    }
  }

  function handleConsentChange(param) {
    log('Consent changed:', param.changedCategories);

    if (param.changedCategories.includes('analytics')) {
      if (CookieConsent.acceptedCategory('analytics')) {
        loadHeap();
      } else {
        clearHeapCookies();
      }
    }
  }

  // ============================================
  // INITIALIZATION
  // ============================================

  function initCookieConsent() {
    if (typeof CookieConsent === 'undefined') {
      logError('CookieConsent library not loaded');
      return;
    }

    clearOrphanedHeapCookies();

    CookieConsent.run(getCookieConsentConfig());
    log('CookieConsent initialized');
  }

  /**
   * Clear Heap cookies if they exist without valid analytics consent.
   * Handles edge cases where consent cookie is missing/expired but Heap cookies remain.
   */
  function clearOrphanedHeapCookies() {
    // Check if consent cookie exists
    const consentCookie = document.cookie
      .split(';')
      .find((c) => c.trim().startsWith(`${CONFIG.cookieName}=`));

    // If no consent cookie but Heap cookies exist, clear them
    if (!consentCookie && hasHeapCookies()) {
      log('Clearing orphaned Heap cookies (no valid consent found)');
      clearHeapCookies();
    }
  }

  function bootstrap() {
    const vendorUrl = getVendorBaseUrl();

    loadAsset('css', `${vendorUrl}/cookieconsent.css`)
      .then(() => {
        injectCustomStyles();
        return loadAsset('script', `${vendorUrl}/cookieconsent.umd.js`);
      })
      .then(initCookieConsent)
      .catch((error) => {
        logError('Failed to initialize:', error);
        // Fail-safe: Don't load Heap if consent system fails
      });
  }

  // ============================================
  // MAIN ENTRY POINT
  // ============================================

  try {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', bootstrap);
    } else {
      bootstrap();
    }
  } catch (error) {
    logError('Critical error:', error);
  }

})();
