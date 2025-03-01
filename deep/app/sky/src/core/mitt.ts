import mitt from 'mitt'

export const emitter = mitt()

export namespace AppEvent {
  export enum Auth {
    Login = 'Auth.Login',
    Logout = 'Auth.Logout',
  }

  /** 支付事件 */
  export enum Pay {
    Add = 'Pay.Add',
    // 关闭操作面板
    Close = 'Pay.Close',

    Edit = 'Pay.Edit',

    // 刷新当前页
    RefreshCurrentPage = 'Pay.RefreshCurrentPage',

    // 刷新并跳转到第一页
    RefreshFirstPage = 'Pay.RefreshFirstPage',
  }

  /** 订单事件 */
  export enum Trade {
    Refund = 'Trade.Refund',
    Refunding = 'Trade.Refunding',
  }

  export enum Link {
    Submit = 'Link.Submit',
  }
}
