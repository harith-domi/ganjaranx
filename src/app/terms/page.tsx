export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
      <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-2">Terms of Service</h1>
      <p className="text-sm text-slate-400 mb-10">Last updated: 21 May 2026</p>

      <div className="space-y-8 text-slate-600 dark:text-slate-400 text-sm leading-relaxed">

        <section>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-3">1. Acceptance of Terms</h2>
          <p>
            By accessing or using <strong>ganjaranx.com</strong> (the &quot;Platform&quot;), you agree to be bound by these Terms of Service. If you do not agree to these terms, you must not use the Platform. These terms apply to all visitors, users, and anyone who accesses our services.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-3">2. About GanjaranX</h2>
          <p>
            GanjaranX is a Malaysian loyalty rewards platform that allows users to earn Ganjaran Points by completing tasks and to redeem those points for real-world rewards offered by our partner vendors. We also allow users to purchase Ganjaran Points directly via our GX Top-Up feature.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-3">3. Ganjaran Points</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>Ganjaran Points (&quot;GX Points&quot; or &quot;points&quot;) are a virtual currency with no cash value and cannot be withdrawn as cash.</li>
            <li>100 points are equivalent to RM 1.00 in redemption value.</li>
            <li>Points do not expire while your account remains active.</li>
            <li>Points are non-transferable and may not be sold, gifted, or exchanged outside the Platform.</li>
            <li>GanjaranX reserves the right to adjust, cancel, or expire points in cases of fraud, abuse, or account termination.</li>
            <li>Points purchased via GX Top-Up are non-refundable once credited to your account.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-3">4. GX Top-Up Payments</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>All payments for GX Top-Up are processed in Malaysian Ringgit (MYR) via Billplz (FPX) or Stripe (card).</li>
            <li>All transactions are final. We do not offer refunds on purchased points unless required by applicable Malaysian consumer protection law.</li>
            <li>If a payment fails or is disputed, the associated points will not be credited or will be deducted from your balance.</li>
            <li>GanjaranX is not responsible for payment failures caused by your bank or payment provider.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-3">5. Reward Redemptions</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>Rewards are subject to availability. Stock levels are displayed on each reward listing.</li>
            <li>Once a redemption is confirmed and points are deducted, it cannot be reversed.</li>
            <li>Reward vouchers are issued by third-party partner vendors. GanjaranX is not responsible for the quality or availability of partner products and services.</li>
            <li>Vendor-specific terms (e.g., blackout dates for hotels, expiry of vouchers) apply and will be communicated at the time of redemption.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-3">6. Task Completion</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>Points for tasks are awarded only upon verified completion as defined by the task requirements.</li>
            <li>GanjaranX reserves the right to withhold, reverse, or adjust points if a task is found to have been completed fraudulently or in bad faith.</li>
            <li>Point crediting timelines vary by task and are estimates only.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-3">7. User Accounts</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>You must be at least 18 years old to create an account.</li>
            <li>You are responsible for maintaining the confidentiality of your account credentials.</li>
            <li>You may not create multiple accounts. Duplicate accounts may be merged or terminated.</li>
            <li>GanjaranX reserves the right to suspend or terminate accounts that violate these terms.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-3">8. Prohibited Conduct</h2>
          <p className="mb-3">You agree not to:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Use the Platform for any unlawful purpose.</li>
            <li>Attempt to manipulate, exploit, or hack the points system.</li>
            <li>Submit false task completions or fraudulent payment disputes.</li>
            <li>Resell or broker Ganjaran Points or rewards for profit.</li>
            <li>Use automated bots or scripts to interact with the Platform.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-3">9. Intellectual Property</h2>
          <p>
            All content on the Platform including the GanjaranX name, logo, design, and text is the intellectual property of GanjaranX and may not be reproduced or used without written permission.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-3">10. Limitation of Liability</h2>
          <p>
            To the fullest extent permitted by Malaysian law, GanjaranX shall not be liable for any indirect, incidental, or consequential damages arising from your use of the Platform, including but not limited to loss of points, failed redemptions, or payment errors caused by third-party processors.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-3">11. Changes to Terms</h2>
          <p>
            GanjaranX may modify these Terms at any time. Continued use of the Platform after changes are posted constitutes acceptance of the revised Terms. We recommend reviewing this page periodically.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-3">12. Governing Law</h2>
          <p>
            These Terms are governed by the laws of Malaysia. Any disputes shall be subject to the exclusive jurisdiction of the courts of Malaysia.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-3">13. Contact</h2>
          <p>For questions about these Terms, contact us at <a href="mailto:legal@ganjaranx.com" className="text-[#f5a623] hover:underline">legal@ganjaranx.com</a> or visit <a href="https://ganjaranx.com/contact" className="text-[#f5a623] hover:underline">ganjaranx.com/contact</a>.</p>
        </section>

      </div>
    </div>
  );
}
