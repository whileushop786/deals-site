import { useEffect, useState } from 'react';

const ADSENSE_CLIENT = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;   // e.g. ca-pub-1234567890123456
const ADSENSE_SLOT = process.env.NEXT_PUBLIC_ADSENSE_SLOT;       // your ad unit slot ID

export default function AdBanner() {
  const [visible, setVisible] = useState(true);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const dismissed = sessionStorage.getItem('ad_banner_dismissed');
    if (dismissed) {
      setVisible(false);
      return;
    }

    try {
      if (window.adsbygoogle && !loaded) {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        setLoaded(true);
      }
    } catch (e) {
      console.error('AdSense error:', e);
    }
  }, [loaded]);

  // Add bottom padding to body so banner doesn't overlap content
  useEffect(() => {
    if (visible && ADSENSE_CLIENT && ADSENSE_SLOT) {
      document.body.style.paddingBottom = '60px';
    } else {
      document.body.style.paddingBottom = '0';
    }
    return () => { document.body.style.paddingBottom = '0'; };
  }, [visible]);

  const handleClose = () => {
    sessionStorage.setItem('ad_banner_dismissed', '1');
    setVisible(false);
  };

  if (!visible || !ADSENSE_CLIENT || !ADSENSE_SLOT) return null;

  return (
    <div className="ad-sticky-banner">
      <button className="ad-close-btn" onClick={handleClose} aria-label="Close ad">✕</button>
      <ins
        className="adsbygoogle"
        style={{ display: 'block', width: '100%', height: '100%' }}
        data-ad-client={ADSENSE_CLIENT}
        data-ad-slot={ADSENSE_SLOT}
        data-ad-format="horizontal"
        data-full-width-responsive="true"
      />
    </div>
  );
}
