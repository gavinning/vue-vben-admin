// 用于处理表单Schema的拦截器
// FormSchema为YAML配置，在动态数据和函数方面有所不足
// 通过拦截器，在表单渲染前对Schema进行预处理

import { autoTap } from 'tap'

import { IFormSchemaContext } from './type'

// 表单赋值之前预处理FormSchema
export function beforeReset(ctx: IFormSchemaContext) {
  return autoTap(ctx, import.meta.glob('./interceptors/*.ts', { eager: true }))
}

// 表单渲染前预处理FormSchema
export function beforeFormRender(ctx: IFormSchemaContext) {
  return autoTap(ctx, import.meta.glob('./before/*.ts', { eager: true }))
}
