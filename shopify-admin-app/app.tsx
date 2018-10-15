import * as React from 'react'
import {AppProvider, Page} from '@shopify/polaris'

export interface Props {
  apiKey: string,
  shopOrigin: string,
}

interface State {
  shouldRender: boolean,
}

export default class App extends React.Component<Props, State> {
  state = {
    shouldRender: false
  }

  componentDidMount() {
    console.log('rendering')
    this.setState({shouldRender: true})
  }

  render() {
    if (!this.state.shouldRender) return <div>Loading...</div>

    return <AppProvider apiKey={this.props.apiKey} shopOrigin={this.props.shopOrigin}>
      <Page title='Cron Commerce App'>This is the app</Page>
    </AppProvider>
  }
}