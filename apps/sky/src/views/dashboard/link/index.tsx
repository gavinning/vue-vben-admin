import { PageTable } from '#/components/PageTable/PageTable'
import { renderApp } from '#/tsx/link'

// 需要在config表中定义schema
export default defineComponent({
  setup() {
    const store = useLinkStore()
    store.getApps()
    return () => <PageTable name="links">{renderApp(store.appMap)}</PageTable>
  },
})
