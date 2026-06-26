import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon-192.png" type="image/png" sizes="192x192" />
        <link rel="apple-touch-icon" href="/icon-192.png" />

        {/* Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Barlow+Condensed:wght@700;800;900&display=swap" rel="stylesheet" />

        {/* Site-wide meta */}
        <meta name="robots" content="index, follow" />
        <meta name="author" content="WhileUShop.com" />
        <meta name="theme-color" content="#ff6b00" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
