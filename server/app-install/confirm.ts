import {Request, Response} from 'express'
import * as fetch from 'isomorphic-fetch'
import {URLSearchParams} from 'url'

export default () => async (req: Request, res: Response) => {
  const body = new URLSearchParams()
  body.append('client_id', process.env.SHOPIFY_APP_KEY)
  body.append('client_secret', process.env.SHOPIFY_APP_SECRET)
  body.append('code', req.query.code)

  const fetchRes = await fetch(`https://${req.query.shop}/admin/oauth/access_token`, {
    body,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    method: 'POST',
  })
  const fetchJSON = await fetchRes.json()

  res.send(fetchJSON)
}
