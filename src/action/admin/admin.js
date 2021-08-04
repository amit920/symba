import axiosInstance from "../../utils/axiosApi";
// import _ from "lodash";
import * as constants from "../../utils/constants";
import { getAPIURL } from "../../utils/getApiUrl";
import { toastr } from "react-redux-toastr";
import { uploadFile } from "react-s3";
import { stopSubmit, reset } from "redux-form";
import moment from "moment";
import { NotificationManager } from "../../components/common/react-notifications";
import createBrowserHistory from "history/createBrowserHistory";
const browserHistory = createBrowserHistory();

const awsConfig = {
  bucketName: constants.BUCKET_NAME, //PROD
  region: constants.AWS_REGION,
  accessKeyId: constants.AWS_ACCESS_KEY_ID,
  secretAccessKey: constants.AWS_ACCESS_SECRET_ID,
};

export const addAdminProject = (projectData, callback) => (dispatch) => {
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
    url: getAPIURL(constants.ADD_ADMIN_PROJECT_DETAIL_URL),
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
      browserHistory.push("/app/project/edit/" + response.data);
      window.location.reload(false);
      // callback();
      // dispatch(
      //   getAdminProjectList({
      //     orgid: projectData.org,
      //     user_id: projectData.createdby,
      //   })
      // );
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
        dispatch(stopSubmit("addAdminProjectPopUpForm", error.response.data));
      } else {
        toastr.error("Some Error Occurred");
      }
    });
};

export const getAdminProjectList = (paramsObj) => (dispatch) => {
  var data = {
    params: paramsObj,
  };
  axiosInstance
    .get(getAPIURL(constants.ADMIN_PROJECT_LIST_URL, {}), data)
    .then(function (response) {
      dispatch({
        type: "PROJECTS/ADMIN_PROJECTS_LIST",
        payload: {
          adminProjectList: response.data.projects,
          adminProjectCount: response.data.count,
        },
      });
    })
    .catch(function (error) {
      toastr.error("Some Error Occurred");
    });
};
export const editAdminProject = (projectId, projectData) => (dispatch) => {
  // if (projectData.startdate) {
  //     projectData.startdate = moment(projectData.startdate).format('YYYY-MM-DD');
  // }
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
    url: getAPIURL(constants.ADMIN_UPDATE_PROJECT_DETAILS_URL, {
      ":id": projectId,
    }),
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
      dispatch(reset("editProjectForm"));
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
        dispatch(stopSubmit("editProjectForm", error.response.data));
      } else {
        toastr.error("Some Error Occurred");
      }
    });
};
export const addAdminProjectResources = (
  projectId,
  ordId,
  params,
  callback
) => (dispatch) => {
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
          resource_title: params.resource_title,
          documentdescription: params.resource_description,
          pdfurl: params.Type,
          doclinkdata: data.location,
          isactive: true,
          project: projectId,
          org: ordId,
          createdby: params.createdby,
        };
        axiosInstance({
          method: "POST",
          url: getAPIURL(constants.ADMIN_RESOURCE_CREATE_URL, {}),
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
            dispatch(reset("addAdminResourcePopUpForm"));
            dispatch(
              getAdminProjectDocumentsList({
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
                stopSubmit("addAdminResourcePopUpForm", error.response.data)
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
      resource_title: params.resource_title,
      documentdescription: params.resource_description,
      pdfurl: params.Type,
      doclinkdata: params.doclinkdata,
      isactive: true,
      project: projectId,
      org: ordId,
      createdby: params.createdby,
    };
    axiosInstance({
      method: "POST",
      url: getAPIURL(constants.ADMIN_RESOURCE_CREATE_URL, {}),
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
        dispatch(reset("addAdminResourcePopUpForm"));
        dispatch(
          getAdminProjectDocumentsList({
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
            stopSubmit("addAdminResourcePopUpForm", error.response.data)
          );
        } else {
          toastr.error("Some Error Occurred");
        }
      });
  }
};
export const getAdminProjectDocumentsList = (params) => (dispatch) => {
  var data = {
    params: params,
  };
  axiosInstance
    .get(getAPIURL(constants.ADMIN_DOCUMENT_LIST_URL, {}), data)
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

export const updateAdminProjectResource = (
  projectId,
  ordId,
  params,
  callback
) => (dispatch) => {
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
          sourceurl: data.location,
          pdfurl: params.Type,
          isactive: true,
          project: projectId,
          org: ordId,
          modifiedby: params.createdby,
        };
        axiosInstance({
          method: "PUT",
          url: getAPIURL(constants.ADMIN_DOCUMENT_UPDATE_URL, {
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
              getAdminProjectDocumentsList({
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
                stopSubmit("editAdminResourcePopUpForm", error.response.data)
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
      createby: params.createby,
    };
    axiosInstance({
      method: "PUT",
      url: getAPIURL(constants.ADMIN_DOCUMENT_UPDATE_URL, {
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
          getAdminProjectDocumentsList({
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
            stopSubmit("editAdminResourcePopUpForm", error.response.data)
          );
        } else {
          toastr.error("Some Error Occurred");
        }
      });
  }
};

export const adminDeleteResource = (resourceId, orgId, projectId) => (
  dispatch
) => {
  dispatch({
    type: "LAYOUT/CHANGE_LOADER",
    payload: {
      loaderState: true,
    },
  });

  axiosInstance({
    method: "DELETE",
    url: getAPIURL(constants.Admin_RESOURCE_DELETE_URL, { ":id": resourceId }),
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
    dispatch(
      getAdminProjectDocumentsList({
        orgid: orgId,
        projectid: projectId,
      })
    );
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
      dispatch({
        type: "LAYOUT/CHANGE_LOADER",
        payload: {
          loaderState: false,
        },
      });
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

// internProject submission
export const internProjectSubmissionList = (filterObj) => (dispatch) => {
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

export const getAllProjectList = (paramsObj) => (dispatch) => {
  var data = {
    params: paramsObj,
  };
  axiosInstance
    .get(getAPIURL(constants.ALL_ORG_PROJECT_LIST_URL, {}), data)
    .then(function (response) {
      dispatch({
        type: "PROJECTS/ALL_ORG_PROJECTS_LIST",
        payload: {
          allOrgProjectList: response.data.projects,
          allOrgProjectCount: response.data.count,
        },
      });
    })
    .catch(function (error) {
      toastr.error("Some Error Occurred");
    });
};

export const adminDeleteProject = (projectId) => (dispatch) => {
  dispatch({
    type: "LAYOUT/CHANGE_LOADER",
    payload: {
      loaderState: true,
    },
  });
  axiosInstance({
    method: "DELETE",
    url: getAPIURL(constants.ADMIN_PROJECT_DELETE_URL, {
      ":project_id": projectId,
    }),
    data: {},
  })
    .then(function (response) {
      NotificationManager.success(
        "Project deleted successfully",
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

// project Task
export const addAdminProjectTask = (projectid, orgid, params, callback) => (
  dispatch
) => {
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
        getAdminProjectTaskList({
          orgid: orgid,
          projectid: projectid,
          userid: params.createdby,
        })
      );
      // browserHistory.push("/app/engage/list");
      // window.location.reload(false);
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
        dispatch(stopSubmit("addProjectTaskPopUpForm", error.response.data));
      } else {
        toastr.error("Some Error Occurred");
      }
    });
};

export const getAdminProjectTaskList = (paramsObj) => (dispatch) => {
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

export const updateAdminProjectTask = (params, callback) => (dispatch) => {
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
        getAdminProjectTaskList({
          orgid: params.orgid,
          projectid: params.projectid,
          userid: params.userid,
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
      if (error.response.status === 400) {
        dispatch(stopSubmit("editProjectTaskPopUpForm", error.response.data));
      } else {
        toastr.error("Some Error Occurred");
      }
    });
};

export const deleteProjectTask = (taskId, orgid, projectid, userid) => (
  dispatch
) => {
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
    // callback();
    dispatch(
      getAdminProjectTaskList({
        orgid: orgid,
        projectid: projectid,
        userid: userid,
      })
    );
  });
  dispatch({
    type: "LAYOUT/CHANGE_LOADER",
    payload: {
      loaderState: false,
    },
  });
};
export const getAllProjectTaskList = (paramsObj) => (dispatch) => {
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

//All Other Project
export const editAllOtherProject = (projectId, projectData) => (dispatch) => {
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
    url: getAPIURL(constants.ADMIN_UPDATE_ALLOTHER_PROJECT_DETAILS_URL, {
      ":id": projectId,
    }),
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
      dispatch(reset("editProjectForm"));
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
        dispatch(stopSubmit("editProjectForm", error.response.data));
      } else {
        toastr.error("Some Error Occurred");
      }
    });
};
export const addAllOtherProjectTask = (projectid, orgid, params, callback) => (
  dispatch
) => {
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
        getAllOtherProjectTaskList({
          orgid: orgid,
          projectid: projectid,
          userid: params.createdby,
        })
      );
      // browserHistory.push("/app/engage/list");
      // window.location.reload(false);
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
        dispatch(stopSubmit("addProjectTaskPopUpForm", error.response.data));
      } else {
        toastr.error("Some Error Occurred");
      }
    });
};
export const getAllOtherProjectTaskList = (paramsObj) => (dispatch) => {
  var data = {
    params: paramsObj,
  };
  axiosInstance
    .get(getAPIURL(constants.GET_ALLOTHER_PROJECT_TASK_LIST_URL, {}), data)
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
export const updateAllOtherProjectTask = (params, callback) => (dispatch) => {
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
        getAllOtherProjectTaskList({
          orgid: params.orgid,
          projectid: params.projectid,
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
      if (error.response.status === 400) {
        dispatch(stopSubmit("editProjectTaskPopUpForm", error.response.data));
      } else {
        toastr.error("Some Error Occurred");
      }
    });
};
export const deleteAllOtherProjectTask = (taskId, orgId, projectId, userId) => (
  dispatch
) => {
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
    dispatch(
      getAllOtherProjectTaskList({
        orgid: orgId,
        projectid: projectId,
        userid: userId,
      })
    );
  });
  dispatch({
    type: "LAYOUT/CHANGE_LOADER",
    payload: {
      loaderState: false,
    },
  });
};

export const addAllOtherProjectResources = (
  projectId,
  ordId,
  params,
  callback
) => (dispatch) => {
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
          resource_title: params.resource_title,
          documentdescription: params.resource_description,
          pdfurl: params.Type,
          doclinkdata: data.location,
          isactive: true,
          project: projectId,
          org: ordId,
          createdby: params.createdby,
        };
        axiosInstance({
          method: "POST",
          url: getAPIURL(constants.ADD_ALLOTHERPROJECT_RESOURCE_CREATE_URL, {}),
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
            dispatch(reset("addAllOtherResourcePopUpForm"));
            dispatch(
              getAdminProjectDocumentsList({
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
                stopSubmit("addAllOtherResourcePopUpForm", error.response.data)
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
      resource_title: params.resource_title,
      documentdescription: params.resource_description,
      pdfurl: params.Type,
      doclinkdata: params.doclinkdata,
      isactive: true,
      project: projectId,
      org: ordId,
      createdby: params.createdby,
    };
    axiosInstance({
      method: "POST",
      url: getAPIURL(constants.ADMIN_RESOURCE_CREATE_URL, {}),
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
        dispatch(reset("addAllOtherResourcePopUpForm"));
        dispatch(
          getAdminProjectDocumentsList({
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
            stopSubmit("addAllOtherResourcePopUpForm", error.response.data)
          );
        } else {
          toastr.error("Some Error Occurred");
        }
      });
  }
};

export const updateAllOtherProjectResource = (
  projectId,
  ordId,
  params,
  callback
) => (dispatch) => {
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
          sourceurl: data.location,
          pdfurl: params.Type,
          isactive: true,
          project: projectId,
          org: ordId,
          modifiedby: params.createdby,
        };
        axiosInstance({
          method: "PUT",
          url: getAPIURL(constants.ADMIN_DOCUMENT_UPDATE_URL, {
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
              getAdminProjectDocumentsList({
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
                stopSubmit("editAdminResourcePopUpForm", error.response.data)
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
      createby: params.createby,
    };
    axiosInstance({
      method: "PUT",
      url: getAPIURL(constants.ADMIN_DOCUMENT_UPDATE_URL, {
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
          getAdminProjectDocumentsList({
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
            stopSubmit("editAdminResourcePopUpForm", error.response.data)
          );
        } else {
          toastr.error("Some Error Occurred");
        }
      });
  }
};
export const allOtherDeleteResource = (resourceId, orgId, projectId) => (
  dispatch
) => {
  dispatch({
    type: "LAYOUT/CHANGE_LOADER",
    payload: {
      loaderState: true,
    },
  });

  axiosInstance({
    method: "DELETE",
    url: getAPIURL(constants.Admin_RESOURCE_DELETE_URL, { ":id": resourceId }),
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

    dispatch(
      getAdminProjectDocumentsList({
        orgid: orgId,
        projectid: projectId,
      })
    );
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
      dispatch(reset("adminProjectListForm"));
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
        dispatch(stopSubmit("adminProjectListForm", error.response.data));
      } else {
        toastr.error("Some Error Occurred");
      }
    });
};

export const getCompletedProjectList = (paramsObj) => (dispatch) => {
  var data = {
    params: paramsObj,
  };
  axiosInstance
    .get(getAPIURL(constants.ADMIN_COMPLETED_PROJECT_BOARD_URL, {}), data)
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
export const createDuplicateProject = (projectData, callback) => (dispatch) => {
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
      browserHistory.push("/app/project/edit/" + response.data);
      window.location.reload(false);
      // callback();
      // dispatch(
      //   getAdminProjectList({
      //     orgid: projectData.org,
      //     user_id: projectData.createdby,
      //   })
      // );
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
      //   dispatch(stopSubmit("addAdminProjectPopUpForm", error.response.data));
      // } else {
      //   toastr.error("Some Error Occurred");
      // }
    });
};

export const createEditOtherDuplicateProject = (projectData, callback) => (
  dispatch
) => {
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
      // browserHistory.push("/app/project/edit/"+response.data);
      window.location.reload(false);
      // callback();
      // dispatch(
      //   getAdminProjectList({
      //     orgid: projectData.org,
      //     user_id: projectData.createdby,
      //   })
      // );
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
      //   dispatch(stopSubmit("addAdminProjectPopUpForm", error.response.data));
      // } else {
      //   toastr.error("Some Error Occurred");
      // }
    });
};

export const reActivateCompleteProject = (params, callback) => (dispatch) => {
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
        getAdminProjectList({
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
      browserHistory.push("/app/project/list");
      window.location.reload(false);
    })
    .catch((error) => {
      // if (error.response.status === 400) {
      //   dispatch(stopSubmit("editProjectTaskPopUpForm", error.response.data));
      // } else {
      //   toastr.error("Some Error Occurred");
      // }
    });
};

//get completed task status for intern
export const getcompletedInternProjectTaskList = (paramsObj) => (dispatch) => {
  var data = {
    params: paramsObj,
  };
  axiosInstance
    .get(getAPIURL(constants.GET_INTERN_COMPLETED_PROJECT_TASK_STATUS_URL, {}), data)
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

//get intern project submisssion list
export const getInternProjectSubmissionList = (paramsObj) => (dispatch) => {
  dispatch({
    type: "LAYOUT/CHANGE_LOADER",
    payload: {
      loaderState: true,
    },
  });
  var data = {
    params: paramsObj,
  };
  axiosInstance
    .get(getAPIURL(constants.GET_INTERN_PROJECT_SUBMISSION_LIST_URL, {}), data)
    .then(function (response) {
      dispatch({
        type: "PROJECTS/INTERN_PROJECTS_DOCUMENT_SUBMISSION_LIST",
        payload: {
          InternProjectSubmissionList: response.data.internSubmissionList,
          InternProjectSubmissionCount: response.data.count,
        },
      });
      dispatch({
        type: "LAYOUT/CHANGE_LOADER",
        payload: {
          loaderState: false,
        },
      });
    })
    .catch(function (error) {
      toastr.error("Some Error Occurred");
    });
};