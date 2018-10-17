import {Context} from 'koa'

export default () => async (ctx: Context, next: () => void) => {
  if (ctx.path === '/checkout') {
    ctx.body =
`<!DOCTYPE html>
<html>
  <head>
    <title>Checkout</title>
  </head>
  <body>
    <h1>checkout</h1>
    <div id="app"></div>
    <script src="/public/scripts/checkout.js"></script>
  </body>
</html>`
  } else {
    await next()
  }
}
