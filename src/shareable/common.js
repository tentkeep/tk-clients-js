const forKey = (obj, callback) => {
  Object.keys(obj).forEach(callback)
}

const tryGet = (accessor, fallback) => {
  try {
    return accessor()
  } catch {
    return fallback
  }
}

module.exports = {
  forKey,
  tryGet
}
