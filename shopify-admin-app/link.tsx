import * as React from 'react'
import {Link as RouterLink} from 'react-router-dom'

interface Props {
  children: any,
  url: string,
}

export default class Link extends React.Component<Props> {
  static contextTypes = {
    easdk: () => {}
  }

  render() {
    return <RouterLink onClick={this.changeUrl} to={this.props.url}>
      {this.props.children}
    </RouterLink>
  }

  changeUrl = () => {
    this.context.easdk.pushState(this.props.url)
  }
}