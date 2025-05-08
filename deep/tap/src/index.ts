import compose from 'koa-compose';
import type { Middleware } from 'koa-compose';

export type Item = Record<string, any>;
export type { Middleware } from 'koa-compose';

export interface Context {
  data: Item;
}

export class Tap<T extends Context> {
  private ctx: T;
  private middlewares: Middleware<T>[] = [];

  constructor(ctx: T) {
    this.ctx = ctx;
  }

  public static create<T extends Context>(ctx: T = { data: {} } as T) {
    return new Tap(ctx);
  }

  public static defineMiddleware<Ctx>(m: Middleware<Ctx>) {
    return m;
  }

  public use(...args: Middleware<T>[]) {
    this.middlewares.push(...args);
    return this;
  }

  public async dest() {
    const fn = compose(this.middlewares);
    await fn(this.ctx);
    return this.ctx.data;
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
