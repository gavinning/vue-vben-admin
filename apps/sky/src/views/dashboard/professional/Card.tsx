import { CheckCircleOutline, CloseCircleOutline } from '@vben/icons'

import { ElButton } from 'element-plus'

export const Card = defineComponent({
  setup() {
    return () => (
      <section class="v-card rounded-md border border-gray-300 p-4 shadow-md dark:border-gray-600">
        <header class="v-card__title border-b border-gray-200 dark:border-gray-800">
          <h2 class="text-lg pb-1">初级代理</h2>
          <p class="text-sm pb-5 text-gray-500">适用于新手入门学习使用</p>
        </header>
        <main class="v-card__content py-5">
          <ul>
            <li class="flex items-end gap-2 pb-5">
              <span class="text-2xl">￥39.9</span>
              <span class="text-sm text-gray-500">/一次性付款</span>
            </li>
            <li class="py-1 flex items-center gap-1">
              <CheckCircleOutline color="#4caf50" />
              <span class="text-sm text-gray-500">初级项目授权</span>
            </li>
            <li class="py-1 flex items-center gap-1">
              <CloseCircleOutline color="#f44336" />
              <span class="text-sm text-gray-500">初级项目授权</span>
            </li>
            <li class="py-1 flex items-center gap-1">
              <CheckCircleOutline color="#4caf50" />
              <span class="text-sm text-gray-500">初级项目授权</span>
            </li>
            <li class="py-1 flex items-center gap-1">
              <CheckCircleOutline color="#4caf50" />
              <span class="text-sm text-gray-500">初级项目授权</span>
            </li>
            <li class="py-1 flex items-center gap-1">
              <CheckCircleOutline color="#4caf50" />
              <span class="text-sm text-gray-500">初级项目授权</span>
            </li>
            <li class="py-1 flex items-center gap-1">
              <CheckCircleOutline color="#4caf50" />
              <span class="text-sm text-gray-500">初级项目授权</span>
            </li>
          </ul>
        </main>
        <footer class="v-card__actions border-t border-gray-200 dark:border-gray-800 pt-5 pb-1">
          <ElButton
            class="w-full"
            style="padding: 1.1rem 0.5rem;"
            type="primary"
          >
            立即购买
          </ElButton>
        </footer>
      </section>
    )
  },
})
