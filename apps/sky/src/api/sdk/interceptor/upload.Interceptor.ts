import type { Context, Middleware } from 'tap'

import { upload } from '#/api/sdk'

const isSourceFile = (obj: any) => {
  return typeof obj === 'object' && !!obj.raw
}

const isSourceFiles = (obj: any) => {
  // eslint-disable-next-line unicorn/no-array-callback-reference
  return Array.isArray(obj) && obj.some(isSourceFile)
}

export const uploadInterceptor = (config: Set<string>): Middleware<Context> => {
  return async (ctx) => {
    try {
      const keys = config.values()
      for (const key of keys) {
        const obj = ctx[key]

        if (obj) {
          // 单张图片上传
          if (isSourceFile(obj)) {
            const ret = await upload(obj.raw)
            ctx[key] = ret.id
          }
          // 多张图片上传
          if (isSourceFiles(obj)) {
            for (let i = 0; i < obj.length; i++) {
              if (isSourceFile(obj[i])) {
                const ret = await upload(obj[i].raw)
                obj[i] = ret.id
              }
            }
            ctx[key] = obj
          }
        }
      }
      return ctx
    } catch (error) {
      debug.error('图片上传失败:', error)
      Notice.error('图片上传失败，请重试')
    }
  }
}
