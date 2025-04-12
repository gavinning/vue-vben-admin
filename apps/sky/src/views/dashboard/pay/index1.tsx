import { ElTag } from 'element-plus'

import { getListBridge } from '#/api/directus'
import { PageTable, PageTableProps } from '#/components/PageTable'

const columns = [
  { title: '序号', type: 'seq', width: 50 },
  { field: 'name', title: '名字' },
  { field: 'type', title: '支付类型' },
  { field: 'account', title: '帐号' },
  { field: 'appId', title: 'APPID' },
  { field: 'salt', title: '商户号' },
  { field: 'enabled', title: '状态', slots: { default: 'enabled' } },
  { field: 'date_updated', formatter: 'formatDateTime', title: '更新时间' },
]

const action: PageTableProps['action'] = {
  // 渲染列表，列表请求接口
  query: getListBridge('pays'),

  // 新增数据事件
  create: async (row: Item) => {
    console.warn('create clicked:', row)
  },

  // 更新数据事件
  update: async (row: Item) => {
    console.warn('update clicked:', row)
  },

  // 删除数据事件 不需要删除则不传改参数
  remove: async (row: Item) => {
    console.warn('remove clicked:', row.id)
  },
}

const Tag = (row: App.Pay.Row) => {
  const getText = filterFromArray(['禁用', '启用'])
  const getType = filterFromArray(['danger', 'success'])
  return (
    <ElTag type={getType(row.enabled) as any}>{getText(row.enabled)}</ElTag>
  )
}

const renderTag = () => ({
  enabled: ({ row }: Record<'row', App.Pay.Row>) => Tag(row),
})

export default defineComponent({
  setup() {
    return () => (
      <PageTable action={action} class="p-5" columns={columns}>
        {renderTag()}
      </PageTable>
    )
  },
})
