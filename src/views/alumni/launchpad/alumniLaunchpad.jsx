import React, { Component, Fragment } from "react";
import {
  Row,
  Card,
  CardBody,
  // Nav,
  // NavItem,
  // UncontrolledDropdown,
  // DropdownToggle,
  // DropdownItem,
  // DropdownMenu,
  // TabContent,
  // TabPane,
  // Badge,
  CardTitle,
  // Button,
} from "reactstrap";
// import { NavLink } from "react-router-dom";
import { Colxx, Separator } from "../../../components/common/CustomBootstrap";
// import { injectIntl } from "react-intl";

import { getDepartments } from "../../../action/master/masterData";
import { connect } from "react-redux";
import ReactPlayer from "react-player";
import { getAdminLaunchpadDetails } from "../../../action/launchpad/launchpad";
class AlumniLaunchpad extends Component {
  constructor(props) {
    super(props);

    this.toggleTab = this.toggleTab.bind(this);
    this.state = {
      // activeTab: 0,
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
  }
  componentDidMount() {
    this.props.getDepartments(this.props.currentUser.organization.id);
    var queryObj = {
      orgid: this.props.currentUser.organization.id,
      deptid: this.props.currentUser.departmentid,
    };
    this.props.getAdminLaunchpadDetails(queryObj);
    // only for Chewy  Org  //--heading is changed : may 21 2021
    if (
      this.props.currentUser.departmentid ===
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
  }
  // getOrgVideo = () => {
  //   let div = [];

  //   if (this.props.LaunchpadDetail) {
  //     let Container = [];
  //     let Row = [];

  //     if (this.props.LaunchpadDetail.videourl != null) {
  //       if (
  //         this.props.LaunchpadDetail.videourl.split(".").pop() === "jpg" ||
  //         this.props.LaunchpadDetail.videourl.split(".").pop() === "png" ||
  //         this.props.LaunchpadDetail.videourl.split(".").pop() === "jpeg"
  //       ) {
  //         Row.push(
  //           <div>
  //             {
  //               <img
  //                 style={{ height: 360, width: "100%" }}
  //                 src={this.props.LaunchpadDetail.videourl}
  //                 rel="noopener noreferrer"
  //                 alt=""
  //               />
  //             }
  //           </div>
  //         );
  //       } else {
  //         Row.push(
  //           <div tyle={{ width: "620px", height: "349px" }}>
  //             {
  //               <ReactPlayer
  //                 width="620px"
  //                 height="349px"
  //                 url={this.props.LaunchpadDetail.videourl}
  //                 controls={true}
  //               />
  //             }
  //           </div>
  //         );
  //       }
  //     } else {
  //       Row.push(<div>{}</div>);
  //     }
  //     Container.push(<div>{Row}</div>);
  //     div.push(<div>{Container}</div>);
  //   }
  //   return div;
  // };
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
                  class="alumniimageV"
                  src={this.props.LaunchpadDetail.videourl}
                  alt=""
                />
              }
            </div>
          );
        } else {
          Row.push(
            // <div className="managerplayer-wrapper">
            <div>
              {
                <ReactPlayer
                  url={this.props.LaunchpadDetail.videourl}
                  controls={true}
                  className="alumnireact-player"
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
      Container.push(<div>{Row}</div>);
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

  createResorcesTable = () => {
    let table = [];

    if (this.props.LaunchpadDetail) {
      if (this.props.LaunchpadDetail.ResourcesCount > 0) {
        let Title = [];
        for (let i = 0; i < this.props.LaunchpadDetail.ResourcesCount; i++) {
          // Title.push(<Colxx xxs="12" md="2" lg="2" xl="2">{

          // }</Colxx>)

          Title.push(
            <Colxx xxs="12" sm="12" md="6" lg="6" xl="6">
              {
                <div>
                  <a
                    href={this.props.LaunchpadDetail.Resources[i].resource_link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Card className="lanachpad_resource_card_manager_intern">
                      <CardBody>
                        <CardTitle style={{ marginBottom: "1rem" }}>
                          <a
                            className="cardtitle"
                            href={
                              this.props.LaunchpadDetail.Resources[i]
                                .resource_link
                            }
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {
                              this.props.LaunchpadDetail.Resources[i]
                                .resource_title
                            }
                          </a>
                        </CardTitle>
                        <label>
                          {
                            this.props.LaunchpadDetail.Resources[i]
                              .resource_description
                          }
                        </label>
                      </CardBody>
                    </Card>
                    <br></br>
                  </a>
                </div>
              }
            </Colxx>
          );
        }

        table.push(<Row>{Title}</Row>);
      }
    }
    return table;
  };
  render() {
    return (
      // <Fragment>
      //   <Row>
      //     <Colxx xxs="12">
      //       <h1 style={{ textAlign: "center", fontWeight: "bold" }}>
      //         Launchpad
      //       </h1>
      //       <Separator className="mb-5" />
      //     </Colxx>
      //   </Row>
      //   <Row>
      //     <Colxx xxs="12" lg="2" xl="2"></Colxx>
      //     <Colxx xxs="12" lg="10" sm="10" md="10" xl="10">
      //       <div>
      //         <span style={{ fontWeight: "bold", fontSize: "33px" }}>
      //           {"Welcome, " +
      //             this.props.currentUser.FirstName +
      //             " " +
      //             this.props.currentUser.LastName +
      //             "!"}
      //         </span>
      //       </div>
      //     </Colxx>
      //   </Row>
      //   <br></br>
      //   <Row>
      //     <Colxx xxs="12" lg="1" xl="1"></Colxx>
      //     <Colxx xxs="12" lg="10" sm="10" md="10" xl="10">
      //       {this.getOrgVideo()}
      //     </Colxx>
      //   </Row>
      //   <br></br>
      //   <br></br>
      //   <Row>
      //     <Colxx xxs="12">
      //       <Separator className="mb-5" />
      //     </Colxx>
      //   </Row>

      //   <Row>
      //     <Colxx xxs="12" lg="3" sm="3" md="3" xl="3"></Colxx>
      //     <Colxx xxs="12" lg="9" sm="9" md="9" xl="9">
      //       <span
      //         style={{
      //           fontWeight: "bold",
      //           textAlign: "center",
      //           fontSize: "23px",
      //         }}
      //       >
      //         Program Description
      //       </span>
      //     </Colxx>
      //   </Row>
      //   <Row>
      //     <Colxx xxs="12" lg="1" sm="1" md="1" xl="1"></Colxx>
      //     <Colxx xxs="12" lg="7" sm="8" md="8" xl="7">
      //       <div
      //         style={{
      //           fontSize: "16px",

      //           lineHeight: "18px",
      //           textAlign: "justify",
      //         }}
      //       >
      //         {this.getOrgDescription()}
      //       </div>
      //       <br></br>
      //     </Colxx>
      //   </Row>
      //   <Row>
      //     <Colxx xxs="12" lg="12" xl="12">
      //       <Separator className="mb-5" />
      //     </Colxx>
      //   </Row>
      //   <Row>
      //     <Colxx xxs="12" lg="3" sm="3" md="3" xl="3"></Colxx>
      //     <Colxx xxs="12" lg="7" sm="7" md="7" xl="7">
      //       <span
      //         style={{
      //           fontWeight: "bold",
      //           textAlign: "center",
      //           fontSize: "23px",
      //           marginLeft: "37px",
      //         }}
      //       >
      //         {" "}
      //         Resources
      //       </span>
      //     </Colxx>
      //   </Row>
      //   <Row>
      //     <Colxx xxs="12" lg="1" sm="1" md="1" xl="1"></Colxx>
      //     <Colxx xxs="12" lg="7" sm="8" md="8" xl="7">
      //       <div
      //         style={{
      //           fontSize: "16px",
      //           height: "57px",
      //           lineHeight: "18px",
      //           textAlign: "justify",
      //         }}
      //       >
      //        {this.state.ResourcesHeading}
      //       </div>
      //     </Colxx>
      //   </Row>
      //   {this.createResorcesTable()}
      // </Fragment>

      <Fragment>
        <Row>
          <Colxx xxs="12">
            <h1 style={{ textAlign: "center", fontWeight: "bold" }}>
              Launchpad
            </h1>
            <Separator className="mb-5" />
          </Colxx>
        </Row>
        <Row>
          {/* <Colxx xxs="12" lg="10" sm="10" md="10" xl="10"> */}
          <Colxx xxs="12" lg="12" xl="12">
            <div style={{ textAlign: "center" }}>
              <span style={{ fontWeight: "bold", fontSize: "33px" }}>
                {"Welcome, " +
                  this.props.currentUser.FirstName +
                  " " +
                  this.props.currentUser.LastName +
                  "!"}
              </span>
            </div>
          </Colxx>
        </Row>
        <br></br>
        <Row>
          <Colxx xxs="12" lg="1" xl="1"></Colxx>
          <Colxx xxs="12" sm="12" md="9" lg="9" xl="9">
            {this.getOrgVideo()}
          </Colxx>
        </Row>
        <br></br>
        <br></br>
        <Row>
          <Colxx xxs="12">
            <Separator className="mb-5" />
          </Colxx>
        </Row>

        <Row>
          <Colxx xxs="12" lg="1" xl="1"></Colxx>
          {/* <Colxx xxs="12" sm="10" md="10" lg="10" xl="10"> */}
          <Colxx xxs="12" lg="10" xl="10">
            <h2
              style={{ fontWeight: "bold", textAlign: "center", width: "100%" }}
            >
              Program Description
            </h2>
            <div
              style={{
                fontSize: "16px",
                lineHeight: "18px",
                textAlign: "justify",
                width: "100%",
                textAlignLast: "center",
              }}
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
          {/* <Colxx xxs="12" sm="10" md="10" lg="10" xl="10"> */}
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
                width: "100%",
                textAlignLast: "center",
              }}
            >
              {this.state.ResourcesHeading}
            </label>

            {this.createResorcesTable()}
          </Colxx>
        </Row>
      </Fragment>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    currentUser: state.userReducer.currentUser,
    departmentList: state.masterReducer.departmentList,
    departmentCount: state.masterReducer.departmentCount,
    LaunchpadDetail: state.overviewReducer.LaunchpadDetail,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getDepartments: (organization) => {
      dispatch(getDepartments(organization));
    },
    getAdminLaunchpadDetails: (params) => {
      dispatch(getAdminLaunchpadDetails(params));
    },

    dispatch: dispatch,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AlumniLaunchpad);
