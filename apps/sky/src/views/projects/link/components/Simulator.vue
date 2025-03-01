<script lang="ts" setup>
import type { UploadUserFile } from 'element-plus'

import { ElScrollbar } from 'element-plus'

defineProps<{
  safeBottom?: boolean
  safeBottomLarge?: boolean
}>()

const files = defineModel<UploadUserFile[]>()
</script>
<template>
  <ElScrollbar class="app-mod-simulator">
    <ul>
      <li v-for="item in files" :key="item.name">
        <img :src="item.url" :alt="item.name" />
      </li>
    </ul>
    <div
      v-if="safeBottom"
      :class="{ safe_bottom: safeBottom, safe_bottom_large: safeBottomLarge }"
    ></div>
  </ElScrollbar>
</template>
<style lang="stylus" scoped>
.app-mod-simulator
  height 800px
  overflow-y auto
  overflow-x hidden
  background-color var(--el-fill-color-blank)
  border-radius 12px

.safe_bottom
  padding-bottom 90px

  &.safe_bottom_large
    padding-bottom 150px
</style>
