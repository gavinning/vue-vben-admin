import { ElTag } from 'element-plus'

const Tag = (row: App.Trade.Row) => {
  const getText = filterFromArray(['有效', '无效'])
  const getType = filterFromArray(['success', 'info'])
  const isSuccess = row.status === 2
  return <ElTag type={getType(isSuccess) as any}>{getText(isSuccess)}</ElTag>
}

// Pays表的标签渲染
export const renderTag = () => ({
  status: ({ row }: Record<'row', App.Trade.Row>) => Tag(row),
})
