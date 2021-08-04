import React, { Component, Fragment } from "react";
// import { injectIntl } from "react-intl";
import { Row } from "reactstrap";
import { Colxx, Separator } from "../../../components/common/CustomBootstrap";
// import Breadcrumb from "../../../containers/navs/Breadcrumb";
import { connect } from "react-redux";

import { Card, CardBody } from "reactstrap";
import IntlMessages from "../../../helpers/IntlMessages";
import { Link } from "react-router-dom";
import ChatWidget from "@papercups-io/chat-widget";

class viewHelp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // supervisorList: [],
      formError: [],
    };
  }

  componentDidMount() {}

  // setFormError = (errors) => {
  //     this.setState({ formError: errors })
  // }

  render() {
    //const { } = this.props;
    return (
      <Fragment>
        <Row>
          <Colxx xxs="12">
            <h1 style={{ textAlign: "center", fontWeight: "bold" }}>
              Help Center
            </h1>
            <Separator className="mb-5" />
          </Colxx>
        </Row>
        <Row>
          <Colxx xxs="12" lg="2" xl="2"></Colxx>
          <Colxx xxs="12" lg="4" xl="4">
            <Link to={"/managerapp/symba/help-center/option"}>
              <Card className="help_card">
                <CardBody className="text-center">
                  <i
                    className="simple-icon-book-open"
                    style={{ fontSize: "36px" }}
                  />
                  <br></br>
                  <br></br>
                  <p
                    className="card-text font-weight-semibold mb-0"
                    style={{ fontSize: "22px" }}
                  >
                    <IntlMessages id="Guides" />
                  </p>
                  <br></br>
                  <p style={{ fontSize: "16px" }} className="text-center">
                    In-depth guides on everything Symba
                  </p>
                </CardBody>
              </Card>
            </Link>
          </Colxx>
          <Colxx xxs="12" lg="4" xl="4">
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.youtube.com/watch?v=bgVWuWfKFwg"
            >
              <Card className="help_card">
                <CardBody className="text-center">
                  <i class="fa fa-film" style={{ fontSize: "36px" }}></i>
                  <br></br>
                  <br></br>
                  <p
                    className="card-text font-weight-semibold mb-0"
                    style={{ fontSize: "22px" }}
                  >
                    <IntlMessages id="Videos" />
                  </p>
                  <br></br>
                  <p style={{ fontSize: "16px" }} className="text-center">
                    Video tutorials to help you throughout using Symba
                  </p>
                </CardBody>
              </Card>
            </a>
          </Colxx>
          <Colxx xxs="12" lg="2" xl="2"></Colxx>
        </Row>
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
      </Fragment>
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
    // addlaunchpadoverview: (values, errorCallback) => {
    //   dispatch(addlaunchpadoverview(values, errorCallback));
    // },
    dispatch: dispatch,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(viewHelp);
