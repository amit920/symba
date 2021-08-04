import axiosInstance from "../../utils/axiosApi";
import * as constants from "../../utils/constants";
import { getAPIURL } from "../../utils/getApiUrl";
import { NotificationManager } from "../../components/common/react-notifications";
// import createBrowserHistory from "history/createBrowserHistory";
import localStorageService from "../../utils/localStorageService";
import { getUser } from "../../action/user/user";
import jwt from "jwt-decode";

const LocalStorageService = localStorageService.getService();
// const browserHistory = createBrowserHistory();

export const login = (options) => (dispatch) => {
  dispatch({
    type: "LAYOUT/CHANGE_LOADER",
    payload: {
      loaderState: true,
    },
  });
  var loginRequestPayload = {};
  loginRequestPayload["username"] = options.username;
  loginRequestPayload["password"] = options.password;

  axiosInstance({
    method: "POST",
    url: getAPIURL(constants.LOGIN_URL),
    data: loginRequestPayload,
  })
    .then(function (response) {
      dispatch({
        type: "USER_LOGIN",
        payload: {
          currentUser: response.data,
        },
      });

      // store token in browser for future api requests
      LocalStorageService.setToken(response.data.access_token);
      const raw_token = jwt(response.data.access_token); // decode token to get user_id
      dispatch(getUser(raw_token["user_id"]));
      dispatch({
        type: "LAYOUT/CHANGE_LOADER",
        payload: {
          loaderState: false,
        },
      });
    })
    .catch((error) => {
      if (error.response.status === 400) {
        NotificationManager.error(
          "Username and the Password combination is not valid",
          "Error",
          3000,
          null,
          null,
          ""
        );
        dispatch({
          type: "LAYOUT/CHANGE_LOADER",
          payload: {
            loaderState: false,
          },
        });
      } else if (error.response.status === 401) {
        NotificationManager.error(
          error.response.data,
          "Error",
          3000,
          null,
          null,
          ""
        );
        dispatch({
          type: "LAYOUT/CHANGE_LOADER",
          payload: {
            loaderState: false,
          },
        });
      } else if (error.response.status === 403) {
        NotificationManager.error(
          "Your account is deactivated. Please contact your administration.",
          "Error",
          3000,
          null,
          null,
          ""
        );
        dispatch({
          type: "LAYOUT/CHANGE_LOADER",
          payload: {
            loaderState: false,
          },
        });
      } else if (error.response.status === 404) {
        NotificationManager.error(
          "Username not found. Please contact your administration.",
          "Error",
          3000,
          null,
          null,
          ""
        );
        dispatch({
          type: "LAYOUT/CHANGE_LOADER",
          payload: {
            loaderState: false,
          },
        });
      } else {
        NotificationManager.error(
          "Some Error Occurred.",
          "Error",
          3000,
          null,
          null,
          ""
        );
        dispatch({
          type: "LAYOUT/CHANGE_LOADER",
          payload: {
            loaderState: false,
          },
        });
      }
    });
};
