import {Link, Page} from '@shopify/polaris'
import * as React from 'react'
import {Route, Switch} from 'react-router-dom'

import About from './about'
import Home from './home'

export default class App extends React.Component<{}> {
  public render() {
    return <Page title='Cron Commerce App'>
      <h1>Cron Commerce</h1>
      <ul>
        <li><Link url='/about'>About</Link></li>
        <li><Link url='/home'>Home</Link></li>
      </ul>
      <Switch>
        <Route path='/about' component={About} />
        <Route path='/home' component={Home} />
      </Switch>
    </Page>
  }
}
