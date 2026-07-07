import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import { getDealBySlug, getAllDeals } from '../lib/supabase';
import { slugify } from '../lib/slugify';
import Header from '../components/Header';
import FooterSubscribe from '../components/FooterSubscribe';

const SITE_URL = 'https://www.whileushop.com';

function getShopLabel(platform) {
  const map = {
    amazon: 'Shop on Amazon', walmart: 'Shop on Walmart', target: 'Shop on Target',
    ebay: 'Shop on eBay', bestbuy: 'Shop on Best Buy', costco: 'Shop on Costco',
    flipkart: 'Shop on Flipkart', meesho: 'Shop on Meesho', etsy: 'Shop on Etsy', wayfair: 'Shop on Wayfair',
  };
  const key = (platform || 'amazon').toLowerCase().replace(/\s+/g, '');
  return map[key] || `Shop on ${platform}`;
}

function CartIcon({ size = 15 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
      <circle cx="9" cy="21" r="1"></circle>
      <circle cx="20" cy="21" r="1"></circle>
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
    </svg>
  );
}

export default function DealPage({ deal, structuredData }) {
  const [copied, setCopied] = useState(false);
  const [imgError, setImgError] = useState(false);

  if (!deal) {
    return (
      <>
        <Head>
          <title>Deal Not Found — WhileUShop.com</title>
          <meta name="robots" content="noindex, nofollow" />
        </Head>
        <Header search="" onSearch={() => {}} totalCount={0} />
        <div className="empty-state" style={{ marginTop: 60 }}>
          <div className="empty-icon">😕</div>
          <h3>Deal Not Found</h3>
          <p>This deal may have expired or been removed.</p>
          <Link href="/" className="back-btn" style={{ marginTop: 20, display: 'inline-block' }}>← Back to All Deals</Link>
        </div>
      </>
    );
  }

  const { title, image_url, original_price, sale_price, discount_percent, coupon_code, affiliate_link, platform = 'amazon', description, deal_date } = deal;

  const discount = discount_percent || (original_price && sale_price ? Math.round(((original_price - sale_price) / original_price) * 100) : null);
  const savings = original_price && sale_price ? (Number(original_price) - Number(sale_price)).toFixed(2) : null;
  const dealUrl = `${SITE_URL}/${slugify(title)}`;
  const fallbackImage = `${SITE_URL}/icon-512.png`;
  const metaImage = image_url || fallbackImage;

  const metaDesc = [
    title,
    `for only $${Number(sale_price).toFixed(2)}`,
    discount ? `(${discount}% off)` : '',
    coupon_code ? `Use code ${coupon_code}.` : '',
    'Best price via WhileUShop.com.',
  ].filter(Boolean).join(' ').substring(0, 160);

  const metaKeywords = [
    title, `${title} deal`, `${title} coupon`,
    coupon_code ? `${title} coupon code ${coupon_code}` : '',
    `${title} discount`, `buy ${title.split(' ').slice(0, 5).join(' ')}`,
    platform ? `${platform} deal` : '', 'WhileUShop', 'promo code', 'best price',
  ].filter(Boolean).join(', ');

  const handleCopy = () => {
    navigator.clipboard.writeText(coupon_code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  const handleShare = async () => {
    const shareText = [
      `🔥 ${title}`,
      sale_price ? `💰 Only $${Number(sale_price).toFixed(2)}${discount ? ` (${discount}% OFF)` : ''}` : '',
      coupon_code ? `🏷️ Coupon Code: ${coupon_code}` : '',
      `🛒 Grab it here: ${dealUrl}`,
      `\n📢 More deals at WhileUShop.com`,
    ].filter(Boolean).join('\n');

    if (navigator.share) {
      try {
        await navigator.share({
          title: `${title} — $${Number(sale_price).toFixed(2)}${discount ? ` (${discount}% OFF)` : ''}`,
          text: shareText,
          url: dealUrl,
        });
      } catch (err) {
        // User cancelled share — do nothing
        if (err.name !== 'AbortError') {
          navigator.clipboard.writeText(`${shareText}`).then(() => alert('Deal details copied to clipboard!'));
        }
      }
    } else {
      // Desktop fallback — copy full share text to clipboard
      navigator.clipboard.writeText(shareText).then(() => {
        alert('Deal details copied to clipboard! Paste anywhere to share.');
      });
    }
  };

  return (
    <>
      <Head>
        <title>{title} — ${Number(sale_price).toFixed(2)}{discount ? ` (${discount}% OFF)` : ''} | WhileUShop.com</title>
        <meta name="description" content={metaDesc} />
        <meta name="keywords" content={metaKeywords} />
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large" />
        <meta name="author" content="WhileUShop.com" />
        <meta property="og:type" content="product" />
        <meta property="og:url" content={dealUrl} />
        <meta property="og:title" content={`🔥 ${title} — $${Number(sale_price).toFixed(2)}${discount ? ` (${discount}% OFF)` : ''}`} />
        <meta property="og:description" content={metaDesc} />
        <meta property="og:image" content={metaImage} />
        <meta property="og:image:width" content="800" />
        <meta property="og:image:height" content="800" />
        <meta property="og:image:alt" content={title} />
        <meta property="og:site_name" content="WhileUShop.com" />
        <meta property="og:locale" content="en_US" />
        <meta property="product:price:amount" content={sale_price} />
        <meta property="product:price:currency" content="USD" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`🔥 ${title} — $${Number(sale_price).toFixed(2)}`} />
        <meta name="twitter:description" content={metaDesc} />
        <meta name="twitter:image" content={metaImage} />
        <meta name="twitter:image:alt" content={title} />
        <link rel="canonical" href={dealUrl} />
        {Array.isArray(structuredData)
          ? structuredData.map((schema, i) => (
              <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
            ))
          : <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
        }
      </Head>

      <Header search="" onSearch={() => {}} totalCount={0} />

      <nav aria-label="Breadcrumb" style={{ padding: '10px 20px', maxWidth: 1000, margin: '0 auto', fontSize: 12, color: '#999' }}>
        <Link href="/" style={{ color: '#ff6b00' }}>Home</Link>
        <span style={{ margin: '0 8px' }}>›</span>
        <span style={{ color: '#aaa' }}>{title}</span>
      </nav>

      <main className="deal-page" style={{ paddingTop: 0 }}>
        <div className="deal-page-container">
          <Link href="/" className="deal-back-link">← Back to all deals</Link>

          <div className="deal-page-card">
            <div className="deal-page-image-wrap">
              <img
                src={imgError ? fallbackImage : (image_url || fallbackImage)}
                alt={title}
                className="deal-page-image"
                onError={() => setImgError(true)}
              />
            </div>

            <div className="deal-page-details">
              <div className="deal-page-platform">{platform}</div>
              <h1 className="deal-page-title">{title}</h1>

              <div className="deal-page-prices">
                <span className="deal-page-sale">${Number(sale_price).toFixed(2)}</span>
                {original_price && <span className="deal-page-orig">${Number(original_price).toFixed(2)}</span>}
                {discount && <span className="deal-page-disc-pill">{discount}% OFF</span>}
                {savings && <span className="deal-page-savings">You save ${savings}!</span>}
              </div>

              {coupon_code && (
                <div className="deal-page-coupon">
                  <div className="deal-page-coupon-label">🏷️ Coupon Code</div>
                  <div className="deal-page-coupon-row">
                    <span className="deal-page-coupon-code">{coupon_code}</span>
                    <button className={`deal-page-copy-btn ${copied ? 'copied' : ''}`} onClick={handleCopy}>
                      {copied ? '✓ Copied!' : 'Copy Code'}
                    </button>
                  </div>
                  <p className="deal-page-coupon-hint">Apply this code at checkout to get the discount</p>
                </div>
              )}

              {description && (
                <div className="deal-page-description">
                  <h2>Product Details</h2>
                  {/* Renders HTML from admin panel correctly */}
                  <div dangerouslySetInnerHTML={{ __html: description }} />
                </div>
              )}

              <div className="deal-page-actions">
                <a href={affiliate_link} target="_blank" rel="noopener noreferrer sponsored" className="deal-page-shop-btn">
                  <CartIcon size={18} /> {getShopLabel(platform)}
                </a>
                <button className="deal-page-share-btn" onClick={handleShare}>
                  🔗 Share this Deal
                </button>
              </div>

              <p className="deal-page-disclaimer">
                * WhileUShop.com participates in affiliate programs. When you click our links and make a purchase, we may earn a small commission at no extra cost to you. Price may vary at time of purchase.
              </p>
            </div>
          </div>

          <div className="static-back" style={{ marginTop: 28 }}>
            <Link href="/" className="back-btn">← Back to All Deals</Link>
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

export async function getStaticPaths() {
  const deals = await getAllDeals();
  const paths = deals.map((deal) => ({ params: { slug: slugify(deal.title) } }));
  return { paths, fallback: 'blocking' };
}

export async function getStaticProps({ params }) {
  const deal = await getDealBySlug(params.slug);
  if (!deal) return { notFound: true };

  const platformName = deal.platform ? deal.platform.charAt(0).toUpperCase() + deal.platform.slice(1) : 'Online Store';
  const dealUrl = `${SITE_URL}/${slugify(deal.title)}`;

  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: deal.title,
    description: deal.description ? deal.description.replace(/<[^>]+>/g, '') : `${deal.title} at the best price via WhileUShop.com.`,
    image: [deal.image_url || `${SITE_URL}/icon-512.png`],
    url: dealUrl,
    sku: `WUS-${deal.id}`,
    brand: { '@type': 'Brand', name: platformName },
    offers: {
      '@type': 'Offer',
      url: deal.affiliate_link,
      priceCurrency: 'USD',
      price: Number(deal.sale_price).toFixed(2),
      priceValidUntil: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      itemCondition: 'https://schema.org/NewCondition',
      availability: 'https://schema.org/InStock',
      seller: { '@type': 'Organization', name: platformName },
      shippingDetails: {
        '@type': 'OfferShippingDetails',
        shippingRate: { '@type': 'MonetaryAmount', value: '0', currency: 'USD' },
        shippingDestination: { '@type': 'DefinedRegion', addressCountry: 'US' },
        deliveryTime: {
          '@type': 'ShippingDeliveryTime',
          handlingTime: { '@type': 'QuantitativeValue', minValue: 0, maxValue: 1, unitCode: 'DAY' },
          transitTime: { '@type': 'QuantitativeValue', minValue: 1, maxValue: 5, unitCode: 'DAY' },
        },
      },
    },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: deal.title, item: dealUrl },
    ],
  };

  return {
    props: { deal, structuredData: [productSchema, breadcrumbSchema] },
    revalidate: 60,
  };
}
