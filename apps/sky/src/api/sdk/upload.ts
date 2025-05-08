function createFormData(files: any[], data: any = {}) {
  const formData = new FormData()

  Object.keys(data).forEach((key) => {
    formData.append(key, data[key])
  })

  if (files.length === 1) {
    formData.append('file', files[0])
  } else {
    files.map((file, i) => {
      formData.append(`file${i + 1}`, file)
    })
  }
  return formData
}

interface UploadBody {
  id: ID
}

const directusOptions = {
  requestOptions: {
    headers: {
      // Form Header
      'Content-Type': 'multipart/form-data',
    },
  },
}

export function upload(
  file: any,
  data: Record<string, any> = {},
): Promise<UploadBody> {
  const form = createFormData([file], data)
  return actor.files.createOne(form, {}, directusOptions) as any
}

export function uploads(
  files: any[],
  data: Record<string, any> = {},
): Promise<UploadBody[]> {
  return actor.files.createOne(
    createFormData(files, data),
    {},
    directusOptions,
  ) as any
}
