import { useState } from 'react';

export default function FooterSubscribe() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState('');

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
    } catch {
      setErrorMsg('Something went wrong. Please try again.');
      setStatus('error');
    }
  };

  return (
    <div className="footer-subscribe">
      {status === 'success' ? (
        <div className="footer-subscribe-success">
          🎉 You're subscribed! Check your inbox.
        </div>
      ) : (
        <>
          <p className="footer-subscribe-title">🔥 Never Miss a Deal!</p>
          <p className="footer-subscribe-sub">
            Handpicked deals, verified coupon codes &amp; exclusive discounts — delivered daily.
          </p>
          <form onSubmit={handleSubmit} className="footer-subscribe-form">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="footer-subscribe-input"
              disabled={status === 'loading'}
            />
            <button type="submit" className="footer-subscribe-btn" disabled={status === 'loading'}>
              {status === 'loading' ? '...' : 'Subscribe'}
            </button>
          </form>
          {errorMsg && <p className="footer-subscribe-error">{errorMsg}</p>}
        </>
      )}
    </div>
  );
}
