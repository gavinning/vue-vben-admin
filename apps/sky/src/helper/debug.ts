import { debug as debugFactory } from 'debug'

const log = debugFactory('app:log')
const error = debugFactory('app:error')

// eslint-disable-next-line no-console
log.log = console.log.bind(console)
error.log = console.error.bind(console)

export const debug = { log, error }

if (import.meta.env.DEV) {
  localStorage.setItem('debug', 'app:*')
}
