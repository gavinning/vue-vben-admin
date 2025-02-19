import type { UserInfo } from '@vben/types';

import { requestClient } from '../request';

/**
 * 获取用户信息
 */
export async function getUserInfoApi() {
  return getUserInfoTesting();
  return requestClient.get<UserInfo>('/user/info');
}

function getUserInfoTesting() {
  return {
    id: 0,
    realName: 'Vben',
    roles: ['super'],
    username: 'vben',
  };
}
