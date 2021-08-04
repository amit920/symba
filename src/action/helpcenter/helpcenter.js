import axiosInstance from "../../utils/axiosApi";
// import _ from "lodash";
import * as constants from "../../utils/constants";
import { getAPIURL } from "../../utils/getApiUrl";
// import checkAlreadyLogin from "../../utils/checkAlreadyLogin";
import { toastr } from "react-redux-toastr";

import { stopSubmit } from "redux-form";
// import moment from "moment";
import { uploadFile } from "react-s3";

// import { file } from "@babel/types";
import { NotificationManager } from "../../components/common/react-notifications";
// import createBrowserHistory from "history/createBrowserHistory";
// const browserHistory = createBrowserHistory();
/* eslint-disable */

const awsConfig = {
    bucketName: constants.BUCKET_NAME, //PROD
    region: constants.AWS_REGION,
    accessKeyId: constants.AWS_ACCESS_KEY_ID,
    secretAccessKey: constants.AWS_ACCESS_SECRET_ID,
  };

  export const addHelpDetails =(params , callback) =>  (dispatch) => {

    dispatch({
        type:"LAYOUT/CHANGE_LOADER",
        payload:{
            loaderState: true,
        }
    })

    awsConfig.dirName = "HelpCenter"+"/"+params.usertype;
    if (params.Type === "File") {
      var fileObj = new File([params.filelinkdata], params.filelinkdata.name, {
        type: params.filelinkdata.type,
      });
  
      uploadFile(fileObj, awsConfig)
        .then((data) => {
          var orgdata = {
            help_title: params.title,
            help_description:params.description,
            help_url: data.location,
            user_type:params.usertype,
            features:params.features,
            Type:params.Type,
            isactive: true,
            createdby: params.createby,
          };
          axiosInstance({
            method: "POST",
            url: getAPIURL(constants.ADD_NEW_HELPCENTER_DETAILS_URL, {}),
            data: orgdata,
          })
            .then((response) => {
              NotificationManager.success(
                "Help Guide Added Successfully",
                "Success",
                3000,
                null,
                null,
                ""
              );
              callback();
              dispatch(
                AllHelpGuideList({
                  limit_size: 10,
                  limit_start: 0,
                })
              );
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
                dispatch(stopSubmit("addOrgPopUpform", error.response.data));
              } else {
                toastr.error("Some Error Occurred");
              }
            });
        })
        .catch((err) => {
          toastr.error("Some Error Occurred");
          dispatch({
            type: "LAYOUT/CHANGE_LOADER",
            payload: {
              loaderState: false,
            },
          });
        });
    } else {
      var orgdata = {
            help_title: params.title,
            help_description:params.description,
            help_url: params.doclinkdata,
            user_type:params.usertype,
            features:params.features,
            Type:params.Type,
            isactive: true,
            createdby: params.createby,
      };
      axiosInstance({
        method: "POST",
        url: getAPIURL(constants.ADD_NEW_HELPCENTER_DETAILS_URL, {}),
        data: orgdata,
      })
        .then((response) => {
          toastr.success("Help Guide Added Successfully");
          callback();
  
          dispatch(
            AllHelpGuideList({
              limit_size: 10,
              limit_start: 0,
            })
          );
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
            dispatch(stopSubmit("addOrgPopUpform", error.response.data));
          } else {
            toastr.error("Some Error Occurred");
          }
        });
    }
  }

  export const getUserGuideDetail = (paramsObj) => (dispatch) => {
    var data = {
      params: paramsObj,
    };
    axiosInstance
      .get(getAPIURL(constants.GET_USER_HELPCENTER_DETAILS_URL, {}), data)
      .then(function (response) {
        dispatch({
          type: "USER/GUIDE_LIST",
          payload: {
            UserGuideList: response.data.guides,
            GuideCount: response.data.count,
          },
        });
      })
      .catch(function (error) {
        toastr.error("Some Error Occurred");
      });
  };

  //for utility screen
  export const AllHelpGuideList = (params) => (dispatch) => {
    var data = {
      params: params,
    };
    axiosInstance
      .get(getAPIURL(constants.GET_ALL_HELPGUIDE_LIST_URL, {}), data)
      .then(function (response) {
        dispatch({
          type: "UTILITY/ALL_HELPGUIDE_LIST",
          payload: {
            AllGuideList: response.data.GuideList,
            AllGuideCount: response.data.count,
          },
        });
      })
      .catch(function (error) {
        toastr.error("Some Error Occurred");
      });
  };


  // help center log

  export const getGuideLog = (paramsObj) => (dispatch) => {
    var data = {
      params: paramsObj,
    };
    axiosInstance
      .get(getAPIURL(constants.GET_USER_HELPCENTER_LOG, {}), data)
      .then(function (response) {
        dispatch({
          type: "USER/GUIDE_LIST",
          payload: {
            UserGuideList: response.data.guides,
            GuideCount: response.data.count,
          },
        });
      })
      .catch(function (error) {
        toastr.error("Some Error Occurred");
      });
  };