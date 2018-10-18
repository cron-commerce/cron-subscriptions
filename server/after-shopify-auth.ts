import {Context} from 'koa'
import {getManager} from 'typeorm'

import {Shop} from '../entities/shop'

export default async (ctx: Context) => {
  const shopName = ctx.session.shop
  const accessToken = ctx.session.accessToken

  await saveAccessToken(shopName, accessToken)

  ctx.redirect('/')
}

const saveAccessToken = async (shopName: string, accessToken: string) => {
  const entityManager = getManager()

  let shop = await entityManager.findOne(Shop, {where: {name: shopName}})

  if (!shop) {
    shop = new Shop()
    shop.name = shopName
  }

  shop.token = accessToken
  await entityManager.save(shop)
}
