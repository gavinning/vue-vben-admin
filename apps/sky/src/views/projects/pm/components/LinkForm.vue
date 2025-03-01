<script lang="ts" setup>
import {
  ElCol,
  ElForm,
  ElFormItem,
  ElInput,
  ElRow,
  ElSwitch,
  ElText,
} from 'element-plus'

const modelValue = defineModel<any>()
</script>

<template>
  <ElForm :model="modelValue" label-width="auto">
    <ElRow :gutter="20">
      <ElCol :span="12">
        <div class="grid-content ep-bg-purple"></div>
        <ElFormItem label-position="top" label="产品">
          <ElInput disabled :value="modelValue.app?.name" />
          <!-- <ElText type="info" size="small">给支付起一个名字，方便辨认</ElText> -->
        </ElFormItem>
      </ElCol>
      <ElCol :span="12">
        <div class="grid-content ep-bg-purple"></div>
        <ElFormItem label-position="top" label="链接ID">
          <ElInput disabled :value="modelValue.id" />
          <!-- <ElText type="info" size="small">支付帐号备注</ElText> -->
        </ElFormItem>
      </ElCol>
    </ElRow>

    <ElRow :gutter="20">
      <ElCol :span="12">
        <div class="grid-content ep-bg-purple"></div>
      </ElCol>
      <ElCol :span="12">
        <div class="grid-content ep-bg-purple"></div>
      </ElCol>
    </ElRow>

    <ElFormItem label-position="top" label="标题">
      <ElInput v-model="modelValue.desc" />
      <ElText type="info" size="small">发货时显示标题</ElText>
    </ElFormItem>

    <ElRow :gutter="20">
      <ElCol :span="12">
        <div class="grid-content ep-bg-purple"></div>
        <ElFormItem label-position="top" label="链接定价" required>
          <ElInput v-model="modelValue.amount" />
          <ElText type="info" size="small">
            用户购买时需要支付的金额，建议不低于¥20
          </ElText>
        </ElFormItem>
      </ElCol>
      <ElCol :span="12">
        <div class="grid-content ep-bg-purple"></div>
        <ElFormItem label-position="top" label="推广渠道">
          <ElInput
            v-model="modelValue.appSecret"
            placeholder="渠道统计，如抖音、快手"
          />
          <ElText type="info" size="small">统计不同渠道的订单数据</ElText>
        </ElFormItem>
      </ElCol>
    </ElRow>

    <ElRow :gutter="20">
      <ElCol :span="12">
        <div class="grid-content ep-bg-purple"></div>
        <ElFormItem label-position="top" label="按钮文案">
          <ElInput
            v-model="modelValue.button"
            :placeholder="modelValue.btnPlaceholder"
          />
          <ElText type="info" size="small">主按钮文案</ElText>
        </ElFormItem>
      </ElCol>
      <ElCol :span="12">
        <div class="grid-content ep-bg-purple"></div>
        <ElFormItem
          label-position="top"
          label="按钮安全距离"
          style="display: block"
        >
          <ElSwitch
            v-model="modelValue.safeBottom"
            size="large"
            style="

--el-switch-on-color: #13ce66"
          />
          <ElText type="info" size="small">
            按钮底部安全距离，不遮挡图片内容
          </ElText>
        </ElFormItem>
      </ElCol>
    </ElRow>

    <ElRow :gutter="20">
      <ElCol :span="12">
        <div class="grid-content ep-bg-purple"></div>
        <ElFormItem label-position="top" label="关联链接">
          <ElInput v-model="modelValue.otherLink" />
          <ElText type="info" size="small">
            在页面关联另外一个链接，填写要关联的链接ID
          </ElText>
        </ElFormItem>
      </ElCol>
      <ElCol :span="12">
        <div class="grid-content ep-bg-purple"></div>
        <ElFormItem label-position="top" label="第二按钮">
          <ElInput
            v-model="modelValue.linkButton"
            :placeholder="modelValue.btnPlaceholder"
          />
          <ElText type="info" size="small">副按钮文案</ElText>
        </ElFormItem>
      </ElCol>
    </ElRow>
    <!--
    <ElFormItem label-position="top" label="描述">
      <ElInput v-model="modelValue.desc" />
      <ElText type="info" size="small">支付备注</ElText>
    </ElFormItem>
 -->
    <ElFormItem label="发货内容" label-position="top">
      <ElInput v-model="modelValue.resource" type="textarea" :rows="6" />
      <ElText type="info" size="small">用户支付后可见的发货内容</ElText>
    </ElFormItem>
  </ElForm>
</template>
<style lang="stylus" scoped>
.el-form
  max-width 1024px

.el-switch--large
  height 32px

.el-text--info
  padding 2px 0 0 4px

.el-switch--large
  width 100%
  height 32px
</style>
