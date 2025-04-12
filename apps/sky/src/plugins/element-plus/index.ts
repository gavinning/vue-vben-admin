import type { App } from 'vue'

import { ElMessageBox } from 'element-plus'

export function initElementPlus(app: App<Element>) {
  app.use(ElMessageBox)
}
