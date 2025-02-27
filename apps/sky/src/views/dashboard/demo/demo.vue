<script lang="ts" setup>
import Drawer from '#/components/Drawer.vue'

import DrawerForm from './DrawerForm.vue'

const showDrawer = ref(true)

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

const form: any = reactive(merge({}, defaultForm))

function submit() {
  Message({ message: 'submit' })
}

function close(fn: AnyFunction) {
  Message({ message: 'close' })
  fn()
}
</script>

<template>
  <div>
    <div class="p-5">测试抽屉</div>
    <Drawer
      title="测试抽屉"
      v-model="showDrawer"
      @submit="submit"
      @close="close"
    >
      <DrawerForm v-model="form" />
    </Drawer>
  </div>
</template>
