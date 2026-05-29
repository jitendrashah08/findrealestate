"use client";

import { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import styles from "./page.module.css";

const CONTRACT_TABS = {
  "contract-f": {
    title: "Unified Contract F (MOU)",
    subtitle: "Unified Buyer & Seller Agreement",
    description: "Contract F—commonly referred to as the Memorandum of Understanding (MOU)—is the official, legally binding contract between a property buyer and seller in Dubai. It details the agreed purchase price, payment structures, deposit requirements, and transfer deadlines.",
    commission: "Brokerage commission is typically 2% of the purchase price from both buyer and seller.",
    steps: [
      "Both parties sign Contract F electronically or in person.",
      "The buyer deposits a refundable 10% security check with the agency.",
      "The agency schedules the NOC appointment with the developer.",
      "The ownership is officially transferred at a DLD Trustee Office."
    ],
    documents: [
      "Original Title Deed of the property",
      "Passport copies of both Buyer and Seller",
      "Valid Emirates IDs",
      "Signed Unified Form F"
    ]
  },
  "contract-a": {
    title: "Unified Contract A",
    subtitle: "Seller's Marketing & Listing Agreement",
    description: "Contract A is the official RERA agreement between the property seller and the listing real estate agency. According to Dubai Land Department regulations, an agency cannot market, list, or advertise a property without a signed Contract A.",
    commission: "Commission is agreed upon during listing, typically 2% upon successful sale.",
    steps: [
      "The seller provides original ownership papers.",
      "Agency outlines marketing strategy and price.",
      "Contract A is signed by both seller and agency.",
      "RERA issues a permit number for legal advertising."
    ],
    documents: [
      "Property Title Deed copy",
      "Signed Form A authorization",
      "Emirates ID & Passport copy of owner",
      "Developer service charge clearance certificate"
    ]
  },
  "contract-b": {
    title: "Unified Contract B",
    subtitle: "Buyer's Agency Representation Agreement",
    description: "Contract B is the mandatory RERA agreement between a prospective property buyer and their designated buyer's agent. It outlines the agent's responsibilities, search parameters, and ensures the buyer's interests are protected during negotiations.",
    commission: "Agent commission is typically 2% of the purchased property value, paid upon final transfer.",
    steps: [
      "Buyer defines property requirements and budget.",
      "Agent maps matching properties and off-market listings.",
      "Contract B is executed by both buyer and agent.",
      "Agent arranges private viewings and represents buyer in Contract F."
    ],
    documents: [
      "Valid Passport copy of the Buyer",
      "Emirates ID card copy",
      "Form B client registration"
    ]
  },
  "ejari": {
    title: "Ejari Registration",
    subtitle: "Standardized Dubai Tenancy Contract",
    description: "Ejari ('My Rent' in Arabic) is the mandatory Dubai Land Department system that registers lease agreements. Registration is a legal requirement in Dubai to secure tenant rights, settle lease disputes, and set up local utility accounts.",
    commission: "Lease commission is typically 5% of the annual rent, paid by the tenant to the agency.",
    steps: [
      "Tenant and landlord sign the standardized RERA tenancy contract.",
      "Tenant pays security deposit and post-dated rent checks.",
      "The lease is submitted to the Ejari portal for registration.",
      "DLD issues the official Ejari Certificate with a unique barcode."
    ],
    documents: [
      "Original signed Tenancy Contract",
      "Title Deed of the rented property",
      "Tenant Passport, Visa page & Emirates ID",
      "Landlord Passport copy",
      "Recent DEWA (electricity/water) bill or connection setup"
    ]
  },
  "noc": {
    title: "Developer NOC",
    subtitle: "No Objection Certificate for Sale",
    description: "A Developer NOC is a critical mandatory document issued by master developers (such as Emaar, Nakheel, or Dubai Properties). It certifies that the seller has no outstanding maintenance or service charges, allowing the Dubai Land Department to transfer ownership.",
    commission: "NOC fee ranges from AED 500 to AED 5,000 paid to the developer (typically by the seller).",
    steps: [
      "Apply online or at the developer's office with the signed MOU.",
      "Developer verifies that all community service charges are fully paid.",
      "Seller pays any outstanding balance or admin fee.",
      "Developer issues the physical NOC, valid for 30 days."
    ],
    documents: [
      "Signed MOU / Contract F",
      "Original Title Deed",
      "Emirates ID & Passport copies of Buyer and Seller",
      "Buyer's Manager check for the purchase balance"
    ]
  },
  "title-deed": {
    title: "Title Deed Transfer",
    subtitle: "DLD Trustee Office Transfer of Ownership",
    description: "The Title Deed Transfer is the final legal step in purchasing Dubai real estate. It occurs physically at a Dubai Land Department (DLD) Registration Trustee Office, where ownership is officially updated and the new Title Deed is printed.",
    commission: "DLD transfer fee is 4% of the property value + Trustee admin fees.",
    steps: [
      "Parties gather at a DLD Trustee Office with all original documents.",
      "Trustee verifies developer NOC and Contract F parameters.",
      "Buyer pays DLD fees and hands over manager's checks to seller.",
      "DLD registers the transaction and issues the new Title Deed."
    ],
    documents: [
      "Original signed Developer NOC",
      "Original signed Contract F (MOU)",
      "Emirates IDs & Passport copies of Buyer and Seller",
      "Manager's check for purchase price and DLD fees",
      "Seller's original physical Title Deed"
    ]
  }
};

function PaperworkContent() {
  const [activeTab, setActiveTab] = useState("contract-f");
  const searchParams = useSearchParams();

  useEffect(() => {
    const tabParam = searchParams.get("tab");
    if (tabParam && CONTRACT_TABS[tabParam]) {
      setActiveTab(tabParam);
    }
  }, [searchParams]);

  const currentTab = CONTRACT_TABS[activeTab];

  return (
    <main className={styles.main}>
      {/* Parallax Sky Background */}
      <div className={styles.skyBg}>
        <Image
          src="/images/back.jpg"
          alt="Sky Background"
          fill
          priority
          className={styles.bgImage}
        />
      </div>

      <div className="container">
        <div className={styles.header}>
          <h1 className={styles.title}>Dubai Real Estate <span className="em">Paperwork Guide</span></h1>
          <p className={styles.subtitle}>
            Official Dubai Land Department (DLD) and RERA unified contracts, tenant registration, and transfer processes explained.
          </p>
        </div>

        <div className={styles.layout}>
          {/* Tab Navigation Sidebar */}
          <div className={styles.sidebar}>
            {Object.entries(CONTRACT_TABS).map(([key, value]) => (
              <button
                key={key}
                className={`${styles.tabBtn} ${activeTab === key ? styles.activeTab : ""}`}
                onClick={() => setActiveTab(key)}
              >
                <div className={styles.tabBtnContent}>
                  <h3>{value.title}</h3>
                  <p>{value.subtitle}</p>
                </div>
                <span className={styles.arrow}></span>
              </button>
            ))}
          </div>

          {/* Active Tab Content Card */}
          <div className={`${styles.contentCard} glass`}>
            <div className={styles.cardHeader}>
              <div className={styles.titleBlock}>
                <h2>{currentTab.title}</h2>
                <span className={styles.subtitleBadge}>{currentTab.subtitle}</span>
              </div>
            </div>

            <div className={styles.cardBody}>
              <div className={styles.section}>
                <h3>Overview</h3>
                <p className={styles.description}>{currentTab.description}</p>
                {currentTab.commission && (
                  <div className={styles.infoBox}>
                    <strong>Financial Note: </strong> {currentTab.commission}
                  </div>
                )}
              </div>

              <div className={styles.grid}>
                {/* Steps Column */}
                <div className={styles.column}>
                  <h3>Transaction Steps</h3>
                  <ol className={styles.stepList}>
                    {currentTab.steps.map((step, idx) => (
                      <li key={idx}>
                        <span className={styles.stepNum}>{idx + 1}</span>
                        <p>{step}</p>
                      </li>
                    ))}
                  </ol>
                </div>

                {/* Documents Column */}
                <div className={styles.column}>
                  <h3>Required Documents</h3>
                  <ul className={styles.docList}>
                    {currentTab.documents.map((doc, idx) => (
                      <li key={idx}>
                        <span className={styles.bullet}></span>
                        <p>{doc}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default function PaperworkPage() {
  return (
    <Suspense fallback={
      <main className={styles.main} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', color: '#fff' }}>
        <div style={{ fontSize: '1.2rem', opacity: 0.8 }}>Loading Dubai Paperwork Guide...</div>
      </main>
    }>
      <PaperworkContent />
    </Suspense>
  );
}
