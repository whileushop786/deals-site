import Head from 'next/head';
import Link from 'next/link';
import Header from '../components/Header';
import FooterSubscribe from '../components/FooterSubscribe';

const SITE_URL = "https://www.whileushop.com";

export default function WalmartSavings() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Walmart Savings — Best Walmart Deals & Coupons',
    url: `${SITE_URL}/walmart-savings`,
    description: 'Find the best Walmart deals, rollback prices, clearance sales and coupon codes. Save big on groceries, electronics, home goods and more at Walmart.',
    publisher: { '@type': 'Organization', name: 'WhileUShop.com', url: SITE_URL },
  };

  return (
    <>
      <Head>
        <title>Walmart Savings — Best Walmart Deals, Rollbacks & Coupons | WhileUShop.com</title>
        <meta name="description" content="Find the best Walmart deals, rollback prices, clearance sales and verified coupon codes. Save big on groceries, electronics, home goods and more at Walmart — updated daily." />
        <meta name="keywords" content="Walmart deals, Walmart coupons, Walmart rollback, Walmart savings, Walmart clearance, Walmart promo codes, best Walmart prices, Walmart discounts, WhileUShop Walmart" />
        <meta name="robots" content="index, follow" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Walmart Savings — Best Walmart Deals & Coupons" />
        <meta property="og:description" content="Find the best Walmart deals, rollback prices and coupon codes — updated daily at WhileUShop.com." />
        <meta property="og:url" content={`${SITE_URL}/walmart-savings`} />
        <meta property="og:image" content={`${SITE_URL}/icon-512.png`} />
        <meta property="og:site_name" content="WhileUShop.com" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Walmart Savings — Best Walmart Deals & Coupons" />
        <meta name="twitter:description" content="Best Walmart deals, rollbacks and coupons — updated daily." />
        <link rel="canonical" href={`${SITE_URL}/walmart-savings`} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      </Head>

      <Header search="" onSearch={() => {}} totalCount={0} />

      <main className="static-page">
        <div className="static-container">
          <div className="static-hero">
            <h1>Walmart <span>Savings</span></h1>
            <p>Best Walmart deals, rollback prices & verified coupon codes — updated daily.</p>
          </div>

          <div className="static-content">
            <div className="static-card">
              <div className="static-icon">🛒</div>
              <h2>Why Shop Walmart Deals?</h2>
              <p>Walmart is one of the largest retailers in the U.S., offering incredible everyday low prices on groceries, electronics, clothing, home goods, toys and much more. With Walmart's famous Rollback deals and clearance events, you can save hundreds of dollars every month.</p>
              <p>At WhileUShop.com we handpick the best Walmart deals every day so you never miss a great price. From Walmart+ exclusive savings to limited-time clearance offers — we've got you covered.</p>
            </div>

            <div className="static-card">
              <div className="static-icon">💰</div>
              <h2>Types of Walmart Savings</h2>
              <ul className="static-list">
                <li>🔵 <strong>Rollback Deals</strong> — Walmart's signature temporary price reductions</li>
                <li>🟡 <strong>Clearance Items</strong> — Up to 90% off on discontinued products</li>
                <li>🟠 <strong>Special Buy</strong> — Limited-time deals on featured products</li>
                <li>🟢 <strong>Walmart+ Savings</strong> — Exclusive deals for Walmart+ members</li>
                <li>🔴 <strong>Flash Deals</strong> — Short-time offers that sell out fast</li>
                <li>⚪ <strong>Coupon Codes</strong> — Verified promo codes for extra savings</li>
              </ul>
            </div>

            <div className="static-card">
              <div className="static-icon">🏷️</div>
              <h2>Top Walmart Deal Categories</h2>
              <ul className="static-list">
                <li>🛒 Groceries & Household Essentials</li>
                <li>📺 Electronics & TVs</li>
                <li>👗 Clothing & Apparel</li>
                <li>🏠 Home & Furniture</li>
                <li>🧸 Toys & Baby Products</li>
                <li>💊 Health & Beauty</li>
                <li>🌿 Garden & Outdoor</li>
                <li>🐾 Pet Supplies</li>
              </ul>
            </div>

            <div className="static-card">
              <div className="static-icon">💡</div>
              <h2>How to Save More at Walmart</h2>
              <p><strong>1. Stack Coupons</strong> — Combine manufacturer coupons with Walmart's own deals for maximum savings.</p>
              <p><strong>2. Shop Clearance</strong> — Check the clearance section regularly. Walmart marks down items up to 90% off.</p>
              <p><strong>3. Use Walmart+</strong> — Free shipping, fuel discounts and exclusive deals for members.</p>
              <p><strong>4. Price Match</strong> — Walmart will match competitor prices. Just show them the lower price.</p>
              <p><strong>5. Follow WhileUShop</strong> — We post the best Walmart deals daily so you never miss out!</p>
            </div>

            <div className="static-card">
              <div className="static-icon">📢</div>
              <h2>Get Walmart Deals Directly</h2>
              <p>Never miss a Walmart rollback or clearance deal! Follow us for real-time updates:</p>
              <ul className="static-list">
                <li>📱 <strong>Telegram</strong> — <a href="https://t.me/whileushop" style={{color:'#ff6b00'}}>t.me/whileushop</a></li>
                <li>📘 <strong>Facebook</strong> — <a href="https://www.facebook.com/whileushop786" style={{color:'#ff6b00'}}>facebook.com/whileushop786</a></li>
                <li>📸 <strong>Instagram</strong> — <a href="https://instagram.com/crazydealshunter" style={{color:'#ff6b00'}}>@crazydealshunter</a></li>
              </ul>
            </div>
          </div>

          <div className="static-back">
            <Link href="/" className="back-btn">← Back to All Deals</Link>
          </div>
        </div>
      </main>

      <FooterSubscribe />

      <footer className="footer">
        <p>As an Amazon Associate and affiliate partner, we earn from qualifying purchases.</p>
        <p>© {new Date().getFullYear()} <a href={SITE_URL}>WhileUShop.com</a> — All rights reserved.</p>
      </footer>
    </>
  );
}
