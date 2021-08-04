import React, { Component, Fragment } from "react";
import {
  Row,
  Card,
  CardBody,
  Button,
  // CustomInput,
  // CardTitle,
  // CardSubtitle,
  // CardImg,
  // CardText,
} from "reactstrap";
// import { NavLink } from "react-router-dom";

import { formatDateTime } from "../../../utils/globalFunctions";

// import classnames from "classnames";

import { Colxx, Separator } from "../../../components/common/CustomBootstrap";
import IntlMessages from "../../../helpers/IntlMessages";
import {
  // Field,
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
import InternResourceSubmissionPopUpForm from "./internResourceSubmissionPopUpForm";
import EditResourceSubmissionPopUpForm from "./editResourceSubmissionPopUpForm";
import PerfectScrollbar from "react-perfect-scrollbar";
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
import "react-datepicker/dist/react-datepicker.css";
import axiosInstance from "../../../utils/axiosApi";
// import _ from "lodash";
import { getAPIURL } from "../../../utils/getApiUrl";
import * as constants from "../../../utils/constants";
import {
  deleteInternResource,
  // addProjectResources,
  getProjectDocumentsList,
  // updateProjectResource,
  addInternProjectSubmission,
  internProjectDocumentsList,
  updateInternProjectSubmission,
  addInternProjectStatus,
  getInternProjectStatus,
  getInternProjectTaskList,
  internProjectTaskStatus,
  // getcompletedInternProjectTaskList,
} from "../../../action/projects/projects";
import Checkbox from "@material-ui/core/Checkbox";
// import CircleChecked from '@material-ui/icons/CheckCircleOutline';
import CircleCheckedFilled from "@material-ui/icons/CheckCircle";
import CircleUnchecked from "@material-ui/icons/RadioButtonUnchecked";
import createBrowserHistory from "history/createBrowserHistory";
//import { FormatUnderlined } from "@material-ui/icons";
//import { FormattedDate } from "react-intl";
// import { Template } from "devextreme-react";
const browserHistory = createBrowserHistory();
class internProjectSubmissionForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addInternModal: false,
      addResourcesModal: false,
      editResourcesModal: false,

      isEditMode: false,
      isEditForm: false,
      isNewForm: false,
      currentResource: {},
      projectId: this.props.match.params.id,
      checked: [],
    };
  }

  componentDidMount() {
    var queryObj = {
      orgid: this.props.currentUser.organization.id,
      user_id: this.props.currentUser.UserId,
      projectid: this.props.match.params.id,
    };
    this.props.getInternProjectStatus(queryObj);

    this.props.internProjectDocumentsList({
      orgid: this.props.currentUser.organization.id,
      projectid: this.props.match.params.id,
      internid: this.props.currentUser.UserId,
    });
    this.props.getProjectDocumentsList({
      orgid: this.props.currentUser.organization.id,
      // limit_size: constants.DEFAULT_LIMIT_SIZE,
      // limit_start: 0,
      projectid: this.props.match.params.id,
    });
    this.props.getInternProjectTaskList({
      orgid: this.props.currentUser.organization.id,
      projectid: this.props.match.params.id,
      userid: this.props.currentUser.UserId,
    });
    var data = {
      params: {
        orgid: this.props.currentUser.organization.id,
      },
    };

    axiosInstance
      .get(
        getAPIURL(constants.PROJECT_DETAILS_PROJECT_BOARD_URL, {
          ":id": this.props.match.params.id,
        }),
        data
      )
      .then((response) => {
        this.setState({ project: response.data });
        this.setState({ isEditForm: true, isNewForm: false });
      })
      .catch((error) => {
        browserHistory.push("/unauthorizedpage");
        window.location.reload(false);
      });

    // this.props.getcompletedInternProjectTaskList({
    //   orgid: this.props.currentUser.organization.id,
    //   projectid: this.props.match.params.id,
    //   userid: this.props.currentUser.UserId,
    // });
  }

  openAddNewResourcesSubmissionModal = () => {
    this.setState({ addResourcesModal: true });
  };

  closeResourcesSubmissionModal = () => {
    this.props.dispatch(reset("internResourcesSubmissionPopUpForm"));
    this.setState({ addResourcesModal: false });
  };

  closeEditSubmissionModal = () => {
    this.props.dispatch(reset("editResourceSubmissionPopUpForm"));
    this.setState({ editResourcesModal: false });
  };

  openEditSubmissionModal = () => {
    this.setState({ editResourcesModal: true });
  };
  handleTaskCheckboxClick = (index, taskid, orgid, projectid, TaskStatus) => {
    let temp = this.state.checked[index];
    temp = !TaskStatus;
    var dataObj = {
      task_status: temp,
      task_id: taskid,
      org_id: orgid,
      project_id: projectid,
      user_id: this.props.currentUser.UserId,
    };
    this.props.internProjectTaskStatus(dataObj);
  };

  renderProjectDetails = () => {
    let table = [];

    if (this.state.project) {
      let Title = [];
      Title.push(
        <Colxx xxs="12">
          {
            <div>
              <Row>
                <Colxx xxs="12" sm="12" md="12">
                  <label style={{ fontWeight: "bold", fontSize: "18px" }}>
                    Project Overview
                  </label>
                </Colxx>
              </Row>
              <Card>
                <CardBody>
                  <Row>
                    <Colxx xxs="12" sm="12" md="12">
                      <span style={{ fontWeight: "bold", fontSize: "20px" }}>
                        {this.state.project.name}
                      </span>
                    </Colxx>
                  </Row>
                  <Row style={{ marginTop: "12px" }}>
                    <Colxx xxs="12" sm="12" md="12">
                      <span
                        style={{
                          color: "#494957",
                          fontSize: "16px",
                          backgroundColor: "#F1F2F4",
                          padding: "5px",
                          borderRadius: "7px",
                        }}
                      >
                        <img
                          alt="calendar"
                          className="iccon"
                          src="/assets/img/calendar-event.png"
                        />{" "}
                        Due date: {formatDateTime(this.state.project.duedate)}
                      </span>
                    </Colxx>
                  </Row>
                  <Row style={{ marginTop: "12px" }}>
                    <Colxx xxs="12" sm="12" md="12">
                      <span
                        style={{
                          color: "#494957",
                          fontSize: "16px",
                          textAlign: "justify",
                          textAlignLast: "center",
                        }}
                      >
                        {this.state.project.description}
                      </span>
                    </Colxx>
                  </Row>
                </CardBody>
              </Card>
            </div>
          }
        </Colxx>
      );
      table.push(<Row>{Title}</Row>);
    }
    return table;
  };
  addnotification = () => {
    var data = {
      "X-MAGICBELL-API-SECRET": "817d9cd573a2b4bfd9144f2b1d7331fe58dd0a01",
      "X-MAGICBELL-API-KEY": "b22b8182a21c02989a4a71fb4a0ae4c951170f30",
    };
    return data;
  };
  submitResources = (values) => {
    var notifactionsecret = this.addnotification();
    if (values.Type === "File") {
      if (/\s/.test(values.filelinkdata.name)) {
        alert(" filename contains spaces. Please rename the file.");
        return false;
      } else {
        if (this.props.match.params.id != null) {
          values.createdby = this.props.currentUser.UserId;
          values.intern = this.props.currentUser.UserId;
          this.props.addInternProjectSubmission(
            notifactionsecret,
            this.props.match.params.id,
            this.props.currentUser.organization.id,
            values,
            this.closeResourcesSubmissionModal
          );
        }
      }
    } else {
      if (this.props.match.params.id != null) {
        values.createdby = this.props.currentUser.UserId;
        values.intern = this.props.currentUser.UserId;
        this.props.addInternProjectSubmission(
          notifactionsecret,
          this.props.match.params.id,
          this.props.currentUser.organization.id,
          values,
          this.closeResourcesSubmissionModal
        );
      }
    }
  };

  submitUpdateResource = (values) => {
    values.createby = this.props.currentUser.UserId;
    values.intern = this.props.currentUser.UserId;
    if (values.filelinkdata === undefined) {
      values.Type = "";
    } else {
      values.Type = "File";
    }
    this.props.updateInternProjectSubmission(
      this.state.projectId,
      this.props.currentUser.organization.id,
      values,
      this.closeEditSubmissionModal
    );
  };

  handleEditResources = (documentObj) => {
    this.setState({ editResourcesModal: true, currentResource: documentObj });
  };
  handleRemoveResourcesSubmission = (docid) => {
    this.props.deleteInternResource(docid);
  };
  closeEditResourceSubmissionModal = () => {
    this.props.dispatch(reset("editResourcesAssignPopUpForm"));
    this.setState({ editResourcesModal: false });
  };
  handleClick = (event) => {
    var status = "";
    if (event.target.innerText === "In Progress") {
      status = 1;
    }

    if (event.target.innerText === "Completed") {
      status = 2;
    }
    if (event.target.innerText === "Stuck") {
      status = 3;
    }

    var params = {
      project_id: this.props.match.params.id,
      user_id: this.props.currentUser.UserId,
      org_id: this.props.currentUser.organization.id,
      project_status: status,
    };
    this.props.addInternProjectStatus(params);
  };
  renderProjectStatus = () => {
    let table = [];
    let Title = [];

    if (this.props.internProjectStatus) {
      if (this.props.internProjectStatus.status === "In Progress") {
        Title.push(
          <div style={{ marginLeft: "10px" }}>
            <Button
              color="primary"
              className="mb-2 project_progress"
              onClick={this.handleClick}
            >
              <IntlMessages id="In-Progress" />
            </Button>{" "}
          </div>
        );
      } else {
        Title.push(
          <div style={{ marginLeft: "10px" }}>
            <Button
              outline
              color="warning"
              className="mb-2"
              onClick={this.handleClick}
            >
              <IntlMessages id="In Progress" />
            </Button>{" "}
          </div>
        );
      }

      if (this.props.internProjectStatus.status === "Stuck") {
        Title.push(
          <div style={{ marginLeft: "10px" }}>
            <Button color="danger" className="mb-2" onClick={this.handleClick}>
              <IntlMessages id="Stuck" />
            </Button>{" "}
          </div>
        );
      } else {
        Title.push(
          <div style={{ marginLeft: "10px" }}>
            <Button
              outline
              color="danger"
              className="mb-2"
              onClick={this.handleClick}
            >
              <IntlMessages id="Stuck" />
            </Button>{" "}
          </div>
        );
      }
      if (this.props.internProjectStatus.status === "Completed") {
        Title.push(
          <div style={{ marginLeft: "10px" }}>
            <Button color="success" className="mb-2" onClick={this.handleClick}>
              <IntlMessages id="Completed" />
            </Button>{" "}
          </div>
        );
      } else {
        Title.push(
          <div style={{ marginLeft: "10px" }}>
            <Button
              outline
              color="success"
              className="mb-2"
              onClick={this.handleClick}
            >
              <IntlMessages id="Completed" />
            </Button>{" "}
          </div>
        );
      }
    }

    table.push(<Row>{Title}</Row>);
    return table;
  };
  render() {
    const { handleSubmit } = this.props;
    return (
      <div>
        <form onSubmit={handleSubmit}>
          <Fragment>
            <Row>
              <Colxx xxs="12" md="12" sm="12" lg="12">
                <Link to="/internapp/project/list">
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
                      Project Board
                    </span>
                  </span>
                </Link>
              </Colxx>
              {/* <Colxx xxs="6" md="5" sm="5">
                <Link to="/internapp/project/list">
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
              <Colxx xxs="7" md="7" sm="7">
                <h1 style={{ textAlign: "center", fontWeight: "bold" }}>
                  Project
                </h1>
              </Colxx> */}
            </Row>
            <Row>
              <Colxx xxs="12">
                <Separator className="mb-5 project_top_seperator" />
              </Colxx>
            </Row>

            <Row>
              <Colxx xxs="12" md="6" sm="6" className="mb-4">
                <div className="">{this.renderProjectDetails()}</div>
              </Colxx>
              <Colxx xxs="12" md="6" sm="6" className="mb-4">
                <Row>
                  <Colxx md="12" xxs="12" sm="12" lg="12" className="mb-4">
                    <Row>
                      <Colxx xxs="12" sm="12" md="12">
                        <label style={{ fontWeight: "bold", fontSize: "18px" }}>
                          Project Tasks{" "}
                          {this.props.ProjectTaskCount > 0 ? (
                            <span>({this.props.ProjectTaskCount})</span>
                          ) : null}
                        </label>
                      </Colxx>
                    </Row>
                    <Row>
                      <Colxx xxs="12">
                        <Card>
                          <CardBody>
                            <Row>
                              <Colxx xxs="2" sm="1" md="2" lg="1"></Colxx>
                              <Colxx xxs="5" sm="5" md="5" lg="7">
                                <p className="text-muted texxt mb-2 ">Title</p>
                              </Colxx>
                              <Colxx xxs="5" sm="5" md="5" lg="4">
                                <p className="text-muted mb-2 texxt">
                                  Due Date
                                </p>
                              </Colxx>
                            </Row>
                            <div style={{ height: "160px" }}>
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
                                          className="flex-row mb-1 pb-1 border-bottom"
                                        >
                                          <Row>
                                            <Colxx xxs="2" sm="1" md="2" lg="1">
                                              {/* <CustomInput */}
                                              <Checkbox
                                              className="PrivateSwitchBase-root-1"
                                                style={{ color: "#4cbfa5" }}
                                                icon={<CircleUnchecked />}
                                                checkedIcon={
                                                  <CircleCheckedFilled />
                                                }
                                                type="checkbox"
                                                label=""
                                                checked={task.TaskStatus}
                                                onChange={() => {
                                                  this.handleTaskCheckboxClick(
                                                    index,
                                                    task.Taskid,
                                                    task.OrgId,
                                                    task.Project,
                                                    task.TaskStatus
                                                  );
                                                }}
                                              />
                                            </Colxx>
                                            {/* <Colxx xxs="7" sm="7" md="7" lg="8"></Colxx> */}
                                            <Colxx xxs="5" sm="5" md="5" lg="7">
                                              <div className="pt-2 ">
                                                <p className="font-weight-small text-medium mb-0 ">
                                                  {task.Name}
                                                </p>
                                              </div>
                                            </Colxx>
                                            <Colxx xxs="5" sm="5" md="5" lg="4">
                                              <p className="text-muted mb-0 mt-2 text-medium">
                                                {formatDateTime(task.Duedate)}
                                              </p>
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
                  <Colxx xxs="12" sm="12" md="12">
                    <label style={{ fontWeight: "bold", fontSize: "18px" }}>
                      Project Resources{" "}
                      {this.props.documentCount > 0 ? (
                        <span>({this.props.documentCount})</span>
                      ) : null}
                    </label>
                  </Colxx>
                </Row>{" "}
                <Row>
                  <Colxx xxs="12">
                    <Card>
                      <CardBody>
                        <Colxx xxs="12" sm="12" md="12">
                          <p className="text-muted texxt mb-2 ">
                            Title & Description
                          </p>
                        </Colxx>
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
                                      className=" flex-row mb-3 pb-3 border-bottom"
                                    >
                                      <Row>
                                        <Colxx xxs="12" sm="12" md="12">
                                          <div className="pl-3 pr-2">
                                            <a
                                              href={resources.Url}
                                              target="_blank"
                                              rel="noopener noreferrer"
                                              style={{
                                                textDecorationLine: "underline",
                                                color: "#46BFA5",
                                              }}
                                            >
                                              {resources.DocumentName}
                                            </a>
                                            <p className="text-muted mb-0 text-small">
                                              {resources.DocumentDescription}
                                            </p>
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
            <br></br>
            <Row>
              <Colxx xxs="12" md="6" sm="6" lg="6">
                <p
                  style={{
                    fontWeight: "bold",
                    fontSize: "18px",
                    // marginLeft: "15px",
                  }}
                >
                  Upload a Submission
                </p>
                <Button
                  color="primary"
                  className="mb-2"
                  onClick={this.openAddNewResourcesSubmissionModal}
                  style={{
                    color: "#fff",
                    fontWeight: 600,
                    fontSize: "16px",
                    // marginLeft: "15px",
                  }}
                >
                  + Add New Submission
                </Button>
              </Colxx>
              <Colxx xxs="12" md="6" sm="6">
                <label style={{ fontWeight: "bold", fontSize: "18px" }}>
                  Overall Status
                </label>
                {this.renderProjectStatus()}
              </Colxx>
            </Row>
            {/* <Row style={{ marginTop: "15px" }}>
              <Colxx xxs="6" sm="6" md="6">
                <Button
                  color="primary"
                  className="mb-2"
                  onClick={this.openAddNewResourcesSubmissionModal}
                  style={{
                    color: "#fff",
                    fontWeight: "bold",
                    fontSize: "18px",
                    marginLeft: "15px",
                  }}
                >
                  + Add New Submission
                </Button>
              </Colxx>
              <Colxx xxs="6" sm="6" md="6">
                {this.renderProjectStatus()}
              </Colxx>
            </Row> */}
            <Row>
              <Colxx
                xxs="12"
                sm="12"
                md="12"
                className="project_submission_table"
              >
                <Row className="bborder">
                  <Colxx lg="3" md="3" sm="3" xxs="3">
                    <p
                      style={{
                        fontSize: "14px",
                        padding: "6px",
                        textAlign: "center",
                        color: "#5D6E84",
                      }}
                    >
                      Date Submitted
                    </p>
                  </Colxx>

                  <Colxx lg="3" md="3" sm="3" xxs="3">
                    <p
                      style={{
                        fontSize: "14px",
                        padding: "6px",
                        textAlign: "center",
                        color: "#5D6E84",
                      }}
                    >
                      Title
                    </p>
                  </Colxx>

                  <Colxx lg="3" md="3" sm="3" xxs="3">
                    <p
                      style={{
                        fontSize: "14px",
                        padding: "6px",
                        textAlign: "center",
                        color: "#5D6E84",
                      }}
                    >
                      Description
                    </p>
                  </Colxx>

                  <Colxx lg="3" md="3" sm="3" xxs="3">
                    <p
                      style={{
                        fontSize: "14px",
                        padding: "6px",
                        textAlign: "center",
                        color: "#5D6E84",
                      }}
                    >
                      Edit / Delete
                    </p>
                  </Colxx>
                </Row>

                {this.props.internDocumentCount > 0 ? (
                  this.props.internDocumentList.map((resources) => {
                    return (
                      <Row className="bborder">
                        <Colxx lg="3" md="3" sm="3" xxs="3" data-title="date">
                          <p style={{ padding: "6px", textAlign: "center" }}>
                            {formatDateTime(resources.DateAdded)}
                          </p>
                        </Colxx>

                        <Colxx
                          lg="3"
                          md="3"
                          sm="3"
                          xxs="3"
                          data-title="Url"
                          style={{ marginTop: "6px", textAlign: "center" }}
                        >
                          <a
                            style={{
                              cursor: "pointer",
                              padding: "6px",
                              textDecorationLine: "underline",
                              color: "#46BFA5",
                            }}
                            href={resources.Url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {resources.DocumentName}
                          </a>
                        </Colxx>

                        <Colxx lg="3" md="3" sm="3" xxs="3" data-title="type">
                          <p style={{ padding: "6px", textAlign: "center" }}>
                            {resources.DocumentDescription}
                          </p>
                        </Colxx>

                        <Colxx
                          lg="3"
                          md="3"
                          sm="3"
                          xxs="3"
                          style={{ textAlign: "center" }}
                        >
                          <div className="edit_delete_div">
                            <i
                              onClick={() =>
                                this.handleEditResources(resources)
                              }
                              style={{
                                fontSize: "16px",
                                cursor: "pointer",
                                marginRight: "15px",
                                marginLeft: "6px",
                                marginTop: "3.25px",
                              }}
                              class="fa fa-pencil"
                            ></i>
                          </div>
                          <div className="edit_delete_div">
                            <i
                              onClick={() => {
                                if (
                                  window.confirm(
                                    "Are you sure you want to delete this submission?"
                                  )
                                ) {
                                  this.handleRemoveResourcesSubmission(
                                    resources.DocumentId
                                  );
                                }
                              }}
                              style={{
                                fontSize: "17px",
                                cursor: "pointer",
                                marginTop: "3.25px",
                              }}
                              class="fa fa-trash-o"
                            ></i>
                          </div>
                        </Colxx>
                      </Row>
                    );
                  })
                ) : (
                  <tr className="no-record-found">
                    <td>No Record Found</td>
                  </tr>
                )}
              </Colxx>
            </Row>
          </Fragment>
        </form>

        <InternResourceSubmissionPopUpForm
          onSubmit={this.submitResources}
          dispatch={this.props.dispatch}
          onRequestClose={this.closeResourcesSubmissionModal}
          modalStatus={this.state.addResourcesModal}
          currentUser={this.props.currentUser}
          projectId={this.props.projectId}
        />
        <EditResourceSubmissionPopUpForm
          onSubmit={this.submitUpdateResource}
          dispatch={this.props.dispatch}
          onRequestClose={this.closeEditSubmissionModal}
          modalStatus={this.state.editResourcesModal}
          currentUser={this.props.currentUser}
          projectId={this.props.projectId}
          resources={this.state.currentResource}
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

internProjectSubmissionForm = reduxForm({
  form: "internProjectSubmissionForm", // a unique identifier for this form
  validate: (values) => {
    return validate(values, validations);
  },
})(internProjectSubmissionForm);

// const selector = formValueSelector("internProjectSubmissionForm"); // <-- same as form name

const mapStateToProps = (state) => ({
  currentUser: state.userReducer.currentUser,
  documentList: state.projectReducer.assignedDocuments,
  documentCount: state.projectReducer.assignedDocumentsCount,
  internDocumentList: state.projectReducer.assignedInternDocuments,
  internDocumentCount: state.projectReducer.assignedInternDocumentsCount,
  internProjectStatus: state.projectReducer.internProjectStatus,
  ProjectTaskList: state.projectReducer.ProjectTaskList,
  ProjectTaskCount: state.projectReducer.ProjectTaskCount,
  // CompletedTaskList: state.projectReducer.CompletedTaskList,
  // CompletedTaskCount: state.projectReducer.CompletedTaskCount,
});

const mapDispatchToProps = (dispatch) => ({
  addInternProjectSubmission: (
    projectId,
    ordId,
    params,
    notifactionsecret,
    callback
  ) => {
    dispatch(
      addInternProjectSubmission(
        projectId,
        ordId,
        params,
        notifactionsecret,
        callback
      )
    );
  },
  getProjectDocumentsList: (params) => {
    dispatch(getProjectDocumentsList(params));
  },
  internProjectDocumentsList: (params) => {
    dispatch(internProjectDocumentsList(params));
  },
  updateInternProjectSubmission: (projectId, ordId, params, callback) => {
    dispatch(updateInternProjectSubmission(projectId, ordId, params, callback));
  },
  deleteInternResource: (docid) => {
    dispatch(deleteInternResource(docid));
  },
  addInternProjectStatus: (params) => {
    dispatch(addInternProjectStatus(params));
  },
  getInternProjectStatus: (filterObj) => {
    dispatch(getInternProjectStatus(filterObj));
  },
  getInternProjectTaskList: (params) => {
    dispatch(getInternProjectTaskList(params));
  },
  internProjectTaskStatus: (filterObj) => {
    dispatch(internProjectTaskStatus(filterObj));
  },
  // getcompletedInternProjectTaskList: (params) => {
  //   dispatch(getcompletedInternProjectTaskList(params));
  // },
  // addInternCompletedProject: (params) => {
  //   dispatch(addInternCompletedProject(params));
  // },
  dispatch: dispatch,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(internProjectSubmissionForm);
