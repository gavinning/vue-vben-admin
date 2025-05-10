import { autoTap } from 'tap'
import { IFormContext } from './type'

export function beforeFormEdit(ctx: IFormContext) {
  return autoTap(ctx, import.meta.glob('./interceptors/*.ts', { eager: true }))
}
