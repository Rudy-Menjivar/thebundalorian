
const stripe = require("stripe")(process.env.STRIPE_KEY);

const YOUR_DOMAIN = process.env.DOMAIN;

const productLookup = {
    oneTreat: process.env.ONE_TREAT,
    twoTreats: process.env.TWO_TREATS,
    fourTreats: process.env.FOUR_TREATS,
  };

  export default async function handler(req, res) {
    const data = JSON.parse(req.body);
    const productCode = data.productCode;
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: productLookup[productCode],
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${YOUR_DOMAIN}`,
      cancel_url: `${YOUR_DOMAIN}`,
    });
  
    res.send({ sessionId: session.id });
  }