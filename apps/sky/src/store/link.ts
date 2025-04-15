import type { UploadFile, UploadFiles, UploadProgressEvent } from 'element-plus'

import type { PageTableHook } from '#/components/PageTable'

import { keyBy } from 'es-toolkit'
import { z } from 'zod'

import { filter } from '#/api'
import { diff, removeNull } from '#/helper'

const api = directusItem('links')

interface UploadContext {
  error?: Error
  file?: UploadFile
  files?: UploadFiles
  progress?: UploadProgressEvent
  submit?: AnyFunction
}

export const useLinkStore = defineStore('linkStore', {
  state: () => ({
    currentLink: null as App.Link.Row | null,

    // TODO 图片上传测试，待确定
    // 临时上传上下文
    uploadContext: {} as UploadContext,

    // apps
    apps: [] as App.App.Row[],
  }),

  getters: {
    appMap(): Record<keyof App.App.Row, App.App.Row> {
      return keyBy(this.apps, (app) => app.id)
    },
  },

  actions: {
    async getApps() {
      if (this.apps.length > 0) return this.apps
      const params = {
        fields: 'id,name',
        ...filter({ enabled: true }),
      }
      return actor
        .items('apps')
        .readByQuery(params)
        .then((body) => {
          this.apps = body.data as App.App.Row[]
          return this.apps
        })
        .catch((error) => {
          catchError(error)
          return [] as App.App.Row[]
        })
    },

    // 动态注入links表单渲染数据
    setFormHook(): PageTableHook {
      return async (schema) => {
        const apps = await this.getApps()
        schema.schema?.forEach((item) => {
          // 动态注入app字段的options
          if (item.fieldName === 'app' && item.componentProps) {
            // @ts-ignore options是select的属性
            item.componentProps.options = apps.map((app) => ({
              label: app.name,
              value: app.id,
            }))
          }
          // 验证产品定价
          if (item.fieldName === 'amount') {
            const [min, max] = item.range ?? [9, 100]
            item.rules = z
              .string()
              .refine(
                (val: any) => !Number.isNaN(val) && val >= min && val <= max,
                {
                  message: `请输入${min}~${max}之间的数字`,
                },
              )
          }
        })
        return schema
      }
    },

    resetUploadContext() {
      this.uploadContext = {}
    },

    updateUploadContext(context: UploadContext) {
      merge(true, this.uploadContext, context)
    },

    async getLink(id?: string) {
      id = id || (useRoute().params.id as string)
      this.currentLink = await api.getById<App.Link.Row>(id, {
        fields: '*,app.name',
      })
      return this.currentLink
    },

    validation(item: App.Link.Row) {
      ok(item.amount, '金额不能为空')
      ok(item.app?.name === 'GROUP' && item.resource, '发货内容不能为空')
    },

    async add(item: App.Link.Row) {
      this.validation(item)
      return api
        .add(item)
        .then(() => Message.success(`链接添加成功`))
        .catch((error) => {
          throw new Error(`链接添加失败：${error.message}`)
        })
    },

    async update(item: App.Link.Row) {
      // TODO 图片上传测试
      // this.uploadContext.submit?.()

      // 清理空值
      item = removeNull(item)

      // 筛选需要更新的字段
      item = diff(this.currentLink, item, ['id'])

      // 清理无需更新的字段
      delete item.app

      // 若没有更新数据，则不进行更新
      if (Object.keys(item).length === 1) {
        Message.info(`${item.id} 没有数据需要更新`)
        return
      }

      // 更新数据
      return api
        .update(item)
        .then(() => {
          Message.success(`${item.id} 更新成功`)
          // 更新当前链接缓存
          // 若更新后的数据没有同步到currentLink对象
          // 会导致在未刷新数据的情况下，下一次更新时，数据不一致
          merge(true, this.currentLink, item)
        })
        .catch((error) => {
          throw new Error(`${item.id} 更新失败：${error.message}`)
        })
    },

    upload() {},
  },
})
