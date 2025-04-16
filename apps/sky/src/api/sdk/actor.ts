import { Directus } from '@directus/sdk'

import { getHost } from '#/config/host'

export const actor = new Directus(getHost(), {
  auth: {
    mode: 'cookie',
    msRefreshBeforeExpires: 1000 * 60 * 60 * 24,
  },
})

export const actorItem = (collection: string) => {
  return actor.items(collection)
}
