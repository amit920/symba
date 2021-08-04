import axiosInstance from "../../utils/axiosApi";
//import _ from 'lodash';
import { stopSubmit } from "redux-form";
import * as constants from '../../utils/constants';
import { getAPIURL } from '../../utils/getApiUrl';
// import checkAlreadyLogin from '../../utils/checkAlreadyLogin';
import { toastr } from 'react-redux-toastr';
import createBrowserHistory from 'history/createBrowserHistory';
import { NotificationManager } from "../../components/common/react-notifications";
/* eslint-disable */
const browserHistory = createBrowserHistory();



export const getOrgengagecategoryList = (filterObj) => dispatch => {
    var data = {
        params: filterObj,

    }
    axiosInstance.get(getAPIURL(constants.GET_ALL_ORG_ENGAGE_CATEGORY_LIST_URL, {}), data).then(function (response) {
        dispatch({
            type: 'ORGENGAGECATEGORY/ORGENGAGECATEGORY_LIST',
            payload: {
                categoryList: response.data.category,
                categoryCount: response.data.count,
            }
        });
    }).catch(function (error) {
        // toastr.error('Some Error Occurred')
    });
}

  
export const addOrgEngageCategory = (params,callback) => dispatch => {
    dispatch({
        type: 'LAYOUT/CHANGE_LOADER',
        payload: {
            loaderState: true,
        }
    });  
    var orgdata = {
        categoryname: params.categoryname,
        org:params.organization,
        isactive: true,                         
        createdby: params.createby,      
    }
    axiosInstance({ method: 'POST', url: getAPIURL(constants.ADD_NEW_ORG_ENGAGE_CATEGORY_URL), data: orgdata })
    .then(function (response) {
        NotificationManager.success(
            "Engage Category Added Successfully",
            "Success",
            3000,
            null,
            null,
            ""
          );
          setTimeout(() => {
            window.location.reload(false);
          }, 3000);
        // toastr.success('Org Engage Category Added Successfully');
        callback();
 
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
export const adminAddOrgEngageCategory = (params,callback) => dispatch => {
    dispatch({
        type: 'LAYOUT/CHANGE_LOADER',
        payload: {
            loaderState: true,
        }
    });  
    var orgdata = {
        categoryname: params.categoryname,
        org:params.organization,
        isactive: true,                         
        createdby: params.createby,      
    }
    axiosInstance({ method: 'POST', url: getAPIURL(constants.ADD_NEW_ORG_ENGAGE_CATEGORY_URL), data: orgdata })
    .then(function (response) {
        NotificationManager.success(
            "Engage Category Added Successfully",
            "Success",
            3000,
            null,
            null,
            ""
          );
          setTimeout(() => {
            window.location.reload(false);
          }, 3000);
        callback();
 
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
        if (error.response.status === 400) {
            dispatch(stopSubmit('addEngageCategoryPopUpForm', error.response.data));
        } else {
            toastr.error('Some Error Occurred')
        }
    });
}

// export const addOrgEngageCategory = (orgData) => dispatch => {
//     axiosInstance({ method: 'POST', url: getAPIURL(constants.ADD_NEW_ORG_ENGAGE_CATEGORY_URL), data: orgData }).then(function (response) {
//         toastr.success('Org Engage Category Added Successfully');
//         browserHistory.push('/administrationapp/orgengage/view')
//         window.location.reload()
//     }).catch(error => {
//         toastr.error('Some Error Occurred')
        
//     });
// }





export const getOrgengageDetails = (categoryId) => dispatch => {
   
    var data = {
        
    }
    axiosInstance.get(getAPIURL(constants.ORG_ENGAGE_CATEGORY_ID_DETAIL_URL, { ':id': categoryId }), data).then(function (response) {
        dispatch({
            type: 'ORGENGAGE/ORGENGAGE_DETAILS',
            payload: {
                orgEngageDetail: response.data
            }
        });
    }).catch(function (error) {
        toastr.error('Some Error Occurred')
    });
}



export const updateOrgengagCategoryDetails = (params,callback) => dispatch => {
    // alert(params.deptId)
    dispatch({
        type: 'LAYOUT/CHANGE_LOADER',
        payload: {
            loaderState: true,
        }
    });
    var deptdata = {
        categoryname: params.categoryname,
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
    axiosInstance({ method: 'PUT', url: getAPIURL(constants.UPDATE_ORG_ENGAGE_CATEGORY_LIST_URL, { ':Categoryid': params.Categoryid }),  data: deptdata }).then(function (response) {
        toastr.success('Department1 Updated Successfully'); 
        browserHistory.push('/administrationapp/orgengage/view')
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


export const deleteOrgEngage = (orgengage) => dispatch => {    
    dispatch(
        {
        type: 'LAYOUT/CHANGE_LOADER',
        payload: {
            loaderState: true,
        },
        
    });
    axiosInstance({ method: 'DELETE', url: getAPIURL(constants.ORG_ENGAGE_DELETE_URL, {':Categoryid': orgengage.Categoryid}), data: {} }).then(function (response) {
    toastr.success('OrgFeatures deleted successfully');
        dispatch({
            type: 'ORGENGAGECATEGORY/REMOVE_ORGENGAGECATEGORY',
            payload: {
                orgengage: orgengage
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