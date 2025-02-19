import mitt from 'mitt';

export const emitter = mitt();

export namespace App {
  export enum Auth {
    Login = 'Login',
    Logout = 'Logout',
  }
}
