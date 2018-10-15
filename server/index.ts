import 'isomorphic-fetch'

import * as Koa from 'koa'
import * as logger from 'koa-logger'
import * as session from 'koa-session'
import shopifyAuth, {verifyRequest} from '@shopify/koa-shopify-auth'

const port = process.env.PORT || 3000

const shopifyPrefix = '/shopify'

const shopifyAuthArgs = {
  prefix: shopifyPrefix,
  apiKey: process.env.SHOPIFY_APP_KEY,
  secret: process.env.SHOPIFY_APP_SECRET,
  scopes: ['read_products'],
  afterAuth(ctx) {
    const {shop, accessToken} = ctx.session
    console.log('We did it!', accessToken)
    ctx.redirect('/')
  },
}

const verifyRequestArgs = {
  authRoute: `${shopifyPrefix}/auth`, 
  fallbackRoute: `${shopifyPrefix}/auth`,
}

const app = new Koa()

app.keys = [process.env.SHOPIFY_APP_SECRET]

app
  .use(logger())
  .use(session(app))
  .use(shopifyAuth(shopifyAuthArgs))
  .use(verifyRequest(verifyRequestArgs))
  .use((ctx) => {
    ctx.body = `
    <script src="https://cdn.shopify.com/s/assets/external/app.js"></script>

    <script type="text/javascript">
      ShopifyApp.init({
        apiKey: "${process.env.SHOPIFY_APP_KEY}",
        shopOrigin: "https://${ctx.session.shop}",
        debug: true,
        forceRedirect: true
      });
    </script>`
  })  
  .listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`)
  })