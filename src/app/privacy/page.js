"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";

export default function PrivacyPage() {
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
          <h1 className={styles.title}>Privacy <span className="em">Policy</span></h1>
          <p className={styles.subtitle}>
            Last Updated: May 2026. Your privacy is paramount. Read about how FIND Real Estate collects, utilizes, and secures your personal information under strict advisory standards.
          </p>
        </div>

        {/* Content Panel */}
        <div className={`${styles.contentCard} glass`}>
          <div className={styles.section}>
            <h2>1. Information We Collect</h2>
            <p>
              FIND Real Estate collects personal identification information that you voluntarily provide to us when submitting inquiries through our contact forms, interactive mortgage calculators, or job application modules. This information includes:
            </p>
            <ul>
              <li>Contact Details: Your full name, email address, telephone number, and country of residence.</li>
              <li>Financial Profile: Estimated property budget, down payment capacity, and financing preferences when utilizing the Mortgage & Fee Estimator.</li>
              <li>Employment Credentials: Professional bio, CV details, and license registrations when submitting a career application.</li>
            </ul>
          </div>

          <div className={styles.section}>
            <h2>2. How We Use Your Information</h2>
            <p>
              We process your personal information to fulfill transactions and coordinate professional consultations, specifically:
            </p>
            <ul>
              <li>To match your real estate criteria with certified NRI and local Dubai advisors.</li>
              <li>To deliver accurate upfront fee calculations and estimated monthly mortgage payments.</li>
              <li>To process career applications and schedule brokerage interviews with founder Jitendra Shah.</li>
              <li>To send market reports, regulatory updates, and subscription insights (if opted in).</li>
            </ul>
          </div>

          <div className={styles.section}>
            <h2>3. Information Sharing and Disclosure</h2>
            <p>
              FIND Real Estate enforces a strict non-disclosure regime. We do not sell, rent, or trade your personal data to third parties. We share your credentials only with:
            </p>
            <ul>
              <li>Our designated, certified real estate advisors representing your transaction.</li>
              <li>Dubai Land Department (DLD) trustee offices and RERA regulators as legally required to execute unified Contract F/A/B paperwork.</li>
            </ul>
          </div>

          <div className={styles.section}>
            <h2>4. Data Security</h2>
            <p>
              We implement state-of-the-art security safeguards to protect your personal data against unauthorized access, alterations, or disclosure. All transaction profiles, investor documentation, and financial estimations are hosted on secure, encrypted server structures.
            </p>
          </div>

          <div className={styles.section}>
            <h2>5. Contact Data Protection Officer</h2>
            <p>
              For queries, data correction requests, or deletion files, please contact founder Jitendra Shah directly:
            </p>
            <div className={styles.contactDetails}>
              <strong>Jitendra Shah</strong><br />
              Cell: +91 8451054341<br />
              Email: shah.jeetu08@gmail.com
            </div>
            <div style={{ marginTop: '2.4rem' }}>
              <Link href="/about/contact" className="btn-round btn-round-primary">
                Contact Advisory Desk
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
