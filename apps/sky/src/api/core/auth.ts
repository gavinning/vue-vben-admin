import { username2email } from '@4a/helper'

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
  const ret = await actor.auth.login(loginTransform(data))
  return {
    accessToken: ret.access_token,
    expires: ret.expires,
    refreshToken: ret.refresh_token,
  }
}

// 001 登录参数转换
function loginTransform(data: AuthApi.LoginParams) {
  return {
    email: username2email(data.username ?? ''),
    password: data.password ?? '',
  }
}

/**
 * 刷新accessToken
 */
export async function refreshTokenApi() {
  return actor.auth.refresh()
}

/**
 * 退出登录
 */
export async function logoutApi() {
  return actor.auth.logout()
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
