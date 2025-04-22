import WujieVue from 'wujie-vue3'

import { Page } from '#/components/Page'
import { getChartsHost } from '#/config/host'

export default defineComponent({
  setup() {
    const app = useAppStore()

    const uri = ref(getChartsHost())

    return () => (
      <Page class="p-5" style="background: var(--el-bg-color);">
        {/* @ts-ignore WujieVue */}
        <WujieVue name="charts" props={app.charts} url={uri.value} />
      </Page>
    )
  },
})
