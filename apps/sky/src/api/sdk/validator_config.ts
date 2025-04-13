import { z } from 'zod'

const remove = z.object({ id: z.number().or(z.string()) })

export const validator = {
  pays: {
    add: z.object({
      appId: z.string(),
      type: z.string(),
    }),
    remove,
  },

  trades: {
    add: z.object({
      appId: z.string(),
      type: z.string(),
    }),
    remove,
  },
}

export type ValidatorKey = keyof typeof validator

export const getValidator = (path: ValidatorKey) => {
  return validator[path]
}
