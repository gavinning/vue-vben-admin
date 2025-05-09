import { ElNotification as Notice } from 'element-plus'

export function ok(condition: any, message: string, notice: boolean = true) {
  if (!condition) {
    notice &&
      Notice.error({
        title: '验证失败',
        message,
      })
    throw new Error(message)
  }
}

export function isLikeUUID(str: string) {
  // 这里必须要判断字符串类型，否则数组类型也会返回true
  return (
    typeof str === 'string' &&
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(str)
  )
}
