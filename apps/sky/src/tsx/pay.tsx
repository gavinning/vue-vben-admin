import { ElTag } from 'element-plus'

const Tag = (row: App.Pay.Row) => {
  const getText = filterFromArray(['禁用', '启用'])
  const getType = filterFromArray(['danger', 'success'])
  return (
    <ElTag type={getType(row.enabled) as any}>{getText(row.enabled)}</ElTag>
  )
}

const PayTag = (row: App.Pay.Row) => {
  const getText = filterFromArray(['支付宝', '微信支付', '抖音支付'])
  const getType = filterFromArray(['primary', 'success', 'danger'])
  const pays = ['alipay', 'wechat', 'douyin']
  const i = pays.indexOf(row.type)
  return (
    <ElTag style="width: 4.5rem" type={getType(i) as any}>
      {getText(i)}
    </ElTag>
  )
}

// Pays表的标签渲染
export const renderTag = () => ({
  type: ({ row }: Record<'row', App.Pay.Row>) => PayTag(row),
  enabled: ({ row }: Record<'row', App.Pay.Row>) => Tag(row),
})
