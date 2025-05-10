type AnyFunction = (...args: any[]) => any

/**
 * 导出所有模块
 * @param modules import.meta.glob('./modules/*.ts', { eager: true })
 * @returns 模块数组
 */
export const glob = (modules: Record<string, any>) => {
  const all: AnyFunction[] = []
  const ms = Object.values(modules)
  ms.forEach((m: any) => {
    all.push(...(Object.values(m) as AnyFunction[]))
  })
  return all.map((i) => i())
}
