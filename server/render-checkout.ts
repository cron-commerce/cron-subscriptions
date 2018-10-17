import {Context} from 'koa'

import loadManifest from './load-manifest'

export default () => async (ctx: Context, next: () => void) => {
  if (ctx.path === '/checkout') {
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
