import { Directus } from '@directus/sdk'

export const actor = new Directus(import.meta.env.VITE_GLOB_API_URL, {
  auth: {
    mode: 'cookie',
    msRefreshBeforeExpires: 1000 * 60 * 60 * 24,
  },
})

export const actorItem = (collection: string) => {
  return actor.items(collection)
}
