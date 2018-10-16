import {Context} from 'koa'

export default () => async (ctx: Context, next: Function) => {
  if (ctx.path === '/') {
    ctx.body = 
`<!DOCTYPE html>
<html>
  <head>
    <title>Cron Commerce</title>
  </head>
  <body>
    <h1>Cron Commerce</h1>
  </body>
</html>`
  } else {
    await next()
  }
}