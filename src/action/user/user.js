
import axiosInstance from "../../utils/axiosApi";
import { toastr } from "react-redux-toastr";
import * as constants from "../../utils/constants";
import { getAPIURL } from "../../utils/getApiUrl";
import checkAlreadyLogin from "../../utils/checkAlreadyLogin";
import { NotificationManager } from "../../components/common/react-notifications";
import localStorageService from "../../utils/localStorageService";
import createBrowserHistory from "history/createBrowserHistory";
const LocalStorageService = localStorageService.getService();
const browserHistory = createBrowserHistory();

export const getUser = (user_id) => (dispatch) => {
  dispatch({
    type: "LAYOUT/CHANGE_LOADER",
    payload: {
      loaderState: true,
    },
  });
  axiosInstance({
    method: "GET",
    //Add by vk fix mac issue on iphone/chrome/safari browser
    url: getAPIURL(constants.GETY_USER_URL, { ":id": user_id+'/' }),
  })
    .then(function (response) {
      dispatch({
        type: "USER_GET",
        payload: {
          currentUser: response.data,
        },
      });
      //dispatch(setuseractivity(response.data));
      localStorage.setItem("useractivity_id", response.data.useractivity_id)      
      LocalStorageService.setCurrentUser(JSON.stringify(response.data));
      if(response.data.IsTermCondition_Agree === false){
        browserHistory.push("/termsandconditions");
        window.location.reload(false);
     }
      else{
        // in reality, the user is being redirected by this function call
        checkAlreadyLogin();
      }
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
          "User session is unauthorized",
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

export const userTermcondition_agree = (params, callback) => (dispatch) => {
  dispatch({
    type: "LAYOUT/CHANGE_LOADER",
    payload: {
      loaderState: true,
    },
  });

  axiosInstance({
    method: "PUT",
    url: getAPIURL(constants.USER_TERMS_CONDITION_AGREE_URL, {}),
    data: params,
  })
    .then(function (response) {
      NotificationManager.success(
        "user accepted terms and conditions",
        "success",
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
      checkAlreadyLogin();

    })
    .catch((error) => {
      toastr.error("Some Error Occurred");
    });
};


// export const setuseractivity =(currentUser)=>(dispatch)=>{
//   var loginRequestPayload = {};
//   loginRequestPayload["org"] = currentUser.organization.id;
//   loginRequestPayload["user"] =currentUser.UserId;
//   localStorage.setItem('UserId',currentUser.UserId)
//   axiosInstance({
//     method: "POST",
//     url: getAPIURL(constants.USER_LOGIN_LOG),
//     data: loginRequestPayload,
//   })
//     .then(function(response) {
//       // debugger
//       dispatch({
//         type: "USER_LOGIN",
//         payload: {
//           currentUser: response.data,
//         },
//       });
//     });
// }


export const setuserlogoutactivity = (orgid,params, callback) => (dispatch) => {
  var userdata={
    userid: localStorage.getItem('UserId')
  }
  axiosInstance({
    method: "PUT",
    url: getAPIURL(constants.USER_LOGOUT_LOG, { ":id": localStorage.getItem('useractivity_id') }),
    data: userdata,
  })
    .then(function (response) {
      localStorage.removeItem('UserId')
      localStorage.removeItem('useractivity_id')
      LocalStorageService.clearUser();
      window.location.reload();
    })
};


// export const setuserlogoutactivity = (params, callback) => (dispatch) => {
//   debugger
//   axiosInstance({
//     method: "PUT",
//     url: getAPIURL(constants.USER_LOGOUT_LOG, {
//       ":useractivityid": '17d990b0-bdf9-4ea3-b1df-ef72c6791c31',
//     }),
//     // data: documentdata,
//   })
//     .then(function (response) {
//       NotificationManager.success(
//         "user accepted terms and conditions",
//         "success",
//         3000,
//         null,
//         null,
//         ""
//       );
//     })

// };

// export const setuserlogoutactivity = (params, callback) => (dispatch) => {
//   debugger
//   var logoutdata = {};
//   logoutdata["logout"]="2021-03-19 12:28:24.119758+00"
//   axiosInstance({
//     method: "PUT",
//     url: getAPIURL(constants.USER_LOGOUT_LOG, {}),
//     data: logoutdata,
//   })
//   .then(function (response) {
//     dispatch({
//       type: "USER_LOGIN",
//       // payload: {
//       //   currentUser: response.data,
//       // },
//     });
//   });
// }