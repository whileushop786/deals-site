import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* ── Favicon ── */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon-192.png" type="image/png" sizes="192x192" />
        <link rel="apple-touch-icon" href="/icon-192.png" />
        <link rel="manifest" href="/manifest.json" />    
        <link rel="icon" type="image/png" sizes="32x32" href="/icon-32.png">
        <link rel="icon" type="image/png" sizes="16x16" href="/icon-16.png">

        {/* ── Fonts ── */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Barlow+Condensed:wght@700;800;900&display=swap" rel="stylesheet" />

        {/* ── Global SEO meta ── */}
        <meta name="theme-color" content="#ff6b00" />
        <meta name="msapplication-TileColor" content="#ff6b00" />
        <meta name="application-name" content="WhileUShop.com" />
        <meta name="apple-mobile-web-app-title" content="WhileUShop" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="format-detection" content="telephone=no" />

        {/* ── Performance hints ── */}
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://m.media-amazon.com" />
        <link rel="preconnect" href="https://m.media-amazon.com" crossOrigin="anonymous" />

        {/* ── Google AdSense ── */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2723752519561361"
          crossOrigin="anonymous"
        />
      </Head>
      <body>
        <Main />
        <NextScript />

        {/* ── Statcounter Analytics ── */}
        <script type="text/javascript" dangerouslySetInnerHTML={{ __html: `
          var sc_project=11206781;
          var sc_invisible=1;
          var sc_security="bf9c6a09";
        `}} />
        <script type="text/javascript" src="https://www.statcounter.com/counter/counter.js" async />
        <noscript>
          <div className="statcounter">
            <a title="Web Analytics Made Easy - Statcounter" href="https://statcounter.com/" target="_blank" rel="noopener noreferrer">
              <img className="statcounter" src="https://c.statcounter.com/11206781/0/bf9c6a09/1/" alt="Web Analytics Made Easy - Statcounter" referrerPolicy="no-referrer-when-downgrade" />
            </a>
          </div>
        </noscript>
      </body>
    </Html>
  );
}
