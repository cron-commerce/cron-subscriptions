import 'isomorphic-fetch'
import * as Koa from 'koa'
import * as Router from 'koa-router'
import * as session from 'koa-session'
import * as next from 'next'
import shopifyAuth, {verifyRequest} from '@shopify/koa-shopify-auth'

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const nextApp = next({dev})
const handle = nextApp.getRequestHandler()

nextApp.prepare()
.then(() => {
  const app = new Koa()
  app.keys = [process.env.SHOPIFY_APP_SECRET]

  app
    .use(session(app))
    .use(
      shopifyAuth({
        prefix: '/shopify',
        apiKey: process.env.SHOPIFY_APP_KEY,
        secret: process.env.SHOPIFY_APP_SECRET,
        scopes: ['read_products'],
        afterAuth(ctx) {
          const {shop, accessToken} = ctx.session
          console.log('We did it!', accessToken)
          ctx.redirect('/')
        },
      }),
    )
    .use(verifyRequest({
      authRoute: '/shopify/auth', 
      fallbackRoute: '/shopify/auth',
    }))
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
})