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
    <div v-if="safeBottom" :class="{ safeBottom, safeBottomLarge }"></div>
  </ElScrollbar>
</template>
<style lang="stylus" scoped>
.app-mod-simulator
  height 800px
  overflow-y auto
  overflow-x hidden
  background-color var(--el-fill-color-blank)
  border-radius 12px

.safeBottom
  padding-bottom 90px

  &.safeBottomLarge
    padding-bottom 150px
</style>
