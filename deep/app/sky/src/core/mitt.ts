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
    // 更新指令
    Adding = 'Pay.Adding',

    // 关闭操作面板
    Close = 'Pay.Close',
    Edit = 'Pay.Edit',

    Editing = 'Pay.Editing',
  }
}
