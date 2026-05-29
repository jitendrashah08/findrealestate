"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./page.module.css";

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Home() {
  const heroRef = useRef(null);
  const skyRef = useRef(null);
  const houseRef = useRef(null);
  const compositeRef = useRef(null);
  const compositeHouseRef = useRef(null);
  const cloud1Ref = useRef(null);
  const cloud2Ref = useRef(null);
  const smokeRef = useRef(null);
  const logoRef = useRef(null);
  const arrowsContainerRef = useRef(null);
  const featuresRef = useRef(null);

  useEffect(() => {
    let scrollTriggerHandler = null;

    // Ensure browser has laid out responsive SVG before measuring path lengths
    const timer = setTimeout(() => {
      if (!heroRef.current) return;

      const tl = gsap.timeline();

      // Query elements for animation
      const title = heroRef.current.querySelector(`.${styles.heroTitle}`);
      const sub = heroRef.current.querySelector(`.${styles.heroSub}`);
      const actions = heroRef.current.querySelector(`.${styles.heroActions}`);

      // Set initial state: building hidden/smaller, clouds centered/large
      gsap.set(houseRef.current, { scale: 0.72, yPercent: 30, opacity: 0, transformOrigin: "bottom center" });
      gsap.set(compositeHouseRef.current, { scale: 0.72, yPercent: 30, transformOrigin: "bottom center" });
      gsap.set(compositeRef.current, { opacity: 0 });
      gsap.set(cloud1Ref.current, { x: "-20vw", yPercent: 0, scale: 1.5, opacity: 0.95 });
      gsap.set(cloud2Ref.current, { x: "20vw", yPercent: 0, scale: 1.5, opacity: 0.95 });
      gsap.set(smokeRef.current, { opacity: 0, scale: 0.75 });
      gsap.set(logoRef.current, { scale: 0.9, opacity: 0 });
      gsap.set([title, sub, actions], { opacity: 0, y: 40 });

      // Create Entrance Timeline
      const entranceTl = gsap.timeline({
        onComplete: () => {
          initScrollTrigger();
        }
      });

      // Entrance Sequence
      entranceTl.to(houseRef.current, {
        opacity: 1,
        yPercent: 12, // sits lower, peeking out a little from the clouds
        scale: 0.85, // slightly smaller peeking scale
        duration: 2.2,
        ease: "power4.out",
      })
      .to(compositeHouseRef.current, {
        yPercent: 12,
        scale: 0.85,
        duration: 2.2,
        ease: "power4.out",
      }, "<")
      .to(cloud1Ref.current, {
        x: "-4vw",
        yPercent: 0,
        scale: 1.0,
        opacity: 0.95, // dense clouds covering building bottom
        duration: 2.4,
        ease: "power3.inOut",
      }, "<") // Start together with house
      .to(cloud2Ref.current, {
        x: "4vw",
        yPercent: 0,
        scale: 1.0,
        opacity: 0.95, // dense clouds covering building bottom
        duration: 2.4,
        ease: "power3.inOut",
      }, "<")
      .to(smokeRef.current, {
        opacity: 0.45,
        scale: 1.0,
        duration: 1.8,
        ease: "power2.out",
      }, "-=1.5")
      .to([title, sub, actions], {
        opacity: 1,
        y: 0,
        stagger: 0.2,
        duration: 1.2,
        ease: "power3.out",
      }, "-=1.4");

      // Once entrance completes, kick off infinite horizontal drift loops
      let driftTweens = [];
      entranceTl.add(() => {
        driftTweens.push(
          gsap.to(cloud1Ref.current, {
            x: "-12vw",
            duration: 35,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          })
        );

        driftTweens.push(
          gsap.to(cloud2Ref.current, {
            x: "12vw",
            duration: 40,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          })
        );

        driftTweens.push(
          gsap.to(smokeRef.current, {
            x: "4vw",
            y: "-1vh",
            scale: 1.03,
            duration: 18,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          })
        );
      });

      let scrollTriggerTimeline = null;

      function initScrollTrigger() {
        if (scrollTriggerTimeline) return;

        // Remove active scroll and touch listeners to prevent redundant executions
        window.removeEventListener("scroll", scrollTriggerHandler);
        window.removeEventListener("touchmove", scrollTriggerHandler);

        // If user scrolls before entrance completes, kill the entrance timeline cleanly so ScrollTrigger begins fluidly from current active coordinates
        if (entranceTl.isActive() || !entranceTl.progress()) {
          entranceTl.kill();
          driftTweens.forEach(t => t.kill());
        }

        // Initialize and measure logo outline paths only when scroll initializes (layout is 100% stable)
        const logoPaths = Array.from(logoRef.current.querySelectorAll("path"));
        
        logoPaths.forEach((path) => {
          const length = path.getTotalLength();
          const actualLength = length > 0 ? length : 1200; // Fallback length
          gsap.set(path, {
            strokeDasharray: actualLength,
            strokeDashoffset: actualLength,
          });
        });

        // Pre-cache bounding client rects to completely prevent layout thrashing
        const rectCache = new Map();
        logoPaths.forEach((path) => {
          rectCache.set(path, path.getBoundingClientRect());
        });

        // Sort paths: First vertically by line (> 50px separation), then horizontally (left to right)
        logoPaths.sort((a, b) => {
          const rectA = rectCache.get(a);
          const rectB = rectCache.get(b);
          
          if (Math.abs(rectA.top - rectB.top) > 50) {
            return rectA.top - rectB.top;
          }
          return rectA.left - rectB.left;
        });

        // Initialize ScrollTrigger scrollTl with numerical scrub for inertia smoothing
        scrollTriggerTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "+=280%", // Pin for 2.8 viewport heights of scroll to slow down transition speeds
            pin: true,
            scrub: 1.2, // Catch-up inertia (matches Lenis scroll duration)
          },
        });

        // 1. Text fades out and rises
        scrollTriggerTimeline.to([title, sub, actions], {
          y: -100,
          opacity: 0,
          stagger: 0.05,
          ease: "power2.out",
          duration: 1.0,
        }, 0);

        // 2. Sky scrolls down slightly (parallax)
        scrollTriggerTimeline.to(skyRef.current, {
          yPercent: 12,
          ease: "none",
          duration: 1.5,
        }, 0);

        // 3. House scales up and rises majestically from its peeking cloud position
        scrollTriggerTimeline.to(houseRef.current, {
          scale: 1.25,
          yPercent: -15, // Emerges from bottom center
          ease: "none",
          duration: 1.5,
        }, 0);

        // 3b. Inner house inside mask scales and translates in perfect sync
        scrollTriggerTimeline.to(compositeHouseRef.current, {
          scale: 1.25,
          yPercent: -15,
          ease: "none",
          duration: 1.5,
        }, 0);

        // 3c. Clouds disperse horizontally and clear up to reveal building
        scrollTriggerTimeline.to(cloud1Ref.current, {
          x: "-18vw",
          opacity: 0.4,
          ease: "none",
          duration: 1.5,
        }, 0);

        scrollTriggerTimeline.to(cloud2Ref.current, {
          x: "18vw",
          opacity: 0.4,
          ease: "none",
          duration: 1.5,
        }, 0);

        // 4. Outline logo fades in fully and rises slowly (starts at 1.2s, ends at 1.7s)
        scrollTriggerTimeline.to(logoRef.current, {
          opacity: 1, // Full white strokes trace themselves over the house windows!
          yPercent: -8,
          scale: 1.03,
          ease: "power2.out",
          duration: 0.5,
        }, 1.2);

        // 4b. Draw logo paths sequentially (starts at 1.2s, ends at 2.5s)
        scrollTriggerTimeline.to(logoPaths, {
          strokeDashoffset: 0,
          ease: "power1.inOut",
          stagger: 0.04, // Flow paths sequentially LTR line-by-line
          duration: 1.3,
        }, 1.2);

        // 5. Build Morphing Transition: after outlines are complete (starts at 2.5s, ends at 3.5s)
        // Main background building fades out
        scrollTriggerTimeline.to(houseRef.current, {
          opacity: 0,
          ease: "power2.out",
          duration: 1.0,
        }, 2.5);

        // Masked logo letters container filled with building fades in
        scrollTriggerTimeline.to(compositeRef.current, {
          opacity: 1,
          ease: "power2.out",
          duration: 1.0,
        }, 2.5);

        // Outline logo path strokes fade away cleanly as the letters container fills
        scrollTriggerTimeline.to(logoRef.current, {
          opacity: 0,
          ease: "power2.out",
          duration: 1.0,
        }, 2.5);

        // Force a ScrollTrigger parameters recalculation
        ScrollTrigger.refresh();
      }

      scrollTriggerHandler = initScrollTrigger;
      window.addEventListener("scroll", scrollTriggerHandler, { once: true });
      window.addEventListener("touchmove", scrollTriggerHandler, { once: true });

      // 2. Arrows Section Scroll Sliding Effect
      if (arrowsContainerRef.current) {
        const cards = arrowsContainerRef.current.querySelectorAll(`.${styles.arrowCard}`);
        cards.forEach((card, idx) => {
          gsap.to(card, {
            yPercent: idx % 2 === 0 ? -15 : 15,
            ease: "none",
            scrollTrigger: {
              trigger: arrowsContainerRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1, // Add smooth scroll catch-up lag to parallax cards
            },
          });
        });
      }

      // 3. Reveal heading effects
      const revealHeadings = document.querySelectorAll(`.${styles.revealHeading}`);
      revealHeadings.forEach((heading) => {
        gsap.fromTo(
          heading,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: heading,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      });

      // Recalculate ScrollTrigger parameters
      ScrollTrigger.refresh();
    }, 150);

    return () => {
      clearTimeout(timer);
      if (scrollTriggerHandler) {
        window.removeEventListener("scroll", scrollTriggerHandler);
        window.removeEventListener("touchmove", scrollTriggerHandler);
      }
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <main className={styles.main}>
      {/* 1. HERO SECTION */}
      <section className={styles.hero} ref={heroRef}>
        {/* Parallax sky layer */}
        <div className={styles.heroSky} ref={skyRef}>
          <Image
            src="/images/back.jpg"
            alt="Sky background"
            fill
            priority
            sizes="100vw"
            className={styles.bgImage}
          />
        </div>

        {/* Graphics overlay container (logo, house, clouds, smoke, overlay bottom fade) */}
        <div className={styles.heroOverlap}>
          {/* House Layer */}
          <div className={styles.heroHouse} ref={houseRef}>
            <Image
              src="/images/house.png"
              alt="Luxury House"
              fill
              priority
              sizes="100vw"
              className={styles.pngImage}
            />
          </div>

          {/* Masked Building Composite Morph Layer */}
          <div className={styles.heroComposite} ref={compositeRef}>
            <div className={styles.heroCompositeHouse} ref={compositeHouseRef}>
              <Image
                src="/images/house.png"
                alt="Luxury House masked"
                fill
                priority
                sizes="100vw"
                className={styles.pngImage}
              />
            </div>
          </div>

          {/* Outline Logo Background Layer */}
          <div className={styles.heroLogo} ref={logoRef}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 977 423" className={styles.heroLogoSvg}>
              <g fill="currentColor">
                <path d="M836.06 1.01c77.3 0 139.94 62.69 139.94 140C976 218.33 913.35 281 836.06 281H702.61V1.01zm-52.82 80.17v119.44h44.58a59.5 59.5 0 0 0 42.21-17.5 59.7 59.7 0 0 0-42.2-101.94z" data-letter="d" />
                <path d="M595.45 183.2V1h80.14v279.99H556.68l-73.33-152.93V281H403.2V1h110.33z" data-letter="n" />
                <path d="M376.19 280.99h-141l61.26-140.29L235.2 1h141v279.99Z" data-letter="i" />
                <path d="M244.55 81.28H81.14v59.42h101.02v80.17H81.14v60.12H1V1h207.91z" data-letter="f" />
                <path d="M610.88 350.4h18.48v13.96h-18.48v31.8c0 3.36.95 6.05 3 7.89 2.03 1.82 5.08 2.63 8.92 2.63 1.47 0 2.85-.14 4.15-.44.8-.19 1.6-.4 2.41-.63v14c-1.04.47-2.48.88-4.34 1.19a42 42 0 0 1-7.12.54c-9 0-15.5-2.16-19.73-6.29-4.13-4.22-6.29-10.69-6.29-19.59v-31.1h-13.3V350.4h13.3v-16.26l19-7.1z" data-letter="t" />
                <path d="M732.73 350.6h18.48v13.96h-18.48v31.8c0 3.36.94 6.05 3 7.89 2.03 1.82 5.07 2.63 8.92 2.63 1.46 0 2.85-.14 4.14-.44.8-.19 1.61-.4 2.42-.63v14c-1.05.47-2.49.87-4.35 1.18a41.7 41.7 0 0 1-7.11.55c-9 0-15.51-2.16-19.74-6.29-4.13-4.22-6.28-10.69-6.28-19.59v-31.1h-13.3V350.6h13.3v-16.27l19-7.09z" data-letter="t2" />
                <path d="M546.65 349c9.3 0 16.6 1.89 21.98 5.56v.01c5.05 3.36 7.93 7.96 8.69 13.85h-16.84a8.17 8.17 0 0 0-4.25-5.34c-2.46-1.42-5.83-2.08-10-2.08-3.8 0-6.8.56-8.9 1.81a5.9 5.9 0 0 0-3.16 5.35c0 2.04.93 3.69 2.67 4.88l.02.02h.02c1.65 1.04 4.26 1.9 7.74 2.66l12.89 2.66c7.04 1.46 12.24 4.18 15.7 8.08v.02a19.26 19.26 0 0 1 5.34 13.6c0 6.48-2.45 11.52-7.36 15.21l-.48.35c-5.18 3.66-12.64 5.56-22.52 5.56-10.33 0-18.42-2.08-24.36-6.13-5.6-3.82-8.77-8.98-9.54-15.53h16.83a10.8 10.8 0 0 0 5.06 7.13l.02.01.02.01c3 1.7 7.02 2.51 11.97 2.51 4.43 0 7.84-.6 10.04-1.97h.02a7.14 7.14 0 0 0 3.54-6.31c0-2.01-.7-3.67-2.18-4.82-1.33-1.21-3.65-2.09-6.73-2.74l-11.49-2.38c-8.15-1.7-14.1-4.2-17.93-7.43l-.37-.32c-3.78-3.44-5.68-7.83-5.68-13.25 0-6.6 2.52-11.66 7.56-15.29h.01c5.09-3.75 12.27-5.69 21.67-5.69" data-letter="s" />
                <path d="M508.46 321v14.52h-51.8v26.64h48.58v14.24h-48.58v28.88h53.48v14.52H437.1V321z" data-letter="e" />
                <path d="M404.3 321v98.8h-19V321z" data-letter="l" />
                <path d="M345.13 349c10.13 0 17.7 2.26 22.87 6.62 5.14 4.35 7.76 10.62 7.76 18.98v31.5c0 2.37.15 4.8.43 7.25v.05c.33 2 .79 4.14 1.37 6.4h-18.92c-.45-1.78-.8-3.68-1.04-5.68a89 89 0 0 1-.24-5l-1.89-.43a22.06 22.06 0 0 1-7.67 8.61c-4 2.58-8.94 3.9-14.86 3.9-6.92 0-12.3-1.73-16.28-5.08-3.96-3.43-5.96-7.95-5.96-13.66 0-6.34 2.35-11.37 7.06-15.18 4.85-3.96 11.65-6.57 20.5-7.77l17.64-2.49.87-.12v-4.54c0-3.14-1.08-5.68-3.3-7.48-2.12-1.9-5.2-2.76-9.05-2.76-3.64 0-6.68.62-9.03 1.95h-.01a9.6 9.6 0 0 0-4.28 5.19h-18.11c1.1-5.64 4.2-10.35 9.35-14.16 5.46-4.03 13.02-6.1 22.79-6.1m10.48 38.26-14.13 2.17c-3.82.57-6.78 1.64-8.76 3.3-2.03 1.71-3.02 4.06-3.02 6.93 0 2.6.96 4.7 2.94 6.13 1.9 1.37 4.37 2.01 7.3 2.01 4.58 0 8.53-1.22 11.8-3.7h.02v-.01c3.26-2.57 5-5.64 5-9.19v-7.81l-1.15.18ZM667.85 349c10.13 0 17.7 2.26 22.87 6.62 5.14 4.35 7.77 10.62 7.77 18.98v31.5c0 2.37.14 4.8.42 7.25v.03l.01.02c.32 2 .78 4.14 1.37 6.4h-18.93c-.45-1.78-.8-3.68-1.04-5.68-.12-1.5-.2-3.17-.24-5l-1.89-.43a22.05 22.05 0 0 1-7.66 8.61c-4.01 2.58-8.95 3.9-14.86 3.9-6.92 0-12.32-1.73-16.29-5.08-3.96-3.43-5.95-7.95-5.95-13.66 0-6.34 2.35-11.37 7.05-15.18 4.85-3.96 11.66-6.57 20.5-7.77l17.65-2.49.86-.12v-4.54c0-3.14-1.08-5.68-3.3-7.48-2.12-1.9-5.2-2.76-9.04-2.76-3.65 0-6.69.62-9.03 1.95h-.02a9.6 9.6 0 0 0-4.28 5.19h-18.1c1.1-5.64 4.19-10.35 9.34-14.16 5.47-4.03 13.03-6.1 22.79-6.1m10.49 38.26-14.14 2.17c-3.81.57-6.78 1.64-8.76 3.3-2.03 1.71-3.01 4.06-3.01 6.93 0 2.6.96 4.7 2.93 6.13 1.9 1.37 4.37 2.01 7.3 2.01 4.58 0 8.54-1.22 11.81-3.7l.02-.01c3.25-2.57 5-5.64 5-9.19v-7.81l-1.15.18Z" data-letter="a" />
                <path d="M269.54 349c7.23 0 13.45 1.46 18.7 4.36a30.73 30.73 0 0 1 12.2 12.07c2.9 5.15 4.36 11.22 4.36 18.27 0 1.47-.05 2.85-.14 4.13-.07.88-.16 1.74-.28 2.57h-53.25l.16 1.14c.63 4.51 2.05 8.16 4.32 10.86l.01.02c3.32 3.82 8.21 5.66 14.48 5.66 3.46 0 6.5-.58 9.1-1.77a12 12 0 0 0 5.65-5.37h17.7a30.76 30.76 0 0 1-10.68 14.2l-.5.36c-5.4 3.77-12.41 5.7-21.13 5.7-7.56 0-14.13-1.42-19.72-4.23l-.54-.28c-5.54-2.99-9.87-7.08-13.02-12.27l-.3-.5c-3.07-5.43-4.62-11.7-4.62-18.82 0-7.23 1.55-13.49 4.62-18.82a32.8 32.8 0 0 1 13.19-12.64c5.63-3.08 12.17-4.64 19.69-4.64m-.28 13.12c-5.76 0-10.36 1.97-13.66 5.96v.01c-1.93 2.42-3.25 5.52-3.98 9.26l-.24 1.19h34.26l-.08-1.08c-.37-4.67-1.8-8.34-4.4-10.86-2.94-3.02-6.95-4.48-11.9-4.48" data-letter="e2" />
                <path d="M789.93 349c7.24 0 13.46 1.46 18.7 4.36a30.73 30.73 0 0 1 12.2 12.07c2.9 5.15 4.36 11.22 4.36 18.27 0 1.47-.05 2.85-.14 4.13-.07.88-.16 1.74-.28 2.57h-53.25l.16 1.14c.63 4.51 2.05 8.16 4.32 10.86l.01.02c3.33 3.82 8.21 5.66 14.48 5.66 3.47 0 6.51-.58 9.1-1.77a12 12 0 0 0 5.65-5.37h17.7a30.75 30.75 0 0 1-10.68 14.2l-.5.36c-5.4 3.77-12.41 5.7-21.13 5.7-7.56 0-14.13-1.42-19.72-4.23l-.54-.28a33.5 33.5 0 0 1-13.02-12.27l-.3-.5c-3.07-5.43-4.62-11.7-4.62-18.82 0-7.23 1.55-13.49 4.62-18.82a32.8 32.8 0 0 1 13.19-12.64c5.63-3.08 12.18-4.64 19.69-4.64m-.28 13.12c-5.76 0-10.36 1.97-13.65 5.96v.01h-.01c-1.93 2.42-3.25 5.52-3.98 9.26l-.24 1.19h34.26l-.08-1.08c-.37-4.67-1.8-8.34-4.4-10.86-2.94-3.02-6.95-4.48-11.9-4.48" data-letter="e3" />
                <path d="M196.08 321c7.17 0 13.36 1.24 18.62 3.69h.01c5.26 2.36 9.3 5.7 12.18 10 2.86 4.3 4.31 9.33 4.31 15.13 0 5.7-1.44 10.68-4.3 14.98-2.88 4.21-6.92 7.55-12.19 10a42.7 42.7 0 0 1-14.92 3.45l-2.06.13 1.37 1.53 35.63 39.89h-26.4l-31.72-41.05-.3-.39h-4.75v41.44H152V321zm-24.52 43.54h23.96c5.27 0 9.46-1.2 12.41-3.74 3.06-2.65 4.55-6.3 4.55-10.84 0-4.6-1.43-8.22-4.4-10.7-2.96-2.55-7.2-3.74-12.56-3.74h-23.96z" data-letter="r" />
              </g>
            </svg>
          </div>

          {/* Drifting Clouds (in front of house and logo) */}
          <div className={styles.heroClouds}>
            <div className={styles.heroCloud} ref={cloud1Ref}>
              <Image src="/images/cloud.png" alt="Cloud" fill sizes="100vw" priority className={styles.bgImage} />
            </div>
            <div className={styles.heroCloud} ref={cloud2Ref}>
              <Image src="/images/cloud.png" alt="Cloud" fill sizes="100vw" priority className={styles.bgImage} />
            </div>
          </div>

          {/* Smoke drift layer */}
          <div className={styles.heroSmoke} ref={smokeRef}>
            <Image src="/images/smoke.png" alt="Smoke drift" fill sizes="100vw" priority className={styles.bgImage} />
          </div>

          {/* Bottom Gradient overlay */}
          <div className={styles.heroOverlay} />
        </div>

        {/* Hero content overlay (behind overlay container graphic layers) */}
        <div className={styles.heroContent}>
          <div className="container">
            <div className={styles.heroTitle}>
              <h1>Find What Moves You</h1>
            </div>
            <p className={styles.heroSub}>
              Expert agents. Real guidance. <span className="em">A clear path to find what’s next.</span>
            </p>
            <div className={styles.heroActions}>
              <Link href="/search" className="btn-round btn-round-primary">
                <span data-text="Find Properties">Find Properties</span>
                <span className={styles.btnIcon}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="m20.78 12.531-6.75 6.75a.75.75 0 1 1-1.06-1.061l5.47-5.47H3.75a.75.75 0 1 1 0-1.5h14.69l-5.47-5.469a.75.75 0 1 1 1.06-1.061l6.75 6.75a.75.75 0 0 1 0 1.061"
                    />
                  </svg>
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>


      {/* 2. WHY US SECTION */}
      <section className={styles.whyUs}>
        <div className="container">
          <div className={styles.whyUsGrid}>
            <h2 className={`${styles.whyUsTitle} ${styles.revealHeading}`}>Why FIND</h2>
            <p className={styles.whyUsText}>
              Your life’s changing. Don’t just find a place — find what’s next.{" "}
              <span className="em">
                We help you move forward with clarity, confidence, and the right agent by your side.
              </span>
            </p>
          </div>
          {/* Background loop video */}
          <div className={styles.videoContainer}>
            <video src="/videos/why-us.mp4" autoPlay playsInline loop muted></video>
          </div>
        </div>
      </section>

      {/* 3. ARROWS SECTION */}
      <section className={styles.arrowsSection} ref={arrowsContainerRef}>
        <div className="container">
          <h2 className={`${styles.arrowsTitle} ${styles.revealHeading}`}>
            This isn’t just <span className="em">about real estate.</span>
          </h2>
          <div className={styles.arrowsContainer}>
            <div className={styles.arrowCard}>
              <Image src="/images/arrows/1.jpg" alt="Moving forward path" fill className={styles.cardImage} sizes="(max-width: 768px) 10vw, 25vw" />
            </div>
            <div className={styles.arrowCard}>
              <Image src="/images/arrows/2.jpg" alt="Beautiful landscape" fill className={styles.cardImage} sizes="(max-width: 768px) 10vw, 25vw" />
            </div>
            <div className={styles.arrowCard}>
              <Image src="/images/arrows/3.jpg" alt="Premium architecture" fill className={styles.cardImage} sizes="(max-width: 768px) 10vw, 25vw" />
            </div>
            <div className={styles.arrowCard}>
              <Image src="/images/arrows/4.jpg" alt="Modern room" fill className={styles.cardImage} sizes="(max-width: 768px) 10vw, 25vw" />
            </div>
          </div>
          <div className={styles.arrowsText}>
            <p>
              It’s about identity. Progress. Getting unstuck. You’re not just looking for a place.{" "}
              <span className="em">You’re looking for alignment. That’s what we help you find.</span>
            </p>
          </div>
        </div>
      </section>

      {/* 4. REWIRED SECTION */}
      <section className={styles.rewired}>
        <div className="container">
          <h2 className={`${styles.rewiredTitle} ${styles.revealHeading}`}>
            <div>Real Estate,</div>
            <div className="em">Rewired.</div>
          </h2>
          <p className={styles.rewiredText}>
            We combine high-end technology with local mastery to deliver a flawless, high-touch transaction experience.
          </p>
        </div>
      </section>

      {/* 5. SERVICES SECTION */}
      <section className={styles.services}>
        <div className="container">
          <div className={styles.servicesHeader}>
            <div className={styles.servicesCaption}>Services</div>
            <h2 className={`${styles.servicesTitle} ${styles.revealHeading}`}>
              How FIND <br /><span className="em">Can Help You</span>
            </h2>
          </div>
        </div>
        <div className={styles.servicesItems}>
          <button className={styles.servicesItem} type="button">
            <div className={styles.servicesItemContent}>
              <div className={styles.servicesItemBg}>
                <Image src="/images/arrows/3.jpg" alt="Buy Service Background" fill priority={false} sizes="100vw" />
              </div>
              <div className={styles.servicesItemNum}></div>
              <div className={styles.servicesItemText}>
                <h3>
                  Buy smarter with expert agents backed by mortgage, legal, and appraisal pros—dialed in to get you the best deal, fast. We’ve done this over 10,000 times, and we know what wins.
                </h3>
              </div>
              <div className={styles.servicesItemMore}>
                <span>Buy</span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M3.315 10.996h16.623l-.884.707-8.084-8.135h2.526l8.261 8.337-8.286 8.337h-2.526l8.11-8.135.883.708H3.315z"></path>
                </svg>
              </div>
            </div>
          </button>
          <button className={styles.servicesItem} type="button">
            <div className={styles.servicesItemContent}>
              <div className={styles.servicesItemBg}>
                <Image src="/images/arrows/1.jpg" alt="Sell Service Background" fill priority={false} sizes="100vw" />
              </div>
              <div className={styles.servicesItemNum}></div>
              <div className={styles.servicesItemText}>
                <h3>
                  Sell fast, sell high. Your listing gets pro staging, strategic pricing, constant open houses, and agents who never stop working until the right buyer signs.
                </h3>
              </div>
              <div className={styles.servicesItemMore}>
                <span>Sell</span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M3.315 10.996h16.623l-.884.707-8.084-8.135h2.526l8.261 8.337-8.286 8.337h-2.526l8.11-8.135.883.708H3.315z"></path>
                </svg>
              </div>
            </div>
          </button>
          <button className={styles.servicesItem} type="button">
            <div className={styles.servicesItemContent}>
              <div className={styles.servicesItemBg}>
                <Image src="/images/arrows/2.jpg" alt="Rent Service Background" fill priority={false} sizes="100vw" />
              </div>
              <div className={styles.servicesItemNum}></div>
              <div className={styles.servicesItemText}>
                <h3>
                  Access premium rentals before they hit the market through agents who know every landlord in town. With decades of Dubai experience, we unlock the best deals you won’t find online.
                </h3>
              </div>
              <div className={styles.servicesItemMore}>
                <span>Rent</span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M3.315 10.996h16.623l-.884.707-8.084-8.135h2.526l8.261 8.337-8.286 8.337h-2.526l8.11-8.135.883.708H3.315z"></path>
                </svg>
              </div>
            </div>
          </button>
        </div>
      </section>

      {/* 6. FEATURES ACCORDION SECTION */}
      <section className={styles.features} ref={featuresRef}>
        <div className="container">
          <h2 className={`${styles.featuresTitle} ${styles.revealHeading}`}>
            Support Beyond <span className="em">Buying and Selling</span>
          </h2>
          <div className={styles.featuresList}>
            <div className={styles.featureItem}>
              <div className={styles.featureHeader}>
                <h3>Mortgage Services</h3>
                <span className={styles.featureDot}></span>
              </div>
              <p className={styles.featureText}>
                We partner with leading institutions to secure competitive rates and accelerated approvals, taking the headache out of property financing.
              </p>
            </div>

            <div className={styles.featureItem}>
              <div className={styles.featureHeader}>
                <h3>Property Management</h3>
                <span className={styles.featureDot}></span>
              </div>
              <p className={styles.featureText}>
                Complete landlord peace-of-mind. Tenant screening, rent collection, emergency repairs, and full local compliance handled 24/7.
              </p>
            </div>

            <div className={styles.featureItem}>
              <div className={styles.featureHeader}>
                <h3>Construction & Development</h3>
                <span className={styles.featureDot}></span>
              </div>
              <p className={styles.featureText}>
                From land acquisition and architectural review to builder selection and interior detailing, we execute design-focused real estate assets.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. LATEST POSTS SECTION */}
      <section className={styles.latestPosts}>
        <div className="container">
          <h2 className={`${styles.latestPostsTitle} ${styles.revealHeading}`}>
            Blog <span className="em">& Resources</span>
          </h2>
          <div className={styles.blogGrid}>
            <div className={styles.blogCard}>
              <div className={styles.blogTag}>Market Update</div>
              <h3>Dubai Real Estate Trend Forecast</h3>
              <p>Analyzing key shifts in home values, mortgage rates, and off-plan launch surges heading into this season.</p>
              <Link href="/resources?tab=market-report">Read Article</Link>
            </div>
            <div className={styles.blogCard}>
              <div className={styles.blogTag}>Buyer Guide</div>
              <h3>Off-Plan vs Ready: The Definitive Guide</h3>
              <p>Everything you need to know about purchasing off-plan projects, escrow protections, and expat freehold zones in Dubai.</p>
              <Link href="/resources?tab=guides">Read Article</Link>
            </div>
          </div>
        </div>
      </section>

      {/* 8. OUTRO SECTION */}
      <section className={styles.outro}>
        <div className="container">
          <div className={styles.outroContent}>
            <h2 className={styles.outroTitle}>
              Find You. <span className="em">We’ll Help You Get There.</span>
            </h2>
            <Link href="/search" className="btn-round btn-round-primary">
              Get Started
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
