<script lang="ts" setup>
import type { UploadUserFile } from 'element-plus'

import { ElButton, ElText } from 'element-plus'

import BtnGroup from './BtnGroup.vue'
import Simulator from './Simulator.vue'

const model = defineModel<any>()
const fileList = ref<UploadUserFile[]>([])
</script>
<template>
  <div class="app-mod-preview ap">
    <div class="flex">
      <header>
        <ElText class="mx-1" size="large" type="primary" tag="h2">
          商品页预览
        </ElText>
        <ElText class="mx-1" size="small" type="info" tag="p">
          拖动图片可以排序
        </ElText>
      </header>
      <BtnGroup v-model="fileList" />
    </div>
    <Simulator
      class="mt-4"
      v-model="fileList"
      :safe-bottom="model.safe_bottom"
      :safe-bottom-large="model.other_link ? true : false"
    />
    <div class="ap-fixed">
      <ElButton type="primary" size="large" block>
        {{ model.button || model.btn_placeholder }}
      </ElButton>
      <ElButton v-if="model.other_link" type="primary" size="large" block>
        {{ model.other_link_button || model.btn_placeholder }}
      </ElButton>
    </div>
  </div>
</template>
<style lang="stylus">
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
<style lang="stylus" scoped>
.flex
  justify-content space-between

.ap
  position relative
  box-sizing content-box

.ap-fixed
  width 100%
  position absolute
  bottom 6px
  padding 20px

button[block]
  width 100%
  display block
  margin-left 0

  +button[block]
    margin-top 20px
</style>
