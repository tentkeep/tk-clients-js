const forKey = (obj, callback) => {
  Object.keys(obj).forEach(callback)
}

module.exports = {
  forKey
}
