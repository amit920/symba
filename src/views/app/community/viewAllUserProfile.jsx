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
  // formValueSelector,
  // reset,
} from "redux-form";
import { getCoummunityAllUserProfile } from "../../../action/profile/profile";
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
import $ from "jquery";
/* eslint-disable */
// import { NotificationManager } from "../../../../src/components/common/react-notifications";
import createBrowserHistory from "history/createBrowserHistory";
const browserHistory = createBrowserHistory();
// const adaptFileEventToValue = (delegate) => (e) => delegate(e.target.files[0]);

// const FileInput = ({
//   input: { value: omitValue, onChange, onBlur, ...inputProps },
//   meta: omitMeta,
//   ...props
// }) => {
//   return (
//     <input
//       onChange={adaptFileEventToValue(onChange)}
//       onBlur={adaptFileEventToValue(onBlur)}
//       type="file"
//       {...props.input}
//       {...props}
//     />
//   );
// };
class ViewAllUserProfileForm extends Component {
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
  componentDidMount() {
    if (
      this.props.match.params.usertypeid === "1" ||
      this.props.match.params.usertypeid === "2"
    ) {
      $(document).ready(function () {
        $("#resume").hide();
      });
    }
    this.props.getCoummunityAllUserProfile(
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
    if (this.props.adminUserDetail) {
      let Container = [];
      if (this.props.adminUserDetail.ProfileImage != null) {
        Container.push(
          <div>
            {
              <img
                className="profile-view-image"
                src={this.props.adminUserDetail.ProfileImage}
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

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (
      this.props.adminUserDetail == null &&
      nextProps.adminUserDetail != null
    ) {
      this.props.initialize({
        Question: nextProps.adminUserDetail.Question,
        // "Question0": nextProps.adminUserDetail.QuestionResponse[0].QuesId,
        // "Question1": nextProps.adminUserDetail.QuestionResponse[1].QuesId,
        // "Question2": nextProps.adminUserDetail.QuestionResponse[2].QuesId,
        // "Question3": nextProps.adminUserDetail.QuestionResponse[3].QuesId,
        QuestionResponse0: nextProps.adminUserDetail.QuestionResponse0,
        QuestionResponse1: nextProps.adminUserDetail.QuestionResponse1,
        QuestionResponse2: nextProps.adminUserDetail.QuestionResponse2,
        QuestionResponse3: nextProps.adminUserDetail.QuestionResponse3,
        fileResumedata: nextProps.adminUserDetail.fileResumedata,

        Type: "File",
      });
    }

    if (this.props.adminUserDetail != null) {
      if (
        this.props.adminUserDetail.ProfileSlug !==
        nextProps.adminUserDetail.ProfileSlug
      ) {
        // this.props.getStates(nextProps.adminUserDetail.countryId)
      }
      if (!(nextProps.dirty || nextProps.anyTouched)) {
        this.handelInitialValues(nextProps.adminUserDetail);
      }
    }
  }

  handelInitialValues = (internObj) => {
    const internInitialObj = {
      Question: internObj.Question,
      // "Question0": internObj.adminUserDetail.Question[0].Id,
      // "Question1": internObj.adminUserDetail.Question[1].Id,
      // "Question2": internObj.adminUserDetail.Question[2].Id,
      // "Question3": internObj.adminUserDetail.Question[3].Id,
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
  getResume = () => {
    let div = [];
    if (this.state.isEditForm) {
      if (this.props.adminUserDetail) {
        let Container = [];
        let Row1 = [];
        if (this.props.adminUserDetail.ResumeUrl != null) {
          //get resume name from string
          var ResumeHeading = this.props.adminUserDetail.ResumeUrl.substring(
            this.props.adminUserDetail.ResumeUrl.lastIndexOf("/") + 1,
            this.props.adminUserDetail.ResumeUrl.length
          );

          // var pieces = this.props.adminUserDetail.ResumeUrl.split(/[\s,]+/);

          Row1.push(
            <div>
              {
                <a
                  style={{ cursor: "pointer" }}
                  href={this.props.adminUserDetail.ResumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div
                    style={{ backgroundColor: "#F2F2F4" }}
                    className="form-control"
                  >
                    <i class="iconsminds-file"></i>
                    <span className="resume_heading">{ResumeHeading}</span>
                    {/* <img className="remove-File" src="/assets/img/cross.png" alt="" onClick={() => { if (window.confirm('Are you sure you want to delete this file?')) { this.handleRemoveFile(this.props.adminUserDetail.UserId) }; }} /> */}
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
  getSocialLinks = () => {
    let table = [];

    if (this.props.adminUserDetail.SocialLinks) {
      let children = [];
      for (let i = 0; i < this.props.adminUserDetail.SocialCount; i++) {
        children.push(
          <Colxx xxs="2" md="2" sm="2" lg="2" className="social_icon_col">
            {
              <div className="social_links">
                <div class="profile-pic">
                  <a
                    href={this.props.adminUserDetail.SocialLinks[i].WebsiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      className="profile_social-icon_style"
                      src={this.props.adminUserDetail.SocialLinks[i].SocialIcon}
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

    if (this.props.adminUserDetail.UserSkills) {
      let children = [];
      for (let i = 0; i < this.props.adminUserDetail.SkillCount; i++) {
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
                  {this.props.adminUserDetail.UserSkills[i].Skill}
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

    if (this.props.adminUserDetail.organization) {
      let children = [];
      if (
        this.props.adminUserDetail.organization.id ===
        "2d7ca332-9098-4a0d-bcbb-1fbfde76d3a1"
      ) {
        children.push(
          <td className="profile_info_heading">{<label>Degree</label>}</td>
        );
        children.push(
          <th scope="row">
            {
              <span className="community_profile_info">
                {this.props.adminUserDetail.Description}
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
                {this.props.adminUserDetail.cityid}
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

    if (this.props.adminUserDetail.organization) {
      let children = [];
      if (
        this.props.adminUserDetail.organization.id ===
        "7cbebf74-2e3d-40b1-8b31-c328e8fcfdd1"
      ) {
        children.push(
          <td className="profile_info_heading">{<label>Company</label>}</td>
        );
        children.push(
          <th scope="row">
            {
              <span className="community_profile_info">
                {this.props.adminUserDetail.Description}
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
                {this.props.adminUserDetail.SchoolName}
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

    if (this.props.adminUserDetail.organization) {
      let children = [];
      if (
        this.props.adminUserDetail.organization.id ===
          "a71d6cba-6e12-4186-bac6-ce34cd060fa8" ||
        this.props.adminUserDetail.organization.id ===
          "79fc47d8-1a63-4156-95e8-786c9d6eeda6"
      ) {
        children.push(
          <span style={{ fontSize: "14px" }}>
            {this.props.adminUserDetail.Description}
          </span>
        );
      } else {
      }
      table.push(<tr>{children}</tr>);
    }

    return table;
  };
  // only for INROADS College Links
  Role_Classification = () => {
    let table = [];

    if (this.props.adminUserDetail.organization) {
      let children = [];
      if (
        this.props.adminUserDetail.organization.id ===
        "79fc47d8-1a63-4156-95e8-786c9d6eeda6"
      ) {
        children.push(
          <td className="profile_info_heading">
            {<label>Classification</label>}
          </td>
        );
        children.push(
          <th scope="row">
            {
              <span className="community_profile_info">
                {this.props.adminUserDetail.Role}
              </span>
            }
          </th>
        );
      } else {
        children.push(
          <td className="profile_info_heading">{<label>Role</label>}</td>
        );
        children.push(
          <th scope="row">
            {
              <span className="community_profile_info">
                {this.props.adminUserDetail.Role}
              </span>
            }
          </th>
        );
      }
      table.push(<tr>{children}</tr>);
    }

    return table;
  };
  getUserInterests = () => {
    let table = [];

    if (this.props.adminUserDetail.UserInterests) {
      let children = [];
      for (let i = 0; i < this.props.adminUserDetail.InterestsCount; i++) {
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
                  {this.props.adminUserDetail.UserInterests[i].Interests}
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
      <div>
        {/* <form onSubmit={handleSubmit}> */}
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
            {/* <Colxx
              xxs="12"
              md="4"
              sm="12"
              lg="3"
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
                    this.props.adminUserDetail.Isslack === true
                      ? "https://slack.com/app_redirect?channel=" +
                        this.props.adminUserDetail.UserslackId
                      : "mailto:" + this.props.adminUserDetail.Email
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
                  ? this.props.adminUserDetail.Email
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
                {this.props.adminUserDetail.FirstName +
                  " " +
                  this.props.adminUserDetail.LastName}
              </h1>
              {/* </span> */}
              <img
                style={{ marginTop: "-10px", marginLeft: "16px" }}
                src="/assets/img/hand-wave.png"
                alt=""
                className="community_text_emoji"
              />

              {this.props.adminUserDetail.UserTitle !== null &&
              this.props.adminUserDetail.UserTitle !== "" ? (
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
                    {this.props.adminUserDetail.UserTitle}
                  </span>
                </p>
              ) : null}
              {this.props.adminUserDetail.Pronouns !== null &&
              this.props.adminUserDetail.Pronouns !== "" ? (
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
                    {this.props.adminUserDetail.Pronouns}
                  </span>
                </p>
              ) : null}
              {this.props.adminUserDetail.SchoolName !== null &&
              this.props.adminUserDetail.SchoolName !== "" ? (
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
                    {this.props.adminUserDetail.SchoolName}
                  </span>
                </p>
              ) : null}
              {this.props.adminUserDetail.Location !== "" &&
              this.props.adminUserDetail.Location !== null ? (
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
                    {this.props.adminUserDetail.Location}
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

                {this.props.adminUserDetail.QuesResponseCount > 0 ? (
                  this.props.adminUserDetail.QuestionResponse.map(
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
        </Fragment>
      </div>
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

ViewAllUserProfileForm = reduxForm({
  form: "ViewAllUserProfileForm", // a unique identifier for this form
  validate: (values) => {
    return validate(values, validations);
  },
})(ViewAllUserProfileForm);
// const selector = formValueSelector("ViewAllUserProfileForm"); // <-- same as form name

const mapStateToProps = (state) => {
  return {
    // fileType: selector(state, 'Type'),
    currentUser: state.userReducer.currentUser,
    adminUserDetail: state.organizationReducer.adminUserDetail,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCoummunityAllUserProfile: (organizationId, internId, usertypeid) => {
      dispatch(
        getCoummunityAllUserProfile(organizationId, internId, usertypeid)
      );
    },
    dispatch: dispatch,
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewAllUserProfileForm);
