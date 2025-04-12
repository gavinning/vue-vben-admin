<script lang="ts" setup>
import type { GridOptions } from '#/components/Table1'

import { ElButton, ElTag } from 'element-plus'
import { AppEvent, emitter } from 'sky/core'

import { getListBridge } from '#/api/directus'
import { defineGird } from '#/components/Table1'

const columns = [
  { field: 'id', title: 'ID', width: 60 },
  { field: 'app.name', title: '产品' },
  { field: 'amount', title: '金额' },
  { field: 'title', title: '标题' },
  { field: 'source', title: '渠道' },
  {
    field: 'action',
    fixed: 'right',
    slots: { default: 'action' },
    title: '操作',
    width: 80,
  },
]

const options: GridOptions = {
  columns,
  proxyConfig: {
    ajax: {
      query: getListBridge('links'),
    },
  },
}

const router = useRouter()
const [Grid, gridApi] = defineGird(options)

const add = () => emitter.emit(AppEvent.Link.Add)
const edit = (row: App.Link.Row) =>
  router.push({ name: 'LinkEdit', params: { id: row.id } })

// 刷新到第一页
emitter.on(AppEvent.Link.RefreshFirstPage, () => gridApi.reload())
// 刷新当前页
emitter.on(AppEvent.Link.RefreshCurrentPage, () => gridApi.query())
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
