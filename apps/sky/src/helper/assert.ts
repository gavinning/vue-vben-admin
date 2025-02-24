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
