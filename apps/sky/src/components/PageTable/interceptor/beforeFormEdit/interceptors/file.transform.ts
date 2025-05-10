import { defineMiddleware } from 'tap'

import { isLikeUUID } from '#/helper'

import { IFormContext } from '../type'

// 表单渲染之前对图片进行编码
export const FileTransformEncode = () => {
  return defineMiddleware<IFormContext>((ctx, next) => {
    ctx.uploadSchemas.forEach((item) => {
      if (item.fieldName in ctx.data) {
        const key = item.fieldName
        const value = ctx.data[key]
        if (isLikeUUID(value)) {
          ctx.data[key] = [FileImage.init(value)]
        } else if (Array.isArray(value)) {
          ctx.data[key] = value.map((file) => {
            return isLikeUUID(file) ? FileImage.init(file) : file
          })
        }
      }
    })
    next()
  })
}
