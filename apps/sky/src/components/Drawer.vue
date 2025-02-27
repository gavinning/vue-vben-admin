<script lang="ts" setup>
import { Check, Close, InfoFilled } from '@element-plus/icons-vue'
import { ElButton, ElDrawer, ElPopconfirm } from 'element-plus'

const props = withDefaults(
  defineProps<{
    closeConfirm?: boolean
    closeConfirmText?: string
    modelValue: boolean
    title: string
  }>(),
  {
    closeConfirmText: '内容尚未保存，是否确认关闭？',
  },
)

const emit = defineEmits(['update:modelValue', 'submit', 'close'])

// 使用 computed 实现双向绑定
// props 是只读的，直接传递 modelValue 会导致子组件无法修改它
// 使用 computed 将 modelValue 转换为可写的代理属性，并通过 v-model 传递给子组件
const modelValueProxy = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  },
})
</script>

<template>
  <ElDrawer
    v-model="modelValueProxy"
    :show-close="false"
    size="800"
    append-to-body
  >
    <template #header="{ close, titleId, titleClass }">
      <h4 :id="titleId" :class="titleClass">{{ title }}</h4>
      <ElPopconfirm
        v-if="closeConfirm"
        confirm-button-text="是"
        cancel-button-text="否"
        :icon="InfoFilled"
        icon-color="#626AEF"
        :title="closeConfirmText"
        @confirm="
          () => {
            close()
            emit('close')
          }
        "
        width="250"
      >
        <template #reference>
          <ElButton type="default" :icon="Close" circle />
        </template>
      </ElPopconfirm>
      <ElButton v-else type="default" @click="close" :icon="Close" circle />
      <ElButton type="primary" :icon="Check" circle @click="$emit('submit')" />
    </template>
    <slot></slot>
  </ElDrawer>
</template>
