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
