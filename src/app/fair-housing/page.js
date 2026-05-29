"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";

export default function FairHousingPage() {
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
          <h1 className={styles.title}>Equal Housing <span className="em">Opportunity</span></h1>
          <p className={styles.subtitle}>
            Last Updated: May 2026. FIND Real Estate stands for absolute equality, ethical transactions, and 100% fair access to property investments globally.
          </p>
        </div>

        {/* Content Panel */}
        <div className={`${styles.contentCard} glass`}>
          <div className={styles.section}>
            <h2>1. Our Commitment to Equal Opportunity</h2>
            <p>
              FIND Real Estate, founded by Jitendra Shah, operates under a strict, uncompromised commitment to **Equal Housing Opportunity**. We believe that finding a home, commercial workspace, or investment asset is a fundamental path to alignment, progress, and personal identity. We proudly promote and advocate for ethical real estate practices across our cross-border advisory networks.
            </p>
          </div>

          <div className={styles.section}>
            <h2>2. Non-Discrimination Policy</h2>
            <p>
              Under our corporate regulations and aligned with international human rights standards, FIND Real Estate does not discriminate against any individual in the sale, rental, financing, or advertising of real estate. We offer absolute, equal access to all clients and prospective agents, completely regardless of:
            </p>
            <ul>
              <li>Race, Color, or Ethnic Origin</li>
              <li>Religion, Beliefs, or Creed</li>
              <li>Sex, Gender Identity, or Marital Status</li>
              <li>Handicap, Disability, or Medical Condition</li>
              <li>Familial Status (including families with children)</li>
              <li>National Origin, Citizenship, or Expat Status</li>
            </ul>
          </div>

          <div className={styles.section}>
            <h2>3. Alignment with UAE Anti-Discrimination Laws</h2>
            <p>
              In our Dubai branch, all operations are conducted in strict compliance with the **UAE Federal Decree-Law No. 2 of 2015 on Combating Discrimination and Hatred**. This decree guarantees equality of opportunity and explicitly prohibits any form of discrimination based on religion, creed, doctrine, sect, caste, race, color, or ethnic origin.
            </p>
          </div>

          <div className={styles.section}>
            <h2>4. Responsibilities of Our Certified Advisors</h2>
            <p>
              All advisors, brokers, NRI consultants, and international coordinators affiliated with FIND Real Estate undergo mandatory ethical training and must comply with our Fair Housing guidelines:
            </p>
            <ul>
              <li>Every prospective client must be treated with identical professional respect, diligence, and advisory transparency.</li>
              <li>Under no circumstances will listings, communities, or property allocations be restricted or misrepresented to steer clients based on demographic profiling.</li>
              <li>Violations of this non-discrimination policy by any advisor result in immediate termination of affiliation and forfeiture of splits.</li>
            </ul>
          </div>

          <div className={styles.section}>
            <h2>5. Reaching Out</h2>
            <p>
              If you believe you have experienced discriminatory practices or unequal treatment when interacting with our advisors, please report the incident directly to founder Jitendra Shah:
            </p>
            <div className={styles.contactDetails}>
              <strong>Jitendra Shah</strong><br />
              Cell: +91 8451054341<br />
              Email: shah.jeetu08@gmail.com
            </div>
            <div style={{ marginTop: '3.6rem', textAlign: 'center' }}>
              <Link href="/about/contact" className="btn-round btn-round-primary">
                Contact Management Desk
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
