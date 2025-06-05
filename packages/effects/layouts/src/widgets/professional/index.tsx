import { RouterLink } from 'vue-router';

import { ProfessionalIcon } from '@vben/icons';
import { preferences } from '@vben/preferences';

import { VbenIconButton } from '@vben-core/shadcn-ui';

// 自定义：专业版功能入口
export const Professional = () => {
  return (
    <VbenIconButton class="my-0 mr-1 rounded-full">
      <RouterLink to={preferences.widget.professional}>
        <ProfessionalIcon class="size-5" />
      </RouterLink>
    </VbenIconButton>
  );
};
