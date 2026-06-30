import Head from 'next/head';
import Link from 'next/link';
import Header from '../components/Header';
import FooterSubscribe from '../components/FooterSubscribe';

const SITE_URL = "https://www.whileushop.com";

export default function About() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'About WhileUShop.com',
    url: `${SITE_URL}/about`,
    description: 'Learn about WhileUShop.com — your trusted source for handpicked online deals, verified coupon codes, promo offers and exclusive discounts from top U.S. stores.',
    publisher: {
      '@type': 'Organization',
      name: 'WhileUShop.com',
      url: SITE_URL,
      logo: `${SITE_URL}/icon-512.png`,
    },
  };

  return (
    <>
      <Head>
        <title>About Us — WhileUShop.com | Deals, Coupons & Promo Codes</title>
        <meta name="description" content="Learn about WhileUShop.com — your trusted source for the best online deals, verified coupon codes, promo offers and exclusive discounts from top U.S. stores. Save More. Shop Smart." />
        <meta name="keywords" content="about WhileUShop, online deals site, coupon codes website, promo codes, who we are, deals community, best deals online, save money shopping, verified coupons" />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="WhileUShop.com" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="About Us — WhileUShop.com" />
        <meta property="og:description" content="Learn about WhileUShop.com — your trusted source for online deals, coupons and promo codes." />
        <meta property="og:url" content={`${SITE_URL}/about`} />
        <meta property="og:image" content={`${SITE_URL}/icon-512.png`} />
        <meta property="og:site_name" content="WhileUShop.com" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="About Us — WhileUShop.com" />
        <meta name="twitter:description" content="Your trusted source for the best online deals, coupons and promo codes." />
        <link rel="canonical" href={`${SITE_URL}/about`} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      </Head>

      <Header search="" onSearch={() => {}} totalCount={0} />

      <main className="static-page">
        <div className="static-container">
          <div className="static-hero">
            <h1>About <span>WhileUShop.com</span></h1>
            <p>Your trusted destination for the best online deals, coupons & promo codes.</p>
          </div>

          <div className="static-content">
            <div className="static-card">
              <div className="static-icon">👋</div>
              <h2>Who We Are</h2>
              <p>Welcome to <strong>WhileUShop.com</strong> — a deals community built for smart shoppers like you. We are a team of passionate deal hunters who spend hours every day scouring top U.S. online stores to find the best discounts, limited-time offers, verified coupon codes, promo codes and freebies so you don't have to.</p>
              <p>Our mission is simple: <strong>Save More. Shop Smart.</strong> We believe everyone deserves access to the best prices, and we're here to make that happen — every single day.</p>
            </div>

            <div className="static-card">
              <div className="static-icon">🎯</div>
              <h2>What We Do</h2>
              <p>Every day we hand-pick the best online deals across all categories including:</p>
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
              <p>We verify every deal and coupon before posting — so you always get real discounts and working promo codes, not fake markups or expired offers.</p>
            </div>

            <div className="static-card">
              <div className="static-icon">🛍️</div>
              <h2>Our Amazon Storefront</h2>
              <p>We also maintain a curated <strong>Amazon Storefront</strong> where you can browse our hand-picked product recommendations organized by category. Whether you're shopping for yourself or looking for a gift, our storefront makes it easy to find quality products at great prices.</p>
            </div>

            <div className="static-card">
              <div className="static-icon">🏷️</div>
              <h2>Verified Coupons & Promo Codes</h2>
              <p>Finding a coupon code that actually works is frustrating. That's why we personally test and verify every promo code before adding it to our site. When you see a coupon on WhileUShop.com, you can trust it works — saving you time and money at checkout.</p>
              <p>We cover promo codes and exclusive discounts from top U.S. online stores, updated daily so you always have access to the latest offers.</p>
            </div>

            <div className="static-card">
              <div className="static-icon">📢</div>
              <h2>Stay Connected</h2>
              <p>Never miss a deal! Follow us on our social channels for real-time updates:</p>
              <ul className="static-list">
                <li>📱 <strong>Telegram</strong> — Fastest updates, direct to your phone</li>
                <li>📘 <strong>Facebook</strong> — Community deals & announcements</li>
                <li>📸 <strong>Instagram</strong> — Visual deals & lifestyle picks</li>
                <li>💬 <strong>WhatsApp</strong> — Quick deal alerts, no chats</li>
                <li>▶️ <strong>YouTube</strong> — Product reviews & deal videos</li>
              </ul>
            </div>

            <div className="static-card">
              <div className="static-icon">⚖️</div>
              <h2>Affiliate Disclosure</h2>
              <p>WhileUShop.com participates in affiliate programs including the Amazon Associates Program and other retailer affiliate programs. When you click our links and make a purchase, we may earn a small commission at <strong>no extra cost to you</strong>. This helps us keep the site running and the deals coming — completely free for you!</p>
            </div>
          </div>

          <div className="static-back">
            <Link href="/" className="back-btn">← Back to Deals</Link>
          </div>
        </div>
      </main>

      <FooterSubscribe />

      <footer className="footer">
        <p>As an Amazon Associate, we earn from qualifying purchases.</p>
        <p>© {new Date().getFullYear()} <a href={SITE_URL}>WhileUShop.com</a> — All rights reserved.</p>
      </footer>
    </>
  );
}
