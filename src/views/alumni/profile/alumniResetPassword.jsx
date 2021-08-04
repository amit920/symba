import React, { Component } from "react";
import { connect } from "react-redux";
// import cn from "classnames";
import { AvForm, AvField, AvGroup } from "availity-reactstrap-validation";
// import { loginUser } from '../../actions/users/users';
import { toastr } from "react-redux-toastr";
// import ReduxToastr from "react-redux-toastr";
//import { Link, withRouter } from "react-router";
import { Link } from "react-router-dom";
import axiosInstance from "../../../utils/axiosApi";
import { getAPIURL } from "../../../utils/getApiUrl";
import * as constants from "../../../utils/constants";
// import BackHeader from '../../common/backHeader';
// import { isAdmin, isIntern } from "../../../utils/roleChecking";
import {
  Row,
  Card,
  // CardTitle,
  Label,
  // FormGroup,
  Button,
  // Input,
} from "reactstrap";
import { updateLoader } from "../../../action/master/masterData";
import { Colxx } from "../../../components/common/CustomBootstrap";
import { NotificationManager } from "../../../components/common/react-notifications";
import createBrowserHistory from "history/createBrowserHistory";
const browserHistory = createBrowserHistory();
class AlumniResetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      oldPassword: "",
      password: "",
      confirmPassword: "",
      error: null,
    };
  }

  UNSAFE_componentWillMount() {}

  handelOldPasswordChange = (event) => {
    this.setState({ oldPassword: event.target.value, error: null });
  };

  handelPasswordChange = (event) => {
    this.setState({ password: event.target.value, error: null });
  };

  handelPasswordConfirmationChange = (event) => {
    this.setState({ confirmPassword: event.target.value, error: null });
  };

  getRedirectUrl = () => {
    // if (isSupervisor(this.props.currentUser)) {
    //     return '/supervisor/dashboard'
    // } else if (isOrgination(this.props.currentUser)) {
    //     return '/organization/dashboard'
    // } else if (isIntern(this.props.currentUser)) {
    //     return '/intern/projects'
    // }else if (isWorker(this.props.currentUser)) {
    //     return '/worker/project/feedback'
    // }
  };

  getBackText = () => {
    // if (isSupervisor(this.props.currentUser)) {
    //     return 'Back to dashboard'
    // } else if (isOrgination(this.props.currentUser)) {
    //     return 'Back to dashboard'
    // } else if (isIntern(this.props.currentUser)) {
    //     return 'Back to projects'
    // }else if (isWorker(this.props.currentUser)) {
    //     return 'Back to feedback'
    // }
  };

  handleSubmit = (event) => {
    // var newURL = this.getRedirectUrl();
    event.preventDefault();
    if (this.state.password === this.state.confirmPassword) {
      this.props.updateLoader(true);
      var data = {
        user_id: this.props.currentUser.UserId,
        old_password: this.state.oldPassword,
        New_password: this.state.password,
        Confirm_password: this.state.confirmPassword,
        modifiedon:new Date(),
      };

      axiosInstance({
        method: "POST",
        url: getAPIURL(constants.RESET_PASSWORD_URL),
        data: data,
      })
        .then((response) => {
          toastr.success("password changed successfully");
          NotificationManager.success(
            "password changed successfully",
            "success",
            3000,
            null,
            null,
            ""
          );
          this.props.updateLoader(false);
          browserHistory.push("/user");
          window.location.reload();
        })
        .catch((error) => {
          if (error.response.status === 400) {
            this.setState({ isSuccess: false, error: error.response.data });
          } else {
            NotificationManager.error(
              "Some Error Occurred",
              "Error",
              3000,
              null,
              null,
              ""
            );
          }
          this.props.updateLoader(false);
        });
    } else {
      this.setState({
        error: "password and verify new password doesn't match",
      });
    }
  };

  render() {
    // const { password, confirmPassword, error } = this.state;
    const { password, confirmPassword} = this.state;
    const isEnabled = password.length > 5 && confirmPassword.length > 5;

    return (
      <div className="inner-content no-sidebar">
        <Colxx xxs="12" md="6" sm="6" className="mx-auto my-auto">
          <Card>
            <div className="reset-form  intern-form">
            <Row>
                <Colxx xxs="12" md="12" sm="12">
                  <Link to="/alumniapp/profile/view">
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
              </Row>
              <h2 style={{ textAlign: "center" }}>Reset Password</h2>
              <br></br>
              <form onSubmit={this.handleSubmit}>
                <ul style={{ listStyle: "none" }} className="clearfix">
                  <li>
                    <div className="form-group resetpass"> 
                      <label className="required">Old Password </label>
                      <input
                        type="password"
                        className="input-text"
                        value={this.state.oldPassword}
                        placeholder="old password"
                        onChange={this.handelOldPasswordChange}
                        required
                      />
                    </div>
                  </li>
                  <br></br>
                  <AvForm className="av-tooltip tooltip-label-right">
                    <AvGroup className="error-t-negative">
                      <Label className="required">New Password</Label>
                      <AvField
                        name="password"
                        type="password"
                        className="input-text"
                        value={this.state.password}
                        placeholder="new password"
                        onChange={this.handelPasswordChange}
                        validate={{
                          pattern: {
                            value: /^(?:(?=.{6,10})(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*)$/,
                            errorMessage:
                              "Your password must contain at least 6 characters, 1 capital letter, and 1 number",
                          },

                          required: {
                            value: true,
                            errorMessage: "Required",
                          },
                        }}
                      />
                    </AvGroup>
                  </AvForm>

                  {/* <li>
                                <div >
                                    <label className='required'>New Password </label>
                                    <input type="password" className="input-text" value={this.state.password} placeholder="new password" onChange={this.handelPasswordChange} required />
                                </div>
                            </li> */}

                  <AvForm className="av-tooltip tooltip-label-right">
                    <AvGroup className="error-t-negative">
                      <Label className="required">Verify New Password</Label>
                      <AvField
                        name="password"
                        type="password"
                        className="input-text"
                        value={this.state.confirmPassword}
                        placeholder="verify new password"
                        onChange={this.handelPasswordConfirmationChange}
                        required
                        validate={{
                          required: {
                            value: true,
                            errorMessage: "Required",
                          },
                        }}
                      />
                    </AvGroup>
                  </AvForm>

                  {/* <li>
                                <br></br>
                                <div >
                                    <label className='required'>Verify New Password </label>
                                    <input type="password" className="input-text" value={this.state.confirmPassword} placeholder="verify new password" onChange={this.handelPasswordConfirmationChange} required />
                                </div>
                            </li> */}
                </ul>
                {this.state.error && (
                  <div className="validation-error1">{this.state.error}</div>
                )}
                {/* <div style={{ textAlign: "center" }}>
                  <Button
                    type="submit"
                    color="primary"
                    className="px-4"
                    disabled={!isEnabled}
                    // className={cn({
                    //   disabled: !isEnabled,
                    // })}
                  >
                    Submit
                  </Button>
                </div> */}
                <Row>
                  <Colxx xxs="12" md="12" sm="12">
                    <Button
                      style={{ float: "right" }}
                      type="submit"
                      color="primary"
                      className="px-4"
                       disabled={!isEnabled}
                      // className={cn({
                      //   disabled: !isEnabled,
                      // })}
                    >
                      Submit
                    </Button>
                  </Colxx>
                </Row>
              </form>
            </div>
          </Card>
        </Colxx>
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
    updateLoader: (loaderState) => {
      dispatch(updateLoader(loaderState));
    },
    dispatch: dispatch,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AlumniResetPassword);
