import React, { Component, Fragment } from "react";
// import { injectIntl } from "react-intl";
import { Row } from "reactstrap";
import { Colxx, Separator } from "../../../components/common/CustomBootstrap";
// import $ from "jquery";
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
//import { NavLink } from "react-router-dom";
import IntlMessages from "../../../helpers/IntlMessages";
// import { getInternList } from '../../../action/community/community';
import { connect } from "react-redux";
// import * as constants from "../../../utils/constants";
// import { Route, Link } from "react-router-dom";
// import RequestFeedbackPopupForm from '../feedback/requestFeedbackPopupForm';
import {
  Field,
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
  deleteUserInterests,
  addInternInterests,
  addInternSkills,
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

import { NotificationManager } from "../../../components/common/react-notifications";
import { getSocialnetworks } from "../../../action/master/masterData";
import InternSkillsPopupForm from "./internSkillsPopupForm";
import AddInternProfileImagePopUpForm from "./addInternProfileImagePopUpForm";
import InternInterestsPopupForm from "./internInterestsPopupForm";
/* eslint-disable */

const adaptFileEventToValue = (delegate) => (e) => delegate(e.target.files[0]);

const FileInput = ({
  input: { value: omitValue, onChange, onBlur, ...inputProps },
  meta: omitMeta,
  ...props
}) => {
  return (
    <input
      onChange={adaptFileEventToValue(onChange)}
      onBlur={adaptFileEventToValue(onBlur)}
      type="file"
      {...props.input}
      {...props}
    />
  );
};
class InternEditProfileForm extends Component {
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
      // showResumeUpload: false,
      addProfileImageSubmissionModal: false,
      addSkillsModal: false,
      addInterestsModal: false,
    };

    //this.showMenu = this.showMenu.bind(this);
    // $(document).ready(function () {
    //   $("#btn-example-file-reset").on("click", function () {
    //     $("#example-file").val("");
    //   });
    // });
    this.showMenu = this.showMenu.bind(this);
    // this.showResumeUpload = this.showResumeUpload.bind(this);
    let options = this.state.options;
  }

  showMenu(event) {
    event.preventDefault();
    this.setState({ showMenu: true });
  }
  // showResumeUpload(event) {
  //   // console.log(event.name);
  //   // // event.preventDefault();
  //   // this.setState({ showResumeUpload: true });
  //   var file = document.querySelector("#example-file");
  //   if (/\.(pdf|docx|doc)$/i.test(file.files[0].name) === false) {
  //     alert("Please Upload Pdf or docx file");
  //     this.setState({ showResumeUpload: false });
  //   } else {
  //     this.setState({ showResumeUpload: true });
  //   }
  // }
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
  handleRemoveFile = (userId) => {
    this.props.removeUploadFile(userId, this.props.currentUser.organization.id);
  };
  // HandleCancleResumeClick = () => {
  //   this.setState({
  //     showResumeUpload: false,
  //   });
  //   $("#example-file").val("");
  // };
  submit = (values) => {
    // console.log(values.skills_array)
    // alert(values.skills_array)
    // values.createdby = this.props.currentUser.UserId
  };
  getCurrentUserImage = () => {
    let div = [];
    if (this.props.internDetail) {
      let Container = [];
      if (this.props.internDetail.ProfileImage != null) {
        Container.push(
          <div>
            {
              // <img
              //   style={{
              //     borderRadius: "0.1rem",
              //     width: "100%",
              //     //  cursor: "pointer",
              //   }}
              //   src={this.props.internDetail.ProfileImage}
              //   //  onClick={this.openProfileImagePopUpModel}
              //   alt=""
              // ></img>
              <img
                className="profile-edit-image"
                src={this.props.internDetail.ProfileImage}
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
    this.props.dispatch(reset("addInternProfileImagePopUpForm"));
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

  //   getResume = () => {
  //     let div = [];
  //     // if (this.state.isEditForm) {
  //     if (this.props.internDetail) {
  //       let Container = [];
  //       let Row1 = [];
  //       if (this.props.internDetail.ResumeUrl != null) {
  //         //get resume name from string
  //         var ResumeHeading = this.props.internDetail.ResumeUrl.substring(
  //           this.props.internDetail.ResumeUrl.lastIndexOf("/") + 1,
  //           this.props.internDetail.ResumeUrl.length
  //         );

  //         Row1.push(
  //           <div>
  //             {
  //               <div
  //                 style={{ backgroundColor: "#F2F2F4" }}
  //                 className="form-control"
  //               >
  //                 <a
  //                   style={{ cursor: "pointer" }}
  //                   href={this.props.internDetail.ResumeUrl}
  //                   target="_blank"
  //                   rel="noopener noreferrer"
  //                 >
  //                   <i style={{ fontSize: "20px" }} class="iconsminds-file"></i>
  //                   <span
  //                     style={{
  //                       fontWeight: "bold",
  //                       fontSize: "18px",
  //                       marginLeft: "10px",
  //                     }}
  //                   >
  //                     {ResumeHeading}
  //                   </span>
  //                 </a>
  //                 <img
  //                   className="remove-File"
  //                   style={{ cursor: "pointer" }}
  //                   src="/assets/img/cross.png"
  //                   alt=""
  //                   onClick={() => {
  //                     if (
  //                       window.confirm(
  //                         "Are you sure you want to delete this file?"
  //                       )
  //                     ) {
  //                       this.handleRemoveFile(this.props.internDetail.UserId);
  //                     }
  //                   }}
  //                 />
  //               </div>
  //             }
  //           </div>
  //         );
  //       } else {
  //         Row1.push(<div>{<label> </label>}</div>);
  //       }
  //       Container.push(<div>{Row1}</div>);
  //       div.push(<div>{Container}</div>);
  //     }
  //     return div;
  // };
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.props.internDetail == null && nextProps.internDetail != null) {
      this.props.initialize({
        Question: nextProps.internDetail.Question,
        QuestionResponse0: nextProps.internDetail.QuestionResponse0,
        QuestionResponse1: nextProps.internDetail.QuestionResponse1,
        QuestionResponse2: nextProps.internDetail.QuestionResponse2,
        QuestionResponse3: nextProps.internDetail.QuestionResponse3,
        Type: "File",
      });
    }

    if (this.props.internDetail != null) {
      if (
        this.props.internDetail.ProfileSlug !==
        nextProps.internDetail.ProfileSlug
      ) {
        // this.props.getStates(nextProps.adminDetail.countryId)
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
      filelinkdata: internObj.filelinkdata,
      school: internObj.schoolname,
      pronouns: internObj.Pronouns,
      usertitle: internObj.UserTitle,
      location: internObj.Location,
      Type: "File",
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
          <Colxx xxs="3" md="2" sm="2" lg="1">
            {
              <div class="profile-pic">
                <a
                  href={this.props.internDetail.SocialLinks[i].WebsiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    style={{ width: 32, height: 32 }}
                    src={this.props.internDetail.SocialLinks[i].SocialIcon}
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
                          this.props.internDetail.SocialLinks[i]
                            .UserSociallinkId
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
      this.props.addInternSocialLinks(sociallinkdata);
      this.setState({ showMenu: false });
    }
  };
  getUserSkills = () => {
    let table = [];
    if (this.props.internDetail.UserSkills) {
      let children = [];
      for (let i = 0; i < this.props.internDetail.SkillCount; i++) {
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
                  {this.props.internDetail.UserSkills[i].Skill}
                </span>
                <i
                  onClick={() => {
                    if (
                      window.confirm(
                        "Are you sure you want to delete this skill?"
                      )
                    ) {
                      this.handleDeleteSkills(
                        this.props.internDetail.UserSkills[i].UserSkillId
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
    this.props.dispatch(reset("internSkillsPopupForm"));
    this.setState({ addSkillsModal: false });
  };

  openAddNewSkillsSubmissionModal = () => {
    this.setState({ addSkillsModal: true });
  };

  getUserInterests = () => {
    let table = [];
    if (this.props.internDetail.UserInterests) {
      let children = [];
      for (let i = 0; i < this.props.internDetail.InterestsCount; i++) {
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
                  {this.props.internDetail.UserInterests[i].Interests}
                </span>
                <i
                  onClick={() => {
                    if (
                      window.confirm(
                        "Are you sure you want to delete this interest?"
                      )
                    ) {
                      this.handleDeleteInterests(
                        this.props.internDetail.UserInterests[i].UserInterestsId
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
    this.props.dispatch(reset("internInterestsPopupForm"));
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
      this.props.addInternInterests(
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
      this.props.addInternSkills(
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
                <Link to="/internapp/profile/view">
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
                </Link>{" "}
                <i class="fas fa-chevron-right"></i>{" "}
                <span
                  style={{
                    textAlign: "center",
                    fontWeight: 700,
                    fontSize: "24px",
                    color: "#282828",
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
                  to="/internapp/profile/reset-password"
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
                  {/* {this.state.isEditForm && !this.state.isEditMode && ( */}
                  <Link
                    to="/internapp/profile/view"
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

            <Row>
              <Colxx xxs="12" md="1" lg="1" sm="1"></Colxx>
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
              <Colxx xxs="12" md="10" lg="6" sm="6">
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
                {this.props.internDetail.QuesCount > 0 ? (
                  this.props.internDetail.Question.map((Question, key) => {
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
                            }}
                            id={Question.Id}
                            id={`toggler${key}`}
                          >
                            {Question.question}
                            {/* <i
                            style={{ float: "right" }}
                            class="fas fa-chevron-down"
                          ></i> */}
                          </AccordionSummary>

                          <AccordionDetails toggler={`toggler${key}`}>
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
                <br></br>
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
                      className="new-form "
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
                    <div>
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
                        outline
                        type="button"
                        className="mb-2"
                        color="primary"
                        onClick={this.HandleCancleClick}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : null}
                {/* <div className="sepratorr" />
                <p style={{ fontWeight: "bold" }}>Resume</p>
                <div style={{ float: "right" }}>
                  {this.state.showResumeUpload ? (
                    <div>
                      <Button
                        style={{
                          margin: "0 10px",
                          padding: "0.40rem 0.60rem 0.20rem 0.60rem",
                        }}
                        type="submit"
                        onSubmit={this.submit}
                        outline
                        className="mb-2"
                        color="info"
                      >
                        Upload
                      </Button>
                      <Button
                        style={{
                          margin: "0 10px",
                          padding: "0.40rem 0.60rem 0.20rem 0.60rem",
                        }}
                        type="button"
                        onClick={this.HandleCancleResumeClick}
                        outline
                        className="mb-2"
                        color="danger"
                      >
                        Cancel
                      </Button>
                    </div>
                  ) : null}
                </div>
                <div className="input-box-single">
                  <Field
                    name="fileResumedata"
                    id="example-file"
                    onChange={this.showResumeUpload}
                    className="form-control"
                    component={FileInput}
                  />
                  <br></br>
                  {this.getResume()}
                </div>
              */}
              </Colxx>
              {/* </Row>
            {/* <br></br>
            <br></br> */}

              {/* {!this.state.showMenu ? (
              <Row> */}
              <Colxx xxs="12" sm="12" md="12" lg="9">
                <div
                  style={{ float: "right", marginTop: 20, marginBottom: 20 }}
                >
                  <Link
                    to="/internapp/profile/view"
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
        <AddInternProfileImagePopUpForm
          onSubmit={this.submit}
          dispatch={this.props.dispatch}
          onRequestClose={this.closeProfileImagePopUpModel}
          modalStatus={this.state.addProfileImageSubmissionModal}
          currentUser={this.props.currentUser}
        />
        <InternSkillsPopupForm
          parentSkillsCallback={this.skillsCallbackFunction}
          dispatch={this.props.dispatch}
          onRequestClose={this.closeAddNewSkillsSubmissionModal}
          modalStatus={this.state.addSkillsModal}
          currentUser={this.props.currentUser}
        />
        <InternInterestsPopupForm
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

InternEditProfileForm = reduxForm({
  form: "InternEditProfileForm", // a unique identifier for this form
  validate: (values) => {
    return validate(values, validations);
  },
})(InternEditProfileForm);
//const selector = formValueSelector("InternEditProfileForm"); // <-- same as form name

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
    removeUploadFile: (userId, orgId) => {
      dispatch(removeUploadFile(userId, orgId));
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
    deleteUserInterests: (userinterestId) => {
      dispatch(deleteUserInterests(userinterestId));
    },
    addInternInterests: (params, callback) => {
      dispatch(addInternInterests(params, callback));
    },
    addInternSkills: (params, callback) => {
      dispatch(addInternSkills(params, callback));
    },
    dispatch: dispatch,
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InternEditProfileForm);
