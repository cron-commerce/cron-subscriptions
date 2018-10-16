import {AppProvider} from '@shopify/polaris'
import * as React from 'react'
import {render} from 'react-dom'
import {BrowserRouter} from 'react-router-dom'

import App from './app'
import Link from './link'

const app = <AppProvider
  apiKey={window.shopifyApiKey}
  linkComponent={Link as typeof React.Component}
  shopOrigin={window.shopifyShopOrigin}
>
  <BrowserRouter>
    <App />
  </BrowserRouter>
</AppProvider>

render(app, document.getElementById('app'))
