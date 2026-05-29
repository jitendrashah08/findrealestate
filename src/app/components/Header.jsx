"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import styles from "./Header.module.css";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [burgerOpen, setBurgerOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null); // 'paperwork' | 'resources' | 'about' | null
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menus on page transitions
  useEffect(() => {
    setBurgerOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  const toggleDropdown = (menuName) => {
    if (activeDropdown === menuName) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(menuName);
    }
  };

  const isDarkThemePage = pathname.includes("/join") || pathname.includes("/agents");

  return (
    <header
      className={`${styles.header} ${scrolled ? styles.scrolled : ""} ${
        isDarkThemePage ? styles.darkTheme : ""
      }`}
    >
      <div className="container">
        <div className={styles.content}>
          {/* Logo SVG matching the original */}
          <div className={styles.logo}>
            <Link href="/" aria-label="FIND Real Estate Home" className={styles.logoLink}>
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
              {/* Circular personal JS badge */}
              <div className={styles.jsBadge}>
                <Image
                  src="/images/js-logo.png"
                  alt="JS Logo"
                  width={28}
                  height={28}
                  className={styles.jsLogoHeaderImg}
                />
              </div>
            </Link>
          </div>

          {/* Navigation Bar */}
          <nav className={styles.nav}>
            <div className={`${styles.navItem} ${pathname === "/search" ? styles.active : ""}`}>
              <Link href="/search">
                <span data-text="Search">Search</span>
              </Link>
            </div>
            <div className={`${styles.navItem} ${pathname === "/agents" ? styles.active : ""}`}>
              <Link href="/agents">
                <span data-text="Agents">Agents</span>
              </Link>
            </div>
            <div className={`${styles.navItem} ${pathname === "/join" ? styles.active : ""}`}>
              <Link href="/join">
                <span data-text="Join">Join</span>
              </Link>
            </div>

            {/* Dropdown Menu Item 1 */}
            <div className={styles.dropdownContainer}>
              <button
                className={`${styles.navItem} ${activeDropdown === "paperwork" ? styles.dropdownActive : ""}`}
                onClick={() => toggleDropdown("paperwork")}
              >
                <span>Paperwork</span>
                <span className={styles.arrowIcon}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      fillRule="evenodd"
                      d="M17.566 9.431a.8.8 0 0 1 .005 1.131l-1.78 1.797c-.669.674-1.218 1.229-1.708 1.622-.51.41-1.034.712-1.665.792a3.3 3.3 0 0 1-.83 0c-.63-.08-1.154-.382-1.665-.792-.49-.393-1.04-.948-1.707-1.622l-1.781-1.797A.8.8 0 0 1 7.57 9.436L9.32 11.2c.71.716 1.195 1.205 1.606 1.535.398.32.648.424.866.452q.211.027.424 0c.219-.028.468-.133.866-.452.41-.33.897-.819 1.607-1.535l1.747-1.763a.8.8 0 0 1 1.131-.005"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              </button>
              {activeDropdown === "paperwork" && (
                <div className={`${styles.dropdownSheet} glass`}>
                  <Link href="/paperwork?tab=contract-f">Unified Contract F (MOU)</Link>
                  <Link href="/paperwork?tab=contract-a">Unified Contract A (Seller Agreement)</Link>
                  <Link href="/paperwork?tab=contract-b">Unified Contract B (Buyer Agreement)</Link>
                  <Link href="/paperwork?tab=ejari">Ejari Tenancy Registration</Link>
                  <Link href="/paperwork?tab=noc">Developer NOC Request</Link>
                  <Link href="/paperwork?tab=title-deed">DLD Title Deed Transfer</Link>
                </div>
              )}
            </div>

            {/* Dropdown Menu Item 2 */}
            <div className={styles.dropdownContainer}>
              <button
                className={`${styles.navItem} ${activeDropdown === "resources" ? styles.dropdownActive : ""}`}
                onClick={() => toggleDropdown("resources")}
              >
                <span>Resources</span>
                <span className={styles.arrowIcon}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      fillRule="evenodd"
                      d="M17.566 9.431a.8.8 0 0 1 .005 1.131l-1.78 1.797c-.669.674-1.218 1.229-1.708 1.622-.51.41-1.034.712-1.665.792a3.3 3.3 0 0 1-.83 0c-.63-.08-1.154-.382-1.665-.792-.49-.393-1.04-.948-1.707-1.622l-1.781-1.797A.8.8 0 0 1 7.57 9.436L9.32 11.2c.71.716 1.195 1.205 1.606 1.535.398.32.648.424.866.452q.211.027.424 0c.219-.028.468-.133.866-.452.41-.33.897-.819 1.607-1.535l1.747-1.763a.8.8 0 0 1 1.131-.005"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              </button>
              {activeDropdown === "resources" && (
                <div className={`${styles.dropdownSheet} glass`}>
                  <Link href="/blog">Guides & Blog</Link>
                  <Link href="/calculators">Mortgage Calculator</Link>
                  <Link href="/market-report">NYC Market Reports</Link>
                  <Link href="/faq">Homebuyer FAQs</Link>
                </div>
              )}
            </div>

            {/* Dropdown Menu Item 3 */}
            <div className={styles.dropdownContainer}>
              <button
                className={`${styles.navItem} ${activeDropdown === "about" ? styles.dropdownActive : ""}`}
                onClick={() => toggleDropdown("about")}
              >
                <span>About</span>
                <span className={styles.arrowIcon}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      fillRule="evenodd"
                      d="M17.566 9.431a.8.8 0 0 1 .005 1.131l-1.78 1.797c-.669.674-1.218 1.229-1.708 1.622-.51.41-1.034.712-1.665.792a3.3 3.3 0 0 1-.83 0c-.63-.08-1.154-.382-1.665-.792-.49-.393-1.04-.948-1.707-1.622l-1.781-1.797A.8.8 0 0 1 7.57 9.436L9.32 11.2c.71.716 1.195 1.205 1.606 1.535.398.32.648.424.866.452q.211.027.424 0c.219-.028.468-.133.866-.452.41-.33.897-.819 1.607-1.535l1.747-1.763a.8.8 0 0 1 1.131-.005"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              </button>
              {activeDropdown === "about" && (
                <div className={`${styles.dropdownSheet} glass`}>
                  <Link href="/about/story">Our Story</Link>
                  <Link href="/about/press">Press & Media</Link>
                  <Link href="/about/careers">Careers</Link>
                  <Link href="/about/contact">Contact Us</Link>
                </div>
              )}
            </div>
          </nav>

          {/* Action Sign In Button */}
          <div className={styles.actions}>
            <a href="https://app.findrealestate.com/authentication/sign-in" className="btn-round btn-round-primary">
              <span data-text="Sign In">Sign In</span>
            </a>
          </div>

          {/* Mobile Burger Control */}
          <button
            className={`${styles.burgerBtn} ${burgerOpen ? styles.burgerOpen : ""}`}
            onClick={() => setBurgerOpen(!burgerOpen)}
            aria-label="Menu control"
            aria-expanded={burgerOpen}
          >
            <span></span>
            <span></span>
          </button>
        </div>
      </div>

      {/* Full-screen Burger Overlay Menu */}
      <div className={`${styles.burgerMenu} ${burgerOpen ? styles.burgerMenuVisible : ""}`}>
        <div className={styles.burgerMenuContent}>
          <nav className={styles.burgerNav}>
            <Link href="/search" className={styles.burgerLink}>Search</Link>
            <Link href="/agents" className={styles.burgerLink}>Agents</Link>
            <Link href="/join" className={styles.burgerLink}>Join</Link>
            
            <div className={styles.burgerSectionTitle}>Paperwork</div>
            <div className={styles.burgerSublinks}>
              <Link href="/paperwork?tab=contract-f">Unified Contract F (MOU)</Link>
              <Link href="/paperwork?tab=ejari">Ejari Tenancy Registration</Link>
              <Link href="/paperwork?tab=noc">Developer NOC Request</Link>
              <Link href="/paperwork?tab=title-deed">DLD Title Deed Transfer</Link>
            </div>

            <div className={styles.burgerSectionTitle}>Resources</div>
            <div className={styles.burgerSublinks}>
              <Link href="/blog">Guides & Blog</Link>
              <Link href="/calculators">Mortgage Calculator</Link>
              <Link href="/market-report">NYC Market Reports</Link>
            </div>
          </nav>
          
          <div className={styles.burgerActions}>
            <a href="https://app.findrealestate.com/authentication/sign-in" className="btn-round btn-round-primary">
              Sign In
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
