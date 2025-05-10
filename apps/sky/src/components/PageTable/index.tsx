import { useVbenForm } from '#/adapter/form'
import { useDrawer } from '#/components/uses/drawer'

import { defineGrid, renderAction } from './helper'
import { RenderAction, TableProps } from './type'

export { formatCUD, getEasyAction } from './helper'
export * from './type'

export const Table = defineComponent<TableProps>({
  props: [
    // Table
    'action',
    'columns',
    'gridOptions',
    'toolbarConfig',
    // Form
    'formProps',
    'formRenderSchema',
  ],
  setup(props, { slots }) {
    const store = usePageTableStore()

    const [Grid, gridApi] = defineGrid(props)
    const [Form, formApi] = useVbenForm(props.formRenderSchema ?? {})
    const { Drawer, drawerApi } = useDrawer()

    // 处理实际的crud操作
    const action = props.action
    const isEdit = ref(false)
    const editRow = ref<any>(null)

    // 用于判断表单是否被修改
    // 根据状态决定是否在关闭Drawer的时候提醒用户
    const isFormChanged = ref(false)

    // Drawer的标题
    const title = computed(() => {
      return isEdit.value ? '编辑' : '新增'
    })

    // 用于处理表格中crud按钮的操作
    const proxyRenderAction: RenderAction = {
      query: action.query,
      // 下面的功能，根据其值决定是否启用
      // 例如传递了create方法，则启用create功能，反之不启用
      create: undefined as TableProps['action']['create'],
      update: undefined as TableProps['action']['update'],
      remove: undefined as TableProps['action']['remove'],
    }

    if (action.create) {
      // 外部传递了create方法，则启用create功能
      // proxyRenderAction.create用于响应新增按钮的事件
      // 当新增表单提交的时候，会调用action.create方法
      proxyRenderAction.create = async () => {
        isEdit.value = false
        await store.beforeCreate()
        handleReset()
        drawerApi.open()
      }
    }

    if (action.update) {
      proxyRenderAction.update = async (row: Item) => {
        isEdit.value = true
        editRow.value = row
        const copyRow = merge(true, {}, row)
        // 不允许对copyRow进行修改，非响应式数据，修改无意义
        // 表单提交的时候会用到diff对比数据，所以不能开放对row的修改
        // 如果开放对row的修改，可能会影响到实际的数据修改
        await store.beforeEdit(Object.freeze(copyRow))
        handleReset()
        drawerApi.open()
      }
    }

    if (action.remove) {
      proxyRenderAction.remove = async (row: Item) => {
        return Popover.confirm(
          `删除无法恢复！确认要删除${row.name ?? row.id ?? ''}吗？`,
          { customStyle: { top: '-20vh' } },
        )
          .then(() => action.remove?.(row))
          .then(() => {
            gridApi.query()
            Message.success('删除成功')
          })
          .catch((error) =>
            error?.message ? catchError(error) : Message.info('取消删除'),
          )
      }
    }

    // 处理Drawer的确认事件
    function onDrawerConfirm() {
      // 验证并提交表单
      formApi.validateAndSubmitForm()
    }

    async function handleReset() {
      await formApi.resetForm()
      // 如果存在编辑行，则重置编辑行
      if (isEdit.value) {
        const row = store.encodeImg(editRow.value)
        await formApi.setValues(row)
      }
      isFormChanged.value = false
    }

    // 处理Form表单的值变化事件
    // 当值改的时候，isFormChanged.value = true
    // 当值重置的时候，isFormChanged.value = false
    // isFormChanged的值会控制当Drawer关闭的时候，是否需要确认
    function handleValuesChange(values: Item) {
      if (isEdit.value === false) {
        isFormChanged.value = Object.keys(removeEmpty(values)).length > 0
        // debug.log('changes:105', removeEmpty(values))
      } else {
        let row = store.decodeImg(values)
        row = store.fixUploadComponentsDataStructure(row)
        const changes = diff(editRow.value, row)
        // debug.log('changes:106', changes)
        isFormChanged.value = Object.keys(changes).length > 0
      }
    }

    // 处理Form表单的提交事件
    // isEdit.value === true 表示是编辑操作
    // isEdit.value === false 表示是创建操作
    async function onFormSubmit(values: Item) {
      try {
        drawerApi.loading()
        // 修正限制单条上传图片的组件数据结构，不使用数组 [file] => file
        values = store.fixUploadComponentsDataStructure(values)
        values = store.decodeImg(values)
        if (isEdit.value) {
          const id = editRow.value?.id
          const changes = merge({ id }, diff(editRow.value, values))
          await action.update?.(changes)
          merge(editRow.value, changes)
        } else {
          await action.create?.(values)
          gridApi.query()
        }

        // 表单提交则关闭Drawer
        drawerApi.close()
        drawerApi.loadingEnd()
        Message.success(isEdit.value ? '更新成功' : '创建成功')
      } catch (error) {
        drawerApi.loadingEnd()
        catchError(error)
      }
    }

    return () => (
      <div class="app-mod-page_table">
        <Grid>{{ ...slots, ...renderAction(proxyRenderAction) }}</Grid>
        <Drawer
          closeConfirm={isFormChanged.value}
          onConfirm={onDrawerConfirm}
          title={title.value}
        >
          <Form
            handleReset={handleReset}
            handleSubmit={onFormSubmit}
            handleValuesChange={handleValuesChange}
            showDefaultActions={false}
            {...props.formProps}
          />
        </Drawer>
      </div>
    )
  },
})
