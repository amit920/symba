export function getAPIURL(url_param, param = {}) {
  for (var key in param) {
    if (param.hasOwnProperty(key)) {
      url_param = url_param.replace(key, param[key]);
    }
  }
  return url_param;
}
