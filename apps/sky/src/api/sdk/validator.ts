import { getValidator, ValidatorKey } from './validator_config'

class Table<R extends Item> {
  public readonly api: ReturnType<typeof actorItem>
  public readonly validator: Partial<ReturnType<typeof getValidator>> &
    Record<string, any>

  constructor(public readonly collection: string) {
    this.collection = collection
    this.api = actorItem(collection)
    this.validator = getValidator(collection as ValidatorKey)
  }

  static init(collection: string) {
    return new Table(collection)
  }

  async add(row: R) {
    try {
      this.validator.add?.parse(row)
      const data = await this.api.createOne<R>(row)
      Message.success(`添加成功`)
      return data
    } catch (error) {
      catchError(error)
    }
  }

  async remove(row: R) {
    this.validator.remove?.parse(row)
    return this.api.deleteOne(row.id)
  }

  async update(row: R) {
    this.validator.update?.parse(row)
    return this.api.updateOne(row.id, row)
  }
}

/**
 * 附带校验功能的接口操作类
 * @param collection collection name
 * @returns sdk
 */
export const actorItem2 = (collection: string) => Table.init(collection)
