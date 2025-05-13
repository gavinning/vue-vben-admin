import { PageTable } from '#/components/PageTable/PageTable'
import { beforeCtrl } from '#/tsx/topic'

export default defineComponent({
  setup() {
    return () => (
      <PageTable
        actionColumn={{ width: 160 }}
        beforeCtrl={beforeCtrl}
        name="topics"
      ></PageTable>
    )
  },
})
