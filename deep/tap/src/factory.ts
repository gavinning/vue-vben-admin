import { Tap } from './tap'
import { glob } from './glob'
import type { Context } from './tap'

/**
 * 方便的批量中间件导入
 * @param ctx 上下文对象
 * @param import_meta_glob import.meta.glob('./modules/*.ts', { eager: true })
 * @returns
 */
export const autoTap = <T extends Context>(ctx: T, import_meta_glob: Record<string, any>) => {
  return Tap.src(ctx)
  .use(...glob(import_meta_glob))
  .dest()
}
