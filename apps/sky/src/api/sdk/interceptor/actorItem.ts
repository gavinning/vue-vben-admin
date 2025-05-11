import { Tap } from 'tap'

import { uploadInterceptor } from './upload.Interceptor'

// Intercept for actorItem

function transform(config: Set<string>) {
  return (data: Item) => {
    return Tap.src(data).use(uploadInterceptor(config)).dest()
  }
}

export function registerInterceptor(collection: string) {
  return transform(useUploadHub().getFileFieldMap(collection))
}
