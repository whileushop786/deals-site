import Head from 'next/head';
import Link from 'next/link';
import Header from '../components/Header';

const SITE_URL = "https://www.whileushop.com";

export default function WayfairHome() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Wayfair Home Deals — Best Wayfair Sales & Coupons',
    url: `${SITE_URL}/wayfair-home`,
    description: 'Find the best Wayfair deals on furniture, home decor, bedding, lighting and more. Save big with verified Wayfair coupon codes and sale events.',
    publisher: { '@type': 'Organization', name: 'WhileUShop.com', url: SITE_URL },
  };

  return (
    <>
      <Head>
        <title>Wayfair Home Deals — Best Wayfair Sales, Coupons & Discounts | WhileUShop.com</title>
        <meta name="description" content="Find the best Wayfair deals on furniture, home decor, bedding, rugs and lighting. Save big with verified Wayfair coupon codes and exclusive sale events — updated daily at WhileUShop.com." />
        <meta name="keywords" content="Wayfair deals, Wayfair coupons, Wayfair sale, Wayfair promo code, Wayfair furniture deals, Wayfair discount, Wayfair clearance, best Wayfair prices, WhileUShop Wayfair" />
        <meta name="robots" content="index, follow" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Wayfair Home Deals — Best Wayfair Sales & Coupons" />
        <meta property="og:description" content="Best Wayfair deals on furniture, home decor and more — updated daily at WhileUShop.com." />
        <meta property="og:url" content={`${SITE_URL}/wayfair-home`} />
        <meta property="og:image" content={`${SITE_URL}/icon-512.png`} />
        <meta property="og:site_name" content="WhileUShop.com" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Wayfair Home Deals — Best Sales & Coupons" />
        <meta name="twitter:description" content="Best Wayfair furniture and home decor deals — updated daily." />
        <link rel="canonical" href={`${SITE_URL}/wayfair-home`} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      </Head>

      <Header search="" onSearch={() => {}} totalCount={0} />

      <main className="static-page">
        <div className="static-container">
          <div className="static-hero">
            <h1>Wayfair <span>Home</span></h1>
            <p>Best Wayfair deals on furniture, home decor & more — updated daily.</p>
          </div>

          <div className="static-content">
            <div className="static-card">
              <div className="static-icon">🏠</div>
              <h2>Why Shop Wayfair Deals?</h2>
              <p>Wayfair is America's go-to destination for home furniture, decor, bedding, rugs, lighting and appliances. With over 40 million products from thousands of suppliers, Wayfair offers something for every style and budget.</p>
              <p>Wayfair regularly holds massive sale events — Way Day (their biggest annual sale), Black Friday, and seasonal clearances where you can save up to 80% on furniture and home goods. WhileUShop.com tracks all these deals so you always get the best price.</p>
            </div>

            <div className="static-card">
              <div className="static-icon">🛋️</div>
              <h2>Best Wayfair Deal Categories</h2>
              <ul className="static-list">
                <li>🛋️ Sofas, Sectionals & Loveseats</li>
                <li>🛏️ Beds, Mattresses & Bedding</li>
                <li>🪑 Dining Tables & Chairs</li>
                <li>🖥️ Office Desks & Chairs</li>
                <li>🏺 Home Decor & Accents</li>
                <li>💡 Lighting & Ceiling Fans</li>
                <li>🛁 Bathroom Vanities & Storage</li>
                <li>🌿 Outdoor & Patio Furniture</li>
                <li>🪴 Rugs & Curtains</li>
              </ul>
            </div>

            <div className="static-card">
              <div className="static-icon">📅</div>
              <h2>Wayfair's Biggest Sale Events</h2>
              <ul className="static-list">
                <li>🏆 <strong>Way Day</strong> — Wayfair's biggest annual sale (April/May), up to 80% off</li>
                <li>🖤 <strong>Black Friday</strong> — Massive sitewide discounts in November</li>
                <li>🎄 <strong>Holiday Sales</strong> — Christmas & New Year deals</li>
                <li>☀️ <strong>Summer Clearance</strong> — Outdoor furniture up to 70% off</li>
                <li>🏠 <strong>Open Box Deals</strong> — Like-new items at fraction of the price</li>
              </ul>
            </div>

            <div className="static-card">
              <div className="static-icon">💡</div>
              <h2>Tips to Save More at Wayfair</h2>
              <p><strong>1. Sign up for emails</strong> — Get 10% off your first order with Wayfair email signup.</p>
              <p><strong>2. Shop Open Box</strong> — Wayfair's Open Box section has returned/refurbished items at huge discounts.</p>
              <p><strong>3. Use Wayfair Credit Card</strong> — Earn 5% back on every Wayfair purchase.</p>
              <p><strong>4. Free shipping</strong> — Wayfair offers free shipping on most orders over $35.</p>
              <p><strong>5. Follow WhileUShop</strong> — We post every major Wayfair sale and coupon code the moment it goes live!</p>
            </div>

            <div className="static-card">
              <div className="static-icon">📢</div>
              <h2>Get Wayfair Deals First</h2>
              <p>Be the first to know about Wayfair sales and exclusive coupon codes:</p>
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

      <footer className="footer">
        <p>As an affiliate partner, we earn from qualifying purchases.</p>
        <p>© {new Date().getFullYear()} <a href={SITE_URL}>WhileUShop.com</a> — All rights reserved.</p>
      </footer>
    </>
  );
}
