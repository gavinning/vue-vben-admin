import { hasIdOnly } from '#/helper'

import { getValidator, ValidatorKey } from './validator_config'
import { registerInterceptor } from './interceptor/actorItem'

class Table<R extends Item> {
  public readonly api: ReturnType<typeof actorItem>
  public readonly validator: Partial<ReturnType<typeof getValidator>> &
    Record<string, any>
  public readonly interceptor: ReturnType<typeof registerInterceptor>

  constructor(public readonly collection: string) {
    this.collection = collection
    this.api = actorItem(collection)
    this.validator = getValidator(collection as ValidatorKey)
    this.interceptor = registerInterceptor(collection)
  }

  static init(collection: string) {
    return new Table(collection)
  }

  async add(row: R) {
    row = (await this.interceptor(row)) as R
    this.checkValidator()
    this.validator.add?.parse(row)
    return this.api.createOne<R>(row)
  }

  async remove(row: R) {
    this.checkValidator()
    this.validator.remove?.parse(row)
    return this.api.deleteOne(row.id)
  }

  async update(row: R) {
    if (hasIdOnly(row)) return
    row = (await this.interceptor(row)) as R
    this.checkValidator()
    this.validator.update?.parse(row)
    return this.api.updateOne(row.id, row)
  }

  private checkValidator() {
    if (!this.validator) {
      throw new Error(
        `No validator for ${this.collection}, api/sdk/validator_config.ts`,
      )
    }
  }
}

/**
 * 附带校验功能的接口操作类
 * @param collection collection name
 * @returns sdk
 */
export const actorItem2 = (collection: string) => Table.init(collection)
