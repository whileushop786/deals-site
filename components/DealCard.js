import { useState } from 'react';
import Link from 'next/link';
import { slugify } from '../lib/slugify';

const SITE_URL = 'https://www.whileushop.com';

// Converts platform value to button label
function getShopLabel(platform) {
  const map = {
    amazon:   '🛒 Shop on Amazon',
    walmart:  '🛒 Shop on Walmart',
    target:   '🛒 Shop on Target',
    ebay:     '🛒 Shop on eBay',
    bestbuy:  '🛒 Shop on Best Buy',
    costco:   '🛒 Shop on Costco',
    flipkart: '🛒 Shop on Flipkart',
    meesho:   '🛒 Shop on Meesho',
    etsy:     '🛒 Shop on Etsy',
  };
  const key = (platform || 'amazon').toLowerCase().replace(/\s+/g, '');
  return map[key] || `🛒 Shop on ${platform}`;
}

export default function DealCard({ deal }) {
  const [copied, setCopied] = useState(false);
  const [imgError, setImgError] = useState(false);

  const {
    title,
    image_url,
    original_price,
    sale_price,
    discount_percent,
    coupon_code,
    affiliate_link,
    platform = 'amazon',
  } = deal;

  const discount =
    discount_percent ||
    (original_price && sale_price
      ? Math.round(((original_price - sale_price) / original_price) * 100)
      : null);

  const slug = slugify(title);
  const fallbackImage = 'https://via.placeholder.com/300x300?text=No+Image';

  const handleCopy = (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(coupon_code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="deal-card">
      {/* Image + Title → goes to product page */}
      <Link href={`/${slug}`}>
        <div className="card-image-wrap">
          <img
            src={imgError ? fallbackImage : (image_url || fallbackImage)}
            alt={title}
            onError={() => setImgError(true)}
            loading="lazy"
          />
          {discount && <div className="discount-badge">-{discount}%</div>}
          <div className="platform-badge">{platform}</div>
        </div>
        <div className="card-body">
          <p className="card-title">{title}</p>
          <div className="card-prices">
            <span className="price-sale">${Number(sale_price).toFixed(2)}</span>
            {original_price && (
              <span className="price-original">${Number(original_price).toFixed(2)}</span>
            )}
          </div>
        </div>
      </Link>

      {/* Interactive section */}
      <div className="card-interactive">
        {coupon_code && (
          <div className="coupon-box">
            <span className="coupon-label">Code</span>
            <span className="coupon-code">{coupon_code}</span>
            <button className={`copy-btn ${copied ? 'copied' : ''}`} onClick={handleCopy}>
              {copied ? '✓ Copied' : 'Copy'}
            </button>
          </div>
        )}

        <div className="card-actions">
          <a
            href={affiliate_link}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="shop-btn"
          >
            {getShopLabel(platform)}
          </a>

          <Link href={`/${slug}`} className="more-details-btn">
            More Details →
          </Link>
        </div>
      </div>
    </div>
  );
}
