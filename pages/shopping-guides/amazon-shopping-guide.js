import Head from 'next/head';
import Link from 'next/link';
import Header from '../../components/Header';
import FooterSubscribe from '../../components/FooterSubscribe';

const SITE_URL = 'https://www.whileushop.com';

export default function AmazonShoppingGuide() {
  const schema = [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: 'Amazon Shopping Guide — How to Save Money on Amazon in 2026',
      description: 'Complete Amazon shopping guide with insider tips on coupon codes, Prime benefits, price tracking and deal alerts to save hundreds every month.',
      url: `${SITE_URL}/shopping-guides/amazon-shopping-guide`,
      publisher: { '@type': 'Organization', name: 'WhileUShop.com', url: SITE_URL },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'How do I find the best Amazon deals today?', acceptedAnswer: { '@type': 'Answer', text: 'Visit WhileUShop.com daily for handpicked Amazon deals. You can also use Amazon\'s own Deal of the Day section, set up price alerts on CamelCamelCamel, and subscribe to our Daily Deals Newsletter for the best Amazon coupon codes.' } },
        { '@type': 'Question', name: 'How do I use Amazon coupon codes?', acceptedAnswer: { '@type': 'Answer', text: 'On Amazon, coupon codes are applied at checkout. Click "Apply a gift card or promotion code" on the order summary page and enter the code. Some deals also have clickable coupons on the product page — just click the checkbox next to the coupon to clip it.' } },
        { '@type': 'Question', name: 'Is Amazon Prime worth it?', acceptedAnswer: { '@type': 'Answer', text: 'Amazon Prime costs $139/year and includes free 2-day shipping, Prime Video, Prime Music, Prime Reading and exclusive Prime deals. If you order from Amazon more than once a month, Prime typically pays for itself in shipping savings alone.' } },
        { '@type': 'Question', name: 'When is the best time to buy on Amazon?', acceptedAnswer: { '@type': 'Answer', text: 'The best times are Prime Day (July), Black Friday (November), and Cyber Monday. Amazon also runs Lightning Deals and Deal of the Day every day. Prices fluctuate frequently so using a price tracker like CamelCamelCamel helps.' } },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'Shopping Guides', item: `${SITE_URL}/shopping-guides` },
        { '@type': 'ListItem', position: 3, name: 'Amazon Shopping Guide', item: `${SITE_URL}/shopping-guides/amazon-shopping-guide` },
      ],
    },
  ];

  return (
    <>
      <Head>
        <title>Amazon Shopping Guide 2026 — How to Save Money on Amazon | WhileUShop.com</title>
        <meta name="description" content="Complete Amazon shopping guide for 2026. Learn how to find the best Amazon deals, use coupon codes, maximize Prime benefits and save hundreds every month with insider tips." />
        <meta name="keywords" content="amazon shopping guide, how to save money on amazon, amazon coupon codes, amazon prime tips, amazon deals today, amazon price tracker, best time to buy on amazon, amazon lightning deals guide" />
        <meta name="robots" content="index, follow" />
        <meta property="og:type" content="article" />
        <meta property="og:title" content="Amazon Shopping Guide 2026 — How to Save Money on Amazon" />
        <meta property="og:description" content="Insider tips on Amazon coupon codes, Prime deals, price tracking and more." />
        <meta property="og:url" content={`${SITE_URL}/shopping-guides/amazon-shopping-guide`} />
        <meta property="og:image" content={`${SITE_URL}/icon-512.png`} />
        <link rel="canonical" href={`${SITE_URL}/shopping-guides/amazon-shopping-guide`} />
        {schema.map((s, i) => <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />)}
      </Head>

      <Header search="" onSearch={() => {}} totalCount={0} />

      <nav aria-label="Breadcrumb" style={{ padding: '10px 20px', fontSize: 12, color: '#999' }}>
        <Link href="/" style={{ color: '#ff6b00' }}>Home</Link>
        <span style={{ margin: '0 8px' }}>›</span>
        <Link href="/shopping-guides" style={{ color: '#ff6b00' }}>Shopping Guides</Link>
        <span style={{ margin: '0 8px' }}>›</span>
        <span style={{ color: '#aaa' }}>Amazon Shopping Guide</span>
      </nav>

      <main className="static-page" style={{ paddingTop: 0 }}>
        <div className="static-container">
          <div className="static-hero">
            <h1>🛒 Amazon <span>Shopping Guide</span></h1>
            <p>How to save money on Amazon in 2026 — insider tips, coupon codes & deal strategies.</p>
          </div>

          <div className="static-content">

            <div className="static-card">
              <h2>Why Amazon is the Best Place to Shop Online</h2>
              <p>Amazon is the world's largest online retailer, offering over 350 million products at competitive prices. With features like Prime Free Shipping, Lightning Deals, Subscribe & Save, and daily coupon codes, savvy shoppers can save significantly on almost every purchase.</p>
              <p>At WhileUShop.com, we handpick the best Amazon deals and verified coupon codes every single day — so you never pay full price again. This guide will teach you everything you need to know to shop Amazon like a pro.</p>
            </div>

            <div className="static-card">
              <h2>🏷️ How to Find Amazon Coupon Codes That Actually Work</h2>
              <p>Finding working Amazon coupon codes is easier than most people think. Here are the most reliable methods:</p>
              <ul className="static-list">
                <li><strong>Clip Coupons on Product Pages</strong> — Look for the orange "Coupon" checkbox below the price. Click it to save 5-50% instantly at checkout.</li>
                <li><strong>Amazon Promo Codes</strong> — Enter codes in the "Gift cards & promotional codes" field at checkout.</li>
                <li><strong>Subscribe & Save</strong> — Get 5-15% off on repeat purchases of household items.</li>
                <li><strong>WhileUShop.com Daily Deals</strong> — We post verified Amazon coupon codes every day. <Link href="/" style={{color:'#ff6b00'}}>Browse today's deals →</Link></li>
                <li><strong>Amazon Newsletter</strong> — Subscribe to Amazon's email list for exclusive promo codes.</li>
              </ul>
            </div>

            <div className="static-card">
              <h2>⚡ Amazon Prime — Is It Worth It?</h2>
              <p>Amazon Prime costs $139/year ($14.99/month) and includes:</p>
              <ul className="static-list">
                <li>🚚 Free 2-day shipping on millions of items</li>
                <li>🎬 Prime Video — movies, TV shows, originals</li>
                <li>🎵 Prime Music — 100 million songs ad-free</li>
                <li>📚 Prime Reading — free ebooks and magazines</li>
                <li>⚡ Exclusive Prime Day deals (July)</li>
                <li>🎮 Prime Gaming — free games monthly</li>
                <li>🛒 Early access to Lightning Deals</li>
              </ul>
              <p><strong>Pro tip:</strong> Try Amazon Prime FREE for 30 days before committing. Students get Prime at 50% off. EBT/Medicaid cardholders qualify for Prime at $6.99/month.</p>
            </div>

            <div className="static-card">
              <h2>📅 Best Times to Buy on Amazon</h2>
              <ul className="static-list">
                <li>🏆 <strong>Prime Day (July)</strong> — Amazon's biggest sale. Up to 80% off across all categories.</li>
                <li>🖤 <strong>Black Friday & Cyber Monday (November)</strong> — Massive deals on electronics, toys and more.</li>
                <li>⚡ <strong>Lightning Deals (Daily)</strong> — Time-limited deals lasting 4-12 hours. Check Amazon's "Today's Deals" page.</li>
                <li>🗓️ <strong>End of Month</strong> — Amazon often drops prices at month-end to hit sales targets.</li>
                <li>📦 <strong>New Product Launch Periods</strong> — When new versions release, old versions get deep discounts.</li>
              </ul>
            </div>

            <div className="static-card">
              <h2>💡 Pro Amazon Shopping Tips</h2>
              <ul className="static-list">
                <li><strong>Use CamelCamelCamel</strong> — Track Amazon price history. Never buy at an inflated price again.</li>
                <li><strong>Check Warehouse Deals</strong> — Amazon's open-box section has like-new items at 20-70% off.</li>
                <li><strong>Compare Third-Party Sellers</strong> — Often cheaper than Amazon's own price with Prime shipping.</li>
                <li><strong>Stack Discounts</strong> — Combine coupon codes + clipped coupons + Subscribe & Save for maximum savings.</li>
                <li><strong>Use Amazon Trade-In</strong> — Trade old electronics for Amazon gift cards.</li>
                <li><strong>Check Amazon Outlet</strong> — Overstock items at clearance prices.</li>
              </ul>
            </div>

            <div className="static-card">
              <h2>🛒 Shop Amazon Deals at WhileUShop.com</h2>
              <p>We verify every Amazon deal and coupon code before posting — so you always get real discounts. Browse our latest Amazon deals:</p>
              <div style={{ marginTop: 12 }}>
                <Link href="/" className="library-download-btn" style={{ display: 'inline-block', textDecoration: 'none' }}>View Today's Amazon Deals →</Link>
              </div>
            </div>

            <div className="static-card">
              <h2>❓ Frequently Asked Questions</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div>
                  <h3 style={{ fontSize: 15, fontWeight: 700, color: '#1a1a1a', marginBottom: 6 }}>How do I find the best Amazon deals today?</h3>
                  <p style={{ fontSize: 13, color: '#555', lineHeight: 1.6 }}>Visit WhileUShop.com daily for handpicked Amazon deals. You can also use Amazon's Deal of the Day section, set up price alerts on CamelCamelCamel, and subscribe to our Daily Deals Newsletter.</p>
                </div>
                <div>
                  <h3 style={{ fontSize: 15, fontWeight: 700, color: '#1a1a1a', marginBottom: 6 }}>How do I use Amazon coupon codes?</h3>
                  <p style={{ fontSize: 13, color: '#555', lineHeight: 1.6 }}>Apply codes at checkout in the "Gift cards & promotional codes" field. Some deals have clickable coupons on the product page — just check the box to clip and save automatically.</p>
                </div>
                <div>
                  <h3 style={{ fontSize: 15, fontWeight: 700, color: '#1a1a1a', marginBottom: 6 }}>Is Amazon Prime worth it?</h3>
                  <p style={{ fontSize: 13, color: '#555', lineHeight: 1.6 }}>Yes for most shoppers. If you order from Amazon more than twice a month, Prime pays for itself in free shipping alone — plus you get Prime Video, Music and exclusive deals.</p>
                </div>
                <div>
                  <h3 style={{ fontSize: 15, fontWeight: 700, color: '#1a1a1a', marginBottom: 6 }}>When is the best time to buy on Amazon?</h3>
                  <p style={{ fontSize: 13, color: '#555', lineHeight: 1.6 }}>Prime Day (July) and Black Friday (November) offer the deepest discounts. For daily savings, check Lightning Deals every morning as new deals refresh throughout the day.</p>
                </div>
              </div>
            </div>

          </div>

          <div style={{ display: 'flex', gap: 12, marginTop: 28, flexWrap: 'wrap' }}>
            <Link href="/shopping-guides" className="back-btn">← All Shopping Guides</Link>
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
