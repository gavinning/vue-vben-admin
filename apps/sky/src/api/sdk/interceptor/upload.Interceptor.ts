import type { Context, Middleware } from 'tap'
import { upload, uploads } from '#/api/sdk'

const isSourceFile = (obj: any) => {
  return typeof obj === 'object' && !!obj.raw
}

const isSourceFiles = (obj: any) => {
  return Array.isArray(obj) && obj.length > 0 && obj.every(isSourceFile)
}

export const uploadInterceptor = (config: Set<string>): Middleware<Context> => {
  return async (ctx) => {
    try {
      const keys = config.values()
      for (const key of keys) {
        const obj = ctx.data[key]

        if (obj) {
          if (isSourceFile(obj)) {
            // console.log(1233, key, obj)
            ctx.data[key] = (await upload(obj.raw)).id
          }
          if (isSourceFiles(obj)) {
            // console.log(4566, key, obj)
            const files = obj.map((item: any) => item.raw)
            ctx.data[key] = (await uploads(files)).map((item) => item.id)
          }
        }
      }

      return ctx
    } catch (err) {
      debug.error('图片上传失败:', err)
      Notice.error('图片上传失败，请重试')
    }
  }
}
