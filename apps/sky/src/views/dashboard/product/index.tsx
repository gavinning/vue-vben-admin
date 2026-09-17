import { PageTable } from '#/components/PageTable/PageTable'
import { renderApp } from '#/tsx/product'

// 需要在config表中定义schema
export default defineComponent({
  setup() {
    // 获取应用列表，linkStore已实现，可直接调用
    const store = useLinkStore()
    // 获取应用列表
    store.getApps()
    // 渲染产品分成页面
    return () => (
      <PageTable name="products">{renderApp(store.appMap)}</PageTable>
    )
  },
})
