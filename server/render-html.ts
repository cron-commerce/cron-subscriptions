import {Context} from 'koa'

export default () => (ctx: Context) => {
  ctx.body = 
`<!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8"/>
      <title>Go</title>
      <script src="https://cdn.shopify.com/s/assets/external/app.js"></script>
      <script type="text/javascript">
        ShopifyApp.init({
          apiKey: '${process.env.SHOPIFY_APP_KEY}',
          debug: false,
          shopOrigin: 'https://${ctx.session.shop}'
        });
      </script>
    </head>
    <body>
      <div id="app"></div>
      <script src="/shopify-admin-app.js"></script>
    </body>
  </html>`
}