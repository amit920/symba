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
import createBrowserHistory from "history/createBrowserHistory";
const browserHistory = createBrowserHistory();

// import { internProjectDocumentsList } from '../projects/projects'

const awsConfig = {
  bucketName: constants.BUCKET_NAME, //PROD
  region: constants.AWS_REGION,
  accessKeyId: constants.AWS_ACCESS_KEY_ID,
  secretAccessKey: constants.AWS_ACCESS_SECRET_ID,
};

export const addOrganization = (params, callback) => (dispatch) => {
  dispatch({
    type: "LAYOUT/CHANGE_LOADER",
    payload: {
      loaderState: true,
    },
  });

  awsConfig.dirName = "logo";

  if (params.Type === "File") {
    var fileObj = new File([params.filelinkdata], params.filelinkdata.name, {
      type: params.filelinkdata.type,
    });

    uploadFile(fileObj, awsConfig)
      .then((data) => {
        var orgdata = {
          name: params.organizationname,
          logourl: data.location,
          isactive: true,
          createdby: params.createby,
          orgcommunityquote: params.orgcommunityquote,
        };
        axiosInstance({
          method: "POST",
          url: getAPIURL(constants.ADD_NEW_ORGANIZATION_URL, {}),
          data: orgdata,
        })
          .then((response) => {
            NotificationManager.success(
              "Organization Added Successfully",
              "Success",
              3000,
              null,
              null,
              ""
            );
            callback();
            dispatch(
              organizationList({
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
      name: params.organizationname,
      logourl: params.doclinkdata,
      isactive: true,
      createdby: params.createby,
      orgcommunityquote: params.orgcommunityquote,
    };
    axiosInstance({
      method: "POST",
      url: getAPIURL(constants.ADD_NEW_ORGANIZATION_URL, {}),
      data: orgdata,
    })
      .then((response) => {
        toastr.success("Organization Added Successfully");
        callback();

        dispatch(
          organizationList({
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
};

export const updateOrganization = (params, callback) => (dispatch) => {
  dispatch({
    type: "LAYOUT/CHANGE_LOADER",
    payload: {
      loaderState: true,
    },
  });
  awsConfig.dirName = "logo";

  if (params.Type === "File") {
    var fileObj = new File([params.filelinkdata], params.filelinkdata.name, {
      type: params.filelinkdata.type,
    });

    uploadFile(fileObj, awsConfig)
      .then((data) => {
        var orgdata = {
          name: params.organizationname,
          logourl: data.location,
          isactive: true,
          createdby: params.createby,
          orgcommunityquote: params.orgcommunityquote,
        };
        axiosInstance({
          method: "PUT",
          url: getAPIURL(constants.ORG_UPDATE_URL, { ":org_id": params.orgid }),
          data: orgdata,
        })
          .then(function (response) {
            NotificationManager.success(
              "Organization Update Successfully",
              "Success",
              3000,
              null,
              null,
              ""
            );
            callback();
            dispatch(
              organizationList({
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
              dispatch(stopSubmit("editOrgPopUpform", error.response.data));
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
      name: params.organizationname,
      isactive: true,
      createdby: params.createby,
      orgcommunityquote: params.orgcommunityquote,
    };
    axiosInstance({
      method: "PUT",
      url: getAPIURL(constants.ORG_UPDATE_URL, { ":org_id": params.orgid }),
      data: orgdata,
    })
      .then(function (response) {
        NotificationManager.success(
          "Organization Update Successfully",
          "Success",
          3000,
          null,
          null,
          ""
        );
        callback();

        dispatch(
          organizationList({
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
          dispatch(stopSubmit("editOrgPopUpform", error.response.data));
        } else {
          toastr.error("Some Error Occurred");
        }
      });
  }
};

export const organizationList = (params) => (dispatch) => {
  var data = {
    params: params,
  };
  axiosInstance
    .get(getAPIURL(constants.GET_ALL_ORGANIZATION_URL, {}), data)
    .then(function (response) {
      dispatch({
        type: "ORGANIZATION/OGANIZATION_LIST",
        payload: {
          orgList: response.data.Organizations,
          orgCount: response.data.count,
        },
      });
    })
    .catch(function (error) {
      toastr.error("Some Error Occurred");
    });
};

export const getOrganizationDetails = (organizationId) => (dispatch) => {
  axiosInstance
    .get(
      getAPIURL(constants.ORGANIZATION_DETAIL_URL, { ":id": organizationId })
    )
    .then(function (response) {
      dispatch({
        type: "ORGANIZATION/ORGANIZATION_DETAILS",
        payload: {
          organizationDetail: response.data,
        },
      });
    })
    .catch(function (error) {
      toastr.error("Some Error Occurred");
    });
};

export const clearOrganizationDetails = (organizationId, internId) => (
  dispatch
) => {
  dispatch({
    type: "ORGANIZATION/ORGANIZATION_DETAILS",
    payload: {
      organizationDetail: null,
    },
  });
};

export const editOrganizationDetails = (ordId, params) => (dispatch) => {
  dispatch({
    type: "LAYOUT/CHANGE_LOADER",
    payload: {
      loaderState: true,
    },
  });

  awsConfig.dirName = "Organization_logo";

  if (params.filelinkdata.name !== undefined) {
    var fileObj = new File([params.filelinkdata], params.filelinkdata.name, {
      type: params.filelinkdata.type,
    });

    uploadFile(fileObj, awsConfig)
      .then((data) => {
        var orgData = {
          name: params.name,
          address1: params.address1,
          address2: params.address2,
          city: params.city,
          zipcode: params.zipcode,
          state: params.state,
          country: params.countryid,
          website: params.website,
          logourl: data.location,
          primary_contact_person_name: params.primary_contact_person_contact,
          primary_contact_person_contact: params.primary_contact_person_contact,
          primary_contact_person_email: params.primary_contact_person_email,
          isactive: true,
          timezone: params.timezone,
          currency: params.currency,
          createdby: params.createdby,
          orgcommunityquote: params.orgcommunityquote,
        };
        axiosInstance({
          method: "PUT",
          url: getAPIURL(constants.ORG_UPDATE_URL, { ":org_id": ordId }),
          data: orgData,
        })
          .then((response) => {
            toastr.success("Organization updated Successfully");
            browserHistory.push("/#/superadmin/orgnization");
            window.location.reload();
            // dispatch(reset('addOrganizationForm'));
            dispatch(
              organizationList({
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
              dispatch(stopSubmit("addOrganizationForm", error.response.data));
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
    var orgData = {
      name: params.name,
      address1: params.address1,
      address2: params.address2,
      city: params.city,
      zipcode: params.zipcode,
      state: params.state,
      country: params.countryid,
      website: params.website,
      primary_contact_person_name: params.primary_contact_person_contact,
      primary_contact_person_contact: params.primary_contact_person_contact,
      primary_contact_person_email: params.primary_contact_person_email,
      isactive: true,
      timezone: params.timezone,
      currency: params.currency,
      createdby: params.createdby,
      orgcommunityquote: params.orgcommunityquote,
    };

    axiosInstance({
      method: "PUT",
      url: getAPIURL(constants.ORG_UPDATE_URL, { ":org_id": ordId }),
      data: orgData,
    })
      .then((response) => {
        toastr.success("Organization updated Successfully");

        browserHistory.push("/#/superadmin/orgnization");
        window.location.reload();
        dispatch(
          organizationList({
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
          dispatch(stopSubmit("addOrganizationForm", error.response.data));
        } else {
          toastr.error("Some Error Occurred");
        }
      });
  }
};

export const removeOrganizationSubmission = (org) => (dispatch) => {
  dispatch({
    type: "LAYOUT/CHANGE_LOADER",
    payload: {
      loaderState: true,
    },
  });

  axiosInstance({
    method: "DELETE",
    url: getAPIURL(constants.ORG_DELETE_URL, { ":org_id": org.org_id }),
    data: {},
  }).then(function (response) {
    toastr.success("Organization deleted successfully.");
    dispatch({
      type: "ORGANIZATION/REMOVE_ORGANIZATION",
      payload: {
        org: org,
      },
    });
  });
  dispatch({
    type: "LAYOUT/CHANGE_LOADER",
    payload: {
      loaderState: false,
    },
  });
  // .catch(error => {
  //     toastr.error('Some Error Occurred');
  //     dispatch({
  //         type: 'LAYOUT/CHANGE_LOADER',
  //         payload: {
  //             loaderState: false,
  //         }
  //     });
  // }
  // );;
};
export const getCategoryList = (organization) => (dispatch) => {
  axiosInstance
    .get(getAPIURL(constants.GET_CATEGORY_LIST_URL, { ":org": organization }))
    .then(function (response) {
      dispatch({
        type: "ORGANIZATION/CATEGORY_LIST",
        payload: {
          categoryList: response.data.category,
          categoryCount: response.data.count,
        },
      });
    })
    .catch(function (error) {
      toastr.error("Some Error Occurred");
    });
};




export const getorganizationList_for_Orgddl = (filterObj) => dispatch => {

    var data = {
        params: filterObj,
    }
    axiosInstance.get(getAPIURL(constants.GET_ALL_ORGANIZATION_LIST_URL, {}), data).then(function (response) {
        dispatch({
            type: 'ORGANIZATION/ALL_OGANIZATION_LIST',
            payload: {
                organizationList: response.data.Organizations,
               
            }
        });
    }).catch(function (error) {
        // toastr.error('Some Error Occurred')
    });
}