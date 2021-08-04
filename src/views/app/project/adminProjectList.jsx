import React, { Component, Fragment } from "react";
import {
  Row,
  Card,
  CardBody,
  CardSubtitle,
  // CardImg,
  CardText,
  Button,
  Nav,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
  TabContent,
  TabPane,
  // Badge,
  CardTitle,
} from "reactstrap";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import cn from "classnames";
import classnames from "classnames";

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
  addAdminProject,
  getAdminProjectList,
  getAllProjectList,
  adminDeleteProject,
  checkCompleteProjectBoard,
  getCompletedProjectList,
  createDuplicateProject,
  createEditOtherDuplicateProject,
  reActivateCompleteProject,
} from "../../../../src/action/admin/admin";
import AddAdminProjectPopUpForm from "./addAdminProjectPopUpForm";
import { formatDateTime } from "../../../utils/globalFunctions";
import * as constants from "../../../utils/constants";
import Pagination from "../../../containers/pages/Pagination";
import EditOtherProjectPagination from "../../../containers/pages/EditOtherProjectPagination";
import CompletedProjectPagination from "../../../containers/pages/CompletedProjectPagination";

/* eslint-disable */

// import { Checkbox } from "@material-ui/core";
// import { withStyles } from "@material-ui/core/styles";
// import { green } from "@material-ui/core/colors";

// const GreenCheckbox = withStyles({
//   root: {
//     color: green[400],
//     "&$checked": {
//       color: green[600],
//     },
//   },
//   checked: {},
// })((props) => <Checkbox color="default" {...props} />);
class adminProjectListForm extends Component {
  constructor(props) {
    super(props);
    this.toggleUpperTab = this.toggleUpperTab.bind(this);

    this.state = {
      addProjectModal: false,
      formError: [],
      activeFirstTab: "1",
      sort_dir: null,
      sort_type: null,

      checkBoxValue: [],
      open: null,
      dropdownOpen: false,
    };
  }
  toggle = (prevState) => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
  };
  handleClick = (event) => {
    this.setState({
      open: event.currentTarget,
    });
    
  };

  handleClose = () => {
    this.setState({
      open: null,
    });
  };
  handleValueChange(projectId, projectName) {
    // var newCheck = [...this.state.checkBoxValue];
    // if (newCheck.includes(index)) {
    //   newCheck.splice(newCheck.indexOf(index), 1);
    // } else newCheck.push(index);
    // this.setState({
    //   checkBoxValue: newCheck,
    // });
    this.props.checkCompleteProjectBoard({
      projectId: projectId,
      name: projectName,
      status: 2,
    });
   
  }

  toggleUpperTab(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeFirstTab: tab,
      });
    }
  }
  componentDidMount() {
    var tabname = this.props.location.pathname.substring(
      this.props.location.pathname.lastIndexOf("/") + 1,
      this.props.location.pathname.length
    );

    if (tabname === "2") {
      this.setState({
        activeFirstTab: "2",
      });
    } else if (tabname === "3") {
      this.setState({
        activeFirstTab: "3",
      });
    } else {
      this.setState({
        activeFirstTab: "1",
      });
    }

    var queryObj = {
      orgid: this.props.currentUser.organization.id,
      user_id: this.props.currentUser.UserId,
      search_text: this.state.searchText,
      limit_size: constants.DEFAULT_LIMIT_SIZE,
      limit_start: 0,
      sort_dir: this.state.sort_dir,
      sort_type: this.state.sort_type,
    };

    // if(query_params.intern_id){
    //     this.setState({userId: query_params.intern_id});
    //     queryObj.user_id = query_params.intern_id;
    // }

    this.props.getAdminProjectList(queryObj);
    this.props.getAllProjectList(queryObj);
    this.props.getCompletedProjectList(queryObj);
  }
  handleAdminPageClick = (data) => {
    this.setState({ currentPage: data });
    let selected = data - 1;
    // alert(data)
    let offset = Math.ceil(selected * constants.DEFAULT_LIMIT_SIZE);
    this.props.getAdminProjectList({
      orgid: this.props.currentUser.organization.id,
      search_text: this.state.searchText,
      user_id: this.props.currentUser.UserId,
      limit_size: constants.DEFAULT_LIMIT_SIZE,
      limit_start: offset,
      sort_dir: this.state.sort_dir,
      sort_type: this.state.sort_type,
    });
  };
  handleEditOtherPageClick = (data) => {
    this.setState({ editOtherCurrentPage: data });
    let selected = data - 1;
    let offset = Math.ceil(selected * constants.DEFAULT_LIMIT_SIZE);
    this.props.getAllProjectList({
      orgid: this.props.currentUser.organization.id,
      search_text: this.state.searchText,
      user_id: this.props.currentUser.UserId,
      limit_size: constants.DEFAULT_LIMIT_SIZE,
      limit_start: offset,
      sort_dir: this.state.sort_dir,
      sort_type: this.state.sort_type,
    });
  };
  handleCompletePageClick = (data) => {
    this.setState({ completedProjectCurrentPage: data });
    let selected = data - 1;
    let offset = Math.ceil(selected * constants.DEFAULT_LIMIT_SIZE);
    this.props.getCompletedProjectList({
      orgid: this.props.currentUser.organization.id,
      search_text: this.state.searchText,
      user_id: this.props.currentUser.UserId,
      limit_size: constants.DEFAULT_LIMIT_SIZE,
      limit_start: offset,
    });
  };
  handleYourProjectTextSearchChange = (event) => {
    this.setState({ searchText: event.target.value }, function () {
      this.props.getAdminProjectList({
        orgid: this.props.currentUser.organization.id,
        search_text: this.state.searchText,
        user_id: this.props.currentUser.UserId,
        limit_size: constants.DEFAULT_LIMIT_SIZE,
        limit_start: 0,
        // sort_dir: this.state.sort_dir,
        // sort_type: this.state.sort_type,
      });
    });
  };
  handleTextSearchChange = (event) => {
    this.setState({ searchText: event.target.value }, function () {
      this.props.getAllProjectList({
        orgid: this.props.currentUser.organization.id,
        search_text: this.state.searchText,
        user_id: this.props.currentUser.UserId,
        limit_size: constants.DEFAULT_LIMIT_SIZE,
        limit_start: 0,
      });
    });
  };
  handleCompletedProjectTextSearchChange = (event) => {
    this.setState({ searchText: event.target.value }, function () {
      this.props.getCompletedProjectList({
        orgid: this.props.currentUser.organization.id,
        search_text: this.state.searchText,
        user_id: this.props.currentUser.UserId,
        limit_size: constants.DEFAULT_LIMIT_SIZE,
        limit_start: 0,
      });
    });
  };
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
    this.props.addAdminProject(values, this.closeProjectSubmissionModal);
  };

  setFormError = (errors) => {
    this.setState({ formError: errors });
  };
  renderProjectList = () => {
    let table = [];
    let Title = [];
    {
      this.props.adminProjectList.length > 0 ? (
        this.props.adminProjectList.map((project) => {
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
                  <CardBody style={{ padding: "1em" }}>
                    <Row>
                      <Colxx xxs="12" md="2" sm="2" lg="2" xl="2">
                        <img
                          style={{ width: "40px", height: "40px" }}
                          src="/assets/img/project_card_icons.png"
                          alt="project_card_icon"
                        ></img>
                      </Colxx>
                      <Colxx xxs="10" md="8" sm="8" lg="8">
                        <NavLink to={"/app/project/edit/" + project.ProjectId}>
                          <CardSubtitle
                            style={{
                              fontSize: "16px",
                              fontWeight: "bold",
                              // marginLeft: "20px",
                              // marginTop: "4px",
                            }}
                            className="truncate mb-1 magin"
                          >
                            {project.Name}
                          </CardSubtitle>
                        </NavLink>
                        <CardText
                          style={{
                            fontSize: "13px",
                            // marginLeft: "20px",
                          }}
                          className="text-muted text-small mb-2"
                        >
                          Due {formatDateTime(project.DueDate)}
                        </CardText>
                      </Colxx>
                      <Colxx xxs="2" md="2" sm="2" lg="2" className="paddding">
                        <UncontrolledDropdown
                        // style={{ marginLeft: "-8px", marginTop: "-10px" }}
                        >
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
                              // style={{ fontSize: "22px" }}
                            ></i>
                          </DropdownToggle>
                          <DropdownMenu>
                            <DropdownItem
                              style={{ outline: "none" }}
                              className="myLink"
                              tag={Link}
                              to={"/app/project/edit/" + project.ProjectId}
                            >
                              Edit
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
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </Colxx>
                    </Row>
                    <br></br>
                    <Row>
                      <Colxx
                        xxs="1"
                        md="2"
                        sm="1"
                        lg="2"
                        className="dissabled"
                      ></Colxx>
                      <Colxx xxs="8" md="8" sm="8" lg="8">
                        <Row>
                          <div className="project-list-completed-div">
                            <span>{project.Complete}</span>
                          </div>
                          {/* </Colxx>
                      <Colxx xxs="2" md="2" sm="2" lg="2"> */}
                          <div className="project-list-inprogress-div">
                            <span>{project.InProgress}</span>
                          </div>
                          {/* </Colxx>
                      <Colxx xxs="2" md="2" sm="2" lg="2"> */}
                          <div className="project-list-stuck-div">
                            <span>{project.Stuck}</span>
                          </div>
                        </Row>
                      </Colxx>
                    </Row>
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
  renderAllProjectList = () => {
    let table = [];
    let Title = [];
    {
      this.props.allOrgProjectList.length > 0 ? (
        this.props.allOrgProjectList.map((allOrgproject) => {
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
                  <CardBody style={{ padding: "1em" }}>
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
                          to={"/app/project/edit/" + allOrgproject.ProjectId}
                        >
                          <CardSubtitle
                            style={{
                              fontSize: "16px",
                              fontWeight: "bold",
                              // marginLeft: "20px",
                              // marginTop: "4px",
                            }}
                            className="truncate mb-1 magin"
                          >
                            {allOrgproject.ProjectName}
                          </CardSubtitle>
                        </NavLink>
                        <CardText
                          style={{
                            fontSize: "13px",
                            // marginLeft: "20px",
                          }}
                          className="text-muted text-small mb-2"
                        >
                          Due {formatDateTime(allOrgproject.DueDate)}
                        </CardText>
                        <CardText
                          style={{
                            fontSize: "13px",
                            // marginLeft: "20px",
                          }}
                          className="text-muted text-small mb-2"
                        >
                          Created By{" "}
                          <span style={{ color: "#17b298" }}>
                            {allOrgproject.CreatedBy}
                          </span>
                        </CardText>
                      </Colxx>
                      <Colxx xxs="12" md="2" sm="2" lg="2" className="paddding">
                        <UncontrolledDropdown
                        // style={{ marginLeft: "-8px", marginTop: "-10px" }}
                        >
                          <DropdownToggle
                            className="project-list-toggle-edit-other padd"
                            style={{
                              backgroundColor: "white",
                              color: "grey",
                              borderColor: "white",
                            }}
                          >
                            <i
                              class="fa fa-ellipsis-h project-list-three-dot"
                              aria-hidden="true"
                              // style={{ fontSize: "22px" }}
                            ></i>
                          </DropdownToggle>
                          <DropdownMenu>
                            <DropdownItem
                              style={{ outline: "none" }}
                              className="myLink"
                              tag={Link}
                              to={
                                "/app/project/edit/" + allOrgproject.ProjectId
                              }
                            >
                              Edit
                            </DropdownItem>
                            {/* <DropdownItem
                              onClick={() => {
                                if (
                                  window.confirm(
                                    "Are you sure you want to mark this project complete?"
                                  )
                                )
                                  this.handleValueChange(
                                    i,
                                    allOrgproject.ProjectId,
                                    allOrgproject.Name
                                  );
                              }}
                            >
                              Mark Complete
                            </DropdownItem>
                            */}
                            <DropdownItem
                              onClick={() => {
                                if (
                                  window.confirm(
                                    "Are you sure you want to duplicate this project?"
                                  )
                                ) {
                                  this.handleAllOrgProjectDuplicateProject(
                                    allOrgproject.ProjectId
                                  );
                                }
                              }}
                            >
                              Duplicate Project
                            </DropdownItem>
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </Colxx>
                    </Row>
                    <br></br>
                    <Row>
                      <Colxx
                        xxs="1"
                        md="2"
                        sm="1"
                        lg="2"
                        className="dissabled"
                      ></Colxx>
                      <Colxx xxs="8" md="8" sm="8" lg="8">
                        <Row>
                          <div className="project-list-completed-div">
                            <span>{allOrgproject.Complete}</span>
                          </div>
                          {/* </Colxx>
                      <Colxx xxs="2" md="2" sm="2" lg="2"> */}
                          <div className="project-list-inprogress-div">
                            <span>{allOrgproject.InProgress}</span>
                          </div>
                          {/* </Colxx>
                      <Colxx xxs="2" md="2" sm="2" lg="2"> */}
                          <div className="project-list-stuck-div">
                            <span>{allOrgproject.Stuck}</span>
                          </div>
                        </Row>
                      </Colxx>
                    </Row>
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

    // if (this.props.allOrgProjectList) {
    //   if (this.props.allOrgProjectCount > 0) {
    //     let Title = [];

    //     for (let i = 0; i < this.props.allOrgProjectCount; i++) {
    //       Title.push(
    //         <Colxx md="12" sm="12" lg="6" xxs="12" xl="4">
    //           {
    //             <Card>
    //               <Card
    //                 style={{
    //                   background: "#03CBAE",
    //                   height: "18px",
    //                   marginTop: "-6px",
    //                 }}
    //               ></Card>

    //               <CardBody style={{ padding: "1em" }}>
    //                 <Row>
    //                   <Colxx xxs="10" md="1" sm="1" lg="1" xl="1">
    //                     <img
    //                       style={{ width: "40px", height: "40px" }}
    //                       src="/assets/img/project_card_icons.png"
    //                       alt="project_card_icon"
    //                     ></img>
    //                   </Colxx>
    //                   <Colxx xxs="8" md="8" sm="8" lg="8">
    //                     <NavLink
    //                       to={
    //                         "/app/project/view/" +
    //                         this.props.allOrgProjectList[i].ProjectId
    //                       }
    //                     >
    //                       <CardSubtitle
    //                         style={{
    //                           fontSize: "16px",
    //                           fontWeight: "bold",
    //                           marginLeft: "20px",
    //                           marginTop: "4px",
    //                         }}
    //                         className="truncate mb-1"
    //                       >
    //                         {this.props.allOrgProjectList[i].ProjectName}
    //                       </CardSubtitle>
    //                     </NavLink>

    //                     <CardText
    //                       style={{
    //                         fontSize: "13px",
    //                         marginLeft: "20px",
    //                       }}
    //                       className="text-muted text-small mb-2"
    //                     >
    //                       Due{" "}
    //                       {formatDateTime(
    //                         this.props.allOrgProjectList[i].DueDate
    //                       )}
    //                     </CardText>
    //                     <CardText
    //                       style={{
    //                         fontSize: "13px",
    //                         marginLeft: "20px",
    //                       }}
    //                       className="text-muted text-small mb-2"
    //                     >
    //                       Created By{" "}
    //                       <span style={{ color: "#17b298" }}>
    //                         {this.props.allOrgProjectList[i].CreatedBy}
    //                       </span>
    //                     </CardText>
    //                   </Colxx>
    //                   <Colxx xxs="12" md="2" sm="2" lg="2">
    //                     <UncontrolledDropdown
    //                       style={{ marginLeft: "-8px", marginTop: "-10px" }}
    //                     >
    //                       <DropdownToggle
    //                         className="project-list-toggle-edit-other"
    //                         style={{
    //                           backgroundColor: "white",
    //                           color: "grey",
    //                           borderColor: "white",
    //                         }}
    //                       >
    //                         <i
    //                           class="fa fa-ellipsis-h project-list-three-dot"
    //                           aria-hidden="true"
    //                           // style={{ fontSize: "22px" }}
    //                         ></i>
    //                       </DropdownToggle>
    //                       <DropdownMenu>
    //                         <DropdownItem
    //                           style={{ outline: "none" }}
    //                           className="myLink"
    //                           tag={Link}
    //                           to={
    //                             "/app/project/edit/" +
    //                             this.props.allOrgProjectList[i].ProjectId
    //                           }
    //                         >
    //                           Edit
    //                         </DropdownItem>
    //                         {/* <DropdownItem
    //                           onClick={() => {
    //                             if (
    //                               window.confirm(
    //                                 "Are you sure you want to mark this project complete?"
    //                               )
    //                             )
    //                               this.handleValueChange(
    //                                 i,
    //                                 this.props.allOrgProjectList[i].ProjectId,
    //                                 this.props.allOrgProjectList[i].Name
    //                               );
    //                           }}
    //                         >
    //                           Mark Complete
    //                         </DropdownItem>
    //                         */}
    //                         <DropdownItem
    //                           onClick={() => {
    //                             if (
    //                               window.confirm(
    //                                 "Are you sure you want to duplicate this project?"
    //                               )
    //                             ) {
    //                               this.handleAllOrgProjectDuplicateProject(
    //                                 this.props.allOrgProjectList[i].ProjectId
    //                               );
    //                             }
    //                           }}
    //                         >
    //                           Duplicate Project
    //                         </DropdownItem>
    //                       </DropdownMenu>
    //                     </UncontrolledDropdown>
    //                   </Colxx>
    //                 </Row>
    //                 <br></br>
    //                 <Row>
    //                   <Colxx xxs="4" md="4" sm="4" lg="4">
    //                     <div className="project-list-completed-div">
    //                       <span>
    //                         107{" "}
    //                         <span>
    //                           <img
    //                             src="/assets/img/project-rectangle.png"
    //                             style={{
    //                               width: "1px",
    //                               height: "16px",
    //                               borderRadius: "2px",
    //                             }}
    //                           ></img>
    //                         </span>{" "}
    //                         Completed
    //                       </span>
    //                     </div>
    //                   </Colxx>
    //                   <Colxx xxs="4" md="4" sm="4" lg="4">
    //                     <div className="project-list-inprogress-div">
    //                       <span>
    //                         1000{" "}
    //                         <span>
    //                           <img
    //                             src="/assets/img/project-rectangle1.png"
    //                             style={{
    //                               width: "1px",
    //                               height: "16px",
    //                               borderRadius: "2px",
    //                             }}
    //                           ></img>
    //                         </span>{" "}
    //                         In-Progress
    //                       </span>
    //                     </div>
    //                   </Colxx>
    //                   <Colxx xxs="4" md="4" sm="4" lg="4">
    //                     <div className="project-list-stuck-div">
    //                       <span>
    //                         100{" "}
    //                         <span>
    //                           <img
    //                             src="/assets/img/project-rectangle2.png"
    //                             style={{
    //                               width: "1px",
    //                               height: "16px",
    //                               borderRadius: "2px",
    //                             }}
    //                           ></img>
    //                         </span>{" "}
    //                         Stuck
    //                       </span>
    //                     </div>
    //                   </Colxx>
    //                 </Row>

    //                 <br></br>
    //                 {/* <Row>
    //                   <Colxx xxs="12" md="12" sm="12" lg="12">
    //                     <Link
    //                       to={
    //                         "/app/project/view/" +
    //                         this.props.allOrgProjectList[i].ProjectId
    //                       }
    //                       style={{
    //                         cursor: "pointer",
    //                         color: "#03CBAE",
    //                         fontSize: "15px",
    //                         marginLeft: "12px",
    //                         textDecoration: "underline",
    //                       }}
    //                     >
    //                       View
    //                     </Link>
    //                   </Colxx>
    //                   <Colxx xxs="6" md="6" sm="6" lg="6"></Colxx>
    //                 </Row>
    //               */}
    //               </CardBody>
    //             </Card>
    //           }
    //           <br></br>
    //         </Colxx>
    //       );
    //     }
    //     table.push(<Row>{Title}</Row>);
    //   }
    // }
    table.push(<Row>{Title}</Row>);
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
                  <CardBody style={{ padding: "1em" }}>
                    <Row>
                      <Colxx xxs="12" md="2" sm="2" lg="2" xl="2">
                        <img
                          style={{ width: "40px", height: "40px" }}
                          src="/assets/img/project_card_icons.png"
                          alt="project_card_icon"
                        ></img>
                      </Colxx>
                      <Colxx xxs="10" md="8" sm="8" lg="8">
                        <NavLink to={"/app/project/edit/" + project.ProjectId}>
                          <CardSubtitle
                            style={{
                              fontSize: "16px",
                              fontWeight: "bold",
                              // marginLeft: "20px",
                              // marginTop: "4px",
                            }}
                            className="truncate mb-1 magin"
                          >
                            {project.Name}
                          </CardSubtitle>
                        </NavLink>
                        <CardText
                          style={{
                            fontSize: "13px",
                            // marginLeft: "20px",
                          }}
                          className="text-muted text-small mb-2"
                        >
                          Due {formatDateTime(project.DueDate)}
                        </CardText>
                      </Colxx>
                      <Colxx xxs="12" md="2" sm="2" lg="2" className="paddding">
                        <UncontrolledDropdown
                        // style={{ marginLeft: "-8px", marginTop: "-10px" }}
                        >
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
                              // style={{ fontSize: "22px" }}
                            ></i>
                          </DropdownToggle>
                          <DropdownMenu>
                            <DropdownItem
                              style={{ outline: "none" }}
                              className="myLink"
                              tag={Link}
                              to={
                                "/app/project/complete/view/" +
                                project.ProjectId
                              }
                            >
                              View
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
                      <Colxx
                        xxs="1"
                        md="2"
                        sm="1"
                        lg="2"
                        className="dissabled"
                      ></Colxx>
                      <Colxx xxs="8" md="8" sm="8" lg="8">
                        <Row>
                          <div className="project-list-completed-div">
                            <span>{project.Complete}</span>
                          </div>
                          {/* </Colxx>
                      <Colxx xxs="2" md="2" sm="2" lg="2"> */}
                          <div className="project-list-inprogress-div">
                            <span>{project.InProgress}</span>
                          </div>
                          {/* </Colxx>
                      <Colxx xxs="2" md="2" sm="2" lg="2"> */}
                          <div className="project-list-stuck-div">
                            <span>{project.Stuck}</span>
                          </div>
                        </Row>
                      </Colxx>
                    </Row>
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
    // if (this.props.completedProjectList) {
    //   if (this.props.completedProjectCount > 0) {
    //     let Title = [];

    //     for (let i = 0; i < this.props.completedProjectCount; i++) {
    //       Title.push(
    //         <Colxx md="12" sm="12" lg="6" xxs="12" xl="4">
    //           <Card>
    //             <Card
    //               style={{
    //                 background: "#03CBAE",
    //                 height: "6px",
    //                 marginTop: "-6px",
    //               }}
    //             ></Card>
    //             <CardBody style={{ padding: "1em" }}>
    //               <Row>
    //                 <Colxx xxs="10" md="1" sm="1" lg="1" xl="1">
    //                   <img
    //                     style={{ width: "40px", height: "40px" }}
    //                     src="/assets/img/project_card_icons.png"
    //                     alt="project_card_icon"
    //                   ></img>
    //                 </Colxx>
    //                 <Colxx xxs="8" md="8" sm="8" lg="8">
    //                   <NavLink
    //                     to="#"
    //                     to={
    //                       "/app/project/complete/view/" +
    //                       this.props.completedProjectList[i].ProjectId
    //                     }
    //                   >
    //                     <CardSubtitle
    //                       style={{
    //                         fontSize: "16px",
    //                         fontWeight: "bold",
    //                         marginLeft: "20px",
    //                         marginTop: "4px",
    //                       }}
    //                       className="truncate mb-1"
    //                     >
    //                       {this.props.completedProjectList[i].Name}
    //                     </CardSubtitle>
    //                   </NavLink>
    //                   <CardText
    //                     style={{
    //                       fontSize: "13px",
    //                       marginLeft: "20px",
    //                     }}
    //                     className="text-muted text-small mb-2"
    //                   >
    //                     Due{" "}
    //                     {formatDateTime(
    //                       this.props.completedProjectList[i].DueDate
    //                     )}
    //                   </CardText>
    //                 </Colxx>
    //                 <Colxx xxs="12" md="2" sm="2" lg="2">
    //                   <UncontrolledDropdown
    //                   // style={{ marginLeft: "-8px", marginTop: "-10px" }}
    //                   >
    //                     <DropdownToggle
    //                       className="project-list-toggle padd"
    //                       style={{
    //                         backgroundColor: "white",
    //                         color: "grey",
    //                         borderColor: "white",
    //                       }}
    //                     >
    //                       <i
    //                         class="fa fa-ellipsis-h project-list-three-dot"
    //                         aria-hidden="true"
    //                         // style={{ fontSize: "22px" }}
    //                       ></i>
    //                     </DropdownToggle>
    //                     <DropdownMenu>
    //                       <DropdownItem
    //                         style={{ outline: "none" }}
    //                         className="myLink"
    //                         tag={Link}
    //                         to={
    //                           "/app/project/complete/view/" +
    //                           this.props.completedProjectList[i].ProjectId
    //                         }
    //                       >
    //                         View
    //                       </DropdownItem>
    //                       <DropdownItem
    //                         onClick={() => {
    //                           if (
    //                             window.confirm(
    //                               "Are you sure you want to re-activate this project?"
    //                             )
    //                           ) {
    //                             this.handleReActivateProject(
    //                               this.props.completedProjectList[i].ProjectId,
    //                               this.props.completedProjectList[i].Name
    //                             );
    //                           }
    //                         }}
    //                       >
    //                         Re-activate Project
    //                       </DropdownItem>
    //                       <DropdownItem
    //                         onClick={() => {
    //                           if (
    //                             window.confirm(
    //                               "Are you sure you want to delete this project? This action cannot be undone."
    //                             )
    //                           ) {
    //                             this.handleRemoveProject(
    //                               this.props.completedProjectList[i].ProjectId
    //                             );
    //                           }
    //                         }}
    //                       >
    //                         Delete Project
    //                       </DropdownItem>
    //                     </DropdownMenu>
    //                   </UncontrolledDropdown>
    //                 </Colxx>
    //               </Row>
    //               <br></br>
    //               <Row>
    //                 <Colxx xxs="4" md="4" sm="4" lg="4">
    //                   <div className="project-list-completed-div">
    //                     <span >
    //                       {107} Completed
    //                     </span>
    //                   </div>
    //                 </Colxx>
    //                 <Colxx xxs="4" md="4" sm="4" lg="4">
    //                   <div className="project-list-inprogress-div">
    //                     <span >10 In-Progress</span>
    //                   </div>
    //                 </Colxx>
    //                 <Colxx xxs="4" md="4" sm="4" lg="4">
    //                   <div className="project-list-stuck-div">
    //                     <span >10 Stuck</span>
    //                   </div>
    //                 </Colxx>
    //               </Row>
    //             </CardBody>
    //           </Card>
    //           <br></br>
    //         </Colxx>
    //       );
    //     }
    //     table.push(<Row>{Title}</Row>);
    //   }
    // }
  };
  handleRemoveProject = (projectid) => {
    this.props.adminDeleteProject(projectid);
    this.setState({
      open: null,
    });
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
    if(this.state.activeFirstTab ==='1')
    {
      this.setState({ sort_type: sort_type, sort_dir: sort_dir }, function () {
        this.props.getAdminProjectList({
          orgid: this.props.currentUser.organization.id,
          search_text: this.state.searchText,
          user_id: this.props.currentUser.UserId,
          sort_dir: this.state.sort_dir,
          sort_type: this.state.sort_type,
          limit_size: constants.DEFAULT_LIMIT_SIZE,
          limit_start: 0,
        });
      });
      this.setState({ selectedButton: sort_type });
    }
    else if(this.state.activeFirstTab ==='2'){
      this.setState({ sort_type: sort_type, sort_dir: sort_dir }, function () {
        this.props.getAllProjectList({
          orgid: this.props.currentUser.organization.id,
          search_text: this.state.searchText,
          user_id: this.props.currentUser.UserId,
          sort_dir: this.state.sort_dir,
          sort_type: this.state.sort_type,
          limit_size: constants.DEFAULT_LIMIT_SIZE,
          limit_start: 0,
        });
      });
      this.setState({ selectedButton: sort_type });
    }

  };
  handleDuplicateProject = (projectid) => {
    var queryObj = {
      orgid: this.props.currentUser.organization.id,
      user_id: this.props.currentUser.UserId,
      project_id: projectid,
    };
    this.props.createDuplicateProject(queryObj);
    this.setState({
      open: null,
    });
  };
  handleAllOrgProjectDuplicateProject = (projectid) => {
    var queryObj = {
      orgid: this.props.currentUser.organization.id,
      user_id: this.props.currentUser.UserId,
      project_id: projectid,
    };
    this.props.createEditOtherDuplicateProject(queryObj);
    this.setState({
      open: null,
    });
  };
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
                    Team Projects
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    location={{}}
                    to="#"
                    className={classnames({
                      active: this.state.activeFirstTab === "3",
                      "nav-link": true,
                    })}
                    onClick={() => {
                      this.toggleUpperTab("3");
                    }}
                  >
                    Completed Projects
                  </NavLink>
                </NavItem>
              </Nav>

              <TabContent activeTab={this.state.activeFirstTab}>
                <TabPane tabId="1">
                  <Row>
                    <Colxx xxs="12" md="10" sm="10" lg="10" xl="10">
                      <div className="form-group has-search">
                        <span class="fa fa-search form-control-feedback"></span>
                        <input
                          onChange={this.handleYourProjectTextSearchChange}
                          name="yoursearchKeyword"
                          id="yoursearchKeyword"
                          className="form-control"
                          // className="edityourproject"
                          placeholder="Search for projects here (project name, owner, and assigned users)"
                        />
                        {/* <span className="search-icon">
                          <i className="simple-icon-magnifier" />
                        </span> */}
                      </div>
                    </Colxx>
                    <Colxx xxs="12" md="2" sm="2" lg="2" xl="2">
                      <Button
                        onClick={this.openAddNewProjectSubmissionModal}
                        style={{ float: "right" }}
                        outline
                        color="primary"
                        className="mb-2"
                      >
                        <IntlMessages id="New Project" />
                      </Button>
                    </Colxx>
                  </Row>
                  <br></br>
                  <Row>
                    <Colxx xxs="12" md="12" sm="12" lg="12" xl="12">
                      <CardTitle>
                        <IntlMessages id="Sort by" />
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
                      </CardTitle>
                    </Colxx>
                  </Row>
                  <br></br>
                  {this.renderProjectList()}

                  {this.props.adminProjectCount >=
                    constants.DEFAULT_LIMIT_SIZE && (
                    <Pagination
                      currentPage={this.state.currentPage}
                      totalPage={this.props.pageCountAdminProject}
                      onChangePage={(i) => this.handleAdminPageClick(i)}
                    />
                  )}
                </TabPane>

                <TabPane tabId="2">
                  <Row>
                    <Colxx xxs="12" md="10" sm="10" lg="10" xl="10">
                      <div className="form-group has-search">
                        <span class="fa fa-search form-control-feedback"></span>
                        <input
                          onChange={this.handleTextSearchChange}
                          name="searchKeyword"
                          id="searchKeyword"
                          className="form-control"
                          // className="edityourproject"
                          placeholder="Search for projects here (project name, owner, and assigned users)"
                        />
                        {/* <span className="search-icon">
                          <i className="simple-icon-magnifier" />
                        </span> */}
                      </div>
                    </Colxx>
                  </Row>
                  <Row>
                    <Colxx xxs="12" md="12" sm="12" lg="12" xl="12">
                      <CardTitle>
                        <IntlMessages id="Sort by" />
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
                      </CardTitle>
                    </Colxx>
                  </Row>
                  <br></br>
                  <br></br>
                  {this.renderAllProjectList()}

                  {this.props.allOrgProjectCount >=
                    constants.DEFAULT_LIMIT_SIZE && (
                    <EditOtherProjectPagination
                      editOtherCurrentPage={this.state.editOtherCurrentPage}
                      totalPage={this.props.pageCountAllOrgProject}
                      onChangePage={(i) => this.handleEditOtherPageClick(i)}
                    />
                  )}
                </TabPane>
                <TabPane tabId="3">
                  <Row>
                    <Colxx xxs="12" md="10" sm="10" lg="10" xl="10">
                      <div className="form-group has-search">
                        <span class="fa fa-search form-control-feedback"></span>
                        <input
                          onChange={this.handleCompletedProjectTextSearchChange}
                          name="searchKeyword"
                          id="searchKeyword"
                          className="form-control"
                          // className="edityourproject"
                          placeholder="Search for projects here (project name, owner, and assigned users)"
                        />
                        {/* <span className="search-icon">
                          <i className="simple-icon-magnifier" />
                        </span> */}
                      </div>
                    </Colxx>
                  </Row>
                  <br></br>
                  <br></br>
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
            </Colxx>
          </Row>
        </Fragment>
        <AddAdminProjectPopUpForm
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
    adminProjectList: state.projectReducer.adminProjectList,
    adminProjectCount: state.projectReducer.adminProjectCount,
    allOrgProjectList: state.projectReducer.allOrgProjectList,
    allOrgProjectCount: state.projectReducer.allOrgProjectCount,
    completedProjectList: state.projectReducer.completedProjectList,
    completedProjectCount: state.projectReducer.completedProjectCount,
    pageCountAdminProject: Math.ceil(
      state.projectReducer.adminProjectCount / constants.DEFAULT_LIMIT_SIZE
    ),
    pageCountAllOrgProject: Math.ceil(
      state.projectReducer.allOrgProjectCount / constants.DEFAULT_LIMIT_SIZE
    ),
    pageCountCompletedProject: Math.ceil(
      state.projectReducer.completedProjectCount / constants.DEFAULT_LIMIT_SIZE
    ),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAdminProjectList: (filterObj) => {
      dispatch(getAdminProjectList(filterObj));
    },
    addAdminProject: (values, callback) => {
      dispatch(addAdminProject(values, callback));
    },
    getAllProjectList: (filterObj) => {
      dispatch(getAllProjectList(filterObj));
    },
    adminDeleteProject: (projectid) => {
      dispatch(adminDeleteProject(projectid));
    },
    checkCompleteProjectBoard: (projectId, values) => {
      dispatch(checkCompleteProjectBoard(projectId, values));
    },
    getCompletedProjectList: (filterObj) => {
      dispatch(getCompletedProjectList(filterObj));
    },
    createDuplicateProject: (values, callback) => {
      dispatch(createDuplicateProject(values, callback));
    },
    createEditOtherDuplicateProject: (values, callback) => {
      dispatch(createEditOtherDuplicateProject(values, callback));
    },
    reActivateCompleteProject: (values, callback) => {
      dispatch(reActivateCompleteProject(values, callback));
    },
    dispatch: dispatch,
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(adminProjectListForm);
