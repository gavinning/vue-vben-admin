import { defineMiddleware } from 'tap'

import { IFormContext } from '../type'

// 表单提交前对图片字段进行解码
export const FileTransformDecode = () => {
  return defineMiddleware<IFormContext>((ctx, next) => {
    ctx.uploadSchemas.forEach((item) => {
      if (item.fieldName in ctx.data) {
        const key = item.fieldName
        const value = ctx.data[key]
        if (FileImage.isInstance(value)) {
          ctx.data[key] = value.id
        } else if (Array.isArray(value)) {
          ctx.data[key] = value.map((file) => {
            return FileImage.isInstance(file) ? file.id : file
          })
        }
      }
    })
    next()
  })
}

// 修正限制单条上传图片的组件数据结构，不使用数组 [file] => file
export const fixUploadComponentsDataStructure = () => {
  return defineMiddleware<IFormContext>((ctx, next) => {
    ctx.uploadSchemas.forEach((item) => {
      if (
        item.fieldName in ctx.data && // 单条数据
        (!item.componentProps?.multiple || item.componentProps?.limit === 1)
      ) {
        const len = ctx.data[item.fieldName]?.length
        ctx.data[item.fieldName] =
          len && len > 0 ? ctx.data[item.fieldName][0] : null
      }
    })
    next()
  })
}
