import { autoTap } from 'tap'

import { IFormContext } from './type'

export function beforeFormSubmit(ctx: IFormContext) {
  return autoTap(ctx, import.meta.glob('./interceptors/*.ts', { eager: true }))
}
