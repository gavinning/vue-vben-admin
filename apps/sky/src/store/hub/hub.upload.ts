export const useUploadHub = defineStore('UploadHubStore', () => {
  // 中转站
  // 用于存储文件类型字段
  // 该字段用于接口上传发起请求之前对文件类型进行上传和转换
  // @apps/sky/src/store/components/PageTable.ts
  // @apps/sky/src/api/sdk/Interceptor/actorItem.ts
  const fileFieldMap = reactive<Record<string, Set<string>>>({})

  /**
   * 向文件类型字段中添加字段
   * @param name 表名 collection
   * @param key 字段名 field
   */
  function addFileFieldMap(name: string, key: string) {
    if (!fileFieldMap[name]) {
      fileFieldMap[name] = new Set([])
    }
    fileFieldMap[name].add(key)
  }

  function getFileFieldMap(name: string) {
    if (!fileFieldMap[name]) {
      fileFieldMap[name] = new Set([])
    }
    return fileFieldMap[name]
  }

  return {
    fileFieldMap,
    addFileFieldMap,
    getFileFieldMap,
  }
})
