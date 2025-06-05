import { Page } from '#/components/Page'

import { Card } from './Card'

export default defineComponent({
  setup() {
    return () => (
      <Page class="page-professional">
        <header class="header text-center p-10">
          <h1 class="text-2xl p-5">升级专业版</h1>
          <p class="text-gray-400">更高的计划，更多的收入</p>
        </header>
        <div class="cards grid grid-cols-3 gap-4">
          <Card />
          <Card />
          <Card />
        </div>
      </Page>
    )
  },
})
