import type { PayApi } from 'sky/api';

import { defineStore } from 'pinia';
import { getPayList } from 'sky/api';

export const usePayStore = defineStore('pay', {
  state: () => ({
    payList: [] as PayApi.PayItem[],
  }),
  actions: {
    async getPayList() {
      this.payList = await getPayList();
    },
  },
});
