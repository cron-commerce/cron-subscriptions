import * as React from 'react'
import {render} from 'react-dom'
import {AppProvider} from '@shopify/polaris'

import App from './app'

const app = <AppProvider apiKey={window.shopifyApiKey} shopOrigin={window.shopifyShopOrigin}>
  <App />
</AppProvider>

render(app, document.getElementById('app'))