<script lang="ts" setup>
import type { VxeGridProps } from '#/adapter/vxe-table'

import { ElButton, ElTag } from 'element-plus'
import { AppEvent, emitter } from 'sky/core'

import { useVbenVxeGrid } from '#/adapter/vxe-table'
import { getPayList } from '#/api'

async function getPayListBridge(params: any) {
  const data = await getPayList(params)
  return {
    items: data,
    total: data.length,
  }
}

const gridOptions: VxeGridProps<App.Pay.Row> = {
  checkboxConfig: {
    highlight: true,
    labelField: 'name',
  },
  columns: [
    { title: '序号', type: 'seq', width: 50 },
    { field: 'name', title: '名字' },
    { field: 'type', title: '支付类型' },
    { field: 'account', title: '帐号' },
    { field: 'appId', title: 'APPID' },
    { field: 'salt', title: '商户号' },
    { field: 'enabled', title: '状态', slots: { default: 'enabled' } },
    // { field: 'date_created', formatter: 'formatDateTime', title: '创建时间' },
    { field: 'date_updated', formatter: 'formatDateTime', title: '更新时间' },
    {
      field: 'action',
      fixed: 'right',
      slots: { default: 'action' },
      title: '操作',
      width: 120,
    },
  ],
  exportConfig: {},
  // height: 'auto', // 如果设置为 auto，则必须确保存在父节点且不允许存在相邻元素，否则会出现高度闪动问题
  keepSource: true,
  proxyConfig: {
    ajax: {
      query: ({ page }) => getPayListBridge(page),
    },
  },
  toolbarConfig: {
    custom: true,
    export: false,
    import: false,
    refresh: true,
    zoom: true,
  },
}

const [Grid] = useVbenVxeGrid({ gridOptions })

function add() {
  emitter.emit(AppEvent.Pay.Add)
}

function edit(row: App.Pay.Row) {
  emitter.emit(AppEvent.Pay.Edit, row)
}
</script>

<template>
  <div class="vp-raw w-full">
    <Grid>
      <template #toolbar-tools>
        <ElButton class="mr-2" type="primary" @click="add">新增</ElButton>
      </template>
      <template #enabled="{ row }">
        <ElTag type="success" v-if="row.enabled">启用</ElTag>
        <ElTag type="danger" v-else>禁用</ElTag>
      </template>
      <template #action="{ row }">
        <ElButton :link="true" type="primary" plain @click="edit(row)">
          编辑
        </ElButton>
      </template>
    </Grid>
  </div>
</template>
