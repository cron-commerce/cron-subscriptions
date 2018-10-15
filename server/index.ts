import 'isomorphic-fetch'

import * as Koa from 'koa'
import * as logger from 'koa-logger'
import * as session from 'koa-session'
import * as koaWebpack from 'koa-webpack'
import shopifyAuth, {verifyRequest} from '@shopify/koa-shopify-auth'

import renderHTML from './render-html'

const port = process.env.PORT || 3000

const shopifyPrefix = '/shopify'

const shopifyAuthArgs = {
  prefix: shopifyPrefix,
  apiKey: process.env.SHOPIFY_APP_KEY,
  secret: process.env.SHOPIFY_APP_SECRET,
  scopes: ['read_products'],
  afterAuth(ctx) {
    console.log(`Got accessToken ${ctx.session.accessToken} for shop ${ctx.session.shop}`)
    ctx.redirect('/')
  },
}

const verifyRequestArgs = {
  authRoute: `${shopifyPrefix}/auth`, 
  fallbackRoute: `${shopifyPrefix}/auth`,
}

koaWebpack({hotClient: false}).then(webpackMiddleware => {
  const app = new Koa()

  app.keys = [process.env.SHOPIFY_APP_SECRET]

  app
    .use(logger())
    .use(webpackMiddleware)
    .use(session(app))
    .use(shopifyAuth(shopifyAuthArgs))
    .use(verifyRequest(verifyRequestArgs))
    .use(renderHTML())
    .listen(port, () => {
      console.log(`> Ready on http://localhost:${port}`)
    })
  })