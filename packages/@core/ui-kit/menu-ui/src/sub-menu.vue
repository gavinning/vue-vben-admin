<script setup lang="ts">
import type { MenuRecordRaw } from '@vben-core/typings'

import { computed } from 'vue'

import { MenuBadge, MenuItem, SubMenu as SubMenuComp } from './components'
// eslint-disable-next-line import/no-self-import
import SubMenu from './sub-menu.vue'

interface Props {
  /**
   * 菜单项
   */
  menu: MenuRecordRaw
}

defineOptions({
  name: 'SubMenuUi',
})

const props = withDefaults(defineProps<Props>(), {})

/**
 * 判断是否有子节点，动态渲染 menu-item/sub-menu-item
 */
const hasChildren = computed(() => {
  const { menu } = props
  return Reflect.has(menu, 'children') && !!menu.children && menu.children.length > 0
})

// 子节点===1的情况
const hasOnlyOneChildren = computed(() => {
  const { menu } = props
  return Reflect.has(menu, 'children') && !!menu.children && menu.children.length === 1
})

// 没有子级节点 && 子节点===1的情况
const firstChild = computed(() => props.menu.children?.[0] || props.menu)
</script>

<template>
  <!-- 没有子级节点时，或子节点数量===1时 -->
  <MenuItem
    v-if="!hasChildren || hasOnlyOneChildren"
    :key="firstChild.path"
    :active-icon="firstChild.activeIcon"
    :badge="firstChild.badge"
    :badge-type="firstChild.badgeType"
    :badge-variants="firstChild.badgeVariants"
    :icon="firstChild.icon"
    :path="firstChild.path"
  >
    <template #title>{{ firstChild.name }}</template>
  </MenuItem>
  <SubMenuComp
    v-else
    :key="`${menu.path}_sub`"
    :active-icon="menu.activeIcon"
    :icon="menu.icon"
    :path="menu.path"
  >
    <template #content>
      <MenuBadge
        :badge="menu.badge"
        :badge-type="menu.badgeType"
        :badge-variants="menu.badgeVariants"
        class="right-6"
      />
    </template>
    <template #title>{{ menu.name }}</template>
    <template v-for="childItem in menu.children || []" :key="childItem.path">
      <SubMenu :menu="childItem" />
    </template>
  </SubMenuComp>
</template>
