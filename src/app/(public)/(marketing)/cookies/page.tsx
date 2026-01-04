import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Mobiopti",
  description: "Privacy Policy for Mobiopti SEO tool",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <article className="prose prose-neutral dark:prose-invert max-w-none">
        <h1>Privacy Policy</h1>
        <p className="text-muted-foreground">Last updated: January 4, 2026</p>

        <p>
          This Privacy Policy describes how Filip Novák (&quot;we&quot;,
          &quot;us&quot;, or &quot;our&quot;) collects, uses, and shares your
          personal information when you use Mobiopti (the &quot;Service&quot;).
        </p>

        <h2>1. Data Controller</h2>
        <p>
          Filip Novák, DiS.
          <br />
          Palackého třída 2630/131
          <br />
          Brno – Královo Pole, 612 00
          <br />
          Czech Republic
          <br />
          IČ: 73943118
          <br />
          Zapsán v živnostenském rejstříku. Plátce DPH.
          <br />
          <br />
          Email:{" "}
          <a href='' className="text-primary hover:underline">
            info@zsf.cz
          </a>
          <br />
          Phone: +420 777 200 308
        </p>

        <h2>2. Information We Collect</h2>

        <h3>2.1 Account Information</h3>
        <ul>
          <li>Full name</li>
          <li>Email address</li>
          <li>Profile picture (if provided via social login)</li>
        </ul>

        <h3>2.2 Technical Information</h3>
        <ul>
          <li>IP address</li>
          <li>Browser user agent</li>
          <li>Session data</li>
        </ul>

        <h3>2.3 Service Data</h3>
        <ul>
          <li>URLs you submit for SEO analysis</li>
          <li>Analysis results and scores</li>
        </ul>

        <h3>2.4 Payment Information</h3>
        <p>
          Payment processing is handled by Stripe. We store only your Stripe
          Customer ID. We do not store credit card numbers or banking details.
          Please refer to{" "}
          <a
            href="https://justpaste.it/redirect/lz36u/https%3A%2F%2Fstripe.com%2Fprivacy"
            target="_blank"
            rel="nofollow"
            className="text-primary hover:underline"
          >
            Stripe&apos;s Privacy Policy
          </a>{" "}
          for details on how they handle your payment information.
        </p>

        <h2>3. How We Use Your Information</h2>
        <p>We use your information to:</p>
        <ul>
          <li>Provide and maintain the Service</li>
          <li>Process your subscription payments</li>
          <li>
            Send transactional emails (account verification, password resets,
            subscription updates)
          </li>
          <li>Analyze Service usage and improve our features</li>
          <li>Display relevant advertisements</li>
          <li>Comply with legal obligations</li>
        </ul>

        <h2>4. Legal Basis for Processing (GDPR)</h2>
        <p>We process your data based on:</p>
        <ul>
          <li>
            <strong>Contract performance</strong>: To provide the Service you
            signed up for
          </li>
          <li>
            <strong>Legitimate interests</strong>: To improve our Service and
            prevent fraud
          </li>
          <li>
            <strong>Consent</strong>: For marketing communications (where
            applicable)
          </li>
          <li>
            <strong>Legal obligation</strong>: To comply with applicable laws
          </li>
        </ul>

        <h2>5. Third-Party Services</h2>
        <p>We share data with the following service providers:</p>

        <div className="overflow-x-auto">
          <table>
            <thead>
              <tr>
                <th>Service</th>
                <th>Purpose</th>
                <th>Privacy Policy</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Supabase</td>
                <td>Database hosting</td>
                <td>
                  <a
                    href="https://justpaste.it/redirect/lz36u/https%3A%2F%2Fsupabase.com%2Fprivacy"
                    target="_blank"
                    rel="nofollow"
                    className="text-primary hover:underline"
                  >
                    supabase.com/privacy
                  </a>
                </td>
              </tr>
              <tr>
                <td>Stripe</td>
                <td>Payment processing</td>
                <td>
                  <a
                    href="https://justpaste.it/redirect/lz36u/https%3A%2F%2Fstripe.com%2Fprivacy"
                    target="_blank"
                    rel="nofollow"
                    className="text-primary hover:underline"
                  >
                    stripe.com/privacy
                  </a>
                </td>
              </tr>
              <tr>
                <td>Resend</td>
                <td>Transactional emails</td>
                <td>
                  <a
                    href="https://justpaste.it/redirect/lz36u/https%3A%2F%2Fresend.com%2Flegal%2Fprivacy-policy"
                    target="_blank"
                    rel="nofollow"
                    className="text-primary hover:underline"
                  >
                    resend.com/legal/privacy-policy
                  </a>
                </td>
              </tr>
              <tr>
                <td>Google Analytics</td>
                <td>Usage analytics</td>
                <td>
                  <a
                    href="https://justpaste.it/redirect/lz36u/https%3A%2F%2Fpolicies.google.com%2Fprivacy"
                    target="_blank"
                    rel="nofollow"
                    className="text-primary hover:underline"
                  >
                    policies.google.com/privacy
                  </a>
                </td>
              </tr>
              <tr>
                <td>Google AdSense</td>
                <td>Advertising</td>
                <td>
                  <a
                    href="https://justpaste.it/redirect/lz36u/https%3A%2F%2Fpolicies.google.com%2Fprivacy"
                    target="_blank"
                    rel="nofollow"
                    className="text-primary hover:underline"
                  >
                    policies.google.com/privacy
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2>6. Cookies and Tracking</h2>
        <p>
          We use essential session cookies for authentication purposes only.
        </p>
        <p>
          Google Analytics and Google AdSense may use cookies and similar
          technologies. You can manage cookie preferences through your browser
          settings or opt out of Google&apos;s advertising cookies at{" "}
          <a
            href="https://justpaste.it/redirect/lz36u/https%3A%2F%2Fadssettings.google.com"
            target="_blank"
            rel="nofollow"
            className="text-primary hover:underline"
          >
            adssettings.google.com
          </a>
          .
        </p>

        <h2>7. Data Retention</h2>
        <ul>
          <li>
            <strong>Active accounts</strong>: Data is retained while your
            account is active
          </li>
          <li>
            <strong>Deleted accounts</strong>: Personal data is deleted within
            30 days of account deletion
          </li>
          <li>
            <strong>Backups</strong>: May be retained for up to 90 days for
            disaster recovery purposes
          </li>
          <li>
            <strong>Analytics data</strong>: Anonymized data may be retained
            indefinitely for statistical purposes
          </li>
        </ul>

        <h2>8. Your Rights (GDPR)</h2>
        <p>You have the right to:</p>
        <ul>
          <li>
            <strong>Access</strong>: Request a copy of your personal data
          </li>
          <li>
            <strong>Rectification</strong>: Correct inaccurate data
          </li>
          <li>
            <strong>Erasure</strong>: Request deletion of your data
            (&quot;right to be forgotten&quot;)
          </li>
          <li>
            <strong>Portability</strong>: Receive your data in a
            machine-readable format
          </li>
          <li>
            <strong>Restriction</strong>: Limit how we process your data
          </li>
          <li>
            <strong>Objection</strong>: Object to processing based on legitimate
            interests
          </li>
          <li>
            <strong>Withdraw consent</strong>: Where processing is based on
            consent
          </li>
        </ul>
        <p>
          To exercise these rights, contact us at{" "}
          <a href='' className="text-primary hover:underline">
            info@zsf.cz
          </a>
          . We will respond within 30 days.
        </p>

        <h2>9. Data Security</h2>
        <p>
          We implement appropriate technical and organizational measures to
          protect your data, including:
        </p>
        <ul>
          <li>Encrypted data transmission (HTTPS/TLS)</li>
          <li>Secure authentication systems</li>
          <li>Regular security updates</li>
          <li>Access controls and authentication</li>
        </ul>

        <h2>10. International Data Transfers</h2>
        <p>
          Your data may be processed in countries outside the European Economic
          Area (EEA) by our service providers. We ensure appropriate safeguards
          are in place, such as Standard Contractual Clauses approved by the
          European Commission.
        </p>

        <h2>11. Children&apos;s Privacy</h2>
        <p>
          The Service is available to users of all ages. If you are under 16,
          please ensure you have parental consent before using the Service. We
          do not knowingly collect data from children under 16 without parental
          consent.
        </p>

        <h2>12. Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. We will notify
          you of significant changes by email or through the Service. Your
          continued use of the Service after changes constitutes acceptance of
          the updated policy.
        </p>

        <h2>13. Contact Us</h2>
        <p>
          For questions about this Privacy Policy or to exercise your rights:
        </p>
        <p>
          Filip Novák, DiS.
          <br />
          Palackého třída 2630/131
          <br />
          Brno – Královo Pole, 612 00
          <br />
          Czech Republic
          <br />
          IČ: 73943118
          <br />
          <br />
          Email:{" "}
          <a href='' className="text-primary hover:underline">
            info@zsf.cz
          </a>
          <br />
          Phone: +420 777 200 308
        </p>

        <h2>14. Supervisory Authority</h2>
        <p>
          If you believe we have not addressed your concerns adequately, you
          have the right to lodge a complaint with a supervisory authority. In
          the Czech Republic, this is:
        </p>
        <p>
          Úřad pro ochranu osobních údajů (ÚOOÚ)
          <br />
          Pplk. Sochora 27
          <br />
          170 00 Praha 7
          <br />
          Czech Republic
          <br />
          <a
            href="https://justpaste.it/redirect/lz36u/https%3A%2F%2Fwww.uoou.cz"
            target="_blank"
            rel="nofollow"
            className="text-primary hover:underline"
          >
            uoou.cz
          </a>
        </p>
      </article>
    </div>
  );
}