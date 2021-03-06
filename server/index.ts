import 'isomorphic-fetch'

import shopifyAuth, {verifyRequest} from '@shopify/koa-shopify-auth'
import * as Koa from 'koa'
import * as bodyParser from 'koa-bodyparser'
import * as favicon from 'koa-favicon'
import * as logger from 'koa-logger'
import * as session from 'koa-session'

import afterShopifyAuth from './after-shopify-auth'
import initTypeorm from './init-typeorm'
import renderCheckout from './render-checkout'
import renderHomepage from './render-homepage'
import renderShopifyAdmin from './render-shopify-admin'

const port = process.env.PORT || 3000
const shopifyPrefix = '/shopify'

const main = async () => {
  await initTypeorm()

  const app = new Koa()

  app.keys = [process.env.SHOPIFY_APP_SECRET]

  app.use(logger())

  if (process.env.NODE_ENV === 'development') {
    await require('./webpack-middleware').default(app)
  } else {
    require('./mount-static').default(app)
  }

  app
  .use(favicon(__dirname + '/public/favicon.ico'))
  .use(renderHomepage())
  .use(bodyParser())
  .use(renderCheckout())
  .use(session(app))
  .use(shopifyAuth({
    afterAuth: afterShopifyAuth,
    apiKey: process.env.SHOPIFY_APP_KEY,
    prefix: shopifyPrefix,
    scopes: ['write_orders'],
    secret: process.env.SHOPIFY_APP_SECRET,
  }))
  .use(verifyRequest({
    authRoute: `${shopifyPrefix}/auth`,
    fallbackRoute: `${shopifyPrefix}/auth`,
  }))
  .use(renderShopifyAdmin())
  .listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`)
  })
}

main()
