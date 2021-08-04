import React, { Component, Fragment } from "react";
import { Row, Card, CardTitle, Button } from "reactstrap";
import { NavLink } from "react-router-dom";
// import { Formik, Form, Field } from "formik";
import { Colxx } from "../../components/common/CustomBootstrap";
import IntlMessages from "../../helpers/IntlMessages";
// import { forgotPassword } from "../../redux/actions";
// import { NotificationManager } from "../../components/common/react-notifications";
// import cn from "classnames";
import { connect } from "react-redux";
import axiosInstance from "../../utils/axiosApi";
import { getAPIURL } from "../../utils/getApiUrl";
import * as constants from "../../utils/constants";
import { updateLoader } from "../../action/master/masterData";
import ChatWidget from "@papercups-io/chat-widget";
export const EMAIL_REGEX = new RegExp(
  /[a-zA-Z0-9!#$%&'*+/=?^_`{|}~.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*/
);

class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      error: null,
      isSuccess: false,
    };
  }

  onForgotPassword = (values) => {
    if (!this.props.loading) {
      if (values.userName !== "") {
        // this.props.forgotPassword(values, this.props.history);
      }
    }
  };

  validateEmail = (value) => {
    let error;
    if (!value) {
      error = "Please enter your email address";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
      error = "Invalid email address";
    }
    return error;
  };

  componentDidUpdate() {}
  handelUserNameChange = (event) => {
    this.setState({ userName: event.target.value, error: null });
    if (!EMAIL_REGEX.test(event.target.value)) {
      this.setState({ error: "Please enter a valid email address" });
    }
  };
  handleSubmit = (event) => {
    event.preventDefault();

    this.props.updateLoader(true);
    var data = {
      username: this.state.userName,
      modifiedon: new Date(),
    };

    axiosInstance({
      method: "POST",
      url: getAPIURL(constants.FORGOT_PASSWORD_URL),
      data: data,
    })
      .then((response) => {
        this.setState({ isSuccess: true, error: null });
        this.props.updateLoader(false);
      })
      .catch((error) => {
        if (error.response.status === 400) {
          this.setState({ isSuccess: false, error: error.response.data });
        } else {
          // toastr.error('Some Error Occurred')
        }
        this.props.updateLoader(false);
      });
  };

  render() {
    //const { userName, error } = this.state;
    //const isEnabled = userName.length > 0 && error === null;

    return (
      <Fragment>
         <div className="fixed-background1" >
         <div class="flogo-login-rectangle"> 
         <NavLink to={`/home`} className="white">
                      <img
                        // style={{ width: "10%",marginLeft:"10px", padding:"10px" }}
                        // src="/assets/img/symba_logo_big.png"
                        alt=""
                        class="flogo-login"
                      />
                    </NavLink>  
                    </div>
        
          <div className="main1">
            <Row className="h-100">
              <Colxx xxs="3" md="3" className="spacing" />
              <Colxx xxs="12" sm="12" md="6" lg="6">
                <Card className="auth-card1">
                  <div className="form-side" style={{ width: "100%" }}>
                    <br></br>
                    <CardTitle className="mb-4 title1">Forgot Password</CardTitle>
                      <form
                        onSubmit={this.handleSubmit}
                        className="av-tooltip tooltip-label-bottom"
                      >
                        <div className="av-tooltip tooltip-label-bottom">
                          {!this.state.isSuccess ? (
                            <div>
                              <div className="forgotpass-input">
                                <input 
                                  type="text"
                                  className="form11"
                                  value={this.state.userName}
                                  placeholder="Email address"
                                  onChange={this.handelUserNameChange}
                                />
                                <span className="focus-input focus-username"></span>
                              </div>
                              <div className="justify-content-between align-items-center"> 
                                <Button
                                  color="primary"
                                  className={`btn-shadow btn-multiple-state bttn btttn ${
                                    this.props.loading ? "show-spinner" : ""
                                  }`}
                                  size="lg"
                                >
                                  <span className="spinner d-inline-block">
                                    <span className="bounce1" />
                                    <span className="bounce2" />
                                    <span className="bounce3" />
                                  </span>
                                  <span className="label">
                                    <IntlMessages id="Submit" />
                                  </span>
                                </Button>
                              </div>
                              <div className="footer">
                                <Row className="linedot"/>
                                  <div className="fgt">
                                    <NavLink className="linkcolor" to={`/user`}>
                                    <IntlMessages  id="Back to Login" />
                                    </NavLink>
                                  </div>
                                  
                              {this.state.error && (
                                <div className="validation-error">
                                  {this.state.error}
                                </div>
                              )}
                            </div>
                            </div>
                          ) : (
                            <div>
                              <div className="forgot-password-success space">
                                An email has been sent to the email address with
                                the new password details
                              </div>
                              <div className="footer">
                              <Row className="linedot"/>
                              <div className="fgt">
                                <NavLink className="linkcolor" to={`/user`}>
                                  <IntlMessages id="Back to Login" />
                                </NavLink>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </form>
                  
                  </div>
                </Card>
              </Colxx>
              <Colxx xxs="3" md="3" className="spacing" />
            </Row>
          </div><ChatWidget
            title="Symba Support"
            subtitle="Ask us your questions in the chat below and we will get back to you within 24 hours. In the meantime, access guides and FAQs within the Help tab."
            primaryColor="#17B298"
            greeting="Hi there, thanks for reaching out to Symba Support! How can we help?"
            newMessagePlaceholder="Start typing..."
            accountId="e09d8a48-fb81-4413-bbbc-c032288f6e33"
            baseUrl="https://app.papercups.io"
            showAgentAvailability={false}
          />
          {/* <div className="foo">
          <NavLink to={`/home`} >
                      <h4 className="buttonhome"><i class="fa fa-angle-left" aria-hidden="true"></i> Back to Home</h4>
            </NavLink> 
            </div> */}
          </div>
      



        {/* <div className="fixed-background" />
        <main>
          <div>
            <Row className="h-100">
              <Colxx xxs="12" md="8" sm="8">
                <Card className="auth-card">
                  <div className="form-side" style={{ width: "100%" }}>
                    <NavLink to={`/`} className="white">
                      <img
                        style={{ width: "30%" }}
                        src="/assets/img/symba_logo_big.png"
                        alt=""
                      />
                    </NavLink>
                    <br></br>
                    <br></br>
                    <CardTitle className="mb-4">
                      <form
                        onSubmit={this.handleSubmit}
                        className="av-tooltip tooltip-label-bottom"
                      >
                        <div className="av-tooltip tooltip-label-bottom">
                          {!this.state.isSuccess ? (
                            <div>
                              <div className="forgotpass-input">
                                <input
                                  type="text"
                                  className="form-control"
                                  value={this.state.userName}
                                  placeholder="Email address"
                                  onChange={this.handelUserNameChange}
                                />
                                <span className="focus-input focus-username"></span>
                              </div>
                              <div className="d-flex justify-content-between align-items-center">
                                <NavLink to={`/user`}>
                                  <IntlMessages id="Back to login" />
                                </NavLink>

                                <Button
                                  color="primary"
                                  className={`btn-shadow btn-multiple-state ${
                                    this.props.loading ? "show-spinner" : ""
                                  }`}
                                  size="lg"
                                >
                                  <span className="spinner d-inline-block">
                                    <span className="bounce1" />
                                    <span className="bounce2" />
                                    <span className="bounce3" />
                                  </span>
                                  <span className="label">
                                    <IntlMessages id="Submit" />
                                  </span>
                                </Button>
                              </div>
                              {this.state.error && (
                                <div className="validation-error">
                                  {this.state.error}
                                </div>
                              )}
                            </div>
                          ) : (
                            <div>
                              <div className="forgot-password-success">
                                An email has been sent to the email address with
                                the new password details
                              </div>
                              <div className="d-flex justify-content-between align-items-center">
                                <NavLink to={`/user`}>
                                  <IntlMessages id="Back to login" />
                                </NavLink>
                              </div>
                            </div>
                          )}
                        </div>
                      </form>
                    </CardTitle>
                  </div>
                </Card>
              </Colxx>
            </Row>
          </div>
        </main> */}
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
    updateLoader: (loaderState) => {
      dispatch(updateLoader(loaderState));
    },
    dispatch: dispatch,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
