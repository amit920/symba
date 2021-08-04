import axiosInstance from "../../utils/axiosApi";
// import _ from "lodash";
import * as constants from "../../utils/constants";
import { getAPIURL } from "../../utils/getApiUrl";
// import checkAlreadyLogin from "../../utils/checkAlreadyLogin";
import { toastr } from "react-redux-toastr";
// import { getBase64, getFileName } from "../../utils/globalFunctions";
import { uploadFile } from "react-s3";
import { stopSubmit, reset } from "redux-form";
import moment from "moment";
import { NotificationManager } from "../../components/common/react-notifications";
import createBrowserHistory from "history/createBrowserHistory";
const browserHistory = createBrowserHistory();

const awsConfig = {
  bucketName: constants.BUCKET_NAME,
  region: constants.AWS_REGION,
  accessKeyId: constants.AWS_ACCESS_KEY_ID,
  secretAccessKey: constants.AWS_ACCESS_SECRET_ID,
};

export const deleteIntern = (Id) => (dispatch) => {
  dispatch({
    type: "LAYOUT/CHANGE_LOADER",
    payload: {
      loaderState: true,
    },
  });

  axiosInstance({
    method: "DELETE",
    url: getAPIURL(constants.ASSIGN_INTERN_DELETE_URL, { ":id": Id }),
    data: {},
  }).then(function (response) {
    NotificationManager.success(
      "User removed successfully",
      "Delete success",
      3000,
      null,
      null,
      ""
    );
    window.location.reload(false);
    // dispatch({
    //     type: 'ORGANIZATION/REMOVE_OVERVIEW_RESOURCES_DOCUMENT',
    //     payload: {
    //         resources: resources
    //     }
    // });
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
  // });;
};
export const getProjectList = (paramsObj) => (dispatch) => {
  var data = {
    params: paramsObj,
  };
  axiosInstance
    .get(getAPIURL(constants.MANAGER_PROJECT_LIST_URL, {}), data)
    .then(function (response) {
      dispatch({
        type: "PROJECTS/PROJECTS_LIST",
        payload: {
          projectList: response.data.projects,
          projetsCount: response.data.count,
        },
      });
    })
    .catch(function (error) {
      toastr.error("Some Error Occurred");
    });
};

export const assignNewInterns = (projectId, params, callback) => (dispatch) => {
  dispatch({
    type: "LAYOUT/CHANGE_LOADER",
    payload: {
      loaderState: true,
    },
  });
  axiosInstance({
    method: "POST",
    url: getAPIURL(constants.ASSIGN_NEW_PROJECT_USERS_URL, {}),
    data: params,
  })
    .then(function (response) {
      NotificationManager.success(
        "Users assigned successfully",
        "Success",
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
      var new_params = {
        projectid: params.project,
        orgid: params.org,
        user_id: params.user_id,
      };

      dispatch(getAssignedInternList(new_params));
      callback();
    })
    .catch((error) => {
      toastr.error("Some Error Occurred");
    });
};
export const deleteResource = (resourceId) => (dispatch) => {
  dispatch({
    type: "LAYOUT/CHANGE_LOADER",
    payload: {
      loaderState: true,
    },
  });

  axiosInstance({
    method: "DELETE",
    url: getAPIURL(constants.MANAGER_RESOURCE_DELETE_URL, {
      ":id": resourceId,
    }),
    data: {},
  }).then(function (response) {
    NotificationManager.success(
      "Resource Delete Successfully",
      "Delete success",
      3000,
      null,
      null,
      ""
    );
    window.location.reload(false);
    // dispatch({
    //     type: 'ORGANIZATION/REMOVE_OVERVIEW_RESOURCES_DOCUMENT',
    //     payload: {
    //         resources: resources
    //     }
    // });
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
  // });;
};

// export const giveRatingToproject = (params,callback) => dispatch => {

//     axiosInstance({ method: 'PUT', url: getAPIURL(constants.INTERN_PROJECT_REVIEW_URL, {}), data: params }).then(function (response) {
//         toastr.success('Feedback Submission updated Successfully');
//         browserHistory.push('/supervisor/interns')
//     }).catch(error => {

//             toastr.error('Some Error Occurred')

//     });
// }

// export const filterProjectList = (filterObj) => dispatch => {

//     console.log(filterObj)
//     var data = {
//         params: filterObj,
//     }
//     axiosInstance.get(getAPIURL(constants.SUPERVISOR_PROJECT_LIST_URL, {}), data).then(function (response) {
//         dispatch({
//             type: 'PROJECTS/PROJECTS_LIST',
//             payload: {
//                 projectList: response.data.projects,
//                 projetsCount: response.data.count,
//             }
//         });
//     }).catch(function (error) {
//         toastr.error('Some Error Occurred')
//     });
// }

// export const getFeedbackStatus = (filterObj) => dispatch => {

//     console.log(filterObj)
//     var data = {
//         params: filterObj,
//     }
//     axiosInstance.get(getAPIURL(constants.PROJECT_REVIEW_STATUS_URL, {}), data).then(function (response) {
//         dispatch({
//             type: 'PROJECTS/INTERN_PROJECTS_FEEDBACK_STATUS',
//             payload: {
//                 FeedbackStatus: response.data,

//             }
//         });
//     }).catch(function (error) {
//         toastr.error('Some Error Occurred')
//     });
// }

// export const getInternProjectList = (paramsObj) => dispatch => {
//     var data = {
//         params: paramsObj,
//     }
//     axiosInstance.get(getAPIURL(constants.SUPERVISOR_PROJECT_LIST_URL, {}), data).then(function (response) {
//         dispatch({
//             type: 'PROJECTS/INTERN_PROJECTS_LIST',
//             payload: {
//                 projectList: response.data.projects,
//                 projetsCount: response.data.count
//             }
//         });
//     }).catch(function (error) {
//         toastr.error('Some Error Occurred')
//     });
// }

// export const filterInternProjectList = (filterObj) => dispatch => {

//     console.log(filterObj)
//     var data = {
//         params: filterObj,
//     }
//     axiosInstance.get(getAPIURL(constants.SUPERVISOR_PROJECT_LIST_URL, {}), data).then(function (response) {
//         dispatch({
//             type: 'PROJECTS/INTERN_PROJECTS_LIST',
//             payload: {
//                 projectList: response.data.projects,
//                 projetsCount: response.data.count,
//             }
//         });
//     }).catch(function (error) {
//         toastr.error('Some Error Occurred')
//     });
// }

export const addProject = (projectData, callback) => (dispatch) => {
  dispatch({
    type: "LAYOUT/CHANGE_LOADER",
    payload: {
      loaderState: true,
    },
  });

  if (projectData.duedate) {
    projectData.duedate = moment(projectData.duedate).format("YYYY-MM-DD");
  }

  axiosInstance({
    method: "POST",
    url: getAPIURL(constants.ADD_PROJECT_DETAIL_URL),
    data: projectData,
  })
    .then(function (response) {
      NotificationManager.success(
        "Project Added Successfully",
        "success",
        3000,
        null,
        null,
        ""
      );
      browserHistory.push("/managerapp/project/edit/" + response.data);
      window.location.reload(false);

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
        dispatch(stopSubmit("addProjectPopUpForm", error.response.data));
      } else {
        toastr.error("Some Error Occurred");
      }
    });
};
export const getAssignedInternList = (params) => (dispatch) => {
  var data = {
    params: params,
  };
  axiosInstance
    .get(getAPIURL(constants.USER_LIST_URL, {}), data)
    .then(function (response) {
      dispatch({
        type: "PROJECTS/ASSIGNED_INTERN_LIST",
        payload: {
          assignedInternList: response.data.users,
          assignedInternsCount: response.data.count,
        },
      });
    })
    .catch(function (error) {
      toastr.error("Some Error Occurred");
    });
};
export const addProjectResources =
  (projectId, ordId, params, callback) => (dispatch) => {
    dispatch({
      type: "LAYOUT/CHANGE_LOADER",
      payload: {
        loaderState: true,
      },
    });

    awsConfig.dirName = projectId;

    if (params.Type === "File") {
      var fileObj = new File([params.filelinkdata], params.filelinkdata.name, {
        type: params.filelinkdata.type,
      });

      uploadFile(fileObj, awsConfig)
        .then((data) => {
          var documentdata = {
            documentname: params.documentname,
            documentdescription: params.resource_description,
            pdfurl: params.Type,
            sourceurl: data.location,
            isactive: true,
            project: projectId,
            org: ordId,
            createby: params.createby,
          };
          axiosInstance({
            method: "POST",
            url: getAPIURL(constants.DOCUMENT_CREATE_URL, {}),
            data: documentdata,
          })
            .then((response) => {
              NotificationManager.success(
                "Project Resource Added Successfully",
                "Success",
                3000,
                null,
                null,
                ""
              );
              callback();
              dispatch(reset("resourcesAssignPopUpForm"));
              dispatch(
                getProjectDocumentsList({
                  orgid: ordId,
                  // limit_size: constants.DEFAULT_LIMIT_SIZE,
                  // limit_start: 0,
                  projectid: projectId,
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
                  stopSubmit("resourcesAssignPopUpForm", error.response.data)
                );
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
        documentname: params.documentname,
        documentdescription: params.resource_description,
        pdfurl: params.Type,
        sourceurl: params.doclinkdata,
        isactive: true,
        project: projectId,
        org: ordId,
        createby: params.createby,
      };
      axiosInstance({
        method: "POST",
        url: getAPIURL(constants.DOCUMENT_CREATE_URL, {}),
        data: documentdata,
      })
        .then((response) => {
          NotificationManager.success(
            "Project Resource Added Successfully",
            "Success",
            3000,
            null,
            null,
            ""
          );
          callback();
          dispatch(reset("resourcesAssignPopUpForm"));
          dispatch(
            getProjectDocumentsList({
              orgid: ordId,
              projectid: projectId,
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
              stopSubmit("resourcesAssignPopUpForm", error.response.data)
            );
          } else {
            toastr.error("Some Error Occurred");
          }
        });
    }
  };

export const getProjectDocumentsList = (params) => (dispatch) => {
  var data = {
    params: params,
  };
  axiosInstance
    .get(getAPIURL(constants.DOCUMENT_LIST_URL, {}), data)
    .then(function (response) {
      dispatch({
        type: "PROJECTS/ASSIGNED_DOCUMENTS_LIST",
        payload: {
          documents: response.data.documents,
          count: response.data.count,
        },
      });
    })
    .catch(function (error) {
      toastr.error("Some Error Occurred");
    });
};

export const editProject = (projectId, projectData) => (dispatch) => {
  dispatch({
    type: "LAYOUT/CHANGE_LOADER",
    payload: {
      loaderState: true,
    },
  });

  if (projectData.duedate) {
    projectData.duedate = moment(projectData.duedate).format("YYYY-MM-DD");
  }

  axiosInstance({
    method: "POST",
    url: getAPIURL(constants.UPDATE_PROJECT_DETAILS_URL, { ":id": projectId }),
    data: projectData,
  })
    .then(function (response) {
      NotificationManager.success(
        "Project updated Successfully",
        "Success",
        3000,
        null,
        null,
        ""
      );
      dispatch(reset("addEditProjectForm"));
      window.location.reload(false);
      dispatch({
        type: "LAYOUT/CHANGE_LOADER",
        payload: {
          loaderState: false,
        },
      });
    })
    .catch((error) => {
      if (error.response.status === 400) {
        dispatch(stopSubmit("addEditProjectForm", error.response.data));
      } else {
        toastr.error("Some Error Occurred");
      }
    });
};

export const updateProjectResource =
  (projectId, ordId, params, callback) => (dispatch) => {
    dispatch({
      type: "LAYOUT/CHANGE_LOADER",
      payload: {
        loaderState: true,
      },
    });
    awsConfig.dirName = projectId;

    if (params.Type === "File") {
      var fileObj = new File([params.filelinkdata], params.filelinkdata.name, {
        type: params.filelinkdata.type,
      });

      uploadFile(fileObj, awsConfig)
        .then((data) => {
          var documentdata = {
            documentname: params.resource_title,
            documentdescription: params.resource_description,
            pdfurl: params.Type,
            sourceurl: data.location,
            isactive: true,
            project: projectId,
            org: ordId,
            modifiedby: params.createby,
          };
          axiosInstance({
            method: "PUT",
            url: getAPIURL(constants.DOCUMENT_UPDATE_URL, {
              ":documentId": params.documentId,
            }),
            data: documentdata,
          })
            .then((response) => {
              NotificationManager.success(
                "Project Resource updated Successfully",
                "Success",
                3000,
                null,
                null,
                ""
              );
              callback();
              dispatch(
                getProjectDocumentsList({
                  orgid: ordId,
                  projectid: projectId,
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
                    "editResourcesAssignPopUpForm",
                    error.response.data
                  )
                );
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
        documentname: params.resource_title,
        documentdescription: params.resource_description,
        pdfurl: params.Type,
        sourceurl: params.doclinkdata,
        isactive: true,
        project: projectId,
        org: ordId,
        modifiedby: params.createby,
      };
      axiosInstance({
        method: "PUT",
        url: getAPIURL(constants.DOCUMENT_UPDATE_URL, {
          ":documentId": params.documentId,
        }),
        data: documentdata,
      })
        .then((response) => {
          NotificationManager.success(
            "Project Resource updated Successfully",
            "Success",
            3000,
            null,
            null,
            ""
          );
          callback();
          dispatch(
            getProjectDocumentsList({
              orgid: ordId,

              projectid: projectId,
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
              stopSubmit("editResourcesAssignPopUpForm", error.response.data)
            );
          } else {
            toastr.error("Some Error Occurred");
          }
        });
    }
  };
// inter project
export const getInternProjectList = (paramsObj) => (dispatch) => {
  var data = {
    params: paramsObj,
  };
  axiosInstance
    .get(getAPIURL(constants.INTERN_PROJECT_LIST_URL, {}), data)
    .then(function (response) {
      dispatch({
        type: "PROJECTS/INTERN_PROJECTS_LIST",
        payload: {
          internProjectList: response.data.projects,
          internProjectCount: response.data.count,
        },
      });
    })
    .catch(function (error) {
      toastr.error("Some Error Occurred");
    });
};

export const addInternProjectSubmission =
  (notifactionsecret, projectId, ordId, params, callback) => (dispatch) => {
    dispatch({
      type: "LAYOUT/CHANGE_LOADER",
      payload: {
        loaderState: true,
      },
    });

    awsConfig.dirName = projectId + "/" + params.intern;
    if (params.Type === "File") {
      var fileObj = new File([params.filelinkdata], params.filelinkdata.name, {
        type: params.filelinkdata.type,
      });

      uploadFile(fileObj, awsConfig)
        .then((data) => {
          var documentdata = {
            documentname: params.documentname,
            documentdescription: params.documentdescription,
            pdfurl: params.Type,
            sourceurl: data.location,
            isactive: true,
            project: projectId,
            org: ordId,
            createdby: params.createdby,
            intern: params.intern,
            notifactionsecret,
          };
          axiosInstance({
            method: "POST",
            url: getAPIURL(constants.INTERN_PROJECT_SUBMISSIONS_CREATE_URL, {}),
            data: documentdata,
          })
            .then((response) => {
              NotificationManager.success(
                "Project Document Added Successfully",
                "Success",
                3000,
                null,
                null,
                ""
              );
              callback();
              dispatch(reset("internResourcesSubmissionPopUpForm"));
              dispatch(
                internProjectDocumentsList({
                  orgid: ordId,

                  projectid: projectId,
                  internid: params.intern,
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
                    "internResourcesSubmissionPopUpForm",
                    error.response.data
                  )
                );
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
        documentname: params.documentname,
        documentdescription: params.documentdescription,
        pdfurl: params.Type,
        sourceurl: params.doclinkdata,
        isactive: true,
        project: projectId,
        org: ordId,
        createdby: params.createdby,
        intern: params.intern,
        notifactionsecret: params.notifactionsecret,
      };
      axiosInstance({
        method: "POST",
        url: getAPIURL(constants.INTERN_PROJECT_SUBMISSIONS_CREATE_URL, {}),
        data: documentdata,
      })
        .then((response) => {
          toastr.success("Project Document created Successfully");
          callback();
          dispatch(reset("internResourcesSubmissionPopUpForm"));
          dispatch(
            internProjectDocumentsList({
              orgid: ordId,

              projectid: projectId,
              internid: params.intern,
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
                "internResourcesSubmissionPopUpForm",
                error.response.data
              )
            );
          } else {
            toastr.error("Some Error Occurred");
          }
        });
    }
  };
export const internProjectDocumentsList = (filterObj) => (dispatch) => {
  console.log(filterObj);
  var data = {
    params: filterObj,
  };
  axiosInstance
    .get(getAPIURL(constants.INTERN_PROJECT_DOCUMENTS_URL, {}), data)
    .then(function (response) {
      dispatch({
        type: "PROJECTS/INTERN_PROJECTS_DOCUMENT_LIST",
        payload: {
          assignedInternDocuments: response.data.documents,
          assignedInternDocumentsCount: response.data.count,
        },
      });
    })
    .catch(function (error) {
      toastr.error("Some Error Occurred");
    });
};
export const updateInternProjectSubmission =
  (projectId, ordId, params, callback) => (dispatch) => {
    dispatch({
      type: "LAYOUT/CHANGE_LOADER",
      payload: {
        loaderState: true,
      },
    });

    awsConfig.dirName = projectId + "/" + params.intern;
    console.log(callback);
    if (params.Type === "File") {
      var fileObj = new File([params.filelinkdata], params.filelinkdata.name, {
        type: params.filelinkdata.type,
      });
      uploadFile(fileObj, awsConfig)
        .then((data) => {
          var documentdata = {
            documentname: params.resource_title,
            documentdescription: params.resource_description,
            pdfurl: params.Type,
            sourceurl: data.location,
            isactive: true,
            project: projectId,
            org: ordId,
            modifiedby: params.createdby,
            intern: params.intern,
          };
          axiosInstance({
            method: "PUT",
            url: getAPIURL(constants.INTERN_PROJECT_SUBMISSIONS_UPDATE_URL, {
              ":document_id": params.documentId,
            }),
            data: documentdata,
          })
            .then((response) => {
              NotificationManager.success(
                "Project Resource updated Successfully",
                "Success",
                3000,
                null,
                null,
                ""
              );
              callback();
              dispatch(reset("editResourcesAssignPopUpForm"));
              dispatch(
                internProjectDocumentsList({
                  orgid: ordId,
                  projectid: projectId,
                  internid: params.intern,
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
                    "editResourcesAssignPopUpForm",
                    error.response.data
                  )
                );
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
        documentname: params.resource_title,
        documentdescription: params.resource_description,
        pdfurl: params.Type,
        sourceurl: params.doclinkdata,
        isactive: true,
        project: projectId,
        org: ordId,
        modifiedby: params.createdby,
        intern: params.intern,
      };

      axiosInstance({
        method: "PUT",
        url: getAPIURL(constants.INTERN_PROJECT_SUBMISSIONS_UPDATE_URL, {
          ":document_id": params.documentId,
        }),
        data: documentdata,
      })
        .then((response) => {
          NotificationManager.success(
            "Project Resource updated Successfully",
            "Success",
            3000,
            null,
            null,
            ""
          );
          callback();
          dispatch(reset("editResourcesAssignPopUpForm"));
          dispatch(
            internProjectDocumentsList({
              orgid: ordId,

              projectid: projectId,
              internid: params.intern,
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
              stopSubmit("editResourcesAssignPopUpForm", error.response.data)
            );
          } else {
            toastr.error("Some Error Occurred");
          }
        });
    }
  };
export const deleteInternResource = (docId) => (dispatch) => {
  dispatch({
    type: "LAYOUT/CHANGE_LOADER",
    payload: {
      loaderState: true,
    },
  });

  axiosInstance({
    method: "DELETE",
    url: getAPIURL(constants.INTERN_RESOURCE_DELETE_URL, { ":id": docId }),
    data: {},
  }).then(function (response) {
    NotificationManager.success(
      "Resource Delete Successfully",
      "Delete success",
      3000,
      null,
      null,
      ""
    );
    window.location.reload(false);
    // dispatch({
    //     type: 'ORGANIZATION/REMOVE_OVERVIEW_RESOURCES_DOCUMENT',
    //     payload: {
    //         resources: resources
    //     }
    // });
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
  // });;
};

// internProject submission
export const internProjectSubmissionListForManager =
  (filterObj) => (dispatch) => {
    var data = {
      params: filterObj,
    };
    axiosInstance
      .get(getAPIURL(constants.INTEN_PROJECT_SUBMISSION_URL, {}), data)
      .then(function (response) {
        dispatch({
          type: "PROJECTS/INTERN_PROJECTS_SUBMISSION_LIST",
          payload: {
            assignedInternProjectSubmission: response.data.documents,
            assignedInternProjectCount: response.data.count,
          },
        });
      })
      .catch(function (error) {
        toastr.error("Some Error Occurred");
      });
  };

// add intern project status
export const addInternProjectStatus = (params) => (dispatch) => {
  dispatch({
    type: "LAYOUT/CHANGE_LOADER",
    payload: {
      loaderState: true,
    },
  });
  axiosInstance({
    method: "PUT",
    url: getAPIURL(constants.UPDATE_INTERN_PROJECT_STATUS_URL, {}),
    data: params,
  })
    .then(function (response) {
      NotificationManager.success(
        "Project Status Added Successfully",
        "success",
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
      window.location.reload();
    })
    .catch((error) => {
      toastr.error("Some Error Occurred");
    });
};

// Get  intern project status
export const getInternProjectStatus = (paramsObj) => (dispatch) => {
  var data = {
    params: paramsObj,
  };
  axiosInstance
    .get(getAPIURL(constants.GET_INTERN_PROJECT_STATUS_URL, {}), data)
    .then(function (response) {
      dispatch({
        type: "PROJECTS/INTERN_PROJECTS_STATUS",
        payload: {
          internProjectStatus: response.data,
        },
      });
    })
    .catch(function (error) {
      toastr.error("Some Error Occurred");
    });
};

// task list for intern
export const getInternProjectTaskList = (paramsObj) => (dispatch) => {
  var data = {
    params: paramsObj,
  };
  axiosInstance
    .get(getAPIURL(constants.GET_PROJECT_TASK_LIST_FOR_INTERN_URL, {}), data)
    .then(function (response) {
      dispatch({
        type: "PROJECTS/USER_PROJECTS_TASK_LIST",
        payload: {
          ProjectTaskList: response.data.taskList,
          ProjectTaskCount: response.data.count,
        },
      });
    })
    .catch(function (error) {
      toastr.error("Some Error Occurred");
    });
};

// project Task
export const addManagerProjectTask =
  (projectid, orgid, params, callback) => (dispatch) => {
    dispatch({
      type: "LAYOUT/CHANGE_LOADER",
      payload: {
        loaderState: true,
      },
    });

    var orgdata = {
      name: params.name,
      duedate: params.duedate,
      project: projectid,
      org: orgid,
      createdby: params.createdby,
    };
    axiosInstance({
      method: "POST",
      url: getAPIURL(constants.PROJECT_TASK_CREATE_URL),
      data: orgdata,
    })
      .then(function (response) {
        NotificationManager.success(
          "Project Task Added Successfully",
          "Success",
          3000,
          null,
          null,
          ""
        );
        callback();
        dispatch(
          getManagerProjectTaskList({
            orgid: orgid,
            projectid: projectid,
            userid: params.createdby,
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
            stopSubmit("addManagerProjectTaskPopUpForm", error.response.data)
          );
        } else {
          toastr.error("Some Error Occurred");
        }
      });
  };
export const getManagerProjectTaskList = (paramsObj) => (dispatch) => {
  var data = {
    params: paramsObj,
  };
  axiosInstance
    .get(getAPIURL(constants.GET_PROJECT_TASK_LIST_URL, {}), data)
    .then(function (response) {
      dispatch({
        type: "PROJECTS/USER_PROJECTS_TASK_LIST",
        payload: {
          ProjectTaskList: response.data.taskList,
          ProjectTaskCount: response.data.count,
        },
      });
    })
    .catch(function (error) {
      toastr.error("Some Error Occurred");
    });
};
export const updateManagerProjectTask = (params, callback) => (dispatch) => {
  dispatch({
    type: "LAYOUT/CHANGE_LOADER",
    payload: {
      loaderState: true,
    },
  });

  axiosInstance({
    method: "PUT",
    url: getAPIURL(constants.UPDATE_TASK_BY_TASKID_URL, {
      ":id": params.taskId,
    }),
    data: params,
  })
    .then(function (response) {
      NotificationManager.success(
        "Project task updated Successfully",
        "Success",
        3000,
        null,
        null,
        ""
      );
      callback();
      dispatch(
        getManagerProjectTaskList({
          orgid: params.orgid,
          projectid: params.projectid,
          userid: params.userid,
        })
      );
      // dispatch(reset("editManagerProjectTaskPopUpForm"));
      // window.location.reload(false);
      dispatch({
        type: "LAYOUT/CHANGE_LOADER",
        payload: {
          loaderState: false,
        },
      });
    })
    .catch((error) => {
      if (error.response.status === 400) {
        dispatch(
          stopSubmit("editManagerProjectTaskPopUpForm", error.response.data)
        );
      } else {
        toastr.error("Some Error Occurred");
      }
    });
};

export const deleteProjectTask = (taskId) => (dispatch) => {
  dispatch({
    type: "LAYOUT/CHANGE_LOADER",
    payload: {
      loaderState: true,
    },
  });

  axiosInstance({
    method: "DELETE",
    url: getAPIURL(constants.PROJECT_TASK_DELETE_URL, { ":id": taskId }),
    data: {},
  }).then(function (response) {
    NotificationManager.success(
      "Task Delete Successfully",
      "Delete success",
      3000,
      null,
      null,
      ""
    );
    window.location.reload(false);
  });
  dispatch({
    type: "LAYOUT/CHANGE_LOADER",
    payload: {
      loaderState: false,
    },
  });
};

export const managerDeleteProject = (projectId) => (dispatch) => {
  dispatch({
    type: "LAYOUT/CHANGE_LOADER",
    payload: {
      loaderState: true,
    },
  });

  axiosInstance({
    method: "DELETE",
    url: getAPIURL(constants.Manager_PROJECT_DELETE_URL, {
      ":project_id": projectId,
    }),
    data: {},
  })
    .then(function (response) {
      NotificationManager.success(
        "Project delete successfully",
        "Success",
        3000,
        null,
        null,
        ""
      );
      window.location.reload(false);

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
export const createManagerDuplicateProject =
  (projectData, callback) => (dispatch) => {
    dispatch({
      type: "LAYOUT/CHANGE_LOADER",
      payload: {
        loaderState: true,
      },
    });
    axiosInstance({
      method: "POST",
      url: getAPIURL(constants.ADD_DUPLICATE_PROJECT_DETAIL_URL),
      data: projectData,
    })
      .then(function (response) {
        NotificationManager.success(
          "duplicate Project Added Successfully",
          "success",
          3000,
          null,
          null,
          ""
        );
        browserHistory.push("/managerapp/project/edit/" + response.data);
        window.location.reload(false);

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

export const reActivateCompleteProject = (params, callback) => (dispatch) => {
  // console.log(params, ">>>>>>>>>");
  dispatch({
    type: "LAYOUT/CHANGE_LOADER",
    payload: {
      loaderState: true,
    },
  });

  axiosInstance({
    method: "PUT",
    url: getAPIURL(constants.RE_ACTIVATE_PROJECT_BY_PROJECTID_URL, {
      ":id": params.projectId,
    }),
    data: params,
  })
    .then(function (response) {
      NotificationManager.success(
        "Project Re-Acivated Successfully",
        "Success",
        3000,
        null,
        null,
        ""
      );
      dispatch(
        getProjectList({
          orgid: params.orgid,
          user_id: params.user_id,
        })
      );
      dispatch({
        type: "LAYOUT/CHANGE_LOADER",
        payload: {
          loaderState: false,
        },
      });
      browserHistory.push("/managerapp/project/list");
      window.location.reload(false);
    })
    .catch((error) => {
      toastr.error("Some Error Occurred");

    });
};

export const checkCompleteProjectBoard = (paramsObj) => (dispatch) => {
  dispatch({
    type: "LAYOUT/CHANGE_LOADER",
    payload: {
      loaderState: true,
    },
  });

  axiosInstance({
    method: "PUT",
    url: getAPIURL(constants.MARK_COMPLETED_PROJECT_BOARD_URL, {
      ":project_id": paramsObj.projectId,
    }),
    data: paramsObj,
  })
    .then(function (response) {
      NotificationManager.success(
        "Project updated completed Successfully",
        "Success",
        3000,
        null,
        null,
        ""
      );
      dispatch(reset("projectListForm"));
      window.location.reload(false);
      dispatch({
        type: "LAYOUT/CHANGE_LOADER",
        payload: {
          loaderState: false,
        },
      });
    })
    .catch((error) => {
      if (error.response.status === 400) {
        dispatch(stopSubmit("projectListForm", error.response.data));
      } else {
        toastr.error("Some Error Occurred");
      }
    });
};

export const internProjectTaskStatus = (params) => (dispatch) => {
  dispatch({
    type: "LAYOUT/CHANGE_LOADER",
    payload: {
      loaderState: true,
    },
  });
  axiosInstance({
    method: "POST",
    url: getAPIURL(constants.INTERN_PROJECT_TASK_STATUS_URL, {}),
    data: params,
  })
    .then(function (response) {
      if (params.task_status === true) {
        NotificationManager.success(
          "Task completed successfully",
          "Success",
          3000,
          null,
          null,
          ""
        );
      } else {
        NotificationManager.success(
          "Task marked incomplete",
          "Success",
          3000,
          null,
          null,
          ""
        );
      }

      dispatch({
        type: "LAYOUT/CHANGE_LOADER",
        payload: {
          loaderState: false,
        },
      });

      // callback();
      dispatch(
        getInternProjectTaskList({
          orgid: params.org_id,
          projectid: params.project_id,
          userid: params.user_id,
        })
      );
    })
    .catch((error) => {
      NotificationManager.error(
        "Some Error Occurredfff",
        "Error",
        3000,
        null,
        null,
        ""
      );
    });
};

//get completed task status for intern
export const getcompletedInternProjectTaskList = (paramsObj) => (dispatch) => {
  var data = {
    params: paramsObj,
  };
  axiosInstance
    .get(
      getAPIURL(constants.GET_INTERN_COMPLETED_PROJECT_TASK_STATUS_URL, {}),
      data
    )
    .then(function (response) {
      dispatch({
        type: "PROJECTS/COMPLETED_PROJECTS_TASK_LIST",
        payload: {
          CompletedTaskList: response.data.completedtaskList,
          CompletedTaskCount: response.data.count,
        },
      });
    })
    .catch(function (error) {
      toastr.error("Some Error Occurred");
    });
};
export const getManagerCompletedProjectList = (paramsObj) => (dispatch) => {
  var data = {
    params: paramsObj,
  };
  axiosInstance
    .get(getAPIURL(constants.MANAGER_COMPLETED_PROJECT_BOARD_URL, {}), data)
    .then(function (response) {
      dispatch({
        type: "PROJECTS/COMPLETED_PROJECTS_LIST",
        payload: {
          completedProjectList: response.data.projects,
          completedProjectCount: response.data.count,
        },
      });
    })
    .catch(function (error) {
      toastr.error("Some Error Occurred");
    });
};