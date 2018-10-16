import * as React from 'react'
import {Link as RouterLink} from 'react-router-dom'

interface Props {
  children: any,
  url: string,
}

export default class Link extends React.Component<Props> {
  public static contextTypes = {
    easdk: () => null,
  }

  public render() {
    return <RouterLink onClick={this.changeUrl} to={this.props.url}>
      {this.props.children}
    </RouterLink>
  }

  private changeUrl = () => {
    this.context.easdk.pushState(this.props.url)
  }
}
