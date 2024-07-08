// @ts-nocheck
const got = async (url: any, options: RequestInit) => {
  try {
    return (await import('got')).default(url, options).then((response: any) => {
      const contentType = response.headers['content-type']
      response.isJson = contentType.includes('json')
      response.isXml = contentType.includes('xml')
      response.bodyString = response.body
      return response
    })
  } catch {
    return fetch(url, options).then(async (response) => {
      response.statusCode = response.status
      response.bodyString = await response.text()
      const contentType = response.headers.get('content-type')
      response.isJson = contentType.includes('json')
      response.isXml = contentType.includes('xml')
      return response
    })
  }
}

export const sanitizeOptions = (options: any | null) => {
  const _options = options ?? {}
  if (typeof _options.body === 'object') {
    _options.body = JSON.stringify(_options.body)
  }
  return _options
}

export type RequestOptions = {
  method?: 'get' | 'post' | 'put' | 'delete'
  headers?: Record<string, string | undefined>
  body?: any
}

export class ApiStatusError extends Error {
  status: number
  bodyText: string

  constructor(status, bodyText) {
    super(bodyText)
    this.status = status
    this.bodyText = bodyText
  }
}

const statusChecker = async (response: any) => {
  if (!response.ok) {
    throw new ApiStatusError(response.statusCode, response.bodyString)
  } else {
    return response
  }
}

const parseContent = async (response: any) => {
  if (response.isJson) {
    return JSON.parse(response.bodyString)
  } else if (response.isXml) {
    const xml2js = await import('xml2js')
    return xml2js.parseStringPromise(response.bodyString)
  }
  return response
}

export type API = (
  url: string | URL,
  options?: RequestOptions | RequestInit | null,
) => Promise<any>

export const api: API = (
  url: string | URL,
  options: RequestOptions | RequestInit | null = null,
) => {
  return got(url, sanitizeOptions(options))
    .then(statusChecker)
    .then(parseContent)
}

export default api
