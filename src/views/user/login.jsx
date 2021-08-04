import React, { Component, Fragment } from "react";
import { Button, Card, CardTitle, FormGroup, Input, Row } from "reactstrap";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { login } from "../../action/access/login";
import { Colxx } from "../../components/common/CustomBootstrap";
import { NotificationManager } from "../../components/common/react-notifications";
import ChatWidget from "@papercups-io/chat-widget";

export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: " ",
      password: "",
      passwordShown: false,
    };
  }

  handelUserNameChange = (event) => {
    this.setState({ userName: event.target.value });
  };

  handelPasswordChange = (event) => {
    this.setState({ password: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.state.userName === undefined || this.state.password === "") {
      NotificationManager.error(
        "Username and Password not found. Please contact your administration.",
        "Error",
        3000,
        null,
        null,
        ""
      );
    } else {
      this.props.loginUser(this.state.userName.trim(), this.state.password);
    }
  };
  togglePasswordVisiblity = () => {
    this.setState({
      passwordShown: this.state.passwordShown ? false : true,
    });
  };
  componentDidUpdate() {
  }
  render() {
    
    //const { } = this.state;
    // const initialValues = {email,password};

    return (
      //       <Fragment  old code >
      //       <div className="fixed-background" />
      //       <main>
      //         <div>
      //           <Row className="h-100">
      //             <Colxx xxs="12" sm="12" md="12" lg="8">
      //               <Card className="auth-card">
      //                 <div className="form-side" style={{ width: "100%" }}>
      //                   <NavLink to={`/`} className="white">
      //                     <img
      //                       style={{ width: "30%" }}
      //                       src="/assets/img/symba_logo_big.png"
      //                       alt=""
      //                     />
      //                   </NavLink>
      //                   <br></br>
      //                   <br></br>
      //                   <CardTitle className="mb-4">Login</CardTitle>
      // ​
      //                   <form
      //                     onSubmit={this.handleSubmit}
      //                     className="av-tooltip tooltip-label-bottom"
      //                   >
      //                     <FormGroup className="Loginstyle ">
      //                       <div>
      //                         <Label>
      //                           <span>Username</span>
      //                         </Label>
      //                         <Input
      //                           type="text"
      //                           placeholder="Username"
      //                           autoComplete="username"
      //                           value={this.state.userName}
      //                           onChange={this.handelUserNameChange}
      //                         />
      //                       </div>
      //                     </FormGroup>
      //                     <FormGroup className="Loginstyle ">
      //                       <div>
      //                         <Label>
      //                           <span>Password</span>
      //                         </Label>
      //                         <Input
      //                           type="password"
      //                           placeholder="Password"
      //                           value={this.state.password}
      //                           onChange={this.handelPasswordChange}
      //                         />
      //                       </div>
      //                     </FormGroup>
      //                     <div className="d-flex justify-content-between align-items-center">
      //                       <NavLink to={`/forgot-password`}>
      //                         <span style={{ fontSize: "14px" }}>
      //                           Forgot Password?
      //                         </span>
      //                       </NavLink>
      //                       <Button type="submit" color="primary" className="px-4">
      //                         Login
      //                       </Button>
      //                     </div>
      //                   </form>
      //                 </div>
      //               </Card>
      //             </Colxx>
      //           </Row>
      //         </div>
      //         <ChatWidget
      //           title="Symba Support"
      //           subtitle="Ask us your questions in the chat below and we will get back to you within 24 hours. In the meantime, access guides and FAQs within the Help tab."
      //           primaryColor="#17B298"
      //           greeting="Hi there, thanks for reaching out to Symba Support! How can we help?"
      //           newMessagePlaceholder="Start typing..."
      //           accountId="e09d8a48-fb81-4413-bbbc-c032288f6e33"
      //           baseUrl="https://app.papercups.io"
      //           showAgentAvailability={false}
      //         />
      //       </main>
      //     </Fragment>

      <Fragment>
        <div className="fixed-background1">
          <div class="flogo-login-rectangle">
                 
            <a href={'https://symba.io/'} target="_blank" className="white" rel="noopener noreferrer">
              <img
                // style={{ width: "10%", marginLeft:"10px", padding:"10px" }}
                // src="/assets/img/symba_logo_big.png"
                 alt=""
                class="flogo-login"
              />
            </a>
          </div>

          <div className="main1">
            <Row className="h-100">
              <Colxx
                xxs="12"
                sm="12"
                md="6"
                lg="6"
                className="illustration-login"
              >
                <img alt="" class="illustration-image-login" />
              </Colxx>
              <Colxx xxs="12" sm="12" md="6" lg="6">
                <Card className="auth-card1">
                  <div className="form-side" style={{ width: "100%" }}>
                    <CardTitle className="mb-4 title1">Log in</CardTitle>
                    <br></br>
                    <br></br>
                    <form
                      onSubmit={this.handleSubmit}
                      className="av-tooltip tooltip-label-bottom"
                    >
                      <FormGroup className="Loginstyle ">
                        <div>
                          {/* <Label>
                            <span>Username</span>
                          </Label> */}
                          <Input
                            className="form12"
                            type="text"
                            placeholder="Username"
                            autoComplete="username"
                            value={this.state.userName}
                            onChange={this.handelUserNameChange}
                          />
                        </div>
                      </FormGroup>
                      <FormGroup className="Loginstyle ">
                        <div>
                          {/* <Label>
                            <span>Password</span>
                          </Label> */}
                          <Input
                            className="form12"
                            type={
                              this.state.passwordShown ? "text" : "password"
                            }
                            placeholder="Password"
                            value={this.state.password}
                            onChange={this.handelPasswordChange}
                          />
                          {!this.state.passwordShown ? (
                            <i
                              className="fa fa-eye-slash password_show"
                              aria-hidden="true"
                              onClick={this.togglePasswordVisiblity}
                            ></i>
                          ) : (
                            <i
                              className="fa fa-eye password_show"
                              aria-hidden="true"
                              onClick={this.togglePasswordVisiblity}
                            ></i>
                          )}
                        </div>
                      </FormGroup>
                      <div className="justify-content-between align-items-center">
                        {/* <NavLink to={`/forgot-password`}>
                          <span style={{ fontSize: "14px" }}>
                            Forgot Password?
                          </span>
                        </NavLink> */}
                        <Button
                          type="submit"
                          color="primary"
                          className="px-4 bttn"
                        >
                          Log in now
                        </Button>
                        <div className="footer">
                        <Row className="linedotted " />                      
                        <div className="fgt" >
                          <NavLink  to={`/forgot-password`}>
                            <span className="buttontop">
                              Forgot Password?
                            </span>
                          </NavLink>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </Card>
              </Colxx>
            </Row>
          </div>
          
          <ChatWidget
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
          style={{marginLeft: "20px", fontWeight:"bold"}}
          </div> */}
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    // currentUser: state.userReducer.currentUser,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loginUser: (username, password) => {
      dispatch(login({ username: username, password: password }));
    },
    dispatch: dispatch,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);
