import { PageTable } from '#/components/PageTable/PageTable'
import { usePageTableStore } from '#/components/PageTable/store'
import { renderApp } from '#/tsx/link'

export default defineComponent({
  setup() {
    const store = useLinkStore()
    const pageTableStore = usePageTableStore()

    store.getApps()
    pageTableStore.setHook('links', store.setFormHook())

    return () => <PageTable name="links">{renderApp(store.appMap)}</PageTable>
  },
})
