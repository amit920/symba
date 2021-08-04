import React, { Component, Fragment } from "react";
import {
  Row,
  // Input,
  // CardTitle,
  // FormGroup,
  // Label,
  // CustomInput,
  Button,
  //Tooltip,
  // FormText,
  // Form,
  // ModalHeader,
  // ModalBody,
  // ModalFooter,
  // Table,
  // Modal,
} from "reactstrap";

// import { NavLink } from "react-router-dom";
// import { injectIntl } from "react-intl";
// import IntlMessages from "../../../helpers/IntlMessages";
// import DatePicker from "react-datepicker";
// import moment from "moment";
// import TagsInput from "react-tagsinput";
import "react-tagsinput/react-tagsinput.css";
import "react-datepicker/dist/react-datepicker.css";
import "rc-switch/assets/index.css";
import "rc-slider/assets/index.css";
import "react-rater/lib/react-rater.css";
import { formatDateTime } from "../../../utils/globalFunctions";
import { Colxx, Separator } from "../../../components/common/CustomBootstrap";

import "emoji-mart/css/emoji-mart.css";
// import { Picker } from "emoji-mart";
// import { ReactionBarSelector } from "@charkour/react-reactions";
// import Breadcrumb from "../../../containers/navs/Breadcrumb";
// import Select from "react-select";
// import CustomSelectInput from "../../../components/common/CustomSelectInput";
import {
  Field,
  reduxForm,
  // FieldArray,
  //formValueSelector,
  reset,
} from "redux-form";
import {
  // renderTextField,
  renderTextArea,
  // renderDateField,
  validate,
  // renderSelectField,
  // ComboField,
  // renderMultiSelectField,
  // fileInput,
} from "../../util/form-fields";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  getTopicDetailsByTopicId,
  getTopicCommentsList,
  adminDeleteComment,
  updateDiscussionBoardTopic,
  updateDiscussionBoardTopicComment,
  addSecondLevelComment,
  addReacts,
  addCommentReacts,
  // getUserTopicReactions
} from "../../../action/engage/engage";
import { getCommentReactions } from "../../../action/master/masterData";
import EditTopicPopUpForm from "../engage/editTopicPopUpForm";
import EditCommentPopUpForm from "../engage/editCommentPopUpForm";
import { Admin_Delete_Topic } from "../../../action/engage/engage";
// import * as constants from "../../../utils/constants";
// import axiosInstance from "../../../utils/axiosApi";
// import { getAPIURL } from "../../../utils/getApiUrl";
// import ReactPlayer from "react-player";
// import EngageReducer from "../../../reducers/engage_reducer";

class topicCommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTopicData: {},
      editTopicModal: false,
      // topicdata: "",
      currentCommentData: "",
      editCommentModal: false,

      indexClick: [],

      emojiPickerState: false,
      clickTopic: "",
      // commentClick: false,
      //   addNewOverviewResourcesModal: false,
      //   editOverviewResourcesModal: false,
      //   currentResource: {},
    };
  }
  // handleCommentClick = () => {
  //   this.setState({
  //     commentClick: true,
  //   });
  // };
  handleRemoveTopic = (topicid) => {
    this.props.Admin_Delete_Topic(topicid);
  };
  handleReply = (index) => {
    let newchecked = [...this.state.indexClick];
    let value_index = newchecked.findIndex((item) => item === index);
    if (value_index >= 0) {
      newchecked.splice(value_index, 1);
    } else {
      newchecked.push(index);
    }
    this.setState({
      indexClick: newchecked,
    });
  };

  componentDidMount() {
    if (this.props.topicId != null) {
      var filterObj = {
        topicid: this.props.topicId,
        orgid: this.props.currentUser.organization.id,
        userid: this.props.currentUser.UserId,
      };
      this.props.getTopicDetailsByTopicId(filterObj);
      this.props.getTopicCommentsList(filterObj);
    }
    this.props.getCommentReactions();
  }
  getPlainText = (html) => {
    var divContainer = document.createElement("div");
    divContainer.innerHTML = html;
    return divContainer.textContent || divContainer.innerText || "";
  };
  handelInitialValues = () => {
    const overviewObj = {
      topiccommenttext: " ",
    };
    this.props.initialize(overviewObj);
  };
  handleEditTopicData = (topicobj) => {
    this.setState({ editTopicModal: true, currentTopicData: topicobj });
  };
  handleEditTopicComment = (topiccomment, commentid, orgid, topicid) => {
    var selectComment = {
      TopicComment: topiccomment,
      CommentId: commentid,
      OrgId: orgid,
      TopicId: topicid,
    };
    this.setState({
      editCommentModal: true,
      currentCommentData: selectComment,
    });
  };
  closeTopicSubmissionModal = () => {
    this.props.dispatch(reset("editCommentPopUpForm"));
    this.setState({ editTopicModal: false });
  };
  closeCommentSubmissionModal = () => {
    this.setState({
      editCommentModal: false,
    });
  };
  // getTopic = (topic) => {
  //   this.setState({
  //     topicdata: topic,
  //   });
  // };

  triggerPicker = (event, ParentCommentId) => {
    event.preventDefault();

    this.setState({
      emojiPickerState: !this.state.emojiPickerState,
      clickTopic: ParentCommentId,
    });
  };

  triggerPicker2 = (event, SubCommentId) => {
    event.preventDefault();
    this.setState({
      emojiPickerState: !this.state.emojiPickerState,
      clickTopic: SubCommentId,
    });
    // SetEmojiPicker(!emojiPickerState);
  };

  triggerPicker1 = (event, topicId) => {
    event.preventDefault();
    this.setState({
      emojiPickerState: !this.state.emojiPickerState,
      clickTopic: topicId,
    });
    // SetEmojiPicker(!emojiPickerState);
  };

  handleEmojiReacts = (topicId, reactionId) => {
    this.setState({
      ReactionId: reactionId,
    });

    this.setState({
      emojiPickerState: false,
    });
    var reactsObj = {
      UserId: this.props.currentUser.UserId,
      TopicId: topicId,
      ReactionsId: reactionId,
      OrgId: this.props.currentUser.organization.id,
    };
    this.props.addReacts(reactsObj);
  };
  // save  comment emoji
  handleCommentEmojiReacts = (commentId, reactionId) => {
    this.setState({
      ReactionId: reactionId,
    });

    this.setState({
      emojiPickerState: false,
    });
    var reactsObj = {
      UserId: this.props.currentUser.UserId,
      CommenId: commentId,
      ReactionsId: reactionId,
      OrgId: this.props.currentUser.organization.id,
      TopicId: this.props.topicId,
    };
    this.props.addCommentReacts(reactsObj);
  };
  submitUpdatedTopic = (values) => {
    values.modifiedby = this.props.currentUser.UserId;
    // values.Topic_text = this.state.topicdata;
    values.modifiedon = new Date();
    this.props.updateDiscussionBoardTopic(
      this.props.currentUser.organization.id,
      values,
      this.closeEditSubmissionModal
    );
  };
  submitUpdatedTopicComment = (values) => {
    values.modifiedby = this.props.currentUser.UserId;
    values.modifiedon = new Date();
    values.topicid = this.props.topicId;
    values.orgid = this.props.currentUser.organization.id;
    this.props.updateDiscussionBoardTopicComment(
      values,
      this.closeCommentSubmissionModal
    );
  };
  getCurrentUserImage = () => {
    let div = [];
    if (this.props.currentUser) {
      let Container = [];
      if (this.props.currentUser.ProfileImage != null) {
        Container.push(
          <div>
            {
              <img
                className="engage_comment_profile"
                src={this.props.currentUser.ProfileImage}
                alt=""
              ></img>
            }
          </div>
        );
      } else {
        Container.push(
          <div>
            {
              <img
                className="engage_comment_profile"
                src="/assets/img/profile_icon.png"
                alt=""
              />
            }
          </div>
        );
      }
      div.push(<div>{Container}</div>);
    }
    return div;
  };

  getTopicDetail = () => {
    let Container = [];
    if (this.props.topicDetail) {
      let Row = [];
      if (this.props.topicDetail.Topictext != null) {
        Row.push(
          <div>
            {
              <Colxx
                xxs="12"
                sm="9"
                md="9"
                lg="9"
                xl="9"
                className="usercommentpad"
              >
                <div class="row">
                  <Colxx xxs="12" sm="12" md="12" lg="12" xl="12">
                    <div style={{ marginTop: "10px" }}>
                      <span style={{ fontWeight: 600, fontSize: "16px" }}>
                        {this.getPlainText(this.props.topicDetail.Topictext)}
                      </span>
                      {/* <span
                        style={{ fontWeight: 600, fontSize: "16px" }}
                        dangerouslySetInnerHTML={{
                          __html: this.props.topicDetail.Topictext,
                        }}
                      ></span> */}
                      {/* <h2 style={{ fontWeight: "bold" }}>
                        {this.props.topicDetail.Topictext}
                      </h2> */}
                    </div>
                  </Colxx>
                  <Colxx xxs="2" sm="1" md="1" lg="1" xl="1">
                    <Link
                      to={
                        "/app/community/view/" +
                        this.props.topicDetail.Userid +
                        "/" +
                        this.props.topicDetail.UserTypeid
                      }
                    >
                      <img
                        // style={{ width: "100%" }}  style={{ marginLeft: "-30px" }}
                        style={{ width: "30px" }}
                        src={this.props.topicDetail.Image_PostedBy}
                        alt=""
                      ></img>
                    </Link>
                  </Colxx>
                  <Colxx
                    xxs="10"
                    sm="11"
                    md="11"
                    lg="11"
                    xl="11"
                    style={{ display: "flex" }}
                  >
                    <Colxx
                      xxs="10"
                      sm="10"
                      md="10"
                      lg="10"
                      xl="10"
                      className="topiccommentmargin engageuserflex"
                      style={{ marginTop: "6px" }}
                    >
                      {/* <div style={{ display: "flex" }}> */}
                      <p
                        className="truncate mb-0  topicprofilemargin"
                        // style={{
                        //   marginBottom: "2px",
                        //   fontSize: "18px",
                        //   fontWeight: "700",
                        // }}
                      >
                        {this.props.topicDetail.Username}
                      </p>
                      <div style={{ margin: "0px 5px 0px 5px" }}></div>

                      <span className=" mb-0 profilebelowdate">
                        {/* Posted by {this.props.topicDetail.Username} on{" "} */}
                        {formatDateTime(this.props.topicDetail.Createdon)}
                      </span>
                    </Colxx>
                    {/* style={{ marginLeft: "30px" }} */}
                    <Colxx
                      xxs="2"
                      sm="2"
                      md="2"
                      lg="2"
                      xl="2"
                      className="topiccommentmargin--edit"
                    >
                      {this.props.topicDetail.Userid ===
                      this.props.currentUser.UserId ? (
                        <span
                          style={{
                            // fontSize: "18px",
                            // marginLeft: 10,
                            cursor: "pointer",
                            float: "right",
                            fontSize: "large",
                            display: "flex",
                            marginTop: "6px",
                          }}
                        >
                          <i
                            className="fa fa-pencil"
                            style={{
                              marginRight: "8px",
                              color: "#17B298",
                            }}
                            onClick={() =>
                              this.handleEditTopicData(this.props.topicDetail)
                            }
                          ></i>
                          <i
                            className="fa fa-trash-o"
                            style={{
                              color: "#17B298",
                            }}
                            onClick={() => {
                              if (
                                window.confirm(
                                  "Are you sure you want to remove this topic?"
                                )
                              ) {
                                this.handleRemoveTopic(
                                  this.props.topicDetail.Topicid
                                );
                              }
                            }}
                          ></i>
                        </span>
                      ) : null}
                    </Colxx>
                  </Colxx>
                  <Colxx xxs="12" sm="12" md="12" lg="12" xl="12">
                    <Separator className="mb-2 mt-2" />
                  </Colxx>

                  <Colxx xxs="12" sm="12" md="12" lg="12" xl="12">
                    <div className="engagelistflex">
                      <div
                        className="likebuttontopic mb-2"
                        onClick={(e) =>
                          this.triggerPicker1(e, this.props.topicDetail.Topicid)
                        }
                      >
                        <img class="loveimg" alt=""></img>
                      </div>

                      <span className="engagelistflex">
                        {this.props.topicDetail.userReactionsCount > 0
                          ? this.props.topicDetail.userReactions.map(
                              (reacts) => {
                                return (
                                  <div
                                    className="topicdiscussionlike--show mb-2"
                                    style={{ display: "flex" }}
                                  >
                                    <img
                                      style={{ width: "30px" }}
                                      src={reacts.ReactionURL}
                                      alt=""
                                    />
                                    <div style={{ marginTop: "5.5px" }}>
                                      {" "}
                                      {reacts.ReactionCount}{" "}
                                    </div>
                                  </div>
                                );
                              }
                            )
                          : null}
                      </span>
                      <span className="topiccommentlike mb-2">
                        <i class="faas fa-commenting-o"></i>
                        {/* {this.props.topicDetail.TotalTopicComment} */}
                        {this.props.topicDetail.TotalTopicComment === 1
                          ? this.props.topicDetail.TotalTopicComment +
                            ` Comment`
                          : this.props.topicDetail.TotalTopicComment +
                            ` Comments`}
                      </span>
                    </div>
                    {this.state.emojiPickerState &&
                    this.props.topicDetail.Topicid === this.state.clickTopic ? (
                      <div className="reactions-menu reactions-menu--active">
                        {this.props.masterReactsCount > 0
                          ? this.props.masterReactsList.map((emoji) => {
                              return (
                                <Button
                                  aria-label="cry"
                                  className="reactions-menu__reaction"
                                  type="button"
                                  onClick={() =>
                                    this.handleEmojiReacts(
                                      this.props.topicDetail.Topicid,
                                      emoji.reactionsmasterid
                                    )
                                  }
                                >
                                  <span className="reactions-menu__reaction-description">
                                    {emoji.reactionsname}
                                  </span>
                                  <img
                                    className="reactions-icon reactions-menu__icon reactions-icon__creation--medium"
                                    src={emoji.reactionsiconurl}
                                    alt=""
                                    data-test-reactions-icon-type="sad"
                                  ></img>
                                </Button>
                              );
                            })
                          : null}
                      </div>
                    ) : null}
                  </Colxx>
                </div>
              </Colxx>
            }

            {/* <Colxx md="10">
              {
                <div>
              
                  <div style={{ display: "flex" }}>
                    <span
                      dangerouslySetInnerHTML={{
                        __html: this.props.topicDetail.Topictext,
                      }}
                    ></span>
                  
                    {this.props.topicDetail.Userid ===
                    this.props.currentUser.UserId ? (
                      <span
                        style={{
                          fontSize: "18px",
                          marginLeft: 10,
                          cursor: "pointer",
                        }}
                      >
                        <i
                          class="fa fa-pencil"
                          aria-hidden="true"
                          onClick={() =>
                            this.handleEditTopicData(this.props.topicDetail)
                          }
                        ></i>
                      </span>
                    ) : null}
                  </div>
               
                  <span style={{ fontSize: "12px" }}>
                    Posted by {this.props.topicDetail.Username} on{" "}
                    {formatDateTime(this.props.topicDetail.Createdon)}
                  </span>
                </div>
              }
            </Colxx> */}
          </div>
        );
      } else {
        Row.push(<div>{}</div>);
      }
      Container.push(<div>{Row}</div>);
    }
    return Container;
  };
  getTotalTopicComment = () => {
    let Container = [];
    if (this.props.topicDetail) {
      let Row = [];
      if (this.props.topicDetail.Topictext != null) {
        Row.push(
          this.props.topicDetail.TotalTopicComment === 0 ? (
            <h4>Be the first one to comment</h4>
          ) : this.props.topicDetail.TotalTopicComment === 1 ? (
            <h4>{this.props.topicDetail.TotalTopicComment} Comment </h4>
          ) : (
            <h4>{this.props.topicDetail.TotalTopicComment} Comments </h4>
          )
        );
      } else {
        Row.push(<div>{}</div>);
      }
      Container.push(<div>{Row}</div>);
    }
    return Container;
  };
  createtopicCommentList = () => {
    let table = [];
    if (this.props.topicCommentList) {
      if (this.props.topicCommentCount > 0) {
        let Title = [];
        for (let i = 0; i < this.props.topicCommentCount; i++) {
          Title.push(
            <Colxx xxs="12" sm="9" md="9" lg="9" xl="9">
              {
                <div>
                  {/* <Card>
                    <CardBody style={{ padding: "0.5rem" }}> */}
                  <Row>
                    <Colxx xxs="2" sm="2" md="1" lg="1" xl="1">
                      <Link
                        to={
                          "/app/community/view/" +
                          this.props.topicCommentList[i].Userid +
                          "/" +
                          this.props.topicCommentList[i].UserTypeId
                        }
                      >
                        <img
                          // style={{ width: "100%" }}
                          style={{ width: "35px", height: "35px" }}
                          src={this.props.topicCommentList[i].ProfileImage}
                          alt=""
                        ></img>
                      </Link>
                    </Colxx>
                    <Colxx xxs="7" sm="7" md="7" lg="9" xl="9">
                      {/* <div >
                        <div
                          style={{
                            fontWeight: "700",
                            fontSize: "18px",
                            marginLeft: "-15px",
                          }}
                        >
                          {this.props.topicCommentList[i].Username}
                        </div>

                        <span
                          style={{
                            paddingLeft: "10px",
                            fontSize: "14px",
                            marginTop: "4px",
                          }}
                        >
                          {" "}
                          {new Intl.DateTimeFormat("us-GB", {
                            month: "long",
                            day: "2-digit",
                            year: "numeric",
                          }).format(
                            new Date(this.props.topicCommentList[i].Createdon)
                          )}
                        </span>
                      </div> */}
                      {/* <span
                        style={{
                          fontSize: "18px",
                          fontWeight: "400",
                          marginLeft: "-15px",
                        }}
                      >
                        {this.props.topicCommentList[i].ParentCommentText}
                      </span> */}
                      <div className="topiccommentlistmargin">
                        <p className="truncate mb-0  profilemargin">
                          {this.props.topicCommentList[i].Username}
                        </p>
                        <div style={{ margin: "0px 5px 0px 5px" }}></div>
                        <span className=" mb-0  profilebelowdate">
                          {new Intl.DateTimeFormat("us-GB", {
                            month: "long",
                            day: "2-digit",
                            year: "numeric",
                          }).format(
                            new Date(this.props.topicCommentList[i].Createdon)
                          )}
                        </span>
                      </div>
                      <div className="topiccommentlistmargin">
                        <span
                          style={{
                            fontSize: "15px",
                            fontWeight: "400",
                            marginBottom: "8px",
                          }}
                        >
                          {this.props.topicCommentList[i].ParentCommentText}
                        </span>
                      </div>

                      <Row>
                        <Colxx
                          xxs="12"
                          sm="12"
                          md="12"
                          lg="12"
                          xl="12"
                          className="likebuttonmargin"
                        >
                          <div
                            className="likebuttontopic"
                            onClick={(e) =>
                              this.triggerPicker(
                                e,
                                this.props.topicCommentList[i].ParentCommentId
                              )
                            }
                          >
                            <img class="loveimg" alt=""></img>
                          </div>

                          {this.state.emojiPickerState &&
                          this.props.topicCommentList[i].ParentCommentId ===
                            this.state.clickTopic ? (
                            <div className="reactions-menu reactions-menu--active">
                              {this.props.masterReactsCount > 0
                                ? this.props.masterReactsList.map((emoji) => {
                                    return (
                                      <Button
                                        aria-label="cry"
                                        className="reactions-menu__reaction"
                                        type="button"
                                        onClick={() =>
                                          this.handleCommentEmojiReacts(
                                            this.props.topicCommentList[i]
                                              .ParentCommentId,
                                            emoji.reactionsmasterid
                                          )
                                        }
                                      >
                                        <span className="reactions-menu__reaction-description">
                                          {emoji.reactionsname}
                                        </span>
                                        <img
                                          className="reactions-icon reactions-menu__icon reactions-icon__creation--medium"
                                          src={emoji.reactionsiconurl}
                                          alt=""
                                          data-test-reactions-icon-type="sad"
                                        ></img>
                                      </Button>
                                    );
                                  })
                                : null}
                            </div>
                          ) : null}

                          <span style={{ display: "flex" }}>
                            {this.props.topicCommentList[i].userReactionsCount >
                            0
                              ? this.props.topicCommentList[
                                  i
                                ].userReactions.map((reacts) => {
                                  return (
                                    <div
                                      className="topiccommentlike--show"
                                      style={{ display: "flex" }}
                                    >
                                      <img
                                        style={{ width: "30px" }}
                                        src={reacts.ReactionURL}
                                        alt=""
                                      />
                                      <div style={{ marginTop: "5.5px" }}>
                                        {reacts.ReactionCount}{" "}
                                      </div>
                                    </div>
                                  );
                                })
                              : null}
                          </span>

                          {this.props.topicCommentList[i].subCommentCount !==
                          undefined ? (
                            <div
                              className="topiccommentlike"
                              style={{
                                fontSize: "16px",
                                color: "#596A80",
                                marginRight: "5px",
                                fontWeight: 600,
                              }}
                            >
                              <i class="fa fa-mail-forward"></i>

                              {"  "}

                              {this.props.topicCommentList[i].subCommentCount}
                              {"  "}
                              {this.props.topicCommentList[i]
                                .subCommentCount !== undefined
                                ? this.props.topicCommentList[i]
                                    .subCommentCount === 1
                                  ? " Reply"
                                  : " Replies"
                                : null}
                            </div>
                          ) : null}

                          <div className="topiccommentlike">
                            <span
                              className="topiccommentdeletebtn"
                              onClick={() => this.handleReply(i)}
                            >
                              {" "}
                              {this.state.indexClick.includes(i)
                                ? "Cancel"
                                : "Reply Now"}
                            </span>
                          </div>
                        </Colxx>
                      </Row>
                      <Separator className="mt-2 mb-2 sepratormargintopiccommentform" />
                    </Colxx>
                    <Colxx
                      xxs="3"
                      sm="3"
                      md="3"
                      lg="2"
                      xl="2"
                      className="commentflex"
                    >
                      {this.props.topicCommentList[i].Userid ===
                      this.props.currentUser.UserId ? (
                        <i
                          onClick={() =>
                            this.handleEditTopicComment(
                              this.props.topicCommentList[i].ParentCommentText,
                              this.props.topicCommentList[i].ParentCommentId,
                              this.props.topicCommentList[i].OrgId,
                              this.props.topicCommentList[i].Topicid
                            )
                          }
                          style={{
                            fontSize: "15px",
                            cursor: "pointer",
                            marginRight: "4px",
                            color: "#5D6E84",
                            display: "flex",
                          }}
                          class="fa fa-pencil"
                        >
                          <span className="editdeletefont">Edit</span>
                        </i>
                      ) : null}

                      <i
                        onClick={() => {
                          if (
                            window.confirm(
                              "Are you sure you want to remove this comment?"
                            )
                          ) {
                            this.handleRemoveCommment(
                              this.props.topicCommentList[i].ParentCommentId
                            );
                          }
                        }}
                        style={{
                          fontSize: "15px",
                          cursor: "pointer",
                          // marginRight:"0px"
                          color: "#5D6E84",
                          display: "flex",
                        }}
                        class="fa fa-trash-o"
                      >
                        <span className="editdeletefont">Delete</span>
                      </i>
                      {/* {this.props.topicCommentList[i].Userid ===
                      this.props.currentUser.UserId ? (
                        <i
                          onClick={() =>
                            this.handleEditTopicComment(
                              this.props.topicCommentList[i].ParentCommentText,
                              this.props.topicCommentList[i].ParentCommentId,
                              this.props.topicCommentList[i].OrgId,
                              this.props.topicCommentList[i].Topicid
                            )
                          }
                          class="fa fa-pencil"
                          style={{
                            fontSize: "16px",
                            cursor: "pointer",
                            marginLeft: 0,
                            
                            marginRight:"8px"
                          }}
                        ></i>
                      ) : null} */}
                    </Colxx>
                  </Row>

                  <br></br>

                  <Colxx xxs="12" sm="12" md="12" lg="12" xl="12">
                    {this.state.indexClick.includes(i) ? (
                      <div style={{ display: "flex" }}>
                        <Colxx
                          xxs="1"
                          sm="1"
                          md="1"
                          lg="1"
                          xl="1"
                          className="discussionmove"
                        ></Colxx>
                        <Colxx xxs="9" sm="9" md="9" lg="9" xl="9">
                          <input
                            // style={{ marginTop: 24, padding: "20px 24px" }}
                            type="textarea"
                            autoFocus
                            className="form-control"
                            rows="1"
                            name="secondlevelcomment"
                            placeholder="Reply to"
                            value={this.state.secondlevelcomment}
                            onChange={(e) =>
                              this.handle_SeconlevelComment_text(e.target.value)
                            }
                          />
                          <br></br>
                        </Colxx>
                        <Colxx xxs="2" sm="2" md="2" lx="2" xl="2">
                          <Button
                            style={{
                              // margin: "0 10px",
                              // padding: "0.40rem 0.90rem 0.30rem 0.90rem",
                              // float: "right",
                              marginTop: "3px",
                              marginRight: "5px",
                            }}
                            color="primary"
                            className=""
                            onClick={() =>
                              this.handleReplySecondLevelComment(
                                this.props.topicCommentList[i].OrgId,
                                this.props.topicCommentList[i].Topicid,
                                this.props.topicCommentList[i].ParentCommentId
                              )
                            }
                          >
                            Reply
                          </Button>
                        </Colxx>
                      </div>
                    ) : null}
                  </Colxx>

                  {this.props.topicCommentList[i].subCommentCount > 0
                    ? this.props.topicCommentList[i].subCommentList.map(
                        (subcomment, index) => {
                          return (
                            <Row style={{ marginBottom: "10px" }}>
                              <Colxx
                                xxs="2"
                                sm="1"
                                md="1"
                                lg="1"
                                xl="1"
                              ></Colxx>
                              {/* style={{ display: "flex", marginLeft: "-32px" }} */}
                              <Colxx
                                xxs="10"
                                sm="11"
                                md="11"
                                lg="11"
                                xl="11"
                                style={{ display: "flex", marginLeft: "-32px" }}
                              >
                                <Colxx xxs="2" sm="2" md="2" lg="1" xl="1">
                                  <Link
                                    to={
                                      "/app/community/view/" +
                                      subcomment.Userid +
                                      "/" +
                                      subcomment.UserTypeId
                                    }
                                  >
                                    <img
                                      // style={{ width: "100%" }}
                                      style={{ width: "35px", height: "35px" }}
                                      src={subcomment.ProfileImage}
                                      alt=""
                                    ></img>
                                  </Link>
                                </Colxx>
                                <Colxx xxs="7" sm="7" md="7" lg="9" xl="9">
                                  <div className="subcommentmargin">
                                    <p className="truncate mb-0 profilemargin">
                                      {subcomment.Username}
                                    </p>
                                    <div
                                      style={{ margin: "0px 5px 0px 5px" }}
                                    ></div>
                                    <span className=" mb-0  profilebelowdate">
                                      {new Intl.DateTimeFormat("us-GB", {
                                        month: "long",
                                        day: "2-digit",
                                        year: "numeric",
                                      }).format(new Date(subcomment.Createdon))}
                                    </span>
                                  </div>
                                  {/* </div> */}
                                  <div className="subcommentmargin">
                                    <span
                                      style={{
                                        fontSize: "15px",
                                        fontWeight: "400",
                                        marginBottom: "8px",
                                      }}
                                    >
                                      {subcomment.SubCommentText}
                                    </span>
                                  </div>
                                  <Row>
                                    {/* style={{ display: "flex", marginLeft: "-20px", }} */}
                                    <Colxx
                                      xxs="12"
                                      sm="12"
                                      md="12"
                                      lg="12"
                                      xl="12"
                                      className="subcommentlikebuttonmargin"
                                    >
                                      <div
                                        className="likebuttontopic"
                                        onClick={(e) =>
                                          this.triggerPicker2(
                                            e,
                                            subcomment.SubCommentId
                                          )
                                        }
                                      >
                                        <img class="loveimg" alt=""></img>
                                      </div>

                                      {this.state.emojiPickerState &&
                                      subcomment.SubCommentId ===
                                        this.state.clickTopic ? (
                                        <div className="reactions-menu reactions-menu--active">
                                          {this.props.masterReactsCount > 0
                                            ? this.props.masterReactsList.map(
                                                (emoji) => {
                                                  return (
                                                    <Button
                                                      aria-label="cry"
                                                      className="reactions-menu__reaction"
                                                      type="button"
                                                      onClick={() =>
                                                        this.handleCommentEmojiReacts(
                                                          subcomment.SubCommentId,
                                                          emoji.reactionsmasterid
                                                        )
                                                      }
                                                    >
                                                      <span className="reactions-menu__reaction-description">
                                                        {emoji.reactionsname}
                                                      </span>
                                                      <img
                                                        className="reactions-icon reactions-menu__icon reactions-icon__creation--medium"
                                                        src={
                                                          emoji.reactionsiconurl
                                                        }
                                                        alt=""
                                                        data-test-reactions-icon-type="sad"
                                                      ></img>
                                                    </Button>
                                                  );
                                                }
                                              )
                                            : null}
                                        </div>
                                      ) : null}
                                      <span>
                                        <div style={{ display: "flex" }}>
                                          {this.props.topicCommentList[i]
                                            .subCommentCount > 0 &&
                                          subcomment.subUserReactions !==
                                            undefined
                                            ? subcomment.subUserReactions.map(
                                                (reacts1) => {
                                                  return (
                                                    <div
                                                      className="topiccommentlike--show"
                                                      style={{
                                                        display: "flex",
                                                      }}
                                                    >
                                                      <img
                                                        style={{
                                                          width: "30px",
                                                        }}
                                                        src={
                                                          reacts1.ReactionURL
                                                        }
                                                        alt=""
                                                      />
                                                      <div
                                                        style={{
                                                          marginTop: "5.5px",
                                                        }}
                                                      >
                                                        {" "}
                                                        {reacts1.ReactionCount}
                                                      </div>
                                                    </div>
                                                  );
                                                }
                                              )
                                            : null}
                                        </div>
                                      </span>
                                    </Colxx>
                                  </Row>
                                  {/* <Separator className="mt-2 mb-2 sepratormargintopiccommentform--subcomment" /> */}
                                  <Separator className="mt-2 mb-2 sepratormargintopiccommentform--subcomment" />
                                </Colxx>

                                <Colxx
                                  xxs="3"
                                  sm="3"
                                  md="3"
                                  lg="2"
                                  xl="2"
                                  className="commentflex editsubmarginright"
                                >
                                  {subcomment.Userid ===
                                  this.props.currentUser.UserId ? (
                                    <i
                                      onClick={() =>
                                        this.handleEditTopicComment(
                                          subcomment.SubCommentText,
                                          subcomment.SubCommentId,
                                          subcomment.OrgId,
                                          subcomment.Topicid
                                        )
                                      }
                                      class="fa fa-pencil"
                                      style={{
                                        fontSize: "15px",
                                        cursor: "pointer",
                                        marginRight: "4px",
                                        color: "#5D6E84",
                                        display: "flex",
                                        // float: "right",
                                      }}
                                    >
                                      {" "}
                                      <span className="editdeletefont">
                                        Edit
                                      </span>
                                    </i>
                                  ) : null}

                                  <i
                                    onClick={() => {
                                      if (
                                        window.confirm(
                                          "Are you sure you want to remove this comment?"
                                        )
                                      ) {
                                        this.handleRemoveCommment(
                                          subcomment.SubCommentId
                                        );
                                      }
                                    }}
                                    style={{
                                      fontSize: "15px",
                                      cursor: "pointer",
                                      display: "flex",
                                      color: "#5D6E84",
                                    }}
                                    // className="subcommentdeletebtn"
                                    class="fa fa-trash-o"
                                  >
                                    {" "}
                                    <span className="editdeletefont">
                                      Delete
                                    </span>
                                  </i>
                                </Colxx>
                              </Colxx>
                            </Row>
                          );
                        }
                      )
                    : null}
                </div>
              }
            </Colxx>
          );
        }

        table.push(<Row>{Title}</Row>);
      }
    }
    return table;
  };
  handleRemoveCommment = (commentid) => {
    this.props.adminDeleteComment(
      commentid,
      this.props.topicId,
      this.props.currentUser.organization.id
    );
  };

  handle_SeconlevelComment_text(value) {
    this.setState({
      secondlevelcomment: value,
    });
  }
  handleReplySecondLevelComment = (orgid, topicid, commentid) => {
    var secondlevelobj = {
      OrgId: orgid,
      TopicId: topicid,
      ParentCommentId: commentid,
      SecondLevelCommentText: this.state.secondlevelcomment,
      UserId: this.props.currentUser.UserId,
    };
    this.props.addSecondLevelComment(secondlevelobj);
    setTimeout(() => {
      this.setState({
        secondlevelcomment: "",
        indexClick: [],
      });
    }, 2500);
  };
  render() {
    const { handleSubmit } = this.props;
    return (
      <div>
        <form onSubmit={handleSubmit}>
          <Fragment>
            <Row>
              <Colxx xxs="3" lg="2" md="2">
                <Link to={"/app/engage/list/" + 2}>
                  <i
                    class="fa fa-angle-left"
                    style={{
                      fontSize: "27px",
                      color: "#1EBAD6",
                      fontWeight: "bold",
                    }}
                  ></i>
                  <div style={{ marginTop: "-26px" }}>
                    <span
                      style={{
                        fontSize: "16px",
                        color: "#1EBAD6",
                        fontWeight: "bold",
                        marginLeft: "17px",
                      }}
                    >
                      Back
                    </span>
                  </div>
                </Link>
              </Colxx>
              <Colxx xxs="8" lg="7" md="7">
                <h2
                  style={{
                    textAlign: "center",
                    fontWeight: "bold",
                    marginTop: 4,
                  }}
                >
                  Topic Comments
                </h2>
              </Colxx>
            </Row>
            ​
            <Row>
              <Colxx xxs="12">
                <Separator className="mb-5" />
              </Colxx>
            </Row>
            ​<br></br>​
            <Row>
              <Colxx xxs="12" md="12" sm="12">
                {this.getTopicDetail()}
              </Colxx>
            </Row>
            <br></br>
            <Row>
              <Colxx xxs="12" md="9" lg="9" sm="9">
                <h3>
                  Write your comment here
                  {/* Comment as{" "}
                  <span style={{ color: "#46BFA5" }}>
                    {this.props.currentUser.FirstName}{" "}
                    {this.props.currentUser.LastName}
                  </span>{" "} */}
                </h3>
                <Field
                  style={{ borderRadius: "0.40rem", marginTop: "13px" }}
                  name="topiccommenttext"
                  className="form-control"
                  component={renderTextArea}
                  rows="6"
                  type="text"
                  placeholder="What are your thoughts?"
                  required="required"
                />
              </Colxx>
              <Colxx xxs="12" md="9" lg="9" sm="9">
                <div style={{ margin: "-60px 20px 20px 0px", float: "right" }}>
                  <Button
                    outline
                    className="mb-2"
                    color="primary"
                    type="submit"
                    backgroundColor="white"
                    onSubmit={this.submit}
                  >
                    Comment
                  </Button>
                </div>
              </Colxx>
            </Row>
            <br></br>
            <Row>
              <Colxx
                xxs="9"
                sm="9"
                md="9"
                lg="9"
                xl="9"
                style={{ display: "flex" }}
              >
                <Colxx
                  xxs="6"
                  sm="6"
                  md="6"
                  lg="6"
                  xl="6"
                  style={{ display: "flex" }}
                >
                  {this.getTotalTopicComment()}
                </Colxx>
              </Colxx>
              <Colxx xxs="12" sm="9" md="9" lg="9" xl="9">
                <Separator className="mb-5 bordercomment" />
              </Colxx>
            </Row>
            {this.createtopicCommentList()}
            <br></br>
          </Fragment>
        </form>
        <EditTopicPopUpForm
          onSubmit={this.submitUpdatedTopic}
          dispatch={this.props.dispatch}
          onRequestClose={this.closeTopicSubmissionModal}
          modalStatus={this.state.editTopicModal}
          currentUser={this.props.currentUser}
          TopicData={this.state.currentTopicData}
          // sendTopic={this.getTopic}
        />
        <EditCommentPopUpForm
          onSubmit={this.submitUpdatedTopicComment}
          dispatch={this.props.dispatch}
          onRequestClose={this.closeCommentSubmissionModal}
          modalStatus={this.state.editCommentModal}
          currentUser={this.props.currentUser}
          commentsdata={this.state.currentCommentData}
        />
      </div>
    );
  }
}
const validations = {
  required: {
    fields: ["Type"],
  },
  urls: {
    fields: ["doclinkdata"],
  },
};
topicCommentForm = reduxForm({
  form: "topicCommentForm", // a unique identifier for this form
  validate: (values) => {
    return validate(values, validations);
  },
})(topicCommentForm);
//const selector = formValueSelector("topicCommentForm"); // <-- same as form name
const mapStateToProps = (state) => ({
  currentUser: state.userReducer.currentUser,
  topicDetail: state.engageReducer.topicDetail,
  topicCommentList: state.engageReducer.topicCommentList,
  topicCommentCount: state.engageReducer.topicCommentCount,
  masterReactsList: state.masterReducer.masterReactsList,
  masterReactsCount: state.masterReducer.masterReactsCount,
});
const mapDispatchToProps = (dispatch) => {
  return {
    getTopicDetailsByTopicId: (params) => {
      dispatch(getTopicDetailsByTopicId(params));
    },
    getTopicCommentsList: (param) => {
      dispatch(getTopicCommentsList(param));
    },
    adminDeleteComment: (commentid, topicid, orgid) => {
      dispatch(adminDeleteComment(commentid, topicid, orgid));
    },
    updateDiscussionBoardTopic: (orgid, params, callback) => {
      dispatch(updateDiscussionBoardTopic(orgid, params, callback));
    },
    updateDiscussionBoardTopicComment: (params, callback) => {
      dispatch(updateDiscussionBoardTopicComment(params, callback));
    },
    addSecondLevelComment: (values, errorCallback) => {
      dispatch(addSecondLevelComment(values, errorCallback));
    },
    addReacts: (param) => {
      dispatch(addReacts(param));
    },
    getCommentReactions: () => {
      dispatch(getCommentReactions());
    },
    addCommentReacts: (param) => {
      dispatch(addCommentReacts(param));
    },
    Admin_Delete_Topic: (topicid) => {
      dispatch(Admin_Delete_Topic(topicid));
    },

    // getUserTopicReactions: (params) => {
    //   dispatch(getUserTopicReactions(params));
    // },
    dispatch: dispatch,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(topicCommentForm);
