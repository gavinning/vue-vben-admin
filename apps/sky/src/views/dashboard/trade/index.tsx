import { PageTable } from '#/components/PageTable/PageTable'
import { renderTag } from '#/tsx/trade'

// 需要在config表中定义schema
export default defineComponent({
  setup() {
    return () => <PageTable name="trades">{renderTag()}</PageTable>
  },
})
