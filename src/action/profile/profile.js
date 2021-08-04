import axiosInstance from "../../utils/axiosApi";
// import _ from "lodash";
import * as constants from "../../utils/constants";
import { getAPIURL } from "../../utils/getApiUrl";
// import checkAlreadyLogin from "../../utils/checkAlreadyLogin";
import { toastr } from "react-redux-toastr";
import { stopSubmit } from "redux-form";
import { NotificationManager } from "../../components/common/react-notifications";
import {
  uploadFile,
  // uploadFileOverview,
  // deleteFile,
  uploadCroppingFile,
} from "../profile/ReactS3";
// import { push } from "react-router-redux";
import createBrowserHistory from "history/createBrowserHistory";
const browserHistory = createBrowserHistory();

const awsConfig = {
  bucketName: constants.BUCKET_NAME,
  region: constants.AWS_REGION,
  accessKeyId: constants.AWS_ACCESS_KEY_ID,
  secretAccessKey: constants.AWS_ACCESS_SECRET_ID,
};
export const getInternProfile = (organizationId, internId) => (dispatch) => {
  var data = {
    params: {
      orgid: organizationId,
    },
  };
  axiosInstance
    .get(getAPIURL(constants.INTERN_PROFILE_URL, { ":id": internId }), data)
    .then(function (response) {
      dispatch({
        type: "ORGANIZATION/INTERN_DETAILS",
        payload: {
          internDetail: response.data,
        },
      });
    })
    .catch(function (error) {
      toastr.error("Some Error Occurred");
    });
};

export const updateInternProfile = (internId, internData, callback) => (
  dispatch
) => {
  dispatch({
    type: "LAYOUT/CHANGE_LOADER",
    payload: {
      loaderState: true,
    },
  });
  awsConfig.dirName =
    "Resume" + "/" + "Intern" + "/" + internId; /* eslint-disable-line */
  if (internData.fileResumedata !== undefined) {
    if (internData.Type === "File") {
      var fileObj = new File(
        [internData.fileResumedata],
        internData.fileResumedata.name,
        { type: internData.fileResumedata.type }
      );

      uploadFile(fileObj, awsConfig)
        .then((data) => {
          var InternDetails = {
            resumeurl: data.location,
          };
          axiosInstance({
            method: "POST",
            url: getAPIURL(
              constants.UPDATE_INTERN_PROFILE_QUESTIONRESPONSE_URL,
              { ":id": internId }
            ),
            data: InternDetails,
          })
            .then(function (response) {
              NotificationManager.success(
                "Resume Added Successfully",
                "Resume success",
                3000,
                null,
                null,
                ""
              );
              browserHistory.push("/internapp/profile/view");
              window.location.reload();
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
              //     dispatch(stopSubmit('InternProfileForm', error.response.data));
              // } else {
              //     toastr.error('Some Error Occurred')
              // }
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
    }
  } else {
    if (internData.QuestionResponse0 === undefined) {
      var questionresponse0 = null;
    } else {
      questionresponse0 = internData.QuestionResponse0;
    }
    if (internData.QuestionResponse1 === undefined) {
      var questionresponse1 = null;
    } else {
      questionresponse1 = internData.QuestionResponse1;
    }
    if (internData.QuestionResponse2 === undefined) {
      var questionresponse2 = null;
    } else {
      questionresponse2 = internData.QuestionResponse2;
    }
    if (internData.QuestionResponse3 === undefined) {
      var questionresponse3 = null;
    } else {
      questionresponse3 = internData.QuestionResponse3;
    }
    var InternDetails = {
      Question0: internData.Question[0].Id,
      Question1: internData.Question[1].Id,
      Question2: internData.Question[2].Id,
      Question3: internData.Question[3].Id,
      Question: internData.Question,
      QuestionResponse0: questionresponse0,
      QuestionResponse1: questionresponse1,
      QuestionResponse2: questionresponse2,
      QuestionResponse3: questionresponse3,
      pronouns: internData.pronouns,
      schoolname: internData.school,
      usertitle: internData.usertitle,
      city: internData.location,
    };
  }

  axiosInstance({
    method: "POST",
    url: getAPIURL(constants.UPDATE_INTERN_PROFILE_QUESTIONRESPONSE_URL, {
      ":id": internId,
    }),
    data: InternDetails,
  }).then(function (response) {
    NotificationManager.success(
      "Response Added Successfully",
      "Question Response success",
      3000,
      null,
      null,
      ""
    );
    browserHistory.push("/internapp/profile/view");
    window.location.reload();

    dispatch({
      type: "LAYOUT/CHANGE_LOADER",
      payload: {
        loaderState: false,
      },
    });
  });
  // .catch(error => {
  //     if (error.response.status === 400) {
  //         dispatch(stopSubmit('InternProfileForm', error.response.data));
  //     } else {
  //         toastr.error('Some Error Occurred')
  //     }
  // });
};
export const updateAlumniProfile = (internId, internData, callback) => (
  dispatch
) => {
  dispatch({
    type: "LAYOUT/CHANGE_LOADER",
    payload: {
      loaderState: true,
    },
  });
  awsConfig.dirName =
    "Resume" + "/" + "Intern" + "/" + internId; /* eslint-disable-line */
  if (internData.fileResumedata !== undefined) {
    if (internData.Type === "File") {
      var fileObj = new File(
        [internData.fileResumedata],
        internData.fileResumedata.name,
        { type: internData.fileResumedata.type }
      );

      uploadFile(fileObj, awsConfig)
        .then((data) => {
          var InternDetails = {
            resumeurl: data.location,
          };
          axiosInstance({
            method: "POST",
            url: getAPIURL(
              constants.UPDATE_INTERN_PROFILE_QUESTIONRESPONSE_URL,
              { ":id": internId }
            ),
            data: InternDetails,
          })
            .then(function (response) {
              NotificationManager.success(
                "Resume Added Successfully",
                "Resume success",
                3000,
                null,
                null,
                ""
              );
              browserHistory.push("/alumniapp/profile/view");
              window.location.reload();
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
              //     dispatch(stopSubmit('InternProfileForm', error.response.data));
              // } else {
              //     toastr.error('Some Error Occurred')
              // }
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
    }
  } else {
    if (internData.QuestionResponse0 === undefined) {
      var questionresponse0 = null;
    } else {
      questionresponse0 = internData.QuestionResponse0;
    }
    if (internData.QuestionResponse1 === undefined) {
      var questionresponse1 = null;
    } else {
      questionresponse1 = internData.QuestionResponse1;
    }
    if (internData.QuestionResponse2 === undefined) {
      var questionresponse2 = null;
    } else {
      questionresponse2 = internData.QuestionResponse2;
    }
    if (internData.QuestionResponse3 === undefined) {
      var questionresponse3 = null;
    } else {
      questionresponse3 = internData.QuestionResponse3;
    }
    var InternDetails = {
      Question0: internData.Question[0].Id,
      Question1: internData.Question[1].Id,
      Question2: internData.Question[2].Id,
      Question3: internData.Question[3].Id,
      Question: internData.Question,
      QuestionResponse0: questionresponse0,
      QuestionResponse1: questionresponse1,
      QuestionResponse2: questionresponse2,
      QuestionResponse3: questionresponse3,
      pronouns: internData.pronouns,
      schoolname: internData.school,
      usertitle: internData.usertitle,
      city: internData.location,
    };
  }

  axiosInstance({
    method: "POST",
    url: getAPIURL(constants.UPDATE_INTERN_PROFILE_QUESTIONRESPONSE_URL, {
      ":id": internId,
    }),
    data: InternDetails,
  }).then(function (response) {
    NotificationManager.success(
      "Response Added Successfully",
      "Question Response success",
      3000,
      null,
      null,
      ""
    );
    browserHistory.push("/alumniapp/profile/view");
    window.location.reload();

    dispatch({
      type: "LAYOUT/CHANGE_LOADER",
      payload: {
        loaderState: false,
      },
    });
  });
  // .catch(error => {
  //     if (error.response.status === 400) {
  //         dispatch(stopSubmit('InternProfileForm', error.response.data));
  //     } else {
  //         toastr.error('Some Error Occurred')
  //     }
  // });
};
export const removeUploadFile = (userId, orgId) => (dispatch) => {
  dispatch({
    type: "LAYOUT/CHANGE_LOADER",
    payload: {
      loaderState: true,
    },
  });

  axiosInstance({
    method: "DELETE",
    url: getAPIURL(constants.RESUME_DELETE_URL, { ":user_id": userId }),
    data: {},
  }).then(function (response) {
    NotificationManager.success(
      "Resume Delete Successfully",
      "Resume Delete success",
      3000,
      null,
      null,
      ""
    );
    dispatch(getInternProfile(orgId, userId));
    dispatch({
      type: "LAYOUT/CHANGE_LOADER",
      payload: {
        loaderState: false,
      },
    });
  });

  // .catch(error => {
  //     toastr.error('Some Error Occurred');
  //     dispatch({
  //         type: 'LAYOUT/CHANGE_LOADER',
  //         payload: {
  //             loaderState: false,
  //         }
  //     });
  // });
};
export const deleteSocialwebsite = (userSocialId) => (dispatch) => {
  dispatch({
    type: "LAYOUT/CHANGE_LOADER",
    payload: {
      loaderState: true,
    },
  });

  axiosInstance({
    method: "DELETE",
    url: getAPIURL(constants.SOCIAL_NETWORK_DELETE_URL, {
      ":id": userSocialId,
    }),
    data: {},
  }).then(function (response) {
    NotificationManager.success(
      "Social Website Delete Successfully",
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

export const getAdminProfile = (organizationId, adminId) => (dispatch) => {
  var data = {
    params: {
      orgid: organizationId,
    },
  };
  axiosInstance
    .get(getAPIURL(constants.ADMIN_PROFILE_URL, { ":id": adminId }), data)
    .then(function (response) {
      dispatch({
        type: "ORGANIZATION/ADMIN_DETAILS",
        payload: {
          adminDetail: response.data,
        },
      });
    })
    .catch(function (error) {
      toastr.error("Some Error Occurred");
    });
};

export const updateProfile = (adminId, adminData, callback) => (dispatch) => {
  dispatch({
    type: "LAYOUT/CHANGE_LOADER",
    payload: {
      loaderState: true,
    },
  });
  if (adminData.QuestionResponse0 === undefined) {
    var questionresponse0 = null;
  } else {
    questionresponse0 = adminData.QuestionResponse0;
  }
  if (adminData.QuestionResponse1 === undefined) {
    var questionresponse1 = null;
  } else {
    questionresponse1 = adminData.QuestionResponse1;
  }
  if (adminData.QuestionResponse2 === undefined) {
    var questionresponse2 = null;
  } else {
    questionresponse2 = adminData.QuestionResponse2;
  }
  if (adminData.QuestionResponse3 === undefined) {
    var questionresponse3 = null;
  } else {
    questionresponse3 = adminData.QuestionResponse3;
  }
  var AdminDetails = {
    Question0: adminData.Question[0].Id,
    Question1: adminData.Question[1].Id,
    Question2: adminData.Question[2].Id,
    Question3: adminData.Question[3].Id,
    Question: adminData.Question,
    QuestionResponse0: questionresponse0,
    QuestionResponse1: questionresponse1,
    QuestionResponse2: questionresponse2,
    QuestionResponse3: questionresponse3,
    pronouns: adminData.pronouns,
    schoolname: adminData.school,
    usertitle: adminData.usertitle,
    city: adminData.location,
  };
  axiosInstance({
    method: "POST",
    url: getAPIURL(constants.UPDATE_ADMIN_PROFILE_QUESTIONRESPONSE_URL, {
      ":id": adminId,
    }),
    data: AdminDetails,
  })
    .then(function (response) {
      NotificationManager.success(
        "Detail Added Successfully",
        "Success",
        3000,
        null,
        null,
        ""
      );
      browserHistory.push("/app/profile/view");
      window.location.reload();
      dispatch({
        type: "LAYOUT/CHANGE_LOADER",
        payload: {
          loaderState: false,
        },
      });
    })
    .catch((error) => {
      if (error.response.status === 400) {
        dispatch(stopSubmit("AdminEditProfileForm", error.response.data));
      } else {
        toastr.error("Some Error Occurred");
      }
    });
};

export const getCoummunityUserProfile = (
  organizationId,
  userId,
  usertypeid
) => (dispatch) => {
  dispatch({
    type: "LAYOUT/CHANGE_LOADER",
    payload: {
      loaderState: true,
    },
  });
  var data = {
    params: {
      orgid: organizationId,
      usertypeid: usertypeid,
    },
  };
  axiosInstance
    .get(
      getAPIURL(constants.INTERN_COMMUNITY_PROFILE_URL, { ":id": userId }),
      data
    )
    .then(function (response) {
      dispatch({
        type: "ORGANIZATION/COMMUNITY_USER_DETAILS",
        payload: {
          userDetail: response.data,
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
      browserHistory.push("/unauthorizedpage");
      window.location.reload(false);
    });
};

export const getCoummunityAllUserProfile = (
  organizationId,
  userId,
  usertypeid
) => (dispatch) => {
  dispatch({
    type: "LAYOUT/CHANGE_LOADER",
    payload: {
      loaderState: true,
    },
  });
  var data = {
    params: {
      orgid: organizationId,
      usertypeid: usertypeid,
    },
  };
  axiosInstance
    .get(
      getAPIURL(constants.ADMIN_COMMUNITY_PROFILE_URL, { ":id": userId }),
      data
    )
    .then(function (response) {
      dispatch({
        type: "ORGANIZATION/ALL_ADMIN_COMMUNITY_USER_DETAILS",
        payload: {
          adminUserDetail: response.data,
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
      browserHistory.push("/unauthorizedpage");
      window.location.reload(false);
    });
};

export const addInternSocialLinks = (params, callback) => (dispatch) => {
  dispatch({
    type: "LAYOUT/CHANGE_LOADER",
    payload: {
      loaderState: true,
    },
  });

  var orgdata = {
    userid: params.userId,
    socialid: params.socialnetwork_id,
    usersocialurl: params.social_url,
    isactive: true,
    createdby: params.createdby,
  };
  axiosInstance({
    method: "POST",
    url: getAPIURL(constants.SOCIAL_LINKS_CREATE_URL),
    data: orgdata,
  })
    .then(function (response) {
      NotificationManager.success(
        "Social Link Added Successfully",
        "Social Link success",
        3000,
        null,
        null,
        ""
      );
      dispatch(getInternProfile(params.org, params.userId));
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
      NotificationManager.error(
        "Maximum three social link are allowed",
        "Error",
        3000,
        null,
        null,
        ""
      );
    });
};
export const addAdminSocialLinks = (params, callback) => (dispatch) => {
  dispatch({
    type: "LAYOUT/CHANGE_LOADER",
    payload: {
      loaderState: true,
    },
  });

  var orgdata = {
    userid: params.userId,
    socialid: params.socialnetwork_id,
    usersocialurl: params.social_url,
    isactive: true,
    createdby: params.createdby,
  };
  axiosInstance({
    method: "POST",
    url: getAPIURL(constants.SOCIAL_LINKS_CREATE_URL),
    data: orgdata,
  })
    .then(function (response) {
      NotificationManager.success(
        "Social Link Added Successfully",
        "Social Link success",
        3000,
        null,
        null,
        ""
      );

      dispatch(getAdminProfile(params.org, params.userId));
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
      NotificationManager.error(
        "Maximum three social link are allowed",
        "Error",
        3000,
        null,
        null,
        ""
      );
    });
};
export const addUserSkills = (params, callback) => (dispatch) => {
  dispatch({
    type: "LAYOUT/CHANGE_LOADER",
    payload: {
      loaderState: true,
    },
  });

  var orgdata = {
    userid: params.userId,
    skillsArry: params.skillsarry,
    isactive: true,
    createdby: params.createdby,
    orgid: params.org,
  };
  axiosInstance({
    method: "POST",
    url: getAPIURL(constants.USER_SKILLS_CREATE_URL),
    data: orgdata,
  })
    .then(function (response) {
      NotificationManager.success(
        "Skilss Added Successfully",
        "Skills success",
        3000,
        null,
        null,
        ""
      );
      callback();
      dispatch(getAdminProfile(params.org, params.userId));
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
      //     dispatch(stopSubmit('addEditEngageForm', error.response.data));
      // } else {
      //     toastr.error('Some Error Occurred')
      // }
    });
};
export const addManagerSkills = (params, callback) => (dispatch) => {
  dispatch({
    type: "LAYOUT/CHANGE_LOADER",
    payload: {
      loaderState: true,
    },
  });

  var orgdata = {
    userid: params.userId,
    skillsArry: params.skillsarry,
    isactive: true,
    createdby: params.createdby,
    orgid: params.org,
  };
  axiosInstance({
    method: "POST",
    url: getAPIURL(constants.USER_SKILLS_CREATE_URL),
    data: orgdata,
  })
    .then(function (response) {
      NotificationManager.success(
        "Skilss Added Successfully",
        "Skills success",
        3000,
        null,
        null,
        ""
      );
      callback();
      dispatch(getManagerProfile(params.org, params.userId));
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
      //     dispatch(stopSubmit('addEditEngageForm', error.response.data));
      // } else {
      //     toastr.error('Some Error Occurred')
      // }
    });
};
export const addInternSkills = (params, callback) => (dispatch) => {
  dispatch({
    type: "LAYOUT/CHANGE_LOADER",
    payload: {
      loaderState: true,
    },
  });

  var orgdata = {
    userid: params.userId,
    skillsArry: params.skillsarry,
    isactive: true,
    createdby: params.createdby,
    orgid: params.org,
  };
  axiosInstance({
    method: "POST",
    url: getAPIURL(constants.USER_SKILLS_CREATE_URL),
    data: orgdata,
  })
    .then(function (response) {
      NotificationManager.success(
        "Skilss Added Successfully",
        "Skills success",
        3000,
        null,
        null,
        ""
      );
      callback();
      dispatch(getInternProfile(params.org, params.userId));
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
export const deleteUserSkills = (userSkillId) => (dispatch) => {
  dispatch({
    type: "LAYOUT/CHANGE_LOADER",
    payload: {
      loaderState: true,
    },
  });

  axiosInstance({
    method: "DELETE",
    url: getAPIURL(constants.USER_SKILLS_DELETE_URL, { ":id": userSkillId }),
    data: {},
  }).then(function (response) {
    NotificationManager.success(
      "Skill Deleted Successfully",
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

export const addInternProfileImage = (params, callback) => (dispatch) => {
  dispatch({
    type: "LAYOUT/CHANGE_LOADER",
    payload: {
      loaderState: true,
    },
  });

  awsConfig.dirName =
    "Profileimage" + "/" + params.intern; /* eslint-disable-line */
  if (params.Type === "File") {
    uploadCroppingFile(params.file, params.Type, awsConfig)
      .then((data) => {
        var documentdata = {
          photourl: data.location,
          internId: params.intern,
        };
        axiosInstance({
          method: "PUT",
          url: getAPIURL(constants.UPDATE_USER_PROFILE_IMAGE_URL, {
            ":id": params.intern,
          }),
          data: documentdata,
        })
          .then((response) => {
            NotificationManager.success(
              "Add Profile Image Successfully",
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

            if (error.response.status === 400) {
              dispatch(stopSubmit("Profile", error.response.data));
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
  }
};
export const addAdminProfileImage = (params, callback) => (dispatch) => {
  dispatch({
    type: "LAYOUT/CHANGE_LOADER",
    payload: {
      loaderState: true,
    },
  });

  awsConfig.dirName =
    "Profileimage" + "/" + params.intern; /* eslint-disable-line */
  if (params.Type === "File") {
    uploadCroppingFile(params.file, params.Type, awsConfig)
      .then((data) => {
        var documentdata = {
          photourl: data.location,
          internId: params.intern,
        };
        axiosInstance({
          method: "PUT",
          url: getAPIURL(constants.UPDATE_USER_PROFILE_IMAGE_URL, {
            ":id": params.intern,
          }),
          data: documentdata,
        })
          .then((response) => {
            NotificationManager.success(
              "Add Profile Image Successfully",
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

            if (error.response.status === 400) {
              dispatch(stopSubmit("Profile", error.response.data));
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
  }
};

// manager
export const getManagerProfile = (organizationId, managerId) => (dispatch) => {
  var data = {
    params: {
      orgid: organizationId,
    },
  };
  axiosInstance
    .get(getAPIURL(constants.MANAGER_PROFILE_URL, { ":id": managerId }), data)
    .then(function (response) {
      dispatch({
        type: "ORGANIZATION/MANAGER_DETAILS",
        payload: {
          managerDetail: response.data,
        },
      });
    })
    .catch(function (error) {
      toastr.error("Some Error Occurred");
    });
};
export const updateManagerProfile = (managerId, managerData, callback) => (
  dispatch
) => {
  dispatch({
    type: "LAYOUT/CHANGE_LOADER",
    payload: {
      loaderState: true,
    },
  });
  if (managerData.QuestionResponse0 === undefined) {
    var questionresponse0 = null;
  } else {
    questionresponse0 = managerData.QuestionResponse0;
  }
  if (managerData.QuestionResponse1 === undefined) {
    var questionresponse1 = null;
  } else {
    questionresponse1 = managerData.QuestionResponse1;
  }
  if (managerData.QuestionResponse2 === undefined) {
    var questionresponse2 = null;
  } else {
    questionresponse2 = managerData.QuestionResponse2;
  }
  if (managerData.QuestionResponse3 === undefined) {
    var questionresponse3 = null;
  } else {
    questionresponse3 = managerData.QuestionResponse3;
  }

  var ManagerDetails = {
    Question0: managerData.Question[0].Id,
    Question1: managerData.Question[1].Id,
    Question2: managerData.Question[2].Id,
    Question3: managerData.Question[3].Id,

    Question: managerData.Question,
    QuestionResponse0: questionresponse0,
    QuestionResponse1: questionresponse1,
    QuestionResponse2: questionresponse2,
    QuestionResponse3: questionresponse3,
    pronouns: managerData.pronouns,
    schoolname: managerData.school,
    usertitle: managerData.usertitle,
    city: managerData.location,
  };

  axiosInstance({
    method: "POST",
    url: getAPIURL(constants.UPDATE_MANAGER_PROFILE_QUESTIONRESPONSE_URL, {
      ":id": managerId,
    }),
    data: ManagerDetails,
  })
    .then(function (response) {
      NotificationManager.success(
        "Detail Added Successfully",
        "Success",
        3000,
        null,
        null,
        ""
      );
      browserHistory.push("/managerapp/profile/view");
      window.location.reload();

      dispatch({
        type: "LAYOUT/CHANGE_LOADER",
        payload: {
          loaderState: false,
        },
      });
    })
    .catch((error) => {
      if (error.response.status === 400) {
        dispatch(stopSubmit("addEditAdminProfile", error.response.data));
      } else {
        toastr.error("Some Error Occurred");
      }
    });
};
export const addManagerSocialLinks = (params, callback) => (dispatch) => {
  dispatch({
    type: "LAYOUT/CHANGE_LOADER",
    payload: {
      loaderState: true,
    },
  });

  var orgdata = {
    userid: params.userId,
    socialid: params.socialnetwork_id,
    usersocialurl: params.social_url,
    isactive: true,
    createdby: params.createdby,
  };
  axiosInstance({
    method: "POST",
    url: getAPIURL(constants.SOCIAL_LINKS_CREATE_URL),
    data: orgdata,
  })
    .then(function (response) {
      NotificationManager.success(
        "Social Link Added Successfully",
        "Social Link success",
        3000,
        null,
        null,
        ""
      );
      dispatch(getManagerProfile(params.org, params.userId));
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
      NotificationManager.error(
        "Maximum three social link are allowed",
        "Error",
        3000,
        null,
        null,
        ""
      );
    });
};

export const addManagerProfileImage = (params, callback) => (dispatch) => {
  dispatch({
    type: "LAYOUT/CHANGE_LOADER",
    payload: {
      loaderState: true,
    },
  });

  awsConfig.dirName =
    "Profileimage" + "/" + params.intern; /* eslint-disable-line */
  if (params.Type === "File") {
    uploadCroppingFile(params.file, params.Type, awsConfig)
      .then((data) => {
        var documentdata = {
          photourl: data.location,
          internId: params.intern,
        };
        axiosInstance({
          method: "PUT",
          url: getAPIURL(constants.UPDATE_USER_PROFILE_IMAGE_URL, {
            ":id": params.intern,
          }),
          data: documentdata,
        })
          .then((response) => {
            NotificationManager.success(
              "Add Profile Image Successfully",
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

            if (error.response.status === 400) {
              dispatch(stopSubmit("Profile", error.response.data));
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
  }
};

export const addUserInterests = (params, callback) => (dispatch) => {
  dispatch({
    type: "LAYOUT/CHANGE_LOADER",
    payload: {
      loaderState: true,
    },
  });

  var orgdata = {
    userid: params.userId,
    interestsArry: params.interestsarry,
    isactive: true,
    createdby: params.createdby,
    orgid: params.org,
  };
  axiosInstance({
    method: "POST",
    url: getAPIURL(constants.USER_INTERESTS_CREATE_URL),
    data: orgdata,
  })
    .then(function (response) {
      NotificationManager.success(
        "Interest Added Successfully",
        "Interest success",
        3000,
        null,
        null,
        ""
      );
      callback();
      dispatch(getAdminProfile(params.org, params.userId));
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
      //     dispatch(stopSubmit('addEditEngageForm', error.response.data));
      // } else {
      //     toastr.error('Some Error Occurred')
      // }
    });
};
export const addManagerInterests = (params, callback) => (dispatch) => {
  dispatch({
    type: "LAYOUT/CHANGE_LOADER",
    payload: {
      loaderState: true,
    },
  });

  var orgdata = {
    userid: params.userId,
    interestsArry: params.interestsarry,
    isactive: true,
    createdby: params.createdby,
    orgid: params.org,
  };
  axiosInstance({
    method: "POST",
    url: getAPIURL(constants.USER_INTERESTS_CREATE_URL),
    data: orgdata,
  })
    .then(function (response) {
      NotificationManager.success(
        "Interest Added Successfully",
        "Interest success",
        3000,
        null,
        null,
        ""
      );
      callback();
      dispatch(getManagerProfile(params.org, params.userId));
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
      //     dispatch(stopSubmit('addEditEngageForm', error.response.data));
      // } else {
      //     toastr.error('Some Error Occurred')
      // }
    });
};
export const addInternInterests = (params, callback) => (dispatch) => {
  dispatch({
    type: "LAYOUT/CHANGE_LOADER",
    payload: {
      loaderState: true,
    },
  });

  var orgdata = {
    userid: params.userId,
    interestsArry: params.interestsarry,
    isactive: true,
    createdby: params.createdby,
    orgid: params.org,
  };
  axiosInstance({
    method: "POST",
    url: getAPIURL(constants.USER_INTERESTS_CREATE_URL),
    data: orgdata,
  })
    .then(function (response) {
      NotificationManager.success(
        "Interest Added Successfully",
        "Interest success",
        3000,
        null,
        null,
        ""
      );
      callback();
      dispatch(getInternProfile(params.org, params.userId));
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
export const deleteUserInterests = (userInterestsId) => (dispatch) => {
  dispatch({
    type: "LAYOUT/CHANGE_LOADER",
    payload: {
      loaderState: true,
    },
  });

  axiosInstance({
    method: "DELETE",
    url: getAPIURL(constants.USER_INTERESTS_DELETE_URL, {
      ":id": userInterestsId,
    }),
    data: {},
  }).then(function (response) {
    NotificationManager.success(
      "Interest Deleted Successfully",
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
