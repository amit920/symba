import React, { Component, Fragment } from "react";
// import { injectIntl } from "react-intl";
import { Row } from "reactstrap";
import { Colxx, Separator } from "../../../components/common/CustomBootstrap";
import {
  // Input,
  Card,
  CardBody,
  CardTitle,
  // CardSubtitle,
  // CardImg,
  // CardText,
  Button,
} from "reactstrap";
// import { NavLink } from "react-router-dom";
import IntlMessages from "../../../helpers/IntlMessages";
// import { getInternList } from '../../../action/community/community';
import { connect } from "react-redux";
// import * as constants from "../../../utils/constants";
// import { Route, Link } from "react-router-dom";
import RequestFeedbackPopupForm from "../feedback/requestFeedbackPopupForm";
import {
  // Field,
  // reduxForm,
  // FieldArray,
  // formValueSelector,
  reset,
} from "redux-form";
import {
  SendFeedbackRequest,
  internFeedbackList,
} from "../../../action/feedback/feedback";
class InternFeedbackForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: null,

      sort_dir: null,
      sort_type: null,
      addNewReuestFeedbackModal: false,
    };
  }
  componentDidMount() {
    // this.props.internFeedbackList(this.props.currentUser.UserId)
    this.props.internFeedbackList({
      // orgid:this.props.currentUser.organization.id,
      // limit_size: constants.DEFAULT_LIMIT_SIZE,
      // limit_start: 0,
      search_text: this.state.searchText,
      // departmant_id: this.state.depFilterVal,
      // supervisor_id: this.state.supervisorFilterVal,
      // usertype: this.props.currentUser.Usertypeid,
      user_id: this.props.currentUser.UserId,
      // sort_dir: this.state.sort_dir,
      // sort_type: this.state.sort_type
    });
  }

  handleTextSearchChange = (event) => {
    this.setState({ searchText: event.target.value }, function () {
      this.props.internFeedbackList({
        // orgid:this.props.currentUser.organization.id,
        // limit_size: constants.DEFAULT_LIMIT_SIZE,
        // limit_start: 0,
        search_text: this.state.searchText,
        // departmant_id: this.state.depFilterVal,
        // supervisor_id: this.state.supervisorFilterVal,
        // usertype: this.props.currentUser.Usertypeid,
        user_id: this.props.currentUser.UserId,
        // sort_dir: this.state.sort_dir,
        // sort_type: this.state.sort_type
      });
    });
  };
  openAddNewRequestFeedbackModal = () => {
    this.setState({ addNewReuestFeedbackModal: true });
  };
  closeRequestFeedbackModal = () => {
    this.props.dispatch(reset("requestfeedbackPopupForm"));
    this.setState({ addNewReuestFeedbackModal: false });
  };
  submit = (values) => {
    values.createdby = this.props.currentUser.UserId;
    this.props.SendFeedbackRequest(
      this.props.currentUser.organization.id,
      values,
      this.props.currentUser.Usertypeid,
      this.closeRequestFeedbackModal
    );
  };
  getRatingStar = (rating) => {
    let table = [];
    if (rating > 0) {
      let Title = [];
      for (let j = 0; j < rating; j++) {
        Title.push(
          <span style={{ paddingLeft: "14px" }}>
            {
              <span
                style={{ fontSize: "1.5em" }}
                class="fa fa-star  checked"
              ></span>
            }
          </span>
        );
      }
      for (let j = 0; j < 5 - rating; j++) {
        Title.push(
          <span style={{ paddingLeft: "14px" }}>
            {
              <span
                style={{ fontSize: "1.5em", color: "#17B298" }}
                class="fa fa-star-o "
              ></span>
            }
          </span>
        );
      }

      table.push(<Row>{Title}</Row>);
    }
    return table;
  };
  createFeedbackList = () => {
    let table = [];
    if (this.props.feedbackList) {
      if (this.props.feedbackCount > 0) {
        let Title = [];
        for (let i = 0; i < this.props.feedbackCount; i++) {
          Title.push(
            <Colxx xxs="12" md="10" sm="10" lg="8" xl="8">
              {
                <div>
                  <Card>
                    <CardBody>
                      <CardTitle style={{ marginBottom: "1rem" }}>
                        <span style={{ fontWeight: "bold", fontSize: "15px" }}>
                          {this.props.feedbackList[i].ManagerName + ": "}{" "}
                        </span>
                        <label style={{ fontSize: "13px" }}>
                          {" "}
                          {new Intl.DateTimeFormat("us-GB", {
                            month: "long",
                            day: "2-digit",
                            year: "numeric",
                          }).format(
                            new Date(this.props.feedbackList[i].Datesubmitted)
                          )}
                        </label>
                        {this.getRatingStar(
                          this.props.feedbackList[i].StarRating
                        )}
                      </CardTitle>

                      <span style={{ fontWeight: "bold", fontSize: "18px" }}>
                        Project: {this.props.feedbackList[i].Project}
                      </span>
                      <br></br>
                      <span style={{ fontSize: "15px" }}>
                        {" "}
                        {this.props.feedbackList[i].Feedbackq1response}
                      </span>
                    </CardBody>
                  </Card>
                  <br></br>
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
      <div>
        <Fragment>
          <Row>
            <Colxx xxs="12">
              <h1 style={{ textAlign: "center", fontWeight: "bold" }}>
                Feedback
              </h1>
              <Separator className="mb-5" />
            </Colxx>
          </Row>

          <Row>
            <Colxx xxs="12" md="6" sm="6" lg="6" xl="6">
              <div className="form-group has-search">
                <span class="fa fa-search form-control-feedback"></span>
                <input
                  onChange={this.handleTextSearchChange}
                  name="searchKeyword"
                  id="searchKeyword"
                  placeholder="Search feedback"
                  className="form-control"
                />
                {/* <span className="search-icon">
                  <i className="simple-icon-magnifier" />
                </span> */}
              </div>
            </Colxx>
            <Colxx xxs="12" md="6" sm="6" lg="6" xl="6">
              <Button
                color="primary"
                outline
                className="mb-2"
                onClick={this.openAddNewRequestFeedbackModal}
              >
                <IntlMessages id="Request Feedback" />
              </Button>
            </Colxx>
          </Row>
          <br></br>
          {this.createFeedbackList()}
        </Fragment>
        <RequestFeedbackPopupForm
          onSubmit={this.submit}
          dispatch={this.props.dispatch}
          onRequestClose={this.closeRequestFeedbackModal}
          modalStatus={this.state.addNewReuestFeedbackModal}
          currentUser={this.props.currentUser}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.userReducer.currentUser,
    feedbackList: state.internFeedbackReducer.feedbackList,
    feedbackCount: state.internFeedbackReducer.feedbackCount,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    SendFeedbackRequest: ( orgid, params, userType, callback) => {
      dispatch(
        SendFeedbackRequest( orgid, params, userType, callback)
      );
    },
    internFeedbackList: (internid) => {
      dispatch(internFeedbackList(internid));
    },

    // getInternList: (params) => { dispatch(getInternList(params)) },
    dispatch: dispatch,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(InternFeedbackForm);
