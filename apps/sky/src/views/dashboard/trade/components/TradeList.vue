<script lang="ts" setup>
import type { GridOptions } from '#/components/Table'

import { ElButton, ElTag } from 'element-plus'
import { AppEvent, emitter } from 'sky/core'

import { getDirectusListBridge } from '#/api/directus'
import { defineGird } from '#/components/Table'

const columns = [
  { title: '序号', type: 'seq', width: 50 },
  { field: 'tradeid', title: '订单号', width: 260 },
  { field: 'app.name', title: '产品' },
  { field: 'amount', title: '金额' },
  // { field: 'from', title: '渠道' },
  { field: 'lbs', title: '位置' },
  { field: 'status', title: '状态', slots: { default: 'status' } },
  { field: 'date_created', formatter: 'formatDateTime', title: '创建时间' },
  {
    field: 'action',
    fixed: 'right',
    slots: { default: 'action' },
    title: '退款',
    width: 120,
  },
]

const options: GridOptions = {
  columns,
  proxyConfig: {
    ajax: {
      query: getDirectusListBridge,
    },
  },
}

const [Grid] = defineGird(options)

const refund = (row: App.Trade.Row) => emitter.emit(AppEvent.Trade.Refund, row)
</script>

<template>
  <Grid>
    <template v-for="item in $slots" :key="item">
      <slot :name="item"></slot>
    </template>

    <template #action="{ row }">
      <ElButton disabled :link="true" type="danger" plain @click="refund(row)">
        退款
      </ElButton>
    </template>
    <template #status="{ row }">
      <ElTag type="success" v-if="row.status === 2">有效</ElTag>
      <ElTag type="info" v-else>无效</ElTag>
    </template>
  </Grid>
</template>
