import { PageTable } from '#/components/PageTable/PageTable'
import { renderTag } from '#/tsx/pay'

// 需要在config表中定义schema
export default defineComponent({
  setup() {
    return () => <PageTable name="pays">{renderTag()}</PageTable>
  },
})
