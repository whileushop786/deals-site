import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

const DEFAULT_ITEMS = [
  { text: '🔥 Latest Freebies — Click to grab yours!', url: 'https://www.whileushop.com/freebies-library' },
  { text: '🛋️ Wayfair Sale — Up to 60% off furniture!', url: 'https://www.whileushop.com/shop/wayfair-home' },
  { text: '👜 Michael Kors — Handbags from $79!', url: 'https://www.whileushop.com/shop/michael-kors-outlet' },
  { text: '⚡ Flash Deal — Check today\'s best deals!', url: 'https://www.whileushop.com' },
  { text: '🎁 Free Gift with purchase — Today only!', url: 'https://www.whileushop.com/freebies-library' },
];

export default function Ticker() {
  const [items, setItems] = useState(DEFAULT_ITEMS);

  useEffect(() => {
    async function fetchTicker() {
      const { data, error } = await supabase
        .from('ticker')
        .select('*')
        .eq('active', true)
        .order('created_at', { ascending: true });

      if (!error && data && data.length > 0) {
        setItems(data);
      }
    }
    fetchTicker();
  }, []);

  // Duplicate items for seamless loop
  const allItems = [...items, ...items];

  return (
    <div className="ticker-wrap">
      <div className="ticker-label">🔥 LIVE</div>
      <div className="ticker-track-wrap">
        <div
          className="ticker-track"
          style={{ animationDuration: `${items.length * 6}s` }}
        >
          {allItems.map((item, i) => (
            <a
              key={i}
              href={item.url || '#'}
              target={item.url && item.url.startsWith('http') ? '_blank' : '_self'}
              rel="noopener noreferrer"
              className="ticker-item"
            >
              <span dangerouslySetInnerHTML={{ __html: item.text }} />
              <span className="ticker-sep">•</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
