import Head from 'next/head';

import Header from '../modules/shared/header';
import { siteMetadata } from '../modules/shared/config';

import style from './privacy-and-cookies.module.scss';

export default function PrivacyAndCookies() {
  return (
    <>
      <Head>
        <title>Privacy & Cookies Notice | Kedro</title>
        <meta
          name="description"
          content="How Kedro web properties handle cookies and personal data."
        />
        <meta
          property="og:title"
          content="Privacy & Cookies Notice | Kedro"
        />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={siteMetadata.socialImage} />
        <meta
          property="og:url"
          content={siteMetadata.baseUrl + 'privacy-and-cookies'}
        />
        <meta
          property="og:description"
          content="How Kedro web properties handle cookies and personal data."
        />
        <meta property="og:site_name" content="Kedro" />
      </Head>
      <Header />
      <main className={style.container}>
        <article className={style.content}>
          <h1>Privacy & Cookies Notice</h1>
          <p className={style.updated}>Last updated: 9 February 2026</p>
          <p>
            This notice explains how cookies and personal data are handled on
            these Kedro web properties:
          </p>
          <ul>
            <li>
              <a
                href="https://kedro.org"
                target="_blank"
                rel="noopener noreferrer"
              >
                kedro.org
              </a>
            </li>
            <li>
              <a
                href="https://docs.kedro.org"
                target="_blank"
                rel="noopener noreferrer"
              >
                docs.kedro.org
              </a>
            </li>
            <li>
              <a
                href="https://demo.kedro.org"
                target="_blank"
                rel="noopener noreferrer"
              >
                demo.kedro.org
              </a>
            </li>
            <li>
              <a
                href="https://demo.kedro.org/kedro-builder"
                target="_blank"
                rel="noopener noreferrer"
              >
                demo.kedro.org/kedro-builder
              </a>
            </li>
          </ul>

          <h2>1. Who is responsible for this processing (Controller)</h2>
          <p>
            For now, the <strong>Kedro Team</strong> acts as the point of
            contact and responsible group for the operation of the Kedro web
            properties listed above, including decisions about analytics used to
            improve these sites.
          </p>
          <p>
            <strong>Controller (interim):</strong> Kedro Team (operators of the
            Kedro web properties listed on this page)
            <br />
            <strong>Contact:</strong>{' '}
            <a href="mailto:privacy@kedro.org">privacy@kedro.org</a>
          </p>
          <p>
            We will update this notice if/when a specific legal entity is
            designated as the controller for these sites.
          </p>

          <h2>2. Quick summary</h2>
          <p>We use only:</p>
          <ol>
            <li>
              <strong>A strictly necessary cookie</strong> to remember your
              cookie preferences.
            </li>
            <li>
              <strong>Analytics cookies (Heap)</strong> if you choose to allow
              analytics, to understand usage and improve our sites.
            </li>
          </ol>
          <p>
            You can change your choice at any time via{' '}
            <strong>Cookie settings</strong> (available within each site/app
            UI).
          </p>

          <h2>3. What are cookies?</h2>
          <p>
            Cookies are small text files stored on your device by your browser.
            Some cookies are required for a website to work or remember
            settings; others are optional and used for analytics.
          </p>

          <h2>4. Your choices</h2>

          <h3>4.1 Strictly necessary cookie</h3>
          <p>
            This cookie is always set because it stores your cookie preference
            selection so we can respect your choice.
          </p>

          <h3>4.2 Analytics cookies are optional (opt-in)</h3>
          <p>
            We only set analytics cookies and load Heap{' '}
            <strong>after you consent</strong>.
          </p>

          <h3>4.3 Withdraw or change consent anytime</h3>
          <p>
            You can withdraw consent at any time by opening{' '}
            <strong>Cookie settings</strong> and turning off{' '}
            <strong>Analytics</strong>.
          </p>
          <p>
            Withdrawing consent does not affect analytics processing that
            occurred before you withdrew it.
          </p>

          <h2>5. What we collect</h2>

          <h3>5.1 Preference data (necessary)</h3>
          <ul>
            <li>
              Your cookie preference selection (stored in a cookie on your
              device)
            </li>
          </ul>

          <h3>5.2 Analytics data (Heap) — only if you opt in</h3>
          <p>If you opt in to analytics, Heap may collect:</p>
          <ul>
            <li>pages viewed and navigation events</li>
            <li>interactions (e.g., clicks) and usage events</li>
            <li>
              device/browser information (e.g., browser type, OS, screen size)
            </li>
            <li>
              an online identifier stored in cookies to recognize repeat visits
            </li>
          </ul>
          <p>
            We do not intentionally collect sensitive personal data through
            analytics.
          </p>

          <h2>6. Why we use data (purposes)</h2>
          <ul>
            <li>
              <strong>Remember your preferences:</strong> so we can store and
              respect your cookie choices
            </li>
            <li>
              <strong>Improve Kedro sites:</strong> to understand how our sites
              are used and improve content and experience
            </li>
          </ul>

          <h2>7. Legal basis (EU/EEA/UK)</h2>
          <ul>
            <li>
              <strong>Strictly necessary preference cookie:</strong> required to
              store and respect your choice.
            </li>
            <li>
              <strong>Analytics (Heap):</strong> <strong>your consent</strong>.
            </li>
          </ul>

          <h2>8. Cookies we use</h2>

          <h3>8.1 Strictly necessary cookie</h3>
          <div className={style.tableWrapper}>
            <table>
              <thead>
                <tr>
                  <th>Cookie</th>
                  <th>Domain</th>
                  <th>Purpose</th>
                  <th>Typical expiry</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <code>kedro_cc</code>
                  </td>
                  <td>
                    <code>.kedro.org</code>
                  </td>
                  <td>Stores your cookie preference choices</td>
                  <td>6 months</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3>8.2 Analytics cookies (Heap) — only if you opt in</h3>
          <p>
            Heap cookies may include names beginning with{' '}
            <code>_hp2_...</code> (and related Heap identifiers).
          </p>
          <div className={style.tableWrapper}>
            <table>
              <thead>
                <tr>
                  <th>Cookie pattern</th>
                  <th>Domain</th>
                  <th>Purpose</th>
                  <th>Typical expiry</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <code>_hp2_*</code>
                  </td>
                  <td>
                    <code>.kedro.org</code>
                  </td>
                  <td>
                    Heap analytics identifiers used to measure and improve our
                    sites
                  </td>
                  <td>Up to 1 year (may vary)</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2>9. Who processes data with us (service providers)</h2>
          <p>If you opt in to analytics, we use:</p>
          <ul>
            <li>
              <strong>Heap Analytics</strong> as our analytics service provider.
            </li>
          </ul>
          <p>
            Heap processes analytics data on our behalf to provide analytics
            services.
          </p>

          <h2>10. International transfers</h2>
          <p>
            Analytics data may be processed outside your country (including
            outside the EU/EEA/UK). Where required, we rely on appropriate
            safeguards to protect transferred data.
          </p>

          <h2>11. Retention</h2>
          <ul>
            <li>
              <strong>
                Cookie preferences cookie (<code>kedro_cc</code>):
              </strong>{' '}
              stored for 6 months unless you clear your browser cookies.
            </li>
            <li>
              <strong>
                Heap cookies (<code>_hp2_*</code>):
              </strong>{' '}
              up to 1 year (may vary).
            </li>
            <li>
              <strong>Analytics event data in analytics tooling:</strong>{' '}
              retained for up to 24 months, then deleted or aggregated.
            </li>
          </ul>

          <h2>12. Your rights (EU/EEA/UK)</h2>
          <p>Depending on your location, you may have rights to:</p>
          <ul>
            <li>access your personal data</li>
            <li>correct it</li>
            <li>delete it</li>
            <li>restrict or object to processing</li>
            <li>data portability</li>
            <li>
              withdraw consent (where processing is based on consent)
            </li>
            <li>lodge a complaint with a supervisory authority</li>
          </ul>
          <p>
            To exercise rights, contact:{' '}
            <a href="mailto:privacy@kedro.org">
              <strong>privacy@kedro.org</strong>
            </a>
            .
          </p>

          <h2>13. California notice (if applicable)</h2>
          <p>
            If California privacy law applies, California residents may have
            rights to know, delete, and correct personal information, and to opt
            out of certain disclosures defined as &quot;sale&quot; or
            &quot;sharing&quot;.
          </p>
          <p>
            <strong>
              We do not sell or share personal information
            </strong>{' '}
            for cross-context behavioral advertising.
          </p>
          <p>
            If our practices change and we become required to offer opt-out for
            &quot;sale&quot;/&quot;sharing&quot;, we will provide the required
            opt-out mechanisms and honor applicable browser-based opt-out signals
            (such as Global Privacy Control).
          </p>

          <h2>14. Changes to this notice</h2>
          <p>
            We may update this notice from time to time. If changes are
            material, we will update the &quot;Last updated&quot; date and, where
            appropriate, re-prompt for consent.
          </p>

          <h2>15. Contact</h2>
          <p>
            Questions about privacy or cookies:{' '}
            <a href="mailto:privacy@kedro.org">
              <strong>privacy@kedro.org</strong>
            </a>
          </p>
        </article>
      </main>
    </>
  );
}
