import axiosInstance from "../../utils/axiosApi";
// import _ from 'lodash';
import * as constants from '../../utils/constants';
import { getAPIURL } from '../../utils/getApiUrl';
// import checkAlreadyLogin from '../../utils/checkAlreadyLogin';
import { toastr } from 'react-redux-toastr';
import moment from "moment";
import { stopSubmit } from 'redux-form';
import createBrowserHistory from 'history/createBrowserHistory';
/* eslint-disable */
const browserHistory = createBrowserHistory();


export const getUserList = (params) => dispatch => {
    var data = {
        params: params,
        // headers: setAuthToken()
    }
    axiosInstance.get(getAPIURL(constants.ADMIN_USER_LIST_URL, {}), data).then(function (response) {
        dispatch({
            type: 'USER/USER_LIST',
            payload: {
                userList: response.data.Users,
                userCount: response.data.count
            }
        });
    }).catch(function (error) {
        toastr.error('Some Error Occurred')
    });
}


export const addusers = (orgdata,callback) => dispatch => {
    dispatch({
        type: 'LAYOUT/CHANGE_LOADER',
        payload: {
            loaderState: true,
        }
    });
    if (orgdata.startdate) {
        orgdata.startdate = moment(orgdata.startdate).format("YYYY-MM-DD");
      }

    if (orgdata.enddate) {
        orgdata.enddate = moment(orgdata.enddate).format("YYYY-MM-DD");
    }

    axiosInstance({ method: 'POST', url: getAPIURL(constants.ADD_NEW_USERS_LIST_URL), data: orgdata }).then(function (response) {
        toastr.success('User Added Successfully');
        browserHistory.push('/administrationapp/users/view')
        window.location.reload()  
        callback();
        // dispatch(getUserList({
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
        if (error.response.status === 400) {
            dispatch(stopSubmit('addUsersPopUpForm', error.response.data));
        } else {
            toastr.error('Some Error Occurred')
        }
    });
}



export const updateUserDetails = (params,callback) => dispatch => {
    dispatch({
        type: 'LAYOUT/CHANGE_LOADER',
        payload: {
            loaderState: true,
        }
    });
    if (params.startdate) {
        params.startdate = moment(params.startdate).format("YYYY-MM-DD");
      }

    if (params.enddate) {
    params.enddate = moment(params.enddate).format("YYYY-MM-DD");
    }
    var deptdata = {
        firstname: params.firstname,
        lastname: params.lastname,
        email: params.email,
        usertypeid: params.usertypeid,
        // startdate: params.startdate,
        // enddate: params.enddate,
        usertitle: params.usertitle,
        city: params.city,
        schoolname: params.schoolname,
        // org: params.organization,
        isactive: true,                         
        modifiedby: params.modifiedby,
        modifiedon: new Date()
      
    }
    axiosInstance({ method: 'PUT', url: getAPIURL(constants.UPDATE_USER_DETAILS_URL, { ':UserId': params.UserId }), data: deptdata , data:params}).then(function (response) {
        toastr.success('User Details Updated Successfully'); 
        browserHistory.push('/administrationapp/users/view')
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