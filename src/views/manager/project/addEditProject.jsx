import React, { Component, Fragment } from "react";
import {
  Row,
  Card,
  CardBody,
  Button,
  // CardTitle,
  // CardSubtitle,
  CardImg,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
  // CardText,
  Progress,
} from "reactstrap";
import cn from "classnames";
// import { NavLink } from "react-router-dom";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import { formatDateTime } from "../../../utils/globalFunctions";
// import classnames from "classnames";

import { Colxx, Separator } from "../../../components/common/CustomBootstrap";
// import IntlMessages from "../../../helpers/IntlMessages";
import {
  Field,
  reduxForm,
  // FieldArray,
  // formValueSelector,
  reset,
} from "redux-form";

import { connect } from "react-redux";
// import ReactPlayer from "react-player";
// import {
//   getEngageVideoList,
//   updateEngageVideodetail,
// } from "../../../action/engage/engage";
// import { getCategoryList } from "../../../action/organizations/organization";
import { Link } from "react-router-dom";
import InternAssignPopUpForm from "./internAssignPopUpForm";
import ResourcesAssignPopUpForm from "./resourcesAssignPopUpForm";
import EditResourceAssignPopUpForm from "./editResourceAssignPopUpForm";
import BessieCooperPopUpForm from "./bessieCooperPopUpForm";
import {
  renderTextField,
  renderTextArea,
  renderDateField,
  validate,
  // renderSelectField,
  // ComboField,
  // renderMultiSelectField,
  // fileInput,
} from "../../util/form-fields";
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-datepicker/dist/react-datepicker.css";
import axiosInstance from "../../../utils/axiosApi";
// import _ from "lodash";
import { getAPIURL } from "../../../utils/getApiUrl";
import * as constants from "../../../utils/constants";
import {
  getAssignedInternList,
  deleteIntern,
  addProjectResources,
  getProjectDocumentsList,
  deleteResource,
  updateProjectResource,
  internProjectSubmissionListForManager,
  addManagerProjectTask,
  getManagerProjectTaskList,
  updateManagerProjectTask,
  deleteProjectTask,
} from "../../../action/projects/projects";
import {
  getcompletedInternProjectTaskList,
  getInternProjectSubmissionList,
} from "../../../action/admin/admin";
import AddManagerProjectTaskPopUpForm from "./addManagerProjectTaskPopUpForm";
import EditManagerProjectTaskPopUpForm from "./editManagerProjectTaskPopUpForm";
import createBrowserHistory from "history/createBrowserHistory";
/* eslint-disable */
const browserHistory = createBrowserHistory();

class addEditProjectForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addInternModal: false,
      addResourcesModal: false,
      editResourcesModal: false,
      addProjectTaskModal: false,
      editProjectTaskModal: false,
      addbessieModal: false,
      isEditMode: false,
      isEditForm: false,
      isNewForm: false,
      currentResource: {},
      currentTask: {},
      currentId: null,
      sort_dir: null,
      sort_type: null,
      indexClick: [],
      selectUserName: "",
    };
  }

  componentDidMount() {
    this.props.getAssignedInternList({
      orgid: this.props.currentUser.organization.id,
      // limit_size: constants.DEFAULT_LIMIT_SIZE,
      // limit_start: 0,
      projectid: this.props.projectId,
      user_id: this.props.currentUser.UserId,
    });
    this.props.getProjectDocumentsList({
      orgid: this.props.currentUser.organization.id,
      // limit_size: constants.DEFAULT_LIMIT_SIZE,
      // limit_start: 0,
      projectid: this.props.projectId,
    });
    this.props.internProjectSubmissionListForManager({
      orgid: this.props.currentUser.organization.id,
      projectid: this.props.projectId,
    });
    this.props.getManagerProjectTaskList({
      orgid: this.props.currentUser.organization.id,
      projectid: this.props.projectId,
      userid: this.props.currentUser.UserId,
    });
    var data = {
      params: {
        orgid: this.props.currentUser.organization.id,
      },
    };
    var queryObj = {
      orgid: this.props.currentUser.organization.id,
      user_id: this.props.currentUser.UserId,
      projectid: this.props.projectId,
      search_text: this.state.searchText,
      sort_dir: this.state.sort_dir,
      sort_type: this.state.sort_type,
    };
    this.props.getAssignedInternList(queryObj);

    axiosInstance
      .get(
        getAPIURL(constants.PROJECT_DETAILS_URL, {
          ":id": this.props.projectId,
        }),
        data
      )
      .then((response) => {
        this.handelInitialValues(response.data);
        this.setState({ project: response.data });
        this.setState({ isEditForm: true, isNewForm: false });
      })
      .catch((error) => {
        browserHistory.push("/unauthorizedpage");
        window.location.reload(false);
      });
  }
  openAddNewProjectTaskSubmissionModal = () => {
    this.setState({ addProjectTaskModal: true });
  };
  closeProjectTaskSubmissionModal = () => {
    this.props.dispatch(reset("addManagerProjectTaskPopUpForm"));
    this.setState({ addProjectTaskModal: false });
  };
  openAddNewInternSubmissionModal = () => {
    this.setState({ addInternModal: true });
  };
  openAddNewResourcesSubmissionModal = () => {
    this.setState({ addResourcesModal: true });
  };
  openShowbessiecooperSubmissionModal = (userid, username) => {
    this.setState({
      addbessieModal: true,
      currentId: userid,
      selectUserName: username,
    });
    this.props.getcompletedInternProjectTaskList({
      orgid: this.props.currentUser.organization.id,
      projectid: this.props.projectId,
      userid: userid,
    });
    this.props.getInternProjectSubmissionList({
      orgid: this.props.currentUser.organization.id,
      projectid: this.props.projectId,
      userid: userid,
    });
  };

  closeInternSubmissionModal = () => {
    this.props.dispatch(reset("internAssignPopUpForm"));
    this.setState({ addInternModal: false });
  };
  closeResourcesSubmissionModal = () => {
    this.props.dispatch(reset("resourcesAssignPopUpForm"));
    this.setState({ addResourcesModal: false });
  };
  closebessiecooperSubmissionModal = () => {
    this.props.dispatch(reset("bessiecooperPopUpForm"));
    this.setState({ addbessieModal: false });
  };

  handelInitialValues = (projectObj) => {
    const projectInitialObj = {
      name: projectObj.name,
      description: projectObj.description,
      duedate: projectObj.duedate,
    };
    this.props.initialize(projectInitialObj);
  };
  handleYourProjectTextSearchChange = (event) => {
    this.setState({ searchText: event.target.value }, function () {
      this.props.getAssignedInternList({
        orgid: this.props.currentUser.organization.id,
        user_id: this.props.currentUser.UserId,
        projectid: this.props.projectId,
        search_text: this.state.searchText,
        sort_dir: this.state.sort_dir,
        sort_type: this.state.sort_type,
      });
    });
  };

  handleView = (index) => {
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

  renderSelectedInterns = () => {
    let table = [];
    let status;
    // var value1=this.props.assignedInternList[i].interncompletedProjectTaskCount;
    var value2 = this.props.ProjectTaskCount;
    if (this.props.assignedInternList) {
      if (this.props.assignedInternsCount > 0) {
        let Title = [];
        let image;
        let detail;
        for (let i = 0; i < this.props.assignedInternsCount; i++) {
          if (this.props.assignedInternList[i].status === "In Progress") {
            status = "#FFA705";
          }

          if (this.props.assignedInternList[i].status === "Completed") {
            status = "#46BFA5";
          }
          if (this.props.assignedInternList[i].status === "Stuck") {
            status = "#E01A4F";
          }
          if (this.props.assignedInternList[i].ProfileImage === "") {
            image = (
              <CardImg
                top
                src="/assets/img/profile_icon.png"
                alt="Card image cap"
                className="img-thumbnail border-0 rounded-circle mb-1 list-thumbnail intern-assign-img"
              />
            );
          }
          if (this.props.assignedInternList[i].ProfileImage == null) {
            image = (
              <CardImg
                top
                src="/assets/img/profile_icon.png"
                alt="Card image cap"
                className="img-thumbnail border-0 rounded-circle mb-1 list-thumbnail intern-assign-img"
              />
            );
          } else {
            image = (
              <CardImg
                top
                src={this.props.assignedInternList[i].ProfileImage}
                alt="Card image cap"
                className="img-thumbnail border-0 rounded-circle mb-1 list-thumbnail intern-assign-img"
              />
            );
          }
          if (this.props.ProjectTaskCount === 0) {
            detail = <p className="notaskcompleted">No task yet</p>;
          } else {
            detail = (
              <Row>
                <Colxx lg="4" sm="3" md="12" style={{ marginTop: "14px" }}>
                  <span style={{ fontWeight: "bold" }}>
                    {
                      this.props.assignedInternList[i]
                        .interncompletedProjectTaskCount
                    }
                  </span>{" "}
                  / {this.props.ProjectTaskCount}
                </Colxx>
                <Colxx lg="4" sm="6" md="6">
                  {" "}
                  <Progress
                    ClassName="hidee"
                    style={{ marginTop: "20px" }}
                    value={
                      value2 !== 0
                        ? (this.props.assignedInternList[i]
                            .interncompletedProjectTaskCount /
                            value2) *
                          100
                        : 0
                    }
                  />
                </Colxx>

                <Colxx lg="4" md="12" sm="12" xxs="12">
                  <Accordion
                    className="MuiPaper-elevation0"
                    // onClick={() =>
                    //   this.openAccordionTask(
                    //     this.props.assignedInternList[i].UserId
                    //   )}
                  >
                    <AccordionSummary
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <span
                        Class="textcenter"
                        style={{ color: "#17B298", marginTop: "-15" }}
                      >
                        <span onClick={() => this.handleView(i)}>
                          {this.state.indexClick.includes(i) ? "Hide" : "View"}
                        </span>
                      </span>
                    </AccordionSummary>

                    <AccordionDetails className="accordionmargin">
                      <div>
                        <PerfectScrollbar
                          options={{
                            suppressScrollX: true,
                            wheelPropagation: false,
                          }}
                        >
                          {this.props.assignedInternList[i]
                            .interncompletedProjectTaskCount > 0 ? (
                            this.props.assignedInternList[
                              i
                            ].interncompletedProjectTaskList.map(
                              (task, index) => {
                                return (
                                  <div
                                    key={index}
                                    className=" flex-row mb-3 pb-1 border-bottom"
                                  >
                                    <Row>
                                      <Colxx xxs="12" sm="12" md="12">
                                        <div style={{ width: "230px" }}>
                                          <a
                                            href="#"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                          >
                                            <i className="ffas fa-check-circle"></i>{" "}
                                            {task.Name}
                                          </a>
                                        </div>
                                      </Colxx>
                                    </Row>
                                  </div>
                                );
                              }
                            )
                          ) : (
                            <div style={{ width: "230px" }}>
                              No Tasks Completed
                            </div>
                          )}
                        </PerfectScrollbar>
                      </div>
                    </AccordionDetails>
                  </Accordion>
                </Colxx>
              </Row>
            );
          }

          Title.push(
            <Colxx xxs="12">
              <Row style={{ borderBottom: "1px solid #d7d7d7" }}>
                <Colxx lg="2" style={{ marginTop: "8px", textAlign: "center" }}>
                  <Row>
                    <Colxx
                      lg="3"
                      md="12"
                      sm="12"
                      xxs="12"
                      style={{ marginTop: "2px" }}
                    >
                      {image}
                    </Colxx>
                    <Colxx lg="9" md="12" sm="12" xxs="12" className="maargin">
                      {this.props.assignedInternList[i].Name}
                    </Colxx>
                    <Colxx lg="1" style={{ marginTop: "5px" }}>
                      <UncontrolledDropdown>
                        <DropdownToggle
                          style={{
                            backgroundColor: "white",
                            color: "grey",
                            borderColor: "white",
                          }}
                          className="threedot"
                        >
                          <i
                            class="fa fa-ellipsis-v"
                            aria-hidden="true"
                            style={{ fontSize: "20px", marginTop: -5 }}
                          ></i>
                        </DropdownToggle>
                        <DropdownMenu>
                          <DropdownItem
                            style={{ outline: "none" }}
                            className="myLink"
                            href="JavaScript:void(0)"
                            onClick={() => {
                              if (
                                window.confirm(
                                  "Are you sure you want to remove this user?"
                                )
                              ) {
                                this.handleRemoveIntern(
                                  this.props.assignedInternList[i]
                                    .ProjectAssignmentId
                                );
                              }
                            }}
                          >
                            <i className="fab fa-user-times" />
                            Unassign User
                          </DropdownItem>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    </Colxx>
                  </Row>
                </Colxx>

                <Colxx
                  lg="2"
                  md="12"
                  sm="12"
                  xxs="12"
                  style={{ marginTop: "8px", textAlign: "center" }}
                >
                  <div
                    style={{
                      // borderColor: "#ffffff00",
                      color: status,
                      marginTop: "2px",
                      padding: "6px 0px",
                      // borderRadius: "25px",
                      // color: "white",
                    }}
                  >
                    {this.props.assignedInternList[i].status}
                  </div>
                </Colxx>

                <Colxx
                  lg="3"
                  md="12"
                  sm="12"
                  xxs="12"
                  style={{ textAlign: "center" }}
                >
                  {detail}
                </Colxx>

                <Colxx
                  lg="2"
                  md="12"
                  sm="12"
                  xxs="12"
                  style={{ marginTop: "14px", textAlign: "center" }}
                  onClick={() =>
                    this.openShowbessiecooperSubmissionModal(
                      this.props.assignedInternList[i].UserId,
                      this.props.assignedInternList[i].Name
                    )
                  }
                >
                  <p>
                    {" "}
                    <span>
                      {
                        this.props.assignedInternList[i]
                          .internProjectdocumentCount
                      }
                    </span>
                  </p>
                </Colxx>

                <Colxx
                  lg="2"
                  md="12"
                  sm="12"
                  xxs="12"
                  className="notaskcompleted"
                >
                  {this.props.assignedInternList[i].LastSubmissionDate ===
                  null ? (
                    <span>Not Submitted Yet</span>
                  ) : (
                    <span>
                      {formatDateTime(
                        this.props.assignedInternList[i].LastSubmissionDate
                      )}
                    </span>
                  )}
                </Colxx>

                <Colxx lg="1" style={{ marginTop: "5px" }}>
                  <UncontrolledDropdown>
                    <DropdownToggle
                      style={{
                        backgroundColor: "white",
                        color: "grey",
                        borderColor: "white",
                      }}
                      className="threeedot"
                    >
                      <i
                        class="fa fa-ellipsis-v"
                        aria-hidden="true"
                        style={{ fontSize: "20px", marginTop: -5 }}
                      ></i>
                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem
                        style={{ outline: "none" }}
                        className="myLink"
                        href="JavaScript:void(0)"
                        onClick={() => {
                          if (
                            window.confirm(
                              "Are you sure you want to remove this user?"
                            )
                          ) {
                            this.handleRemoveIntern(
                              this.props.assignedInternList[i]
                                .ProjectAssignmentId
                            );
                          }
                        }}
                      >
                        <i className="fab fa-user-times" />
                        Unassign User
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </Colxx>
              </Row>
            </Colxx>
          );
        }
        table.push(<Row>{Title}</Row>);
      }
    }
    return table;
  };

  handleRemoveIntern = (projectAssignmentId) => {
    this.props.deleteIntern(projectAssignmentId);
  };
  submitResources = (values) => {
    values.createdby = this.props.currentUser.UserId;
    if (values.filelinkdata === undefined) {
      values.Type = "";
    } else {
      values.Type = "File";
    }
    this.props.addProjectResources(
      this.props.projectId,
      this.props.currentUser.organization.id,
      values,
      this.closeResourcesSubmissionModal
    );
  };
  submitUpdateResource = (values) => {
    values.createby = this.props.currentUser.UserId;
    if (values.filelinkdata === undefined) {
      values.Type = "";
    } else {
      values.Type = "File";
    }
    this.props.updateProjectResource(
      this.props.projectId,
      this.props.currentUser.organization.id,
      values,
      this.closeEditResourceSubmissionModal
    );
  };
  handleRemoveResource = (recourceid) => {
    this.props.deleteResource(recourceid);
  };
  handleEditResources = (documentObj) => {
    this.setState({ editResourcesModal: true, currentResource: documentObj });
  };
  closeEditResourceSubmissionModal = () => {
    this.props.dispatch(reset("editResourcesAssignPopUpForm"));
    this.setState({ editResourcesModal: false });
  };
  submitProjectTask = (values) => {
    values.createdby = this.props.currentUser.UserId;
    this.props.addManagerProjectTask(
      this.props.projectId,
      this.props.currentUser.organization.id,
      values,
      this.closeProjectTaskSubmissionModal
    );
  };
  showProjectcooper = () => {
    this.closebessiecooperSubmissionModal;
  };
  handleEditTask = (taskObj) => {
    this.setState({ editProjectTaskModal: true, currentTask: taskObj });
  };
  closeEditProjectTaskSubmissionModal = () => {
    this.props.dispatch(reset("editManagerProjectTaskPopUpForm"));
    this.setState({ editProjectTaskModal: false });
  };
  submitUpdateProjectTask = (values) => {
    values.modifiedby = this.props.currentUser.UserId;
    values.orgid = this.props.currentUser.organization.id;
    values.projectid = this.props.projectId;
    values.userid = this.props.currentUser.UserId;
    this.props.updateManagerProjectTask(
      values,
      this.closeEditProjectTaskSubmissionModal
    );
  };
  handleRemoveTask = (taskid) => {
    this.props.deleteProjectTask(taskid);
  };

  handleSort = (sort_type) => {
    var sort_dir = this.state.sort_dir;

    if (sort_type === this.state.sort_type) {
      if (sort_dir === "desc") {
        sort_dir = "asc";
      } else {
        sort_dir = "desc";
      }
    } else {
      sort_dir = "desc";
    }
    this.setState({ sort_type: sort_type, sort_dir: sort_dir }, function () {
      this.props.getAssignedInternList({
        orgid: this.props.currentUser.organization.id,
        user_id: this.props.currentUser.UserId,
        projectid: this.props.projectId,
        sort_dir: this.state.sort_dir,
        sort_type: this.state.sort_type,
      });
    });
    this.setState({ selectedButton: sort_type });
  };

  render() {
    const { handleSubmit } = this.props;
    return (
      <div>
        <form onSubmit={handleSubmit}>
          <Fragment>
            <Row>
              <Colxx xxs="12" md="12" sm="12" lg="12">
                <Link to="/managerapp/project/list">
                  <span
                    style={{
                      display: "block",
                      margin: "auto",
                    }}
                  >
                    <img
                      src="/assets/img/project_vector.png"
                      alt=""
                      style={{
                        width: "6px",
                        height: "12px",
                        marginLeft: "9px",
                        marginRight: "13px",
                        marginTop: "-3px",
                      }}
                    />

                    <span
                      style={{
                        fontSize: "16px",
                        fontWeight: 600,
                        color: "#46BFA5",
                      }}
                    >
                      Project Board{" "}
                    </span>
                  </span>
                </Link>
              </Colxx>
            </Row>
            <Row>
              <Colxx xxs="12">
                <Separator className="mb-5" />
              </Colxx>
            </Row>

            <Row>
              <Colxx xxs="12" md="12" sm="12" lg="6" className="mb-4">
                <div>
                  <Row>
                    <Colxx xxs="12" sm="12">
                      <label className="required, headding">
                        Project Overview
                      </label>
                      <div style={{ float: "right" }}>
                        {this.state.isEditForm && !this.state.isEditMode && (
                          <Button
                            style={{
                              padding: "0.40rem 0.60rem 0.20rem 0.60rem",
                            }}
                            outline
                            // className="mb-2"
                            color="primary"
                            onClick={() => {
                              this.setState({ isEditMode: true });
                            }}
                          >
                            Edit
                          </Button>
                        )}

                        {this.state.isEditMode && (
                          <Button
                            style={{
                              margin: "0 10px",
                              padding: "0.40rem 0.60rem 0.20rem 0.60rem",
                            }}
                            type="submit"
                            onSubmit={this.submit}
                            outline
                            // className="mb-2"
                            color="success"
                          >
                            Save
                          </Button>
                        )}

                        {this.state.isEditMode && (
                          <Button
                            style={{
                              padding: "0.40rem 0.60rem 0.20rem 0.60rem",
                            }}
                            type="button"
                            outline
                            // className="mb-2"
                            color="danger"
                            onClick={() => {
                              this.setState({ isEditMode: false });
                            }}
                          >
                            Cancel
                          </Button>
                        )}
                      </div>
                    </Colxx>
                  </Row>
                  {/* 
                  <Row>
                    <Colxx xxs="12" sm="12" md="12">
                      <div style={{ float: "right" }}>
                        {this.state.isEditForm && !this.state.isEditMode && (
                          <Button
                            style={{
                              padding: "0.40rem 0.60rem 0.20rem 0.60rem",
                            }}
                            outline
                            className="mb-2"
                            color="primary"
                            onClick={() => {
                              this.setState({ isEditMode: true });
                            }}
                          >
                            Edit
                          </Button>
                        )}

                        {this.state.isEditMode && (
                          <Button
                            style={{
                              margin: "0 10px",
                              padding: "0.40rem 0.60rem 0.20rem 0.60rem",
                            }}
                            type="submit"
                            onSubmit={this.submit}
                            outline
                            className="mb-2"
                            color="success"
                          >
                            Save
                          </Button>
                        )}

                        {this.state.isEditMode && (
                          <Button
                            style={{
                              padding: "0.40rem 0.60rem 0.20rem 0.60rem",
                            }}
                            type="button"
                            outline
                            className="mb-2"
                            color="danger"
                            onClick={() => {
                              window.location.reload(false);
                              this.setState({ isEditMode: false });
                            }}
                          >
                            Cancel
                          </Button>
                        )}
                      </div>
                    </Colxx>
                  </Row> */}
                  <Row>
                    <Colxx xxs="12" sm="12">
                      <div className="shadows">
                        {/* <label className="required">Project Title </label> */}
                        <Field
                          style={{ fontSize: "large", fontWeight: "700" }}
                          name="name"
                          disabled={
                            !(this.state.isEditMode || this.state.isNewForm)
                          }
                          className="custom-control"
                          component={renderTextField}
                          rows={12}
                          type="text"
                          placeholder="Enter Title"
                          required="required"
                        />

                        <div>
                          <div
                            style={
                              !this.state.isEditMode
                                ? {
                                    borderRadius: "8px",
                                    display: "flex",
                                    flexDirection: "row",
                                  }
                                : { display: "flex", flexDirection: "row" }
                            }
                          >
                            <label
                              style={{
                                fontSize: "15px",
                                borderRadius: "5px 0px 0px 5px",
                                // marginLeft: 10,
                                marginTop: 15,
                                background: "#F1F2F4",
                              }}
                            >
                              <img
                                className="iccon"
                                src="/assets/img/calendar-event.png"
                              />{" "}
                              Due date:&nbsp;
                            </label>
                            <Field
                              className="react-datepicker__input-container1"
                              style={{ border: "0px", padding: "0px" }}
                              name="duedate"
                              className="custom-control project-overview-duedate"
                              disabled={
                                !(this.state.isEditMode || this.state.isNewForm)
                              }
                              component={renderDateField}
                              type="text"
                              placeholder="Enter due date"
                            />
                          </div>

                          <div
                            className="input-box-single"
                            style={{ fontSize: "15px" }}
                          >
                            {/* <label>Project description & instructions </label> */}
                            <Field
                              name="description"
                              disabled={
                                !(this.state.isEditMode || this.state.isNewForm)
                              }
                              className="custom-control textare"
                              component={renderTextArea}
                              rows={18}
                              type="text"
                              placeholder="Enter Description"
                              required="required"
                            />
                          </div>
                        </div>
                      </div>
                    </Colxx>
                  </Row>
                </div>
              </Colxx>
              <Colxx xxs="12" md="12" sm="12" lg="6" className="mb-4">
                <Row>
                  <Colxx md="12" className="mb-4">
                    <Row>
                      <Colxx xxs="6" sm="6" md="6">
                        {/* <label style={{ fontWeight: "bold", fontSize: "18px" }}>
                          Project Tasks{" "}
                        </label> */}
                        <label
                          style={{ fontWeight: "bold", fontSize: "larger" }}
                        >
                          Tasks ({this.props.ProjectTaskCount})
                        </label>
                      </Colxx>
                      <Colxx xxs="6" sm="6" md="6">
                        <label style={{ fontWeight: "bold", float: "right" }}>
                          <Link
                            onClick={this.openAddNewProjectTaskSubmissionModal}
                            style={{ color: "#17b298", fontWeight: "bold" }}
                          >
                            Add a new task
                          </Link>{" "}
                        </label>
                      </Colxx>
                    </Row>{" "}
                    <Row>
                      <Colxx xxs="12">
                        <Card style={{ marginTop: "5px" }}>
                          <CardBody>
                            <Row>
                              <Colxx xxs="4" sm="5" md="5">
                                <p className="text-muted texxt mb-2 ">Title</p>
                              </Colxx>
                              <Colxx xxs="4" sm="4" md="4">
                                <p className="text-muted mb-2 texxt">
                                  Due Date
                                </p>
                              </Colxx>
                              <Colxx xxs="4" sm="3" md="3">
                                <p className="text-muted mb-2 texxt">Actions</p>
                              </Colxx>
                            </Row>
                            <div style={{ height: "170px" }}>
                              <PerfectScrollbar
                                options={{
                                  suppressScrollX: true,
                                  wheelPropagation: false,
                                }}
                              >
                                {this.props.ProjectTaskCount > 0 ? (
                                  this.props.ProjectTaskList.map(
                                    (task, index) => {
                                      return (
                                        <div
                                          key={index}
                                          className="flex-row mb-3 pb-3 border-bottom"
                                        >
                                          <Row>
                                            <Colxx xxs="4" sm="5" md="5">
                                              <div>
                                                <p className="font-weight-medium mb-0 text-medium ">
                                                  {task.Name}
                                                </p>
                                              </div>
                                            </Colxx>
                                            <Colxx xxs="4" sm="4" md="4">
                                              <p className="font-weight-medium mb-0  text-medium">
                                                {formatDateTime(task.Duedate)}
                                              </p>
                                            </Colxx>
                                            <Colxx xxs="4" sm="3" md="3">
                                              <div>
                                                <i
                                                  onClick={() =>
                                                    this.handleEditTask(task)
                                                  }
                                                  class="fa fa-pencil penccil"
                                                ></i>
                                                <i
                                                  onClick={() => {
                                                    if (
                                                      window.confirm(
                                                        "Are you sure you want to remove this task?"
                                                      )
                                                    ) {
                                                      this.handleRemoveTask(
                                                        task.Taskid,
                                                        task.OrgId,
                                                        task.Project,
                                                        task.Createdby
                                                      );
                                                    }
                                                  }}
                                                  class="fa fa-trash-o penccil"
                                                ></i>
                                              </div>
                                            </Colxx>
                                          </Row>
                                        </div>
                                      );
                                    }
                                  )
                                ) : (
                                  <tr className="no-record-found">
                                    <td>No Task Found</td>
                                  </tr>
                                )}
                              </PerfectScrollbar>
                            </div>
                          </CardBody>
                        </Card>
                      </Colxx>
                    </Row>
                  </Colxx>
                </Row>
                <Row>
                  <Colxx xxs="6" sm="6" md="6">
                    <label style={{ fontWeight: "bold", fontSize: "larger" }}>
                      Resources ({this.props.documentCount})
                    </label>
                  </Colxx>
                  <Colxx xxs="6" sm="6" md="6">
                    <label style={{ fontWeight: "bold", float: "right" }}>
                      {" "}
                      <Link
                        onClick={this.openAddNewResourcesSubmissionModal}
                        style={{ color: "#17b298", fontWeight: "bold" }}
                      >
                        Add a new resource
                      </Link>{" "}
                    </label>
                  </Colxx>
                </Row>{" "}
                <Row>
                  <Colxx xxs="12">
                    <Card>
                      <CardBody>
                        <Row>
                          <Colxx xxs="8" sm="9" md="9">
                            <p className="text-muted texxt mb-2 ">
                              Title & Description
                            </p>
                          </Colxx>
                          <Colxx xxs="4" sm="3" md="3">
                            <p className="text-muted mb-2 texxt">Actions</p>
                          </Colxx>
                        </Row>
                        <div style={{ height: "150px" }}>
                          <PerfectScrollbar
                            options={{
                              suppressScrollX: true,
                              wheelPropagation: false,
                            }}
                          >
                            {this.props.documentCount > 0 ? (
                              this.props.documentList.map(
                                (resources, index) => {
                                  return (
                                    <div
                                      key={index}
                                      className=" flex-row mb-3 pb-2 border-bottom"
                                    >
                                      <Row>
                                        <Colxx xxs="8" sm="9" md="9">
                                          <div>
                                            <a
                                              href={resources.Url}
                                              target="_blank"
                                              rel="noopener noreferrer"
                                              className="text-medium"
                                            >
                                              {resources.DocumentName}
                                            </a>
                                            <p className="text-muted mb-0 text-small">
                                              {resources.DocumentDescription}
                                            </p>
                                          </div>
                                        </Colxx>
                                        <Colxx xxs="4" sm="3" md="3">
                                          <div>
                                            <i
                                              onClick={() =>
                                                this.handleEditResources(
                                                  resources
                                                )
                                              }
                                              class="fa fa-pencil penccil"
                                            ></i>
                                            <i
                                              onClick={() => {
                                                if (
                                                  window.confirm(
                                                    "Are you sure you want to remove this resource?"
                                                  )
                                                ) {
                                                  this.handleRemoveResource(
                                                    resources.DocumentId,
                                                    resources.OrgId,
                                                    resources.ProjectId
                                                  );
                                                }
                                              }}
                                              class="fa fa-trash-o penccil"
                                            ></i>
                                          </div>
                                        </Colxx>
                                      </Row>
                                    </div>
                                  );
                                }
                              )
                            ) : (
                              <tr className="no-record-found">
                                <td>No Resources Found</td>
                              </tr>
                            )}
                          </PerfectScrollbar>
                        </div>
                      </CardBody>
                    </Card>
                  </Colxx>
                </Row>
              </Colxx>
            </Row>
            <Row style={{ marginTop: "15px" }}>
              <Colxx xxs="12" md="12" sm="12" lg="12">
                <div className="">
                  <Row>
                    <Colxx xxs="12" sm="6" md="6">
                      <label
                        style={{
                          fontWeight: "bold",
                          fontSize: "18px",
                          marginTop: "8px",
                        }}
                      >
                        Submissions
                      </label>
                    </Colxx>

                    <Colxx xxs="6" sm="6" md="6">
                      <Button
                        onClick={this.openAddNewInternSubmissionModal}
                        className="assign"
                      >
                        <i className="fss fa-user-plus" />
                        Assign a new user
                      </Button>
                    </Colxx>
                  </Row>
                  <br></br>
                  <Row>
                    <Colxx xxs="12">
                      <div className="form-group has-search">
                        <span class="fa fa-search form-control-feedback"></span>
                        <input
                          onChange={this.handleYourProjectTextSearchChange}
                          name="yoursearchKeyword"
                          id="yoursearchKeyword"
                          className="form-control"
                          // className="edityourproject"
                          placeholder="Search for assigned users here"
                        />
                        {/* <span className="search-icon">
                          <i className="simple-icon-magnifier" />
                        </span> */}
                      </div>
                    </Colxx>
                  </Row>
                  <br></br>
                  <div className="bodder">
                    <Colxx xxs="12">
                      <Row>
                        <Colxx
                          lg="2"                          
                          sm="12"
                          xxs="12"
                          style={{ textAlign: "left" }}
                        >
                          <p>
                            Assigned User
                            <p
                              style={{ marginRight: "40px", float: "right" }}
                              onClick={() => this.handleSort("name")}
                            >
                              <span
                                className={cn({
                                  "fa fa-sort": this.state.sort_type !== "name",
                                  "fa fa-sort-asc":
                                    this.state.sort_type === "name" &&
                                    this.state.sort_dir === "asc",
                                  "fa fa-sort-desc":
                                    this.state.sort_type === "name" &&
                                    this.state.sort_dir === "desc",
                                  "fa fa-sort": true,
                                })}
                                onClick={() => this.handleSort("name")}
                              ></span>
                            </p>
                          </p>
                        </Colxx>

                        <Colxx
                          lg="2"                          
                          sm="12"
                          xxs="12"
                          style={{ textAlign: "center" }}
                        >
                          <p>
                            Status
                            <p
                              // style={{ marginRight: "40px", float: "right", marginLeft:"-40px" }}
                              className="projectstatus"
                              onClick={() => this.handleSort("status")}
                            >
                              <span
                                className={cn({
                                  "fa fa-sort":
                                    this.state.sort_type !== "status",
                                  "fa fa-sort-asc":
                                    this.state.sort_type === "status" &&
                                    this.state.sort_dir === "asc",
                                  "fa fa-sort-desc":
                                    this.state.sort_type === "status" &&
                                    this.state.sort_dir === "desc",
                                  "fa fa-sort": true,
                                })}
                                onClick={() => this.handleSort("status")}
                              ></span>
                            </p>
                          </p>
                        </Colxx>

                        <Colxx
                          lg="3"                          
                          sm="12"
                          xxs="12"
                          style={{ textAlign: "left" }}
                        >
                          <p>Tasks Completed</p>
                        </Colxx>

                        <Colxx
                          lg="2"                          
                          sm="12"
                          xxs="12"
                          style={{ textAlign: "center" }}
                        >
                          <p>Submissions</p>
                        </Colxx>

                        <Colxx
                          lg="3"                          
                          sm="12"
                          xxs="12"
                          style={{ textAlign: "left" }}
                        >
                          <p>Date of Last Submission</p>
                        </Colxx>
                      </Row>
                    </Colxx>
                    {this.renderSelectedInterns()}
                  </div>
                </div>
              </Colxx>
            </Row>

            <Row style={{ marginTop: "15px" }}>
              <Colxx xxs="12" md="12" sm="12">
                <Button
                  onClick={this.openAddNewInternSubmissionModal}
                  className="assigned"
                >
                  <i className="fss fa-user-plus" />
                  Assign a new user
                </Button>
              </Colxx>
            </Row>

            {/* <Row style={{ marginTop: "15px" }}>
              <Colxx xxs="12" md="12" sm="12">
                <div className="container">
                  <Row>
                    <Colxx xxs="12" sm="12" md="12">
                      <label style={{ fontWeight: "bold", fontSize: "18px" }}>
                        {" "}
                        Project Submissions{" "}
                      </label>
                    </Colxx>
                  </Row>

                  <Row>
                    <Colxx xxs="12" sm="12" md="12">
                      <Table style={{ width: "100%", marginTop: 30 }}>
                        <thead>
                          <tr>
                            <th> Data Submitted</th>
                            <th>Owner Name</th>
                            <th>Submission Description</th>
                            <th>Click to View</th>
                          </tr>
                        </thead>
                        <tbody>
                          {this.props.assignedInternProjectCount > 0 ? (
                            this.props.assignedInternProjectSubmission.map(
                              (resources) => {
                                return (
                                  <tr>
                                    <td data-title="date">
                                      {formatDateTime(resources.DateAdded)}
                                    </td>
                                    <td data-title="Name">
                                      {resources.InternName}
                                    </td>

                                    <td data-title="type">
                                      {resources.DocumentDescription}
                                    </td>

                                    <td data-title="Url">
                                      <a
                                        style={{ cursor: "pointer" }}
                                        href={resources.Url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                      >
                                        {" "}
                                        {resources.DocumentName}
                                      </a>
                                    </td>
                                  </tr>
                                );
                              }
                            )
                          ) : (
                            <tr className="no-record-found">
                              <td>No Record Found</td>
                            </tr>
                          )}
                        </tbody>
                      </Table>
                    </Colxx>
                  </Row>
                </div>
              </Colxx>
            </Row> */}
          </Fragment>
        </form>
        <InternAssignPopUpForm
          onSubmit={this.submit}
          dispatch={this.props.dispatch}
          onRequestClose={this.closeInternSubmissionModal}
          modalStatus={this.state.addInternModal}
          currentUser={this.props.currentUser}
          projectId={this.props.projectId}
          assignedInternList={this.props.assignedInternList}
        />
        <ResourcesAssignPopUpForm
          onSubmit={this.submitResources}
          dispatch={this.props.dispatch}
          onRequestClose={this.closeResourcesSubmissionModal}
          modalStatus={this.state.addResourcesModal}
          currentUser={this.props.currentUser}
          projectId={this.props.projectId}
        />
        <EditResourceAssignPopUpForm
          onSubmit={this.submitUpdateResource}
          dispatch={this.props.dispatch}
          onRequestClose={this.closeEditResourceSubmissionModal}
          modalStatus={this.state.editResourcesModal}
          currentUser={this.props.currentUser}
          resources={this.state.currentResource}
        />
        <AddManagerProjectTaskPopUpForm
          onSubmit={this.submitProjectTask}
          dispatch={this.props.dispatch}
          onRequestClose={this.closeProjectTaskSubmissionModal}
          modalStatus={this.state.addProjectTaskModal}
          currentUser={this.props.currentUser}
          projectId={this.props.projectId}
        />
        <EditManagerProjectTaskPopUpForm
          onSubmit={this.submitUpdateProjectTask}
          dispatch={this.props.dispatch}
          onRequestClose={this.closeEditProjectTaskSubmissionModal}
          modalStatus={this.state.editProjectTaskModal}
          currentUser={this.props.currentUser}
          task={this.state.currentTask}
        />
        <BessieCooperPopUpForm
          onSubmit={this.showProjectcooper}
          dispatch={this.props.dispatch}
          onRequestClose={this.closebessiecooperSubmissionModal}
          modalStatus={this.state.addbessieModal}
          currentUser={this.props.currentUser}
          projectId={this.props.projectId}
          selectedInternId={this.state.currentId}
          selectInternName={this.state.selectUserName}
        />
      </div>
    );
  }
}
const validations = {
  required: {
    fields: ["name", "duedate"],
  },
  urls: {
    fields: [""],
  },
};

addEditProjectForm = reduxForm({
  form: "addEditProjectForm", // a unique identifier for this form
  validate: (values) => {
    return validate(values, validations);
  },
})(addEditProjectForm);

// const selector = formValueSelector("addEditProjectForm"); // <-- same as form name

const mapStateToProps = (state) => ({
  currentUser: state.userReducer.currentUser,
  assignedInternList: state.projectReducer.assignedInternList,
  assignedInternsCount: state.projectReducer.assignedInternsCount,
  documentList: state.projectReducer.assignedDocuments,
  documentCount: state.projectReducer.assignedDocumentsCount,
  // assignedInternProjectSubmission:
  //   state.projectReducer.assignedInternProjectSubmission,
  // assignedInternProjectCount: state.projectReducer.assignedInternProjectCount,
  ProjectTaskList: state.projectReducer.ProjectTaskList,
  ProjectTaskCount: state.projectReducer.ProjectTaskCount,
  CompletedTaskList: state.projectReducer.CompletedTaskList,
  CompletedTaskCount: state.projectReducer.CompletedTaskCount,
  InternProjectSubmissionList: state.projectReducer.InternProjectSubmissionList,
  InternProjectSubmissionCount:
    state.projectReducer.InternProjectSubmissionCount,
});

const mapDispatchToProps = (dispatch) => ({
  getAssignedInternList: (params) => {
    dispatch(getAssignedInternList(params));
  },
  deleteIntern: (projectAssignmentid) => {
    dispatch(deleteIntern(projectAssignmentid));
  },
  addProjectResources: (projectid, orgid, params, callback) => {
    dispatch(addProjectResources(projectid, orgid, params, callback));
  },
  getProjectDocumentsList: (params) => {
    dispatch(getProjectDocumentsList(params));
  },
  updateProjectResource: (projectid, ordId, params, callback) => {
    dispatch(updateProjectResource(projectid, ordId, params, callback));
  },

  deleteResource: (resourceid) => {
    dispatch(deleteResource(resourceid));
  },
  internProjectSubmissionListForManager: (params) => {
    dispatch(internProjectSubmissionListForManager(params));
  },

  addManagerProjectTask: (projectid, orgid, params, callback) => {
    dispatch(addManagerProjectTask(projectid, orgid, params, callback));
  },
  getManagerProjectTaskList: (params) => {
    dispatch(getManagerProjectTaskList(params));
  },
  updateManagerProjectTask: (params, callback) => {
    dispatch(updateManagerProjectTask(params, callback));
  },
  deleteProjectTask: (taskid) => {
    dispatch(deleteProjectTask(taskid));
  },
  getcompletedInternProjectTaskList: (params) => {
    dispatch(getcompletedInternProjectTaskList(params));
  },
  getInternProjectSubmissionList: (params) => {
    dispatch(getInternProjectSubmissionList(params));
  },
  dispatch: dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(addEditProjectForm);
