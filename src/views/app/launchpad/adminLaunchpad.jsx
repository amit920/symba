import React, { Component, Fragment } from "react";
import {
  Row,
  // Card,
  // CardBody,
  Nav,
  NavItem,
  // UncontrolledDropdown,
  // DropdownToggle,
  // DropdownItem,
  // DropdownMenu,
  TabContent,
  TabPane,
  // Badge,
  // CardTitle,
  Button,
} from "reactstrap";
import { NavLink } from "react-router-dom";
import classnames from "classnames";
import { Colxx, Separator } from "../../../components/common/CustomBootstrap";
import IntlMessages from "../../../helpers/IntlMessages";
// import { injectIntl } from "react-intl";

// import { getDepartments } from "../../../action/master/masterData";
import { connect } from "react-redux";
import ReactPlayer from "react-player";
import { getAdminLaunchpadDetails } from "../../../action/launchpad/launchpad";
import axiosInstance from "../../../utils/axiosApi";
// import _ from "lodash";
import * as constants from "../../../utils/constants";
import { getAPIURL } from "../../../utils/getApiUrl";
import CreateResorcesTable from "./dragdrop";
// import { NotificationManager } from "../../../components/common/react-notifications";
class AdminLaunchpad extends Component {
  constructor(props) {
    super(props);

    this.toggleTab = this.toggleTab.bind(this);
    this.state = {
      activeTab: 0,
      activeDepartment: null,
    };
  }

  toggleTab(tab, dept) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
        activeDepartmentId: dept.departmentID,
        activeDepartmentName: dept.departmentDesc,
      });
    }
    var queryObj = {
      orgid: this.props.currentUser.organization.id,
      deptid: dept.departmentID,
    };

    this.props.getAdminLaunchpadDetails(queryObj);
    // only for Chewy  Org
    if (
      dept.departmentID === "853b8562-adeb-470c-9603-ae6754e8d333" &&
      this.props.currentUser.organization.id ===
        "2d7ca332-9098-4a0d-bcbb-1fbfde76d3a1"
    ) {
      this.setState({
        ResourcesHeading:
          "Here are some resources to dive into for your program.",
      });
    } else {
      this.setState({
        ResourcesHeading:
          "Here are some resources to dive into for your program.",
      });
    }
  }
  componentDidMount() {
    axiosInstance
      .get(
        getAPIURL(constants.GET_DEPARTMENT_LIST_URL, {
          ":org": this.props.currentUser.organization.id,
        })
      )
      .then((response) => {
        this.setState({
          departmentList: response.data.departments,
          departmentCount: response.data.count,
        });
        this.props.getAdminLaunchpadDetails({
          orgid: this.props.currentUser.organization.id,
          deptid: this.state.departmentList[0].departmentID,
        });
        this.setState({
          activeDepartmentId: this.state.departmentList[0].departmentID,
          activeDepartmentName: this.state.departmentList[0].departmentDesc,
        });
        // only for Chewy  Org
        if (
          this.state.activeDepartmentId ===
            "853b8562-adeb-470c-9603-ae6754e8d333" &&
          this.props.currentUser.organization.id ===
            "2d7ca332-9098-4a0d-bcbb-1fbfde76d3a1"
        ) {
          this.setState({
            ResourcesHeading:
              "Here are some resources to dive into for your program.",
          });
        } else {
          this.setState({
            ResourcesHeading:
              "Here are some resources to dive into for your program.",
          });
        }
      })
      .catch((error) => {});
    // this.props.getDepartments(this.props.currentUser.organization.id);
  }
  getOrgVideo = () => {
    let div = [];

    if (this.props.LaunchpadDetail) {
      let Container = [];
      let Row = [];

      if (this.props.LaunchpadDetail.videourl != null) {
        if (
          this.props.LaunchpadDetail.videourl.split(".").pop() === "jpg" ||
          this.props.LaunchpadDetail.videourl.split(".").pop() === "png" ||
          this.props.LaunchpadDetail.videourl.split(".").pop() === "jpeg"
        ) {
          Row.push(
            <div>
              {
                <img
                  // style={{ height: 360, width: "100%" }}
                  class="imageV"
                  alt=""
                  src={this.props.LaunchpadDetail.videourl}
                />
              }
            </div>
          );
        } else {
          Row.push(
            // <div className="player-wrapper">
            <div>
              {
                <ReactPlayer
                  url={this.props.LaunchpadDetail.videourl}
                  controls={true}
                  className="react-player"
                  fluid={false}
                  width="{100%}"
                  height="{100%}"
                />
              }
            </div>
          );
        }
      } else {
        Row.push(<div>{}</div>);
      }
      Container.push(<div style={{ marginLeft: "0px" }}>{Row}</div>);
      div.push(<div>{Container}</div>);
    }
    return div;
  };
  getOrgDescription = () => {
    let div = [];

    if (this.props.LaunchpadDetail) {
      let Container = [];
      let Row = [];
      if (this.props.LaunchpadDetail.overviewDescription != null) {
        Row.push(
          <div
            dangerouslySetInnerHTML={{
              __html: this.props.LaunchpadDetail.overviewDescription,
            }}
          ></div>
        );
      } else {
        Row.push(<div>{}</div>);
      }
      Container.push(<div>{Row}</div>);
      div.push(<div>{Container}</div>);
    }
    return div;
  };
  // createResorcesTable = () => {
  //   let table = [];

  //   if (this.props.LaunchpadDetail) {
  //     if (this.props.LaunchpadDetail.ResourcesCount > 0) {
  //       let Title = [];
  //       for (let i = 0; i < this.props.LaunchpadDetail.ResourcesCount; i++) {
  //         Title.push(
  //           <Colxx xxs="12" md="5" lg="5" xl="5">
  //             {
  //               <a
  //                 href={this.props.LaunchpadDetail.Resources[i].resource_link}
  //                 target="_blank"
  //               >
  //                 <Card style={{height:'180px'}}>
  //                   <CardBody>
  //                     <CardTitle style={{ marginBottom: "1rem" }}>
  //                       <a
  //                         className="cardtitle"
  //                         href={
  //                           this.props.LaunchpadDetail.Resources[i]
  //                             .resource_link
  //                         }
  //                         target="_blank"
  //                       >
  //                         {
  //                           this.props.LaunchpadDetail.Resources[i]
  //                             .resource_title
  //                         }
  //                       </a>
  //                     </CardTitle>
  //                     <label>
  //                       {
  //                         this.props.LaunchpadDetail.Resources[i]
  //                           .resource_description
  //                       }
  //                     </label>
  //                   </CardBody>
  //                 </Card>
  //                 <br></br>
  //               </a>
  //             }
  //           </Colxx>
  //         );
  //       }
  //       table.push(<Row>{Title}</Row>);
  //     }
  //   }
  //   return table;
  // };
  render() {
    return (
      <Fragment>
        <Row>
          <Colxx xxs="6" md="6" sm="6" lg="6">
            <h1 style={{ textAlign: "center", fontWeight: "bold" }}>
              Launchpad
            </h1>
          </Colxx>
          <Colxx xxs="6" md="6" lg="6" sm="6">
            <NavLink
              to={
                "/app/admin/edit/" +
                this.state.activeDepartmentId +
                "/" +
                this.state.activeDepartmentName
              }
            >
              <Button
                outline
                color="primary"
                className="editbutton"
                style={{ float: "right" }}
              >
                <IntlMessages id="Edit" />
              </Button>
            </NavLink>
          </Colxx>
          <Colxx xxs="12">
            <Nav tabs className="separator-tabs ml-0 mb-5">
              {this.state.departmentCount > 0 ? (
                this.state.departmentList.map((Dept, key) => {
                  return (
                    <NavItem>
                      <NavLink
                        className={classnames({
                          active: this.state.activeTab === key,
                          "nav-link": true,
                        })}
                        onClick={() => {
                          this.toggleTab(key, Dept);
                        }}
                        to="#"
                        location={{}}
                      >
                        <IntlMessages id={Dept.departmentDesc} />
                      </NavLink>
                    </NavItem>
                  );
                })
              ) : (
                <tr className="no-record-found">
                  <td>loading....</td>
                </tr>
              )}
            </Nav>

            <TabContent activeTab={this.state.activeTab}>
              <TabPane tabId={0}>
                <Row>
                  <Colxx xxs="12" lg="1" xl="1"></Colxx>
                  <Colxx
                    xxs="12"
                    sm="12"
                    md="9"
                    lg="9"
                    xl="9"
                    style={{ marginBottom: "10px" }}
                  >
                    {this.getOrgVideo()}
                  </Colxx>
                </Row>
                <br></br>
                <br></br>
                <Row>
                  <Colxx xxs="12" lg="12" xl="12">
                    <Separator className="mb-5" />
                  </Colxx>
                </Row>
                <Row>
                  <Colxx xxs="12" lg="1" xl="1"></Colxx>
                  <Colxx xxs="12" lg="10" xl="10">
                    <h2 style={{ fontWeight: "bold", textAlign: "center" }}>
                      Program Description
                    </h2>
                    <div
                      // style={{
                      //   fontSize: "16px",
                      //   lineHeight: "18px",
                      //   textAlign: "justify",
                      //   textAlignLast: "center",
                      //   width: "100%",
                      // }}
                    >
                      {this.getOrgDescription()}
                    </div>
                    <br></br>
                  </Colxx>
                </Row>
                <Row>
                  <Colxx xxs="12" lg="12" xl="12">
                    <Separator className="mb-5" />
                  </Colxx>
                </Row>
                <Row>
                  <Colxx xxs="12" lg="1" xl="1"></Colxx>
                  <Colxx xxs="12" lg="10" xl="10">
                    <h2 style={{ fontWeight: "bold", textAlign: "center" }}>
                      Resources
                    </h2>
                    <label
                      style={{
                        fontSize: "16px",
                        height: "43px",
                        lineHeight: "18px",
                        textAlign: "justify",
                        textAlignLast: "center",
                        width: "100%",
                      }}
                    >
                      {this.state.ResourcesHeading}
                    </label>
                    {this.props.LaunchpadDetail !== null ? (
                      <CreateResorcesTable
                        LaunchpadDetail={this.props.LaunchpadDetail}
                      />
                    ) : null}
                  </Colxx>
                </Row>
                {/* {this.props.LaunchpadDetail !== null ? (
                  <CreateResorcesTable
                    LaunchpadDetail={this.props.LaunchpadDetail}
                  />
                ) : null} */}
              </TabPane>
              <TabPane tabId={1}>
                <Row>
                  <Colxx xxs="12" lg="1" xl="1"></Colxx>
                  <Colxx
                    xxs="12"
                    sm="12"
                    md="9"
                    lg="9"
                    xl="9"
                    style={{ marginBottom: "10px" }}
                  >
                    {this.getOrgVideo()}
                  </Colxx>
                </Row>
                <br></br>
                <Row>
                  <Colxx xxs="12" lg="12" xl="12">
                    <Separator className="mb-5" />
                  </Colxx>
                </Row>
                <Row>
                  <Colxx xxs="12" lg="1" xl="1"></Colxx>
                  <Colxx xxs="12" lg="10" xl="10">
                    <h2 style={{ fontWeight: "bold", textAlign: "center" }}>
                      Program Description
                    </h2>
                    <div
                      // style={{
                      //   fontSize: "16px",
                      //   lineHeight: "18px",
                      //   textAlign: "justify",
                      //   textAlignLast: "center",
                      //   width: "100%",
                      // }}
                    >
                      {this.getOrgDescription()}
                    </div>
                    <br></br>
                  </Colxx>
                </Row>
                <Row>
                  <Colxx xxs="12" lg="12" xl="12">
                    <Separator className="mb-5" />
                  </Colxx>
                </Row>
                <Row>
                  <Colxx xxs="12" lg="1" xl="1"></Colxx>
                  <Colxx xxs="12" lg="10" xl="10" style={{}}>
                    <h2 style={{ fontWeight: "bold", textAlign: "center" }}>
                      {" "}
                      Resources
                    </h2>
                    <label
                      style={{
                        fontSize: "16px",
                        height: "43px",
                        lineHeight: "18px",
                        textAlign: "justify",
                        textAlignLast: "center",
                        width: "100%",
                      }}
                    >
                      {this.state.ResourcesHeading}
                    </label>
                    {this.props.LaunchpadDetail !== null ? (
                      <CreateResorcesTable
                        LaunchpadDetail={this.props.LaunchpadDetail}
                      />
                    ) : null}
                  </Colxx>
                </Row>
              </TabPane>
              <TabPane tabId={2}>
                <Row>
                  <Colxx xxs="12" lg="1" xl="1"></Colxx>
                  <Colxx
                    xxs="12"
                    sm="12"
                    md="9"
                    lg="9"
                    xl="9"
                    style={{ marginBottom: "10px" }}
                  >
                    {this.getOrgVideo()}
                  </Colxx>
                </Row>
                <br></br>
                <Row>
                  <Colxx xxs="12" lg="12" xl="12">
                    <Separator className="mb-5" />
                  </Colxx>
                </Row>
                <Row>
                  <Colxx xxs="12" lg="1" xl="1"></Colxx>
                  <Colxx xxs="12" lg="10" xl="10">
                    <h2 style={{ fontWeight: "bold", textAlign: "center" }}>
                      Program Description
                    </h2>
                    <div
                      // style={{
                      //   fontSize: "16px",
                      //   lineHeight: "18px",
                      //   textAlign: "justify",
                      //   textAlignLast: "center",
                      //   width: "100%",
                      // }}
                    >
                      {this.getOrgDescription()}
                    </div>
                    <br></br>
                  </Colxx>
                </Row>
                <Row>
                  <Colxx xxs="12" lg="12" xl="12">
                    <Separator className="mb-5" />
                  </Colxx>
                </Row>
                <Row>
                  <Colxx xxs="12" lg="1" xl="1"></Colxx>
                  <Colxx xxs="12" lg="10" xl="10" style={{}}>
                    <h2 style={{ fontWeight: "bold", textAlign: "center" }}>
                      {" "}
                      Resources
                    </h2>
                    <label
                      style={{
                        fontSize: "16px",
                        height: "43px",
                        lineHeight: "18px",
                        textAlign: "justify",
                        textAlignLast: "center",
                        width: "100%",
                      }}
                    >
                      {this.state.ResourcesHeading}
                    </label>
                    {this.props.LaunchpadDetail !== null ? (
                      <CreateResorcesTable
                        LaunchpadDetail={this.props.LaunchpadDetail}
                      />
                    ) : null}
                  </Colxx>
                </Row>
              </TabPane>
              <TabPane tabId={3}>
                <Row>
                  <Colxx xxs="12" lg="1" xl="1"></Colxx>
                  <Colxx
                    xxs="12"
                    sm="12"
                    md="9"
                    lg="9"
                    xl="9"
                    style={{ marginBottom: "10px" }}
                  >
                    {this.getOrgVideo()}
                  </Colxx>
                </Row>
                <br></br>
                <Row>
                  <Colxx xxs="12" lg="12" xl="12">
                    <Separator className="mb-5" />
                  </Colxx>
                </Row>
                <Row>
                  <Colxx xxs="12" lg="1" xl="1"></Colxx>
                  <Colxx xxs="12" lg="10" xl="10">
                    <h2 style={{ fontWeight: "bold", textAlign: "center" }}>
                      Program Description
                    </h2>
                    <div
                      // style={{
                      //   fontSize: "16px",
                      //   lineHeight: "18px",
                      //   textAlign: "justify",
                      //   textAlignLast: "center",
                      //   width: "100%",
                      // }}
                    >
                      {this.getOrgDescription()}
                    </div>
                    <br></br>
                  </Colxx>
                </Row>
                <Row>
                  <Colxx xxs="12" lg="12" xl="12">
                    <Separator className="mb-5" />
                  </Colxx>
                </Row>
                <Row>
                  <Colxx xxs="12" lg="1" xl="1"></Colxx>
                  <Colxx xxs="12" lg="10" xl="10" style={{}}>
                    <h2 style={{ fontWeight: "bold", textAlign: "center" }}>
                      {" "}
                      Resources
                    </h2>
                    <label
                      style={{
                        fontSize: "16px",
                        height: "43px",
                        lineHeight: "18px",
                        textAlign: "justify",
                        textAlignLast: "center",
                        width: "100%",
                      }}
                    >
                      {this.state.ResourcesHeading}
                    </label>
                    {this.props.LaunchpadDetail !== null ? (
                      <CreateResorcesTable
                        LaunchpadDetail={this.props.LaunchpadDetail}
                      />
                    ) : null}{" "}
                  </Colxx>
                </Row>
              </TabPane>
              <TabPane tabId={4}>
                <Row>
                  <Colxx xxs="12" lg="1" xl="1"></Colxx>
                  <Colxx
                    xxs="12"
                    sm="12"
                    md="9"
                    lg="9"
                    xl="9"
                    style={{ marginBottom: "10px" }}
                  >
                    {this.getOrgVideo()}
                  </Colxx>
                </Row>
                <br></br>
                <Row>
                  <Colxx xxs="12" lg="12" xl="12">
                    <Separator className="mb-5" />
                  </Colxx>
                </Row>
                <Row>
                  <Colxx xxs="12" lg="1" xl="1"></Colxx>
                  <Colxx xxs="12" lg="10" xl="10">
                    <h2 style={{ fontWeight: "bold", textAlign: "center" }}>
                      Program Description
                    </h2>
                    <div
                      // style={{
                      //   fontSize: "16px",
                      //   lineHeight: "18px",
                      //   textAlign: "justify",
                      //   textAlignLast: "center",
                      //   width: "100%",
                      // }}
                    >
                      {this.getOrgDescription()}
                    </div>
                    <br></br>
                  </Colxx>
                </Row>
                <Row>
                  <Colxx xxs="12" lg="12" xl="12">
                    <Separator className="mb-5" />
                  </Colxx>
                </Row>
                <Row>
                  <Colxx xxs="12" lg="1" xl="1"></Colxx>
                  <Colxx xxs="12" lg="10" xl="10" style={{}}>
                    <h2 style={{ fontWeight: "bold", textAlign: "center" }}>
                      {" "}
                      Resources
                    </h2>
                    <label
                      style={{
                        fontSize: "16px",
                        height: "43px",
                        lineHeight: "18px",
                        textAlign: "justify",
                        textAlignLast: "center",
                        width: "100%",
                      }}
                    >
                      {this.state.ResourcesHeading}
                    </label>
                    {this.props.LaunchpadDetail !== null ? (
                      <CreateResorcesTable
                        LaunchpadDetail={this.props.LaunchpadDetail}
                      />
                    ) : null}{" "}
                  </Colxx>
                </Row>
              </TabPane>
              <TabPane tabId={5}>
                <Row>
                  <Colxx xxs="12" lg="1" xl="1"></Colxx>
                  <Colxx
                    xxs="12"
                    sm="12"
                    md="9"
                    lg="9"
                    xl="9"
                    style={{ marginBottom: "10px" }}
                  >
                    {this.getOrgVideo()}
                  </Colxx>
                </Row>
                <br></br>
                <Row>
                  <Colxx xxs="12" lg="12" xl="12">
                    <Separator className="mb-5" />
                  </Colxx>
                </Row>
                <Row>
                  <Colxx xxs="12" lg="1" xl="1"></Colxx>
                  <Colxx xxs="12" lg="10" xl="10">
                    <h2 style={{ fontWeight: "bold", textAlign: "center" }}>
                      Program Description
                    </h2>
                    <div
                      // style={{
                      //   fontSize: "16px",
                      //   height: "auto",
                      //   lineHeight: "18px",
                      //   textAlign: "justify",
                      //   textAlignLast: "center",
                      //   width: "100%",
                      // }}
                    >
                      {this.getOrgDescription()}
                    </div>
                    <br></br>
                  </Colxx>
                </Row>
                <Row>
                  <Colxx xxs="12" lg="12" xl="12">
                    <Separator className="mb-5" />
                  </Colxx>
                </Row>
                <Row>
                  <Colxx xxs="12" lg="1" xl="1"></Colxx>
                  <Colxx xxs="12" lg="10" xl="10" style={{}}>
                    <h2 style={{ fontWeight: "bold", textAlign: "center" }}>
                      {" "}
                      Resources
                    </h2>
                    <label
                      style={{
                        fontSize: "16px",
                        height: "43px",
                        lineHeight: "18px",
                        textAlign: "justify",
                        textAlignLast: "center",
                        width: "100%",
                      }}
                    >
                      {this.state.ResourcesHeading}
                    </label>
                    {this.props.LaunchpadDetail !== null ? (
                      <CreateResorcesTable
                        LaunchpadDetail={this.props.LaunchpadDetail}
                      />
                    ) : null}
                  </Colxx>
                </Row>
              </TabPane>
              <TabPane tabId={6}>
                <Row>
                  <Colxx xxs="12" lg="1" xl="1"></Colxx>
                  <Colxx
                    xxs="12"
                    sm="12"
                    md="9"
                    lg="9"
                    xl="9"
                    style={{ marginBottom: "10px" }}
                  >
                    {this.getOrgVideo()}
                  </Colxx>
                </Row>
                <br></br>
                <Row>
                  <Colxx xxs="12" lg="12" xl="12">
                    <Separator className="mb-5" />
                  </Colxx>
                </Row>
                <Row>
                  <Colxx xxs="12" lg="1" xl="1"></Colxx>
                  <Colxx xxs="12" lg="10" xl="10">
                    <h2 style={{ fontWeight: "bold", textAlign: "center" }}>
                      Program Description
                    </h2>
                    <div
                      // style={{
                      //   fontSize: "16px",
                      //   height: "auto",
                      //   lineHeight: "18px",
                      //   textAlign: "justify",
                      //   textAlignLast: "center",
                      //   width: "100%",
                      // }}
                    >
                      {this.getOrgDescription()}
                    </div>
                    <br></br>
                  </Colxx>
                </Row>
                <Row>
                  <Colxx xxs="12" lg="12" xl="12">
                    <Separator className="mb-5" />
                  </Colxx>
                </Row>
                <Row>
                  <Colxx xxs="12" lg="1" xl="1"></Colxx>
                  <Colxx xxs="12" lg="10" xl="10">
                    <h2 style={{ fontWeight: "bold", textAlign: "center" }}>
                      {" "}
                      Resources
                    </h2>
                    <label
                      style={{
                        fontSize: "16px",
                        height: "43px",
                        lineHeight: "18px",
                        textAlign: "justify",
                        textAlignLast: "center",
                        width: "100%",
                      }}
                    >
                      {this.state.ResourcesHeading}
                    </label>
                    {this.props.LaunchpadDetail !== null ? (
                      <CreateResorcesTable
                        LaunchpadDetail={this.props.LaunchpadDetail}
                      />
                    ) : null}
                  </Colxx>
                </Row>
              </TabPane>
              <TabPane tabId={7}>
                <Row>
                  <Colxx xxs="12" lg="1" xl="1"></Colxx>
                  <Colxx
                    xxs="12"
                    sm="12"
                    md="9"
                    lg="9"
                    xl="9"
                    style={{ marginBottom: "10px" }}
                  >
                    {this.getOrgVideo()}
                  </Colxx>
                </Row>
                <br></br>
                <Row>
                  <Colxx xxs="12" lg="12" xl="12">
                    <Separator className="mb-5" />
                  </Colxx>
                </Row>
                <Row>
                  <Colxx xxs="12" lg="1" xl="1"></Colxx>
                  <Colxx xxs="12" lg="10" xl="10">
                    <h2 style={{ fontWeight: "bold", textAlign: "center" }}>
                      Program Description
                    </h2>
                    <div
                      // style={{
                      //   fontSize: "16px",
                      //   height: "auto",
                      //   lineHeight: "18px",
                      //   textAlign: "justify",
                      //   textAlignLast: "center",
                      //   width: "100%",
                      // }}
                    >
                      {this.getOrgDescription()}
                    </div>
                    <br></br>
                  </Colxx>
                </Row>
                <Row>
                  <Colxx xxs="12" lg="12" xl="12">
                    <Separator className="mb-5" />
                  </Colxx>
                </Row>
                <Row>
                  <Colxx xxs="12" lg="1" xl="1"></Colxx>
                  <Colxx xxs="12" lg="10" xl="10">
                    <h2 style={{ fontWeight: "bold", textAlign: "center" }}>
                      {" "}
                      Resources
                    </h2>
                    <label
                      style={{
                        fontSize: "16px",
                        height: "43px",
                        lineHeight: "18px",
                        textAlign: "justify",
                        textAlignLast: "center",
                        width: "100%",
                      }}
                    >
                      {this.state.ResourcesHeading}
                    </label>
                    {this.props.LaunchpadDetail !== null ? (
                      <CreateResorcesTable
                        LaunchpadDetail={this.props.LaunchpadDetail}
                      />
                    ) : null}
                  </Colxx>
                </Row>
              </TabPane>
              <TabPane tabId={8}>
                <Row>
                  <Colxx xxs="12" lg="1" xl="1"></Colxx>
                  <Colxx
                    xxs="12"
                    sm="12"
                    md="9"
                    lg="9"
                    xl="9"
                    style={{ marginBottom: "10px" }}
                  >
                    {this.getOrgVideo()}
                  </Colxx>
                </Row>
                <br></br>
                <Row>
                  <Colxx xxs="12" lg="12" xl="12">
                    <Separator className="mb-5" />
                  </Colxx>
                </Row>
                <Row>
                  <Colxx xxs="12" lg="1" xl="1"></Colxx>
                  <Colxx xxs="12" lg="10" xl="10">
                    <h2 style={{ fontWeight: "bold", textAlign: "center" }}>
                      Program Description
                    </h2>
                    <div
                      // style={{
                      //   fontSize: "16px",
                      //   height: "auto",
                      //   lineHeight: "18px",
                      //   textAlign: "justify",
                      //   textAlignLast: "center",
                      //   width: "100%",
                      // }}
                    >
                      {this.getOrgDescription()}
                    </div>
                    <br></br>
                  </Colxx>
                </Row>
                <Row>
                  <Colxx xxs="12" lg="12" xl="12">
                    <Separator className="mb-5" />
                  </Colxx>
                </Row>
                <Row>
                  <Colxx xxs="12" lg="1" xl="1"></Colxx>
                  <Colxx xxs="12" lg="10" xl="10">
                    <h2 style={{ fontWeight: "bold", textAlign: "center" }}>
                      {" "}
                      Resources
                    </h2>
                    <label
                      style={{
                        fontSize: "16px",
                        height: "43px",
                        lineHeight: "18px",
                        textAlign: "justify",
                        textAlignLast: "center",
                        width: "100%",
                      }}
                    >
                      {this.state.ResourcesHeading}
                    </label>
                    {this.props.LaunchpadDetail !== null ? (
                      <CreateResorcesTable
                        LaunchpadDetail={this.props.LaunchpadDetail}
                      />
                    ) : null}
                  </Colxx>
                </Row>
              </TabPane>
              <TabPane tabId={9}>
                <Row>
                  <Colxx xxs="12" lg="1" xl="1"></Colxx>
                  <Colxx
                    xxs="12"
                    sm="12"
                    md="9"
                    lg="9"
                    xl="9"
                    style={{ marginBottom: "10px" }}
                  >
                    {this.getOrgVideo()}
                  </Colxx>
                </Row>
                <br></br>
                <Row>
                  <Colxx xxs="12" lg="12" xl="12">
                    <Separator className="mb-5" />
                  </Colxx>
                </Row>
                <Row>
                  <Colxx xxs="12" lg="1" xl="1"></Colxx>
                  <Colxx xxs="12" lg="10" xl="10">
                    <h2 style={{ fontWeight: "bold", textAlign: "center" }}>
                      Program Description
                    </h2>
                    <div
                      // style={{
                      //   fontSize: "16px",
                      //   height: "auto",
                      //   lineHeight: "18px",
                      //   textAlign: "justify",
                      //   textAlignLast: "center",
                      //   width: "100%",
                      // }}
                    >
                      {this.getOrgDescription()}
                    </div>
                    <br></br>
                  </Colxx>
                </Row>
                <Row>
                  <Colxx xxs="12" lg="12" xl="12">
                    <Separator className="mb-5" />
                  </Colxx>
                </Row>
                <Row>
                  <Colxx xxs="12" lg="1" xl="1"></Colxx>
                  <Colxx xxs="12" lg="10" xl="10">
                    <h2 style={{ fontWeight: "bold", textAlign: "center" }}>
                      {" "}
                      Resources
                    </h2>
                    <label
                      style={{
                        fontSize: "16px",
                        height: "43px",
                        lineHeight: "18px",
                        textAlign: "justify",
                        textAlignLast: "center",
                        width: "100%",
                      }}
                    >
                      {this.state.ResourcesHeading}
                    </label>
                    {this.props.LaunchpadDetail !== null ? (
                      <CreateResorcesTable
                        LaunchpadDetail={this.props.LaunchpadDetail}
                      />
                    ) : null}
                  </Colxx>
                </Row>
              </TabPane>
              <TabPane tabId={10}>
                <Row>
                  <Colxx xxs="12" lg="1" xl="1"></Colxx>
                  <Colxx
                    xxs="12"
                    sm="12"
                    md="9"
                    lg="9"
                    xl="9"
                    style={{ marginBottom: "10px" }}
                  >
                    {this.getOrgVideo()}
                  </Colxx>
                </Row>
                <br></br>
                <Row>
                  <Colxx xxs="12" lg="12" xl="12">
                    <Separator className="mb-5" />
                  </Colxx>
                </Row>
                <Row>
                  <Colxx xxs="12" lg="1" xl="1"></Colxx>
                  <Colxx xxs="12" lg="10" xl="10">
                    <h2 style={{ fontWeight: "bold", textAlign: "center" }}>
                      Program Description
                    </h2>
                    <div
                      // style={{
                      //   fontSize: "16px",
                      //   height: "auto",
                      //   lineHeight: "18px",
                      //   // textAlign: "justify",
                      //   // textAlignLast: "center",
                      //   width: "100%",
                      // }}
                    >
                      {this.getOrgDescription()}
                    </div>
                    <br></br>
                  </Colxx>
                </Row>
                <Row>
                  <Colxx xxs="12" lg="12" xl="12">
                    <Separator className="mb-5" />
                  </Colxx>
                </Row>
                <Row>
                  <Colxx xxs="12" lg="1" xl="1"></Colxx>
                  <Colxx xxs="12" lg="10" xl="10">
                    <h2 style={{ fontWeight: "bold", textAlign: "center" }}>
                      {" "}
                      Resources
                    </h2>
                    <label
                      style={{
                        fontSize: "16px",
                        height: "43px",
                        lineHeight: "18px",
                        textAlign: "justify",
                        textAlignLast: "center",
                        width: "100%",
                      }}
                    >
                      {this.state.ResourcesHeading}
                    </label>
                    {this.props.LaunchpadDetail !== null ? (
                      <CreateResorcesTable
                        LaunchpadDetail={this.props.LaunchpadDetail}
                      />
                    ) : null}
                  </Colxx>
                </Row>
              </TabPane>
            </TabContent>
          </Colxx>
        </Row>
      </Fragment>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    currentUser: state.userReducer.currentUser,
    LaunchpadDetail: state.overviewReducer.LaunchpadDetail,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAdminLaunchpadDetails: (params) => {
      dispatch(getAdminLaunchpadDetails(params));
    },

    dispatch: dispatch,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AdminLaunchpad);
