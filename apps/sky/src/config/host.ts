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

// 图表服务地址
export const getChartsHost = () => {
  const env = localStorage.getItem('DEBUG_HOST')

  if (env === 'dev') {
    return pkgChartsHost('http://localhost:5173')
  }
  if (env === 'prod') {
    return pkgChartsHost('https://charts.wsd80.top')
  }
  if (env) {
    return pkgChartsHost(env)
  }

  const url = useAppConfig(import.meta.env, import.meta.env.PROD).chartURL
  return pkgChartsHost(url)
}

// 向图表地址添加 token
function pkgChartsHost(url: string) {
  const access = useAccessStore()
  return `${url}?access_token=${access.accessToken}`
}
