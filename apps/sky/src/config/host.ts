import { useAppConfig } from '@vben/hooks'

export const getHost = () => {
  const env = localStorage.getItem('DEBUG_HOST')
  if (env === 'dev') {
    return 'http://localhost:9600'
  }
  if (env === 'prod') {
    return 'https://api-g2.wsd80.top'
  }
  if (env) {
    return env
  }
  return useAppConfig(import.meta.env, import.meta.env.PROD).apiURL
}
