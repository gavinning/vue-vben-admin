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
  const maxWidth = schema.componentProps?.maxWidth
  const maxHeight = schema.componentProps?.maxHeight

  if (!isFile) return

  // 清理不符合条件的文件
  const resetFormValue = async (file: UploadFile) => {
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

  // 添加onChange事件
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  schema.componentProps!.onChange = async (file: UploadFile) => {
    debug.log('onChange:', file)

    // 限制图片大小
    if (file?.raw && maxSize && file.raw.size / 1024 > maxSize) {
      Notice.error({
        position: 'bottom-right',
        message: `图片大小不能超过${maxSize}KB`,
      })
      resetFormValue(file)
    }

    // 限制图片尺寸
    if (file?.raw && maxWidth && maxHeight) {
      const img = new Image()
      img.src = URL.createObjectURL(file.raw)
      img.addEventListener('load', () => {
        if (img.width > maxWidth || img.height > maxHeight) {
          Notice.error({
            position: 'bottom-right',
            message: `图片宽高不能超过${maxWidth}*${maxHeight}`,
          })
          resetFormValue(file)
        }
      })
    }
  }
}
