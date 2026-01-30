# Kedro Consent Management

Centralized consent management script for the Kedro ecosystem.

## Overview

`kedro-consent.js` provides:
- GDPR-compliant opt-in cookie consent
- Cross-subdomain consent sharing via `.kedro.org` cookie
- Conditional Heap Analytics loading based on consent
- Automatic cleanup of analytics cookies on consent withdrawal
- Event queue for tracking calls made before consent

## File Structure

```
consent/
├── kedro-consent.js          # Main consent script
├── kedro-consent.css         # Custom branding styles (reference)
├── README.md                 # This file
└── vendor/
    ├── cookieconsent.css     # CookieConsent v3 stylesheet
    └── cookieconsent.umd.js  # CookieConsent v3 library
```

## Setup: Download Vendor Files

```bash
cd public/consent/vendor

# Download CookieConsent v3.0.1
curl -o cookieconsent.umd.js https://cdn.jsdelivr.net/gh/orestbida/cookieconsent@3.0.1/dist/cookieconsent.umd.js
curl -o cookieconsent.css https://cdn.jsdelivr.net/gh/orestbida/cookieconsent@3.0.1/dist/cookieconsent.css
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

## Heap App ID Configuration

| Surface | Environment | Heap ID |
|---------|-------------|---------|
| kedro.org | Prod | 666783228 |
| kedro.org | Dev | 801262615 |
| demo.kedro.org | Prod | 2388822444 |
| demo.kedro.org/kedro-builder | Dev | 4039408868 |
| docs.kedro.org | Prod (stable) | 537308175 |
| docs.kedro.org | Dev (latest) | 2164194004 |
| docs.kedro.org/projects/kedro-viz | Prod | 522942930 |
| docs.kedro.org/projects/kedro-viz | Dev | 2164194004 |
| docs.kedro.org/projects/kedro-datasets | Prod | 1625763777 |
| docs.kedro.org/projects/kedro-datasets | Dev | 2164194004 |
| localhost / fallback | - | 4039408868 |

## Event Queue

The script creates a stub for `window.heap` that queues all tracking calls made before consent. When the user accepts analytics and Heap loads, queued calls are replayed via `script.onload`.

```javascript
// This works even before consent is given
heap.track('PAGE_VIEW', { page: '/home' });

// Listen for analytics ready
window.addEventListener('kedro:analytics:ready', function() {
  console.log('Heap is ready');
});
```

## Key Implementation Details

### Cookie Domain Handling

- **localhost**: No domain attribute (avoids invalid cookies)
- **kedro.org domains**: `.kedro.org` for cross-subdomain sharing
- **Other domains**: No domain attribute

### Heap Loading Guards

- Checks `window.heap.loaded` to prevent re-initialization
- Uses `window.kedroHeapLoading` flag to prevent duplicate loads
- Replays queued calls on `script.onload` (not setTimeout)

### Fail-Safe Behavior

- CSS load failures don't block consent initialization
- Script errors are caught and logged
- If consent system fails, Heap is NOT loaded (privacy-safe default)

## Updating

### Update CookieConsent Version

1. Download new version to `vendor/`
2. Test locally
3. Deploy

### Update Consent Revision

When privacy policy changes:

1. Increment `CONFIG.revision` in `kedro-consent.js`
2. Deploy - users will be re-prompted for consent

## Testing Checklist

- [ ] Banner appears on first visit (incognito)
- [ ] No Heap cookies (`_hp*`) before consent
- [ ] Heap loads after accepting
- [ ] Heap cookies appear after accepting
- [ ] Rejecting prevents Heap loading
- [ ] Withdrawing consent clears Heap cookies
- [ ] Consent persists across navigations
- [ ] Cross-subdomain consent works
- [ ] Works on localhost (no invalid cookie errors)

## Troubleshooting

### Banner not appearing
- Check browser console for `[kedro-consent]` errors
- Verify vendor files exist and are accessible

### Heap not loading after consent
- Check for `[kedro-consent] Heap loaded with App ID:` log
- Verify consent cookie exists with analytics accepted

### Invalid cookie errors on localhost
- Ensure `getCookieDomain()` returns `null` for localhost
- Check browser dev tools Application > Cookies
