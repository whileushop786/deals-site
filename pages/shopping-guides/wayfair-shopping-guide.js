import Head from 'next/head';
import Link from 'next/link';
import Header from '../../components/Header';
import FooterSubscribe from '../../components/FooterSubscribe';

const SITE_URL = 'https://www.whileushop.com';

export default function WayfairShoppingGuide() {
  const schema = [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: 'Wayfair Shopping Guide 2026 — Way Day, Open Box & Savings Tips',
      description: 'Complete Wayfair shopping guide with tips on Way Day deals, open box furniture, free shipping and the best times to buy home goods at Wayfair.',
      url: `${SITE_URL}/shopping-guides/wayfair-shopping-guide`,
      publisher: { '@type': 'Organization', name: 'WhileUShop.com', url: SITE_URL },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'When is Wayfair Way Day?', acceptedAnswer: { '@type': 'Answer', text: 'Wayfair Way Day typically takes place in April or May each year. It is Wayfair\'s biggest annual sale event with discounts of up to 80% on furniture, home decor, bedding and more.' } },
        { '@type': 'Question', name: 'Does Wayfair offer free shipping?', acceptedAnswer: { '@type': 'Answer', text: 'Yes, Wayfair offers free shipping on most orders over $35. Large items like furniture get free shipping regardless of order size in most cases.' } },
        { '@type': 'Question', name: 'What is Wayfair Open Box?', acceptedAnswer: { '@type': 'Answer', text: 'Wayfair Open Box items are customer returns or display models sold at significant discounts — often 20-60% below regular price. They are inspected and graded before resale.' } },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'Shopping Guides', item: `${SITE_URL}/shopping-guides` },
        { '@type': 'ListItem', position: 3, name: 'Wayfair Shopping Guide', item: `${SITE_URL}/shopping-guides/wayfair-shopping-guide` },
      ],
    },
  ];

  return (
    <>
      <Head>
        <title>Wayfair Shopping Guide 2026 — Way Day, Open Box & Best Deals | WhileUShop.com</title>
        <meta name="description" content="Complete Wayfair shopping guide for 2026. Learn about Way Day deals, open box furniture, free shipping tips and the best times to buy home goods and furniture at Wayfair." />
        <meta name="keywords" content="wayfair shopping guide, wayfair way day, wayfair open box, wayfair free shipping, wayfair coupon code, best time to buy wayfair furniture, wayfair deals today, wayfair sale dates 2026" />
        <meta name="robots" content="index, follow" />
        <meta property="og:type" content="article" />
        <meta property="og:title" content="Wayfair Shopping Guide 2026 — Way Day, Open Box & Best Deals" />
        <meta property="og:description" content="Expert tips on Wayfair Way Day, open box deals and the best times to buy furniture." />
        <meta property="og:url" content={`${SITE_URL}/shopping-guides/wayfair-shopping-guide`} />
        <meta property="og:image" content={`${SITE_URL}/icon-512.png`} />
        <link rel="canonical" href={`${SITE_URL}/shopping-guides/wayfair-shopping-guide`} />
        {schema.map((s, i) => <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />)}
      </Head>

      <Header search="" onSearch={() => {}} totalCount={0} />

      <nav aria-label="Breadcrumb" style={{ padding: '10px 20px', fontSize: 12, color: '#999' }}>
        <Link href="/" style={{ color: '#ff6b00' }}>Home</Link>
        <span style={{ margin: '0 8px' }}>›</span>
        <Link href="/shopping-guides" style={{ color: '#ff6b00' }}>Shopping Guides</Link>
        <span style={{ margin: '0 8px' }}>›</span>
        <span style={{ color: '#aaa' }}>Wayfair Shopping Guide</span>
      </nav>

      <main className="static-page" style={{ paddingTop: 0 }}>
        <div className="static-container">
          <div className="static-hero">
            <h1>🛋️ Wayfair <span>Shopping Guide</span></h1>
            <p>How to save money at Wayfair in 2026 — Way Day, open box deals & insider tips.</p>
          </div>

          <div className="static-content">
            <div className="static-card">
              <h2>Why Shop at Wayfair</h2>
              <p>Wayfair is America's largest online home store with over 40 million products from thousands of suppliers. From sofas and beds to rugs and lighting, Wayfair offers something for every style and budget. With frequent sales, free shipping on most orders and an excellent return policy, Wayfair is the go-to destination for home furnishing deals.</p>
            </div>

            <div className="static-card">
              <h2>🏆 Wayfair Way Day — The Biggest Sale of the Year</h2>
              <p>Way Day is Wayfair's annual mega-sale, often compared to Amazon Prime Day. Here's everything you need to know:</p>
              <ul className="static-list">
                <li><strong>When is Way Day?</strong> — Typically April or May, lasting 2 days</li>
                <li><strong>Discounts</strong> — Up to 80% off furniture, bedding, rugs, lighting and more</li>
                <li><strong>Free shipping</strong> — All orders ship free during Way Day, no minimum</li>
                <li><strong>Flash deals</strong> — New deals drop every few hours so check back frequently</li>
                <li><strong>Pro tip</strong> — Add items to your wishlist before Way Day so you can quickly purchase when prices drop</li>
              </ul>
            </div>

            <div className="static-card">
              <h2>📦 Wayfair Open Box — Best Kept Secret</h2>
              <p>Wayfair's Open Box section is one of the best ways to get premium furniture at massive discounts:</p>
              <ul className="static-list">
                <li><strong>What is Open Box?</strong> — Customer returns and display models sold at 20-60% below retail</li>
                <li><strong>Condition grades</strong> — Items are graded from Like New to Good. Each listing shows the exact condition.</li>
                <li><strong>Same return policy</strong> — Open Box items come with Wayfair's standard return policy</li>
                <li><strong>How to find them</strong> — Go to Wayfair.com → Deals → Open Box</li>
                <li><strong>Pro tip</strong> — Check Open Box first before buying new — same item, fraction of the price</li>
              </ul>
            </div>

            <div className="static-card">
              <h2>📅 Wayfair Sale Calendar 2026</h2>
              <ul className="static-list">
                <li>❄️ <strong>New Year Sale (January)</strong> — Home refresh deals to start the year</li>
                <li>💝 <strong>Valentine's Day Sale (February)</strong> — Bedroom and décor discounts</li>
                <li>🌸 <strong>Spring Refresh Sale (March)</strong> — Outdoor furniture early deals</li>
                <li>🏆 <strong>Way Day (April/May)</strong> — Biggest sale of the year</li>
                <li>☀️ <strong>Summer Sale (June-July)</strong> — Patio and outdoor furniture up to 65% off</li>
                <li>🏠 <strong>Labor Day Sale (September)</strong> — Major home goods discounts</li>
                <li>🖤 <strong>Black Friday (November)</strong> — Sitewide deals up to 70% off</li>
                <li>🎄 <strong>Holiday Sale (December)</strong> — Year-end clearance on all categories</li>
              </ul>
            </div>

            <div className="static-card">
              <h2>💡 Pro Wayfair Shopping Tips</h2>
              <ul className="static-list">
                <li><strong>Use the Wayfair Credit Card</strong> — Earn 5% back on every Wayfair purchase, redeemable on future orders.</li>
                <li><strong>Check Daily Sales</strong> — Wayfair adds new deals every day. The "Today's Deals" section refreshes daily.</li>
                <li><strong>Free Assembly</strong> — Some large furniture items include free assembly. Filter for this option to save on setup costs.</li>
                <li><strong>Price Drop Alerts</strong> — Add items to your wishlist and Wayfair will notify you when the price drops.</li>
                <li><strong>Wayfair Professional</strong> — If you're a business, contractor or designer, sign up for Wayfair Professional for exclusive trade discounts.</li>
              </ul>
            </div>

            <div className="static-card">
              <h2>❓ Frequently Asked Questions</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div>
                  <h3 style={{ fontSize: 15, fontWeight: 700, color: '#1a1a1a', marginBottom: 6 }}>When is Wayfair Way Day?</h3>
                  <p style={{ fontSize: 13, color: '#555', lineHeight: 1.6 }}>Way Day typically takes place in April or May each year, lasting 2 days. It offers up to 80% off with free shipping on all orders — Wayfair's biggest sale of the year.</p>
                </div>
                <div>
                  <h3 style={{ fontSize: 15, fontWeight: 700, color: '#1a1a1a', marginBottom: 6 }}>Does Wayfair offer free shipping?</h3>
                  <p style={{ fontSize: 13, color: '#555', lineHeight: 1.6 }}>Yes! Wayfair offers free shipping on most orders over $35. Large furniture items typically ship free regardless of order size. During Way Day, all orders ship free.</p>
                </div>
                <div>
                  <h3 style={{ fontSize: 15, fontWeight: 700, color: '#1a1a1a', marginBottom: 6 }}>What is Wayfair Open Box?</h3>
                  <p style={{ fontSize: 13, color: '#555', lineHeight: 1.6 }}>Open Box items are customer returns sold at 20-60% below regular price. Each item is inspected and graded so you know exactly what condition to expect. Same return policy applies.</p>
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
        <p>As an affiliate partner, we earn from qualifying purchases.</p>
        <p>© {new Date().getFullYear()} <a href={SITE_URL}>WhileUShop.com</a> — All rights reserved.</p>
      </footer>
    </>
  );
}
