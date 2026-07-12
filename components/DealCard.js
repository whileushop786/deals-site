import { useState } from 'react';
import Link from 'next/link';
import { slugifyWithId } from '../lib/slugify';

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

function CartIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
      <circle cx="9" cy="21" r="1"></circle>
      <circle cx="20" cy="21" r="1"></circle>
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
    </svg>
  );
}

export default function DealCard({ deal }) {
  const [copied, setCopied] = useState(false);
  const [imgError, setImgError] = useState(false);

  const { title, image_url, original_price, sale_price, discount_percent, coupon_code, affiliate_link, platform = 'amazon', id } = deal;

  const discount = discount_percent ||
    (original_price && sale_price ? Math.round(((original_price - sale_price) / original_price) * 100) : null);

  // Always use ID-based slug for new links — ensures uniqueness
  const slug = slugifyWithId(title, id);
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
      <Link href={`/${slug}`}>
        <div className="card-image-wrap">
          <img
            src={imgError ? fallbackImage : (image_url || fallbackImage)}
            alt={title}
            onError={() => setImgError(true)}
            loading="lazy"
          />
        </div>

        <div className="card-body">
          <p className="card-title">{title}</p>
          <div className="card-prices">
            <span className="price-sale">${Number(sale_price).toFixed(2)}</span>
            {original_price && <span className="price-original">${Number(original_price).toFixed(2)}</span>}
            {discount && <span className="discount-inline">{discount}%</span>}
          </div>
        </div>
      </Link>

      <div className="card-interactive">
        {coupon_code && (
          <div className="coupon-box">
            <span className="coupon-label">Code</span>
            <span className="coupon-code">{coupon_code}</span>
            <button className={`copy-btn ${copied ? 'copied' : ''}`} onClick={handleCopy}>
              {copied ? '✓' : 'Copy'}
            </button>
          </div>
        )}

        <div className="card-actions">
          <a href={affiliate_link} target="_blank" rel="noopener noreferrer sponsored" className="shop-btn">
            <CartIcon /> {getShopLabel(platform)}
          </a>
          <Link href={`/${slug}`} className="more-details-btn">
            More Details →
          </Link>
        </div>
      </div>
    </div>
  );
}
