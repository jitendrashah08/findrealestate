"use client";

import { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import styles from "./page.module.css";

const COMMUNITY_DATA = [
  { name: "Downtown Dubai", price: 2400, roi: 7.2, growth: 4.8, type: "Luxury High-Rise" },
  { name: "Palm Jumeirah", price: 4200, roi: 6.5, growth: 8.2, type: "Waterfront Villas/Apts" },
  { name: "Dubai Hills Estate", price: 1800, roi: 8.1, growth: 5.5, type: "Family Communities" },
  { name: "Dubai Marina", price: 1950, roi: 7.8, growth: 3.9, type: "Waterfront Condos" },
  { name: "Jumeirah Village Circle (JVC)", price: 1100, roi: 9.2, growth: 6.1, type: "Affordable Apts" }
];

const GUIDES_DATA = [
  {
    id: "off-plan",
    title: "Dubai Off-Plan Property Buying Guide",
    subtitle: "RERA Regulations & Buyer Safeguards",
    description: "Buying off-plan (under-construction) properties in Dubai offers excellent appreciation potential. The Dubai Land Department (DLD) enforces strict laws to protect buyers.",
    points: [
      "Developer ESCROW Account: All buyer funds must go directly into a project-specific Escrow account monitored by the DLD, not to the developer's personal account.",
      "Construction Milestones: Payments are linked strictly to verified construction stages.",
      "Developer Registration: Developers must own 100% of the project land and deposit a 20% bank guarantee before marketing off-plan units.",
      "Oqood Registration: The off-plan sales contract is registered in the DLD Oqood system, securing your ownership certificate during construction."
    ]
  },
  {
    id: "golden-visa",
    title: "Dubai 10-Year Golden Visa Program",
    subtitle: "Property Investment Residency Requirements",
    description: "Dubai offers an attractive 10-year residency Golden Visa for property investors. This visa allows you to sponsor your family and live in the UAE with full residency benefits.",
    points: [
      "Minimum Investment: A property purchase value of AED 2,000,000 ($545,000 USD) or above.",
      "Mortgage Properties: Eligible if the cash down payment is at least AED 2,000,000 or if the bank approves the visa application.",
      "Off-Plan Eligibility: Off-plan properties are eligible if the developer has completed a significant portion of construction and the investor has paid AED 2,000,000.",
      "Shared Ownership: Husband and wife can combine property shares to reach the AED 2,000,000 threshold."
    ]
  },
  {
    id: "expat-freehold",
    title: "Expat Freehold Areas & Property Ownership",
    subtitle: "Understanding Where Foreigners Can Own Property",
    description: "Expats and foreign investors can purchase properties in designated 'Freehold' zones with 100% complete ownership of both the building and land.",
    points: [
      "Freehold Areas: Major zones like Downtown Dubai, Palm Jumeirah, Dubai Marina, JVC, and Dubai Hills Estate are 100% freehold.",
      "Leasehold Areas: Areas where you purchase the leasehold rights (typically for 99 years) rather than absolute land ownership.",
      "Zero Income Tax: Dubai properties enjoy 0% rental income tax, 0% capital gains tax, and 0% annual property tax.",
      "DLD Fee: A one-time purchase registry fee of 4% of the property value paid directly to the Dubai Land Department."
    ]
  }
];

const FAQS_DATA = [
  {
    q: "Can non-residents and foreigners buy property in Dubai?",
    a: "Yes. Foreigners, non-residents, and expats can legally buy, sell, lease, and inherit properties in designated 'Freehold' zones in Dubai with 100% complete ownership. No local partnership or visa is required to own property."
  },
  {
    q: "What is the total cost of buying a property in Dubai?",
    a: "Apart from the property purchase price, buyers should budget for upfront fees: 4% DLD registration fee, 2% agency commission (+5% VAT), approximately AED 3,000 developer NOC fee, and AED 4,200 Trustee registration fee. If financing, bank setup and mortgage registration fees also apply."
  },
  {
    q: "Is there any property or rental income tax in Dubai?",
    a: "No. Dubai operates a 100% tax-free regime for property. There is 0% capital gains tax, 0% personal income tax on rental returns, and no annual recurring property tax. The only government fee is the one-time 4% DLD registry fee at the time of purchase."
  },
  {
    q: "What is Ejari, and who pays for it?",
    a: "Ejari is the mandatory system in Dubai that registers rental lease agreements with the DLD. It is legally required to connect electricity, water, internet, and settle rental disputes. The Ejari registration fee is typically paid by the tenant or the agency, costing around AED 220."
  },
  {
    q: "How are community maintenance fees calculated?",
    a: "Maintenance fees (also called Service Charges) are paid annually by property owners to maintain common community areas, pools, gyms, and building security. It is calculated per square foot of the property area (e.g., AED 15 to AED 30 per sq ft) and must be approved by the Real Estate Regulatory Agency (RERA)."
  }
];

function ResourcesContent() {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState("calculator");

  // Mortgage Calculator State
  const [propertyPrice, setPropertyPrice] = useState(2500000); // 2.5 Million AED
  const [downPaymentPercent, setDownPaymentPercent] = useState(20);
  const [interestRate, setInterestRate] = useState(4.25);
  const [loanTenure, setLoanTenure] = useState(25);
  const [isFinanced, setIsFinanced] = useState(true);

  useEffect(() => {
    const tabParam = searchParams.get("tab");
    if (tabParam && ["calculator", "market-report", "guides", "faq"].includes(tabParam)) {
      setActiveTab(tabParam);
    }
  }, [searchParams]);

  // Calculations
  const downPaymentAmount = propertyPrice * (downPaymentPercent / 100);
  const loanAmount = isFinanced ? propertyPrice - downPaymentAmount : 0;
  
  // Upfront Fees
  const dldFee = propertyPrice * 0.04;
  const dldAdminFee = 580;
  const agencyCommission = propertyPrice * 0.02;
  const agencyCommissionVat = agencyCommission * 0.05;
  const developerNocFee = 3000;
  const trusteeFee = propertyPrice > 500000 ? 4200 : 2100;
  
  // Financing Fees
  const bankSetupFee = isFinanced ? loanAmount * 0.01 : 0;
  const mortgageRegFee = isFinanced ? (loanAmount * 0.0025) + 290 : 0;

  const totalUpfrontFees = dldFee + dldAdminFee + agencyCommission + agencyCommissionVat + developerNocFee + trusteeFee + bankSetupFee + mortgageRegFee;
  const totalCashRequired = downPaymentAmount + totalUpfrontFees;

  // Monthly Mortgage Installment
  const r = interestRate / 12 / 100;
  const n = loanTenure * 12;
  const monthlyPayment = isFinanced && r > 0
    ? loanAmount * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)
    : isFinanced ? loanAmount / n : 0;

  return (
    <main className={styles.main}>
      {/* Sky Background */}
      <div className={styles.skyBg}>
        <Image
          src="/images/back.jpg"
          alt="Dubai Sky Background"
          fill
          priority
          className={styles.bgImage}
        />
      </div>

      <div className="container">
        {/* Page Header */}
        <div className={styles.header}>
          <h1 className={styles.title}>Dubai Real Estate <span className="em">Resources</span></h1>
          <p className={styles.subtitle}>
            Empowering your investment journey in Dubai. Access real-time mortgage estimators, community ROI breakdowns, and official DLD regulatory guides.
          </p>
        </div>

        {/* Tab Controls */}
        <div className={styles.tabsContainer}>
          <button
            className={`${styles.tabBtn} ${activeTab === "calculator" ? styles.activeTab : ""}`}
            onClick={() => setActiveTab("calculator")}
          >
            Mortgage & Fees Calculator
          </button>
          <button
            className={`${styles.tabBtn} ${activeTab === "market-report" ? styles.activeTab : ""}`}
            onClick={() => setActiveTab("market-report")}
          >
            Market ROI Reports
          </button>
          <button
            className={`${styles.tabBtn} ${activeTab === "guides" ? styles.activeTab : ""}`}
            onClick={() => setActiveTab("guides")}
          >
            Buying & Visa Guides
          </button>
          <button
            className={`${styles.tabBtn} ${activeTab === "faq" ? styles.activeTab : ""}`}
            onClick={() => setActiveTab("faq")}
          >
            Homebuyer FAQs
          </button>
        </div>

        {/* Tab Content Panels */}
        <div className={`${styles.contentCard} glass`}>
          {activeTab === "calculator" && (
            <div className={styles.calcLayout}>
              {/* Sliders Container */}
              <div className={styles.calcInputs}>
                <h2>Mortgage & Fee Estimator</h2>
                <p className={styles.panelDesc}>Adjust the sliders below to calculate the complete upfront cash requirements, government DLD fees, and estimated monthly payments.</p>

                {/* Property Price */}
                <div className={styles.inputGroup}>
                  <div className={styles.inputHeader}>
                    <label>Property Purchase Price</label>
                    <span className={styles.valueDisplay}>AED {propertyPrice.toLocaleString()}</span>
                  </div>
                  <input
                    type="range"
                    min="500000"
                    max="15000000"
                    step="100000"
                    value={propertyPrice}
                    onChange={(e) => setPropertyPrice(Number(e.target.value))}
                    className={styles.rangeInput}
                  />
                  <div className={styles.rangeLabels}>
                    <span>500K</span>
                    <span>7.5M</span>
                    <span>15M+</span>
                  </div>
                </div>

                {/* Finance Toggle */}
                <div className={styles.toggleGroup}>
                  <label>Are you financing this purchase?</label>
                  <div className={styles.toggleButtons}>
                    <button
                      className={isFinanced ? styles.activeToggle : ""}
                      onClick={() => setIsFinanced(true)}
                    >
                      Yes, Mortgage
                    </button>
                    <button
                      className={!isFinanced ? styles.activeToggle : ""}
                      onClick={() => setIsFinanced(false)}
                    >
                      No, 100% Cash
                    </button>
                  </div>
                </div>

                {isFinanced && (
                  <>
                    {/* Down Payment Percent */}
                    <div className={styles.inputGroup}>
                      <div className={styles.inputHeader}>
                        <label>Down Payment</label>
                        <span className={styles.valueDisplay}>
                          {downPaymentPercent}% (AED {downPaymentAmount.toLocaleString()})
                        </span>
                      </div>
                      <input
                        type="range"
                        min="20"
                        max="80"
                        step="5"
                        value={downPaymentPercent}
                        onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                        className={styles.rangeInput}
                      />
                      <div className={styles.rangeLabels}>
                        <span>20% (Resident Min)</span>
                        <span>50%</span>
                        <span>80%</span>
                      </div>
                    </div>

                    {/* Interest Rate */}
                    <div className={styles.inputGroup}>
                      <div className={styles.inputHeader}>
                        <label>Bank Interest Rate</label>
                        <span className={styles.valueDisplay}>{interestRate}%</span>
                      </div>
                      <input
                        type="range"
                        min="2.5"
                        max="7"
                        step="0.25"
                        value={interestRate}
                        onChange={(e) => setInterestRate(Number(e.target.value))}
                        className={styles.rangeInput}
                      />
                      <div className={styles.rangeLabels}>
                        <span>2.5%</span>
                        <span>4.75%</span>
                        <span>7.0%</span>
                      </div>
                    </div>

                    {/* Loan Tenure */}
                    <div className={styles.inputGroup}>
                      <div className={styles.inputHeader}>
                        <label>Loan Tenure</label>
                        <span className={styles.valueDisplay}>{loanTenure} Years</span>
                      </div>
                      <input
                        type="range"
                        min="5"
                        max="25"
                        step="1"
                        value={loanTenure}
                        onChange={(e) => setLoanTenure(Number(e.target.value))}
                        className={styles.rangeInput}
                      />
                      <div className={styles.rangeLabels}>
                        <span>5 Years</span>
                        <span>15 Years</span>
                        <span>25 Years (Max)</span>
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Results Display */}
              <div className={styles.calcResults}>
                <div className={styles.resultsHeader}>
                  {isFinanced ? (
                    <>
                      <h3>Estimated Monthly Payment</h3>
                      <div className={styles.monthlyValue}>
                        AED {Math.round(monthlyPayment).toLocaleString()}
                        <span className={styles.period}>/month</span>
                      </div>
                      <p className={styles.loanDisclaimer}>Based on a mortgage of AED {loanAmount.toLocaleString()} at {interestRate}% for {loanTenure} years.</p>
                    </>
                  ) : (
                    <>
                      <h3>Cash-Purchase Mode</h3>
                      <div className={styles.monthlyValue}>
                        AED {propertyPrice.toLocaleString()}
                        <span className={styles.period}> total</span>
                      </div>
                      <p className={styles.loanDisclaimer}>100% upfront cash purchase. Government registry fees apply.</p>
                    </>
                  )}
                </div>

                <div className={styles.breakdownList}>
                  <h4>Upfront Capital Required</h4>
                  
                  <div className={styles.breakdownRow}>
                    <span>Down Payment amount</span>
                    <span>AED {downPaymentAmount.toLocaleString()}</span>
                  </div>

                  <div className={styles.breakdownRow}>
                    <span>DLD Transfer Fee (4% of Price)</span>
                    <span>AED {dldFee.toLocaleString()}</span>
                  </div>

                  <div className={styles.breakdownRow}>
                    <span>Agency Broker Commission (2% + VAT)</span>
                    <span>AED {(agencyCommission + agencyCommissionVat).toLocaleString()}</span>
                  </div>

                  <div className={styles.breakdownRow}>
                    <span>DLD Trustee Registration Fee</span>
                    <span>AED {trusteeFee.toLocaleString()}</span>
                  </div>

                  <div className={styles.breakdownRow}>
                    <span>Developer NOC Certificate Admin Fee</span>
                    <span>AED {developerNocFee.toLocaleString()}</span>
                  </div>

                  {isFinanced && (
                    <>
                      <div className={styles.breakdownRow}>
                        <span>DLD Mortgage Registration Fee (0.25%)</span>
                        <span>AED {Math.round(mortgageRegFee).toLocaleString()}</span>
                      </div>
                      <div className={styles.breakdownRow}>
                        <span>Bank Loan Processing Fee (1%)</span>
                        <span>AED {bankSetupFee.toLocaleString()}</span>
                      </div>
                    </>
                  )}

                  <div className={`${styles.breakdownRow} ${styles.totalUpfrontFees}`}>
                    <span>Total Purchase Fees & Taxes</span>
                    <span>AED {Math.round(totalUpfrontFees).toLocaleString()}</span>
                  </div>

                  <div className={`${styles.breakdownRow} ${styles.grandTotal}`}>
                    <span>Total Upfront Cash Required</span>
                    <span>AED {Math.round(totalCashRequired).toLocaleString()}</span>
                  </div>
                </div>

                <div className={styles.disclaimerBox}>
                  <strong>Note: </strong> These are government-regulated standards. Actual Developer NOC fees may vary from AED 500 to AED 5,000 depending on the master developer (Emaar, Nakheel, Dubai Properties, etc.).
                </div>
              </div>
            </div>
          )}

          {activeTab === "market-report" && (
            <div className={styles.marketPanel}>
              <h2>Dubai Real Estate Market ROI & Insights</h2>
              <p className={styles.panelDesc}>Dubai properties yield some of the highest rental returns (ROI) globally, averaging 6% to 9% annually, combined with strong capital appreciation.</p>
              
              <div className={styles.tableWrapper}>
                <table className={styles.marketTable}>
                  <thead>
                    <tr>
                      <th>Community Name</th>
                      <th>Community Profile</th>
                      <th>Avg. Price / Sq. Ft.</th>
                      <th>Avg. Annual Rental Yield</th>
                      <th>Q-o-Q Capital Growth</th>
                    </tr>
                  </thead>
                  <tbody>
                    {COMMUNITY_DATA.map((item, idx) => (
                      <tr key={idx}>
                        <td className={styles.communityName}><strong>{item.name}</strong></td>
                        <td>{item.type}</td>
                        <td>AED {item.price.toLocaleString()}</td>
                        <td className={styles.roiCell}>{item.roi}% ROI</td>
                        <td className={styles.growthCell}>+{item.growth}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className={styles.marketSummaryGrid}>
                <div className={styles.summaryCard}>
                  <h4>0% Tax Advantage</h4>
                  <p>All rental returns and capital gains in Dubai are 100% tax-free, boosting net yields compared to other global metropolises.</p>
                </div>
                <div className={styles.summaryCard}>
                  <h4>Strong Rental Demand</h4>
                  <p>High population inflows from business executives and international professionals drive excellent occupancy rates across prime sectors.</p>
                </div>
                <div className={styles.summaryCard}>
                  <h4>DLD Escrow Security</h4>
                  <p>Every off-plan development registers under rigorous government trust setups, rendering transactions completely transparent and protected.</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "guides" && (
            <div className={styles.guidesPanel}>
              <h2>Dubai Real Estate Buyer Guides</h2>
              <p className={styles.panelDesc}>Navigate the Dubai regulatory landscape with ease. Select an article below to examine official rules and guidelines.</p>

              <div className={styles.guidesGrid}>
                {GUIDES_DATA.map((guide) => (
                  <div key={guide.id} className={styles.guideCard}>
                    <div className={styles.guideHeader}>
                      <h3>{guide.title}</h3>
                      <span className={styles.guideSubtitle}>{guide.subtitle}</span>
                    </div>
                    <p className={styles.guideDesc}>{guide.description}</p>
                    <ul className={styles.guidePoints}>
                      {guide.points.map((pt, i) => (
                        <li key={i}>
                          <span className={styles.guideBullet}></span>
                          <p>{pt}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "faq" && (
            <div className={styles.faqPanel}>
              <h2>Frequently Asked Questions</h2>
              <p className={styles.panelDesc}>Quick answers to legal, financial, and procedural queries regarding property investment in Dubai.</p>

              <div className={styles.faqList}>
                {FAQS_DATA.map((faq, idx) => (
                  <div key={idx} className={styles.faqItem}>
                    <h3>
                      <span className={styles.faqQ}>Q</span> {faq.q}
                    </h3>
                    <p>{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

export default function ResourcesPage() {
  return (
    <Suspense fallback={
      <main className={styles.main} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', color: '#fff' }}>
        <div style={{ fontSize: '1.2rem', opacity: 0.8 }}>Loading Dubai Real Estate Resources...</div>
      </main>
    }>
      <ResourcesContent />
    </Suspense>
  );
}
