<script lang="ts" setup>
import { ElAffix, ElContainer, ElMain } from 'element-plus'

import Form from './LinkForm.vue'
import Preview from './Preview.vue'

const form = reactive<any>({
  btnPlaceholder: '立即加入',
})
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
