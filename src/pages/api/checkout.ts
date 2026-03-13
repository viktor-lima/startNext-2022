import { NextApiRequest, NextApiResponse } from "next";
import { stripe } from "../../lib/stripe";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {


  const priceId = 'price_1SumbWGqDRZMtVImGgf8XPVG';


  const successURL = `${process.env.NEXT_URL}/success`
  const cancelURL = `${process.env.NEXT_URL}/`

  const checkoutSession = await stripe.checkout.sessions.create({
    success_url: successURL,
    cancel_url: cancelURL,
    mode: 'payment',
    line_items : [
      {
        price: priceId,
        quantity: 1,

      }
    ]
  })

  return res.status(201).json({
    checkoutURL: checkoutSession.url,
  })
}