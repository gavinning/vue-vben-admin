export {}

// extend
declare global {}

declare global {
  export namespace App {
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
  }
}
