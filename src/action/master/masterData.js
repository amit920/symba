import axiosInstance from "../../utils/axiosApi";
// import _ from "lodash";
import * as constants from "../../utils/constants";
import { getAPIURL } from "../../utils/getApiUrl";
// import checkAlreadyLogin from "../../utils/checkAlreadyLogin";
import { toastr } from "react-redux-toastr";

export const getSocialnetworks = () => (dispatch) => {
  axiosInstance
    .get(getAPIURL(constants.GET_SOCIALNETWORKS_LIST_URL, {}))
    .then(function (response) {
      dispatch({
        type: "MASTERDATA/SOCIALNETWORKS_LIST",
        payload: {
          socialNetworksList: response.data.socialnetworks,
          socialNetworksCount: response.data.count,
        },
      });
    })
    .catch(function (error) {
      toastr.error("Some Error Occurred");
    });
};

export const getSkills = () => (dispatch) => {
  axiosInstance
    .get(getAPIURL(constants.GET_SKILLS_LIST_URL, {}))
    .then(function (response) {
      dispatch({
        type: "MASTERDATA/SKILLS_LIST",
        payload: {
          skillsList: response.data.skills,
          skillsCount: response.data.count,
        },
      });
    })
    .catch(function (error) {
      toastr.error("Some Error Occurred");
    });
};

export const getInterests = () => (dispatch) => {
  axiosInstance
    .get(getAPIURL(constants.GET_INTERESTS_LIST_URL, {}))
    .then(function (response) {
      dispatch({
        type: "MASTERDATA/INTERESTS_LIST",
        payload: {
          interestsList: response.data.interests,
          interestsCount: response.data.count,
        },
      });
    })
    .catch(function (error) {
      toastr.error("Some Error Occurred");
    });
};

export const getCountries = () => (dispatch) => {
  axiosInstance
    .get(getAPIURL(constants.GET_COUNTRY_LIST_URL, {}))
    .then(function (response) {
      dispatch({
        type: "MASTERDATA/COUNTRY_LIST",
        payload: {
          countriesList: response.data.countries,
        },
      });
    })
    .catch(function (error) {
      toastr.error("Some Error Occurred");
    });
};

export const getStates = (countryId) => (dispatch) => {
  axiosInstance
    .get(getAPIURL(constants.GET_STATE_LIST_URL, { ":country_id": countryId }))
    .then(function (response) {
      dispatch({
        type: "MASTERDATA/STATE_LIST",
        payload: {
          statesList: response.data.states,
        },
      });
    })
    .catch(function (error) {
      toastr.error("Some Error Occurred");
    });
};

// export const getCities = (stateId) => dispatch => {
//     var data = {
//         params: {
//             state: stateId
//         },
//     }
//     axiosInstance.get(getAPIURL(constants.GET_CITY_LIST_URL, {}), data).then(function (response) {
//         dispatch({
//             type: 'MASTERDATA/CITY_LIST',
//             payload: {
//                 citiesList: response.data
//             }
//         });
//     }).catch(function (error) {
//         toastr.error('Some Error Occurred')
//     });
// }

export const updateLoader = (loaderState) => (dispatch) => {
  dispatch({
    type: "LAYOUT/CHANGE_LOADER",
    payload: {
      loaderState: loaderState,
    },
  });
};

export const getDepartments = (organization) => (dispatch) => {
  axiosInstance
    .get(getAPIURL(constants.GET_DEPARTMENT_LIST_URL, { ":org": organization }))
    .then(function (response) {
      dispatch({
        type: "MASTERDATA/DEPARTMENT_LIST",
        payload: {
          departmentList: response.data.departments,
          departmentCount: response.data.count,
        },
      });
    })
    .catch(function (error) {
      toastr.error("Some Error Occurred");
    });
};
export const getCommentReactions = () => (dispatch) => {
  axiosInstance
    .get(getAPIURL(constants.GET_MASTERREACTIONS_LIST_URL, {}))
    .then(function (response) {
      dispatch({
        type: "MASTERDATA/MASTER_REACTIONS_LIST",
        payload: {
          masterReactsList: response.data.masterreactions,
          masterReactsCount: response.data.count,
        },
      });
    })
    .catch(function (error) {
      toastr.error("Some Error Occurred");
    });
};