import * as React from 'react'
import {hydrate} from 'react-dom'

import App from './app'
import './styles.scss'

const app = <App cart={window.cart} />

hydrate(app, document.getElementById('app'))
