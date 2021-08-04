import React, { Component, Fragment } from "react";
import {
  Row,
  Card,
  CardBody,
  CardSubtitle,
  Nav,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
  TabContent,
  TabPane,
  // Badge,
  // Tooltip,
  CardTitle,
  Button,
} from "reactstrap";

import { NavLink } from "react-router-dom";
import { adminDeleteTopic } from "../../../action/engage/engage";
import { Link } from "react-router-dom";
import classnames from "classnames";

import { Colxx, Separator } from "../../../components/common/CustomBootstrap";
import IntlMessages from "../../../helpers/IntlMessages";
import {
  // Field,
  // reduxForm,
  // FieldArray,
  // formValueSelector,
  reset,
} from "redux-form";

import { connect } from "react-redux";
import ReactPlayer from "react-player";
import {
  getEngageVideoList,
  updateEngageVideodetail,
  addDiscussionTopic,
  getDiscussionTopicList,
  updateEngagCategoryDetails,
  addTopicReacts,
  // addCommentReacts,
} from "../../../action/engage/engage";
import { getCommentReactions } from "../../../action/master/masterData";
//import { adminAddOrgEngageCategory } from "../../../action/orgengage/orgengage";
// import {getCategoryList } from '../../../action/organizations/organization';
//import EditEngageVideoPopUpForm from "../engage/editEngageVideoPopUpForm";
import AddTopicPopUpForm from "../engage/addTopicPopUpForm";
import AddEngageCategoryPopUpForm from "../engage/addEngageCategoryPopUpForm";
import EditEngageCategoryPopUpForm from "../engage/editEngageCategoryPopUpForm";
import axiosInstance from "../../../utils/axiosApi";
// import _ from "lodash";
import * as constants from "../../../utils/constants";
import { getAPIURL } from "../../../utils/getApiUrl";
import "emoji-mart/css/emoji-mart.css";
// import { Picker } from "emoji-mart";
import Pagination from "../../../containers/pages/Pagination";
/* eslint-disable */
// import VideoPlayer from "../../../components/common/VideoPlayer";
//import  "../../../.././public/assets/css/styles.css";

class engageList extends Component {
  constructor(props) {
    super(props);
    this.toggleTab = this.toggleTab.bind(this);
    this.toggleUpperTab = this.toggleUpperTab.bind(this);

    this.state = {
      activeTab: 0,
      activeDepartment: null,
      editEngageVideoModal: false,
      addTopicModal: false,
      editEngageCategoryModel: false,
      emoji: null,
      emojiPickerState: false,
      clickTopic: "",
      // activeFirstTab: "1",
    };
  }

  componentDidMount() {
    this.props.getCommentReactions();
    var tabname = this.props.location.pathname.substring(
      this.props.location.pathname.lastIndexOf("/") + 1,
      this.props.location.pathname.length
    );
    if (tabname === "2") {
      this.setState({
        activeFirstTab: "2",
      });
    } else {
      this.setState({
        activeFirstTab: "1",
      });
    }
    axiosInstance
      .get(
        getAPIURL(constants.GET_CATEGORY_LIST_URL, {
          ":org": this.props.currentUser.organization.id,
        })
      )
      .then((response) => {
        this.setState({
          categoryList: response.data.category,
          categoryCount: response.data.count,
        });

        this.props.getEngageVideoList({
          search_text: this.state.searchText,
          categoryid: this.state.categoryList[0].Categoryid,
        });
      })
      .catch((error) => {});
    // this.props.getCategoryList(this.props.currentUser.organization.id)
    this.props.getDiscussionTopicList({
      orgid: this.props.currentUser.organization.id,
      user_id: this.props.currentUser.UserId,
      limit_size: constants.DEFAULT_LIMIT_SIZE,
      limit_start: 0,
    });
  }
  toggleUpperTab(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeFirstTab: tab,
      });
    }
  }
  getPlainText = (html) => {
    var divContainer = document.createElement("div");
    divContainer.innerHTML = html;
    return divContainer.textContent || divContainer.innerText || "";
  };
  async toggleTab(tab, categoryId) {
    if (this.state.activeTab !== tab) {
      await this.setState({
        activeTab: tab,
        activeCategoryId: categoryId,
        searchText: "",

        // activeDepartmentName:category.Categoryname,
      });
    }
    var queryObj = {
      categoryid: categoryId,
      search_text: this.state.searchText,
    };

    this.props.getEngageVideoList(queryObj);
  }
  ViewCategory = () => {
    let table = [];

    if (this.state.categoryList) {
      if (this.state.categoryCount > 0) {
        let Title = [];
        for (let i = 0; i < this.state.categoryCount; i++) {
          Title.push(
            <div style={{ marginLeft: "15px" }}>
              {
                <div style={{ width: 130 }}>
                  <img
                    style={{
                      width: "50px",
                      cursor: "pointer",
                      marginBottom: "-12px",
                    }}
                    src="/assets/img/category.png"
                    alt=""
                    onClick={() => {
                      this.handleEditCategoryData(
                        this.state.categoryList[i].Categoryname,
                        this.state.categoryList[i].Categoryid
                      );
                    }}
                  />

                  <NavLink
                    className={classnames({
                      active: this.state.activeTab === i,
                      "nav-link": true,
                    })}
                    onClick={() => {
                      this.toggleTab(i, this.state.categoryList[i].Categoryid);
                    }}
                    to="#"
                    location={{}}
                  >
                    <span>{this.state.categoryList[i].Categoryname}</span>
                  </NavLink>
                </div>
              }
            </div>
          );
        }

        table.push(<Row>{Title}</Row>);
      }
    }
    return table;
  };

  engageVideoListView = () => {
    let table = [];

    if (this.props.engageVideoList) {
      if (this.props.engageVideoCount > 0) {
        let Title = [];

        {
          this.props.engageVideoList.map((video, index) => {
            Title.push(
              <Colxx xxs="12" md="12" sm="12" lg="12" xl="12">
                {
                  <div>
                    <Nav>
                      <div key={index} className="Engagevideo_flexstyle">
                        <NavLink
                          to={
                            "/app/engage/comment/" +
                            video.EngageVideoId +
                            "/" +
                            video.EngagecategoryId
                          }
                          className="d-block position-relative"
                        >
                          <div class="Engagevideo_rplayer">
                            <ReactPlayer
                              url={video.EngageVideoUrl}
                              controls={true}
                              className="Engagereact-player"
                              width="100%"
                              height="100%"
                              config={{
                                file: {
                                  attributes: { controlsList: "nodownload" },
                                },
                              }}
                              onContextMenu={(e) => e.preventDefault()}
                            />
                          </div>
                        </NavLink>

                        <div className="Engagevideo_inline">
                          <NavLink
                            to={
                              "/app/engage/comment/" +
                              video.EngageVideoId +
                              "/" +
                              video.EngagecategoryId
                            }
                          >
                            <p class="Engagevideo_pstyle">
                              {video.EngageVideoTitle}
                            </p>
                            <div
                              style={{ lineHeight: "1.75rem" }}
                              className="text-primary text-small font-weight-medium Engagevideo_createdate"
                            >
                              {new Intl.DateTimeFormat("us-GB", {
                                month: "long",
                                day: "2-digit",
                                year: "numeric",
                              }).format(new Date(video.CreateDate))}
                              {/* {video.CreateDate} */}
                            </div>
                            <div className="">
                              <p className="Engagevideo_description">
                                {video.EngageVideoDescription}
                              </p>
                            </div>
                          </NavLink>
                        </div>
                        {/* <div class="Engagevideo_edit">
                          <span
                            onClick={() => this.handleEditEngageData(video)}
                          >
                            Edit
                          </span>
                        </div> */}
                      </div>
                    </Nav>
                  </div>
                }
              </Colxx>
            );
          });
        }

        table.push(<div>{Title}</div>);
      }
    }
    return table;
  };
  handleEditEngageData = (engageObj) => {
    this.setState({ editEngageVideoModal: true, currentEngageData: engageObj });
  };
  closeEditSubmissionModal = () => {
    this.props.dispatch(reset("editEngageVideoPopUpForm"));
    this.setState({ editEngageVideoModal: false });
  };
  handleAddTopic = (engageObj) => {
    this.setState({ addTopicModal: true, currentEngageData: engageObj });
  };
  openTopicSubmissionModal = () => {
    this.setState({ addTopicModal: true });
  };
  closeTopicSubmissionModal = () => {
    this.props.dispatch(reset("addTopicPopUpForm"));
    this.setState({ addTopicModal: false });
  };
  submitUpdate = (values) => {
    values.createby = this.props.currentUser.UserId;
    this.props.updateEngageVideodetail(
      this.props.currentUser.organization.id,
      values,
      this.closeEditSubmissionModal
    );
  };
  // getTopic = (topic) => {
  //   this.setState({
  //     topictext: topic,
  //   });
  // };
  submitTopic = (values) => {
    values.user_id = this.props.currentUser.UserId;
    values.orgid = this.props.currentUser.organization.id;
    values.usertype = this.props.currentUser.Usertypeid;
    // values.topic = this.state.topictext;
    values.topic = this.props.topictext;
    this.props.addDiscussionTopic(values, this.closeTopicSubmissionModal);
  };
  handleEditCategoryData(category_name, categoryId) {
    var engagecategoryData = {};
    engagecategoryData = {
      categoryname: category_name,
      categoryId: categoryId,
    };
    this.setState({ editEngageCategoryModel: true, engagecategoryData });
  }

  closeEditEnageCategoryModal = () => {
    this.props.dispatch(reset("editEngageCategoryPopUpForm"));
    this.setState({ editEngageCategoryModel: false });
  };

  submitUpdateEngageCategory = (values) => {
    values.createby = this.props.currentUser.UserId;
    values.categoryid = values.categoryid;
    values.categoryname = values.categoryname;
    this.props.updateEngagCategoryDetails(
      values,
      this.closeEditEnageCategoryModal
    );
  };
  submitEngageCategory = (values) => {
    if (values.categoryname === undefined) {
      return;
    }
    values.categoryname = values.categoryname;
    values.createby = this.props.currentUser.UserId;
    values.organization = this.props.currentUser.organization.id;
    this.props.adminAddOrgEngageCategory(
      values,
      this.closeAddEnageCategoryModal
    );
  };

  handleTextSearchChange = (event) => {
    this.setState({ searchText: event.target.value }, function () {
      if (this.state.activeCategoryId === undefined) {
        this.props.getEngageVideoList({
          categoryid: this.state.categoryList[0].Categoryid,
          search_text: this.state.searchText,
        });
      } else {
        this.props.getEngageVideoList({
          categoryid: this.state.activeCategoryId,
          search_text: this.state.searchText,
        });
      }
    });
  };
  handleToicTextSearchChange = (event) => {
    this.setState({ searchTopicText: event.target.value }, function () {
      this.props.getDiscussionTopicList({
        orgid: this.props.currentUser.organization.id,
        search_text: this.state.searchTopicText,
        limit_size: constants.DEFAULT_LIMIT_SIZE,
        limit_start: 0,
      });
    });
  };
  handleRemoveTopic = (topicid) => {
    this.props.adminDeleteTopic(topicid);
  };

  // toggle1 = () => {
  //   this.setState({
  //     tooltipOpen: !this.state.tooltipOpen,
  //   });
  // };

  // emojiPicker = () => (
  //   <Picker
  //     title="Pick your emoji…"
  //     emoji="point_up"
  //     onSelect={(emoji) => emoji.native}
  //   />
  // );

  triggerPicker = (event, Topicid) => {
    event.preventDefault();
    this.setState({
      emojiPickerState: !this.state.emojiPickerState,
      clickTopic: Topicid,
    });
  };
  addEmoji = (emoji, topicid) => {
    this.setState({
      emoji: emoji,
    });
    this.setState({
      emojiPickerState: false,
    });
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
    this.props.addTopicReacts(reactsObj);
  };

  createtopicList = () => {
    let table = [];
    let Title = [];
    {
      this.props.topicList.length > 0 ? (
        this.props.topicList.map((topic) => {
          return Title.push(
            <Colxx xxs="12" md="12" sm="12" lg="12" xl="12">
              <Card>
                <Row>
                  <Colxx
                    xxs="1"
                    sm="1"
                    md="1"
                    lg="1"
                    xl="1"
                    className="discussionmove"
                  >
                    <div
                      style={{
                        backgroundColor: "#03CBAE",
                        height: "100%",
                        width: "4px",
                      }}
                    ></div>
                  </Colxx>
                  {/* <Colxx xxs="9" sm="9" md="10" lg="10" xl="10"> */}
                  <Colxx xxs="10" sm="10" md="10" lg="10" xl="10">
                    {
                      <div>
                        <CardBody
                          className="mt-4"
                          style={{
                            padding: "0px 0px 0px 0px",
                          }}
                        >
                          <Link
                            to={"/app/engage/topic/comment/" + topic.Topicid}
                          >
                            <CardTitle
                              style={{
                                marginBottom: "1rem",
                              }}
                            >
                              <span
                                style={{ fontWeight: 600, fontSize: "16px" }}
                              >
                                {this.getPlainText(topic.Topictext)}
                              </span>
                              {/* <span
                                style={{ fontWeight: 600, fontSize: "16px" }}
                                dangerouslySetInnerHTML={{
                                  __html: topic.Topictext,
                                }}
                              ></span> */}
                              {/* <span
                                style={{ fontWeight: "bold", fontSize: "18px" }}
                              >
                                {topic.Topictext}{" "}
                              </span> */}
                            </CardTitle>
                          </Link>
                        </CardBody>
                        <Row style={{ marginTop: 10 }}>
                          <Colxx xxs="2" md="1" sm="1" lg="1" xl="1">
                            <img
                              style={{ width: "30px" }}
                              src={
                                topic.UserImage !== null
                                  ? topic.UserImage
                                  : "/assets/img/profile_icon.png"
                              }
                              alt=""
                            ></img>
                          </Colxx>
                          <Colxx
                            xxs="10"
                            md="11"
                            sm="11"
                            lg="11"
                            xl="11"
                            className="engageuserflex"
                            style={{ marginTop: "8px" }}
                          >
                            <CardSubtitle className="truncate mb-0  profilediscussionmargin">
                              {topic.Username}
                            </CardSubtitle>
                            <div style={{ margin: "0px 5px 0px 5px" }}></div>

                            <span
                              className=" mb-0  profilebelowdate"
                              style={{ lineHeight: 1.5 }}
                            >
                              {" "}
                              {new Intl.DateTimeFormat("us-GB", {
                                month: "long",
                                day: "2-digit",
                                year: "numeric",
                              }).format(new Date(topic.Createdon))}
                            </span>
                          </Colxx>
                        </Row>
                        <Colxx xxs="12" sm="12" md="12" lg="12" xl="12">
                          <Separator className="mb-2 mt-2 borderdiscussion" />
                        </Colxx>

                        <Colxx xxs="12" sm="12" md="12" lg="12" xl="12">
                          <div style={{ display: "flex", marginLeft: "-17px" }}>
                            {/* <span role="img" aria-label="">
                              {this.state.emoji}
                            </span> */}
                            <div
                              className="likebuttontopic mb-2"
                              onClick={(e) =>
                                this.triggerPicker(e, topic.Topicid)
                              }
                            >
                              <img class="loveimg"></img>
                            </div>
                            {/* <Link
                              to={"/app/engage/topic/comment/" + topic.Topicid}
                            >
                              <Button
                                style={{ marginLeft: "4px" }}
                                className="likebuttontopic mb-2"

                                // id="DisabledAutoHideExample"
                              >
                                <i class="faas fa-commenting-o">&nbsp;&nbsp;</i>
                                Comment
                              </Button>
                            </Link> */}

                            <span className="engagelistflex">
                              {topic.userReactionsCount > 0
                                ? topic.userReactions.map((reacts) => {
                                    return (
                                      <div className="topicdiscussionlike--show mb-2">
                                        <img
                                          style={{ width: "30px" }}
                                          src={reacts.ReactionURL}
                                        />
                                        <span>{reacts.ReactionCount} </span>
                                      </div>
                                    );
                                  })
                                : null}

                              <span className="topiccommentlike mb-2">
                                <i class="faas fa-commenting-o"></i>
                                {topic.TotalTopicComment == 1
                                  ? topic.TotalTopicComment + ` Comment`
                                  : topic.TotalTopicComment + ` Comments`}
                              </span>
                            </span>
                          </div>

                          {this.state.emojiPickerState &&
                          topic.Topicid === this.state.clickTopic ? (
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
                                            topic.Topicid,
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
                    }
                  </Colxx>
                  <Colxx xxs="1" sm="1" md="1" lg="1" xl="1">
                    <UncontrolledDropdown
                    // style={{ marginLeft: "-10px", marginTop: "-0px" }}
                    >
                      <DropdownToggle
                        className="project-list-toggle padd "
                        style={{
                          backgroundColor: "white",
                          color: "grey",
                          marginTop: "10px",
                          borderColor: "white",
                          marginLeft: "-25px",
                          marginRight: "0px",
                          float: "right",
                        }}
                        // class="discussionboardtogglebtn"
                      >
                        <i
                          class="  fa fa-ellipsis-h project-list-three-dot"
                          aria-hidden="true"
                        ></i>
                      </DropdownToggle>
                      <DropdownMenu>
                        {/* <DropdownItem>
                          {" "}
                          <i
                            class="fa fa-pencil"
                            style={{
                              fontSize: "16px",
                              //  color: "#E01A4F",
                              cursor: "pointer",
                              //  marginTop: "15px",
                              marginRight: "3px",
                            }}
                          ></i>
                          Edit
                        </DropdownItem> */}
                        <DropdownItem
                          style={{ color: "#E01A4F" }}
                          onClick={() => {
                            if (
                              window.confirm(
                                "Are you sure you want to remove this topic?"
                              )
                            ) {
                              this.handleRemoveTopic(topic.Topicid);
                            }
                          }}
                        >
                          {" "}
                          <i
                            class="fa fa-trash-o"
                            style={{
                              fontSize: "16px",
                              color: "#E01A4F",
                              cursor: "pointer",
                              //  marginTop: "15px",
                              marginRight: "3px",
                            }}
                          ></i>
                          Delete
                        </DropdownItem>
                      </DropdownMenu>
                    </UncontrolledDropdown>
                  </Colxx>
                </Row>
              </Card>
              <br></br>
            </Colxx>
          );
        })
      ) : (
        <tr className="no-record-found">
          <td>No Record Found</td>
        </tr>
      );
    }

    table.push(<Row>{Title}</Row>);
    return table;
  };
  handlePageClick = (data) => {
    this.setState({ currentPage: data });
    let selected = data - 1;
    // alert(data)
    let offset = Math.ceil(selected * constants.DEFAULT_LIMIT_SIZE);
    this.props.getDiscussionTopicList({
      orgid: this.props.currentUser.organization.id,
      search_text: this.state.searchTopicText,
      limit_size: constants.DEFAULT_LIMIT_SIZE,
      limit_size: constants.DEFAULT_LIMIT_SIZE,
      limit_start: offset,
    });
  };
  render() {
    return (
      <div>
        <Fragment>
          <Row>
            <Colxx xxs="12">
              <h1 style={{ textAlign: "center", fontWeight: "bold" }}>
                Engage
              </h1>
              <Nav tabs className="separator-tabs ml-0 mb-5">
                <NavItem>
                  <NavLink
                    className={classnames({
                      active: this.state.activeFirstTab === "1",
                      "nav-link": true,
                    })}
                    location={{}}
                    to="#"
                    onClick={() => {
                      this.toggleUpperTab("1");
                    }}
                  >
                    Gallery
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    location={{}}
                    to="#"
                    className={classnames({
                      active: this.state.activeFirstTab === "2",
                      "nav-link": true,
                    })}
                    onClick={() => {
                      this.toggleUpperTab("2");
                    }}
                  >
                    Discussion Board
                  </NavLink>
                </NavItem>
              </Nav>

              <TabContent activeTab={this.state.activeFirstTab}>
                <TabPane tabId="1">
                  <Row>
                    <Colxx xxs="9" md="8" sm="8" lg="6" xl="6">
                      <div className="form-group has-search">
                        <span class="fa fa-search form-control-feedback"></span>
                        <input
                          onChange={this.handleTextSearchChange}
                          name="searchKeyword"
                          placeholder="Search for videos"
                          className="form-control"
                          value={this.state.searchText}
                        />
                        {/* <span className="search-icon">
                        <i className="simple-icon-magnifier" />
                      </span> */}
                      </div>
                    </Colxx>
                    <Colxx xxs="3" md="2" sm="2" lg="2" xl="3">
                      <NavLink to="/app/engage/add">
                        <Button outline color="primary" className="mb-2">
                          <IntlMessages id="Add" />
                        </Button>
                      </NavLink>
                    </Colxx>
                  </Row>
                  <br></br>

                  <Row>
                    <Colxx xxs="12">
                      <Nav
                        style={{ borderBottom: "1px solid #FFFFFF" }}
                        tabs
                        className="separator-tabs ml-0 mb-5"
                      >
                        {this.ViewCategory()}
                      </Nav>
                    </Colxx>
                  </Row>
                  <br></br>
                  {this.state.activeFirstTab === "1" ? (
                    <Row>{this.engageVideoListView()}</Row>
                  ) : null}
                </TabPane>
                <TabPane tabId="2">
                  <Row>
                    <Colxx xxs="8" md="9" sm="8" lg="10" xl="10">
                      <div className="form-group has-search">
                        <span class="fa fa-search form-control-feedback"></span>
                        <input
                          onChange={this.handleToicTextSearchChange}
                          name="topicSearchKeyword"
                          id="topicSearchKeyword"
                          placeholder="Search Topic"
                          className="form-control"
                        />
                        {/* <span className="search-icon">
                        <i className="simple-icon-magnifier" />
                      </span> */}
                      </div>
                    </Colxx>
                    {/* <Colxx xxs="12" md="6" sm="6" lg="6" xl="6"> */}
                    <Colxx xxs="4" md="3" sm="4" lg="2" xl="2">
                      <Button
                        color="primary"
                        outline
                        className="mb-2 add_topic"
                        onClick={this.openTopicSubmissionModal}
                      >
                        <IntlMessages id="New Topic" />
                      </Button>
                    </Colxx>
                  </Row>
                  <br></br>
                  <Row>
                    {/* <Colxx xxs="12" md="6" sm="6" lg="6" xl="6"> */}
                    <Colxx xxs="12" sm="12" md="9" lg="9" xl="9">
                      {this.state.activeFirstTab === "2"
                        ? this.createtopicList()
                        : null}
                      {this.props.topicCount >=
                        constants.DEFAULT_LIMIT_SIZE && (
                        <Pagination
                          currentPage={this.state.currentPage}
                          totalPage={this.props.pageCount}
                          onChangePage={(i) => this.handlePageClick(i)}
                        />
                      )}
                    </Colxx>
                  </Row>
                </TabPane>
              </TabContent>
            </Colxx>
          </Row>
        </Fragment>
        {/* <EditEngageVideoPopUpForm
          onSubmit={this.submitUpdate}
          dispatch={this.props.dispatch}
          onRequestClose={this.closeEditSubmissionModal}
          modalStatus={this.state.editEngageVideoModal}
          currentUser={this.props.currentUser}
          engageVideoData={this.state.currentEngageData}
        /> */}
        <AddEngageCategoryPopUpForm
          onSubmit={this.submitEngageCategory}
          dispatch={this.props.dispatch}
          onRequestClose={this.closeAddEnageCategoryModal}
          modalStatus={this.state.addEngageCategoryModel}
          currentUser={this.props.currentUser}
        />
        <EditEngageCategoryPopUpForm
          onSubmit={this.submitUpdateEngageCategory}
          dispatch={this.props.dispatch}
          onRequestClose={this.closeEditEnageCategoryModal}
          modalStatus={this.state.editEngageCategoryModel}
          currentUser={this.props.currentUser}
          engagecategoryData={this.state.engagecategoryData}
        />
        <AddTopicPopUpForm
          onSubmit={this.submitTopic}
          dispatch={this.props.dispatch}
          onRequestClose={this.closeTopicSubmissionModal}
          modalStatus={this.state.addTopicModal}
          currentUser={this.props.currentUser}
          // sendTopic={this.getTopic}
        />
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    currentUser: state.userReducer.currentUser,
    // categoryList :state.organizationReducer.categoryList,
    // categoryCount :state.organizationReducer.categoryCount,
    engageVideoList: state.engageReducer.engageVideoList,
    engageVideoCount: state.engageReducer.engageVideoCount,
    topicList: state.engageReducer.topicList,
    topicCount: state.engageReducer.topicCount,
    pageCount: Math.ceil(
      state.engageReducer.topicCount / constants.DEFAULT_LIMIT_SIZE
    ),
    masterReactsList: state.masterReducer.masterReactsList,
    masterReactsCount: state.masterReducer.masterReactsCount,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getDiscussionTopicList: (organization) => {
      dispatch(getDiscussionTopicList(organization));
    },
    addDiscussionTopic: (params, callback) => {
      dispatch(addDiscussionTopic(params, callback));
    },
    getEngageVideoList: (params) => {
      dispatch(getEngageVideoList(params));
    },
    updateEngageVideodetail: (ordId, params, callback) => {
      dispatch(updateEngageVideodetail(ordId, params, callback));
    },
    adminDeleteTopic: (topicid) => {
      dispatch(adminDeleteTopic(topicid));
    },
    updateEngagCategoryDetails: (params, callback) => {
      dispatch(updateEngagCategoryDetails(params, callback));
    },
    addTopicReacts: (param) => {
      dispatch(addTopicReacts(param));
    },
    getCommentReactions: () => {
      dispatch(getCommentReactions());
    },
    dispatch: dispatch,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(engageList);
