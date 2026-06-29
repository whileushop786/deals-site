import Head from 'next/head';
import Link from 'next/link';
import Header from '../components/Header';

const SITE_URL = "https://www.whileushop.com";

export default function Freebies() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Freebies — Free Samples, Free Products & Free Offers',
    url: `${SITE_URL}/freebies`,
    description: 'Find the latest freebies, free samples, free products and no-cost offers online. Updated daily at WhileUShop.com.',
    publisher: { '@type': 'Organization', name: 'WhileUShop.com', url: SITE_URL },
  };

  return (
    <>
      <Head>
        <title>Freebies — Free Samples, Free Products & Free Offers Today | WhileUShop.com</title>
        <meta name="description" content="Find the latest freebies, free samples, free products and no-cost online offers updated daily. Get free stuff from top brands — beauty, food, household and more at WhileUShop.com." />
        <meta name="keywords" content="freebies, free samples, free products, free stuff online, free offers, free beauty samples, free food samples, free household products, get free stuff, WhileUShop freebies" />
        <meta name="robots" content="index, follow" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Freebies — Free Samples & Free Products Today" />
        <meta property="og:description" content="Latest freebies, free samples and free product offers — updated daily at WhileUShop.com." />
        <meta property="og:url" content={`${SITE_URL}/freebies`} />
        <meta property="og:image" content={`${SITE_URL}/icon-512.png`} />
        <meta property="og:site_name" content="WhileUShop.com" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Freebies — Free Samples & Free Products Today" />
        <meta name="twitter:description" content="Latest freebies and free samples — updated daily." />
        <link rel="canonical" href={`${SITE_URL}/freebies`} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      </Head>

      <Header search="" onSearch={() => {}} totalCount={0} />

      <main className="static-page">
        <div className="static-container">
          <div className="static-hero">
            <h1>🎁 <span>Freebies</span></h1>
            <p>Free samples, free products & no-cost offers — updated daily. 100% free, no catch!</p>
          </div>

          <div className="static-content">
            <div className="static-card">
              <div className="static-icon">🎉</div>
              <h2>What Are Freebies?</h2>
              <p>Freebies are products, samples or services that brands offer completely free of charge — usually to introduce new products, build brand awareness or reward loyal customers. At WhileUShop.com we track hundreds of freebie offers every day so you can get free stuff without spending hours searching.</p>
              <p>From free beauty samples to free food products, free household items and free digital content — we cover it all!</p>
            </div>

            <div className="static-card">
              <div className="static-icon">🛍️</div>
              <h2>Types of Freebies We Track</h2>
              <ul className="static-list">
                <li>💄 <strong>Beauty & Skincare Samples</strong> — Free moisturizers, serums, makeup and more</li>
                <li>🍫 <strong>Food & Beverage Samples</strong> — Free snacks, drinks, coffee and supplements</li>
                <li>🏠 <strong>Household Product Samples</strong> — Free cleaning supplies, detergents and more</li>
                <li>💊 <strong>Health & Wellness Samples</strong> — Free vitamins, supplements and personal care</li>
                <li>📱 <strong>Free Apps & Subscriptions</strong> — Free trials and free digital content</li>
                <li>👗 <strong>Free Clothing & Accessories</strong> — Brand giveaways and free with purchase offers</li>
                <li>📚 <strong>Free Books & Magazines</strong> — Free digital books, audiobooks and subscriptions</li>
                <li>🐾 <strong>Free Pet Samples</strong> — Free pet food, treats and accessories</li>
              </ul>
            </div>

            <div className="static-card">
              <div className="static-icon">💡</div>
              <h2>How to Get Freebies</h2>
              <p><strong>1. Act Fast</strong> — Freebie offers are limited. The sooner you claim, the better your chances.</p>
              <p><strong>2. Use a Separate Email</strong> — Create a dedicated email for freebies to keep your inbox organized.</p>
              <p><strong>3. Check Daily</strong> — New freebies are added every day. Bookmark WhileUShop.com and check back often.</p>
              <p><strong>4. Follow Our Channels</strong> — We post freebies instantly on Telegram and social media the moment they go live.</p>
              <p><strong>5. Share With Friends</strong> — Many freebie offers have referral bonuses — share and get even more free stuff!</p>
            </div>

            <div className="static-card">
              <div className="static-icon">⭐</div>
              <h2>Best Places to Find Freebies</h2>
              <ul className="static-list">
                <li>🛒 <strong>Amazon</strong> — Free product testing programs and sample boxes</li>
                <li>🏪 <strong>Walmart</strong> — Free samples in-store and online pickup freebies</li>
                <li>💄 <strong>Sephora & Ulta</strong> — Free beauty samples with every order</li>
                <li>☕ <strong>Starbucks</strong> — Free drinks on your birthday and with rewards</li>
                <li>🍕 <strong>Restaurant Chains</strong> — Free food on birthdays and loyalty rewards</li>
                <li>📦 <strong>Brand Websites</strong> — Direct sample requests from top brands</li>
              </ul>
            </div>

            <div className="static-card">
              <div className="static-icon">📢</div>
              <h2>Get Freebies Alerts Instantly</h2>
              <p>Freebie offers go fast — sometimes within minutes! Follow us for instant alerts:</p>
              <ul className="static-list">
                <li>📱 <strong>Telegram</strong> — <a href="https://t.me/whileushop" style={{color:'#ff6b00'}}>t.me/whileushop</a> — Fastest updates</li>
                <li>📘 <strong>Facebook</strong> — <a href="https://www.facebook.com/whileushop786" style={{color:'#ff6b00'}}>facebook.com/whileushop786</a></li>
                <li>📸 <strong>Instagram</strong> — <a href="https://instagram.com/crazydealshunter" style={{color:'#ff6b00'}}>@crazydealshunter</a></li>
                <li>💬 <strong>WhatsApp</strong> — <a href="https://chat.whatsapp.com/Ei6fHrUYhyx5GZTHBF5IFF" style={{color:'#ff6b00'}}>Join our channel</a></li>
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
