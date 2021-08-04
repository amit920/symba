import axiosInstance from "../../utils/axiosApi";
// import _ from "lodash";
import * as constants from "../../utils/constants";
import { getAPIURL } from "../../utils/getApiUrl";
// import checkAlreadyLogin from "../../utils/checkAlreadyLogin";
import { toastr } from "react-redux-toastr";
// import { browserHistory } from 'react-router';
import { uploadFile } from "react-s3";
import createBrowserHistory from "history/createBrowserHistory";
import {
  stopSubmit,
  reset,
} from "redux-form";
import { NotificationManager } from "../../components/common/react-notifications";
/* eslint-disable */
const browserHistory = createBrowserHistory();
const awsConfig = {
  bucketName: constants.BUCKET_NAME, //PROD
  region: constants.AWS_REGION,
  accessKeyId: constants.AWS_ACCESS_KEY_ID,
  secretAccessKey: constants.AWS_ACCESS_SECRET_ID,
};
export const SendFeedbackRequest = (
 
  orgid,
  params,
  userType,
  callback
) => (dispatch) => {
  dispatch({
    type: "LAYOUT/CHANGE_LOADER",
    payload: {
      loaderState: true,
    },
  });

  awsConfig.dirName = "Feedback Document" + "/" + params.createdby;

  if (params.Type === "File") {
    var fileObj = new File(
      [params.fileattachmentdata],
      params.fileattachmentdata.name,
      { type: params.fileattachmentdata.type }
    );

    uploadFile(fileObj, awsConfig).then((data) => {
      var RequestFeedbackData = {
        recipient_mail: params.recipient_mail,
        project_title: params.project_title,
        message: params.message,
        org: orgid,
        internid: params.createdby,
        user_typeid: userType,
        project_attached_file: data.location,
        fileName: params.fileattachmentdata.name,
        fileType: params.fileattachmentdata.type,
      };
      axiosInstance({
        method: "POST",
        url: getAPIURL(constants.INTERN_REQUEST_FEEDBACK_URL, {}),
        data: RequestFeedbackData,
      }).then(function (response) {
        NotificationManager.success(
          "Feedback request sent successfully",
          "success",
          3000,
          null,
          null,
          ""
        );
        callback();
        dispatch(reset("requestfeedbackPopupForm"));
      });

      dispatch({
        type: "LAYOUT/CHANGE_LOADER",
        payload: {
          loaderState: false,
        },
      }).catch((error) => {
        toastr.error("Some Error Occurred");
        dispatch({
          type: "LAYOUT/CHANGE_LOADER",
          payload: {
            loaderState: false,
          },
        });
      });
    });
  } else {
    var RequestFeedbackData = {
      recipient_mail: params.recipient_mail,
      project_title: params.project_title,
      message: params.message,
      org: orgid,
      internid: params.createdby,
      user_typeid: userType,
    };
    axiosInstance({
      method: "POST",
      url: getAPIURL(constants.INTERN_REQUEST_FEEDBACK_URL, {}),
      data: RequestFeedbackData,
    }).then(function (response) {
      NotificationManager.success(
        "Feedback request sent successfully",
        "success",
        3000,
        null,
        null,
        ""
      );
      callback();
      dispatch(reset("requestfeedbackPopupForm"));
      dispatch({
        type: "LAYOUT/CHANGE_LOADER",
        payload: {
          loaderState: false,
        },
      });
    })
    .catch((error) => {
      dispatch({
        type: "LAYOUT/CHANGE_LOADER",
        payload: {
          loaderState: false,
        },
      });
      if (error.response.status === 400) {
        dispatch(
          stopSubmit("requestfeedbackPopupForm", error.response.data)
        );
      } else {
        NotificationManager.error(
          "Some Error Occurred",
          "Error",
          3000,
          null,
          null,
          ""
        );
      }
    });
   
    // .catch(error => {
    //     toastr.error('Some Error Occurred');
    //     dispatch({
    //         type: 'LAYOUT/CHANGE_LOADER',
    //         payload: {
    //             loaderState: false,
    //         }
    //     });
    // });
  }
};
export const getInternforFeedbackResponse = (internid) => (dispatch) => {
  axiosInstance
    .get(
      getAPIURL(constants.INTERN_LIST_INFO_FOR_FEEDBACKRESPONSE_URL, {
        ":id": internid,
      })
    )
    .then(function (response) {
      dispatch({
        type: "INTERN/INTERN_RESPONSE_FEEDBACK",
        payload: {
          internInfo: response.data,
        },
      });
    })
    .catch(function (error) {
      toastr.error("Some Error Occurred");
    });
};

export const AddResponse = (params, callback) => (dispatch) => {
  axiosInstance({
    method: "PUT",
    url: getAPIURL(constants.INTERN_RESPONSE_FEEDBACK_CREATE_URL, {}),
    data: params,
  })
    .then(function (response) {
      NotificationManager.success(
        "Feedback Submission Added Successfully",
        "success",
        3000,
        null,
        null,
        ""
      );
      browserHistory.push("/ThankYou");
      window.location.reload();
    })
    .catch((error) => {
      toastr.error("Some Error Occurred");
    });
};

export const internFeedbackList = (params) => (dispatch) => {
  var data = {
    params: params,
  };
  axiosInstance
    .get(getAPIURL(constants.INTERN_FEEDBACK_URL, {}), data)
    .then(function (response) {
      dispatch({
        type: "INTERNS/FEEDBACK_LIST",
        payload: {
          feedbackList: response.data.InstantFeedback,
          feedbackCount: response.data.count,
        },
      });
    })
    .catch(function (error) {
      toastr.error("Some Error Occurred");
    });
};
