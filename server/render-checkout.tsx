import {Context} from 'koa'
import * as React from 'react'
import {renderToString} from 'react-dom/server'

import App from '../checkout/app'
import {Shop} from '../entities/shop'
import loadManifest from './load-manifest'

export default () => async (ctx: Context, next: () => void) => {
  if (ctx.path === '/checkout' && ctx.method === 'POST') {
    const {shopName} = ctx.query
    if (!shopName) { return ctx.body = 'missing ?shop' }

    const shop = await Shop.findByName(shopName)
    if (!shop) { return ctx.body = 'invalid ?shop' }

    const cart = JSON.parse(decodeURIComponent((ctx.request.body as any).cart))

    const app = <App cart={cart} />

    const manifest = loadManifest()

    ctx.body =
`<!DOCTYPE html>
<html>
  <head>
    <title>Checkout</title>
    ${process.env.NODE_ENV !== 'development' ? `<link rel="stylesheet" href="${manifest['checkout.css']}" />` : ''}
  </head>
  <body>
    <div id="app">${renderToString(app)}</div>
    <script type="text/javascript">var cart = ${JSON.stringify(cart)};</script>
    <script src="${manifest['checkout.js']}"></script>
  </body>
</html>`
  } else {
    await next()
  }
}
