<script lang="ts" setup>
import type {
  UploadFile,
  UploadFiles,
  UploadInstance,
  UploadProgressEvent,
  UploadRawFile,
  UploadStatus,
  UploadUserFile,
} from 'element-plus'

import { Plus } from '@element-plus/icons-vue'
import { ElButton, ElUpload } from 'element-plus'

withDefaults(
  defineProps<{
    accept?: string
    limit?: number
    maxSize?: number
    onChange?: (file: UploadFile, files: UploadFiles) => void
    onError?: (error: Error, file: UploadFile, files: UploadFiles) => void

    onProgress?: (
      evt: UploadProgressEvent,
      file: UploadFile,
      files: UploadFiles,
    ) => void
    onSuccess?: (response: any, file: UploadFile, files: UploadFiles) => void
    showProgress?: boolean
    url: string // 需要携带token

    // onPreview?: (file: UploadFile) => void
    // onRemove?: (file: UploadFile, files: UploadFiles) => void
    // onExceed?: (files: File[], uploadFiles: UploadUserFile[]) => void

    // beforeUpload?: (file: UploadRawFile) => boolean | Promise<boolean>
    // beforeRemove?: (file: UploadFile, files: UploadFiles) => boolean | Promise<boolean>
  }>(),
  {
    limit: 10,
    maxSize: 10 * 1024 * 1024,
    accept: 'image/png, image/jpeg, image/jpg, image/webp',

    onError: (error: Error, file: UploadFile, files: UploadFiles) => {
      console.error('onError', error, file, files)
      Notice.error({ message: error.message })
    },

    onChange: (file: UploadFile, files: UploadFiles) => {
      // eslint-disable-next-line no-console
      console.log('onChange', file, files)
    },

    onSuccess: (response: any, file: UploadFile, files: UploadFiles) => {
      // eslint-disable-next-line no-console
      console.log('onSuccess', response.data, file, files)
      Message.success(`onSuccess: ${file.name} 上传成功`)
    },

    onProgress: (
      evt: UploadProgressEvent,
      file: UploadFile,
      files: UploadFiles,
    ) => {
      // eslint-disable-next-line no-console
      console.log('onProgress', evt.percent, file.name)
      if (evt.percent === 100) {
        Message.success(`onProgress: ${file.name} 上传成功`)
        // eslint-disable-next-line no-console
        console.log(evt, file, files)
      }
    },
  },
)
const dom = useTemplateRef<UploadInstance>('dom')
const fileList = defineModel<UploadUserFile[]>()

defineExpose({
  abort: (file: UploadFile) => dom.value?.abort(file),
  submit: () => dom.value?.submit(),
  clearFiles: (status?: UploadStatus[]) => dom.value?.clearFiles(status),
  handleStart: (rawFile: UploadRawFile) => dom.value?.handleStart(rawFile),
  handleRemove: (file: UploadFile | UploadRawFile, rawFile?: UploadRawFile) =>
    dom.value?.handleRemove(file, rawFile),
})
</script>

<template>
  <ElUpload
    ref="dom"
    class="link-upload-preview"
    list-type="picture"
    v-model:file-list="fileList"
    :limit
    :accept
    :action="url"
    :auto-upload="false"
    :show-file-list="false"
    :multiple="true"
    :on-error
    :on-change
    :on-success
    :on-progress
  >
    <slot><ElButton type="primary" :icon="Plus" /></slot>
  </ElUpload>
</template>
<style lang="stylus" scoped>
.link-upload-preview
  float left
  display inline-block

  .el-upload-list__item
    margin 0
    padding 0
    border none
    border-radius 0

  .el-upload .el-button
    border-right 0
    border-top-right-radius 0
    border-bottom-right-radius 0
</style>
