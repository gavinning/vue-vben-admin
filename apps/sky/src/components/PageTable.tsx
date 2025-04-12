import { useVbenDrawer } from '@vben/common-ui'

import { Form } from '#/components/Form'
import { Page } from '#/components/Page'
import { Table, TableProps } from '#/components/Table'
import { diff } from '#/helper'

export const PageTable = defineComponent<TableProps>({
  props: ['action', 'columns'],
  setup(props, { slots }) {
    const action = props.action
    const isEdit = ref(false)
    const editRow = ref<any>(null)
    const store = usePayStore()
    const [Drawer, drawerApi] = useVbenDrawer()

    const create = async () => {
      isEdit.value = false
      drawerApi.open()
    }

    const update = async (row: Item) => {
      isEdit.value = true
      editRow.value = row
      console.warn('update 123', row)
      drawerApi.open()
    }

    // 删除操作
    // 如果外部传递了remove方法，则启用删除操作
    const remove = async (row: Item) => {
      Popover.confirm(
        `删除无法恢复！确认要删除${row.name ?? row.id ?? ''}吗？`,
        { customStyle: { top: '-20vh' } },
      )
        .then(() => action.remove?.(row.id))
        .then(() => Message.success('删除成功'))
        .catch((error) =>
          error?.message
            ? Message.error(error.message)
            : Message.info('取消删除'),
        )
    }

    // 处理Form表单的提交事件
    const onFormSubmit = (values: Item) => {
      if (isEdit.value) {
        const id = editRow.value?.id
        const changes = diff(editRow.value, values)
        action.update?.(id, changes)
      } else {
        action.create?.(values)
      }
    }

    // 创建Table组件的action
    const tableAction = {
      query: action.query,
      create,
      update,
      remove: action.remove ? remove : undefined,
    }

    // 请求表单的schema
    store.getFormSchema()

    return () => (
      <Page>
        <Table action={tableAction} columns={props.columns}>
          {slots}
        </Table>
        <Drawer class="w-full max-w-[800px] mx-auto" footer={false}>
          <Form
            handleSubmit={onFormSubmit}
            schema={store.payFormSchema}
            values={editRow.value}
          />
        </Drawer>
      </Page>
    )
  },
})
