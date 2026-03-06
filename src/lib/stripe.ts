import Stripe from 'stripe'

export const stripe = new Stripe( process.env.STRIPE_SECRETE__KEY,{
  apiVersion: '2026-02-25.clover',
  appInfo: {
    name: 'Ignite Shop',
  }
})