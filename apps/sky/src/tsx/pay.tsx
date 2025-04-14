import { ElTag } from 'element-plus'

const Tag = (row: App.Pay.Row) => {
  const getText = filterFromArray(['禁用', '启用'])
  const getType = filterFromArray(['danger', 'success'])
  return (
    <ElTag type={getType(row.enabled) as any}>{getText(row.enabled)}</ElTag>
  )
}

// Pays表的标签渲染
export const renderTag = () => ({
  enabled: ({ row }: Record<'row', App.Pay.Row>) => Tag(row),
})
