import { ElNotification as Notice } from 'element-plus'

export function ok(condition: any, message: string, notice: boolean = false) {
  if (!condition) {
    notice &&
      Notice.error({
        title: '参数验证失败',
        message,
      })
    throw new Error(message)
  }
}
