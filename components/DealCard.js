import { useState } from 'react';

export default function DealCard({ deal }) {
  const [copied, setCopied] = useState(false);
  const [imgError, setImgError] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);

  const {
    title,
    image_url,
    original_price,
    sale_price,
    discount_percent,
    coupon_code,
    affiliate_link,
    platform = 'amazon',
    description,
  } = deal;

  const discount =
    discount_percent ||
    (original_price && sale_price
      ? Math.round(((original_price - sale_price) / original_price) * 100)
      : null);

  const handleCopy = (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(coupon_code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleToggleDetails = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDetailsOpen((prev) => !prev);
  };

  const fallbackImage = 'https://via.placeholder.com/300x300?text=No+Image';

  return (
    <div className="deal-card">
      <a href={affiliate_link} target="_blank" rel="noopener noreferrer sponsored">
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
            <span className="price-sale">
              ${Number(sale_price).toFixed(2)}
            </span>
            {original_price && (
              <span className="price-original">
                ${Number(original_price).toFixed(2)}
              </span>
            )}
          </div>

          {coupon_code && (
            <div className="coupon-box" onClick={(e) => e.preventDefault()}>
              <span className="coupon-label">Code</span>
              <span className="coupon-code">{coupon_code}</span>
              <button
                className={`copy-btn ${copied ? 'copied' : ''}`}
                onClick={handleCopy}
              >
                {copied ? '✓ Copied' : 'Copy'}
              </button>
            </div>
          )}

          {/* Product Details Toggle — only shows if description exists */}
          {description && (
            <div className="details-wrap" onClick={handleToggleDetails}>
              <button className="details-toggle-btn">
                <span>Product Details</span>
                <span className={`details-arrow ${detailsOpen ? 'open' : ''}`}>▼</span>
              </button>
              {detailsOpen && (
                <div className="details-content">
                  {description}
                </div>
              )}
            </div>
          )}

          <div className="card-footer">
            <span className="shop-btn">Shop on Amazon →</span>
          </div>
        </div>
      </a>
    </div>
  );
}
