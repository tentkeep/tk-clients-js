import got, { Response } from 'got'

export const sanitizeOptions = (options: any | null) => {
  const _options = options ?? {}
  if (typeof _options.body === 'object') {
    _options.body = JSON.stringify(_options.body)
  }
  return _options
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

const statusChecker = async (response: Response<string>) => {
  if (!response.ok) {
    throw new ApiStatusError(response.statusCode, response.body)
  } else {
    return response
  }
}

const parseContent = async (response: Response<string>) => {
  const contentType = response.headers['Content-Type']
  if (contentType?.includes('json')) {
    return JSON.parse(response.body)
  } else if (contentType?.includes('xml')) {
    const xml2js = await import('xml2js')
    return xml2js.parseStringPromise(response.body)
  }
  return response
}

export type API = (url: string | URL, options?: any | null) => Promise<any>

export const api: API = (url: string | URL, options: any | null = null) => {
  return got(url, sanitizeOptions(options))
    .then(statusChecker)
    .then(parseContent)
}

export default api
