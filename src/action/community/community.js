import axiosInstance from "../../utils/axiosApi";
// import _ from "lodash";
import * as constants from "../../utils/constants";
import { getAPIURL } from "../../utils/getApiUrl";
// import checkAlreadyLogin from "../../utils/checkAlreadyLogin";
import { toastr } from "react-redux-toastr";

export const getAdministratorsCommunityList = (params) => (dispatch) => {
  var data = {
    params: params,
  };
  axiosInstance
    .get(getAPIURL(constants.ADMINISTRATORS_LIST_URL, {}), data)
    .then(function (response) {
      dispatch({
        type: "ORGANIZATION/ADMINISTRATORS_COMMUNITY_LIST",
        payload: {
          administratorsList: response.data.administrators,
          administrators_count: response.data.count,
        },
      });
    })
    .catch(function (error) {
      toastr.error("Some Error Occurred");
    });
};
export const getTeamMembersCommunityList = (params) => (dispatch) => {
  var data = {
    params: params,
  };
  axiosInstance
    .get(getAPIURL(constants.TEAM_MEMBERS_LIST_URL, {}), data)
    .then(function (response) {
      dispatch({
        type: "ORGANIZATION/TEAM_MEMBERS_COMMUNITY_LIST",
        payload: {
          teammembersList: response.data.teammember,
          teammembersList_count: response.data.count,
        },
      });
    })
    .catch(function (error) {
      toastr.error("Some Error Occurred");
    });
};


export const getInternDetails = (organizationId, internId) => (dispatch) => {
  var data = {
    params: {
      orgid: organizationId,
    },
  };
  axiosInstance
    .get(getAPIURL(constants.INTERN_DETAIL_URL, { ":id": internId }), data)
    .then(function (response) {
      dispatch({
        type: "ORGANIZATION/INTERN_DETAILS",
        payload: {
          internDetail: response.data,
        },
      });
    })
    .catch(function (error) {
      toastr.error("Some Error Occurred");
    });
};

