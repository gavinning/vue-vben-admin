import { version } from '../../package.json'

function _autoRun() {
  if (import.meta.env.DEV) {
    // eslint-disable-next-line no-console
    console.log(`DEV@${version}`)
  }
  if (import.meta.env.PROD) {
    // hidden env
    // eslint-disable-next-line no-console
    console.log(version)
  }
}

_autoRun()
