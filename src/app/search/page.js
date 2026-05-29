"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import styles from "./page.module.css";

const MOCK_PROPERTIES = [
  {
    id: 1,
    title: "Luxury Manhattan Penthouse",
    price: 1100000,
    formattedPrice: "$1,100,000",
    location: "Manhattan, NY",
    borough: "Manhattan",
    type: "residential",
    purpose: "buy",
    beds: 3,
    baths: 3,
    sqft: 2200,
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Charming Brooklyn Townhouse",
    price: 849900,
    formattedPrice: "$849,900",
    location: "Brooklyn, NY",
    borough: "Brooklyn",
    type: "residential",
    purpose: "buy",
    beds: 4,
    baths: 3,
    sqft: 2800,
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Modern SoHo Office Space",
    price: 4500,
    formattedPrice: "$4,500 / mo",
    location: "SoHo, Manhattan, NY",
    borough: "Manhattan",
    type: "commercial",
    purpose: "rent",
    beds: 0,
    baths: 2,
    sqft: 1500,
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: 4,
    title: "Astoria Skyline Condo",
    price: 429900,
    formattedPrice: "$429,900",
    location: "Queens, NY",
    borough: "Queens",
    type: "residential",
    purpose: "buy",
    beds: 2,
    baths: 2,
    sqft: 1100,
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: 5,
    title: "Williamsburg Creative Studio",
    price: 2800,
    formattedPrice: "$2,800 / mo",
    location: "Williamsburg, Brooklyn, NY",
    borough: "Brooklyn",
    type: "commercial",
    purpose: "rent",
    beds: 0,
    baths: 1,
    sqft: 900,
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: 6,
    title: "Classic Bronx Industrial Loft",
    price: 365000,
    formattedPrice: "$365,000",
    location: "Bronx, NY",
    borough: "Bronx",
    type: "residential",
    purpose: "buy",
    beds: 1,
    baths: 1.5,
    sqft: 950,
    image: "https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: 7,
    title: "Waterfront Staten Island Villa",
    price: 599900,
    formattedPrice: "$599,900",
    location: "Staten Island, NY",
    borough: "Staten Island",
    type: "residential",
    purpose: "buy",
    beds: 4,
    baths: 4,
    sqft: 3200,
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: 8,
    title: "Long Island City Flat",
    price: 265000,
    formattedPrice: "$265,000",
    location: "Queens, NY",
    borough: "Queens",
    type: "residential",
    purpose: "buy",
    beds: 1,
    baths: 1,
    sqft: 750,
    image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=600&auto=format&fit=crop",
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
            Filter through premium listings verified by top FIND certified agents in New York City.
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
                <option value="all">All Boroughs</option>
                <option value="Manhattan">Manhattan</option>
                <option value="Brooklyn">Brooklyn</option>
                <option value="Queens">Queens</option>
                <option value="Bronx">Bronx</option>
                <option value="Staten Island">Staten Island</option>
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
