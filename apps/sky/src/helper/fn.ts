// 函数

/**
 * 返回数组过滤器
 * @param arr 数组
 * @returns 数组过滤器
 */
export function filterFromArray<T = any>(arr: T[]) {
  return (index: any): T | undefined => arr[Number(index)]
}
