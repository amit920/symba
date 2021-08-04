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
import ChatWidget from "@papercups-io/chat-widget";

class HelpGuideOptionForm extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {}

  render() {
    return (
      <div>
        <Fragment>
          <Row>
            <Colxx xxs="12" md="3" sm="4" lg="4">
              <Link to="/internapp/symba/help">
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
            <Colxx xxs="12" md="9" sm="9" lg="8">
              <h1 style={{ textAlign: "center", fontWeight: "bold" }}>
                What do you need help with?
              </h1>
            </Colxx>
          </Row>

          <Row>
            <Colxx xxs="12">
              <Separator className="mb-5" />
            </Colxx>
          </Row>
          <Row>
            <Colxx md="6" sm="6" lg="4" xxs="12">
              <Link to={"/internapp/symba/help-center/guide/3/Launchpad"}>
                <Card className="help_card">
                  <CardBody className="text-center">
                    <i className="simple-icon-rocket help_community_icon" />
                    <br></br>
                    <br></br>
                    <div className="help_community">
                      <p
                        className="card-text font-weight-semibold mb-0 help_community_card_title"
                        style={{ fontSize: "22px" }}
                      >
                        <IntlMessages id="Launchpad" />
                      </p>
                      <br></br>
                      <p className="text-center help_center">
                        Create customized resource centers and landing pages for
                        your program.
                      </p>
                    </div>
                  </CardBody>
                </Card>
              </Link>
            </Colxx>
            <Colxx md="6" sm="6" lg="4" xxs="12">
              <Link to={"/internapp/symba/help-center/guide/3/Engage"}>
                <Card className="help_card">
                  <CardBody className="text-center">
                    <i className="simple-icon-social-youtube help_community_icon" />
                    <br></br>
                    <br></br>
                    <div className="help_community">
                      <p className="card-text font-weight-semibold mb-0 help_community_card_title">
                        <IntlMessages id="Engage" />
                      </p>
                      <br></br>
                      <p className="text-center help_center">
                        Share videos and connect with your community through
                        discussion forums.
                      </p>
                    </div>
                  </CardBody>
                </Card>
              </Link>
            </Colxx>
            <Colxx md="6" sm="6" lg="4" xxs="12">
              <Link to={"/internapp/symba/help-center/guide/3/Projects"}>
                <Card className="help_card">
                  <CardBody className="text-center">
                    <i className="simple-icon-event help_community_icon" />
                    <br></br>
                    <br></br>
                    <div className="help_community">
                      <p className="card-text font-weight-semibold mb-0 help_community_card_title">
                        <IntlMessages id="Projects" />
                      </p>
                      <br></br>
                      <p className="text-center help_center">
                        Learn how to create, assign, and keep track of all
                        projects.
                      </p>
                    </div>
                  </CardBody>
                </Card>
              </Link>
            </Colxx>
            <Colxx md="6" sm="6" lg="4" xxs="12">
              <Link to={"/internapp/symba/help-center/guide/3/Community"}>
                <Card className="help_card">
                  <CardBody className="text-center">
                    <i className="simple-icon-people help_community_icon" />
                    <br></br>
                    <br></br>
                    <div className="help_community">
                      <p
                        className="card-text font-weight-semibold mb-0 help_community_card_title"
                        style={{ fontSize: "22px" }}
                      >
                        <IntlMessages id="Community" />
                      </p>
                      <br></br>
                      <p className="text-center help_center">
                        Adjust your profile and foster a community.
                      </p>
                    </div>
                  </CardBody>
                </Card>
              </Link>
            </Colxx>
            <Colxx md="6" sm="6" lg="4" xxs="12">
              <Link to={"/internapp/symba/help-center/guide/3/Feedback"}>
                <Card className="help_card">
                  <CardBody className="text-center">
                    <i className="simple-icon-bubbles help_community_icon" />
                    <br></br>
                    <br></br>
                    <div className="help_community">
                      <p className="card-text font-weight-semibold mb-0 help_community_card_title">
                        <IntlMessages id="Feedback" />
                      </p>
                      <br></br>
                      <p className="text-center help_center">
                        Keep track of progress and measure performance.
                      </p>
                    </div>
                  </CardBody>
                </Card>
              </Link>
            </Colxx>
          </Row>
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch: dispatch,
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HelpGuideOptionForm);
