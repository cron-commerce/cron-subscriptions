import * as React from 'react'

interface Props {
  cart: Cart,
}

export default class App extends React.Component<Props> {
  public render() {
    return <div>
      <h1>Checkout</h1>
      <div>Cart token: {this.props.cart.token}</div>
    </div>
  }
}
