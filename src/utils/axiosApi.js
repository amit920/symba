import axios from "axios";
import localStorageService from "./localStorageService";
import createBrowserHistory from "history/createBrowserHistory";
import * as constants from "./constants";
const browserHistory = createBrowserHistory();

// localStorageService
const LocalStorageService = localStorageService.getService();
const apiVersion = "v1";
const axiosInstance = axios.create({
  baseURL: getHostURL() + "/api/" + apiVersion,
  timeout: 15000, // intentially large timeout because of lack of perf testing
});

function getHostURL() {
  console.log(process.env.NODE_ENV);
  if (process.env.NODE_ENV === "production") {
    return constants.LIVE_DOMAIN_URL;
  } else if (process.env.NODE_ENV === "staging") {
  } else {
    return constants.LIVE_DOMAIN_URL;
  }
}
// Add a request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // always inject API-Key
    config.headers["X-Parse-REST-API-Key"] = "52JlUKCtc3333st1yvmyxWpF4KENUoFT";
    // if we have a token, inject it in the headers
    const token = LocalStorageService.getAccessToken();
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }
    // if we've stored user state, inject it in the header
    var currentUser = LocalStorageService.getCurrentUser();
    if (currentUser) {
      currentUser = JSON.parse(currentUser);
      config.headers["X-USER-LOGIN"] = currentUser["Email"];
      config.headers["X-USER-TOKEN"] = currentUser["SessionToken"];
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

//Add a response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  function (error) {
    //const originalRequest = error.config;

    // if the user was unauthorized to perform this action, route them to the user page
    if (error.response.status === 401) {
      browserHistory.push("/user");
      window.location.reload();
      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);
export default axiosInstance;
