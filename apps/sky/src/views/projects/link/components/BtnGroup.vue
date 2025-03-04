<script lang="ts" setup>
import type { UploadInstance, UploadUserFile } from 'element-plus'

import { PreviewEye, SaveIcon } from '@vben/icons'
import { useAccessStore } from '@vben/stores'

import { ElButton, ElButtonGroup, ElTooltip } from 'element-plus'

import Upload from '#/components/Upload.vue'

const accessStore = useAccessStore()

const linkStore = useLinkStore()
const uploadRef = ref<UploadInstance>()
const fileList = defineModel<UploadUserFile[]>()

const url = computed(() => {
  return [
    'http://localhost:9600/files',
    `access_token=${accessStore.$state.accessToken}`,
  ].join('?')
})

function submit() {
  linkStore.updateUploadContext({ submit: uploadRef.value!.submit })
  emitter.emit(AppEvent.Link.Submit)
}

onMounted(() => {
  linkStore.resetUploadContext()
})
</script>
<template>
  <ElButtonGroup class="ml-4">
    <ElTooltip
      class="box-item"
      effect="dark"
      placement="top"
      content="上传图片"
    >
      <Upload :url ref="uploadRef" v-model="fileList" />
    </ElTooltip>
    <ElTooltip
      class="box-item"
      effect="dark"
      placement="top"
      content="保存链接"
    >
      <ElButton type="primary" :icon="SaveIcon" @click="submit" />
    </ElTooltip>
    <ElTooltip
      class="box-item"
      effect="dark"
      placement="top"
      content="预览链接"
    >
      <ElButton type="primary" :icon="PreviewEye" />
    </ElTooltip>
  </ElButtonGroup>
</template>
