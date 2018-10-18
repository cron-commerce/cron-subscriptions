import * as Shopify from 'shopify-api-node'

interface Props {
  accessToken: string,
  shopName: string,
}

export default ({accessToken, shopName}: Props) => new Shopify({accessToken, shopName})
