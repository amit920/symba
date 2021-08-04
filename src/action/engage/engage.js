import axiosInstance from "../../utils/axiosApi";
// import _ from "lodash";
import * as constants from "../../utils/constants";
import { getAPIURL } from "../../utils/getApiUrl";
// import checkAlreadyLogin from "../../utils/checkAlreadyLogin";
import { toastr } from "react-redux-toastr";
import { uploadFile } from "react-s3";
import { stopSubmit, reset } from "redux-form";
import createBrowserHistory from "history/createBrowserHistory";
import { NotificationManager } from "../../components/common/react-notifications";

const browserHistory = createBrowserHistory();

const awsConfig = {
  bucketName: constants.BUCKET_NAME, //PROD
  region: constants.AWS_REGION,
  accessKeyId: constants.AWS_ACCESS_KEY_ID,
  secretAccessKey: constants.AWS_ACCESS_SECRET_ID,
};

export const updateEngagCategoryDetails = (params, callback) => (dispatch) => {
  dispatch({
    type: "LAYOUT/CHANGE_LOADER",
    payload: {
      loaderState: true,
    },
  });
  var deptdata = {
    categoryname: params.categoryname,
    isactive: true,
    modifiedby: params.createby,
    modifiedon: new Date(),
  };
  axiosInstance({
    method: "PUT",
    url: getAPIURL(constants.UPDATE_ORG_ENGAGE_CATEGORY_LIST_URL, {
      ":Categoryid": params.Categoryid,
    }),
    data: deptdata,
  })
    .then((response) => {
      NotificationManager.success(
        "Engage Category Updated Successfully",
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
export const updateDiscussionBoardTopic =
  (orgid, params, callback) => (dispatch) => {
    dispatch({
      type: "LAYOUT/CHANGE_LOADER",
      payload: {
        loaderState: true,
      },
    });
    var topicdata = {
      topictext: params.Topic_text,
      modifiedon: params.modifiedon,
      modifiedby: params.modifiedby,
    };
    axiosInstance({
      method: "PUT",
      url: getAPIURL(constants.UPDATE_TOPIC_BY_TOPICIDID_URL, {
        ":id": params.topic_id,
      }),
      data: topicdata,
    })
      .then(function (response) {
        NotificationManager.success(
          "Topic updated Successfully",
          "Success",
          3000,
          null,
          null,
          ""
        );
        window.location.reload(false);
        // callback();
        // dispatch(
        //   getTopicDetailsByTopicId({
        //     orgid: orgid,
        //     topic_Id: params.topic_id,
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
        // if (error.response.status === 400) {
        //   dispatch(stopSubmit("editTopicPopUpForm", error.response.data));
        // } else {
        //   toastr.error("Some Error Occurred");
        // }
      });
  };
export const updateDiscussionBoardTopicComment =
  (params, callback) => (dispatch) => {
    dispatch({
      type: "LAYOUT/CHANGE_LOADER",
      payload: {
        loaderState: true,
      },
    });
    var topiccommentdata = {
      commenttext: params.comments,
      modifiedon: params.modifiedon,
      modifiedby: params.modifiedby,
    };
    axiosInstance({
      method: "PUT",
      url: getAPIURL(constants.UPDATE_TOPICCOMMENT_BY_COMMENTID_URL, {
        ":id": params.comment_id,
      }),
      data: topiccommentdata,
    })
      .then(function (response) {
        NotificationManager.success(
          "Comment updated Successfully",
          "Success",
          3000,
          null,
          null,
          ""
        );
        callback();
        dispatch(reset("editCommentPopUpForm"));
        dispatch(reset("editmanagerCommentPopUpForm"));
        dispatch(reset("editinternCommentPopUpForm"));
        dispatch(reset("editalumniCommentPopUpForm"));
        dispatch(
          getTopicCommentsList({
            topicid: params.topicid,
            orgid: params.orgid,
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
        // if (error.response.status === 400) {
        //   dispatch(stopSubmit("editTopicPopUpForm", error.response.data));
        // } else {
        //   toastr.error("Some Error Occurred");
        // }
      });
  };

export const AddEngageDetail = (params, callback, history) => (dispatch) => {
  dispatch({
    type: "LAYOUT/CHANGE_LOADER",
    payload: {
      loaderState: true,
    },
  });

  awsConfig.dirName = params.orgId + "/" + params.engage_category;
  if (params.Type === "File") {
    var fileObj = new File([params.filelinkdata], params.filelinkdata.name, {
      type: params.filelinkdata.type,
    });
    uploadFile(fileObj, awsConfig)
      .then((data) => {
        var documentdata = {
          engage_category: params.engage_category,
          engage_video_title: params.engage_video_title,
          engage_video_url: data.location,
          engage_video_description: params.engage_video_description,
          isactive: true,
          createdby: params.createdby,
        };
        axiosInstance({
          method: "POST",
          url: getAPIURL(constants.ENGAGE_CREATE_URL),
          data: documentdata,
        })
          .then((response) => {
            NotificationManager.success(
              "Engage Video Added Successfully",
              "Success",
              3000,
              null,
              null,
              ""
            );
            browserHistory.push("/app/engage/list");
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
              dispatch(stopSubmit("addEditEngageForm", error.response.data));
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
      engage_category: params.engage_category,
      engage_video_title: params.engage_video_title,
      engage_video_url: params.engage_video_url,
      engage_video_description: params.engage_video_description,
      isactive: true,
      createdby: params.createdby,
    };

    axiosInstance({
      method: "POST",
      url: getAPIURL(constants.ENGAGE_CREATE_URL),
      data: documentdata,
    })
      .then((response) => {
        NotificationManager.success(
          "Engage Video Added Successfully",
          "Success",
          3000,
          null,
          null,
          ""
        );
        browserHistory.push("/app/engage/list");
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
          dispatch(stopSubmit("addEditEngageForm", error.response.data));
        } else {
          toastr.error("Some Error Occurred");
        }
      });
  }
};
export const getEngageVideoList = (filterObj) => (dispatch) => {
  var data = {
    params: filterObj,
  };
  axiosInstance
    .get(getAPIURL(constants.GET_ENGAGE_VIDEO_LIST_BY_CATEGORYID_URL, {}), data)
    .then(function (response) {
      dispatch({
        type: "ENGAGE/ENGAGEVIDEO_LIST",
        payload: {
          engageVideoList: response.data.engagevideo,
          engageVideoCount: response.data.count,
        },
      });
    })
    .catch(function (error) {
      toastr.error("Some Error Occurred");
    });
};

export const getEngageVideoDetails = (filterObj) => (dispatch) => {
  var data = {
    params: filterObj,
  };
  axiosInstance
    .get(
      getAPIURL(constants.GET_ENGAGE_VIDEO_LIST_BY_ENGAGEVIDEOID_URL, {
        ":id": filterObj.engagevideoid,
      }),
      data
    )
    .then(function (response) {
      dispatch({
        type: "ENGAGE/ENGAGEVIDEO_DETAILS",
        payload: {
          engageVideoDetail: response.data,
        },
      });
    })
    .catch(function (error) {
      browserHistory.push("/unauthorizedpage");
      window.location.reload(false);
    });
};

export const AddEngageVideoComments = (params, callback) => (dispatch) => {
  dispatch({
    type: "LAYOUT/CHANGE_LOADER",
    payload: {
      loaderState: true,
    },
  });

  var commentdata = {
    engage_video_id: params.engage_video_id,
    commentuser: params.createdby,
    commenttext: params.commenttext,
    isactive: true,
    createdby: params.createdby,
  };
  axiosInstance({
    method: "POST",
    url: getAPIURL(constants.ENGAGE_COMMENTS_CREATE_URL),
    data: commentdata,
  })
    .then(function (response) {
      NotificationManager.success(
        "Comments Added Successfully",
        "success",
        3000,
        null,
        null,
        ""
      );

      // toastr.success('Comments Added Successfully');
      window.location.reload(false);
      callback();
      dispatch(reset("engageVideoCommentForm"));
      dispatch(
        getEngageVideoCommentsList({
          engagevideoid: params.engage_video_id,
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
    });
};

export const getEngageVideoCommentsList = (filterObj) => (dispatch) => {
  var data = {
    params: filterObj,
  };
  axiosInstance
    .get(getAPIURL(constants.GET_ENGAGECOMMENTS_LIST_BY_VIDEOID_URL, {}), data)
    .then(function (response) {
      dispatch({
        type: "ENGAGE/ENGAGEVIDEOCOMMENTS_LIST",
        payload: {
          videoCommentList: response.data.engagecomment,
          videoCommentCount: response.data.count,
        },
      });
    })
    .catch(function (error) {
      toastr.error("Some Error Occurred");
    });
};

export const updateEngageVideodetail =
  (ordId, params, callback) => (dispatch) => {
    dispatch({
      type: "LAYOUT/CHANGE_LOADER",
      payload: {
        loaderState: true,
      },
    });
    awsConfig.dirName = ordId;
    if (params.Type === "File") {
      var fileObj = new File([params.filelinkdata], params.filelinkdata.name, {
        type: params.filelinkdata.type,
      });
      uploadFile(fileObj, awsConfig)
        .then((data) => {
          var documentdata = {
            // engage_category: params.engage_category,
            engage_video_title: params.engage_video_title,
            engage_video_url: params.engage_video_url,
            engage_video_description: params.engage_video_description,
            isactive: true,
            createdby: params.createdby,
            EngageVideoId: params.EngageVideoId,
          };
          axiosInstance({
            method: "PUT",
            url: getAPIURL(constants.ENGAGE_VEDIO_UPDATE_URL, {
              ":engage_video_id": params.engage_video_id,
            }),
            data: documentdata,
          })
            .then((response) => {
              NotificationManager.success(
                "Engage updated Successfully",
                "Success",
                3000,
                null,
                null,
                ""
              );
              callback();
              window.location.reload(false);
              // dispatch(reset('editOverviewResourcesDocumentForm'));
              dispatch(
                getEngageVideoList({
                  deptid: params.departmentid,
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
                  stopSubmit("editEngageVideoPopUpForm", error.response.data)
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
        // engage_category: params.engage_category,
        engage_video_title: params.engage_video_title,
        engage_video_url: params.engage_video_url,
        engage_video_description: params.engage_video_description,
        isactive: true,
        createdby: params.createdby,
        EngageVideoId: params.EngageVideoId,
      };
      axiosInstance({
        method: "PUT",
        url: getAPIURL(constants.ENGAGE_VEDIO_UPDATE_URL, {
          ":engage_video_id": params.engage_video_id,
        }),
        data: documentdata,
      })
        .then((response) => {
          NotificationManager.success(
            "Engage updated Successfully",
            "Success",
            3000,
            null,
            null,
            ""
          );
          window.location.reload(false);
          callback();
          // dispatch(reset('editOverviewResourcesDocumentForm'));
          dispatch(
            getEngageVideoList({
              deptid: params.departmentid,
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
              stopSubmit("editEngageVideoPopUpForm", error.response.data)
            );
          } else {
            toastr.error("Some Error Occurred");
          }
        });
    }
  };

export const engageDeleteVideo = (engageVideoId) => (dispatch) => {
  dispatch({
    type: "LAYOUT/CHANGE_LOADER",
    payload: {
      loaderState: true,
    },
  });

  axiosInstance({
    method: "DELETE",
    url: getAPIURL(constants.ENGAGE_VEDIO_DELETE_URL, {
      ":engage_video_id": engageVideoId,
    }),
    data: {},
  })
    .then(function (response) {
      NotificationManager.success(
        "Engage Video deleted successfully",
        "Success",
        3000,
        null,
        null,
        ""
      );
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
    });
};
//discussion board
//admin
export const addDiscussionTopic = (params, callback) => (dispatch) => {
  dispatch({
    type: "LAYOUT/CHANGE_LOADER",
    payload: {
      loaderState: true,
    },
  });

  var orgdata = {
    // topictext: params.topic,
    topictext: params.topictext,
    userid: params.user_id,
    org: params.orgid,
    isactive: true,
    createdby: params.user_id,
    usertypeid: params.usertype,
  };
  axiosInstance({
    method: "POST",
    url: getAPIURL(constants.ADDTOPIC_CREATE_URL),
    data: orgdata,
  })
    .then(function (response) {
      NotificationManager.success(
        "Add Topic Successfully",
        "Success",
        3000,
        null,
        null,
        ""
      );
      callback();
      // dispatch(reset("addTopicPopUpForm"));
      browserHistory.push("/app/engage/list/2");
      window.location.reload();
      dispatch(
        getDiscussionTopicList({
          orgid: params.orgid,
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
        dispatch(stopSubmit("addTopicPopUpForm", error.response.data));
      } else {
        toastr.error("Some Error Occurred");
      }
    });
};
//discussion board manger
export const addManagerDiscussionTopic = (params, callback) => (dispatch) => {
  dispatch({
    type: "LAYOUT/CHANGE_LOADER",
    payload: {
      loaderState: true,
    },
  });

  var orgdata = {
    // topictext: params.topic,
    topictext: params.topictext,
    userid: params.user_id,
    org: params.orgid,
    isactive: true,
    createdby: params.user_id,
    usertypeid: params.usertype,
  };
  axiosInstance({
    method: "POST",
    url: getAPIURL(constants.ADDTOPIC_CREATE_URL),
    data: orgdata,
  })
    .then(function (response) {
      NotificationManager.success(
        "Add Topic Successfully",
        "Success",
        3000,
        null,
        null,
        ""
      );
      callback();
      browserHistory.push("/managerapp/engage/list/2");
      window.location.reload();
      // dispatch(reset("addManagerTopicPopUpForm"));
      dispatch(
        getDiscussionTopicList({
          orgid: params.orgid,
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
        dispatch(stopSubmit("addManagerTopicPopUpForm", error.response.data));
      } else {
        toastr.error("Some Error Occurred");
      }
    });
};

//discussion board intern
export const addInternDiscussionTopic = (params, callback) => (dispatch) => {
  dispatch({
    type: "LAYOUT/CHANGE_LOADER",
    payload: {
      loaderState: true,
    },
  });

  var orgdata = {
    // topictext: params.topic,
    topictext: params.topictext,
    userid: params.user_id,
    org: params.orgid,
    isactive: true,
    createdby: params.user_id,
    usertypeid: params.usertype,
  };
  axiosInstance({
    method: "POST",
    url: getAPIURL(constants.ADDTOPIC_CREATE_URL),
    data: orgdata,
  })
    .then(function (response) {
      NotificationManager.success(
        "Add Topic Successfully",
        "Success",
        3000,
        null,
        null,
        ""
      );
      callback();
      browserHistory.push("/internapp/engage/view/2");
      window.location.reload();
      // dispatch(reset("addInternTopicPopUpForm"));
      dispatch(
        getDiscussionTopicList({
          orgid: params.orgid,
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
        dispatch(stopSubmit("addInternTopicPopUpForm", error.response.data));
      } else {
        toastr.error("Some Error Occurred");
      }
    });
};

export const getDiscussionTopicList = (filterObj) => (dispatch) => {
  var data = {
    params: filterObj,
  };
  axiosInstance
    .get(getAPIURL(constants.DISCUSSION_TOPIC_LIST_URL, {}), data)
    .then(function (response) {
      dispatch({
        type: "DISCUSSION/TOPIC_LIST",
        payload: {
          topicList: response.data.topic,
          topicCount: response.data.count,
        },
      });
    })
    .catch(function (error) {
      toastr.error("Some Error Occurred");
    });
};

export const getTopicDetailsByTopicId = (filterObj) => (dispatch) => {
  var data = {
    params: filterObj,
  };
  axiosInstance
    .get(
      getAPIURL(constants.GET_TOPIC_BY_TOPICID_URL, {
        ":id": filterObj.topicid,
      }),
      data
    )
    .then(function (response) {
      dispatch({
        type: "DISCUSSION/TOPIC_DETAILS",
        payload: {
          topicDetail: response.data,
        },
      });
    })
    .catch(function (error) {
      browserHistory.push("/unauthorizedpage");
      window.location.reload(false);
    });
};

export const AddTopicComment = (params, callback) => (dispatch) => {
  dispatch({
    type: "LAYOUT/CHANGE_LOADER",
    payload: {
      loaderState: true,
    },
  });

  var orgdata = {
    topicid: params.topicid,
    userid: params.userid,
    org: params.orgid,
    commenttext: params.topiccommenttext,
    isactive: true,
    createdby: params.userid,
  };
  axiosInstance({
    method: "POST",
    url: getAPIURL(constants.ADD_TOPIC_COMMENT_CREATE_URL),
    data: orgdata,
  })
    .then(function (response) {
      NotificationManager.success(
        "Topic Comment Added Successfully",
        "Success",
        3000,
        null,
        null,
        ""
      );
      // browserHistory.push("/app/engage/list");
      // window.location.reload(false);
      // this.state.history.push("/app/engage/list")

      // callback();
      dispatch(reset("topicCommentForm"));
      dispatch(reset("managerTopicCommentForm"));
      dispatch(reset("alumniTopicCommentForm"));
      dispatch(reset("internTopicCommentForm"));
      dispatch(
        getTopicCommentsList({
          topicid: params.topicid,
          orgid: params.orgid,
        })
      );
      dispatch(
        getTopicDetailsByTopicId({
          topicid: params.topicid,
          orgid: params.orgid,
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
        dispatch(stopSubmit("topicCommentForm", error.response.data));
      } else {
        toastr.error("Some Error Occurred");
      }
    });
};

export const getTopicCommentsList = (filterObj) => (dispatch) => {
  dispatch({
    type: "LAYOUT/CHANGE_LOADER",
    payload: {
      loaderState: true,
    },
  });
  var data = {
    params: filterObj,
  };
  axiosInstance
    .get(getAPIURL(constants.GET_TOPIC_COMMENTS_LIST_BY_TOPICID_URL, {}), data)
    .then(function (response) {
      dispatch({
        type: "DISCUSSION/TOPIC_COMMENTS_LIST",
        payload: {
          topicCommentList: response.data.topiccomment,
          topicCommentCount: response.data.count,
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

export const adminDeleteComment = (commentId, topicid, orgid) => (dispatch) => {
  dispatch({
    type: "LAYOUT/CHANGE_LOADER",
    payload: {
      loaderState: true,
    },
  });

  axiosInstance({
    method: "DELETE",
    url: getAPIURL(constants.ADMIN_COMMENT_DELETE_URL, {
      ":comment_id": commentId,
    }),
    data: {},
  })
    .then(function (response) {
      NotificationManager.success(
        "Comment deleted successfully",
        "Success",
        3000,
        null,
        null,
        ""
      );
      dispatch(
        getTopicCommentsList({
          topicid: topicid,
          orgid: orgid,
        })
      );
      dispatch(
        getTopicDetailsByTopicId({
          topicid: topicid,
          orgid: orgid,
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
    });
};

export const adminDeleteTopic = (topicid) => (dispatch) => {
  dispatch({
    type: "LAYOUT/CHANGE_LOADER",
    payload: {
      loaderState: true,
    },
  });

  axiosInstance({
    method: "DELETE",
    url: getAPIURL(constants.ADMIN_TOPIC_DELETE_URL, {
      ":topic_id": topicid,
    }),
    data: {},
  })
    .then(function (response) {
      NotificationManager.success(
        "Topic deleted successfully",
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

export const Admin_Delete_Topic = (topicid) => (dispatch) => {
  dispatch({
    type: "LAYOUT/CHANGE_LOADER",
    payload: {
      loaderState: true,
    },
  });

  axiosInstance({
    method: "DELETE",
    url: getAPIURL(constants.ADMIN_TOPIC_DELETE_URL, {
      ":topic_id": topicid,
    }),
    data: {},
  })
    .then(function (response) {
      NotificationManager.success(
        "Topic deleted successfully",
        "Success",
        3000,
        null,
        null,
        ""
      );

      browserHistory.push("/app/engage/list/2");
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
    });
};

export const Manager_Delete_Topic = (topicid) => (dispatch) => {
  dispatch({
    type: "LAYOUT/CHANGE_LOADER",
    payload: {
      loaderState: true,
    },
  });

  axiosInstance({
    method: "DELETE",
    url: getAPIURL(constants.ADMIN_TOPIC_DELETE_URL, {
      ":topic_id": topicid,
    }),
    data: {},
  })
    .then(function (response) {
      NotificationManager.success(
        "Topic deleted successfully",
        "Success",
        3000,
        null,
        null,
        ""
      );

      browserHistory.push("/managerapp/engage/list/2");
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
    });
};
export const Intern_Delete_Topic = (topicid) => (dispatch) => {
  dispatch({
    type: "LAYOUT/CHANGE_LOADER",
    payload: {
      loaderState: true,
    },
  });

  axiosInstance({
    method: "DELETE",
    url: getAPIURL(constants.ADMIN_TOPIC_DELETE_URL, {
      ":topic_id": topicid,
    }),
    data: {},
  })
    .then(function (response) {
      NotificationManager.success(
        "Topic deleted successfully",
        "Success",
        3000,
        null,
        null,
        ""
      );

      browserHistory.push("/internapp/engage/view/2");
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
    });
};
export const Alumni_Delete_Topic = (topicid) => (dispatch) => {
  dispatch({
    type: "LAYOUT/CHANGE_LOADER",
    payload: {
      loaderState: true,
    },
  });

  axiosInstance({
    method: "DELETE",
    url: getAPIURL(constants.ADMIN_TOPIC_DELETE_URL, {
      ":topic_id": topicid,
    }),
    data: {},
  })
    .then(function (response) {
      NotificationManager.success(
        "Topic deleted successfully",
        "Success",
        3000,
        null,
        null,
        ""
      );

      browserHistory.push("/alumniapp/engage/view/2");
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
    });
};
export const addAluminiDiscussionTopic = (params, callback) => (dispatch) => {
  dispatch({
    type: "LAYOUT/CHANGE_LOADER",
    payload: {
      loaderState: true,
    },
  });

  var orgdata = {
    // topictext: params.topic,
    topictext: params.topictext,
    userid: params.user_id,
    org: params.orgid,
    isactive: true,
    createdby: params.user_id,
    usertypeid: params.usertype,
  };
  axiosInstance({
    method: "POST",
    url: getAPIURL(constants.ADDTOPIC_CREATE_URL),
    data: orgdata,
  })
    .then(function (response) {
      NotificationManager.success(
        "Add Topic Successfully",
        "Success",
        3000,
        null,
        null,
        ""
      );
      callback();
      browserHistory.push("/alumniapp/engage/view/2");
      window.location.reload();
      dispatch(
        getDiscussionTopicList({
          orgid: params.orgid,
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
        dispatch(stopSubmit("addAlumniTopicPopUpForm", error.response.data));
      } else {
        toastr.error("Some Error Occurred");
      }
    });
};

//reply on commnet(sub comment)
export const addSecondLevelComment = (params, callback) => (dispatch) => {
  dispatch({
    type: "LAYOUT/CHANGE_LOADER",
    payload: {
      loaderState: true,
    },
  });

  var replycommentdata = {
    org: params.OrgId,
    topicid: params.TopicId,
    userid: params.UserId,
    commenttext: params.SecondLevelCommentText,
    parentcommentid: params.ParentCommentId,
    isactive: true,
    createdby: params.UserId,
  };
  axiosInstance({
    method: "POST",
    url: getAPIURL(constants.ADD_REPLY_ON_COMMENT_URL),
    data: replycommentdata,
  })
    .then(function (response) {
      NotificationManager.success(
        "Reply Added Successfully",
        "Success",
        3000,
        null,
        null,
        ""
      );
      dispatch(
        getTopicCommentsList({
          topicid: params.TopicId,
          orgid: params.OrgId,
        })
      );
      dispatch(
        getTopicDetailsByTopicId({
          topicid: params.TopicId,
          orgid: params.OrgId,
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
        dispatch(stopSubmit("topicCommentForm", error.response.data));
      } else {
        toastr.error("Some Error Occurred");
      }
    });
};

export const addReacts = (params, callback) => (dispatch) => {
  // dispatch({
  //   type: "LAYOUT/CHANGE_LOADER",
  //   payload: {
  //     loaderState: true,
  //   },
  // });
  var reactsata = {
    userid: params.UserId,
    topicid: params.TopicId,
    reactionsmasterid: params.ReactionsId,
    org: params.OrgId,
    isactive: true,
    createdby: params.UserId,
    count: 1,
  };
  axiosInstance({
    method: "POST",
    url: getAPIURL(constants.ADD_TOPIC_REACTS_URL),
    data: reactsata,
  })
    .then(function (response) {
      // toastr.success('Reactions Added Successfully');
      // callback();
      dispatch(
        getTopicDetailsByTopicId({
          topicid: params.TopicId,
          orgid: params.OrgId,
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
      //     dispatch(stopSubmit('addDepartmentPopUpform', error.response.data));
      // } else {
      //     toastr.error('Some Error Occurred')
      // }
    });
};
export const addCommentReacts = (params, callback) => (dispatch) => {
  // dispatch({
  //   type: "LAYOUT/CHANGE_LOADER",
  //   payload: {
  //     loaderState: true,
  //   },
  // });
  var reactsata = {
    userid: params.UserId,
    commentid: params.CommenId,
    reactionsmasterid: params.ReactionsId,
    org: params.OrgId,
    isactive: true,
    createdby: params.UserId,
    count: 1,
  };
  axiosInstance({
    method: "POST",
    url: getAPIURL(constants.ADD_COMMENT_REACTS_URL),
    data: reactsata,
  })
    .then(function (response) {
      // toastr.success('Reactions Added Successfully');
      // callback();
      dispatch(
        getTopicCommentsList({
          topicid: params.TopicId,
          orgid: params.OrgId,
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
      //     dispatch(stopSubmit('addDepartmentPopUpform', error.response.data));
      // } else {
      //     toastr.error('Some Error Occurred')
      // }
    });
};
export const addTopicReacts = (params, callback) => (dispatch) => {
  // dispatch({
  //   type: "LAYOUT/CHANGE_LOADER",
  //   payload: {
  //     loaderState: true,
  //   },
  // });
  var reactsata = {
    userid: params.UserId,
    topicid: params.TopicId,
    reactionsmasterid: params.ReactionsId,
    org: params.OrgId,
    isactive: true,
    createdby: params.UserId,
    count: 1,
  };
  axiosInstance({
    method: "POST",
    url: getAPIURL(constants.ADD_TOPIC_REACTS_URL),
    data: reactsata,
  })
    .then(function (response) {
      // toastr.success('Reactions Added Successfully');
      // callback();
      dispatch(
        getDiscussionTopicList({
          orgid: params.OrgId,
          limit_size: constants.DEFAULT_LIMIT_SIZE,
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
      //     dispatch(stopSubmit('addDepartmentPopUpform', error.response.data));
      // } else {
      //     toastr.error('Some Error Occurred')
      // }
    });
};
// export const getUserTopicReactions = (filterObj) => (dispatch) => {
//   dispatch({
//     type: "LAYOUT/CHANGE_LOADER",
//     payload: {
//       loaderState: true,
//     },
//   });
//   var data = {
//     params: filterObj,
//   };
//   axiosInstance
//     .get(getAPIURL(constants.GET_USER_TOPIC_REACTIONS_LIST_URL, {}), data)
//     .then(function (response) {
//       dispatch({
//         type: "REACTIONS/USER_TOPIC_REACTIONS_LIST",
//         payload: {
//           topicReactsList: response.data.userReactionsList,
//           topicReactsCount: response.data.count,
//         },
//       });
//       dispatch({
//         type: "LAYOUT/CHANGE_LOADER",
//         payload: {
//           loaderState: false,
//         },
//       });
//     })
//     .catch(function (error) {
//       toastr.error("Some Error Occurred");
//     });
// };
