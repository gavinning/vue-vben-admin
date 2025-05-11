import { defineMiddleware } from 'tap'

import { IFormSchemaContext } from '../type'

// 表单渲染前参数合并
export const MergeFormComponentProps = () => {
  return defineMiddleware<IFormSchemaContext>(async (ctx, next) => {
    // 更新类型表单渲染前参数合并
    if (ctx.isEdit === true) {
      ctx.data.schema?.forEach((schema) => {
        if (schema.editComponentProps) {
          merge(schema.componentProps, schema.editComponentProps)
        }
      })
    }
    // 创建类型表单渲染前参数合并
    if (ctx.isEdit === false) {
      ctx.data.schema?.forEach((schema) => {
        if (schema.createComponentProps) {
          merge(schema.componentProps, schema.createComponentProps)
        }
      })
    }
    next()
  })
}
