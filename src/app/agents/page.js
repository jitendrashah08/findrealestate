"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import styles from "./page.module.css";

const MOCK_AGENTS = [
  {
    id: 1,
    name: "Tariq Al-Mansoori",
    role: "Managing Director",
    specialty: "Palm Jumeirah & Waterfront Luxury",
    borough: "Dubai Local",
    image: "/images/agents/agent_tariq.png",
    bio: "Tariq has guided high-net-worth international buyers for over a decade in Dubai, specializing in off-market penthouses on the Palm Jumeirah and grand mansions in Emirates Hills.",
    certified: true,
  },
  {
    id: 2,
    name: "Rahul Sharma",
    role: "Senior Investment Broker",
    specialty: "NRI Investment Advisory & Downtown Dubai",
    borough: "Indian Certified",
    image: "/images/agents/agent_rahul.png",
    bio: "Rahul specializes in helping NRI investors build high-yield property portfolios in Downtown Dubai, Dubai Hills, and Business Bay, combining deep Indian market insights with local mastery.",
    certified: true,
  },
  {
    id: 3,
    name: "Priya Nair",
    role: "Residential Sales Director",
    specialty: "Dubai Hills Estate Townhouses",
    borough: "Indian Certified",
    image: "/images/agents/agent_priya.png",
    bio: "Priya is the go-to advisor for Indian families relocating to Dubai's premium villa communities, offering smooth assistance with mortgages, resident visas, and school choices.",
    certified: true,
  },
  {
    id: 4,
    name: "Elena Rostova",
    role: "Leasing & Commercial Advisor",
    specialty: "Business Bay High-Rises",
    borough: "Dubai Local",
    image: "/images/agents/agent_elena.png",
    bio: "Elena manages corporate relocations and full-floor high-rise office leases in Business Bay, representing top multinational entities and tech startups.",
    certified: true,
  },
  {
    id: 5,
    name: "Amit Patel",
    role: "Investment Advisor",
    specialty: "Downtown Studios & Apartments",
    borough: "Indian Certified",
    image: "/images/agents/agent_rahul.png",
    bio: "Amit assists first-time buyers looking to secure high-growth rental properties and vacation flats in Downtown Dubai and Dubai Marina.",
    certified: false,
  },
  {
    id: 6,
    name: "Fatima Al-Hashimi",
    role: "Residential Consultant",
    specialty: "Dubai Marina Waterfront Penthouses",
    borough: "Dubai Local",
    image: "/images/agents/agent_elena.png",
    bio: "Fatima focuses on high-floor luxury apartments in Dubai Marina, providing buyers with detailed yield analysis and property valuation guidance.",
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
              className={`${styles.filterBtn} ${boroughFilter === "Dubai Local" ? styles.activeFilter : ""}`}
              onClick={() => setBoroughFilter("Dubai Local")}
            >
              Dubai Local
            </button>
            <button
              className={`${styles.filterBtn} ${boroughFilter === "Indian Certified" ? styles.activeFilter : ""}`}
              onClick={() => setBoroughFilter("Indian Certified")}
            >
              Indian Certified
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
