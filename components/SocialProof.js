import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { slugifyWithId } from '../lib/slugify';

const US_NAMES = ['Sarah M.', 'Mike T.', 'Emily R.', 'James K.', 'Lisa B.', 'David S.', 'Emma W.', 'Chris P.', 'Ashley N.', 'Ryan L.', 'Jessica H.', 'Tyler G.', 'Amanda F.', 'Kevin D.', 'Rachel C.'];
const US_CITIES = ['Texas', 'California', 'New York', 'Florida', 'Ohio', 'Georgia', 'Arizona', 'Illinois', 'Nevada', 'Michigan', 'Virginia', 'Colorado', 'Washington', 'Oregon', 'Tennessee'];

function getRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getTimeAgo() {
  const mins = Math.floor(Math.random() * 29) + 1;
  return `${mins} min ago`;
}

export default function SocialProof() {
  const [deals, setDeals] = useState([]);
  const [visible, setVisible] = useState(false);
  const [current, setCurrent] = useState(0);
  const [dismissed, setDismissed] = useState(false);
  const [notifData, setNotifData] = useState(null);

  useEffect(() => {
    supabase
      .from('deals')
      .select('id, title, image_url, sale_price')
      .eq('active', true)
      .order('created_at', { ascending: false })
      .limit(15)
      .then(({ data }) => {
        if (data && data.length > 0) setDeals(data);
      });
  }, []);

  const showNotif = (index) => {
    if (dismissed) return;
    setNotifData({
      name: getRandom(US_NAMES),
      city: getRandom(US_CITIES),
      time: getTimeAgo(),
    });
    setCurrent(index);
    setVisible(true);
  };

  useEffect(() => {
    if (deals.length === 0 || dismissed) return;
    const t = setTimeout(() => showNotif(0), 8000);
    return () => clearTimeout(t);
  }, [deals, dismissed]);

  useEffect(() => {
    if (!visible || dismissed || deals.length === 0) return;
    const hideTimer = setTimeout(() => {
      setVisible(false);
      const nextTimer = setTimeout(() => {
        if (!dismissed) showNotif((current + 1) % deals.length);
      }, 20000);
      return () => clearTimeout(nextTimer);
    }, 6000);
    return () => clearTimeout(hideTimer);
  }, [visible, current, dismissed, deals]);

  const handleDismiss = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setVisible(false);
    setDismissed(true);
  };

  if (!visible || dismissed || !notifData || deals.length === 0) return null;

  const deal = deals[current];
  const slug = slugifyWithId(deal.title, deal.id);
  const hasPrice = deal.sale_price && Number(deal.sale_price) > 0;

  return (
    <a href={`/${slug}`} className="sp-wrap">
      <div className="sp-box">
        <button className="sp-close" onClick={handleDismiss}>✕</button>

        {/* Product Image */}
        <div className="sp-img">
          {deal.image_url
            ? <img src={deal.image_url} alt={deal.title} />
            : <span>🛒</span>
          }
        </div>

        {/* Content */}
        <div className="sp-content">
          <p className="sp-name">
            <strong>{notifData.name}</strong>
            <span className="sp-city"> from {notifData.city}</span>
          </p>
          <p className="sp-deal">
            grabbed <strong>{deal.title}</strong>
            {hasPrice && <span className="sp-price"> — ${Number(deal.sale_price).toFixed(2)}</span>}
          </p>
          <div className="sp-footer">
            <span className="sp-verified">✅ Verified purchase</span>
            <span className="sp-time">{notifData.time}</span>
          </div>
        </div>
      </div>
    </a>
  );
}
