// 处理全局默认异常

function handleScriptError(err) {
  debug.error('全局异常:', err)
}

function handlePromiseError(err) {
  catchError(err.reason)
}

function handleResourceError(err) {
  debug.error('全局资源加载异常:', err)
}

// 初始化全局异常监控
export function initGlobalErrorHandler() {
  // 普通JS错误
  window.addEventListener('error', handleScriptError)

  // Promise错误
  window.addEventListener('unhandledrejection', handlePromiseError)

  // 资源加载错误
  window.addEventListener('error', handleResourceError, true)
}
