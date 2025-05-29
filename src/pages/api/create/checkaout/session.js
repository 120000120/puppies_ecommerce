const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { productName, productPrice, currency } = req.body;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: [
        'card',
        'afterpay_clearpay',
        'affirm',
        'klarna',
        'cashapp',
        'link'
      ],
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: currency || 'usd',
            product_data: {
              name: productName || 'Best Family Puppy',
            },
            unit_amount: Math.round(productPrice * 100), // en centavos
          },
          quantity: 1,
        },
      ],
      success_url: ${req.headers.origin}/success?success=true,
      cancel_url: ${req.headers.origin}/cancel,
    });

    res.status(200).json({ url: session.url, sessionId: session.id });
  } catch (error) {
    console.error('Stripe session error:', error);
    res.status(500).json({ error: error.message });
  }
}
