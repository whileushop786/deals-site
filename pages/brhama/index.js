import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { signIn, getSession } from '../../lib/auth';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    getSession().then((session) => {
      if (session) router.push('/brhama/dashboard');
    });
  }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const { error } = await signIn(email, password);

    if (error) {
      setError('Invalid email or password.');
      setLoading(false);
      return;
    }

    router.push('/brhama/dashboard');
  };

  return (
    <>
      <Head>
        <title>Admin Login — WhileUShop.com</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <div className="admin-login-wrap">
        <div className="admin-login-box">
          <img src="/logo.png" alt="WhileUShop.com" className="admin-login-logo" />
          <h1 className="admin-login-title">Admin Panel</h1>
          <p className="admin-login-sub">Sign in to manage your deals</p>

          <form onSubmit={handleSubmit} className="admin-login-form">
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="admin-input"
              required
              autoFocus
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="admin-input"
              required
            />
            {error && <p className="admin-error">{error}</p>}
            <button type="submit" className="admin-btn-primary" disabled={loading}>
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
