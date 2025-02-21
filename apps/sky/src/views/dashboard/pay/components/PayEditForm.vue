<script lang="ts" setup>
import { reactive } from 'vue'

import {
  ElButton,
  ElCol,
  ElForm,
  ElFormItem,
  ElInput,
  ElOption,
  ElRow,
  ElSelect,
  ElSwitch,
  ElText,
} from 'element-plus'
import clone from 'extend'
import { AppEvent, emitter } from 'sky/core'

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

const form: any = reactive(clone({}, defaultForm))

const typeOptions = [
  {
    value: 'alipay',
    label: '支付宝',
  },
  {
    value: 'wechat',
    label: '微信支付',
  },
  {
    value: 'douyin',
    label: '抖音支付',
  },
]

emitter.on(AppEvent.Pay.Add, () => {
  initForm()
})

emitter.on(AppEvent.Pay.Edit, (data: any) => {
  initForm()
  clone(true, form, data)
})

console.warn('PayEditForm loaded')

const onCancel = () => {
  emitter.emit(AppEvent.Pay.Close)
}

const onSubmit = () => {
  if (form.id) {
    // 发射更新指令
    emitter.emit(AppEvent.Pay.Editing, clone({}, form))
  } else {
    // 发射添加指令
    emitter.emit(AppEvent.Pay.Adding, clone({}, form))
  }
}

function initForm() {
  for (const key in form) {
    form[key] = defaultForm[key]
  }
}
</script>

<template>
  <ElForm :model="form" label-width="auto" style="max-width: 800px">
    <ElRow :gutter="20">
      <ElCol :span="12">
        <div class="grid-content ep-bg-purple"></div>
        <ElFormItem label-position="top" label="名字">
          <ElInput v-model="form.name" />
          <ElText type="info" size="small">给支付起一个名字，方便辨认</ElText>
        </ElFormItem>
      </ElCol>
      <ElCol :span="12">
        <div class="grid-content ep-bg-purple"></div>
        <ElFormItem label-position="top" label="是否启用">
          <ElSwitch
            v-model="form.enabled"
            size="large"
            style="

--el-switch-on-color: #13ce66"
          />
        </ElFormItem>
      </ElCol>
    </ElRow>

    <ElRow :gutter="20">
      <ElCol :span="12">
        <div class="grid-content ep-bg-purple"></div>
        <ElFormItem label-position="top" label="支付帐号">
          <ElInput v-model="form.account" />
          <ElText type="info" size="small">支付帐号备注</ElText>
        </ElFormItem>
      </ElCol>
      <ElCol :span="12">
        <div class="grid-content ep-bg-purple"></div>
        <ElFormItem label-position="top" label="支付类型" required>
          <ElSelect v-model="form.type" placeholder="Select">
            <ElOption
              v-for="item in typeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </ElSelect>
        </ElFormItem>
      </ElCol>
    </ElRow>

    <ElRow :gutter="20">
      <ElCol :span="12">
        <div class="grid-content ep-bg-purple"></div>
        <ElFormItem label-position="top" label="AppID" required>
          <ElInput v-model="form.appId" />
          <ElText type="info" size="small">
            公众号或小程序的appId，全局必须唯一
          </ElText>
        </ElFormItem>
      </ElCol>
      <ElCol :span="12">
        <div class="grid-content ep-bg-purple"></div>
        <ElFormItem label-position="top" label="AppSecret">
          <ElInput v-model="form.appSecret" />
          <ElText type="info" size="small">公众号或小程序的appSecret</ElText>
        </ElFormItem>
      </ElCol>
    </ElRow>

    <ElRow :gutter="20">
      <ElCol :span="12">
        <div class="grid-content ep-bg-purple"></div>
        <ElFormItem label-position="top" label="描述">
          <ElInput v-model="form.desc" />
          <ElText type="info" size="small">支付备注</ElText>
        </ElFormItem>
      </ElCol>
      <ElCol :span="12">
        <div class="grid-content ep-bg-purple"></div>
        <ElFormItem label-position="top" label="商户号">
          <ElInput v-model="form.salt" />
          <ElText type="info" size="small">
            微信支付商户号MCHID，抖音支付SALT
          </ElText>
        </ElFormItem>
      </ElCol>
    </ElRow>

    <ElFormItem label="支付证书" label-position="top">
      <ElInput v-model="form.key" type="textarea" :rows="6" />
      <ElText type="info" size="small">
        微信支付证书CERTIFICATE、支付宝公钥
      </ElText>
    </ElFormItem>
    <ElFormItem label="支付秘钥" label-position="top">
      <ElInput v-model="form.secret" type="textarea" :rows="6" />
      <ElText type="info" size="small">
        微信支付秘钥PRIVATE KEY、支付宝证书秘钥
      </ElText>
    </ElFormItem>

    <ElRow justify="end">
      <ElFormItem align="right">
        <ElButton type="default" @click="onCancel">取消</ElButton>
        <ElButton type="primary" @click="onSubmit">保存</ElButton>
      </ElFormItem>
    </ElRow>
  </ElForm>
</template>
<style lang="stylus" scoped>
.el-switch--large
  height 32px
</style>
