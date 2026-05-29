"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import styles from "./page.module.css";

const MOCK_AGENTS = [
  {
    id: 1,
    name: "Alexander Mercer",
    role: "Senior Broker & Advisor",
    specialty: "Manhattan Specialist",
    borough: "Manhattan",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400&auto=format&fit=crop",
    bio: "With over 15 years of luxury residential transactions in Manhattan, Alexander knows every high-rise board and hidden co-op criteria in the city.",
    certified: true,
  },
  {
    id: 2,
    name: "Sarah Jenkins",
    role: "Managing Director",
    specialty: "Brooklyn Townhomes",
    borough: "Brooklyn",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop",
    bio: "Sarah is Brooklyn's go-to advisor for brownstones and historical preservation properties. She combines financial planning background with local mastery.",
    certified: true,
  },
  {
    id: 3,
    name: "Michael Chang",
    role: "Commercial Real Estate Broker",
    specialty: "Queens Properties",
    borough: "Queens",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=400&auto=format&fit=crop",
    bio: "Michael advises corporate developers, retailers, and co-working spaces looking to scale their commercial footprints across Queens and Brooklyn.",
    certified: true,
  },
  {
    id: 4,
    name: "Elena Rostova",
    role: "Leasing & Rentals Director",
    specialty: "Luxury High-Rises",
    borough: "Manhattan",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400&auto=format&fit=crop",
    bio: "Elena specializes in off-market rentals, representing high-net-worth individuals and corporate relocations into Manhattan's most desirable towers.",
    certified: false,
  },
  {
    id: 5,
    name: "Marcus Vance",
    role: "Residential Specialist",
    specialty: "Staten Island Waterfront",
    borough: "Staten Island",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop",
    bio: "Marcus has secured dozens of waterfront and multi-family homes in Staten Island, focusing on families looking for spacious properties.",
    certified: false,
  },
  {
    id: 6,
    name: "Tariq Mahmood",
    role: "Advisor",
    specialty: "Bronx Multi-Family",
    borough: "Bronx",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop",
    bio: "Tariq represents buyers and sellers of multi-family complexes, co-ops, and investment portfolios throughout the Bronx.",
    certified: false,
  }
];

export default function AgentsPage() {
  const [boroughFilter, setBoroughFilter] = useState("all");

  const filteredAgents = useMemo(() => {
    return MOCK_AGENTS.filter((agent) => {
      return boroughFilter === "all" || agent.borough === boroughFilter;
    });
  }, [boroughFilter]);

  const certifiedAgents = useMemo(() => {
    return filteredAgents.filter((agent) => agent.certified);
  }, [filteredAgents]);

  const moreAgents = useMemo(() => {
    return filteredAgents.filter((agent) => !agent.certified);
  }, [filteredAgents]);

  return (
    <main className={styles.main}>
      {/* HERO / WHY SECTION */}
      <section className={styles.hero}>
        <div className="container">
          <div className={styles.heroGrid}>
            <h1 className={styles.title}>
              Why Work with a <span className="em">FIND Agent?</span>
            </h1>
            <p className={styles.subtitle}>
              Our agents aren’t just sales representatives. They are highly vetted local advisors backed by full-stack legal, mortgage, and appraisal support. When you work with FIND, you move forward with confidence.
            </p>
          </div>
        </div>
      </section>

      {/* FILTER BUTTONS */}
      <section className={styles.filtersSection}>
        <div className="container">
          <div className={styles.filterBar}>
            <button
              className={`${styles.filterBtn} ${boroughFilter === "all" ? styles.activeFilter : ""}`}
              onClick={() => setBoroughFilter("all")}
            >
              All Regions
            </button>
            <button
              className={`${styles.filterBtn} ${boroughFilter === "Manhattan" ? styles.activeFilter : ""}`}
              onClick={() => setBoroughFilter("Manhattan")}
            >
              Manhattan
            </button>
            <button
              className={`${styles.filterBtn} ${boroughFilter === "Brooklyn" ? styles.activeFilter : ""}`}
              onClick={() => setBoroughFilter("Brooklyn")}
            >
              Brooklyn
            </button>
            <button
              className={`${styles.filterBtn} ${boroughFilter === "Queens" ? styles.activeFilter : ""}`}
              onClick={() => setBoroughFilter("Queens")}
            >
              Queens
            </button>
            <button
              className={`${styles.filterBtn} ${boroughFilter === "Bronx" ? styles.activeFilter : ""}`}
              onClick={() => setBoroughFilter("Bronx")}
            >
              Bronx
            </button>
            <button
              className={`${styles.filterBtn} ${boroughFilter === "Staten Island" ? styles.activeFilter : ""}`}
              onClick={() => setBoroughFilter("Staten Island")}
            >
              Staten Island
            </button>
          </div>
        </div>
      </section>

      {/* CERTIFIED AGENTS SECTION */}
      {certifiedAgents.length > 0 && (
        <section className={styles.certifiedSection}>
          <div className="container">
            <h2 className={styles.sectionTitle}>
              Certified <span className="em">Agents</span>
            </h2>
            <div className={styles.grid}>
              {certifiedAgents.map((agent) => (
                <div key={agent.id} className={`${styles.card} ${styles.certifiedCard} glass-dark`}>
                  <div className={styles.imgWrapper}>
                    <Image
                      src={agent.image}
                      alt={agent.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className={styles.portrait}
                    />
                    <div className={styles.badge}>Certified</div>
                  </div>
                  <div className={styles.cardBody}>
                    <h3 className={styles.agentName}>{agent.name}</h3>
                    <h4 className={styles.agentRole}>{agent.role}</h4>
                    <p className={styles.agentSpecialty}>{agent.specialty}</p>
                    <p className={styles.agentBio}>{agent.bio}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* MORE AGENTS SECTION */}
      {moreAgents.length > 0 && (
        <section className={styles.moreSection}>
          <div className="container">
            <h2 className={styles.sectionTitle}>
              More <span className="em">Agents</span>
            </h2>
            <div className={styles.grid}>
              {moreAgents.map((agent) => (
                <div key={agent.id} className={`${styles.card} glass`}>
                  <div className={styles.imgWrapper}>
                    <Image
                      src={agent.image}
                      alt={agent.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className={styles.portrait}
                    />
                  </div>
                  <div className={styles.cardBody}>
                    <h3 className={styles.agentName}>{agent.name}</h3>
                    <h4 className={styles.agentRole}>{agent.role}</h4>
                    <p className={styles.agentSpecialty}>{agent.specialty}</p>
                    <p className={styles.agentBio}>{agent.bio}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
