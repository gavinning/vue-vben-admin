<script lang="ts" setup>
import { AppEvent, emitter } from 'sky/core'

import Drawer from '#/components/Drawer.vue'
import { deepCopy } from '#/helper/app'
import { usePayStore } from '#/store/pay'

import EditForm from './PayEditForm.vue'

const payStore = usePayStore()

const showDrawer = ref(false)

// Add or Edit
const isEdit = ref(false)

// 关闭表单时，是否显示确认关闭
const closeConfirm = ref(false)

const title = computed(() => (isEdit.value ? '编辑支付' : '添加支付'))

const defaultForm: any = {
  name: '',
  enabled: false,
  account: '',
  type: '',
  appId: '',
  appSecret: '',
  desc: '',
  salt: '',
  key: '',
  secret: '',
}

const form: any = reactive(Object.assign({}, defaultForm))

// 开始添加事件
emitter.on(AppEvent.Pay.Add, () => {
  isEdit.value = false
  showDrawer.value = true
  // 仅在添加时，显示关闭确认
  closeConfirm.value = true
  deepCopy(form, defaultForm)
})

// 开始更新事件
emitter.on(AppEvent.Pay.Edit, (data: any) => {
  isEdit.value = true
  showDrawer.value = true
  closeConfirm.value = false
  deepCopy(form, data)
})

function add() {
  payStore.add(form).then(() => {
    showDrawer.value = false
    emitter.emit(AppEvent.Pay.RefreshFirstPage)
  })
}

function edit() {
  payStore.update(form).then(() => {
    showDrawer.value = false
    emitter.emit(AppEvent.Pay.RefreshCurrentPage)
  })
}

function submit() {
  isEdit.value ? edit() : add()
}
</script>

<template>
  <Drawer :title="title" v-model="showDrawer" :close-confirm @submit="submit">
    <EditForm v-model="form" />
  </Drawer>
</template>
