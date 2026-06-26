import Head from 'next/head';
import Link from 'next/link';
import Header from '../components/Header';

const SITE_URL = "https://www.whileushop.com";

export default function About() {
  return (
    <>
      <Head>
        <title>About Us — WhileUShop.com | Deals, Coupons & Freebies</title>
        <meta name="description" content="Learn about WhileUShop.com — your trusted source for the best Amazon deals, coupon codes, discounts and freebies updated daily. Save More. Shop Smart." />
        <meta name="keywords" content="about WhileUShop, amazon deals site, coupon deals website, who we are, deals community" />
        <meta property="og:title" content="About Us — WhileUShop.com" />
        <meta property="og:description" content="Learn about WhileUShop.com — your trusted source for Amazon deals, coupons and freebies." />
        <meta property="og:url" content={`${SITE_URL}/about`} />
        <meta property="og:image" content={`${SITE_URL}/icon-512.png`} />
        <link rel="canonical" href={`${SITE_URL}/about`} />
      </Head>

      <Header search="" onSearch={() => {}} totalCount={0} />

      <main className="static-page">
        <div className="static-container">
          <div className="static-hero">
            <h1>About <span>WhileUShop.com</span></h1>
            <p>Your trusted destination for the best Amazon deals, coupons & freebies.</p>
          </div>

          <div className="static-content">
            <div className="static-card">
              <div className="static-icon">👋</div>
              <h2>Who We Are</h2>
              <p>Welcome to <strong>WhileUShop.com</strong> — a deals community built for smart shoppers like you. We are a team of passionate deal hunters who spend hours every day scouring Amazon to find the best discounts, limited-time offers, coupon codes, and freebies so you don't have to.</p>
              <p>Our mission is simple: <strong>Save More. Shop Smart.</strong> We believe everyone deserves access to the best prices, and we're here to make that happen — every single day.</p>
            </div>

            <div className="static-card">
              <div className="static-icon">🎯</div>
              <h2>What We Do</h2>
              <p>Every day we hand-pick the best Amazon deals across all categories including:</p>
              <ul className="static-list">
                <li>🔌 Electronics & Gadgets</li>
                <li>🏠 Home & Kitchen</li>
                <li>💄 Beauty & Personal Care</li>
                <li>👗 Fashion & Clothing</li>
                <li>🧸 Toys & Games</li>
                <li>💪 Health & Fitness</li>
                <li>📚 Books & Stationery</li>
                <li>🐾 Pet Supplies</li>
              </ul>
              <p>We verify every deal before posting it — so you always get real discounts, not fake markups.</p>
            </div>

            <div className="static-card">
              <div className="static-icon">🛍️</div>
              <h2>Our Amazon Storefront</h2>
              <p>We also maintain a curated <strong>Amazon Storefront</strong> where you can browse our hand-picked product recommendations organized by category. Whether you're shopping for yourself or looking for a gift, our storefront makes it easy to find quality products at great prices.</p>
            </div>

            <div className="static-card">
              <div className="static-icon">📢</div>
              <h2>Stay Connected</h2>
              <p>Never miss a deal! Follow us on our social channels for real-time updates:</p>
              <ul className="static-list">
                <li>📱 <strong>Telegram</strong> — Fastest updates, direct to your phone</li>
                <li>📘 <strong>Facebook</strong> — Community deals & announcements</li>
                <li>📸 <strong>Instagram</strong> — Visual deals & lifestyle picks</li>
                <li>💬 <strong>WhatsApp</strong> — Quick deal alerts</li>
                <li>▶️ <strong>YouTube</strong> — Product reviews & deal videos</li>
              </ul>
            </div>

            <div className="static-card">
              <div className="static-icon">⚖️</div>
              <h2>Affiliate Disclosure</h2>
              <p>WhileUShop.com is a participant in the Amazon Associates Program, an affiliate advertising program designed to provide a means for sites to earn advertising fees by advertising and linking to Amazon.com. When you click our links and make a purchase, we may earn a small commission at <strong>no extra cost to you</strong>. This helps us keep the site running and the deals coming!</p>
            </div>
          </div>

          <div className="static-back">
            <Link href="/" className="back-btn">← Back to Deals</Link>
          </div>
        </div>
      </main>

      <footer className="footer">
        <p>As an Amazon Associate, we earn from qualifying purchases.</p>
        <p>© {new Date().getFullYear()} <a href={SITE_URL}>WhileUShop.com</a> — All rights reserved.</p>
      </footer>
    </>
  );
}
