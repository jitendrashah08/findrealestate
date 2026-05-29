"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "./page.module.css";

export default function Contact() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate premium submit transition
    setFormSubmitted(true);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <main className={styles.main}>
      {/* Background Sky */}
      <div className={styles.contactSky}>
        <Image
          src="/images/back.jpg"
          alt="Sky background"
          fill
          priority
          className={styles.bgImage}
        />
      </div>

      <div className="container">
        <div className={styles.grid}>
          {/* Left Side: Profile Card */}
          <div className={styles.profileCard}>
            <div className={styles.logoWrapper}>
              <Image
                src="/images/js-logo.png"
                alt="Jitendra Shah Brand Logo"
                width={120}
                height={120}
                className={styles.jsLogoImg}
                priority
              />
            </div>
            <h1 className={styles.name}>Jitendra Shah</h1>
            <p className={styles.title}>Broker & Founder</p>
            <p className={styles.bio}>
              Expert guidance. Personal touch. Helping you navigate residential and commercial transactions with absolute clarity and peace of mind.
            </p>

            <div className={styles.contactMethods}>
              <a href="tel:+918451054341" className={styles.methodLink}>
                <span className={styles.methodIcon}>
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                  </svg>
                </span>
                <div className={styles.methodText}>
                  <span className={styles.label}>Cell</span>
                  <span className={styles.value}>+91 8451054341</span>
                </div>
              </a>

              <a href="mailto:shah.jeetu08@gmail.com" className={styles.methodLink}>
                <span className={styles.methodIcon}>
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L20 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                </span>
                <div className={styles.methodText}>
                  <span className={styles.label}>Email</span>
                  <span className={styles.value}>shah.jeetu08@gmail.com</span>
                </div>
              </a>
            </div>
          </div>

          {/* Right Side: Contact Form */}
          <div className={styles.formContainer}>
            <h2 className={styles.formTitle}>Send a Message</h2>
            <p className={styles.formSubtitle}>Let's discuss how we can align with your real estate goals.</p>

            {formSubmitted ? (
              <div className={styles.successMessage}>
                <div className={styles.successIcon}>
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <h3>Message Sent Successfully!</h3>
                <p>Thank you for reaching out. Jitendra will get back to you shortly.</p>
                <button className="btn-round btn-round-primary" onClick={() => setFormSubmitted(false)}>Send Another Message</button>
              </div>
            ) : (
              <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.inputGroup}>
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    id="name"
                    required
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    required
                    placeholder="Enter your email address"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    required
                    rows="5"
                    placeholder="Tell us about your property goals"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  ></textarea>
                </div>
                <button type="submit" className="btn-round btn-round-primary">
                  Submit Message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
