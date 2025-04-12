import { defineGrid, renderAction, TableProps } from './helper'

export type { TableProps } from './helper'

export const Table = defineComponent<TableProps>({
  props: ['action', 'columns', 'toolbarConfig', 'gridOptions'],
  setup(props, { slots }) {
    const [Grid] = defineGrid(props)
    return () => <Grid>{{ ...slots, ...renderAction(props.action) }}</Grid>
  },
})
