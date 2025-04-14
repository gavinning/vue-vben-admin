import { PageTable } from '#/components/PageTable/PageTable'
import { renderTag } from '#/tsx/pay'

export default defineComponent({
  setup() {
    return () => <PageTable name="pays">{renderTag()}</PageTable>
  },
})
