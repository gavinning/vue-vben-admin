<script lang="ts" setup>
import type { GridOptions } from '#/components/Table1'

import { ElButton, ElTag } from 'element-plus'
import { AppEvent, emitter } from 'sky/core'

import { getListBridge } from '#/api/directus'
import { defineGird } from '#/components/Table1'

const columns = [
  { title: '序号', type: 'seq', width: 50 },
  { field: 'name', title: '名字' },
  { field: 'type', title: '支付类型' },
  { field: 'account', title: '帐号' },
  { field: 'appId', title: 'APPID' },
  { field: 'salt', title: '商户号' },
  { field: 'enabled', title: '状态', slots: { default: 'enabled' } },
  { field: 'date_updated', formatter: 'formatDateTime', title: '更新时间' },
  {
    field: 'action',
    fixed: 'right',
    slots: { default: 'action' },
    title: '操作',
    width: 120,
  },
]

const options: GridOptions = {
  columns,
  proxyConfig: {
    ajax: {
      query: getListBridge('pays'),
    },
  },
}

const [Grid, gridApi] = defineGird(options)

const add = () => emitter.emit(AppEvent.Pay.Add)
const edit = (row: App.Pay.Row) => emitter.emit(AppEvent.Pay.Edit, row)

// 刷新到第一页
emitter.on(AppEvent.Pay.RefreshFirstPage, () => gridApi.reload())
// 刷新当前页
emitter.on(AppEvent.Pay.RefreshCurrentPage, () => gridApi.query())
</script>

<template>
  <Grid>
    <template v-for="item in $slots" :key="item">
      <slot :name="item"></slot>
    </template>
    <template v-if="add" #toolbar-tools>
      <ElButton class="mr-2" type="primary" @click="add">新增</ElButton>
    </template>
    <template v-if="edit" #action="{ row }">
      <ElButton :link="true" type="primary" plain @click="edit(row)">
        编辑
      </ElButton>
    </template>
    <template #enabled="{ row }">
      <ElTag type="success" v-if="row.enabled">启用</ElTag>
      <ElTag type="danger" v-else>禁用</ElTag>
    </template>
  </Grid>
</template>
