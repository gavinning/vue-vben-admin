import type { ProItem } from '#/api'

import { CheckCircleOutline, CloseCircleOutline } from '@vben/icons'

import { ElButton } from 'element-plus'

export interface CardProps {
  data: ProItem
}

export const Card = defineComponent<CardProps>({
  props: ['data'],
  setup(props: CardProps) {
    const data = props.data

    const Item = (item: string) => {
      const [check, desc] = item.split('-')
      const disabled = Number(check) === 0
      return (
        <li class="py-1 flex items-center gap-1">
          {disabled ? (
            <CloseCircleOutline color="#f44336" />
          ) : (
            <CheckCircleOutline color="#4caf50" />
          )}
          <span class="text-sm text-gray-500">{desc}</span>
        </li>
      )
    }

    return () => (
      <section class="v-card rounded-md border border-gray-300 p-4 shadow-md dark:border-gray-600">
        <header class="v-card__title border-b border-gray-200 dark:border-gray-800">
          <h2 class="text-lg pb-1">{data.title}</h2>
          <p class="text-sm pb-5 text-gray-500">{data.desc}</p>
        </header>
        <main class="v-card__content py-5">
          <ul>
            <li class="flex items-end gap-2 pb-5">
              <span class="text-2xl">{data.price}</span>
              <span class="text-sm text-gray-500 line-through">
                /{data.origin}
              </span>
              <span class="text-sm text-gray-500">/一次性付款</span>
            </li>
            {data.list?.map((item) => Item(item))}
          </ul>
        </main>
        <footer class="v-card__actions border-t border-gray-200 dark:border-gray-800 pt-5 pb-1">
          <ElButton
            class="w-full"
            style="padding: 1.1rem 0.5rem;"
            type="primary"
          >
            立即升级
          </ElButton>
        </footer>
      </section>
    )
  },
})
