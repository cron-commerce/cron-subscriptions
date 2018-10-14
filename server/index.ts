import * as express from 'express'
import * as next from 'next'

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const nextApp = next({dev})
const handle = nextApp.getRequestHandler()

nextApp.prepare()
.then(() => {
  const app = express()

  app.get('*', (req, res) => handle(req, res))
    
  app.listen(port)
})