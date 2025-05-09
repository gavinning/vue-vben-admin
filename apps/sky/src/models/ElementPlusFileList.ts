import { getHost } from '#/config'

export class FileImage {
  public id: string
  public url: string

  constructor(id: string) {
    this.id = id
    this.url = FileImage.encodeImg(id)
  }

  static decodeImg(url: string) {
    return new URL(url).pathname.replace('/assets/', '')
  }

  static encodeImg(uuid: string) {
    return [getHost(), '/assets/', uuid].join('')
  }

  static init(id: string) {
    return new FileImage(id)
  }

  static isInstance(obj: any) {
    return obj instanceof FileImage
  }
}
