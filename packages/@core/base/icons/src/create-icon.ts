import type { IconProps } from '@iconify/vue';

import { defineComponent, h } from 'vue';

import { Icon } from '@iconify/vue';

function createIconifyIcon(icon: string) {
  return defineComponent<Partial<IconProps>>({
    name: `Icon-${icon}`,
    setup(props, { attrs }) {
      // @ts-ignore 类型断言
      return () => h(Icon, { icon, ...props, ...attrs });
    },
  });
}

export { createIconifyIcon };
