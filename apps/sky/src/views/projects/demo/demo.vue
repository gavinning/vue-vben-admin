<script lang="ts" setup>
import { ElButton as Button } from 'element-plus'

import Drawer from '#/components/Drawer.vue'
import { useDemo } from '#/components/useDemo'

import DrawerForm from './DrawerForm.vue'

const { Demo, changeText } = useDemo()

const aaa = ref('aaaa')

const bbb = () => {
  aaa.value = `bbbb${Math.random()}`
  changeText()
}

const showDrawer = ref(false)

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
    <Demo :prefix="aaa" />
    <Button @click="bbb">打开抽屉</Button>
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
