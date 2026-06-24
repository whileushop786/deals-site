-- ============================================================
-- Run this SQL in your Supabase SQL Editor to set up the database
-- Go to: supabase.com → your project → SQL Editor → New Query
-- Paste this entire file and click Run
-- ============================================================

-- Create the deals table
CREATE TABLE IF NOT EXISTS deals (
  id            BIGSERIAL PRIMARY KEY,
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  title         TEXT NOT NULL,
  image_url     TEXT,
  original_price NUMERIC(10,2),
  sale_price    NUMERIC(10,2) NOT NULL,
  discount_percent INTEGER,
  coupon_code   TEXT,
  affiliate_link TEXT NOT NULL,
  platform      TEXT DEFAULT 'amazon',
  deal_date     DATE NOT NULL DEFAULT CURRENT_DATE,
  active        BOOLEAN DEFAULT TRUE,
  notes         TEXT
);

-- Allow public read access (anyone can view deals)
ALTER TABLE deals ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read active deals"
  ON deals FOR SELECT
  USING (active = TRUE);

-- Insert some sample deals to test your site
INSERT INTO deals (title, image_url, original_price, sale_price, discount_percent, coupon_code, affiliate_link, platform, deal_date, active)
VALUES
  (
    'Anker 65W USB-C Fast Charger, PowerPort III Pod, Compact Foldable Wall Charger',
    'https://m.media-amazon.com/images/I/51w0jg5LBBL._AC_SX679_.jpg',
    35.99,
    14.99,
    58,
    'ANKER20OFF',
    'https://www.amazon.com',
    'amazon',
    CURRENT_DATE,
    TRUE
  ),
  (
    'Govee Smart LED Strip Lights, 32.8ft WiFi LED Lights Work with Alexa Google Home, 16 Million Colors',
    'https://m.media-amazon.com/images/I/71rFApBPEEL._AC_SX679_.jpg',
    49.99,
    21.99,
    56,
    'GOVEE15',
    'https://www.amazon.com',
    'amazon',
    CURRENT_DATE,
    TRUE
  ),
  (
    'Instant Pot Duo 7-in-1 Electric Pressure Cooker, Slow Cooker, Rice Cooker, 6 Quart',
    'https://m.media-amazon.com/images/I/71V1CE1HTLL._AC_SX679_.jpg',
    99.99,
    59.99,
    40,
    NULL,
    'https://www.amazon.com',
    'amazon',
    CURRENT_DATE,
    TRUE
  ),
  (
    'COSRX Snail Mucin 96% Power Repairing Essence 3.38 fl.oz, Hydrating Serum for Face',
    'https://m.media-amazon.com/images/I/71wBuFc3rXL._AC_SX679_.jpg',
    25.00,
    13.99,
    44,
    'SKINCARE10',
    'https://www.amazon.com',
    'amazon',
    CURRENT_DATE,
    TRUE
  );

-- ============================================================
-- HOW TO ADD A NEW DEAL (do this every day via Supabase dashboard)
-- ============================================================
-- 1. Go to supabase.com → your project → Table Editor → deals
-- 2. Click "Insert Row"
-- 3. Fill in:
--    title         → product name (copy from Amazon)
--    image_url     → right-click Amazon product image → Copy Image Address
--    original_price → the crossed-out price on Amazon
--    sale_price    → the current price
--    coupon_code   → the promo code (leave empty if none)
--    affiliate_link → your Amazon affiliate link
--    deal_date     → today's date (YYYY-MM-DD)
--    active        → true (to show) / false (to hide)
-- 4. Click Save — it appears on your site instantly!
