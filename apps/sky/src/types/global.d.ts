export {}

// extend
declare global {}

// 基础常用扩展
declare global {
  export type ID = number | string
  export type Item = Record<string, any>
  export type AnyFunction<T = any> = (...args: any[]) => T
  export type AnyVoidFunction = AnyFunction<void>
  export type AnyAsyncFunction<T = any> = (...args: any[]) => Promise<T>
  export type AnyConstructor<T = any> = new (...args: any[]) => T
  export type ClassConstructor<T> = {
    new (...args: any[]): T
  }
}

declare global {
  export namespace App {
    export namespace App {
      export interface Row {
        id: ID
        name: string
        remote_code: string
      }
    }

    export namespace Pay {
      export interface Row {
        id?: number
        name: string
        type: string
        enabled: boolean
        account?: string
        appId: string
        appSecret?: string
        salt?: string
        desc?: string
        key?: string
        secret?: string
        channel?: number
        date_created?: string
        date_updated?: string
      }
    }

    export namespace Trade {
      export interface Row {
        id?: ID
        tradeid: string
        status: number
      }
    }

    export namespace Link {
      export interface Row {
        id?: ID
        app: any
        title: string
        product?: any
        amount: string
        from?: string
        source?: string
        config?: Item
        button?: string
        type?: string
        resource?: string
        other_link?: string
        btn_placeholder?: string
        date_created?: string
        date_updated?: string
      }
    }
  }
}
