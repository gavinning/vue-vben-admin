// import microApp, { } from '@micro-zoe/micro-app'
import WujieVue from 'wujie-vue3'
// export default function Block(props: Item) {
//   return <microApp name="charts" url="http://localhost:5173/" baseroute="/charts" />
// }

export default defineComponent({
  setup() {
    const app = useAppStore()

    const uri = ref('http://localhost:5173/?token=666')

    // const change = () => uri.value = 'http://localhost:5173/demo?token=666'

    // return () => <iframe src={uri.value} style="width:100%;height:100%;border:none;" />

    return () => <WujieVue name="xxx" props={app.charts} url={uri.value} />
  },
})
