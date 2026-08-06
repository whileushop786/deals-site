import Head from 'next/head';
import Link from 'next/link';
import Header from '../../components/Header';
import FooterSubscribe from '../../components/FooterSubscribe';

const SITE_URL = 'https://www.whileushop.com';

export default function OnlineShoppingGuide() {
  const schema = [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: 'Online Shopping Guide 2026 — How to Save Money Shopping Online',
      description: 'Ultimate online shopping guide with tips on coupon stacking, cashback apps, price tracking, deal alerts and insider strategies to save money at any online store.',
      url: `${SITE_URL}/shopping-guides/online-shopping-guide`,
      publisher: { '@type': 'Organization', name: 'WhileUShop.com', url: SITE_URL },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'How do I find working coupon codes online?', acceptedAnswer: { '@type': 'Answer', text: 'The best way to find working coupon codes is to visit WhileUShop.com where we verify every code before posting. You can also use browser extensions like Honey or Capital One Shopping that automatically find and apply coupon codes at checkout.' } },
        { '@type': 'Question', name: 'What is coupon stacking?', acceptedAnswer: { '@type': 'Answer', text: 'Coupon stacking means combining multiple discounts on a single purchase. For example, applying a promo code on top of a sale price, then using a cashback app for additional savings. Not all stores allow stacking but many do.' } },
        { '@type': 'Question', name: 'What are the best cashback apps for online shopping?', acceptedAnswer: { '@type': 'Answer', text: 'The best cashback apps for online shopping include Rakuten (formerly Ebates), Ibotta, Honey, Capital One Shopping and TopCashback. Rakuten is the most popular with cashback at over 3,500 stores.' } },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'Shopping Guides', item: `${SITE_URL}/shopping-guides` },
        { '@type': 'ListItem', position: 3, name: 'Online Shopping Guide', item: `${SITE_URL}/shopping-guides/online-shopping-guide` },
      ],
    },
  ];

  return (
    <>
      <Head>
        <title>Online Shopping Guide 2026 — Coupon Codes, Cashback & Savings Tips | WhileUShop.com</title>
        <meta name="description" content="Ultimate online shopping guide for 2026. Learn coupon stacking, cashback apps, price tracking tools and insider strategies to save money at any online store in the USA." />
        <meta name="keywords" content="online shopping guide, how to save money online shopping, coupon stacking guide, best cashback apps, online shopping tips, price tracking tools, how to find coupon codes, online shopping hacks 2026" />
        <meta name="robots" content="index, follow" />
        <meta property="og:type" content="article" />
        <meta property="og:title" content="Online Shopping Guide 2026 — Coupon Codes, Cashback & Savings Tips" />
        <meta property="og:description" content="Ultimate guide to saving money online — coupon stacking, cashback apps and price tracking." />
        <meta property="og:url" content={`${SITE_URL}/shopping-guides/online-shopping-guide`} />
        <meta property="og:image" content={`${SITE_URL}/icon-512.png`} />
        <link rel="canonical" href={`${SITE_URL}/shopping-guides/online-shopping-guide`} />
        {schema.map((s, i) => <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />)}
      </Head>

      <Header search="" onSearch={() => {}} totalCount={0} />

      <nav aria-label="Breadcrumb" style={{ padding: '10px 20px', fontSize: 12, color: '#999' }}>
        <Link href="/" style={{ color: '#ff6b00' }}>Home</Link>
        <span style={{ margin: '0 8px' }}>›</span>
        <Link href="/shopping-guides" style={{ color: '#ff6b00' }}>Shopping Guides</Link>
        <span style={{ margin: '0 8px' }}>›</span>
        <span style={{ color: '#aaa' }}>Online Shopping Guide</span>
      </nav>

      <main className="static-page" style={{ paddingTop: 0 }}>
        <div className="static-container">
          <div className="static-hero">
            <h1>💻 Online <span>Shopping Guide</span></h1>
            <p>Ultimate guide to saving money online in 2026 — coupon stacking, cashback apps & price tracking.</p>
          </div>

          <div className="static-content">

            <div className="static-card">
              <h2>The Smart Online Shopper's Mindset</h2>
              <p>The average American spends over $5,000 per year shopping online. Smart shoppers using the right tools and strategies save 20-40% on those purchases — that's $1,000-2,000 back in your pocket every year. This guide covers every strategy, tool and tip you need to become a master online deal hunter.</p>
            </div>

            <div className="static-card">
              <h2>🏷️ How to Find Working Coupon Codes</h2>
              <p>Finding coupon codes that actually work is the #1 challenge for online shoppers. Here's what works:</p>
              <ul className="static-list">
                <li><strong>WhileUShop.com</strong> — We verify every coupon code before posting. <Link href="/" style={{color:'#ff6b00'}}>Browse verified deals →</Link></li>
                <li><strong>Honey Browser Extension</strong> — Automatically finds and applies coupon codes at checkout</li>
                <li><strong>Capital One Shopping</strong> — Similar to Honey, works at thousands of stores</li>
                <li><strong>Google Search</strong> — Search "[store name] promo code [month year]" for recent codes</li>
                <li><strong>RetailMeNot</strong> — Large database of user-submitted coupon codes</li>
                <li><strong>Store email lists</strong> — Sign up for retailer emails for exclusive first-purchase discounts</li>
              </ul>
            </div>

            <div className="static-card">
              <h2>💰 Coupon Stacking — Save 50%+ on Any Purchase</h2>
              <p>Coupon stacking is the art of combining multiple discounts on a single purchase. Here's the formula:</p>
              <ul className="static-list">
                <li><strong>Layer 1:</strong> Start with a sale or clearance price</li>
                <li><strong>Layer 2:</strong> Apply a promo code or coupon code</li>
                <li><strong>Layer 3:</strong> Use a cashback app or browser extension</li>
                <li><strong>Layer 4:</strong> Pay with a cashback credit card</li>
                <li><strong>Layer 5:</strong> Use loyalty points if available</li>
              </ul>
              <p>Example: $100 item on 30% sale = $70 → 20% promo code = $56 → 5% cashback = $53.20 → 2% credit card cashback = $52.13. You just saved nearly 50%!</p>
            </div>

            <div className="static-card">
              <h2>📱 Best Cashback Apps for Online Shopping</h2>
              <ul className="static-list">
                <li>💰 <strong>Rakuten</strong> — Up to 40% cashback at 3,500+ stores. $10 welcome bonus for new users.</li>
                <li>🛒 <strong>Ibotta</strong> — Great for groceries and everyday purchases. Cash back on receipts.</li>
                <li>🍯 <strong>Honey</strong> — Browser extension that finds coupons AND offers cashback (Honey Gold).</li>
                <li>💳 <strong>Capital One Shopping</strong> — Automatically applies best coupon codes and tracks price drops.</li>
                <li>🔝 <strong>TopCashback</strong> — Often higher cashback rates than Rakuten at many stores.</li>
                <li>🎯 <strong>Fetch Rewards</strong> — Scan receipts for points redeemable for gift cards.</li>
              </ul>
            </div>

            <div className="static-card">
              <h2>📊 Price Tracking Tools — Never Overpay Again</h2>
              <ul className="static-list">
                <li><strong>CamelCamelCamel</strong> — Tracks Amazon price history. See if today's price is actually a good deal.</li>
                <li><strong>Google Shopping</strong> — Compare prices across multiple retailers instantly.</li>
                <li><strong>PriceGrabber</strong> — Compares prices across hundreds of online stores.</li>
                <li><strong>Keepa</strong> — Advanced Amazon price tracker with detailed charts and alerts.</li>
                <li><strong>ShopSavvy</strong> — Scan barcodes in store to find better prices online instantly.</li>
              </ul>
            </div>

            <div className="static-card">
              <h2>🔔 Deal Alert Strategies</h2>
              <ul className="static-list">
                <li><strong>Subscribe to WhileUShop Newsletter</strong> — Get daily deals delivered to your inbox</li>
                <li><strong>Join our Telegram Channel</strong> — Real-time deal alerts the moment they go live</li>
                <li><strong>Set up Google Alerts</strong> — Get notified when specific products go on sale</li>
                <li><strong>Follow deal communities</strong> — Reddit r/deals and r/frugal for community-sourced deals</li>
                <li><strong>Retailer wish lists</strong> — Add items to wishlists and get price drop notifications</li>
              </ul>
            </div>

            <div className="static-card">
              <h2>🛡️ Safe Online Shopping Tips</h2>
              <ul className="static-list">
                <li><strong>Use a credit card</strong> — Better fraud protection than debit cards</li>
                <li><strong>Check HTTPS</strong> — Always verify the padlock icon before entering payment info</li>
                <li><strong>Read reviews</strong> — Check multiple sources before buying from unfamiliar stores</li>
                <li><strong>Use virtual card numbers</strong> — Many banks offer single-use card numbers for online safety</li>
                <li><strong>Keep records</strong> — Screenshot order confirmations and save emails until delivery</li>
              </ul>
            </div>

            <div className="static-card">
              <h2>❓ Frequently Asked Questions</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div>
                  <h3 style={{ fontSize: 15, fontWeight: 700, color: '#1a1a1a', marginBottom: 6 }}>How do I find working coupon codes online?</h3>
                  <p style={{ fontSize: 13, color: '#555', lineHeight: 1.6 }}>WhileUShop.com verifies every coupon code before posting. You can also use browser extensions like Honey or Capital One Shopping that automatically test and apply codes at checkout.</p>
                </div>
                <div>
                  <h3 style={{ fontSize: 15, fontWeight: 700, color: '#1a1a1a', marginBottom: 6 }}>What is coupon stacking?</h3>
                  <p style={{ fontSize: 13, color: '#555', lineHeight: 1.6 }}>Coupon stacking combines multiple discounts — sale price + promo code + cashback app + rewards card. Done right, you can save 40-60% on purchases that were already on sale.</p>
                </div>
                <div>
                  <h3 style={{ fontSize: 15, fontWeight: 700, color: '#1a1a1a', marginBottom: 6 }}>What are the best cashback apps for online shopping?</h3>
                  <p style={{ fontSize: 13, color: '#555', lineHeight: 1.6 }}>Rakuten is the most popular with cashback at 3,500+ stores and a $10 welcome bonus. TopCashback often has higher rates. Honey is best for automatic coupon code finding plus cashback.</p>
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
