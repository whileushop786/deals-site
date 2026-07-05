import { useState, useEffect, useRef } from 'react';

export default function EmailPopup() {
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState('');
  const shownRef = useRef(false);

  useEffect(() => {
    // Don't show if already subscribed or dismissed in last 7 days
    try {
      const subscribed = localStorage.getItem('popup_subscribed');
      const dismissed = localStorage.getItem('popup_dismissed');
      const dismissedTime = dismissed ? parseInt(dismissed) : 0;
      const sevenDays = 7 * 24 * 60 * 60 * 1000;

      if (subscribed || (dismissed && Date.now() - dismissedTime < sevenDays)) return;
    } catch (e) {
      // localStorage not available
      return;
    }

    const handleScroll = () => {
      if (shownRef.current) return;
      const scrolled = window.scrollY;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      if (total <= 0) return;
      const pct = (scrolled / total) * 100;
      if (pct >= 30) {
        shownRef.current = true;
        setVisible(true);
        window.removeEventListener('scroll', handleScroll);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleDismiss = () => {
    try { localStorage.setItem('popup_dismissed', Date.now().toString()); } catch (e) {}
    setVisible(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }
    setStatus('loading');
    setErrorMsg('');

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.error || 'Something went wrong. Please try again.');
        setStatus('error');
        return;
      }

      setStatus('success');
      try { localStorage.setItem('popup_subscribed', '1'); } catch (e) {}
    } catch (err) {
      setErrorMsg('Something went wrong. Please try again.');
      setStatus('error');
    }
  };

  if (!visible) return null;

  return (
    <>
      <div className="popup-overlay" onClick={handleDismiss} />
      <div className="popup-box" role="dialog" aria-modal="true" aria-label="Newsletter signup">
        <button className="popup-close" onClick={handleDismiss} aria-label="Close">✕</button>

        <div className="popup-logo-wrap">
          <img src="/logo.png" alt="WhileUShop.com" className="popup-logo" />
        </div>

        {status === 'success' ? (
          <div className="popup-success">
            <div className="popup-success-icon">🎉</div>
            <h3>You're in!</h3>
            <p>Welcome to the <strong>Daily Deals Newsletter</strong>! Check your inbox for a welcome email from us.</p>
            <button className="popup-submit-btn" onClick={() => setVisible(false)}>
              Start Saving →
            </button>
          </div>
        ) : (
          <>
            <div className="popup-badge">🔥 Daily Deals Newsletter</div>
            <h2 className="popup-title">Never Miss a Deal!</h2>
            <p className="popup-sub">Get the best handpicked deals, verified coupon codes & exclusive discounts — delivered to your inbox daily.</p>

            <form className="popup-form" onSubmit={handleSubmit}>
              <input
                type="email"
                className="popup-input"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={status === 'loading'}
                required
              />
              {errorMsg && <p className="popup-error">{errorMsg}</p>}
              <button
                type="submit"
                className="popup-submit-btn"
                disabled={status === 'loading'}
              >
                {status === 'loading' ? 'Subscribing...' : '🛍️ Subscribe for Free'}
              </button>
            </form>

            <p className="popup-disclaimer">
              Free. No spam. Unsubscribe anytime.
              <br />
              <a href="/privacy" className="popup-privacy-link">Privacy Policy</a>
            </p>
          </>
        )}
      </div>
    </>
  );
}
