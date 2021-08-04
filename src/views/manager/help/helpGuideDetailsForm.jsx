import React, { Component, Fragment } from "react";
// import { injectIntl } from "react-intl";
import { Row } from "reactstrap";
import { Colxx, Separator } from "../../../components/common/CustomBootstrap";
import {
  // Input,
  Card,
  CardBody,
  // CardTitle,
  // CardSubtitle,
  // CardImg,
  // CardText,
  // Button,
  // Table,
} from "reactstrap";
// import { NavLink } from "react-router-dom";
import IntlMessages from "../../../helpers/IntlMessages";
import { connect } from "react-redux";
// import * as constants from "../../../utils/constants";
import { Link } from "react-router-dom";
// import Pagination from "../../../containers/pages/Pagination";

// import { formatDateTime } from "../../../utils/globalFunctions";

// import {
//   Field,
//   reduxForm,
//   FieldArray,
//   formValueSelector,
//   reset,
// } from "redux-form";
import { getUserGuideDetail } from "../../../../src/action/helpcenter/helpcenter";
import ChatWidget from "@papercups-io/chat-widget";

class HelpGuideDetailsForm extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    if (
      this.props.match.params.usertype != null &&
      this.props.match.params.features != null
    ) {
      var queryObj = {
        user_type: this.props.match.params.usertype,
        features: this.props.match.params.features,
      };
      this.props.getUserGuideDetail(queryObj);
    }
  }
  guideDetailsCard = () => {
    let table = [];

    if (this.props.UserGuideList) {
      if (this.props.GuideCount > 0) {
        let Title = [];
        for (let i = 0; i < this.props.GuideCount; i++) {
          Title.push(
            <Colxx md="6" sm="6" lg="4" xxs="12">
              {
                <a href={this.props.UserGuideList[i].Url} target="_blank" rel="noopener noreferrer">
                  <Card style={{ height: "160px" }}>
                    <CardBody className="text-center">
                      <p
                        className="card-text font-weight-semibold mb-0"
                        style={{ fontSize: "18px" }}
                      >
                        <IntlMessages id={this.props.UserGuideList[i].Title} />
                      </p>
                      <br></br>
                      <p style={{ fontSize: "13px" }} className="text-center">
                        {this.props.UserGuideList[i].Description}
                      </p>
                    </CardBody>
                  </Card>{" "}
                  <br></br>
                  <br></br>
                </a>
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
            <Colxx xxs="12" md="2" sm="4">
              <Link to="/managerapp/symba/help-center/option">
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
            <Colxx xxs="12" md="8" sm="8" style={{ textAlign: "center" }}>
              <span style={{ fontWeight: "bold", fontSize: "24px" }}>
                Feature Details
              </span>
              <br></br>
              <span style={{ fontSize: "11px" }}>
                Still have questions? Please reach out to{" "}
                <a
                  style={{ color: "#17B298" }}
                  href="mailto:support@symba.io"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  support@symba.io
                </a>{" "}
              </span>
            </Colxx>
          </Row>

          <Row>
            <Colxx xxs="12">
              <Separator className="mb-5" />
            </Colxx>
          </Row>
          {this.guideDetailsCard()}
        </Fragment>
        <ChatWidget
          title="Symba Support"
          subtitle="Ask us your questions in the chat below and we will get back to you within 24 hours. In the meantime, access guides and FAQs within the Help tab."
          primaryColor="#17B298"
          greeting="Hi there, thanks for reaching out to Symba Support! How can we help?"
          customer={{
            name:
              this.props.currentUser.FirstName +
              " " +
              this.props.currentUser.LastName +
              " (" +
              this.props.currentUser.Email +
              ")",
            email: this.props.currentUser.Email,
            external_id: this.props.currentUser.UserId,
          }}
          newMessagePlaceholder="Start typing..."
          accountId="e09d8a48-fb81-4413-bbbc-c032288f6e33"
          baseUrl="https://app.papercups.io"
          showAgentAvailability={false}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.userReducer.currentUser,
    UserGuideList: state.helpCenterReducer.UserGuideList,
    GuideCount: state.helpCenterReducer.GuideCount,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUserGuideDetail: (filterObj) => {
      dispatch(getUserGuideDetail(filterObj));
    },

    dispatch: dispatch,
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HelpGuideDetailsForm);
