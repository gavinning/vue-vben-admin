<script lang="ts" setup>
import type { UploadUserFile } from 'element-plus'

import { PreviewEye, SaveIcon } from '@vben/icons'

import { Plus } from '@element-plus/icons-vue'
import { ElButton, ElButtonGroup, ElTooltip, ElUpload } from 'element-plus'

const fileList = defineModel<UploadUserFile[]>()

const submit = () => emitter.emit(AppEvent.Link.Submit)
</script>
<template>
  <ElButtonGroup class="ml-4">
    <ElTooltip
      class="box-item"
      effect="dark"
      placement="top"
      content="上传图片"
    >
      <ElUpload
        class="link-upload-preview"
        action="#"
        multiple
        list-type="picture"
        v-model:file-list="fileList"
        :limit="10"
        :show-file-list="false"
        :auto-upload="false"
      >
        <ElButton type="primary" :icon="Plus" />
      </ElUpload>
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
