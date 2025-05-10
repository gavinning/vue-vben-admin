import { formatCUD, getEasyAction, Table } from '.'
import { usePageTableStore } from './store'

export interface PageTableProps {
  /**
   * 表名
   */
  name: string
}

// PageTable极简模式
// 外部仅需传入表名name，例如：pays
// 如果需要更多配置，可参照此组件进行扩展
export const PageTable = defineComponent<PageTableProps>({
  props: ['name', 'cud'],
  setup(props, { slots }) {
    const store = usePageTableStore()

    store.getFormSchema(props.name)

    // 注意配置验证器
    // CRUD操作的属性验证在这里配置
    // apps/sky/src/api/sdk/validator_config.ts
    const action = computed(() =>
      getEasyAction(props.name, formatCUD(store.currentCUD)),
    )

    const renderPageTable = () => (
      <Table
        action={action.value}
        columns={store.currentColumns}
        formRenderSchema={store.currentSchema}
      >
        {slots}
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

    // 延迟渲染Table组件
    // VbenForm的组件不会根据响应式数据自动刷新，需要手动刷新
    // 所以，最好在相关数据请求完毕后，再渲染Table组件
    return () => (store.currentColumns.length === 0 ? null : renderPageTable())
  },
})
