import axiosInstance from "../../utils/axiosApi";
// import _ from "lodash";
import * as constants from "../../utils/constants";
import { getAPIURL } from "../../utils/getApiUrl";
// import checkAlreadyLogin from "../../utils/checkAlreadyLogin";
import { toastr } from "react-redux-toastr";
import createBrowserHistory from "history/createBrowserHistory";
const browserHistory = createBrowserHistory();

export const addDepartment = (params, callback) => (dispatch) => {
  dispatch({
    type: "LAYOUT/CHANGE_LOADER",
    payload: {
      loaderState: true,
    },
  });

  var orgdata = {
    departmentDesc: params.name,
    org: params.organization,
    address1: params.address1,
    address2: params.address2,
    city: params.city,
    state: params.state,
    country: params.country,
    isactive: true,
    createdby: params.createby,
  };
  axiosInstance({
    method: "POST",
    url: getAPIURL(constants.ADD_NEW_ORG_DEPARTMENT_URL),
    data: orgdata,
  })
    .then(function (response) {
      toastr.success("Department Added Successfully");

      callback();
      dispatch(
        getDepartmentList({
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

      // if (error.response.status === 400) {
      //     // dispatch(stopSubmit('addDepartmentPopUpform', error.response.data));
      // } else {
      //     toastr.error('Some Error Occurred')
      // }
    });
};

export const getDepartmentList = (filterObj) => (dispatch) => {
  console.log(filterObj);
  var data = {
    params: filterObj,
  };
  axiosInstance
    .get(getAPIURL(constants.GET_ALL_DEPARTMENT_URL, {}), data)
    .then(function (response) {
      dispatch({
        type: "DEPARTMENT/DEPARTMENT_LIST",
        payload: {
          departmentList: response.data.Departments,
          departmentCount: response.data.count,
        },
      });
    })
    .catch(function (error) {
      // toastr.error('Some Error Occurred')
    });
};
export const editDepartmentDetails = (params, callback) => (
  dispatch
) => {
  dispatch({
    type: "LAYOUT/CHANGE_LOADER",
    payload: {
      loaderState: true,
    },
  });
  var deptdata = {
    departmentDesc: params.name,
    org: params.organization,
    address1: params.address1,
    address2: params.address2,
    city: params.city,
    state: params.state,
    country: params.country,
    isactive: true,
    modifiedby: params.createby,
    modifiedon: new Date(),
  };
  axiosInstance({
    method: "PUT",
    url: getAPIURL(constants.DEPT_UPDATE_URL, { ":department_id": params.deptId}),
    data: deptdata,
  })
    .then(function (response) {
      toastr.success("Department Updated Successfully");
      browserHistory.push("/administrationapp/Department/view");
      window.location.reload();
      callback();
      dispatch(
        getDepartmentList({
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

      // if (error.response.status === 400) {
      //     dispatch(stopSubmit('editDepartmentPopUpform', error.response.data));
      // } else {
      //     toastr.error('Some Error Occurred')
      // }
    });
};
export const getDepartmentDetails = (departmentId) => (dispatch) => {
  axiosInstance
    .get(
      getAPIURL(constants.DEPARTMENT_DETAIL_BY_ID_URL, { ":id": departmentId })
    )
    .then(function (response) {
      dispatch({
        type: "DEPARTMENT/DEPARTMENT_DETAILS",
        payload: {
          departmentDetail: response.data,
        },
      });
    })
    .catch(function (error) {
      toastr.error("Some Error Occurred");
    });
};

export const clearDepartmentDetails = (organizationId, internId) => (
  dispatch
) => {
  dispatch({
    type: "DEPARTMENT/DEPARTMENT_DETAILS",
    payload: {
      departmentDetail: null,
    },
  });
};
export const deleteDepartment = (dept) => (dispatch) => {
  dispatch({
    type: "LAYOUT/CHANGE_LOADER",
    payload: {
      loaderState: true,
    },
  });

  axiosInstance({
    method: "DELETE",
    url: getAPIURL(constants.DEPT_DELETE_URL, {
      ":department_id": dept.department_id,
    }),
    data: {},
  })
    .then(function (response) {
      toastr.success("Department deleted successfully");

      dispatch({
        type: "DEPARTMENT/REMOVE_DEPARTMENT",
        payload: {
          dept: dept,
        },
      });

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
    });
};
