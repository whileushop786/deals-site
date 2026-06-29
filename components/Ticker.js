import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

// Default items shown if database is empty or loading
const DEFAULT_ITEMS = [
  { text: '🔥 Latest Freebies — Click to grab yours!', url: 'https://www.whileushop.com' },
  { text: '🛋️ Wayfair Sale — Up to 60% off furniture!', url: 'https://www.whileushop.com' },
  { text: '👜 Michael Kors — Handbags from $79!', url: 'https://www.whileushop.com' },
  { text: '⚡ Flash Deal — Anker Charger only $14.99!', url: 'https://www.whileushop.com' },
  { text: '🎁 Free Gift with purchase — Limited time!', url: 'https://www.whileushop.com' },
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
        <div className="ticker-track" style={{ animationDuration: `${items.length * 6}s` }}>
          {allItems.map((item, i) => (
            <span key={i} className="ticker-item">
              <span dangerouslySetInnerHTML={{ __html: item.text }} />
              <span className="ticker-sep">•</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
