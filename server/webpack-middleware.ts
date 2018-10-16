import * as Koa from 'koa'

export default async (app: Koa) => {
  const koaWebpack = require('koa-webpack')
  const webpackMiddleware = await koaWebpack({hotClient: false})
  app.use(webpackMiddleware)
}
