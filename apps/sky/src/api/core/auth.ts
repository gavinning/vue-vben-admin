import { username2email } from '@4a/helper'

import { baseRequestClient, requestClient } from '../request'

export namespace AuthApi {
  /** 登录接口参数 */
  export interface LoginParams {
    password?: string
    username?: string
  }

  /** 登录接口返回值 */
  export interface LoginResult {
    accessToken: string
  }

  export interface RefreshTokenResult {
    data: string
    status: number
  }

  // add
  export interface loginBridgeParams {
    email: string
    password: string
  }
}

/**
 * 登录
 */
export async function loginApi(data: AuthApi.LoginParams) {
  return loginBridge({
    email: username2email(data.username ?? ''),
    password: data.password ?? '',
  })
}

// 001 登录桥接
async function loginBridge(data: AuthApi.loginBridgeParams) {
  const ret = await requestClient.post('/auth/login', data)
  return {
    accessToken: ret.access_token,
    expires: ret.expires,
    refreshToken: ret.refresh_token,
  }
}

/**
 * 刷新accessToken
 */
export async function refreshTokenApi() {
  return baseRequestClient.post<AuthApi.RefreshTokenResult>('/auth/refresh', {
    withCredentials: true,
  })
}

/**
 * 退出登录
 */
export async function logoutApi() {
  return baseRequestClient.post('/auth/logout', {
    withCredentials: true,
  })
}

/**
 * 获取用户权限码
 */
export async function getAccessCodesApi() {
  return getAccessCodesApiTesting()
  // return requestClient.get<string[]>('/auth/codes');
}

function getAccessCodesApiTesting() {
  return ['AC_100100', 'AC_100110', 'AC_100120', 'AC_100010']
}
