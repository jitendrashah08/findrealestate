"use client";

import Link from "next/link";
import Image from "next/image";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.grid}>
          {/* Brand Info */}
          <div className={styles.brand}>
            <div className={styles.logo}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 975 280">
                <path
                  fill="currentColor"
                  d="M836.06 1.01c77.3 0 139.94 62.69 139.94 140C976 218.33 913.35 281 836.06 281H702.61V1.01zm-52.82 80.17v119.44h44.58a59.5 59.5 0 0 0 42.21-17.5 59.7 59.7 0 0 0-42.2-101.94z"
                  data-letter="f"
                />
                <path
                  fill="currentColor"
                  d="M595.45 183.2V1h80.14v279.99H556.68l-73.33-152.93V281H403.2V1h110.33z"
                  data-letter="i"
                />
                <path
                  fill="currentColor"
                  d="M376.19 280.99h-141l61.26-140.29L235.2 1h141v279.99Z"
                  data-letter="n"
                />
                <path
                  fill="currentColor"
                  d="M244.55 81.28H81.14v59.42h101.02v80.17H81.14v60.12H1V1h207.91z"
                  data-letter="d"
                />
              </svg>
            </div>
            <p className={styles.description}>
              Expert agents. Real guidance. <span className="em">A clear path to find what’s next.</span>
            </p>

            {/* Personalized Founder Contact Section */}
            <div className={styles.founderCard}>
              <div className={styles.founderHeader}>
                <div className={styles.founderLogoWrapper}>
                  <Image
                    src="/images/js-logo.png"
                    alt="Jitendra Shah Brand Logo"
                    width={44}
                    height={44}
                    className={styles.jsLogoImg}
                  />
                </div>
                <div className={styles.founderMeta}>
                  <h4 className={styles.founderName}>Jitendra Shah</h4>
                  <span className={styles.founderTitle}>Principal Broker & Founder</span>
                </div>
              </div>
              <div className={styles.founderContact}>
                <a href="tel:+918451054341" className={styles.contactItem}>
                  <svg className={styles.contactIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                  </svg>
                  <span>+91 8451054341</span>
                </a>
                <a href="mailto:shah.jeetu08@gmail.com" className={styles.contactItem}>
                  <svg className={styles.contactIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L20 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                  <span>shah.jeetu08@gmail.com</span>
                </a>
              </div>
            </div>
          </div>

          {/* Nav Links columns */}
          <div className={styles.linksColumn}>
            <h3>Properties</h3>
            <Link href="/search">Search Listings</Link>
            <Link href="/search?type=residential">Residential Homes</Link>
            <Link href="/search?type=commercial">Commercial Real Estate</Link>
            <Link href="/search?type=rent">Rentals & Apartments</Link>
          </div>

          <div className={styles.linksColumn}>
            <h3>Company</h3>
            <Link href="/agents">Our Agents</Link>
            <Link href="/join">Join as Agent</Link>
            <Link href="/about/story">Our Story</Link>
            <Link href="/about/careers">Careers</Link>
          </div>

          <div className={styles.linksColumn}>
            <h3>Resources</h3>
            <Link href="/blog">Blog & Guides</Link>
            <Link href="/calculators">Mortgage Calculator</Link>
            <Link href="/faq">Help Center & FAQ</Link>
            <Link href="/about/contact">Contact Us</Link>
          </div>
        </div>

        {/* Newsletter & Socials */}
        <div className={styles.bottomSection}>
          <div className={styles.newsletter}>
            <h4>Subscribe for Market Insights</h4>
            <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
              <input type="email" placeholder="Your email address" aria-label="Newsletter email" required />
              <button type="submit" className="btn-round btn-round-primary">
                Subscribe
              </button>
            </form>
          </div>

          <div className={styles.socials}>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
          </div>
        </div>

        {/* Copyright */}
        <div className={styles.copyright}>
          <p>© {new Date().getFullYear()} FIND Real Estate. All rights reserved.</p>
          <div className={styles.legalLinks}>
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/terms">Terms of Service</Link>
            <Link href="/fair-housing">Equal Housing Opportunity</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
