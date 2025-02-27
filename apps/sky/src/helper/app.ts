/**
 * 清空目标对象的所有属性。
 *
 * 该函数接收一个任意类型的对象作为参数，如果该对象为null或undefined，则直接返回该对象。
 * 如果对象存在，则遍历对象的所有键，并删除这些键对应的属性，从而清空对象。
 *
 * @param {any} target - 需要清空属性的对象。
 * @returns {any} - 返回清空属性后的对象，如果输入为null或undefined，则直接返回输入值。
 */
export function emptyObject(target: any) {
  // 检查目标对象是否为null或undefined，如果是，则直接返回该对象
  if (!target) return target
  // 使用Object.keys获取目标对象的所有键，并遍历这些键
  Object.keys(target).forEach((key) => {
    // 删除目标对象中的当前键对应的属性
    // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
    delete target[key]
  })
}

/**
 * 深度拷贝函数，将目标对象的属性复制到源对象中，并返回源对象。
 *
 * @param src - 源对象，将被清空或初始化。
 * @param target - 目标对象，其属性将被复制到源对象中。
 * @returns - 返回源对象，此时源对象已包含目标对象的属性。
 */
export function deepCopy<T>(src: any, target: T): T {
  emptyObject(src)
  return merge(true, src, target)
}
