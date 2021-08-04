import React, { Component, Fragment } from "react";
// import { injectIntl } from "react-intl";
import { Row } from "reactstrap";
import { Colxx, Separator } from "../../../components/common/CustomBootstrap";
import {
  // Input,
  Card,
  CardBody,
  // CardTitle,
  CardSubtitle,
  CardImg,
  CardText,
  Button,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
// import { NavLink } from "react-router-dom";

import {
  getAdministratorsCommunityList,
  getTeamMembersCommunityList,
} from "../../../action/community/community";
import { connect } from "react-redux";
import * as constants from "../../../utils/constants";
import axiosInstance from "../../../utils/axiosApi";
import { getAPIURL } from "../../../utils/getApiUrl";
import { Link } from "react-router-dom";
import IntlMessages from "../../../helpers/IntlMessages";
/* eslint-disable */
class InternCommunityList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: null,
      Adminshowmore: true,
      filterValue: "",
      departmentList: [],
    };
  }
  async componentDidMount() {
    this.props.getAdministratorsCommunityList({
      orgid: this.props.currentUser.organization.id,
      limit_size: constants.DEFAULT_LIMIT_SIZE,
      limit_start: 0,
      search_text: this.state.searchText,
      // departmant_id: this.state.depFilterVal,
      // supervisor_id: this.state.supervisorFilterVal,
      // usertype: this.props.currentUser.Usertypeid,
      user_id: this.props.currentUser.UserId,
      sort_dir: this.state.sort_dir,
      sort_type: this.state.sort_type,
    });
    this.props.getTeamMembersCommunityList({
      orgid: this.props.currentUser.organization.id,
      limit_size: constants.DEFAULT_LIMIT_SIZE,
      limit_start: 0,
      search_text: this.state.searchText,
      // departmant_id: this.state.depFilterVal,
      // supervisor_id: this.state.supervisorFilterVal,
      // usertype: this.props.currentUser.Usertypeid,
      user_id: this.props.currentUser.UserId,
      sort_dir: this.state.sort_dir,
      sort_type: this.state.sort_type,
    });
    await axiosInstance
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
      });
  }
  handleFilterValue = (deptname, deptid) => {
    this.setState({ filterValue: deptname });
    this.props.getAdministratorsCommunityList({
      orgid: this.props.currentUser.organization.id,
      limit_size: constants.DEFAULT_LIMIT_SIZE,
      limit_start: 0,
      search_text: this.state.searchText,
      departmant_id: deptid,
      // supervisor_id: this.state.supervisorFilterVal,
      // usertype: this.props.currentUser.Usertypeid,
      user_id: this.props.currentUser.UserId,
      sort_dir: this.state.sort_dir,
      sort_type: this.state.sort_type,
    });
    this.props.getTeamMembersCommunityList({
      orgid: this.props.currentUser.organization.id,
      limit_size: constants.DEFAULT_LIMIT_SIZE,
      limit_start: 0,
      search_text: this.state.searchText,
      departmant_id: deptid,
      // supervisor_id: this.state.supervisorFilterVal,
      // usertype: this.props.currentUser.Usertypeid,
      user_id: this.props.currentUser.UserId,
      sort_dir: this.state.sort_dir,
      sort_type: this.state.sort_type,
    });
  };
  handleAdminShowMoreClick = () => {
    this.setState({
      Adminshowmore: !this.state.Adminshowmore,
    });
  };
  generateCountAdministrators(value) {
    if (value > 7) {
      if (this.state.Adminshowmore) {
        return 7;
      } else {
        return value;
      }
    } else return value;
  }
  createTeamMemberTable = () => {
    let table = [];

    if (this.props.teammembersList) {
      if (this.props.teammembersList_count > 0) {
        let Heading = [];
        let Title = [];
        let image;
        let messageUrl;
        Heading.push(
          <Colxx xxs="12" md="12" sm="12" lg="12" xl="12">
            <span
              style={{
                fontWeight: "bold",
                marginLeft: "22px",
                fontSize: "20px",
              }}
            >
              Team Members
            </span>
          </Colxx>
        );
        for (let i = 0; i < this.props.teammembersList_count; i++) {
          if (this.props.currentUser.organization.id ==='9d9e873b-de4f-4713-a21e-16a936eba045'){
            if (this.props.teammembersList[i].SocialLinks != undefined) {
              messageUrl =this.props.teammembersList[i].SocialLinks[0].WebsiteUrl;
            } else {
              messageUrl = "mailto:" + this.props.teammembersList[i].Email;
            }
          }
          else{
            if (this.props.teammembersList[i].Isslack === true) {
              messageUrl =
                "https://slack.com/app_redirect?channel=" +
                this.props.teammembersList[i].UserslackId;
            } else {
              messageUrl = "mailto:" + this.props.teammembersList[i].Email;
            }
          }
          if (this.props.teammembersList[i].ProfileImage === "") {
            image = (
              <CardImg
                top
                src="/assets/img/profile_icon.png"
                alt="Card image cap"
                className="img-thumbnail border-0 rounded-circle mb-3 list-thumbnail"
              />
            );
          }
          if (this.props.teammembersList[i].ProfileImage == null) {
            image = (
              <CardImg
                top
                src="/assets/img/profile_icon.png"
                alt="Card image cap"
                className="img-thumbnail border-0 rounded-circle mb-3 list-thumbnail"
              />
            );
          } else {
            image = (
              <CardImg
                top
                src={this.props.teammembersList[i].ProfileImage}
                alt="Card image cap"
                className="img-thumbnail border-0 rounded-circle mb-3 list-thumbnail"
              />
            );
          }

          Title.push(
            // <Colxx md="6" sm="6" lg="3" xxs="12">
            <Colxx xxs="12" sm="6" md="6" lg="4" xl="3">
              {
                <Card
                  className="mb-4 community_cards"
                  // style={{ height: "22em", borderRadius: "5px" }}
                >
                  <CardBody style={{ padding: "1.2rem" }}>
                    <div className="text-center">
                      {image}
                      <br />
                      {/* <CardImg top src="/assets/img/profile-pic-l.jpg" alt="Card image cap" className="img-thumbnail border-0 rounded-circle mb-4 list-thumbnail" /> */}
                      <Link
                        to={
                          "/internapp/community/profile/" +
                          this.props.teammembersList[i].UserId +
                          "/" +
                          this.props.teammembersList[i].Usertypeid
                        }
                      >
                        <CardSubtitle className="mb-1">
                          <span
                            style={{
                              fontWeight: "bold",
                              color: "#77787D",
                              fontSize: "14px",
                              float: "left",
                              marginLeft: "10px",
                            }}
                          >
                            <img
                              src="/assets/img/handwave.png"
                              alt=""
                              className="community_text_emoji"
                            />
                            {this.props.teammembersList[i].FirstName +
                              " " +
                              this.props.teammembersList[i].LastName}
                          </span>
                          <br />
                        </CardSubtitle>
                      </Link>

                      {/* <Separator className="communitysepration" /> */}
                      <span className="text-muted">
                        <span
                          style={{
                            fontWeight: "bold",
                            color: "#77787D",
                            fontSize: "10px",
                            float: "left",
                            marginLeft: "10px",
                          }}
                        >
                          <img
                            src="/assets/img/jobtitle.png"
                            alt=""
                            className="community_text_emoji"
                          />
                          {this.props.teammembersList[i].UserTitle}
                        </span>
                      </span>
                      <br></br>
                      {/* <span className="text-muted">
                          <span
                            style={{
                              fontWeight: "bolder",
                              color: "#77787D",
                              fontSize: "11px",
                            }}
                          >
                            {this.props.internList[i].DepartmentName}
                          </span>
                        </span> */}
                      <CardText className="text-muted  mb-2">
                        <Button
                          color="#17b298"
                          className="mb-2 community_messageme"
                        >
                          {/* <IntlMessages id=" MessageMe" /> */}

                          <a
                            target="_blank"
                            style={{ fontWeight: "bolder", color: "#fff" }}
                            href={messageUrl}
                            rel="noopener noreferrer"
                          >
                            <IntlMessages id=" Message Me" />
                          </a>
                        </Button>
                      </CardText>
                    </div>
                  </CardBody>
                </Card>
              }
            </Colxx>
          );
        }
        table.push(<Row>{Heading}</Row>);
        table.push(<Row>{Title}</Row>);
      }
    }
    return table;
  };
  createAdministratorsListTable = () => {
    let table = [];

    if (this.props.administratorsList) {
      if (this.props.administrators_count > 0) {
        let Heading = [];
        let Title = [];
        let image;
        let messageUrl;
        Heading.push(
          <Colxx xxs="12" md="12" sm="12" lg="12" xl="12">
            <span
              style={{
                fontWeight: "bold",
                marginLeft: "22px",
                fontSize: "20px",
              }}
            >
              Administrators
            </span>
          </Colxx>
        );
        for (
          let i = 0;
          i < this.generateCountAdministrators(this.props.administrators_count);
          i++
        ) {
          if (this.props.currentUser.organization.id ==='9d9e873b-de4f-4713-a21e-16a936eba045'){
            if (this.props.administratorsList[i].SocialLinks != undefined) {
              messageUrl =this.props.administratorsList[i].SocialLinks[0].WebsiteUrl;
            } else {
              messageUrl = "mailto:" + this.props.administratorsList[i].Email;
            }
          }
          else{
            if (this.props.administratorsList[i].Isslack === true) {
              messageUrl =
                "https://slack.com/app_redirect?channel=" +
                this.props.administratorsList[i].UserslackId;
            } else {
              messageUrl = "mailto:" + this.props.administratorsList[i].Email;
            }
          }
          if (this.props.administratorsList[i].ProfileImage === "") {
            image = (
              <CardImg
                top
                src="/assets/img/profile_icon.png"
                alt="Card image cap"
                className="img-thumbnail border-0 rounded-circle mb-3 list-thumbnail"
              />
            );
          }
          if (this.props.administratorsList[i].ProfileImage == null) {
            image = (
              <CardImg
                top
                src="/assets/img/profile_icon.png"
                alt="Card image cap"
                className="img-thumbnail border-0 rounded-circle mb-3 list-thumbnail"
              />
            );
          } else {
            image = (
              <CardImg
                top
                src={this.props.administratorsList[i].ProfileImage}
                alt="Card image cap"
                className="img-thumbnail border-0 rounded-circle mb-3 list-thumbnail"
              />
            );
          }
          Title.push(
            <Colxx xxs="12" sm="6" md="6" lg="4" xl="3">
              {
                <Card className="mb-4 community_cards">
                  <CardBody style={{ padding: "1.2rem" }}>
                    <div className="text-center">
                      {image}
                      <br />
                      <Link
                        to={
                          "/internapp/community/profile/" +
                          this.props.administratorsList[i].UserId +
                          "/" +
                          this.props.administratorsList[i].Usertypeid
                        }
                      >
                        <CardSubtitle className="mb-1">
                          <span
                            style={{
                              fontWeight: "bold",
                              color: "#77787D",
                              fontSize: "14px",
                              float: "left",
                              marginLeft: "10px",
                            }}
                          >
                            <img
                              src="/assets/img/handwave.png"
                              alt=""
                              className="community_text_emoji"
                            />
                            {this.props.administratorsList[i].FirstName +
                              " " +
                              this.props.administratorsList[i].LastName}
                          </span>
                          <br />
                        </CardSubtitle>
                      </Link>

                      <span className="text-muted">
                        <span
                          style={{
                            fontWeight: "bold",
                            color: "#77787D",
                            fontSize: "10px",
                            float: "left",
                            marginLeft: "10px",
                          }}
                        >
                          <img
                            src="/assets/img/jobtitle.png"
                            alt=""
                            className="community_text_emoji"
                          />
                          {this.props.administratorsList[i].UserTitle}
                        </span>
                      </span>
                      <br></br>

                      <CardText className="text-muted  mb-2">
                        <Button
                          color="#17b298"
                          className="mb-2 community_messageme"
                        >
                          <a
                            target="_blank"
                            style={{ fontWeight: "bolder", color: "#fff" }}
                            href={messageUrl}
                            rel="noopener noreferrer"
                          >
                            <IntlMessages id=" Message Me" />
                          </a>
                        </Button>
                      </CardText>
                    </div>
                  </CardBody>
                </Card>
              }
            </Colxx>
          );
        }
        if (this.props.administrators_count > 7) {
          Title.push(
            <Colxx xxs="12" sm="6" md="6" lg="4" xl="3">
              <div className="showmore_community_member">
                <a onClick={this.handleAdminShowMoreClick} id="admin_toggler">
                  {this.props.administrators_count > 6
                    ? this.state.Adminshowmore
                      ? "Show More Members"
                      : "Show Less Members"
                    : null}
                </a>
              </div>
            </Colxx>
          );
        }
        table.push(<Row>{Heading}</Row>);
        table.push(<Row>{Title}</Row>);
      }
    }
    return table;
  };
  handleTextSearchChange = (event) => {
    this.setState({ searchText: event.target.value }, function () {
      this.props.getAdministratorsCommunityList({
        orgid: this.props.currentUser.organization.id,
        limit_size: constants.DEFAULT_LIMIT_SIZE,
        limit_start: 0,
        search_text: this.state.searchText,
        // departmant_id: this.state.depFilterVal,
        // supervisor_id: this.state.supervisorFilterVal,
        // usertype: this.props.currentUser.Usertypeid,
        user_id: this.props.currentUser.UserId,
        sort_dir: this.state.sort_dir,
        sort_type: this.state.sort_type,
      });
      this.props.getTeamMembersCommunityList({
        orgid: this.props.currentUser.organization.id,
        limit_size: constants.DEFAULT_LIMIT_SIZE,
        limit_start: 0,
        search_text: this.state.searchText,
        // departmant_id: this.state.depFilterVal,
        // supervisor_id: this.state.supervisorFilterVal,
        // usertype: this.props.currentUser.Usertypeid,
        user_id: this.props.currentUser.UserId,
        sort_dir: this.state.sort_dir,
        sort_type: this.state.sort_type,
      });
    });
  };
  render() {
    return (
      <Fragment>
        <Row>
          <Colxx xxs="12" md="7" sm="12" lg="7" xl="7">
            <h1 style={{ textAlign: "center", fontWeight: "bold" }}>
              Community
            </h1>
          </Colxx>
          <Colxx xxs="12" md="5" sm="12" lg="5" xl="5">
            <div className="form-group has-search">
              <span class="fa fa-search form-control-feedback"></span>
              <input
                onChange={this.handleTextSearchChange}
                name="searchKeyword"
                id="searchKeyword"
                className="form-control"
                placeholder="Search your community by name, title, school, interests, skills, or team!"
              />
              {/* <span className="search-icon">
                <i className="simple-icon-magnifier" />
              </span> */}
            </div>
          </Colxx>
          <Colxx sm="12">
            <Separator className="mb-5" />
          </Colxx>
        </Row>
        <Row>
          <Colxx xxs="2" md="2" sm="2" lg="2" xl="2"></Colxx>
          <Colxx
            xxs="8"
            md="8"
            sm="8"
            lg="8"
            xl="8"
            style={{
              textAlign: "center",
              marginBottom: "24px",
              textAlignLast: "center",
            }}
          >
            <span style={{ fontSize: "16px" }} className="alone-we-can-do-so">
              {this.props.currentUser.organization.OrgCommunity_Quote}
            </span>
          </Colxx>
          <Colxx xxs="12" md="12" sm="12" lg="12" xl="12">
            <UncontrolledDropdown>
              <DropdownToggle caret className="filter_community_dropdown">
                {this.state.filterValue === ""
                  ? "Filter by department"
                  : this.state.filterValue}
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem
                  dropDownValue="0"
                  onClick={() => this.handleFilterValue("All")}
                >
                  All
                </DropdownItem>
                {this.state.departmentList.length > 0
                  ? this.state.departmentList.map((Dept, key) => {
                      return (
                        <DropdownItem
                          dropDownValue={Dept.departmentDesc}
                          onClick={() =>
                            this.handleFilterValue(
                              Dept.departmentDesc,
                              Dept.departmentID
                            )
                          }
                        >
                          {Dept.departmentDesc}
                        </DropdownItem>
                      );
                    })
                  : null}
              </DropdownMenu>
            </UncontrolledDropdown>
          </Colxx>
        </Row>
        <br></br>
        {this.createAdministratorsListTable()}
        <br />
        <br />
        {this.createTeamMemberTable()}
      </Fragment>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    currentUser: state.userReducer.currentUser,
    administratorsList: state.organizationReducer.administratorsList,
    administrators_count: state.organizationReducer.administrators_count,
    teammembersList: state.organizationReducer.teammembersList,
    teammembersList_count: state.organizationReducer.teammembersList_count,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getAdministratorsCommunityList: (params) => {
      dispatch(getAdministratorsCommunityList(params));
    },
    getTeamMembersCommunityList: (params) => {
      dispatch(getTeamMembersCommunityList(params));
    },
    dispatch: dispatch,
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InternCommunityList);
