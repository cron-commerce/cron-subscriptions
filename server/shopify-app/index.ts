import {Request, Response} from 'express'

export default () => (req: Request, res: Response) => {
  if (!req.query.shop) return res.send('Missing ?shop=')

  const scope = [
    // 'read_customers',
    // 'read_orders',
    'read_products',
    // 'write_customers',
    // 'write_orders',
    // 'write_script_tags',
  ].join(',')

  return res.redirect([
    `https://${req.query.shop}/admin/oauth/authorize?client_id=${process.env.SHOPIFY_APP_KEY}`,
    `scope=${scope}`,
    `redirect_uri=${process.env.SHOPIFY_APP_HOST}/shopify-app/confirm-install`,
    `state=${process.env.SHOPIFY_APP_NONCE}`,
  ].join('&'))
}
