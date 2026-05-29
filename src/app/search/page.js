"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import styles from "./page.module.css";

const MOCK_PROPERTIES = [
  {
    id: 1,
    title: "Palm Jumeirah Luxury Apartment",
    price: 950000,
    formattedPrice: "$950,000",
    location: "Palm Jumeirah, Dubai",
    borough: "Palm Jumeirah",
    type: "residential",
    purpose: "buy",
    beds: 2,
    baths: 2,
    sqft: 1800,
    image: "/images/properties/dubai_penthouse.png",
  },
  {
    id: 2,
    title: "Dubai Hills Premium Villa",
    price: 1200000,
    formattedPrice: "$1,200,000",
    location: "Dubai Hills Estate, Dubai",
    borough: "Dubai Hills",
    type: "residential",
    purpose: "buy",
    beds: 4,
    baths: 4,
    sqft: 3400,
    image: "/images/properties/dubai_villa.png",
  },
  {
    id: 3,
    title: "Downtown Skyline Studio",
    price: 4500,
    formattedPrice: "$4,500 / mo",
    location: "Downtown Dubai, Dubai",
    borough: "Downtown Dubai",
    type: "residential",
    purpose: "rent",
    beds: 1,
    baths: 1.5,
    sqft: 950,
    image: "/images/properties/dubai_penthouse.png",
  },
  {
    id: 4,
    title: "Business Bay High-Rise Office",
    price: 5500,
    formattedPrice: "$5,500 / mo",
    location: "Business Bay, Dubai",
    borough: "Business Bay",
    type: "commercial",
    purpose: "rent",
    beds: 0,
    baths: 2,
    sqft: 1600,
    image: "/images/properties/dubai_office.png",
  },
  {
    id: 5,
    title: "Dubai Marina Waterfront Flat",
    price: 580000,
    formattedPrice: "$580,000",
    location: "Dubai Marina, Dubai",
    borough: "Dubai Marina",
    type: "residential",
    purpose: "buy",
    beds: 1,
    baths: 2,
    sqft: 1100,
    image: "/images/properties/dubai_penthouse.png",
  },
  {
    id: 6,
    title: "JBR Waterfront Penthouse",
    price: 1150000,
    formattedPrice: "$1,150,000",
    location: "JBR, Dubai Marina, Dubai",
    borough: "Dubai Marina",
    type: "residential",
    purpose: "buy",
    beds: 3,
    baths: 3.5,
    sqft: 2600,
    image: "/images/properties/dubai_penthouse.png",
  },
  {
    id: 7,
    title: "Executive Office Suite Business Bay",
    price: 3800,
    formattedPrice: "$3,800 / mo",
    location: "Business Bay, Dubai",
    borough: "Business Bay",
    type: "commercial",
    purpose: "rent",
    beds: 0,
    baths: 1.5,
    sqft: 1100,
    image: "/images/properties/dubai_office.png",
  },
  {
    id: 8,
    title: "Luxury Townhouse Dubai Hills",
    price: 890000,
    formattedPrice: "$890,000",
    location: "Dubai Hills Estate, Dubai",
    borough: "Dubai Hills",
    type: "residential",
    purpose: "buy",
    beds: 3,
    baths: 3,
    sqft: 2400,
    image: "/images/properties/dubai_villa.png",
  }
];

export default function SearchPage() {
  const [boroughFilter, setBoroughFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [purposeFilter, setPurposeFilter] = useState("all");
  const [maxPrice, setMaxPrice] = useState(1200000);

  const filteredProperties = useMemo(() => {
    return MOCK_PROPERTIES.filter((prop) => {
      const matchBorough = boroughFilter === "all" || prop.borough === boroughFilter;
      const matchType = typeFilter === "all" || prop.type === typeFilter;
      const matchPurpose = purposeFilter === "all" || prop.purpose === purposeFilter;
      const matchPrice = prop.price <= maxPrice;
      return matchBorough && matchType && matchPurpose && matchPrice;
    });
  }, [boroughFilter, typeFilter, purposeFilter, maxPrice]);

  return (
    <main className={styles.main}>
      <section className={styles.hero}>
        <div className="container">
          <h1 className={styles.title}>
            Find Your <span className="em">Next Space</span>
          </h1>
          <p className={styles.subtitle}>
            Filter through premium listings verified by top FIND certified agents in Dubai.
          </p>
        </div>
      </section>

      {/* FILTER BAR SECTION */}
      <section className={styles.filtersSection}>
        <div className="container">
          <div className={`${styles.filterBar} glass`}>
            {/* Borough Selector */}
            <div className={styles.filterGroup}>
              <label>Location</label>
              <select
                value={boroughFilter}
                onChange={(e) => setBoroughFilter(e.target.value)}
                aria-label="Filter by Location"
              >
                <option value="all">All Locations</option>
                <option value="Downtown Dubai">Downtown Dubai</option>
                <option value="Palm Jumeirah">Palm Jumeirah</option>
                <option value="Dubai Hills">Dubai Hills</option>
                <option value="Dubai Marina">Dubai Marina</option>
                <option value="Business Bay">Business Bay</option>
              </select>
            </div>

            {/* Type Selector */}
            <div className={styles.filterGroup}>
              <label>Property Type</label>
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                aria-label="Filter by Property Type"
              >
                <option value="all">All Types</option>
                <option value="residential">Residential</option>
                <option value="commercial">Commercial</option>
              </select>
            </div>

            {/* Purpose Selector */}
            <div className={styles.filterGroup}>
              <label>Listing Status</label>
              <select
                value={purposeFilter}
                onChange={(e) => setPurposeFilter(e.target.value)}
                aria-label="Filter by Listing Status"
              >
                <option value="all">Buy or Rent</option>
                <option value="buy">For Sale</option>
                <option value="rent">For Rent</option>
              </select>
            </div>

            {/* Price Slider */}
            <div className={styles.filterGroup}>
              <label>Max Budget: ${maxPrice.toLocaleString()}</label>
              <input
                type="range"
                min="2000"
                max="1200000"
                step="10000"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className={styles.slider}
                aria-label="Filter by Max Budget"
              />
            </div>
          </div>
        </div>
      </section>

      {/* LISTINGS GRID */}
      <section className={styles.listingsSection}>
        <div className="container">
          <div className={styles.resultsCount}>
            Showing <span>{filteredProperties.length}</span> premium properties
          </div>
          
          {filteredProperties.length === 0 ? (
            <div className={styles.noResults}>
              <p>No listings match your filter selections. Try expanding your search options.</p>
            </div>
          ) : (
            <div className={styles.grid}>
              {filteredProperties.map((prop) => (
                <div key={prop.id} className={styles.card}>
                  <div className={styles.cardHeader}>
                    <Image
                      src={prop.image}
                      alt={prop.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className={styles.cardImg}
                    />
                    <div className={styles.tag}>
                      {prop.purpose === "buy" ? "For Sale" : "For Rent"}
                    </div>
                  </div>
                  <div className={styles.cardBody}>
                    <h2 className={styles.cardPrice}>{prop.formattedPrice}</h2>
                    <h3 className={styles.cardTitle}>{prop.title}</h3>
                    <p className={styles.cardLoc}>{prop.location}</p>
                    <div className={styles.cardSpecs}>
                      {prop.beds > 0 && <span>{prop.beds} Beds</span>}
                      <span>{prop.baths} Baths</span>
                      <span>{prop.sqft.toLocaleString()} Sq Ft</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
