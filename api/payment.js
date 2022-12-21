
const stripe = require("stripe")(process.env.STRIPE_KEY);

console.log(stripe);

const YOUR_DOMAIN = "http://localhost:3000";

const productLookup = {
    oneTreat: "price_1MHXH5DmqbAbXMI1LoV03p1J",
    twoTreats: "price_1MHXHhDmqbAbXMI1nNCvpLjK",
    fourTreats: "price_1MHXI5DmqbAbXMI13e8fbtLV",
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