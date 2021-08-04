import axiosInstance from "../../utils/axiosApi";
// import _ from 'lodash';
import * as constants from '../../utils/constants';
import { getAPIURL } from '../../utils/getApiUrl';
// import checkAlreadyLogin from '../../utils/checkAlreadyLogin';
import { toastr } from 'react-redux-toastr';
import createBrowserHistory from 'history/createBrowserHistory';
const browserHistory = createBrowserHistory();


export const getBioQuestionList = (filterObj) => dispatch => {
    var data = {
        params: filterObj,
    }
    axiosInstance.get(getAPIURL(constants.GET_ALL_BIO_QUESTIONS_LIST_URL, {}), data).then(function (response) {
        dispatch({
            type: 'BIOQUESTION/BIOQUESTION_LIST',
            payload: {
                bioquestionList: response.data.bioquestion,
                bioquestionCount: response.data.count,
            }
        });
    }).catch(function (error) {
        // toastr.error('Some Error Occurred')
    });
}


export const addBioQuestion = (params,callback) => dispatch => {
    dispatch({
        type: 'LAYOUT/CHANGE_LOADER',
        payload: {
            loaderState: true,
        }
    });  
    var orgdata = {
        questiontext: params.questiontext,
        org:params.organization,
        usertype_id:params.usertype_id,
        isactive: true,                         
        createdby: params.createby,      
    }
    axiosInstance({ method: 'POST', url: getAPIURL(constants.ADD_NEW_BIO_QUESTIONS_LIST_URL), data: orgdata }).then(function (response) {
        toastr.success('Bio Questions Added Successfully');
        callback();
        dispatch(getBioQuestionList({
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


export const getBioQuestionDetails = (Questionmasterid) => dispatch => {   
    var data = {
    }
    axiosInstance.get(getAPIURL(constants.BIO_QUESTIONS_LIST_DETAIL_URL, { ':id': Questionmasterid }), data).then(function (response) {
        dispatch({
            type: 'QUESTION/QUESTION_DETAILS',
            payload: {
                bioQuestionDetail: response.data
            }
        });
    }).catch(function (error) {
        toastr.error('Some Error Occurred')
    });
}


export const updateBioQuestionDetails = (params,callback) => dispatch => {
    // alert(params.deptId)
    dispatch({
        type: 'LAYOUT/CHANGE_LOADER',
        payload: {
            loaderState: true,
        }
    });
    var deptdata = {
        questiontext: params.questiontext,
        // org: params.organization,
        isactive: true,                         
        modifiedby: params.createby,
        modifiedon: new Date()
      
    }
    axiosInstance({ method: 'PUT', url: getAPIURL(constants.UPDATE_BIO_QUESTIONS_LIST_URL, { ':Questionmasterid': params.Questionmasterid }), data: deptdata }).then(function (response) {
        toastr.success('Bio Questions Updated Successfully'); 
        browserHistory.push('/administrationapp/bioquestion/view')
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


export const deleteBioQuestion = (bioQ) => dispatch => {    
    dispatch(
        {
        type: 'LAYOUT/CHANGE_LOADER',
        payload: {
            loaderState: true,
        },
        
    });

    axiosInstance({ method: 'DELETE', url: getAPIURL(constants.BIO_QUESTION_DELETE_URL, {':Questionmasterid': bioQ.Questionmasterid}), data: {} }).then(function (response) {
    toastr.success('BioQuestion deleted successfully');

        dispatch({
            type: 'BIOQUESTION/REMOVE_BIOQUESTION',
            payload: {
                bioQ: bioQ
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
