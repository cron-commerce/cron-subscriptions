import {Context} from 'koa'
import {getManager} from 'typeorm'

import {Shop} from '../entities/shop'

export default async (ctx: Context) => {
  const entityManager = getManager()

  let shop = await entityManager.findOne(Shop, {where: {name: ctx.session.shop}})

  if (!shop) {
    shop = new Shop()
    shop.name = ctx.session.shop
  }

  shop.token = ctx.session.accessToken
  await entityManager.save(shop)

  ctx.redirect('/')
}
