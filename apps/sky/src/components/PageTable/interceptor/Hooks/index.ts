import { autoTapSync } from '@4a/tap'

import { Context } from './types'

// 表单渲染前预处理FormSchema
export function afterFormRender(ctx: Context) {
  return autoTapSync(ctx, import.meta.glob('./files/*.ts', { eager: true }))
}
