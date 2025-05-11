import { defineMiddleware } from 'tap'

import { IFormContext } from '../type'

export const CateTransform = () => {
  return defineMiddleware<IFormContext>((ctx, next) => {
    if (ctx.name === App.Table.cates) {
      ctx.data.links = ctx.data.links?.map(Number)
    }
    next()
  })
}
