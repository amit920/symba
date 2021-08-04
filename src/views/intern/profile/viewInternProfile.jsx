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
import { NavLink } from "react-router-dom";
import IntlMessages from "../../../helpers/IntlMessages";
// import { getInternList } from '../../../action/community/community';
import { connect } from "react-redux";
// import * as constants from "../../../utils/constants";
// import { Route, Link } from "react-router-dom";
// import RequestFeedbackPopupForm from '../feedback/requestFeedbackPopupForm';
import {
  //Field,
  reduxForm,
  // FieldArray,
  //formValueSelector,
  reset,
} from "redux-form";
import {
  getInternProfile,
  removeUploadFile,
  addInternSocialLinks,
  deleteSocialwebsite,
  deleteUserSkills,
} from "../../../action/profile/profile";
import {
  //renderTextField,
  // renderTextArea,
  // renderDateField,
  validate,
  // renderSelectField,
  // ComboField,
  // renderMultiSelectField,
  //fileInput,
} from "../../util/form-fields";
import { getSocialnetworks } from "../../../action/master/masterData";
import { NotificationManager } from "../../../components/common/react-notifications";
import AddInternProfileImagePopUpForm from "./addInternProfileImagePopUpForm";
//import InternSkillsPopupForm from "./internSkillsPopupForm";
/* eslint-disable */

//const adaptFileEventToValue = (delegate) => (e) => delegate(e.target.files[0]);

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
class ViewInternProfileForm extends Component {
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
      showMenu: false,
      addProfileImageSubmissionModal: false,
      addSkillsModal: false,
    };
    this.showMenu = this.showMenu.bind(this);
  }
  showMenu(event) {
    event.preventDefault();
    this.setState({ showMenu: true });
  }
  HandleCancleClick = () => {
    this.setState({ showMenu: false });
  };
  componentDidMount() {
    this.props.getInternProfile(
      this.props.currentUser.organization.id,
      this.props.currentUser.UserId
    );
    this.props.getSocialnetworks();
    if (this.props.currentUser.UserId != null) {
      this.setState({ isEditForm: true, isNewForm: false });
    } else {
      this.setState({ isEditForm: false, isNewForm: true, isEditMode: false });
    }
    if (this.props.internDetail == null) {
      this.props.initialize({
        QuestionResponse0: "",
        QuestionResponse1: "",
        QuestionResponse2: "",
        QuestionResponse3: "",
      });
    } else {
      this.props.initialize({
        QuestionResponse0: this.props.internDetail.QuestionResponse0,
        QuestionResponse1: this.props.internDetail.QuestionResponse1,
        QuestionResponse2: this.props.internDetail.QuestionResponse2,
        QuestionResponse3: this.props.internDetail.QuestionResponse3,
      });
    }
  }

  getCurrentUserImage = () => {
    let div = [];
    if (this.props.internDetail) {
      let Container = [];
      if (this.props.internDetail.ProfileImage != null) {
        Container.push(
          <div>
            {
              <img
                className="profile-view-image"
                src={this.props.internDetail.ProfileImage}
                // onClick={this.openProfileImagePopUpModel}
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
                //onClick={this.openProfileImagePopUpModel}
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
  // openProfileImagePopUpModel = () => {
  //   this.setState({ addProfileImageSubmissionModal: true });
  // };
  // closeProfileImagePopUpModel = () => {
  //   this.props.dispatch(reset("addAdminProfileImagePopUpForm"));
  //   this.setState({ addProfileImageSubmissionModal: false });
  // };
  handleChange = (e) => {
    //  let  options = this.state.options;
    //   options.push({"value":id, "type": name});
    //   this.setState({options: options});
    this.setState({
      [e.target.name]: e.target.id + "," + e.target.value,
    });
  };

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.props.internDetail == null && nextProps.internDetail != null) {
      this.props.initialize({
        Question: nextProps.internDetail.Question,
        QuestionResponse0: nextProps.internDetail.QuestionResponse0,
        QuestionResponse1: nextProps.internDetail.QuestionResponse1,
        QuestionResponse2: nextProps.internDetail.QuestionResponse2,
        QuestionResponse3: nextProps.internDetail.QuestionResponse3,
      });
    }

    if (this.props.internDetail != null) {
      if (
        this.props.internDetail.ProfileSlug !==
        nextProps.internDetail.ProfileSlug
      ) {
        // this.props.getStates(nextProps.internDetail.countryId)
      }
      if (!(nextProps.dirty || nextProps.anyTouched)) {
        this.handelInitialValues(nextProps.internDetail);
      }
    }
  }

  handelInitialValues = (internObj) => {
    const internInitialObj = {
      Question: internObj.Question,
      QuestionResponse0: internObj.QuestionResponse0,
      QuestionResponse1: internObj.QuestionResponse1,
      QuestionResponse2: internObj.QuestionResponse2,
      QuestionResponse3: internObj.QuestionResponse3,
      QuesResponseCount: internObj.QuesResponseCount,
      // 'filelinkdata':internObj.filelinkdata,
    };
    this.props.initialize(internInitialObj);
  };
  handleDeleteSocialSite = (usersocialsiteId) => {
    this.props.deleteSocialwebsite(usersocialsiteId);
  };

  getSocialLinks = () => {
    let table = [];
    if (this.props.internDetail.SocialLinks) {
      let children = [];
      for (let i = 0; i < this.props.internDetail.SocialCount; i++) {
        children.push(
          <Colxx xxs="2" md="2" sm="2" lg="2" className="social_icon_col">
            {
              <div className="social_links">
                <div class="profile-pic">
                  <a
                    href={this.props.internDetail.SocialLinks[i].WebsiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      className="profile_social-icon_style"
                      src={this.props.internDetail.SocialLinks[i].SocialIcon}
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

  change = (e) => {
    this.setState({ value: e.target.value });
  };
  handleWebsiteChange = (e) => {
    this.setState({ input: e.target.value });
  };

  handleSocialClick = () => {
    if (this.state.value == null) {
      NotificationManager.error(
        "Please select any social media",
        "Error",
        3000,
        null,
        null,
        ""
      );
    } else if (this.state.input == null) {
      NotificationManager.error(
        "Please enter website url",
        "Error",
        3000,
        null,
        null,
        ""
      );
    } else if (
      this.state.input.match(
        ///(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
        /^(?:\w+:)?\/\/([^\s\.]+\.\S{2}|[\:?\d]*)\S*$/
      ) === null
    ) {
      NotificationManager.error(
        "Please enter website url with Https",
        "Error",
        3000,
        null,
        null,
        ""
      );
    } else {
      var sociallinkdata = {
        userId: this.props.currentUser.UserId,
        socialnetwork_id: this.state.value,
        social_url: this.state.input,
        createdby: this.props.currentUser.UserId,
      };
      this.props.addAdminSocialLinks(sociallinkdata);
    }
  };

  getUserSkills = () => {
    let table = [];

    if (this.props.internDetail.UserSkills) {
      let children = [];
      for (let i = 0; i < this.props.internDetail.SkillCount; i++) {
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
                  {this.props.internDetail.UserSkills[i].Skill}
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
  getUserInterests = () => {
    let table = [];

    if (this.props.internDetail.UserInterests) {
      let children = [];
      for (let i = 0; i < this.props.internDetail.InterestsCount; i++) {
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
                  {this.props.internDetail.UserInterests[i].Interests}
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

  handleDeleteSkills = (userskillId) => {
    this.props.deleteUserSkills(userskillId);
  };
  closeAddNewSkillsSubmissionModal = () => {
    this.props.dispatch(reset("internSkillsPopupForm"));
    this.setState({ addSkillsModal: false });
  };

  openAddNewSkillsSubmissionModal = () => {
    this.setState({ addSkillsModal: true });
  };

  render() {
    let oOptions = [];
    if (this.props.socialNetworksList) {
      this.props.socialNetworksList.map((item) => {
        oOptions.push(
          <option key={item.socialid} value={item.socialid}>
            {item.socialname}
          </option>
        );
      });
    }
    // only for Chewy
    if (
      this.props.currentUser.organization.id ===
      "2d7ca332-9098-4a0d-bcbb-1fbfde76d3a1"
    ) {
      var heading = "Degree";
      var headingValue = this.props.currentUser.Description;
    } else {
      var heading = "Hometown";
      var headingValue = this.props.currentUser.City;
    }
    // only for Exponential Impact
    if (
      this.props.currentUser.organization.id ===
      "7cbebf74-2e3d-40b1-8b31-c328e8fcfdd1"
    ) {
      var headingExponential = "Company";
      var headingExponentialValue = this.props.currentUser.Description;
    } else {
      var headingExponential = "School";
      var headingExponentialValue = this.props.currentUser.SchoolName;
    }
    // only for Genentech ORG
    if (
      this.props.currentUser.organization.id ===
      "a71d6cba-6e12-4186-bac6-ce34cd060fa8"
    ) {
      var headingPronounsValue = this.props.currentUser.Description;
    } else {
    }
    // only INROADS College Links orgs
    if (
      this.props.currentUser.organization.id ===
      "79fc47d8-1a63-4156-95e8-786c9d6eeda6"
    ) {
      var headingPronounsValue = this.props.currentUser.Description;
      var heading_Role_Classification = "Title";
    } else {
      var heading_Role_Classification = "Role";
    }
    return (
      <div>
        <Fragment>
          <Row>
            <Colxx xxs="12" md="12" sm="12">
              <h1 style={{ textAlign: "center", fontWeight: "bold" }}>
                Profile
              </h1>
            </Colxx>
            {/* <Colxx xxs="6" md="6" sm="6">
              <NavLink
                className="reset_password_link"
                style={{ float: "right" }}
                to="/app/profile/reset-password"
              >
                <Button outline color="primary" className="mb-2 reset-password">
                  <IntlMessages id="Reset Password" />
                </Button>
              </NavLink>
            </Colxx> */}
          </Row>
          <Row>
            <Colxx xxs="12">
              <Separator className="mb-3 top-separator" />
            </Colxx>
          </Row>
          <Row>
            <Colxx xxs="12" md="12" sm="12" lg="9">
              <NavLink to="/internapp/profile/edit">
                <Button
                  outline
                  color="primary"
                  className="mb-2 profile_editbtn"
                >
                  <IntlMessages id="Edit" />
                </Button>
              </NavLink>
            </Colxx>
          </Row>

          <Row>
            {/* <Colxx
              xxs="12"
              md="4"
              sm="12"
              lg="3 "
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
                    this.props.internDetail.Isslack === true
                      ? "https://slack.com/app_redirect?channel=" +
                        this.props.internDetail.UserslackId
                      : "mailto:" + this.props.internDetail.Email
                  }
                  rel="noopener noreferrer"
                >
                  <IntlMessages id=" Message Me" />
                </a>
              </Button>
              <p style={{ fontSize: 16, marginBottom: 28, marginTop: 14 }}>
                {this.props.currentUser.Email}
              </p>
              {/* <div className="socialnew">{this.getSocialLinks()}</div> */}
              <div class="d-flex justify-content-center">
                {this.getSocialLinks()}
              </div>
            </Colxx>
            <Colxx xxs="12" md="8" sm="12" lg="6">
              <h1 className="profile_name_text">
                Hi, I'm{" "}
                {this.props.currentUser.FirstName +
                  " " +
                  this.props.currentUser.LastName}
              </h1>
              <img
                style={{ marginTop: "-10px", marginLeft: "16px" }}
                src="/assets/img/hand-wave.png"
                alt=""
                className="community_text_emoji"
              />
              {/* <NavLink to="/internapp/profile/edit">
                <Button
                  outline
                  color="primary"
                  className="mb-2 profile_editbtn"
                >
                  <IntlMessages id="Edit" />
                </Button>
              </NavLink> */}

              {this.props.internDetail.UserTitle !== "" &&
              this.props.internDetail.UserTitle !== null ? (
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
                    {this.props.internDetail.UserTitle}
                  </span>
                </p>
              ) : null}
              {this.props.internDetail.Pronouns !== "" &&
              this.props.internDetail.Pronouns !== null ? (
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
                    {this.props.internDetail.Pronouns}
                  </span>
                </p>
              ) : null}

              {this.props.internDetail.Location !== "" &&
              this.props.internDetail.Location !== null ? (
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
                    {this.props.internDetail.Location}
                  </span>
                </p>
              ) : null}
              {this.props.internDetail.schoolname !== "" &&
              this.props.internDetail.schoolname !== null ? (
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
                    {this.props.internDetail.schoolname}
                  </span>
                </p>
              ) : null}
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
                {this.props.internDetail.QuesResponseCount > 0 ? (
                  this.props.internDetail.QuestionResponse.map(
                    (Question, key) => {
                      return (
                        <div
                          className="QuesDiv"
                          style={{
                            width: "552",
                            minHeight: "156px",
                            border: "1px solid #E1E1E1",
                            marginBottom: 16,
                            padding: 15,
                            borderRadius: 15,
                            padding: "16px 24px 52px 24px",
                            overflowWrap: "break-word",
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
                              fontSize: "16px",
                              lineHeight: "24px",
                            }}
                          >
                            {Question.quesresponse === "" ? (
                              <span style={{ color: "#646464" }}>
                                (No answer yet)
                              </span>
                            ) : (
                              <span>{Question.quesresponse}</span>
                            )}
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
        {/* </form> */}
        <AddInternProfileImagePopUpForm
          onSubmit={this.submit}
          dispatch={this.props.dispatch}
          onRequestClose={this.closeProfileImagePopUpModel}
          modalStatus={this.state.addProfileImageSubmissionModal}
          currentUser={this.props.currentUser}
        />
        <internSkillsPopupForm
          dispatch={this.props.dispatch}
          onRequestClose={this.closeAddNewSkillsSubmissionModal}
          modalStatus={this.state.addSkillsModal}
          currentUser={this.props.currentUser}
        />
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
};

ViewInternProfileForm = reduxForm({
  form: "ViewInternProfileForm", // a unique identifier for this form
  validate: (values) => {
    return validate(values, validations);
  },
})(ViewInternProfileForm);
//const selector = formValueSelector("ViewInternProfileForm"); // <-- same as form name

const mapStateToProps = (state) => {
  return {
    // fileType: selector(state, 'Type'),
    currentUser: state.userReducer.currentUser,
    internDetail: state.organizationReducer.internDetail,
    socialNetworksList: state.masterReducer.socialNetworksList,
    socialNetworksCount: state.masterReducer.socialNetworksCount,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getSocialnetworks: () => {
      dispatch(getSocialnetworks());
    },
    getInternProfile: (organizationId, internId) => {
      dispatch(getInternProfile(organizationId, internId));
    },
    removeUploadFile: (userId) => {
      dispatch(removeUploadFile(userId));
    },
    addInternSocialLinks: (params, callback) => {
      dispatch(addInternSocialLinks(params, callback));
    },
    deleteSocialwebsite: (usersocialId) => {
      dispatch(deleteSocialwebsite(usersocialId));
    },
    deleteUserSkills: (userskillId) => {
      dispatch(deleteUserSkills(userskillId));
    },
    dispatch: dispatch,
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewInternProfileForm);
