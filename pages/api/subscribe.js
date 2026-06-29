import { supabase } from '../../lib/supabase';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email } = req.body;

  // Validate email
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Please enter a valid email address.' });
  }

  const emailLower = email.toLowerCase().trim();

  try {
    // Check if already subscribed
    const { data: existing } = await supabase
      .from('subscribers')
      .select('id')
      .eq('email', emailLower)
      .single();

    if (existing) {
      return res.status(400).json({ error: 'This email is already subscribed!' });
    }

    // Save to Supabase
    const { error: insertError } = await supabase
      .from('subscribers')
      .insert([{ email: emailLower, subscribed_at: new Date().toISOString() }]);

    if (insertError) throw insertError;

    // Add contact to Brevo list
    const BREVO_API_KEY = process.env.BREVO_API_KEY;
    const BREVO_LIST_ID = process.env.BREVO_LIST_ID; // your list ID from Brevo

    if (BREVO_API_KEY) {
      // Step 1 — Add/update contact in Brevo
      await fetch('https://api.brevo.com/v3/contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'api-key': BREVO_API_KEY,
        },
        body: JSON.stringify({
          email: emailLower,
          listIds: BREVO_LIST_ID ? [parseInt(BREVO_LIST_ID)] : [],
          updateEnabled: true,
        }),
      });

      // Step 2 — Send welcome email via Brevo transactional API
      await fetch('https://api.brevo.com/v3/smtp/email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'api-key': BREVO_API_KEY,
        },
        body: JSON.stringify({
          sender: {
            name: 'WhileUShop Daily Deals',
            email: 'newsletter@whileushop.com',
          },
          to: [{ email: emailLower }],
          subject: '🎉 Welcome to WhileUShop Daily Deals Newsletter!',
          htmlContent: `
            <!DOCTYPE html>
            <html>
            <head>
              <meta charset="utf-8">
              <meta name="viewport" content="width=device-width, initial-scale=1">
            </head>
            <body style="margin:0;padding:0;background:#f5f5f5;font-family:Arial,sans-serif;">
              <div style="max-width:600px;margin:0 auto;background:#ffffff;border-radius:12px;overflow:hidden;">

                <!-- Header -->
                <div style="background:#ff6b00;padding:32px 24px;text-align:center;">
                  <h1 style="color:#fff;margin:0;font-size:30px;font-weight:900;letter-spacing:1px;">🔥 WhileUShop.com</h1>
                  <p style="color:rgba(255,255,255,0.9);margin:8px 0 0;font-size:15px;font-weight:600;">Daily Deals Newsletter</p>
                </div>

                <!-- Body -->
                <div style="padding:40px 32px;">
                  <h2 style="color:#1a1a1a;font-size:24px;margin:0 0 16px;">Welcome! You're officially a smart shopper 🎉</h2>
                  <p style="color:#555;font-size:15px;line-height:1.7;margin:0 0 20px;">
                    Thanks for subscribing to the <strong>WhileUShop Daily Deals Newsletter</strong>!
                    You'll now receive the best handpicked deals, verified coupon codes, and exclusive
                    discounts from top U.S. online stores — delivered directly to your inbox every day.
                  </p>

                  <!-- Benefits box -->
                  <div style="background:#fff7f0;border:2px solid rgba(255,107,0,0.2);border-radius:12px;padding:24px;margin:24px 0;">
                    <h3 style="color:#ff6b00;margin:0 0 14px;font-size:17px;">Here's what you'll get:</h3>
                    <table style="width:100%;border-collapse:collapse;">
                      <tr><td style="padding:6px 0;color:#555;font-size:14px;">🛍️ &nbsp;Handpicked daily deals from top U.S. stores</td></tr>
                      <tr><td style="padding:6px 0;color:#555;font-size:14px;">🏷️ &nbsp;Verified coupon codes that actually work</td></tr>
                      <tr><td style="padding:6px 0;color:#555;font-size:14px;">⚡ &nbsp;Limited-time flash deals & freebies</td></tr>
                      <tr><td style="padding:6px 0;color:#555;font-size:14px;">💰 &nbsp;Exclusive subscriber-only discounts</td></tr>
                    </table>
                  </div>

                  <!-- CTA Button -->
                  <div style="text-align:center;margin:32px 0;">
                    <a href="https://www.whileushop.com"
                       style="background:#ff6b00;color:#fff;text-decoration:none;padding:16px 36px;
                              border-radius:10px;font-size:16px;font-weight:700;display:inline-block;
                              letter-spacing:0.5px;">
                      🛒 Shop Today's Deals →
                    </a>
                  </div>

                  <!-- Social links -->
                  <p style="color:#777;font-size:13px;line-height:1.7;text-align:center;">
                    Follow us for real-time deal alerts:<br>
                    <a href="https://t.me/whileushop" style="color:#ff6b00;text-decoration:none;">📱 Telegram</a>
                    &nbsp;&nbsp;|&nbsp;&nbsp;
                    <a href="https://www.facebook.com/whileushop786" style="color:#ff6b00;text-decoration:none;">📘 Facebook</a>
                    &nbsp;&nbsp;|&nbsp;&nbsp;
                    <a href="https://instagram.com/crazydealshunter" style="color:#ff6b00;text-decoration:none;">📸 Instagram</a>
                    &nbsp;&nbsp;|&nbsp;&nbsp;
                    <a href="https://www.youtube.com/@SnagItUSA" style="color:#ff6b00;text-decoration:none;">▶️ YouTube</a>
                  </p>
                </div>

                <!-- Footer -->
                <div style="background:#f9f9f9;border-top:1px solid #e5e5e5;padding:20px 32px;text-align:center;">
                  <p style="color:#aaa;font-size:12px;margin:0;line-height:1.7;">
                    © ${new Date().getFullYear()} WhileUShop.com — All rights reserved.<br>
                    You received this email because you subscribed at <a href="https://www.whileushop.com" style="color:#ff6b00;">whileushop.com</a>.<br>
                    <a href="https://www.whileushop.com/privacy" style="color:#ff6b00;">Privacy Policy</a>
                  </p>
                </div>

              </div>
            </body>
            </html>
          `,
        }),
      });
    }

    return res.status(200).json({ success: true });

  } catch (err) {
    console.error('Subscribe error:', err);
    return res.status(500).json({ error: 'Something went wrong. Please try again.' });
  }
}
