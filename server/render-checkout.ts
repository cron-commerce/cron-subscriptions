import {Context} from 'koa'

import {Shop} from '../entities/shop'
import loadManifest from './load-manifest'

export default () => async (ctx: Context, next: () => void) => {
  if (ctx.path === '/checkout' && ctx.method === 'POST') {
    const {shopName} = ctx.query
    if (!shopName) { return ctx.body = 'missing ?shop' }

    const shop = await Shop.findByName(shopName)
    if (!shop) { return ctx.body = 'invalid ?shop' }

    const cart = JSON.parse(decodeURIComponent((ctx.request.body as any).cart))
    console.log(cart)

    const manifest = loadManifest()

    ctx.body =
`<!DOCTYPE html>
<html>
  <head>
    <title>Checkout</title>
    ${process.env.NODE_ENV !== 'development' ? `<link rel="stylesheet" href="${manifest['checkout.css']}" />` : ''}
  </head>
  <body>
    <h1>checkout</h1>
    <div id="app"></div>
    <script src="${manifest['checkout.js']}"></script>
  </body>
</html>`
  } else {
    await next()
  }
}
