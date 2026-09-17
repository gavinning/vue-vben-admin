// import type { UserInfo } from '@vben/types'

import { requestClient as req } from '../request'

/**
 * 获取用户信息
 */
export async function getUserInfoApi() {
  const data = await req.get('/users/me?fields=name,first_name,email,role.name')
  return {
    realName: data.name || data.first_name,
    email: data.email,
    username: data.email,
    roles: [data.role?.name],
    // isPlayer1: data.role?.name?.toLowerCase() === 'proxy1',
    // isPlayer2: data.role?.name?.toLowerCase() === 'proxy2',
    // isPlayer3: data.role?.name?.toLowerCase() === 'proxy3',
  }
}
