<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue'

import { Close } from '@element-plus/icons-vue'
import { ElButton, ElDrawer } from 'element-plus'
import { AppEvent, emitter } from 'sky/core'

import { usePayStore } from '#/store/pay'

import PayEditForm from './PayEditForm.vue'

const payStore = usePayStore()

// 预加载
// 预加载注册表单的监听事件
// 防止抽屉后加载的时候错过事件
const visible = ref(true)

// Add or Edit
const isEdit = ref(false)

const title = computed(() => (isEdit.value ? '编辑支付' : '添加支付'))

onMounted(() => {
  // 隐藏抽屉
  visible.value = false
})

// 开始添加事件
emitter.on(AppEvent.Pay.Add, () => {
  isEdit.value = false
  visible.value = true
})

// 开始更新事件
emitter.on(AppEvent.Pay.Edit, () => {
  isEdit.value = true
  visible.value = true
})

// 执行添加指令
emitter.on(AppEvent.Pay.Adding, (data: any) => {
  payStore.addPayItem(data).then(() => {
    visible.value = false
  })
})

// 执行更新指令
emitter.on(AppEvent.Pay.Editing, (data: any) => {
  payStore.updatePayItem(data).then(() => {
    visible.value = false
  })
})

// 关闭操作面板
emitter.on(AppEvent.Pay.Close, () => {
  visible.value = false
})
</script>

<template>
  <!-- <el-button @click="visible = true">{{ title }}</el-button> -->
  <ElDrawer v-model="visible" :show-close="false" size="800" append-to-body>
    <template #header="{ close, titleId, titleClass }">
      <h4 :id="titleId" :class="titleClass">{{ title }}</h4>
      <ElButton type="default" @click="close" :icon="Close" circle />
      <!-- <el-button type="success" :icon="Check" circle /> -->
    </template>
    <KeepAlive>
      <PayEditForm />
    </KeepAlive>
  </ElDrawer>
</template>
