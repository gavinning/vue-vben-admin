<script lang="ts" setup>
import { ElAffix, ElContainer, ElMain } from 'element-plus'

import { useLinkStore } from '#/store'

import Form from './LinkForm.vue'
import Preview from './Preview.vue'

const route = useRoute()
const router = useRouter()
const linkStore = useLinkStore()

// Add or Edit
const isEdit = route.params.id !== '+'

const defaultForm: any = {
  btn_placeholder: '立即加入',
}

const form: App.Link.Row = reactive(Object.assign({}, defaultForm))

function linksPage() {
  router.push({ name: 'Links' })
}

function submit() {
  isEdit ? linkStore.update(form) : linkStore.add(form).then(linksPage)
}

function created() {
  if (isEdit) {
    linkStore.getLink().then((link) => merge(true, form, link))
  }
}

created()

onMounted(() => emitter.on(AppEvent.Link.Submit, submit))
onBeforeUnmount(() => emitter.off(AppEvent.Link.Submit, submit))
</script>

<template>
  <ElContainer>
    <ElMain>
      <Form v-model="form" />
    </ElMain>
    <aside style="width: 375px" class="m-4" id="projects-aside">
      <ElAffix :offset="110" target="#projects-aside">
        <Preview v-model="form" />
      </ElAffix>
    </aside>
  </ElContainer>
</template>
