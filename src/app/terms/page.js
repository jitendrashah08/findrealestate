"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";

export default function TermsPage() {
  return (
    <main className={styles.main}>
      {/* Parallax Sky Background */}
      <div className={styles.skyBg}>
        <Image
          src="/images/back.jpg"
          alt="Dubai Sky Background"
          fill
          priority
          className={styles.bgImage}
        />
      </div>

      <div className="container">
        {/* Page Header */}
        <div className={styles.header}>
          <h1 className={styles.title}>Terms of <span className="em">Service</span></h1>
          <p className={styles.subtitle}>
            Last Updated: May 2026. Please read these terms and conditions carefully before accessing FIND Real Estate's cross-border property advisory platforms.
          </p>
        </div>

        {/* Content Panel */}
        <div className={`${styles.contentCard} glass`}>
          <div className={styles.section}>
            <h2>1. Terms of Agreement</h2>
            <p>
              By accessing, browsing, or utilizing the property portals, calculators, and media assets provided by FIND Real Estate, you acknowledge that you have read, understood, and agreed to be legally bound by these Terms of Service. If you do not agree to these terms, please discontinue your use of our platforms.
            </p>
          </div>

          <div className={styles.section}>
            <h2>2. Scope of Advisory Services</h2>
            <p>
              FIND Real Estate operates a premier cross-border property brokerage network, facilitating investment consultations between buyers in India and licensed developers/brokers in Dubai. 
            </p>
            <ul>
              <li>Information Only: The property prices, ROI indices, capital appreciation estimates, and calculator results displayed on our platforms are for guidance and informational purposes. They do not constitute a formal, binding financial or legal offer.</li>
              <li>Local Regulation Compliance: All property bookings, transfers, leasing registrations (Ejari), and unified agreements must comply strictly with the statutes of the **Dubai Land Department (DLD)** and the **Real Estate Regulatory Agency (RERA)**.</li>
            </ul>
          </div>

          <div className={styles.section}>
            <h2>3. Intellectual Property Rights</h2>
            <p>
              All proprietary algorithms (including our real-time Mortgage & Fee Estimator), site layouts, visual chevrons, interactive services rows, branding icons (including the JS personal logo), and software systems are the exclusive intellectual property of FIND Real Estate and founder Jitendra Shah. No portion of this site may be duplicated, harvested, or exploited without our express written consent.
            </p>
          </div>

          <div className={styles.section}>
            <h2>4. Limitation of Liability</h2>
            <p>
              FIND Real Estate and Jitendra Shah shall not be held liable for any financial decisions, loss of capital, or investment risks incurred by users based on information accessed on this platform. Property markets are inherently fluid; capital growth rates, service charges, and bank interest rates are subjected to market dynamics beyond our control.
            </p>
          </div>

          <div className={styles.section}>
            <h2>5. Governing Law and Dispute Resolutions</h2>
            <p>
              These Terms of Service are governed by and construed in accordance with the federal laws of the United Arab Emirates and the local decrees of the Emirate of Dubai. Any legal actions or disputes arising from these terms shall be subject to the exclusive jurisdiction of the Courts of Dubai.
            </p>
            <div style={{ marginTop: '3.6rem', textAlign: 'center' }}>
              <Link href="/about/contact" className="btn-round btn-round-primary">
                Consult Advisor Office
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
