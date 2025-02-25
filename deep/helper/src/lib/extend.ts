import merge from 'extend'

export { merge }

/**
 * 合并默认参数
 * @param params 实际参数
 * @param defaults 需要合并的默认参数
 * @returns 合并后的参数
 */
export function mergeDefaults(
  params: Record<string, any> = {},
  defaults: Record<string, any> = {},
) {
  return merge(true, {}, defaults, params)
}
