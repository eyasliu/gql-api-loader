module.exports = function config(obj) {
  window.__GQL_API_LOADER_CONFIG__ = {
    ...(window.__GQL_API_LOADER_CONFIG__ || {}),
    ...obj,
  }
}