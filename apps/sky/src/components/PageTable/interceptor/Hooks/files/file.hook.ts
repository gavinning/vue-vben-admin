import { defineMiddleware } from '@4a/tap'

import { Context, Schema, UploadFile } from '../types'

// 表单渲染后FormSchema注入Hooks
export const FormSchemaProCoding = () => {
  return defineMiddleware<Context>((ctx, next) => {
    ctx.data.schema = ctx.data.schema ?? []
    ctx.data.schema.forEach((schema) => limitMaxSize(ctx, schema))
    next()
  })
}

// 仅对Upload组件生效
function limitMaxSize(ctx: Context, schema: Schema) {
  const isFile = schema.component === 'Upload'
  const maxSize = schema.componentProps?.maxSize

  if (!isFile || !maxSize) return

  // 添加onChange事件
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  schema.componentProps!.onChange = async (file: UploadFile) => {
    debug.log('onChange:', file)
    if (
      file?.raw &&
      schema.componentProps?.maxSize &&
      file.raw.size / 1024 > schema.componentProps.maxSize
    ) {
      Notice.error({
        position: 'bottom-right',
        message: `图片大小不能超过${schema.componentProps.maxSize}KB!`,
      })

      const row = await ctx.api.getValues()
      const field = row[schema.fieldName]

      if (Array.isArray(field)) {
        ctx.api.setFieldValue(
          schema.fieldName,
          field.filter((i) => i.uid !== file.uid),
        )
      } else {
        ctx.api.setFieldValue(schema.fieldName, null)
      }
    }
  }
}
