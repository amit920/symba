import React, { Component, Fragment } from "react";
// import { injectIntl } from "react-intl";
import { Row } from "reactstrap";
import { Colxx, Separator } from "../../../components/common/CustomBootstrap";
import {
  // Input,
  //Card,
  //CardBody,
  CardTitle,
  // CardSubtitle,
  // CardImg,
  // CardText,
  Button,
  //Table,
} from "reactstrap";
// import { NavLink } from "react-router-dom";
import IntlMessages from "../../../helpers/IntlMessages";
// import { getInternList } from '../../../action/community/community';
import { connect } from "react-redux";
// import * as constants from "../../../utils/constants";
// import { Link } from "react-router-dom";
// import RequestFeedbackPopupForm from '../feedback/requestFeedbackPopupForm';
import {
  // Field,
  reduxForm,
  // FieldArray,
  //formValueSelector,
  // reset,
} from "redux-form";
import { getCoummunityUserProfile } from "../../../action/profile/profile";
import {
  // renderTextField,
  // renderTextArea,
  // renderDateField,
  validate,
  // renderSelectField,
  // ComboField,
  // renderMultiSelectField,
  // fileInput,
} from "../../util/form-fields";
//import { NotificationManager } from "../../../../src/components/common/react-notifications";
import createBrowserHistory from "history/createBrowserHistory";
import $ from "jquery";
const browserHistory = createBrowserHistory();
/* eslint-disable */

class ViewUserProfileForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: null,

      sort_dir: null,
      sort_type: null,
      addNewReuestFeedbackModal: false,
      isEditMode: false,
      isEditForm: false,
      isNewForm: false,
    };
    // let options = this.state.options;
  }
  // componentDidMount() {
  //   if(this.props.match.params.orgid !== this.props.currentUser.organization.id)
  //   {
  //     browserHistory.push("/error");
  //      window.location.reload(false);
  //     NotificationManager.error(
  //       "You are not allowed to perform this action",
  //       "Error",
  //       3000,
  //       null,
  //       null,
  //       ""
  //     )}
  //   this.props.getCoummunityUserProfile(
  //     this.props.currentUser.organization.id,
  //     this.props.match.params.id,
  //     this.props.match.params.usertypeid
  //   );

  //   if (this.props.currentUser.UserId != null) {
  //     this.setState({ isEditForm: true, isNewForm: false });
  //   } else {
  //     this.setState({ isEditForm: false, isNewForm: true, isEditMode: false });
  //   }
  //   if (this.props.userDetail == null) {
  //     this.props.initialize({
  //       QuestionResponse0: "",
  //       QuestionResponse1: "",
  //       QuestionResponse2: "",
  //       QuestionResponse3: "",
  //     });
  //   } else {
  //     this.props.initialize({
  //       QuestionResponse0: this.props.userDetail.QuestionResponse0,
  //       QuestionResponse1: this.props.userDetail.QuestionResponse1,
  //       QuestionResponse2: this.props.userDetail.QuestionResponse2,
  //       QuestionResponse3: this.props.userDetail.QuestionResponse3,
  //     });
  //   }
  // }
  componentDidMount() {
    if (
      this.props.match.params.usertypeid === "1" ||
      this.props.match.params.usertypeid === "2"
    ) {
      $(document).ready(function () {
        $("#resume").hide();
      });
    }
    this.props.getCoummunityUserProfile(
      this.props.currentUser.organization.id,
      this.props.match.params.id,
      this.props.match.params.usertypeid
    );

    if (this.props.currentUser.UserId != null) {
      this.setState({ isEditForm: true, isNewForm: false });
    } else {
      this.setState({ isEditForm: false, isNewForm: true, isEditMode: false });
    }
    if (this.props.userDetail == null) {
      this.props.initialize({
        QuestionResponse0: "",
        QuestionResponse1: "",
        QuestionResponse2: "",
        QuestionResponse3: "",
      });
    } else {
      this.props.initialize({
        QuestionResponse0: this.props.userDetail.QuestionResponse0,
        QuestionResponse1: this.props.userDetail.QuestionResponse1,
        QuestionResponse2: this.props.userDetail.QuestionResponse2,
        QuestionResponse3: this.props.userDetail.QuestionResponse3,
      });
    }
  }

  getCurrentUserImage = () => {
    let div = [];
    if (this.props.userDetail) {
      let Container = [];
      if (this.props.userDetail.ProfileImage != null) {
        Container.push(
          <div>
            {
              <img
                // style={{ borderRadius: "0.1rem", width: "100%" }}
                className="profile-view-image"
                src={this.props.userDetail.ProfileImage}
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
                // style={{ borderRadius: "0.1rem", width: "100%" }}
                className="profile-view-image"
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

  handleChange = (e) => {
    //  let  options = this.state.options;
    //   options.push({"value":id, "type": name});
    //   this.setState({options: options});
    this.setState({
      [e.target.name]: e.target.id + "," + e.target.value,
    });
  };

  // handleQuestionResponse=()=>{

  //   console.log(this.state);
  //   this.props.addQuestionResponse(this.props.currentUser.UserId, this.state);

  // }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.props.userDetail == null && nextProps.userDetail != null) {
      this.props.initialize({
        Question: nextProps.userDetail.Question,
        // "Question0": nextProps.userDetail.QuestionResponse[0].QuesId,
        // "Question1": nextProps.userDetail.QuestionResponse[1].QuesId,
        // "Question2": nextProps.userDetail.QuestionResponse[2].QuesId,
        // "Question3": nextProps.userDetail.QuestionResponse[3].QuesId,
        QuestionResponse0: nextProps.userDetail.QuestionResponse0,
        QuestionResponse1: nextProps.userDetail.QuestionResponse1,
        QuestionResponse2: nextProps.userDetail.QuestionResponse2,
        QuestionResponse3: nextProps.userDetail.QuestionResponse3,
        fileResumedata: nextProps.userDetail.fileResumedata,

        Type: "File",
      });
    }

    if (this.props.userDetail != null) {
      if (
        this.props.userDetail.ProfileSlug !== nextProps.userDetail.ProfileSlug
      ) {
        // this.props.getStates(nextProps.userDetail.countryId)
      }
      if (!(nextProps.dirty || nextProps.anyTouched)) {
        this.handelInitialValues(nextProps.userDetail);
      }
    }
  }

  handelInitialValues = (internObj) => {
    const internInitialObj = {
      Question: internObj.Question,
      // "Question0": internObj.userDetail.Question[0].Id,
      // "Question1": internObj.userDetail.Question[1].Id,
      // "Question2": internObj.userDetail.Question[2].Id,
      // "Question3": internObj.userDetail.Question[3].Id,
      QuestionResponse0: internObj.QuestionResponse0,
      QuestionResponse1: internObj.QuestionResponse1,
      QuestionResponse2: internObj.QuestionResponse2,
      QuestionResponse3: internObj.QuestionResponse3,
      QuesResponseCount: internObj.QuesResponseCount,
      // 'filelinkdata':internObj.filelinkdata,
      fileResumedata: internObj.fileResumedata,
      Type: "File",
    };
    this.props.initialize(internInitialObj);
  };
  getSocialLinks = () => {
    let table = [];

    if (this.props.userDetail.SocialLinks) {
      let children = [];
      for (let i = 0; i < this.props.userDetail.SocialCount; i++) {
        children.push(
          <Colxx xxs="2" md="2" sm="2" lg="2" className="social_icon_col">
            {
              <div className="social_links">
                <div class="profile-pic">
                  <a
                    href={this.props.userDetail.SocialLinks[i].WebsiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      className="profile_social-icon_style"
                      src={this.props.userDetail.SocialLinks[i].SocialIcon}
                      alt=""
                    ></img>{" "}
                  </a>
                </div>
              </div>
            }
          </Colxx>
        );
      }

      table.push(<Row style={{ textAlign: "center" }}>{children}</Row>);
    }

    return table;
  };
  getUserSkills = () => {
    let table = [];

    if (this.props.userDetail.UserSkills) {
      let children = [];
      for (let i = 0; i < this.props.userDetail.SkillCount; i++) {
        children.push(
          <Colxx xxs="6" md="6" sm="6" lg="4">
            {
              <div
                classname="skills-view"
                style={{
                  backgroundColor: "#E1E1E1",
                  height: "auto",
                  padding: "5px",
                  borderRadius: "5px",
                  textAlign: "center",
                }}
              >
                <span style={{ fontSize: "15px" }}>
                  {this.props.userDetail.UserSkills[i].Skill}
                </span>
              </div>
            }
            <br></br>
          </Colxx>
        );
      }
      table.push(<Row>{children}</Row>);
    }

    return table;
  };
  // only for chewy org
  OrgSpecificOption = () => {
    let table = [];

    if (this.props.userDetail.organization) {
      let children = [];
      if (
        this.props.userDetail.organization.id ===
        "2d7ca332-9098-4a0d-bcbb-1fbfde76d3a1"
      ) {
        children.push(
          <td className="profile_info_heading">{<label>Degree</label>}</td>
        );
        children.push(
          <th scope="row">
            {
              <span className="community_profile_info">
                {this.props.userDetail.Description}
              </span>
            }
          </th>
        );
      } else {
        children.push(
          <td className="profile_info_heading">{<label>Hometown</label>}</td>
        );
        children.push(
          <th scope="row">
            {
              <span className="community_profile_info">
                {this.props.userDetail.cityid}
              </span>
            }
          </th>
        );
      }
      table.push(<tr>{children}</tr>);
    }

    return table;
  };
  // only for Exponential Impact
  OrgExponentialSpecificOption = () => {
    let table = [];

    if (this.props.userDetail.organization) {
      let children = [];
      if (
        this.props.userDetail.organization.id ===
        "7cbebf74-2e3d-40b1-8b31-c328e8fcfdd1"
      ) {
        children.push(
          <td className="profile_info_heading">{<label>Company</label>}</td>
        );
        children.push(
          <th scope="row">
            {
              <span className="community_profile_info">
                {this.props.userDetail.Description}
              </span>
            }
          </th>
        );
      } else {
        children.push(
          <td className="profile_info_heading">{<label>University</label>}</td>
        );
        children.push(
          <th scope="row">
            {
              <span className="community_profile_info">
                {this.props.userDetail.SchoolName}
              </span>
            }
          </th>
        );
      }
      table.push(<tr>{children}</tr>);
    }

    return table;
  };
  // only for Genentech org and INROADS College Links orgs
  OrgGenentechSpecificOption = () => {
    let table = [];

    if (this.props.userDetail.organization) {
      let children = [];
      if (
        this.props.userDetail.organization.id ===
        "a71d6cba-6e12-4186-bac6-ce34cd060fa8"
        // || this.props.adminUserDetail.organization.id ===
        // "79fc47d8-1a63-4156-95e8-786c9d6eeda6"
      ) {
        children.push(
          <span style={{ fontSize: "14px" }}>
            {this.props.userDetail.Description}
          </span>
        );
      } else {
      }
      table.push(<tr>{children}</tr>);
    }

    return table;
  };
  // // only for INROADS College Links orgs
  // Role_Classification = () => {
  //   let table = [];

  //   if (this.props.userDetail.organization) {
  //     let children = [];
  //     if (
  //       this.props.userDetail.organization.id ===
  //       "79fc47d8-1a63-4156-95e8-786c9d6eeda6"
  //     ) {
  //       children.push(
  //         <td className="profile_info_heading">{<label>Classification</label>}</td>
  //       );
  //       children.push(
  //         <th scope="row">
  //           {
  //             <span className="community_profile_info">
  //               {this.props.userDetail.Role}
  //             </span>
  //           }
  //         </th>
  //       );
  //     } else {
  //       children.push(
  //         <td className="profile_info_heading">{<label>Role</label>}</td>
  //       );
  //       children.push(
  //         <th scope="row">
  //           {
  //             <span className="community_profile_info">
  //               {this.props.userDetail.Role}
  //             </span>
  //           }
  //         </th>
  //       );
  //     }
  //     table.push(<tr>{children}</tr>);
  //   }

  //   return table;
  // };
  //   // only for College Links orgs
  // Role_Classification = () => {
  //   let table = [];

  //   if (this.props.userDetail.organization) {
  //     let children = [];
  //     if (
  //       this.props.userDetail.organization.id ===
  //       "79fc47d8-1a63-4156-95e8-786c9d6eeda6" || this.props.userDetail.organization.id ===
  //       "6d42d298-9fb0-4d5a-aa8a-2029c9fd67a2" || this.props.userDetail.organization.id ===
  //       "03645d22-556c-4962-aed7-7f714228f403" || this.props.userDetail.organization.id ===
  //       "bd2b2014-2c99-4ecb-9ee6-3f599ae03294" || this.props.userDetail.organization.id ===
  //       "a44cbed6-3118-44e0-8941-591323819276" || this.props.userDetail.organization.id ===
  //       "467832e7-73a0-47a8-94f2-ac2eab1c3fd2" || this.props.userDetail.organization.id ===
  //       "82c425e8-9a66-4fc3-95b1-e6845e0a93ff" || this.props.userDetail.organization.id ===
  //       "f857e2ce-a434-457a-b472-4cb6fcfae333" || this.props.userDetail.organization.id ===
  //       "92f56c86-1835-41f5-9bf7-fd21bb393beb"
  //     ) {
  //       children.push(
  //         <td className="profile_info_heading">{<label>Classification</label>}</td>
  //       );
  //       children.push(
  //         <th scope="row">
  //           {
  //             <span className="community_profile_info">
  //               {this.props.userDetail.Role}
  //             </span>
  //           }
  //         </th>
  //       );
  //     } else {
  //       children.push(
  //         <td className="profile_info_heading">{<label>Role</label>}</td>
  //       );
  //       children.push(
  //         <th scope="row">
  //           {
  //             <span className="community_profile_info">
  //               {this.props.userDetail.Role}
  //             </span>
  //           }
  //         </th>
  //       );
  //     }
  //     table.push(<tr>{children}</tr>);
  //   }

  //   return table;
  // };

  getResume = () => {
    let div = [];
    if (this.state.isEditForm) {
      if (this.props.userDetail) {
        let Container = [];
        let Row1 = [];
        if (this.props.userDetail.ResumeUrl != null) {
          //get resume name from string
          var ResumeHeading = this.props.userDetail.ResumeUrl.substring(
            this.props.userDetail.ResumeUrl.lastIndexOf("/") + 1,
            this.props.userDetail.ResumeUrl.length
          );

          // var pieces = this.props.userDetail.ResumeUrl.split(/[\s,]+/);

          Row1.push(
            <div>
              {
                <a
                  style={{ cursor: "pointer" }}
                  href={this.props.userDetail.ResumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div
                    style={{ backgroundColor: "#F2F2F4" }}
                    className="form-control"
                  >
                    <i class="iconsminds-file"></i>
                    <span className="resume_heading">{ResumeHeading}</span>
                    {/* <img className="remove-File" src="/assets/img/cross.png" alt="" onClick={() => { if (window.confirm('Are you sure you want to delete this file?')) { this.handleRemoveFile(this.props.userDetail.UserId) }; }} /> */}
                  </div>
                </a>
              }
            </div>
          );
        } else {
          Row1.push(<div>{<label> </label>}</div>);
        }
        Container.push(<div>{Row1}</div>);
        div.push(<div>{Container}</div>);
      }
    }
    return div;
  };
  //   // only for INROADS College Links
  // Role_Classification = () => {
  //   let table = [];

  //   if (this.props.userDetail.organization) {
  //     let children = [];
  //     if (
  //       this.props.userDetail.organization.id ===
  //       "79fc47d8-1a63-4156-95e8-786c9d6eeda6"
  //     ) {
  //       children.push(
  //         <td className="profile_info_heading">{<label>Classification</label>}</td>
  //       );
  //       children.push(
  //         <th scope="row">
  //           {
  //             <span className="community_profile_info">
  //               {this.props.userDetail.Role}
  //             </span>
  //           }
  //         </th>
  //       );
  //     } else {
  //       children.push(
  //         <td className="profile_info_heading">{<label>Role</label>}</td>
  //       );
  //       children.push(
  //         <th scope="row">
  //           {
  //             <span className="community_profile_info">
  //               {this.props.userDetail.Role}
  //             </span>
  //           }
  //         </th>
  //       );
  //     }
  //     table.push(<tr>{children}</tr>);
  //   }

  //   return table;
  // };
  getUserInterests = () => {
    let table = [];

    if (this.props.userDetail.UserInterests) {
      let children = [];
      for (let i = 0; i < this.props.userDetail.InterestsCount; i++) {
        children.push(
          <Colxx xxs="6" md="6" sm="6" lg="4">
            {
              <div
                className="skills-view"
                style={{
                  backgroundColor: "#E1E1E1",
                  height: "auto",
                  padding: "5px",
                  borderRadius: "5px",
                  textAlign: "center",
                }}
              >
                <span style={{ fontSize: "15px" }}>
                  {this.props.userDetail.UserInterests[i].Interests}
                </span>
              </div>
            }
            <br></br>
          </Colxx>
        );
      }
      table.push(<Row>{children}</Row>);
    }

    return table;
  };

  render() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <Fragment>
          <Row>
            <Colxx xxs="5" lg="5" md="5">
              <div
                onClick={browserHistory.goBack}
                style={{ cursor: "pointer" }}
              >
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
              </div>
            </Colxx>
            <Colxx xxs="7" lg="7" md="7">
              <h1
                style={{
                  textAlign: "center",
                  fontWeight: "bold",
                  marginLeft: -14,
                }}
              >
                Profile
              </h1>
            </Colxx>
          </Row>
          <Row>
            <Colxx xxs="12">
              <Separator className="mb-5 top-separator" />
            </Colxx>
          </Row>
          <Row>
            {/* <Colxx xxs="12" md="4"sm="12" lg="3"
              style={{ textAlign: "center" }}
            > */}
            <Colxx
              xxs="12"
              md="4"
              sm="12"
              lg="3"
              style={{ textAlign: "center" }}
            >
              <div>{this.getCurrentUserImage()}</div>
              <Button color="#17b298" className="mb-2 profile_messageme">
                <a
                  target="_blank"
                  style={{
                    fontWeight: "bolder",
                    color: "#fff",
                  }}
                  href={
                    this.props.userDetail.Isslack === true
                      ? "https://slack.com/app_redirect?channel=" +
                        this.props.userDetail.UserslackId
                      : "mailto:" + this.props.userDetail.Email
                  }
                  rel="noopener noreferrer"
                >
                  <IntlMessages id=" Message Me" />
                </a>
              </Button>
              <p style={{ fontSize: 16, marginBottom: 28, marginTop: 14 }}>
                {/* for InternHacks org in prod */}
                {this.props.currentUser.organization.id !=
                "ad845fa0-c562-4d69-b5ac-12c26ff1ae37"
                  ? this.props.userDetail.Email
                  : null}
              </p>
              {/* <div className="socialnew">{this.getSocialLinks()}</div> */}
              <div class="d-flex justify-content-center">
                {this.getSocialLinks()}
              </div>
            </Colxx>
            {/* <Colxx xxs="12" md="1" lg="1" sm="1"></Colxx>
        <Colxx xxs="6" md="2" sm="2" lg="1">
          <div style={{ display: "inline-block" }}>
            {this.getCurrentUserImage()}
          </div>
        </Colxx> */}
            <Colxx xxs="12" md="8" sm="12" lg="6">
              {/* <span style={{ fontWeight: "bold", fontSize: "1.75rem" }}> */}
              <h1 className="profile_name_text">
                {" "}
                {this.props.userDetail.FirstName +
                  " " +
                  this.props.userDetail.LastName}
              </h1>
              {/* </span> */}
              <img
                style={{ marginTop: "-10px", marginLeft: "16px" }}
                src="/assets/img/hand-wave.png"
                alt=""
                className="community_text_emoji"
              />

              {this.props.userDetail.UserTitle !== null &&
              this.props.userDetail.UserTitle !== "" ? (
                <p>
                  <img
                    style={{ marginTop: "-5px" }}
                    src="/assets/img/user_title_icon.png"
                    className="profile_user_title_icon"
                  />
                  <span
                    style={{
                      fontSize: 16,
                      fontWeight: 400,
                      // marginTop: -10,
                      marginLeft: "8px",
                      marginBottom: "8px",
                    }}
                  >
                    {this.props.userDetail.UserTitle}
                  </span>
                </p>
              ) : null}
              {this.props.userDetail.Pronouns !== null &&
              this.props.userDetail.Pronouns !== "" ? (
                <p>
                  <img
                    src="/assets/img/user_pronoun_icon.png"
                    className="profile_user_pronoun_icon"
                  />
                  <span
                    style={{
                      fontSize: 16,
                      fontWeight: 400,
                      marginTop: -10,
                      marginLeft: "8px",
                      marginBottom: "8px",
                    }}
                  >
                    {this.props.userDetail.Pronouns}
                  </span>
                </p>
              ) : null}
              {this.props.userDetail.SchoolName !== null &&
              this.props.userDetail.SchoolName !== "" ? (
                <p>
                  <img
                    src="/assets/img/user_school_icon.png"
                    className="profile_user_school_icon"
                  />
                  <span
                    style={{
                      fontSize: 16,
                      fontWeight: 400,
                      marginTop: -10,
                      marginLeft: "8px",
                      marginBottom: "8px",
                    }}
                  >
                    {this.props.userDetail.SchoolName}
                  </span>
                </p>
              ) : null}
              {this.props.userDetail.Location !== "" &&
              this.props.userDetail.Location !== null ? (
                <p>
                  <img
                    src="/assets/img/user_location_icon.svg"
                    className="profile_user_pronoun_icon"
                  />
                  <span
                    style={{
                      fontSize: 16,
                      fontWeight: 400,
                      marginTop: -10,
                      marginLeft: "8px",
                      marginBottom: "8px",
                    }}
                  >
                    {this.props.userDetail.Location}
                  </span>
                </p>
              ) : null}

              {/* {this.OrgExponentialSpecificOption()}
                  {this.OrgSpecificOption()}
                  {this.Role_Classification()} */}
              <Colxx xxs="12" md="12">
                <Separator className="mb-5 profile_seperator" />
              </Colxx>
              <CardTitle className="profile_card_title">
                <span style={{ fontWeight: "bold" }}>Skills</span>
                <br></br>
              </CardTitle>
              {this.getUserSkills()}
              <CardTitle className="profile_card_title">
                <span style={{ fontWeight: "bold" }}>Interests</span>
                <br></br>
              </CardTitle>
              {this.getUserInterests()}
              <Colxx xxs="12" md="12">
                <Separator className="mb-5 profile_seperator" />
              </Colxx>
              <div style={{ marginBottom: 160 }}>
                <CardTitle className="profile_card_title">
                  <span style={{ fontWeight: "bold" }}>Get to know me!</span>
                  <br></br>
                </CardTitle>

                {this.props.userDetail.QuesResponseCount > 0 ? (
                  this.props.userDetail.QuestionResponse.map(
                    (Question, key) => {
                      return (
                        <div
                          className="QuesDiv"
                          style={{
                            width: "552",
                            minHeight: "156px",
                            border: "1px solid #f5f0f0",
                            marginBottom: 16,
                            padding: 15,
                            borderRadius: 15,
                            padding: "16px 24px 52px 24px",
                          }}
                        >
                          <p
                            name={Question.Id}
                            style={{
                              // fontWeight: "bold",
                              // marginTop: "9px",
                              marginBottom: "21px",
                              fontSize: "16px",
                              fontWeight: 400,
                            }}
                            id={Question.QuesId}
                          >
                            {Question.QuesText}
                          </p>

                          <p
                            style={{
                              fontWeight: 600,
                              fontSize: "18px",
                            }}
                          >
                            {Question.quesresponse}
                          </p>

                          {/* <Field
                        name={"QuestionResponse" + key}
                        disabled={
                          !(this.state.isEditMode || this.state.isNewForm)
                        }
                        onClick={this.handleChange}
                        className="form-control"
                        component={renderTextField}
                        type="text"
                        placeholder="Enter your response here"
                      ></Field> */}
                        </div>
                      );
                    }
                  )
                ) : (
                  <tr className="no-record-found">
                    <td>No Record Found</td>
                  </tr>
                )}
              </div>
            </Colxx>
          </Row>

          {/* <Row id="resume">
            <Colxx xxs="12" md="1" lg="1" sm="1"></Colxx>
            <Colxx xxs="12" md="8" lg="8" sm="12">
              <Card className="mb-4">
                <CardBody>
                  <CardTitle>
                    <span style={{ fontWeight: "bold" }}>Resume</span>
                  </CardTitle>

                  {this.getResume()}
                </CardBody>
              </Card>
            </Colxx>
          </Row> */}
          {/* <Row>
       <Colxx  xxs="12" md="1" lg="1" sm="1" ></Colxx>
       <Colxx  xxs="12" md="8" lg="8" sm="8" >
       <Card className="mb-4">
              <CardBody>
                <CardTitle>
                <span style={{fontWeight:'bold'}}>Resume</span>
                <div style={{float:'right'}}>

                  <Button style={{margin:"0 10px",padding:'0.40rem 0.60rem 0.20rem 0.60rem'}}  type="submit" onSubmit={this.submit}   outline className="mb-2" color="info">Upload</Button>

                   </div>
              
                </CardTitle>
                <div className='input-box-single'>
                <Field name="fileResumedata"  className="form-control" required component={FileInput} />
                <br></br>
                 {this.getResume()}
                                        
                </div>
              </CardBody>
            </Card>
       </Colxx>
       </Row>
       */}
        </Fragment>
      </form>
    );
  }
}
const validations = {
  required: {
    fields: ["firstname", "lastname", "email", "personalemail"],
  },
  email: {
    fields: ["email"],
  },
  // phone_number: {
  //     fields: ['mobile', 'workContact']
  // }
};

ViewUserProfileForm = reduxForm({
  form: "ViewUserProfileForm", // a unique identifier for this form
  validate: (values) => {
    return validate(values, validations);
  },
})(ViewUserProfileForm);
//const selector = formValueSelector("ViewUserProfileForm"); // <-- same as form name

const mapStateToProps = (state) => {
  return {
    // fileType: selector(state, 'Type'),
    currentUser: state.userReducer.currentUser,
    userDetail: state.organizationReducer.userDetail,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCoummunityUserProfile: (organizationId, internId, usertypeid) => {
      dispatch(getCoummunityUserProfile(organizationId, internId, usertypeid));
    },
    dispatch: dispatch,
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewUserProfileForm);
