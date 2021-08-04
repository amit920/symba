import React, { Component, Fragment } from "react";
// import { injectIntl } from "react-intl";
import { Row } from "reactstrap";
import { Colxx, Separator } from "../../../components/common/CustomBootstrap";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import {
  // Input,
  // UncontrolledCollapse,
  //Card,
  //CardBody,
  //CardTitle,
  // CardSubtitle,
  // CardImg,
  // CardText,
  Button,
  //Table,
} from "reactstrap";
import { Link, NavLink } from "react-router-dom";
import IntlMessages from "../../../helpers/IntlMessages";
//import IntlMessages from "../../../helpers/IntlMessages";
// import { getInternList } from '../../../action/community/community';
import { connect } from "react-redux";
// import * as constants from "../../../utils/constants";
// import { Route, Link } from "react-router-dom";
// import RequestFeedbackPopupForm from '../feedback/requestFeedbackPopupForm';
import {
  Field,
  //Field,
  reduxForm,
  // FieldArray,
  //formValueSelector,
  reset,
} from "redux-form";
import {
  getAdminProfile,
  addAdminSocialLinks,
  deleteSocialwebsite,
  deleteUserSkills,
  deleteUserInterests,
  addUserInterests,
  addUserSkills,
} from "../../../action/profile/profile";
import {
  renderTextField,
  renderTextArea,
  // renderDateField,
  validate,
  // renderSelectField,
  // ComboField,
  // renderMultiSelectField,
  // fileInput,
} from "../../util/form-fields";
import { getSocialnetworks } from "../../../action/master/masterData";
import { NotificationManager } from "../../../components/common/react-notifications";
import AddAdminProfileImagePopUpForm from "./addAdminProfileImagePopUpForm";
import AdminSkillsPopupForm from "./adminSkillsPopupForm";
import AdminInterestsPopupForm from "./adminInterestsPopupForm";
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
class AdminEditProfileForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: null,
      selectedInterests: [],

      sort_dir: null,
      sort_type: null,
      addNewReuestFeedbackModal: false,
      isEditMode: false,
      isEditForm: false,
      isNewForm: false,
      showMenu: false,
      addProfileImageSubmissionModal: false,
      addSkillsModal: false,
      addInterestsModal: false,
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
    this.props.getAdminProfile(
      this.props.currentUser.organization.id,
      this.props.currentUser.UserId
    );
    this.props.getSocialnetworks();
    if (this.props.currentUser.UserId != null) {
      this.setState({ isEditForm: true, isNewForm: false });
    } else {
      this.setState({ isEditForm: false, isNewForm: true, isEditMode: false });
    }
    if (this.props.adminDetail == null) {
      this.props.initialize({
        QuestionResponse0: "",
        QuestionResponse1: "",
        QuestionResponse2: "",
        QuestionResponse3: "",
      });
    } else {
      this.props.initialize({
        QuestionResponse0: this.props.adminDetail.QuestionResponse0,
        QuestionResponse1: this.props.adminDetail.QuestionResponse1,
        QuestionResponse2: this.props.adminDetail.QuestionResponse2,
        QuestionResponse3: this.props.adminDetail.QuestionResponse3,
        // school:this.props.adminDetail.schoolname
      });
    }
  }
  getCurrentUserImage = () => {
    let div = [];
    if (this.props.adminDetail) {
      let Container = [];
      if (this.props.adminDetail.ProfileImage != null) {
        Container.push(
          <div>
            {
              // <img
              //   style={{
              //     borderRadius: "0.1rem",
              //     width: "100%",
              //     //  cursor: "pointer",
              //   }}
              //   src={this.props.adminDetail.ProfileImage}
              //   //  onClick={this.openProfileImagePopUpModel}
              //   alt=""
              // ></img>
              <img
                className="profile-edit-image"
                src={this.props.adminDetail.ProfileImage}
                // onClick={this.openProfileImagePopUpModel}
                alt=""
              ></img>
            }
            {
              <img
                class="profile-pic-edit1"
                src="/assets/img/Ellipse 150.png"
                onClick={this.openProfileImagePopUpModel}
                alt=""
              ></img>
            }
            {
              <img
                class="profile-pic-edit"
                src="/assets/img/Vector8.svg"
                onClick={this.openProfileImagePopUpModel}
                alt=""
              ></img>
            }
          </div>
        );
      } else {
        Container.push(
          <div>
            {
              // <img
              //   style={{
              //     borderRadius: "0.1rem",
              //     width: "100%",
              //     //cursor: "pointer",
              //   }}
              //   src="/assets/img/profile_icon.png"
              //   //onClick={this.openProfileImagePopUpModel}
              //   alt=""
              // />
              <img
                className="profile-edit-image"
                src="/assets/img/profile_icon.png"
                // onClick={this.openProfileImagePopUpModel}
                alt=""
              ></img>
            }
            {
              <img
                class="profile-pic-edit1"
                src="/assets/img/Ellipse 150.png"
                onClick={this.openProfileImagePopUpModel}
                alt=""
              ></img>
            }
            {
              <img
                class="profile-pic-edit"
                src="/assets/img/Vector8.svg"
                onClick={this.openProfileImagePopUpModel}
                alt=""
              ></img>
            }
          </div>
        );
      }
      div.push(<div>{Container}</div>);
    }
    return div;
  };

  openProfileImagePopUpModel = () => {
    this.setState({ addProfileImageSubmissionModal: true });
  };
  closeProfileImagePopUpModel = () => {
    this.props.dispatch(reset("addAdminProfileImagePopUpForm"));
    this.setState({ addProfileImageSubmissionModal: false });
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
    if (this.props.adminDetail == null && nextProps.adminDetail != null) {
      this.props.initialize({
        Question: nextProps.adminDetail.Question,
        QuestionResponse0: nextProps.adminDetail.QuestionResponse0,
        QuestionResponse1: nextProps.adminDetail.QuestionResponse1,
        QuestionResponse2: nextProps.adminDetail.QuestionResponse2,
        QuestionResponse3: nextProps.adminDetail.QuestionResponse3,
        // school:nextProps.adminDetail.schoolname
      });
    }

    if (this.props.adminDetail != null) {
      if (
        this.props.adminDetail.ProfileSlug !== nextProps.adminDetail.ProfileSlug
      ) {
        // this.props.getStates(nextProps.adminDetail.countryId)
      }
      if (!(nextProps.dirty || nextProps.anyTouched)) {
        this.handelInitialValues(nextProps.adminDetail);
      }
    }
  }

  handelInitialValues = (adminObj) => {
    const internInitialObj = {
      Question: adminObj.Question,
      QuestionResponse0: adminObj.QuestionResponse0,
      QuestionResponse1: adminObj.QuestionResponse1,
      QuestionResponse2: adminObj.QuestionResponse2,
      QuestionResponse3: adminObj.QuestionResponse3,
      QuesResponseCount: adminObj.QuesResponseCount,
      filelinkdata: adminObj.filelinkdata,
      school: adminObj.schoolname,
      pronouns: adminObj.Pronouns,
      usertitle: adminObj.UserTitle,
      location: adminObj.Location,
    };
    this.props.initialize(internInitialObj);
  };
  handleDeleteSocialSite = (usersocialsiteId) => {
    this.props.deleteSocialwebsite(usersocialsiteId);
  };
  getSocialLinks = () => {
    let table = [];

    if (this.props.adminDetail.SocialLinks) {
      let children = [];
      for (let i = 0; i < this.props.adminDetail.SocialCount; i++) {
        children.push(
          <Colxx xxs="3" md="2" sm="2" lg="1">
            {
              <div class="profile-pic" >
                <a
                  href={this.props.adminDetail.SocialLinks[i].WebsiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    style={{ width: 32, height: 32 }}
                    src={this.props.adminDetail.SocialLinks[i].SocialIcon}
                    alt=""
                  ></img>{" "}
                </a>
                <div class="edit">
                  <a
                    href="JavaScript:void(0)"
                    onClick={() => {
                      if (
                        window.confirm(
                          "Are you sure you want to delete this social website?"
                        )
                      ) {
                        this.handleDeleteSocialSite(
                          this.props.adminDetail.SocialLinks[i].UserSociallinkId
                        );
                      }
                    }}
                  >
                    <i class="fa fa-times-circle-o" aria-hidden="true"></i>
                  </a>
                </div>
              </div>
            }
          </Colxx>
        );
      }
      children.push(
        <Colxx xxs="3" md="1" sm="1" lg="1">
          {
            <div>
              {/* <button
                type="buttton"
                onClick={this.showMenu}
                className="addmore_skill"
              > */}
              <i
                className="fa fa-plus-circle addmore_social"
                onClick={this.showMenu}
              ></i>
              {/* </button> */}
            </div>
          }
        </Colxx>
      );
      table.push(<Row>{children}</Row>);
    } else {
      let children = [];
      children.push(
        <Colxx xxs="3" md="1" sm="1" lg="1">
          {
            <div>
              {/* <button type="buttton" onClick={this.showMenu}> */}
              <i
                onClick={this.showMenu}
                // style={{
                //   color: "#BDBDC0",
                //   fontSize: "17px",
                //   paddingTop: "3px",
                // }}
                class="fa fa-plus-circle addmore_social"
              ></i>
              {/* </button> */}
            </div>
          }
        </Colxx>
      );
      table.push(<Row>{children}</Row>);
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
        org: this.props.currentUser.organization.id,
      };
      this.props.addAdminSocialLinks(sociallinkdata);
      this.setState({ showMenu: false });
    }
  };
  getUserSkills = () => {
    let table = [];

    if (this.props.adminDetail.UserSkills) {
      let children = [];
      for (let i = 0; i < this.props.adminDetail.SkillCount; i++) {
        children.push(
          <Colxx xxs="12" md="6" sm="6" lg="6">
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
                <span style={{ fontSize: "13px" }}>
                  {this.props.adminDetail.UserSkills[i].Skill}
                </span>
                <i
                  onClick={() => {
                    if (
                      window.confirm(
                        "Are you sure you want to delete this skill?"
                      )
                    ) {
                      this.handleDeleteSkills(
                        this.props.adminDetail.UserSkills[i].UserSkillId
                      );
                    }
                  }}
                  style={{
                    float: "right",
                    color: "white",
                    marginTop: "2px",
                    marginRight: "5px",
                    fontSize: "18px",
                    cursor: "pointer",
                  }}
                  className="fa fa-times-circle-o"
                  aria-hidden="true"
                ></i>

                {/* <div class="edit"><a onClick={() => { if (window.confirm('Are you sure you want to delete this social website?')) { this.handleDeleteSocialSite(this.props.adminDetail.SocialLinks[i].UserSociallinkId) }; }}><i class="fa fa-times-circle-o" aria-hidden="true"></i></a></div>                    */}
              </div>
            }
            <br></br>
          </Colxx>
        );
      }
      children.push(
        <Colxx xxs="6" md="5" sm="6" lg="5">
          {
            <div>
              <i
                onClick={this.openAddNewSkillsSubmissionModal}
                className="fa fa-plus-circle addmore"
              ></i>
            </div>
          }
        </Colxx>
      );
      table.push(<Row>{children}</Row>);
    } else {
      let children = [];
      children.push(
        <Colxx xxs="6" md="5" sm="6" lg="5">
          {
            <div>
              <i
                onClick={this.openAddNewSkillsSubmissionModal}
                style={{
                  color: "#BDBDC0",
                  fontSize: "25px",
                  cursor: "pointer",
                }}
                class="fa fa-plus-circle"
              ></i>
            </div>
          }
        </Colxx>
      );
      table.push(<Row>{children}</Row>);
    }
    return table;
  };
  handleDeleteSkills = (userskillId) => {
    this.props.deleteUserSkills(userskillId);
  };
  closeAddNewSkillsSubmissionModal = () => {
    this.props.dispatch(reset("adminSkillsPopupForm"));
    this.setState({ addSkillsModal: false });
  };

  openAddNewSkillsSubmissionModal = () => {
    this.setState({ addSkillsModal: true });
  };

  getUserInterests = () => {
    let table = [];

    if (this.props.adminDetail.UserInterests) {
      let children = [];
      for (let i = 0; i < this.props.adminDetail.InterestsCount; i++) {
        children.push(
          <Colxx xxs="12" md="6" sm="6" lg="6">
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
                <span style={{ fontSize: "13px" }}>
                  {this.props.adminDetail.UserInterests[i].Interests}
                </span>
                <i
                  onClick={() => {
                    if (
                      window.confirm(
                        "Are you sure you want to delete this interest?"
                      )
                    ) {
                      this.handleDeleteInterests(
                        this.props.adminDetail.UserInterests[i].UserInterestsId
                      );
                    }
                  }}
                  style={{
                    float: "right",
                    color: "white",
                    marginTop: "2px",
                    marginRight: "5px",
                    fontSize: "18px",
                    cursor: "pointer",
                  }}
                  className="fa fa-times-circle-o"
                  aria-hidden="true"
                ></i>

                {/* <div class="edit"><a onClick={() => { if (window.confirm('Are you sure you want to delete this social website?')) { this.handleDeleteSocialSite(this.props.adminDetail.SocialLinks[i].UserSociallinkId) }; }}><i class="fa fa-times-circle-o" aria-hidden="true"></i></a></div>                    */}
              </div>
            }
            <br></br>
          </Colxx>
        );
      }
      children.push(
        <Colxx xxs="6" md="5" sm="6" lg="5">
          {
            <div>
              <i
                onClick={this.openAddNewInterestsSubmissionModal}
                className="fa fa-plus-circle addmore"
              ></i>
            </div>
          }
        </Colxx>
      );
      table.push(<Row>{children}</Row>);
    } else {
      let children = [];
      children.push(
        <Colxx xxs="6" md="5" sm="6" lg="5">
          {
            <div>
              <i
                onClick={this.openAddNewInterestsSubmissionModal}
                style={{
                  color: "#BDBDC0",
                  fontSize: "25px",
                  cursor: "pointer",
                }}
                class="fa fa-plus-circle"
              ></i>
            </div>
          }
        </Colxx>
      );
      table.push(<Row>{children}</Row>);
    }
    return table;
  };
  handleDeleteInterests = (userInterestsId) => {
    this.props.deleteUserInterests(userInterestsId);
  };
  closeAddNewInterestsSubmissionModal = () => {
    this.props.dispatch(reset("AdminInterestsPopupForm"));
    this.setState({ addInterestsModal: false });
  };

  openAddNewInterestsSubmissionModal = () => {
    this.setState({ addInterestsModal: true });
  };

  interestsCallbackFunction = (childData) => {
    if (childData.length === 0) {
      NotificationManager.error(
        "Please select any Interest",
        "Error",
        3000,
        null,
        null,
        ""
      );
    } else {
      var addInterestsobj = {
        userId: this.props.currentUser.UserId,
        interestsarry: childData,
        createdby: this.props.currentUser.UserId,
        org: this.props.currentUser.organization.id,
      };
      this.props.addUserInterests(
        addInterestsobj,
        this.closeAddNewInterestsSubmissionModal
      );
    }
  };
  skillsCallbackFunction = (childData) => {
    if (childData.length === 0) {
      NotificationManager.error(
        "Please select any Interest",
        "Error",
        3000,
        null,
        null,
        ""
      );
    } else {
      var addSkillsobj = {
        userId: this.props.currentUser.UserId,
        skillsarry: childData,
        createdby: this.props.currentUser.UserId,
        org: this.props.currentUser.organization.id,
      };
      this.props.addUserSkills(
        addSkillsobj,
        this.closeAddNewSkillsSubmissionModal
      );
    }
  };
  render() {
    const { handleSubmit } = this.props;
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
        <form onSubmit={handleSubmit}>
          <Fragment>
            <Row>
              <Colxx xxs="6" md="6" sm="6">
                <Link to="/app/profile/view">
                  <h1
                    style={{
                      textAlign: "center",
                      fontWeight: 700,
                      fontSize: "24px",
                      color: "#939393",
                      marginRight: 20,
                    }}
                  >
                    Profile
                  </h1>
                </Link>
                <i class="fas fa-chevron-right"></i>{" "}
                <span
                  style={{
                    textAlign: "center",
                    fontWeight: 700,
                    fontSize: "24px",
                    color: "#282828",
                    marginLeft: 15,
                  }}
                >
                  Edit Profile
                </span>{" "}
                <span>{this.state.counter}</span>
              </Colxx>
              <Colxx xxs="6" md="6" sm="6">
                <NavLink
                  className="reset_password_link"
                  style={{ float: "right" }}
                  to="/app/profile/reset-password"
                >
                  <Button
                    outline
                    color="primary"
                    className="mb-2 reset-password"
                  >
                    <IntlMessages id="Reset Password" />
                  </Button>
                </NavLink>
              </Colxx>
            </Row>
            <Row>
              <Colxx xxs="12">
                <Separator className="mb-3" />
              </Colxx>
            </Row>
            <Row>
              <Colxx xxs="12" sm="12" md="12" lg="9">
                <div style={{ float: "right" }}>
                  <Link to="/app/profile/view" className="button delete-button">
                    <Button
                      style={{
                        padding: "0.40rem 0.60rem 0.20rem 0.60rem",
                        marginRight: "10px",
                      }}
                      color="primary"
                      outline
                      className="mb-2"
                    >
                      <IntlMessages id="Cancel" />
                    </Button>
                  </Link>

                  <Button
                    style={{
                      padding: "0.40rem 0.60rem 0.20rem 0.60rem",
                    }}
                    className="mb-2"
                    color="primary"
                    type="submit"
                  >
                    Save Changes
                  </Button>
                </div>
              </Colxx>
            </Row>

            <Row>
              <Colxx xxs="12" md="1" lg="1" sm="1"></Colxx>
              {/* <Colxx xxs="4" md="2" sm="2" lg="1"></Colxx> */}
              <Colxx xxs="4" md="2" sm="2" lg="1">
                <div style={{ display: "inline-block" }}>
                  {this.getCurrentUserImage()}
                </div>
              </Colxx>
              <Colxx xxs="8" sm="6" md="6" lg="6" style={{ marginTop: "3%" }}>
                <span
                  style={{
                    fontWeight: "bold",
                    fontSize: "1.5rem",
                    marginLeft: 35,
                  }}
                >
                  {" "}
                  {this.props.currentUser.FirstName +
                    " " +
                    this.props.currentUser.LastName}
                </span>
                <h6 style={{ fontSize: "14px" }}>{headingPronounsValue}</h6>
                <span
                  style={{
                    fontSize: "14px",
                    fontWeight: "bold",
                    marginLeft: 35,
                  }}
                >
                  {this.props.currentUser.departmentname}
                </span>
              </Colxx>
            </Row>
            <br></br>
            <Row>
              <Colxx xxs="12" md="1" lg="1" sm="1"></Colxx>
              <Colxx xxs="12" md="10" lg="6" sm="10">
                <p style={{ fontWeight: 700, fontSize: 20, marginTop: 48 }}>
                  Position Title
                </p>
                <Field
                  ref="usertitle"
                  name="usertitle"
                  type="text"
                  className="new-form"
                  component={renderTextField}
                  placeholder="Ex. Marketing Intern , Project Manager"
                />
                <br></br>
                <br></br>
                <p style={{ fontWeight: 700, fontSize: 20 }}>Pronouns</p>
                <Field
                  name="pronouns"
                  component={renderTextField}
                  type="text"
                  className="new-form"
                  placeholder="Ex. They/them/theirs"
                />
                <br></br>
                <br></br>
                <p style={{ fontWeight: 700, fontSize: 20 }}>
                  Current Location
                </p>
                <Field
                  name="location"
                  component={renderTextField}
                  type="text"
                  className="new-form"
                  placeholder="Ex. San Francisco, CA"
                />
                <br></br>
                <br></br>
                <p style={{ fontWeight: 700, fontSize: 20 }}>School</p>
                <Field
                  ref="school"
                  name="school"
                  type="text"
                  className="new-form"
                  component={renderTextField}
                  placeholder=" School Name"
                />

                <div className="sepratorr" />
                <p style={{ fontWeight: 700, fontSize: 20 }}>My Skills</p>
                {/* <input type="text" className="new-form" placeholder=" Enter Your Skills"/> */}
                <div className="ddown">{this.getUserSkills()}</div>
                <div className="sepratorr" />
                <p style={{ fontWeight: 700, fontSize: 20 }}>My Interests</p>
                <div className="ddown">{this.getUserInterests()}</div>
                <div className="sepratorr" />

                <p style={{ fontWeight: 700, fontSize: 20 }}>Get to know me!</p>
                {this.props.adminDetail.QuesCount > 0 ? (
                  this.props.adminDetail.Question.map((Question, key) => {
                    return (
                      <div>
                        <Accordion style={{ marginBottom: 24 }}>
                          <AccordionSummary
                            expandIcon={
                              <ExpandMoreIcon style={{ marginTop: -5 }} />
                            }
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                            name={Question.Id}
                            style={{
                              fontWeight: "bold",
                              marginTop: "15px",
                              marginTop: 2,
                              fontSize: 16,
                            }}
                            id={Question.Id}
                          >
                            {Question.question}
                          </AccordionSummary>

                          <AccordionDetails className="MuiAccordionDetails-root">
                            <Field
                              name={"QuestionResponse" + key}
                              onClick={this.handleChange}
                              component={renderTextArea}
                              type="text"
                              className="questi"
                              placeholder=" Enter response here"
                            />
                          </AccordionDetails>
                        </Accordion>
                      </div>
                    );
                  })
                ) : (
                  <tr className="no-record-found">
                    <td>No Record Found</td>
                  </tr>
                )}

                <div className="sepratorr" />
                <p style={{ fontWeight: "bold", fontSize: 20 }}>
                  Add up to 3 social media links
                </p>
                {this.getSocialLinks()}
                <br></br><br></br>
                {this.state.showMenu ? (
                  <div style={{ marginTop: -43 }}>
                    {/* <span>Select one of the following social media </span> */}
                    <select
                      style={{
                        marginTop: 36,
                        marginBottom: 16,
                        padding: "20px 24px",
                      }}
                      name="social_sites"
                      className="new-form"
                      onChange={this.change}
                      value={this.state.value}
                      required="required"
                    >
                      <option>Select Social Site ...</option>
                      {oOptions}
                    </select>
                    <br></br>
                    {/* <span>Please share your URL here</span> */}
                    <input
                      style={{ marginTop: 24, padding: "20px 24px" }}
                      type="text"
                      className="new-form"
                      onChange={this.handleWebsiteChange}
                      placeholder="For example, https://facebook.com/yourfacebook"
                    />
                    <br></br>
                    <br></br>
                    <br></br>
                    <div >
                      <Button
                        style={{
                          margin: "0 10px",
                          padding: "0.40rem 0.90rem 0.30rem 0.90rem",
                          float: "right",
                        }}
                        onClick={this.handleSocialClick}
                        color="primary"
                        className="mb-2"
                      >
                        Add
                      </Button>
                      <Button
                        style={{
                          padding: "0.40rem 0.60rem 0.20rem 0.60rem",
                          float: "right",
                        }}
                        type="button"
                        outline
                        className="mb-2"
                        color="primary"
                        onClick={this.HandleCancleClick}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : null}
              </Colxx>
            {/* </Row>
            <br></br><br></br>
            {/* {!this.state.showMenu ? ( */}
              {/* <Row> */}
                <Colxx xxs="12" sm="12" md="12" lg="9">
                  <div style={{ float: "right", marginTop: 20, marginBottom:20 }}>
                    <Link
                      to="/app/profile/view"
                      className="button delete-button"
                    >
                      <Button
                        style={{
                          padding: "0.40rem 0.60rem 0.20rem 0.60rem",
                          marginRight: "10px",
                        }}
                        color="primary"
                        outline
                        className="mb-2"
                      >
                        <IntlMessages id="Cancel" />
                      </Button>
                    </Link>

                    <Button
                      style={{
                        padding: "0.40rem 0.60rem 0.20rem 0.60rem",
                      }}
                      className="mb-2"
                      color="primary"
                      type="submit"
                    >
                      Save Changes
                    </Button>
                  </div>
                </Colxx>
              </Row>
            {/* ) : null} */}
          </Fragment>
        </form>
        <AddAdminProfileImagePopUpForm
          onSubmit={this.submit}
          dispatch={this.props.dispatch}
          onRequestClose={this.closeProfileImagePopUpModel}
          modalStatus={this.state.addProfileImageSubmissionModal}
          currentUser={this.props.currentUser}
        />
        <AdminSkillsPopupForm
          parentSkillsCallback={this.skillsCallbackFunction}
          dispatch={this.props.dispatch}
          onRequestClose={this.closeAddNewSkillsSubmissionModal}
          modalStatus={this.state.addSkillsModal}
          currentUser={this.props.currentUser}
        />
        <AdminInterestsPopupForm
          parentCallback={this.interestsCallbackFunction}
          dispatch={this.props.dispatch}
          onRequestClose={this.closeAddNewInterestsSubmissionModal}
          modalStatus={this.state.addInterestsModal}
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
  // phone_number: {
  //     fields: ['mobile', 'workContact']
  // }
};

AdminEditProfileForm = reduxForm({
  form: "AdminEditProfileForm", // a unique identifier for this form
  validate: (values) => {
    return validate(values, validations);
  },
})(AdminEditProfileForm);
//const selector = formValueSelector("AdminEditProfileForm"); // <-- same as form name

const mapStateToProps = (state) => {
  return {
    // fileType: selector(state, 'Type'),
    currentUser: state.userReducer.currentUser,
    adminDetail: state.organizationReducer.adminDetail,
    socialNetworksList: state.masterReducer.socialNetworksList,
    socialNetworksCount: state.masterReducer.socialNetworksCount,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getSocialnetworks: () => {
      dispatch(getSocialnetworks());
    },
    getAdminProfile: (organizationId, adminId) => {
      dispatch(getAdminProfile(organizationId, adminId));
    },
    addAdminSocialLinks: (params, callback) => {
      dispatch(addAdminSocialLinks(params, callback));
    },
    deleteSocialwebsite: (usersocialId) => {
      dispatch(deleteSocialwebsite(usersocialId));
    },
    deleteUserSkills: (userskillId) => {
      dispatch(deleteUserSkills(userskillId));
    },
    deleteUserInterests: (userinterestId) => {
      dispatch(deleteUserInterests(userinterestId));
    },
    addUserInterests: (params, callback) => {
      dispatch(addUserInterests(params, callback));
    },
    addUserSkills: (params, callback) => {
      dispatch(addUserSkills(params, callback));
    },
    dispatch: dispatch,
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminEditProfileForm);
