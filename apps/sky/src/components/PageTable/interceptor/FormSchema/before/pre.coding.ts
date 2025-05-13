import { defineMiddleware } from 'tap'

import { IFormSchemaContext } from '../type'

// 表单渲染前FormSchema预处理
export const FormSchemaProCoding = () => {
  return defineMiddleware<IFormSchemaContext>((ctx, next) => {
    ctx.data.schema = ctx.data.schema ?? []

    ctx.data.schema = ctx.data.schema.map((item) => {
      // 默认为Input
      if (!item.component) item.component = 'Input'

      // 如果是上传组件，添加文件字段映射
      if (item.component === 'Upload') {
        useUploadHub().addFileFieldMap(ctx.name, item.fieldName)
      }
      return item
    })

    next()
  })
}
