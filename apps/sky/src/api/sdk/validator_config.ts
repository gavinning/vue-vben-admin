import { z } from 'zod'

const remove = z.object({ id: z.number().or(z.string()) })

export const validator = {
  all: {
    remove,
  },

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

  links: {
    add: z.object({
      app: z.number().or(z.string()),
      amount: z.string(),
    }),
  },
}

export type ValidatorKey = keyof typeof validator

export const getValidator = (path: ValidatorKey) => {
  return validator[path] ?? validator.all
}
