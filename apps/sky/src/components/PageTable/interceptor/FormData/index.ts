// 用于处理表单数据的拦截器
// 表单数据与实际数据场景存在一定结构差异，需要做数据转换
// 拦截器分为：表单编辑渲染前数据编码、表单提交前数据解码
// beforeFormEdit：表单编辑渲染前对数据进行编码，符合表单渲染结构
// beforeFormSubmit：表单提交前对数据进行解码，符合实际数据结构

import { autoTap } from 'tap'

import { IFormContext } from './type'

// 表单编辑渲染前数据编码
export function beforeFormEdit(ctx: IFormContext) {
  return autoTap(
    ctx,
    import.meta.glob('./beforeFormEdit/*.ts', { eager: true }),
  )
}

// 表单提交前数据解码
export function beforeFormSubmit(ctx: IFormContext) {
  return autoTap(
    ctx,
    import.meta.glob('./beforeFormSubmit/*.ts', { eager: true }),
  )
}
