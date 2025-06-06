import { Page } from '#/components/Page'
import { useProStore } from '#/store'

import { Card } from './Card'

export default defineComponent({
  setup() {
    const store = useProStore()

    store.getData()

    return () => (
      <Page class="page-professional">
        <header class="header text-center p-10">
          <h1 class="text-2xl p-5">{store.data.title}</h1>
          <p class="text-gray-400">{store.data.desc}</p>
        </header>
        <div class="cards grid grid-cols-3 gap-4 max-w-5xl mx-auto">
          {store.data.list?.map((item) => <Card data={item} />)}
        </div>
      </Page>
    )
  },
})
