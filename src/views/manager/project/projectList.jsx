import React, { Component, Fragment } from "react";
import {
  Row,
  Card,
  CardBody,
  CardSubtitle,
  Nav,
  NavItem,
  TabContent,
  TabPane,
  // CardImg,
  CardText,
  Button,
  CardTitle,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
} from "reactstrap";
import cn from "classnames";
import classnames from "classnames";
import { NavLink, Link } from "react-router-dom";
import { Colxx } from "../../../components/common/CustomBootstrap";
import IntlMessages from "../../../helpers/IntlMessages";
import {
  // Field,
  // reduxForm,
  // FieldArray,
  // formValueSelector,
  reset,
} from "redux-form";

import { connect } from "react-redux";
import {
  addProject,
  getProjectList,
  managerDeleteProject,
  createManagerDuplicateProject,
  checkCompleteProjectBoard,
  reActivateCompleteProject,
  getManagerCompletedProjectList,
} from "../../../../src/action/projects/projects";
import AddProjectPopUpForm from "./addProjectPopUpForm";
import { formatDateTime } from "../../../utils/globalFunctions";
import * as constants from "../../../utils/constants";
import Pagination from "../../../containers/pages/Pagination";
import CompletedProjectPagination from "../../../containers/pages/CompletedProjectPagination";
/* eslint-disable */
class projectListForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addProjectModal: false,
      formError: [],
      sort_dir: null,
      sort_type: null,
      open: null,
    };
  }

  componentDidMount() {
    // var query_params = this.props.router.location.query;

    var queryObj = {
      orgid: this.props.currentUser.organization.id,
      user_id: this.props.currentUser.UserId,
      limit_start: 0,
      limit_size: constants.DEFAULT_LIMIT_SIZE,
      // supervisor_id: this.state.superVisorid,
      sort_dir: this.state.sort_dir,
      sort_type: this.state.sort_type,
    };

    // if(query_params.intern_id){
    //     this.setState({userId: query_params.intern_id});
    //     queryObj.user_id = query_params.intern_id;
    // }

    this.props.getProjectList(queryObj);
    this.props.getManagerCompletedProjectList(queryObj);

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
  }
  toggleUpperTab(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeFirstTab: tab,
      });
    }
  }
  openAddNewProjectSubmissionModal = () => {
    this.setState({ addProjectModal: true });
  };

  closeProjectSubmissionModal = () => {
    this.props.dispatch(reset("addProjectPopUpForm"));
    this.setState({ addProjectModal: false });
  };

  submit = (values) => {
    values.createdby = this.props.currentUser.UserId;
    values.org = this.props.currentUser.organization.id;
    this.props.addProject(values, this.closeProjectSubmissionModal);
  };

  setFormError = (errors) => {
    this.setState({ formError: errors });
  };
  handleValueChange(projectId, projectName) {
    this.props.checkCompleteProjectBoard({
      projectId: projectId,
      name: projectName,
      status: 2,
    });
  }
  handleReActivateProject = (projectid, name) => {
    var queryObj = {
      orgid: this.props.currentUser.organization.id,
      user_id: this.props.currentUser.UserId,
      name: name,
      projectId: projectid,
      status: 1,
    };
    this.props.reActivateCompleteProject(queryObj);
    this.setState({
      open: null,
    });
  };
  handleDuplicateProject = (projectid) => {
    var queryObj = {
      orgid: this.props.currentUser.organization.id,
      user_id: this.props.currentUser.UserId,
      project_id: projectid,
    };
    this.props.createManagerDuplicateProject(queryObj);
    this.setState({
      open: null,
    });
  };
  renderProjectList = () => {
    let table = [];
    let Title = [];
    {
      this.props.projectList.length > 0 ? (
        this.props.projectList.map((project) => {
          return Title.push(
            <Colxx md="12" sm="12" lg="6" xxs="12" xl="4">
              {
                <Card>
                  <Card
                    style={{
                      background: "#03CBAE",
                      height: "6px",
                      marginTop: "-6px",
                    }}
                  ></Card>
                  <CardBody style={{ padding: "0.5rem" }}>
                    <Row>
                      <Colxx xxs="12" md="2" sm="2" lg="2" xl="2">
                        <img
                          style={{ width: "40px", height: "40px" }}
                          src="/assets/img/project_card_icons.png"
                          alt="project_card_icon"
                        ></img>
                      </Colxx>
                      <Colxx xxs="10" md="8" sm="8" lg="8">
                        <NavLink
                          to={"/managerapp/project/edit/" + project.ProjectId}
                        >
                          <CardSubtitle
                            style={{
                              fontSize: "16px",
                              fontWeight: "bold",
                            }}
                            className="truncate mb-1"
                          >
                            {project.Name}
                          </CardSubtitle>
                        </NavLink>
                        <CardText
                          style={{
                            fontSize: "13px",
                          }}
                          className="text-muted text-small mb-2"
                        >
                          Due {formatDateTime(project.DueDate)}
                        </CardText>
                      </Colxx>
                      <Colxx xxs="2" md="2" sm="2" lg="2" className="paddding">
                        <UncontrolledDropdown>
                          <DropdownToggle
                            className="project-list-toggle padd"
                            style={{
                              backgroundColor: "white",
                              color: "grey",
                              borderColor: "white",
                            }}
                          >
                            <i
                              class="fa fa-ellipsis-h project-list-three-dot"
                              aria-hidden="true"
                            ></i>
                          </DropdownToggle>
                          <DropdownMenu>
                            <DropdownItem
                              style={{ outline: "none" }}
                              className="myLink"
                              tag={Link}
                              to={
                                "/managerapp/project/edit/" + project.ProjectId
                              }
                            >
                              Edit
                            </DropdownItem>

                            <DropdownItem
                              onClick={() => {
                                if (
                                  window.confirm(
                                    "Are you sure you want to duplicate this project?"
                                  )
                                ) {
                                  this.handleDuplicateProject(
                                    project.ProjectId
                                  );
                                }
                              }}
                            >
                              Duplicate Project
                            </DropdownItem>
                            <DropdownItem
                              onClick={() => {
                                if (
                                  window.confirm(
                                    "Are you sure you want to delete this project? This action cannot be undone."
                                  )
                                ) {
                                  this.handleRemoveProject(project.ProjectId);
                                }
                              }}
                            >
                              Delete Project
                            </DropdownItem>
                            <DropdownItem
                              onClick={() => {
                                if (
                                  window.confirm(
                                    "Are you sure you want to mark this project complete?"
                                  )
                                )
                                  this.handleValueChange(
                                    project.ProjectId,
                                    project.Name
                                  );
                              }}
                            >
                              Mark Complete
                            </DropdownItem>
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </Colxx>
                    </Row>
                    <br></br>
                    <Row>
                      <Colxx xxs="1" md="1" sm="1" lg="2"></Colxx>
                      <Colxx xxs="8" md="8" sm="8" lg="8">
                        <Row>
                          <div className="project-list-completed-div">
                            <span>{project.Complete}</span>
                          </div>

                          <div className="project-list-inprogress-div">
                            <span>{project.InProgress}</span>
                          </div>

                          <div className="project-list-stuck-div">
                            <span>{project.Stuck}</span>
                          </div>
                        </Row>
                      </Colxx>
                    </Row>
                    <br></br>
                    <br></br>
                  </CardBody>
                </Card>
              }
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

    // if (this.props.projectList) {
    //   if (this.props.projectCount > 0) {
    //     let Title = [];

    //     for (let i = 0; i < this.props.projectCount; i++) {
    //       Title.push(
    //         <Colxx md="12" sm="12" lg="6" xxs="12" xl="4">
    //           {
    //             <NavLink
    //               to={
    //                 "/managerapp/project/edit/" +
    //                 this.props.projectList[i].ProjectId
    //               }
    //             >
    //               <Card>
    //                 <Card
    //                   style={{
    //                     background: "#03CBAE",
    //                     height: "6px",
    //                     marginTop: "-6px",
    //                   }}
    //                 ></Card>
    //                 <CardBody style={{ padding: "0.5rem" }}>
    //                   <Row>
    //                     <Colxx xxs="2" md="2" sm="2" lg="2" xl="2">
    //                       <img
    //                         style={{ width: "40px", height: "40px" }}
    //                         src="/assets/img/project_card_icons.png"
    //                         alt="project_card_icon"
    //                       ></img>
    //                     </Colxx>
    //                     <Colxx xxs="10" md="10" sm="10" lg="10">
    //                       <NavLink
    //                         to={
    //                           "/managerapp/project/edit/" +
    //                           this.props.projectList[i].ProjectId
    //                         }
    //                       >
    //                         <CardSubtitle
    //                           style={{
    //                             fontSize: "16px",
    //                             fontWeight: "bold",
    //                             marginLeft: "20px",
    //                             marginTop: "4px",
    //                           }}
    //                           className="truncate mb-1"
    //                         >
    //                           {this.props.projectList[i].Name}
    //                         </CardSubtitle>
    //                       </NavLink>
    //                       <CardText
    //                         style={{
    //                           fontSize: "13px",
    //                           marginLeft: "20px",
    //                         }}
    //                         className="text-muted text-small mb-2"
    //                       >
    //                         Due{" "}
    //                         {formatDateTime(this.props.projectList[i].DueDate)}
    //                       </CardText>
    //                     </Colxx>
    //                   </Row>
    //                   <br></br>
    //                   <br></br>
    //                   <Row>
    //                     <Colxx xxs="6" md="6" sm="6" lg="6">
    //                       <Link
    //                         to={
    //                           "/managerapp/project/edit/" +
    //                           this.props.projectList[i].ProjectId
    //                         }
    //                         style={{
    //                           cursor: "pointer",
    //                           color: "#03CBAE",
    //                           fontSize: "15px",
    //                           marginLeft: "12px",
    //                           textDecoration: "underline",
    //                         }}
    //                       >
    //                         Edit
    //                       </Link>
    //                     </Colxx>
    //                     <Colxx xxs="6" md="6" sm="6" lg="6">
    //                       <Link
    //                         style={{
    //                           cursor: "pointer",
    //                           color: "#03CBAE",
    //                           float: "right",
    //                           fontSize: "15px",
    //                           marginRight: "12px",
    //                           textDecoration: "underline",
    //                         }}
    //                         onClick={() => {
    //                           if (
    //                             window.confirm(
    //                               "Are you sure you want to delete this project? This action cannot be undone"
    //                             )
    //                           ) {
    //                             this.handleRemoveProject(
    //                               this.props.projectList[i].ProjectId
    //                             );
    //                           }
    //                         }}
    //                       >
    //                         Delete
    //                       </Link>
    //                     </Colxx>
    //                   </Row>
    //                   <br></br>
    //                   <Row>
    //                     <Colxx xxs="4" md="4" sm="4" lg="4">
    //                       <div className="project-list-completed-div">
    //                         <span style={{ color: "#46bfa5" }}>
    //                           107 Completed
    //                         </span>
    //                       </div>
    //                     </Colxx>
    //                     <Colxx xxs="4" md="4" sm="4" lg="4">
    //                       <div className="project-list-inprogress-div">
    //                         <span style={{ color: "#ffa705" }}>
    //                           1000 In Progress
    //                         </span>
    //                       </div>
    //                     </Colxx>
    //                     <Colxx xxs="4" md="4" sm="4" lg="4">
    //                       <div className="project-list-stuck-div">
    //                         <span style={{ color: "#e01a4f" }}>100 Stuck</span>
    //                       </div>
    //                     </Colxx>
    //                   </Row>
    //                 </CardBody>
    //               </Card>

    //             </NavLink>
    //           }
    //           <br></br>
    //         </Colxx>

    //       );
    //     }
    //     table.push(<Row>{Title}</Row>);
    //   }
    // }
    return table;
  };
  renderCompletedProjectList = () => {
    let table = [];
    let Title = [];
    {
      this.props.completedProjectList.length > 0 ? (
        this.props.completedProjectList.map((project) => {
          return Title.push(
            <Colxx md="12" sm="12" lg="6" xxs="12" xl="4">
              {
                <Card>
                  <Card
                    style={{
                      background: "#03CBAE",
                      height: "6px",
                      marginTop: "-6px",
                    }}
                  ></Card>
                  <CardBody style={{ padding: "0.5rem" }}>
                    <Row>
                      <Colxx xxs="12" md="2" sm="2" lg="2" xl="2">
                        <img
                          style={{ width: "40px", height: "40px" }}
                          src="/assets/img/project_card_icons.png"
                          alt="project_card_icon"
                        ></img>
                      </Colxx>
                      <Colxx xxs="10" md="8" sm="8" lg="8">
                        <NavLink
                          to={"/managerapp/project/edit/" + project.ProjectId}
                        >
                          <CardSubtitle
                            style={{
                              fontSize: "16px",
                              fontWeight: "bold",
                            }}
                            className="truncate mb-1"
                          >
                            {project.Name}
                          </CardSubtitle>
                        </NavLink>
                        <CardText
                          style={{
                            fontSize: "13px",
                          }}
                          className="text-muted text-small mb-2"
                        >
                          Due {formatDateTime(project.DueDate)}
                        </CardText>
                      </Colxx>
                      <Colxx xxs="2" md="2" sm="2" lg="2" className="paddding">
                        <UncontrolledDropdown>
                          <DropdownToggle
                            className="project-list-toggle padd"
                            style={{
                              backgroundColor: "white",
                              color: "grey",
                              borderColor: "white",
                            }}
                          >
                            <i
                              class="fa fa-ellipsis-h project-list-three-dot"
                              aria-hidden="true"
                            ></i>
                          </DropdownToggle>
                          <DropdownMenu>
                            <DropdownItem
                              style={{ outline: "none" }}
                              className="myLink"
                              tag={Link}
                              to={
                                "/managerapp/project/edit/" + project.ProjectId
                              }
                            >
                              Edit
                            </DropdownItem>

                            <DropdownItem
                              onClick={() => {
                                if (
                                  window.confirm(
                                    "Are you sure you want to re-activate this project?"
                                  )
                                ) {
                                  this.handleReActivateProject(
                                    project.ProjectId,
                                    project.Name
                                  );
                                }
                              }}
                            >
                              Re-activate Project
                            </DropdownItem>
                            <DropdownItem
                              onClick={() => {
                                if (
                                  window.confirm(
                                    "Are you sure you want to delete this project? This action cannot be undone."
                                  )
                                ) {
                                  this.handleRemoveProject(project.ProjectId);
                                }
                              }}
                            >
                              Delete Project
                            </DropdownItem>
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </Colxx>
                    </Row>
                    <br></br>
                    <Row>
                      <Colxx xxs="1" md="1" sm="1" lg="2"></Colxx>
                      <Colxx xxs="8" md="8" sm="8" lg="8">
                        <Row>
                          <div className="project-list-completed-div">
                            <span>{project.Complete}</span>
                          </div>

                          <div className="project-list-inprogress-div">
                            <span>{project.InProgress}</span>
                          </div>

                          <div className="project-list-stuck-div">
                            <span>{project.Stuck}</span>
                          </div>
                        </Row>
                      </Colxx>
                    </Row>
                    <br></br>
                    <br></br>
                  </CardBody>
                </Card>
              }
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
  handleRemoveProject = (projectid) => {
    this.props.managerDeleteProject(projectid);
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
      this.props.getProjectList({
        orgid: this.props.currentUser.organization.id,
        user_id: this.props.currentUser.UserId,
        sort_dir: this.state.sort_dir,
        sort_type: this.state.sort_type,
        limit_size: constants.DEFAULT_LIMIT_SIZE,
        limit_start: 0,
      });
    });
    this.setState({ selectedButton: sort_type });
  };
  handlePageClick = (data) => {
    this.setState({ currentPage: data });
    let selected = data - 1;
    // alert(data)
    let offset = Math.ceil(selected * constants.DEFAULT_LIMIT_SIZE);
    this.props.getProjectList({
      orgid: this.props.currentUser.organization.id,
      user_id: this.props.currentUser.UserId,
      sort_dir: this.state.sort_dir,
      sort_type: this.state.sort_type,
      limit_size: constants.DEFAULT_LIMIT_SIZE,
      limit_start: offset,
    });
  };
  handleCompletePageClick = (data) => {
    this.setState({ completedProjectCurrentPage: data });
    let selected = data - 1;
    let offset = Math.ceil(selected * constants.DEFAULT_LIMIT_SIZE);
    this.props.getManagerCompletedProjectList({
      orgid: this.props.currentUser.organization.id,
      search_text: this.state.searchText,
      user_id: this.props.currentUser.UserId,
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
                Project Board
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
                    Your Projects
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
                    Completed Projects
                  </NavLink>
                </NavItem>
              </Nav>
              {/* <Separator className="mb-5" /> */}
            </Colxx>
          </Row>
          <TabContent activeTab={this.state.activeFirstTab}>
            <TabPane tabId="1">
              <Row>
                <Colxx xxs="12" className="mb-4">
                  <CardBody style={{ padding: "0.75rem", marginLeft: "-11px" }}>
                    <CardTitle style={{ marginBottom: "0.65rem" }}>
                      <IntlMessages id="Sort by" />
                      <Button
                        onClick={this.openAddNewProjectSubmissionModal}
                        outline
                        color="primary"
                        className="mb-2 add_project"
                        style={{ float: "right" }}
                      >
                        <IntlMessages id="Add" />
                      </Button>
                    </CardTitle>

                    <CardTitle style={{ marginBottom: "0.65rem" }}>
                      <Button
                        style={{
                          backgroundColor:
                            this.state.selectedButton === "name"
                              ? "#17B298"
                              : "white",
                          color:
                            this.state.selectedButton === "name"
                              ? "white"
                              : "#17B298",
                          borderRadius: "0px",
                          padding: "0.3rem 0.5rem 0.3rem 0.5rem",
                        }}
                        outline
                        color="primary"
                        className="mb-2"
                        onClick={() => this.handleSort("name")}
                      >
                        <IntlMessages id="Name" />
                        <span
                          style={{
                            fontSize: "19px",
                            marginLeft: "7px",
                            fontSize: "12px",
                          }}
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
                      </Button>{" "}
                      <Button
                        style={{
                          backgroundColor:
                            this.state.selectedButton === "due_date"
                              ? "#17B298"
                              : "white",
                          color:
                            this.state.selectedButton === "due_date"
                              ? "white"
                              : "#17B298",
                          borderRadius: "0px",
                          padding: "0.3rem 0.5rem 0.3rem 0.5rem",
                        }}
                        outline
                        color="primary"
                        className="mb-2"
                        onClick={() => this.handleSort("due_date")}
                      >
                        <IntlMessages id="Due Date" />
                        <span
                          style={{
                            fontSize: "19px",
                            marginLeft: "7px",
                            fontSize: "12px",
                          }}
                          className={cn({
                            "fa fa-sort": this.state.sort_type !== "due_date",
                            "fa fa-sort-asc":
                              this.state.sort_type === "due_date" &&
                              this.state.sort_dir === "asc",
                            "fa fa-sort-desc":
                              this.state.sort_type === "due_date" &&
                              this.state.sort_dir === "desc",
                            "fa fa-sort": true,
                          })}
                          onClick={() => this.handleSort("due_date")}
                        ></span>
                      </Button>{" "}
                      <Button
                        style={{
                          backgroundColor:
                            this.state.selectedButton === "created_on"
                              ? "#17B298"
                              : "white",
                          color:
                            this.state.selectedButton === "created_on"
                              ? "white"
                              : "#17B298",
                          borderRadius: "0px",
                          padding: "0.3rem 0.5rem 0.3rem 0.5rem",
                        }}
                        outline
                        color="primary"
                        className="mb-2"
                        onClick={() => this.handleSort("created_on")}
                      >
                        <IntlMessages id=" Created on Date" />
                        <span
                          style={{
                            fontSize: "19px",
                            marginLeft: "7px",
                            fontSize: "12px",
                          }}
                          className={cn({
                            "fa fa-sort": this.state.sort_type !== "created_on",
                            "fa fa-sort-asc":
                              this.state.sort_type === "created_on" &&
                              this.state.sort_dir === "asc",
                            "fa fa-sort-desc":
                              this.state.sort_type === "created_on" &&
                              this.state.sort_dir === "desc",
                            "fa fa-sort": true,
                          })}
                          onClick={() => this.handleSort("created_on")}
                        ></span>
                      </Button>{" "}
                    </CardTitle>
                    {/* </Colxx> */}
                  </CardBody>
                  {/* </Card> */}
                </Colxx>
              </Row>
              <br></br>
              {this.renderProjectList()}
              {this.props.projectCount >= constants.DEFAULT_LIMIT_SIZE && (
                <Pagination
                  currentPage={this.state.currentPage}
                  totalPage={this.props.pageCount}
                  onChangePage={(i) => this.handlePageClick(i)}
                />
              )}
            </TabPane>
            <TabPane tabId="2">
              {this.renderCompletedProjectList()}
              {this.props.completedProjectCount >=
                    constants.DEFAULT_LIMIT_SIZE && (
                    <CompletedProjectPagination
                      completedProjectCurrentPage={
                        this.state.completedProjectCurrentPage
                      }
                      totalPage={this.props.pageCountCompletedProject}
                      onChangePage={(i) => this.handleCompletePageClick(i)}
                    />
                  )}
              </TabPane>
          </TabContent>
        </Fragment>
        <AddProjectPopUpForm
          onSubmit={this.submit}
          dispatch={this.props.dispatch}
          onRequestClose={this.closeProjectSubmissionModal}
          modalStatus={this.state.addProjectModal}
          currentUser={this.props.currentUser}
        />
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    currentUser: state.userReducer.currentUser,
    projectList: state.projectReducer.projectList,
    projectCount: state.projectReducer.projectCount,
    pageCount: Math.ceil(
      state.projectReducer.projectCount / constants.DEFAULT_LIMIT_SIZE
    ),
    completedProjectList: state.projectReducer.completedProjectList,
    completedProjectCount: state.projectReducer.completedProjectCount,
    pageCountCompletedProject: Math.ceil(
      state.projectReducer.completedProjectCount / constants.DEFAULT_LIMIT_SIZE
    ),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getProjectList: (filterObj) => {
      dispatch(getProjectList(filterObj));
    },
    addProject: (values, callback) => {
      dispatch(addProject(values, callback));
    },
    managerDeleteProject: (projectid) => {
      dispatch(managerDeleteProject(projectid));
    },
    createManagerDuplicateProject: (values, callback) => {
      dispatch(createManagerDuplicateProject(values, callback));
    },
    checkCompleteProjectBoard: (projectId, values) => {
      dispatch(checkCompleteProjectBoard(projectId, values));
    },
    reActivateCompleteProject: (values, callback) => {
      dispatch(reActivateCompleteProject(values, callback));
    },
    getManagerCompletedProjectList: (filterObj) => {
      dispatch(getManagerCompletedProjectList(filterObj));
    },
    dispatch: dispatch,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(projectListForm);
