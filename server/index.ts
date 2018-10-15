import 'isomorphic-fetch'

import * as Koa from 'koa'
import * as logger from 'koa-logger'
import * as session from 'koa-session'
import shopifyAuth, {verifyRequest} from '@shopify/koa-shopify-auth'

import ShopifyAdminApp from '../shopify-admin-app/app'
import renderApp from './render-app'

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
  .use(renderApp(ShopifyAdminApp))  
  .listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`)
  })