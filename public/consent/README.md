# Kedro Consent Management

Centralized consent management script for the Kedro ecosystem.

## Overview

`kedro-consent.js` provides:
- GDPR-compliant opt-in cookie consent
- Cross-subdomain consent sharing via `.kedro.org` cookie
- Conditional Heap Analytics loading based on consent
- Full Heap disabling on consent withdrawal
- Bounded event queue for pre-consent tracking calls

## File Structure

```
consent/
├── kedro-consent.js          # Main consent script
├── README.md                 # This file
└── vendor/
    ├── cookieconsent.css     # CookieConsent v3 stylesheet
    └── cookieconsent.umd.js  # CookieConsent v3 library
```

## Usage

### In kedro.org (this site)

```tsx
// pages/_app.tsx
<Script src="/consent/kedro-consent.js" strategy="afterInteractive" />
```

### In other Kedro properties

```html
<script src="https://kedro.org/consent/kedro-consent.js" defer></script>
```

### For Read the Docs

```yaml
# mkdocs.yml
extra_javascript:
  - https://kedro.org/consent/kedro-consent.js
```

## Consent Withdrawal

When a user withdraws analytics consent:
1. All `window.heap` methods are replaced with no-ops
2. All `_hp*` cookies are cleared
3. `kedro:analytics:disabled` event is dispatched
4. Page reload is required to re-enable Heap

## Domain Restrictions

Heap only loads on localhost and known Kedro domains (`*.kedro.org`). Unknown domains will not load analytics.

## Updating

### Update CookieConsent Version

1. Download new version to `vendor/`
2. Test locally
3. Deploy

### Update Consent Revision

When privacy policy changes:

1. Increment `CONFIG.revision` in `kedro-consent.js`
2. Deploy - users will be re-prompted for consent
