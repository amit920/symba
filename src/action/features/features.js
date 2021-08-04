import axiosInstance from "../../utils/axiosApi";
// import _ from "lodash";
import * as constants from "../../utils/constants";
import { getAPIURL } from "../../utils/getApiUrl";
// import checkAlreadyLogin from "../../utils/checkAlreadyLogin";
import { toastr } from "react-redux-toastr";
import createBrowserHistory from "history/createBrowserHistory";
const browserHistory = createBrowserHistory();

// export const addApplication = (params,callback) => dispatch => {
//     dispatch({
//         type: 'LAYOUT/CHANGE_LOADER',
//         payload: {
//             loaderState: true,
//         }
//     });

//     var orgdata = {
//         name: params.name,
//         org:params.organization,
//         isactive: true,
//         createdby: params.createdby,

//     }
//     axiosInstance({ method: 'POST', url: getAPIURL(constants.ADD_NEW_ORG_APPLICATION_URL), data: orgdata }).then(function (response) {
//         toastr.success('Application Added Successfully');

//         callback();
//         dispatch(getApplicationList({
//             limit_size: 10,
//             limit_start: 0,

//         }));
//         dispatch({
//             type: 'LAYOUT/CHANGE_LOADER',
//             payload: {
//                 loaderState: false,
//             }
//         });
//     }).catch(error => {

//         dispatch({
//             type: 'LAYOUT/CHANGE_LOADER',
//             payload: {
//                 loaderState: false,
//             }
//         });

//         // if (error.response.status === 400) {
//         //     // dispatch(stopSubmit('addApplicationPopUpform', error.response.data));
//         // } else {
//         //     toastr.error('Some Error Occurred')
//         // }
//     });
// }

// export const getApplicationList = (filterObj) => dispatch => {

//     console.log(filterObj)
//     var data = {
//         params: filterObj,
//     }
//     axiosInstance.get(getAPIURL(constants.GET_ALL_APPLICATION_LIST_URL, {}), data).then(function (response) {
//         dispatch({
//             type: 'ORGANIZATION/APPLICATION_LIST',
//             payload: {
//                 applicationList: response.data.applications,
//                 applicationCount: response.data.count,
//             }
//         });
//     }).catch(function (error) {
//         // toastr.error('Some Error Occurred')
//     });
// }
// export const editApplicationDetails = (appId,params,callback) => dispatch => {
//     dispatch({
//         type: 'LAYOUT/CHANGE_LOADER',
//         payload: {
//             loaderState: true,
//         }
//     });
//     var appdata = {
//         name: params.name,
//         org: params.organization,
//         isactive: true,
//         modifiedby: params.createdby,
//         modifiedon: new Date()
//     }
//     axiosInstance({ method: 'PUT', url: getAPIURL(constants.ORG_APPLICATION_UPDATE_URL, { ':application_id': appId }), data: appdata }).then(function (response) {
//         toastr.success('Application Updated Successfully');
//         browserHistory.push('/#/superadmin/application')
//         window.location.reload()
//         callback();
//         dispatch(getApplicationList({
//             orgid:   params.organization
//         }));
//         dispatch({
//             type: 'LAYOUT/CHANGE_LOADER',
//             payload: {
//                 loaderState: false,
//             }
//         });
//     }).catch(error => {

//         dispatch({
//             type: 'LAYOUT/CHANGE_LOADER',
//             payload: {
//                 loaderState: false,
//             }
//         });

//         // if (error.response.status === 400) {
//         //     dispatch(stopSubmit('editDepartmentPopUpform', error.response.data));
//         // } else {
//         //     toastr.error('Some Error Occurred')
//         // }
//     });
// }
// export const getApplicationDetails = (applicationId) => dispatch => {

//     var data = {
//         // params: {
//         //     orgid: organizationId
//         // },
//     }
//     axiosInstance.get(getAPIURL(constants.ORG_APPLICATION_DETAIL_BY_ID_URL, { ':id': applicationId }), data).then(function (response) {
//         dispatch({
//             type: 'ORGANIZATION/APPLICATION_DETAILS',
//             payload: {
//                 applicationDetails: response.data
//             }
//         });
//     }).catch(function (error) {
//         toastr.error('Some Error Occurred')
//     });
// }

// export const clearApplicationDetails = (organizationId, internId) => dispatch => {
//     dispatch({
//         type: 'ORGANIZATION/APPLICATION_DETAILS',
//         payload: {
//             applicationDetails: null
//         }
//     });
// }

// export const deleteApplication = (app) => dispatch => {

//     dispatch(
//         {
//         type: 'LAYOUT/CHANGE_LOADER',
//         payload: {
//             loaderState: true,
//         },

//     });

//         axiosInstance({ method: 'DELETE', url: getAPIURL(constants.ORG_APPLICATION_DELETE_URL, {':application_id': app.application_id}), data: {} }).then(function (response) {
//         toastr.success('Application deleted successfully');

//         dispatch({
//             type: 'ORGANIZATION/REMOVE_APPLICATION',
//             payload: {
//                 app: app
//             }
//         });

//         dispatch({
//             type: 'LAYOUT/CHANGE_LOADER',
//             payload: {
//                 loaderState: false,
//             }
//         });
//     }).catch(error => {
//         dispatch({
//             type: 'LAYOUT/CHANGE_LOADER',
//             payload: {
//                 loaderState: false,
//             }
//         });

//     });

// }

//  Dashboard JS Function

export const getFeatures_By_OrgId = (params) => (dispatch) => {
  // alert(organizationId)
  var data = {
    params: params,
  };
  axiosInstance
    .get(getAPIURL(constants.GET_FEATURES_LIST_BY_ORGID_URL, {}), data)
    .then(function (response) {
      dispatch({
        type: "SIDEBAR/FEATURES_LIST",
        payload: {
          FeaturesDetails: response.data,
        },
      });
    })
    .catch(function (error) {
      toastr.error("Some Error Occurred");
    });
};




// nav


export const getOrgFeaturesList = (filterObj) => dispatch => {
  var data = {
      params: filterObj,
      
  }
  axiosInstance.get(getAPIURL(constants.GET_ALL_ORG_FEATURES_LIST_URL, {}), data).then(function (response) {
      dispatch({
          type: 'ORGFEATURES/ORGFEATURES_LIST',
          payload: {
              featuresList: response.data.features,
              featuresCount: response.data.count,
          }
      });
  }).catch(function (error) {
      // toastr.error('Some Error Occurred')
  });
}



export const getOrgFeaturesDetails = (orgfeaturesId) => dispatch => {
 
  var data = {
      
  }
  axiosInstance.get(getAPIURL(constants.ORG_FEATURES_LIST_DETAIL_URL, { ':id': orgfeaturesId }), data).then(function (response) {
      dispatch({
          type: 'DEPARTMENT/DEPARTMENT_DETAILS',
          payload: {
              orgFeaturesDetail: response.data
          }
      });
  }).catch(function (error) {
      toastr.error('Some Error Occurred')
  });
}



export const addOrgFeatures = (params,callback) => dispatch => {
    dispatch({
        type: 'LAYOUT/CHANGE_LOADER',
        payload: {
            loaderState: true,
        }
    });  
    var orgdata = {
        launchpad: params.launchpad,
        projects: params.projects,
        feedback: params.feedback,
        engage: params.engage,
        community: params.community,
        org:params.organization,
        isactive: true,                         
        createdby: params.createby,      
    }
    axiosInstance({ method: 'POST', url: getAPIURL(constants.ADD_NEW_ORG_FEATURES_LIST_URL), data: orgdata }).then(function (response) {
        toastr.success('Org Features Added Successfully');
        callback();
        dispatch(getOrgFeaturesList({
            limit_size: 10,
            limit_start: 0,              
        }));
        dispatch({
            type: 'LAYOUT/CHANGE_LOADER',
            payload: {
                loaderState: false,
            }
        });
    }).catch(error => {
        dispatch({
            type: 'LAYOUT/CHANGE_LOADER',
            payload: {
                loaderState: false,
            }
        });
        // if (error.response.status === 400) {
        //     dispatch(stopSubmit('addDepartmentPopUpform', error.response.data));
        // } else {
        //     toastr.error('Some Error Occurred')
        // }
    });
}
// export const addOrgFeatures = (orgData) => dispatch => {
//   axiosInstance({ method: 'POST', url: getAPIURL(constants.ADD_NEW_ORG_FEATURES_LIST_URL), data: orgData }).then(function (response) {
//       toastr.success('Org Features Added Successfully');
//       browserHistory.push('/administrationapp/orgfeatureslist/view')
//       window.location.reload()
//   }).catch(error => {
//       toastr.error('Some Error Occurred')
      
//   });
// }



export const updateOrgFeaturesDetails = (params,callback) => dispatch => {
  // alert(params.deptId)
  dispatch({
      type: 'LAYOUT/CHANGE_LOADER',
      payload: {
          loaderState: true,
      }
  });
  var deptdata = {
      launchpad: params.launchpad,
      projects: params.projects,
      feedback:params.feedback,
      community:params.community,
      engage:params.engage,
      // org: params.organization,
      // address1:params.address1,
      // address2:params.address2,
      // city: params.city,
      // state:params.state,
      // country: params.country,
      isactive: true,                         
      modifiedby: params.createby,
      modifiedon: new Date()
    
  }
  axiosInstance({ method: 'PUT', url: getAPIURL(constants.UPDATE_ORG_FEATURES_LIST_URL, { ':org_id': params.Featuresid }), data: deptdata }).then(function (response) {
      toastr.success('OrgFeatures Updated Successfully'); 
      browserHistory.push('/administrationapp/orgfeatureslist/view')
      window.location.reload()      
      callback();
      // dispatch(getDepartmentList({
         
      //     limit_size: 10,
      //     limit_start: 0,   
      // }));
      dispatch({
          type: 'LAYOUT/CHANGE_LOADER',
          payload: {
              loaderState: false,
          }
      });
  }).catch(error => {

      dispatch({
          type: 'LAYOUT/CHANGE_LOADER',
          payload: {
              loaderState: false,
          }
      });

      // if (error.response.status === 400) {
      //     dispatch(stopSubmit('editDepartmentPopUpform', error.response.data));
      // } else {
      //     toastr.error('Some Error Occurred')
      // }
  });
}



export const deleteOrgFeatures = (features) => dispatch => {    
  dispatch(
      {
      type: 'LAYOUT/CHANGE_LOADER',
      payload: {
          loaderState: true,
      },
      
  });
  axiosInstance({ method: 'DELETE', url: getAPIURL(constants.ORG_FEATURES_DELETE_URL, {':Featuresid': features.Featuresid}), data: {} }).then(function (response) {
  toastr.success('OrgFeatures deleted successfully');
      dispatch({
          type: 'ORGFEATURES/REMOVE_ORGFEATURES',
          payload: {
              features: features
          }
      });
          
      dispatch({
          type: 'LAYOUT/CHANGE_LOADER',
          payload: {
              loaderState: false,
          }
      });
  }).catch(error => {
      dispatch({
          type: 'LAYOUT/CHANGE_LOADER',
          payload: {
              loaderState: false,
          }
      });        
  });              
}