// localStorageService.js
const localStorageService = (function () {
  var _service;
  function _getService() {
    if (!_service) {
      _service = this;
      return _service;
    }
    return _service;
  }
  function _setToken(access_token) {
    localStorage.setItem("access_token", access_token);
  }
  function _getAccessToken() {
    return localStorage.getItem("access_token");
  }
  function _clearToken() {
    localStorage.removeItem("access_token");
  }
  function _setCurrentUser(userObj) {
    localStorage.setItem("currentUser", userObj);
  }
  function _getCurrentUser() {
    return localStorage.getItem("currentUser");
  }
  function _clearUser() {
    console.log("clearing user");
    localStorage.removeItem("currentUser");
    // temporary hack to always clear the token when clearing the user since business logic
    // depends on the currentUser's presence to check for session
    _clearToken();
  }
  return {
    getService: _getService,
    setToken: _setToken,
    getAccessToken: _getAccessToken,
    clearToken: _clearToken,
    setCurrentUser: _setCurrentUser,
    getCurrentUser: _getCurrentUser,
    clearUser: _clearUser,
  };
})();
export default localStorageService;
