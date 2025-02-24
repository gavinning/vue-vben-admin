// import type { UserInfo } from '@vben/types'

import { requestClient as req } from '../request'

/**
 * 获取用户信息
 */
export async function getUserInfoApi() {
  const data = await req.get('/users/me')
  return {
    realName: data.name || data.first_name,
    email: data.email,
    username: data.email,
    roles: [data.role],
  }
}
