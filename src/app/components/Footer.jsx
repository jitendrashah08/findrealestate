"use client";

import Link from "next/link";
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
