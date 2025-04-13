import { AxiosError } from '@vben/request'

import { TransportError } from '@directus/sdk'
// 通用错误处理
import { ZodError } from 'zod'

/**
 * 通用错误信息，默认使用 Message.error
 * @param err 错误信息
 * @param isNotice 是否使用 Notice.error
 */
export function catchError(err: any, isNotice?: boolean) {
  if (!err) return

  let message = err.message

  if (err.response?.data?.message) {
    message = err.response.data.message
  }

  // Promise Rejection
  if (err.reason) {
    message = getPromiseError(err)
  }

  // Zod
  if (err instanceof ZodError) {
    message = getFirstZodError(err)
  }

  // Directus TransportError
  if (err instanceof TransportError) {
    message = getTransportError(err)
  }

  // AxiosError
  if (err instanceof AxiosError) {
    message = getAxiosError(err)
  }

  debug.error(message)
  isNotice ? Notice.error(message) : Message.error(message)
}

// 格式化Zod错误
function getFirstZodError(err: ZodError) {
  const obj = err.issues[0]
  return [obj?.path[0], obj?.message].join(' is ')?.toLowerCase()
}

// 格式化Directus TransportError
function getTransportError(err: any) {
  return (
    err.response?.raw?.message ??
    err.response?.data?.message ??
    err.response?.statusText
  )
}

function getAxiosError(err: any) {
  return err.response?.data?.message ?? err.response?.statusText
}

function getPromiseError(err: any) {
  return err.reason?.message ?? err.reason
}
