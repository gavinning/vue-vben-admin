/**
 * 用户名转邮箱
 * @param username 用户名
 * @param ext 邮箱后缀，默认为qq.com
 * @returns {string} 邮箱
 */
export function username2email(username: string, ext: string = 'qq.com') {
  if (!username) return username;
  return username?.includes('@') ? username : `${username}@${ext}`;
}
