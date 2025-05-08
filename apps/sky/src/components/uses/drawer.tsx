import { defineComponent, ref } from 'vue'

import { Check, Close, InfoFilled } from '@element-plus/icons-vue'
import {
  ElButton,
  ElDrawer,
  DrawerProps as ElDrawerProps,
  ElPopconfirm,
} from 'element-plus'

export interface DrawerProps {
  /**
   * 抽屉标题
   */
  title?: string
  /**
   * 抽屉关闭回调，仅点击关闭按钮时触发
   */
  onClose?: () => void
  /**
   * 抽屉确认回调，点击确认按钮时触发，不会自动关闭抽屉，需手动调用close方法
   */
  onConfirm?: () => void
  /**
   * 抽屉关闭确认，点击关闭按钮时，弹出确认框
   */
  closeConfirm?: boolean
  /**
   * 抽屉关闭确认文本
   */
  closeConfirmText?: string
  /**
   * Element-plus原生Drawer抽屉的属性
   */
  drawerProps?: ElDrawerProps
}

/**
 * 抽屉组件
 * 基于Element-plus原生组件Drawer的封装
 * @returns `{ Drawer, drawerApi }`
 */
export const useDrawer = () => {
  const visible = ref(false)
  const loading = ref(false)
  const container = useTemplateRef<HTMLElement>('drawer-container')

  const drawerApi = {
    open() {
      visible.value = true
    },
    close() {
      visible.value = false
    },
    loading() {
      loading.value = true
    },
    loadingEnd() {
      loading.value = false
    },
    getContainer() {
      return container
    },
  }

  const Drawer = defineComponent<DrawerProps>({
    props: [
      'title',
      'closeConfirm',
      'closeConfirmText',
      'onConfirm',
      'onClose',
      'drawProps',
    ],
    setup(props, { slots }) {
      const closeTag = (action?) => (
        <ElButton circle icon={Close} onClick={action} type="default" />
      )

      const popconfirmTag = () => {
        return (
          <ElPopconfirm
            cancel-button-text="否"
            confirm-button-text="是"
            icon={InfoFilled}
            icon-color="#626AEF"
            onConfirm={onClose}
            title={props.closeConfirmText ?? '内容尚未保存，是否确认关闭？'}
            width="250"
          >
            {{ reference: () => closeTag() }}
          </ElPopconfirm>
        )
      }

      const headerSlot = () => ({
        header: ({ titleId, titleClass }) => (
          <>
            <h4 class={titleClass} id={titleId}>
              {props.title}
            </h4>
            {props.closeConfirm ? popconfirmTag() : closeTag(onClose)}
            <ElButton
              circle
              icon={Check}
              loading={loading.value}
              onClick={props.onConfirm ?? onClose}
              type="primary"
            />
          </>
        ),
      })

      function onClose() {
        drawerApi.close()
        props.onClose?.()
      }

      return () => (
        <ElDrawer
          append-to-body
          class="w-full max-w-[800px] mx-auto"
          ref="drawer-container"
          show-close={false}
          size="100%"
          v-model={visible.value}
          {...props.drawerProps}
        >
          {{ ...slots, ...headerSlot() }}
        </ElDrawer>
      )
    },
  })

  return {
    Drawer,
    drawerApi,
  }
}
