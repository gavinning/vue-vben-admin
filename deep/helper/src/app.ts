import merge from 'extend'

/**
 * 用户名转邮箱
 * @param username 用户名
 * @param ext 邮箱后缀，默认为qq.com
 * @returns 邮箱
 */
export function username2email(username: string, ext: string = 'qq.com') {
  if (!username) return username
  return username?.includes('@') ? username : `${username}@${ext}`
}

/**
 *
 * @param target 目标对象
 * @param keys 需要删除的key
 * @returns 删除后的对象
 */

export function removeKey(target: any, keys: string[]) {
  if (!target) return target
  const obj = { ...target }
  keys.forEach((key) => {
    // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
    delete obj[key]
  })
  return obj
}

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
    if (obj[key] === null) {
      // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
      delete obj[key]
    }
  })
  return obj
}

export function isEmpty(obj: any) {
  return ['', null, Number.NaN, undefined].includes(obj)
}

export function isFullEmpty(obj: any) {
  if (isEmpty(obj)) return true
  if (Array.isArray(obj) && obj.length === 0) return true
  if (typeof obj === 'object' && Object.keys(obj).length === 0) return true
  return false
}

// 删除所有空值
// 包括：undefined、null、空字符串、空数组、空对象
export function removeEmpty(target: any) {
  if (!target) return target
  const obj = merge(true, {}, target)
  Object.keys(obj).forEach((key) => {
    if (isFullEmpty(obj[key])) {
      // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
      delete obj[key]
    }
  })
  return obj
}
