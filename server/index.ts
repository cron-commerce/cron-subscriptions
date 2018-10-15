import * as express from 'express'
import * as morgan from 'morgan'
import * as next from 'next'

import shopifyAppRoute from './shopify-app'
import shopifyAppConfirmInstallRoute from './shopify-app/confirm-install'

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const nextApp = next({dev})
const handle = nextApp.getRequestHandler()

nextApp.prepare()
.then(() => {
  const app = express()

  app.use(morgan('dev'))
  app.get('/shopify-app', shopifyAppRoute())
  app.get('/shopify-app/confirm-install', shopifyAppConfirmInstallRoute())
  app.get('*', (req, res) => handle(req, res))
    
  app.listen(port)
})