import {Context} from 'koa'
import * as React from 'react'
import {renderToString} from 'react-dom/server'
import HTML, {DOCTYPE} from '@shopify/react-html'

import {Props} from '../shopify-admin-app/app'

export default (App: React.SFC<Props>) => (ctx: Context) => {
  const app = <HTML>
    <App
      apiKey={process.env.SHOPIFY_APP_KEY}
      shopOrigin={`https://${ctx.query.shop}`} 
    />
  </HTML>

  ctx.body = DOCTYPE + renderToString(app)
}