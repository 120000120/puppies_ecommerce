import Stripe from 'stripe';

const stripe = new Stripe(process.env.REACT_APP_STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  const { productName, productPrice, currency } = req.body;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: [
        'card',
        'klarna',
        'afterpay_clearpay',
        'affirm',
        'cashapp',
        'us_bank_account'
      ],
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency,
            product_data: {
              name: productName || 'Best Family Puppy',
            },
            unit_amount: Math.round(productPrice * 100),
          },
          quantity: 1,
        },
      ],
      success_url: ${req.headers.origin}/success?success=true,
      cancel_url: ${req.headers.origin}/cancel,
    });

    return res.status(200).json({ url: session.url, sessionId: session.id });
  } catch (error) {
    console.error('Stripe session error:', error);
    return res.status(500).json({ error: error.message });
  }
}
