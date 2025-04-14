import { PageTable } from '#/components/PageTable/PageTable'
import { renderTag } from '#/tsx/trade'

export default defineComponent({
  setup() {
    return () => <PageTable name="trades">{renderTag()}</PageTable>
  },
})
