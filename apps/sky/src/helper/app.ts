import { isEmpty } from '@vben/utils'

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

export function removeNull(target: any) {
  if (!target) return target
  const obj = merge(true, {}, target)
  Object.keys(obj).forEach((key) => {
    if (obj[key] === null || isEmpty(obj[key])) {
      // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
      delete obj[key]
    }
  })
  return obj
}

/**
 * 比较两个对象，返回目标对象中与源对象不同的属性。
 *
 * @template T - 返回对象的类型，默认为 any。
 * @param {any} src - 源对象。
 * @param {any} target - 目标对象。
 * @param {string[]} [whiteList] - 白名单数组，包含需要保留的属性键。
 * @returns {T} - 返回一个新的对象，包含目标对象中与源对象不同的属性。
 *
 * 该函数首先深拷贝目标对象，然后遍历目标对象的键。如果某个键不在白名单中，
 * 并且其值与源对象中对应的值相同，则从新对象中删除该键。最终返回这个新对象。
 */
export function diff<T = any>(src: any, target: any, whiteList?: string[]): T {
  // 如果 `src` 或 `target` 为空，则直接返回 `target`
  if (isEmpty(src) || isEmpty(target)) return target

  // 深拷贝目标对象，以避免修改原始目标对象
  const obj: any = merge(true, {}, target)

  // 遍历目标对象的每个键
  Object.keys(target).forEach((key) => {
    // 如果键不在白名单中，并且其值与源对象中对应的值相同
    if (!whiteList?.includes(key) && obj[key] === src[key]) {
      // 删除该键
      // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
      delete obj[key]
    }
  })

  // 返回包含不同属性的新对象
  return obj
}
