import type { RenderAction, TableProps } from './type'

import { useVbenDrawer } from '@vben/common-ui'

import { useVbenForm } from '#/adapter/form'
import { Page } from '#/components/Page'
import { diff } from '#/helper'

import { defineGrid, renderAction } from './helper'

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
    const [Grid, gridApi] = defineGrid(props)
    const [Form, formApi] = useVbenForm(props.formRenderSchema ?? {})
    const [Drawer, drawerApi] = useVbenDrawer()

    const action = props.action
    const isEdit = ref(false)
    const editRow = ref<any>(null)

    // 用于处理Drawer的操作
    const proxyRenderAction: RenderAction = {
      query: action.query,
      // 下面的功能，根据action值决定是否启用
      create: undefined as TableProps['action']['create'],
      update: undefined as TableProps['action']['update'],
      remove: undefined as TableProps['action']['remove'],
    }

    if (action.create) {
      proxyRenderAction.create = () => {
        isEdit.value = false
        drawerApi.open()
      }
    }

    if (action.update) {
      proxyRenderAction.update = async (row: Item) => {
        isEdit.value = true
        editRow.value = row
        formApi.setValues(row)
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

    // 处理Form表单的提交事件
    // isEdit.value === true 表示是编辑操作
    // isEdit.value === false 表示是创建操作
    const onFormSubmit = async (values: Item) => {
      try {
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
        Message.success(isEdit.value ? '更新成功' : '创建成功')
      } catch (error) {
        catchError(error)
      }
    }

    return () => (
      <Page>
        <Grid>{{ ...slots, ...renderAction(proxyRenderAction) }}</Grid>
        <Drawer class="w-full max-w-[800px] mx-auto" footer={false}>
          <Form handleSubmit={onFormSubmit} {...props.formProps} />
        </Drawer>
      </Page>
    )
  },
})
