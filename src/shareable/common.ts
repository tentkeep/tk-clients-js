export const forKey = (obj, callback) => {
  Object.keys(obj).forEach(callback)
}

export const tryGet = (accessor, fallback: any = undefined) => {
  try {
    return accessor()
  } catch {
    return fallback
  }
}

export const sanitizeUrl = (url: string): string => {
  let _url = url
  if (!_url.includes('://')) {
    _url = `https://${_url}`
  }
  if (_url.endsWith('/')) {
    _url = _url.slice(0, -1)
  }
  return _url
}

export default {
  forKey,
  sanitizeUrl,
  tryGet,
}
