import axiosInstance from "../../utils/axiosApi";
// import _ from "lodash";
import * as constants from "../../utils/constants";
import { getAPIURL } from "../../utils/getApiUrl";
// import checkAlreadyLogin from "../../utils/checkAlreadyLogin";
import { toastr } from "react-redux-toastr";
import { stopSubmit } from "redux-form";
// import { browserHistory } from 'react-router';
import { uploadFile } from "react-s3";
import { NotificationManager } from "../../components/common/react-notifications";
import createBrowserHistory from "history/createBrowserHistory";
const browserHistory = createBrowserHistory();
const awsConfig = {
  bucketName: constants.BUCKET_NAME, //PROD
  region: constants.AWS_REGION,
  accessKeyId: constants.AWS_ACCESS_KEY_ID,
  secretAccessKey: constants.AWS_ACCESS_SECRET_ID,
};

export const launchpadResourcesDocumentsList = (filterObj) => (dispatch) => {
  var data = {
    params: filterObj,
  };
  axiosInstance
    .get(
      getAPIURL(constants.LAUNCHPAD_OVERVIEW_RESOURCES_DOCUMENT_DETAIL_URL, {}),
      data
    )
    .then(function (response) {
      dispatch({
        type: "LAUNCHPAD/OVERVIEW_RESOURCES_DOCUMENT_LIST",
        payload: {
          resourcesList: response.data.resources,
          resourcesCount: response.data.count,
        },
      });
    })
    .catch(function (error) {
      browserHistory.push("/unauthorizedpage");
      window.location.reload(false);
    });
};

export const addOverviewResources = (orgId, params, callback) => (dispatch) => {
  dispatch({
    type: "LAYOUT/CHANGE_LOADER",
    payload: {
      loaderState: true,
    },
  });

  awsConfig.dirName = orgId + "/" + params.departmentid;
  if (params.Type === "File") {
    var fileObj = new File([params.filelinkdata], params.filelinkdata.name, {
      type: params.filelinkdata.type,
    });

    uploadFile(fileObj, awsConfig)
      .then((data) => {
        var Resourcesdata = {
          resource_title: params.resource_title,
          resource_description: params.resource_description,
          Type: params.Type,
          resource_link: data.location,
          isactive: true,
          org: orgId,
          departmentid: params.departmentid,
          createdby: params.createdby,
        };
        axiosInstance({
          method: "POST",
          url: getAPIURL(
            constants.LAUNCHPAD_OVERVIEW_RESOURCES_DOCUMENT_SUBMISSIONS_CREATE_URL,
            {}
          ),
          data: Resourcesdata,
        })
          .then((response) => {
            NotificationManager.success(
              "Resources and Document Added Successfully.",
              "success",
              3000,
              null,
              null,
              ""
            );
            callback();
            dispatch(
              launchpadResourcesDocumentsList({
                deptid: params.departmentid,
                orgid: orgId,
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
              dispatch(
                stopSubmit(
                  "addlaunchpadResourcesDocumentForm",
                  error.response.data
                )
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
      })
      .catch((err) => {
        NotificationManager.error(
          "Some Error Occurred",
          "Error",
          3000,
          null,
          null,
          ""
        );
        dispatch({
          type: "LAYOUT/CHANGE_LOADER",
          payload: {
            loaderState: false,
          },
        });
      });
  } else {
    var Resourcesdata = {
      resource_title: params.resource_title,
      resource_description: params.resource_description,
      Type: params.Type,
      resource_link: params.resource_link,
      isactive: true,
      org: orgId,
      departmentid: params.departmentid,
      createdby: params.createdby,
    };
    axiosInstance({
      method: "POST",
      url: getAPIURL(
        constants.LAUNCHPAD_OVERVIEW_RESOURCES_DOCUMENT_SUBMISSIONS_CREATE_URL,
        {}
      ),
      data: Resourcesdata,
    })
      .then((response) => {
        NotificationManager.success(
          "Resources and Document Added Successfully.",
          "success",
          3000,
          null,
          null,
          ""
        );
        callback();
        dispatch(
          launchpadResourcesDocumentsList({
            deptid: params.departmentid,
            orgid: orgId,
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
          dispatch(
            stopSubmit("addlaunchpadResourcesDocumentForm", error.response.data)
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
  }
};

export const removeResourcesSubmission = (resources) => (dispatch) => {
  axiosInstance({
    method: "DELETE",
    url: getAPIURL(constants.LAUNCHPAD_RESOURCES_DOCUMENT_DELETE_URL, {
      ":resource_id": resources.Resourceid,
    }),
    data: {},
  })
    .then(function (response) {
      NotificationManager.success(
        "Resource deleted successfully.",
        "Success",
        3000,
        null,
        null,
        ""
      );
      dispatch({
        type: "ORGANIZATION/REMOVE_OVERVIEW_RESOURCES_DOCUMENT",
        payload: {
          resources: resources,
        },
      });
    })
    .catch((error) => {
      NotificationManager.error(
        "Some Error Occurred",
        "Erroe",
        3000,
        null,
        null,
        ""
      );
    });
};

// export const addOrganization = (params,callback) => dispatch => {
//     dispatch({
//         type: 'LAYOUT/CHANGE_LOADER',
//         payload: {
//             loaderState: true,
//         }
//     });
//     var orgdata = {
//         name: params.organizationname,
//         isactive: true,
//         createdby: params.createby,

//     }
//     axiosInstance({ method: 'POST', url: getAPIURL(constants.ADD_NEW_ORGANIZATION_URL), data: orgdata }).then(function (response) {
//         toastr.success('Ooganization Added Successfully');
//        // browserHistory.push('/Admin/AddOrganization')
//         callback();
//         // dispatch(reset('editOverviewResourcesDocumentForm'));
//         dispatch(organizationList({
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

//         if (error.response.status === 400) {
//             dispatch(stopSubmit('addOrgPopUpform', error.response.data));
//         } else {
//             toastr.error('Some Error Occurred')
//         }
//     });
// }

//

// export const updateOrganization = (params,callback) => dispatch => {
//     dispatch({
//         type: 'LAYOUT/CHANGE_LOADER',
//         payload: {
//             loaderState: true,
//         }
//     });
//     var orgdata = {
//         name: params.organizationname,
//         orgid: params.orgid,
//         isactive: true,
//         modifiedby: params.createby,
//         modifiedon: new Date()

//     }
//     axiosInstance({ method: 'PUT', url: getAPIURL(constants.ORG_UPDATE_URL, { ':org_id': params.orgid }), data: orgdata }).then(function (response) {
//         toastr.success('Organization Updated Successfully');
//         callback();
//         dispatch(organizationList({

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

//         if (error.response.status === 400) {
//             dispatch(stopSubmit('editOrgPopUpform', error.response.data));
//         } else {
//             toastr.error('Some Error Occurred')
//         }
//     });
// }

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
  }).catch((error) => {
    toastr.error("Some Error Occurred");
    dispatch({
      type: "LAYOUT/CHANGE_LOADER",
      payload: {
        loaderState: false,
      },
    });
  });
};

export const updateOverviewResources =
  (orgId, params, callback) => (dispatch) => {
    dispatch({
      type: "LAYOUT/CHANGE_LOADER",
      payload: {
        loaderState: true,
      },
    });

    awsConfig.dirName = orgId;
    if (params.Type === "File") {
      var fileObj = new File([params.filelinkdata], params.filelinkdata.name, {
        type: params.filelinkdata.type,
      });
      uploadFile(fileObj, awsConfig)
        .then((data) => {
          var documentdata = {
            resource_title: params.resource_title,
            resource_description: params.resource_description,
            Type: params.Type,
            resource_link: data.location,
            isactive: true,
            org: orgId,
            departmentid: params.departmentid,
            createdby: params.createdby,
            Resourceid: params.Resourceid,
          };
          axiosInstance({
            method: "PUT",
            url: getAPIURL(
              constants.LAUNCHPAD_OVERVIEW_RESOURCES_DOCUMENT_UPDATE_URL,
              { ":resource_id": params.Resourceid }
            ),
            data: documentdata,
          })
            .then((response) => {
              NotificationManager.success(
                "Resources updated Successfully",
                "success",
                3000,
                null,
                null,
                ""
              );

              callback();
              dispatch(
                launchpadResourcesDocumentsList({
                  deptid: params.departmentid,
                  orgid: orgId,
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
                dispatch(
                  stopSubmit(
                    "editLaunchpadResourcesDocumentForm",
                    error.response.data
                  )
                );
              } else {
                NotificationManager.error(
                  "Some Error Occurred.",
                  "Error",
                  3000,
                  null,
                  null,
                  ""
                );
              }
            });
        })
        .catch((err) => {
          NotificationManager.error(
            "Some Error Occurred.",
            "Error",
            3000,
            null,
            null,
            ""
          );
          dispatch({
            type: "LAYOUT/CHANGE_LOADER",
            payload: {
              loaderState: false,
            },
          });
        });
    } else {
      var documentdata = {
        resource_title: params.resource_title,
        resource_description: params.resource_description,
        Type: params.Type,
        resource_link: params.doclinkdata,
        isactive: true,
        org: orgId,
        departmentid: params.departmentid,
        createdby: params.createdby,
        Resourceid: params.Resourceid,
      };

      axiosInstance({
        method: "PUT",
        url: getAPIURL(
          constants.LAUNCHPAD_OVERVIEW_RESOURCES_DOCUMENT_UPDATE_URL,
          { ":resource_id": params.Resourceid }
        ),
        data: documentdata,
      })
        .then((response) => {
          NotificationManager.success(
            "Resources updated Successfully",
            "success",
            3000,
            null,
            null,
            ""
          );
          callback();
          dispatch(
            launchpadResourcesDocumentsList({
              deptid: params.departmentid,
              orgid: orgId,
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
            dispatch(
              stopSubmit(
                "editLaunchpadResourcesDocumentForm",
                error.response.data
              )
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
    }
  };

export const addlaunchpadoverview = (ordId, params, callback) => (dispatch) => {
  dispatch({
    type: "LAYOUT/CHANGE_LOADER",
    payload: {
      loaderState: true,
    },
  });
  awsConfig.dirName = ordId;
  if ( params.richtextdiscription === '' )
  {
   var description=params.launchpaddescription
  }
  else{
     description=params.richtextdiscription
  }
  if (params.Type === "File") {
    var fileObj = new File([params.filelinkdata], params.filelinkdata.name, {
      type: params.filelinkdata.type,
    });

    uploadFile(fileObj, awsConfig)
      .then((data) => {
        var documentdata = {
          types: params.Type,
          videourl: data.location,
          // overviewdescription: params.launchpaddescription,
          deptid: params.deparmentid,
          isactive: true,
          org: ordId,
          createdby: params.createby,
          overviewdescription: description,
        };
        axiosInstance({
          method: "POST",
          url: getAPIURL(
            constants.LAUNCHPAD_OVERVIEW_SUBMISSIONS_CREATE_URL,
            {}
          ),
          data: documentdata,
        })
          .then((response) => {
            toastr.success("Overview Details Added Successfully");
            browserHistory.push("/app/admin/launchpad");
            window.location.reload();
            callback();
            // dispatch(reset('addProjectSubmissionForm'));
            // dispatch(internProjectDocumentsList({
            //     orgid: ordId,

            // }));

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
              // dispatch(stopSubmit('addProjectSubmissionForm', error.response.data));
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
    var documentdata = {
      // documentname: params.DocumentName,
      types: params.Type,
      videourl: params.doclinkdata,
      isactive: true,
      org: ordId,
      deptid: params.deparmentid,
      createdby: params.createby,
      overviewdescription: description,

    };
    axiosInstance({
      method: "POST",
      url: getAPIURL(constants.LAUNCHPAD_OVERVIEW_SUBMISSIONS_CREATE_URL, {}),
      data: documentdata,
    })
      .then((response) => {
        toastr.success("Overview Details Added Successfully");
        browserHistory.push("/app/admin/launchpad");
        window.location.reload();
        callback();
        // dispatch(reset('addProjectSubmissionForm'));
        // dispatch(internProjectDocumentsList({
        //     orgid: ordId,

        // }));
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
        //     dispatch(stopSubmit('addProjectDocumentForm', error.response.data));
        // } else {
        //     toastr.error('Some Error Occurred')
        // }
      });
  }
};

export const getAdminLaunchpadDetails = (filterObj) => (dispatch) => {
  var data = {
    params: filterObj,
  };
  axiosInstance
    .get(getAPIURL(constants.ADMIN_LAUNCHPAD_ORG_OVERVIEW_DETAIL_URL, {}), data)
    .then(function (response) {
      dispatch({
        type: "LAUNCHPAD/ORG_OVERVIEW_LIST",
        payload: {
          LaunchpadDetail: response.data,
        },
      });
    })
    .catch(function (error) {
      toastr.error("Some Error Occurred");
    });
};
