import { ElButton as Button } from 'element-plus'

function gotoTopic(id: ID) {
  window.open(`${import.meta.env.VITE_GLOB_TOPIC_URL}/topics/${id}`)
}

export const beforeCtrl = (row: App.Topic.Row) => {
  return (
    <Button link onClick={() => gotoTopic(row.id)} plain type="success">
      预览
    </Button>
  )
}
