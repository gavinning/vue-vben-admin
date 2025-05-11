import { defineMiddleware } from 'tap'

import { IFormSchemaContext } from '../type'

// 动态注入app字段的options
export const AddAppSelectOptions = () => {
  return defineMiddleware<IFormSchemaContext>(async (ctx, next) => {
    // 获取app列表
    const apps = await useLinkStore().getApps()
    // 动态注入app字段的options
    ctx.data.schema?.forEach((item) => {
      if (item.fieldName === 'app' && item.waitSelectOptions) {
        item.componentProps = item.componentProps ?? {}
        // @ts-ignore options是select的属性
        item.componentProps.options = apps.map((app) => ({
          label: app.name,
          value: app.id,
        }))
      }
    })
    next()
  })
}
