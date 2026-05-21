export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
      <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-2">Privacy Policy</h1>
      <p className="text-sm text-slate-400 mb-10">Last updated: 21 May 2026</p>

      <div className="prose prose-slate dark:prose-invert max-w-none space-y-8 text-slate-600 dark:text-slate-400 text-sm leading-relaxed">

        <section>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-3">1. Introduction</h2>
          <p>
            GanjaranX (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) is committed to protecting your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website at <strong>ganjaranx.com</strong> and related services (collectively, the &quot;Platform&quot;).
          </p>
          <p className="mt-3">
            By accessing or using the Platform, you agree to the collection and use of information in accordance with this policy. If you do not agree, please do not use our services.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-3">2. Information We Collect</h2>
          <p className="mb-3">We may collect the following types of information:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Personal Information:</strong> Name, email address, and phone number when you register or contact us.</li>
            <li><strong>Payment Information:</strong> When you top up Ganjaran Points, payment is processed by Billplz (for FPX) or Stripe (for card payments). We do not store your full card number or bank credentials. These processors have their own privacy policies.</li>
            <li><strong>Usage Data:</strong> Pages visited, time spent, browser type, device type, IP address, and referral source.</li>
            <li><strong>Transaction Data:</strong> Records of points earned, redeemed, and purchased.</li>
            <li><strong>Communications:</strong> Any messages you send us via our contact form or email.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-3">3. How We Use Your Information</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>To create and manage your account and Ganjaran Points balance.</li>
            <li>To process top-up payments and reward redemptions.</li>
            <li>To send transactional emails (payment receipts, point confirmations).</li>
            <li>To send platform updates and promotional offers (you may opt out at any time).</li>
            <li>To improve our services, analyse usage patterns, and prevent fraud.</li>
            <li>To comply with legal obligations under Malaysian law.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-3">4. Payment Processors</h2>
          <p>We use the following third-party payment processors:</p>
          <ul className="list-disc pl-5 space-y-2 mt-3">
            <li><strong>Billplz Sdn. Bhd.</strong> — for FPX (online banking) payments. Your banking credentials are entered directly on Billplz&apos;s secure platform. See <a href="https://www.billplz.com/privacy" className="text-[#f5a623] hover:underline" target="_blank" rel="noopener noreferrer">Billplz Privacy Policy</a>.</li>
            <li><strong>Stripe, Inc.</strong> — for credit and debit card payments. Card details are handled by Stripe&apos;s PCI-DSS compliant infrastructure. See <a href="https://stripe.com/privacy" className="text-[#f5a623] hover:underline" target="_blank" rel="noopener noreferrer">Stripe Privacy Policy</a>.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-3">5. Data Sharing</h2>
          <p>We do not sell or rent your personal information. We may share your data with:</p>
          <ul className="list-disc pl-5 space-y-2 mt-3">
            <li><strong>Payment processors</strong> (Billplz, Stripe) solely to complete transactions.</li>
            <li><strong>Partner vendors</strong> only when required to fulfil a reward redemption (e.g., sending your name and email to the hotel or F&B partner).</li>
            <li><strong>Legal authorities</strong> if required by Malaysian law or court order.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-3">6. Cookies</h2>
          <p>
            We use cookies and similar tracking technologies to enhance your experience, remember your language preference, and analyse site traffic. You can disable cookies in your browser settings, though some features may not function correctly.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-3">7. Data Retention</h2>
          <p>
            We retain your personal data for as long as your account is active or as needed to provide services. Transaction records are kept for a minimum of 7 years as required by Malaysian financial regulations. You may request deletion of your account by contacting us.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-3">8. Your Rights</h2>
          <p>Under the Personal Data Protection Act 2010 (PDPA) of Malaysia, you have the right to:</p>
          <ul className="list-disc pl-5 space-y-2 mt-3">
            <li>Access the personal data we hold about you.</li>
            <li>Correct any inaccurate or incomplete data.</li>
            <li>Withdraw consent to receive marketing communications.</li>
            <li>Request deletion of your personal data (subject to legal retention requirements).</li>
          </ul>
          <p className="mt-3">To exercise any of these rights, contact us at <a href="mailto:privacy@ganjaranx.com" className="text-[#f5a623] hover:underline">privacy@ganjaranx.com</a>.</p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-3">9. Security</h2>
          <p>
            We implement industry-standard security measures including HTTPS encryption, secure API key management, and access controls. However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-3">10. Children&apos;s Privacy</h2>
          <p>
            Our Platform is not intended for users under the age of 18. We do not knowingly collect personal information from minors. If you believe we have inadvertently collected such information, please contact us immediately.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-3">11. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify you of significant changes by posting the new policy on this page with an updated date. Continued use of the Platform after changes constitutes your acceptance of the revised policy.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-3">12. Contact Us</h2>
          <p>If you have any questions about this Privacy Policy, please contact us:</p>
          <ul className="list-none mt-3 space-y-1">
            <li><strong>GanjaranX</strong></li>
            <li>Email: <a href="mailto:privacy@ganjaranx.com" className="text-[#f5a623] hover:underline">privacy@ganjaranx.com</a></li>
            <li>Website: <a href="https://ganjaranx.com/contact" className="text-[#f5a623] hover:underline">ganjaranx.com/contact</a></li>
            <li>Governing Law: Malaysia (Personal Data Protection Act 2010)</li>
          </ul>
        </section>

      </div>
    </div>
  );
}
