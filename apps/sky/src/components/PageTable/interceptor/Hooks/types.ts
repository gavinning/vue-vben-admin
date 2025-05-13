import { ExtendedFormApi } from '@vben/common-ui'

import { FormSchema } from '../../type'

export * from '../../type'
export type { UploadFile } from 'element-plus'

export interface Context {
  data: FormSchema
  name: App.Table
  api: ExtendedFormApi
}
