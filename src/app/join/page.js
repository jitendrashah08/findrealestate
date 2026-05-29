"use client";

import { useState } from "react";
import styles from "./page.module.css";

export default function JoinPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    license: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className={styles.main}>
      {/* HERO SECTION */}
      <section className={styles.hero}>
        <div className="container">
          <div className={styles.heroContent}>
            <h1 className={styles.title}>
              Join <span className="em">FIND</span>
            </h1>
            <p className={styles.subtitle}>
              Great agents, great culture. We provide industry-leading legal, mortgage, staging, and technological backing to amplify your business.
            </p>
          </div>
        </div>
      </section>

      {/* MEMBERSHIPS / PLANS */}
      <section className={styles.plansSection}>
        <div className="container">
          <h2 className={styles.sectionTitle}>
            Memberships <span className="em">designed for you</span>
          </h2>
          <div className={styles.plansGrid}>
            <div className={`${styles.planCard} glass-dark`}>
              <div className={styles.planTag}>Individual</div>
              <h3>Independent Agent Plan</h3>
              <div className={styles.price}>
                $149 <span className={styles.pricePeriod}>/ mo</span>
              </div>
              <ul className={styles.featuresList}>
                <li>Full legal & compliance support</li>
                <li>In-house staging & marketing assets</li>
                <li>Direct mortgage & appraisal desks</li>
                <li>FIND Hub client pipeline access</li>
              </ul>
            </div>

            <div className={`${styles.planCard} ${styles.featuredPlan}`}>
              <div className={styles.planTag}>Enterprise</div>
              <h3>Custom Monthly Team Pricing</h3>
              <div className={styles.price}>Custom</div>
              <ul className={styles.featuresList}>
                <li>Dedicated marketing staging coordinator</li>
                <li>Exclusive co-branded neighborhood landing pages</li>
                <li>Custom API integrations for lead systems</li>
                <li>1-on-1 broker support and strategy audits</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* AGENT SUCCESS STORIES */}
      <section className={styles.storiesSection}>
        <div className="container">
          <h2 className={styles.sectionTitle}>
            Agent <span className="em">Success Stories</span>
          </h2>
          <div className={styles.storiesGrid}>
            <div className={`${styles.storyCard} glass`}>
              <p className={styles.quote}>
                "Joining FIND doubled my sales volume in less than 12 months. The in-house legal and mortgage desks speed up transactions so I can focus entirely on listing client luxury villas."
              </p>
              <div className={styles.author}>
                <h4>Sarah Jenkins</h4>
                <p>Managing Director, Dubai Marina Specialist</p>
              </div>
            </div>
            <div className={`${styles.storyCard} glass`}>
              <p className={styles.quote}>
                "The staging coordination and custom neighbor marketing co-branding are game changers. My clients are wowed during open houses, and my listings sell faster than average."
              </p>
              <div className={styles.author}>
                <h4>Alexander Mercer</h4>
                <p>Senior Broker, Downtown Dubai Specialist</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DATA PLEDGE SECTION */}
      <section className={styles.pledgeSection}>
        <div className="container">
          <div className={styles.pledgeBox}>
            <h2 className={styles.pledgeTitle}>
              FIND <span className="em">Data Pledge</span>
            </h2>
            <p className={styles.pledgeText}>
              Your database is yours. Unlike typical national agencies, FIND commits to absolute lead and client data privacy. If you ever decide to move, your data, client lists, and history remain 100% yours to export.
            </p>
          </div>
        </div>
      </section>

      {/* HOW TO JOIN / APPLICATION FORM */}
      <section className={styles.joinFormSection}>
        <div className="container">
          <div className={styles.formLayout}>
            <div className={styles.formText}>
              <h2 className={styles.sectionTitle}>
                How to <span className="em">Join FIND</span>
              </h2>
              <p className={styles.formDesc}>
                Ready to elevate your career? Fill out the brief onboarding application. Our Broker Relations team will reach out within 24 hours to coordinate a private strategy consultation.
              </p>
            </div>

            <div className={`${styles.formBox} glass-dark`}>
              {submitted ? (
                <div className={styles.successMessage}>
                  <h3>Thank you for your application!</h3>
                  <p>A member of our Broker Relations team will contact you shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className={styles.form}>
                  <div className={styles.inputGroup}>
                    <label htmlFor="name">Full Name</label>
                    <input
                      type="text"
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Jane Doe"
                    />
                  </div>

                  <div className={styles.inputGroup}>
                    <label htmlFor="email">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="jane@example.com"
                    />
                  </div>

                  <div className={styles.inputGroup}>
                    <label htmlFor="phone">Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="(555) 000-0000"
                    />
                  </div>

                  <div className={styles.inputGroup}>
                    <label htmlFor="license">RE License Number</label>
                    <input
                      type="text"
                      id="license"
                      required
                      value={formData.license}
                      onChange={(e) => setFormData({ ...formData, license: e.target.value })}
                      placeholder="104012XXXXX"
                    />
                  </div>

                  <div className={styles.inputGroup}>
                    <label htmlFor="message">Brief Bio / Message</label>
                    <textarea
                      id="message"
                      rows="4"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell us about your sales focus..."
                    />
                  </div>

                  <button type="submit" className="btn-round btn-round-primary">
                    Submit Application
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
