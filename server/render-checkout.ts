import {Context} from 'koa'

export default () => async (ctx: Context, next: () => void) => {
  if (ctx.path === '/checkout') {
    ctx.body =
`<!DOCTYPE html>
<html>
  <head>
    <title>Checkout</title>
    ${process.env.NODE_ENV !== 'development' ? '<link rel="stylesheet" href="/assets/checkout.css" />' : ''}
  </head>
  <body>
    <h1>checkout</h1>
    <div id="app"></div>
    <script src="/assets/checkout.js"></script>
  </body>
</html>`
  } else {
    await next()
  }
}
