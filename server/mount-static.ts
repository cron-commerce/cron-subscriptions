import * as Koa from 'koa'

export default (app: Koa) => {
  const {resolve} = require('path')
  const mount = require('koa-mount')
  const serve = require('koa-static')
  const publicDir = resolve(__dirname, '../', 'public')
  app.use(mount('/public', serve(publicDir)))
}