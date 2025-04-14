import { ElTag } from 'element-plus'

import { getEasyAction, Table } from '#/components/PageTable'

export default defineComponent({
  setup() {
    const store = usePayStore()

    store.getFormSchema()

    // 注意配置验证器
    // apps/sky/src/api/sdk/validator_config.ts
    const action = getEasyAction('pays', {
      create: true,
      update: true,
      remove: true,
    })

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

    const renderPageTable = () => (
      <Table
        action={action}
        columns={store.payColumns}
        formRenderSchema={store.payFormSchema}
      >
        {renderTag()}
      </Table>
    )

    // 当远程配置获取完成时，刷新Table组件，通过将key值设置为refreshFlag.value.toString()来触发
    // VbenForm: useVbenForm
    // VbenTable: useVbenVxeGrid
    // Vben的组件不会根据响应式数据自动刷新，需要手动刷新
    // const refreshFlag = ref(false)
    // watchEffect(() => {
    //   refreshFlag.value = !!store.payColumns.length
    // })

    return () => (store.payColumns.length === 0 ? null : renderPageTable())
  },
})
