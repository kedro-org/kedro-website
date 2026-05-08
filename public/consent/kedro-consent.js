/**
 * Kedro Consent Management
 * ===================================
 *
 * Manages cookie consent and analytics across all Kedro web properties:
 * - kedro.org, demo.kedro.org, docs.kedro.org
 *
 * Usage: <script src="https://kedro.org/consent/kedro-consent.js" defer></script>
 *
 * Optional per-site override — declare your own Heap App ID instead of using
 * central HEAP_ROUTES:
 *   <script src=".../kedro-consent.js" data-heap-id="123456789" defer></script>
 *
 * @version 1.0.0
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

  const MAX_QUEUE_SIZE = 100;

  const CONFIG = {
    revision: 1,
    cookieName: 'kedro_cc',
    cookieExpiry: 182, // ~6 months
    defaultHeapId: '4039408868'
  };

  /**
   * Derive the vendor folder URL from the consent script's own src.
   * Vendor files live next to kedro-consent.js, so wherever the script
   * was loaded from is where its vendor folder is.
   */
  function getVendorBaseUrl() {
    try {
      const scriptEl = document.querySelector('script[src*="kedro-consent"]');
      if (scriptEl && scriptEl.src) {
        const url = new URL(scriptEl.src);
        const vendorPath = url.pathname.replace(/\/[^/]+$/, '/vendor');
        return `${url.origin}${vendorPath}`;
      }
    } catch (e) {
      // Fall through to fallback
    }
    return 'https://kedro.org/consent/vendor';
  }

  // Shared across all docs.kedro.org dev environments (/latest/ pages)
  const DOCS_DEV_SHARED = '2164194004';

  const HEAP_IDS = {
    KEDRO_ORG: { prod: '666783228', dev: '801262615' },
    DEMO: { prod: '2388822444' },
    DEMO_BUILDER: { prod: '4039408868' },
    DOCS: { prod: '537308175', dev: DOCS_DEV_SHARED },
    DOCS_VIZ: { prod: '522942930', dev: DOCS_DEV_SHARED },
    DOCS_DATASETS: { prod: '1625763777', dev: DOCS_DEV_SHARED }
  };

  // Ordered most-specific-first; first match wins.
  // Path-specific routes MUST precede the hostname-only route for the same host.
  const HEAP_ROUTES = [
    { host: 'demo.kedro.org', path: '/kedro-builder', ids: HEAP_IDS.DEMO_BUILDER },
    { host: 'docs.kedro.org', path: '/projects/kedro-viz', ids: HEAP_IDS.DOCS_VIZ },
    { host: 'docs.kedro.org', path: '/projects/kedro-datasets', ids: HEAP_IDS.DOCS_DATASETS },
    { host: 'docs.kedro.org', ids: HEAP_IDS.DOCS },
    { host: 'demo.kedro.org', ids: HEAP_IDS.DEMO },
    { host: 'kedro.org', ids: HEAP_IDS.KEDRO_ORG }
  ];

  // Theme palettes — colours from Figma "Privacy-Banner_Light-Mode" / "Dark-Mode"
  const LIGHT_COLORS = {
    bg: '#ffffff',
    title: '#242424',
    body: '#747474',
    accent: '#ffc900',
    accentHover: '#e6b500',
    accentText: '#000000',
    outlinedBorder: '#242424',
    outlinedText: '#242424',
    outlinedHoverBg: 'rgba(36, 36, 36, 0.05)',
    blockBg: '#f5f5f5',
    blockHover: '#ebebeb',
    border: '#e0e0e0',
    overlay: 'rgba(0, 0, 0, 0.45)',
    closeBg: '#f5f5f5',
    closeText: '#000',
    closeHoverBg: '#ebebeb'
  };

  const DARK_COLORS = {
    bg: '#1e1e1f',
    title: '#d9dcde',
    body: '#b2b2b2',
    accent: '#ffc900',
    accentHover: '#e6b500',
    accentText: '#000000',
    outlinedBorder: '#ffffff',
    outlinedText: '#ffffff',
    outlinedHoverBg: 'rgba(255, 255, 255, 0.1)',
    blockBg: '#151515',
    blockHover: '#2a2a2a',
    border: '#434343',
    overlay: 'rgba(0, 0, 0, 0.65)',
    closeBg: '#151515',
    closeText: '#ffffff',
    closeHoverBg: '#2a2a2a'
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
    const host = hostname || window.location.hostname;
    return host === 'localhost' || host === '127.0.0.1';
  }

  function isKedroDomain(hostname) {
    const host = hostname || window.location.hostname;
    return host === 'kedro.org' ||
      host === 'www.kedro.org' ||
      host.endsWith('.kedro.org');
  }

  /**
   * Normalize hostname by removing www prefix.
   */
  function normalizeHostname(hostname) {
    const host = hostname || window.location.hostname;
    return host === 'www.kedro.org' ? 'kedro.org' : host;
  }

  /**
   * Resolve which theme variant the consent banner should render.
   * Per-host detection (kedro.org / docs / viz / builder) is intentionally
   * deferred — for now, returns 'dark' (matches kedro.org default) unless
   * the host explicitly sets `window.kedroConsentTheme`.
   */
  function getTheme() {
    if (window.kedroConsentTheme === 'light' || window.kedroConsentTheme === 'dark') {
      return window.kedroConsentTheme;
    }
    return 'dark';
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

    // Stub all Heap methods to queue calls (bounded to prevent memory leaks)
    HEAP_METHODS.forEach((method) => {
      window.heap[method] = (...args) => {
        if (queue.length < MAX_QUEUE_SIZE) {
          queue.push([method, ...args]);
        }
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

  /**
   * Escape hatch: a site can opt out of central HEAP_ROUTES and declare its own
   * Heap App ID via `data-heap-id` on the consent script tag.
   */
  function getScriptOverride() {
    try {
      const script = document.querySelector('script[src*="kedro-consent"][data-heap-id]');
      return script ? script.dataset.heapId : null;
    } catch (e) {
      return null;
    }
  }

  function matchesRoute(route, hostname, pathname) {
    if (route.host !== hostname) {
      return false;
    }
    if (!route.path) {
      return true;
    }
    if (!pathname.startsWith(route.path)) {
      return false;
    }
    // Boundary check: next char must be '/', '?', '#', or end-of-string
    const nextChar = pathname[route.path.length];
    return nextChar === undefined || nextChar === '/' || nextChar === '?' || nextChar === '#';
  }

  function getHeapAppId() {
    const override = getScriptOverride();
    if (override) {
      return override;
    }

    const rawHostname = window.location.hostname;

    if (isLocalhost(rawHostname)) {
      return CONFIG.defaultHeapId;
    }

    const hostname = normalizeHostname(rawHostname);
    const pathname = window.location.pathname;
    const env = getEnvironment();

    for (const route of HEAP_ROUTES) {
      if (matchesRoute(route, hostname, pathname)) {
        return route.ids[env] || route.ids.prod || CONFIG.defaultHeapId;
      }
    }

    // Unknown non-Kedro domain — do not load Heap to avoid polluting analytics
    if (!isKedroDomain(hostname)) {
      logWarn('Unknown non-Kedro domain: ' + hostname + '. Heap will not load.');
      return null;
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

    // Localhost - omit domain attribute
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

    // Disabled by consent withdrawal — require page reload to re-enable
    if (window.kedroHeapDisabled) {
      log('Heap disabled - page reload required to re-enable');
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
      window.dispatchEvent(new CustomEvent('kedro:analytics:ready'));
      log('Heap loaded with App ID:', appId);
    };

    script.onerror = () => {
      logError('Failed to load Heap script');
      window.kedroHeapLoading = false;
      
      window.dispatchEvent(new CustomEvent('kedro:analytics:failed'));
    };

    document.head.appendChild(script);
  }

  /**
   * Disable Heap after consent withdrawal.
   * Replaces all methods with no-ops to stop tracking, clears cookies,
   * and sets a flag requiring page reload to re-enable.
   */
  function disableHeap() {
    log('Disabling Heap analytics (consent withdrawn)');

    if (window.heap) {
      HEAP_METHODS.forEach((method) => {
        window.heap[method] = function () {};
      });
      window.heap.push = function () {};
    }

    clearHeapCookies();

    window.kedroAnalyticsReady = false;
    window.kedroHeapLoading = false;
    window.kedroHeapDisabled = true;

    try {
      window.dispatchEvent(new CustomEvent('kedro:analytics:disabled'));
    } catch (e) {
      // Silently fail
    }

    log('Heap disabled. Page reload required to re-enable.');
  }

  // ============================================
  // CUSTOM STYLES
  // ============================================

  function injectCustomStyles() {
    // CookieConsent variables — same shape for both palettes.
    // Note: --cc-btn-secondary-* is intentionally set to the accent so that
    // "Only necessary" matches "Accept analytics" (per Figma — equal weight
    // consent choices). "Cookie settings" is overridden separately to outlined.
    const themeVars = (palette) => [
      `  --cc-bg: ${palette.bg};`,
      `  --cc-primary-color: ${palette.title};`,
      `  --cc-secondary-color: ${palette.body};`,
      `  --cc-btn-primary-bg: ${palette.accent};`,
      `  --cc-btn-primary-color: ${palette.accentText};`,
      `  --cc-btn-primary-hover-bg: ${palette.accentHover};`,
      `  --cc-btn-primary-hover-color: ${palette.accentText};`,
      `  --cc-btn-secondary-bg: ${palette.accent};`,
      `  --cc-btn-secondary-color: ${palette.accentText};`,
      `  --cc-btn-secondary-hover-bg: ${palette.accentHover};`,
      `  --cc-btn-secondary-hover-color: ${palette.accentText};`,
      `  --cc-separator-border-color: ${palette.border};`,
      `  --cc-cookie-category-block-bg: ${palette.blockBg};`,
      `  --cc-cookie-category-block-hover-bg: ${palette.blockHover};`,
      `  --cc-toggle-readonly-bg: ${palette.accent};`,
      `  --cc-toggle-on-bg: ${palette.accent};`,
      `  --cc-overlay-bg: ${palette.overlay};`
    ];

    // Outlined buttons — transparent bg + themed border + themed text:
    //  - Banner "Cookie settings"           → .cm__btn[data-role="show"]
    //  - Preferences popup "Save settings"  → .pm__btn[data-role="save"]
    const outlinedRules = (selector, palette) => [
      `${selector} #cc-main .cm__btn[data-role="show"],`,
      `${selector} #cc-main .pm__btn[data-role="save"] {`,
      '  background: transparent;',
      `  border: 1px solid ${palette.outlinedBorder};`,
      `  color: ${palette.outlinedText};`,
      '}',
      `${selector} #cc-main .cm__btn[data-role="show"]:hover,`,
      `${selector} #cc-main .pm__btn[data-role="save"]:hover {`,
      `  background: ${palette.outlinedHoverBg};`,
      `  color: ${palette.outlinedText};`,
      '}'
    ];

    // Close (X) button in the preferences popup — filled, no border.
    // Light theme: dark grey fill + dark X. Dark theme: lighter grey fill + white X.
    const closeButtonRules = (selector, palette) => [
      `${selector} #cc-main .pm__close-btn {`,
      `  background: ${palette.closeBg};`,
      '  border: none;',
      '}',
      `${selector} #cc-main .pm__close-btn svg {`,
      `  stroke: ${palette.closeText};`,
      '}',
      `${selector} #cc-main .pm__close-btn:hover {`,
      `  background: ${palette.closeHoverBg};`,
      `  color: ${palette.closeText};`,
      '}'
    ];

    const styles = [
      '/* Kedro Consent Branding */',
      '[data-kedro-cc-theme="light"] {',
      ...themeVars(LIGHT_COLORS),
      '}',
      '',
      '[data-kedro-cc-theme="dark"] {',
      ...themeVars(DARK_COLORS),
      '}',
      '',
      '#cc-main {',
      '  font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;',
      '}',
      '',
      '#cc-main .cm__btn, #cc-main .pm__btn {',
      '  border-radius: 4px;',
      '  font-weight: 600;',
      '  white-space: nowrap;',
      '}',
      '',
      '#cc-main .cm__title, #cc-main .pm__title {',
      '  font-weight: 600;',
      '}',
      '',
      ...outlinedRules('[data-kedro-cc-theme="light"]', LIGHT_COLORS),
      '',
      ...outlinedRules('[data-kedro-cc-theme="dark"]', DARK_COLORS),
      '',
      ...closeButtonRules('[data-kedro-cc-theme="light"]', LIGHT_COLORS),
      '',
      ...closeButtonRules('[data-kedro-cc-theme="dark"]', DARK_COLORS)
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
    const POLICY_URL = 'https://kedro.org/privacy-and-cookies';
    const TERMS_URL = 'https://lfprojects.org/policies/hosted-project-tools-terms-of-use/';

    return {
      consentModal: {
        title: 'Your privacy choices',
        description:
          'We use a strictly necessary cookie to remember your cookie settings. ' +
          'With your permission, we also use analytics cookies (Heap) to understand how our sites are used and improve them. ' +
          'You can accept analytics, keep only necessary cookies, or manage your preferences. ' +
          '<a href="' + POLICY_URL + '" target="_blank" rel="noopener noreferrer">Learn more</a> | ' +
          '<a href="' + TERMS_URL + '" target="_blank" rel="noopener noreferrer">Terms of Use</a>.',
        acceptAllBtn: 'Accept analytics',
        acceptNecessaryBtn: 'Only necessary',
        showPreferencesBtn: 'Cookie settings'
      },
      preferencesModal: {
        title: 'Cookie settings',
        savePreferencesBtn: 'Save settings',
        closeIconLabel: 'Close',
        sections: [
          {
            title: 'How we use cookies',
            description:
              'You can choose whether to allow analytics cookies. ' +
              'You can change your choice at any time by reopening these settings. ' +
              'For details, see our <a href="' + POLICY_URL + '" target="_blank" rel="noopener noreferrer">Privacy & Cookies Notice</a>.'
          },
          {
            title: 'Strictly necessary cookie',
            description:
              'This cookie is required to store your cookie settings so we can respect your choices. ' +
              'It does not track you for analytics.',
            linkedCategory: 'necessary',
            cookieTable: {
              caption: 'Strictly necessary cookie',
              headers: {
                name: 'Name',
                domain: 'Domain',
                description: 'Purpose',
                expiration: 'Expiry'
              },
              body: [{
                name: CONFIG.cookieName,
                domain: '.kedro.org',
                description: 'Stores your cookie preference choices.',
                expiration: '6 months'
              }]
            }
          },
          {
            title: 'Analytics cookies (Heap)',
            description:
              'If you allow analytics, we use Heap to collect usage information (such as pages viewed and interactions) ' +
              'to help us improve Kedro documentation and experiences. ' +
              'Heap uses cookies and similar identifiers to recognize repeat visits. ' +
              'You can turn analytics off at any time; we will stop loading Heap and remove Heap cookies from your browser where possible.',
            linkedCategory: 'analytics',
            cookieTable: {
              caption: 'Analytics cookies',
              headers: {
                name: 'Name / pattern',
                domain: 'Domain',
                description: 'Purpose',
                expiration: 'Expiry'
              },
              body: [{
                name: '_hp2_*',
                domain: '.kedro.org',
                description: 'Heap analytics identifiers used to measure and improve our sites.',
                expiration: 'Up to 1 year (may vary)'
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
        disableHeap();
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

    if (typeof CookieConsent.run !== 'function') {
      logError('CookieConsent API mismatch - expected v3.x');
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
      .find((cookie) => cookie.trim().startsWith(`${CONFIG.cookieName}=`));

    // If no consent cookie but Heap cookies exist, clear them
    if (!consentCookie && hasHeapCookies()) {
      log('Clearing orphaned Heap cookies (no valid consent found)');
      clearHeapCookies();
    }
  }

  function bootstrap() {
    const vendorUrl = getVendorBaseUrl();

    // Apply theme attribute to <html> before loading vendor CSS, so the
    // CSS variables resolve to the right palette the moment cookieconsent.css
    // mounts. Per-host detection is TODO.
    document.documentElement.setAttribute('data-kedro-cc-theme', getTheme());

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
