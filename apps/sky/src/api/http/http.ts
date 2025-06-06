import type { ProData, ProMockData } from '../mock/pro'

import { filter } from '#/api/sdk'

import { proMockData } from '../mock/pro'

const isMock = () => import.meta.env.VITE_API_MOCK === 'true'

export const http = {
  async pro(): Promise<ProData | undefined> {
    const data: ProMockData = isMock()
      ? proMockData
      : ((await actor
          .items('configs')
          .readByQuery(filter({ name: 'pro' }))) as ProMockData)
    return data.data[0]?.map
  },
}
