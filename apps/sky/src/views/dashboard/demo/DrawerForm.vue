<script lang="ts" setup>
import {
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

// defineProps(['modelValue'])
// defineEmits(['update:modelValue'])

const model = defineModel<any>()

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
</script>

<template>
  <ElForm :model="model" label-width="auto" style="max-width: 800px">
    <ElRow :gutter="20">
      <ElCol :span="12">
        <div class="grid-content ep-bg-purple"></div>
        <ElFormItem label-position="top" label="名字">
          <ElInput v-model="model.name" />
          <ElText type="info" size="small">给支付起一个名字，方便辨认</ElText>
        </ElFormItem>
      </ElCol>
      <ElCol :span="12">
        <div class="grid-content ep-bg-purple"></div>
        <ElFormItem label-position="top" label="是否启用">
          <ElSwitch
            v-model="model.enabled"
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
          <ElInput v-model="model.account" />
          <ElText type="info" size="small">支付帐号备注</ElText>
        </ElFormItem>
      </ElCol>
      <ElCol :span="12">
        <div class="grid-content ep-bg-purple"></div>
        <ElFormItem label-position="top" label="支付类型" required>
          <ElSelect v-model="model.type" placeholder="Select">
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
          <ElInput v-model="model.appId" />
          <ElText type="info" size="small">
            公众号或小程序的appId，全局必须唯一
          </ElText>
        </ElFormItem>
      </ElCol>
      <ElCol :span="12">
        <div class="grid-content ep-bg-purple"></div>
        <ElFormItem label-position="top" label="AppSecret">
          <ElInput v-model="model.appSecret" />
          <ElText type="info" size="small">公众号或小程序的appSecret</ElText>
        </ElFormItem>
      </ElCol>
    </ElRow>

    <ElRow :gutter="20">
      <ElCol :span="12">
        <div class="grid-content ep-bg-purple"></div>
        <ElFormItem label-position="top" label="描述">
          <ElInput v-model="model.desc" />
          <ElText type="info" size="small">支付备注</ElText>
        </ElFormItem>
      </ElCol>
      <ElCol :span="12">
        <div class="grid-content ep-bg-purple"></div>
        <ElFormItem label-position="top" label="商户号">
          <ElInput v-model="model.salt" />
          <ElText type="info" size="small">
            微信支付商户号MCHID，抖音支付SALT
          </ElText>
        </ElFormItem>
      </ElCol>
    </ElRow>

    <ElFormItem label="支付证书" label-position="top">
      <ElInput v-model="model.key" type="textarea" :rows="6" />
      <ElText type="info" size="small">
        微信支付证书CERTIFICATE、支付宝公钥
      </ElText>
    </ElFormItem>
    <ElFormItem label="支付秘钥" label-position="top">
      <ElInput v-model="model.secret" type="textarea" :rows="6" />
      <ElText type="info" size="small">
        微信支付秘钥PRIVATE KEY、支付宝证书秘钥
      </ElText>
    </ElFormItem>
  </ElForm>
</template>
<style lang="stylus" scoped>
.el-switch--large
  height 32px
</style>
