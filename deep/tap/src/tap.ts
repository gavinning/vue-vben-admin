import type { Middleware } from 'koa-compose'

import compose from 'koa-compose'

export type Item = Record<string, any>
export type Context = Record<string, any>
export type { Middleware } from 'koa-compose'

export function defineMiddleware<T extends Context = Context>(m: Middleware<T>) {
  return m
}

export class Tap<T extends Context = Context> {
  private ctx: T
  private middlewares: Middleware<T>[] = []

  constructor(ctx: T) {
    this.ctx = ctx
  }

  public static src<T extends Context>(ctx: T) {
    return new Tap(ctx)
  }

  public async dest() {
    const fn = compose(this.middlewares)
    await fn(this.ctx)
    return this.ctx
  }

  public use(...args: Middleware<T>[]) {
    this.middlewares.push(...args)
    return this
  }
}

/**
  const middleware = (config: any) => {
    return defineMiddleware(async (ctx, next) => {
      // do something
    })
  }

  Tap.create()
    .use(m1({ tradeid: '123456'  }))
    .use(m2({ foo: 'bar'}))
    .dest()
 */
