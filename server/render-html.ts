import {Context} from 'koa'

export default (scriptFilename: string) => (ctx: Context) => {
  ctx.body = 
`<!DOCTYPE html>
  <html>
    <head>
      <link rel="stylesheet" href="https://sdks.shopifycdn.com/polaris/2.12.1/polaris.min.css" />
    </head>
    <body>
      <div id="app"></div>
      <script type="text/javascript">
        var shopifyApiKey = '${process.env.SHOPIFY_APP_KEY}';
        var shopifyShopOrigin = 'https://${ctx.session.shop}';
      </script>
      <script src="/public/scripts/${scriptFilename}"></script>
    </body>
  </html>`
}