import React, { Component, Fragment } from "react";
import { Row, Card, CardTitle } from "reactstrap";
import { NavLink } from "react-router-dom";
import { Colxx } from "../components/common/CustomBootstrap";
import { connect } from "react-redux";

class UnauthorizedPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            landingpage:''
        };
      }
  componentDidMount() {
 
    document.body.classList.add("background");
    document.body.classList.add("no-footer");

    if(this.props.currentUser.type==='organization'){
      this.setState({
          landingpage:'app/admin/launchpad'
      })
    }
    else if(this.props.currentUser.type==='manager'){
        this.setState({
            landingpage:'managerapp/manager/launchpad'
        })
    }
    else if(this.props.currentUser.type==='intern'){
        this.setState({
            landingpage:'internapp/intern/launchpad'
        })
    }
    else if(this.props.currentUser.type==='alumni'){
      this.setState({
          landingpage:'alumniapp/alumni/launchpad'
      })
  }
  }
  componentWillUnmount() {
    document.body.classList.remove("background");
    document.body.classList.remove("no-footer");
  }
  render() {
    return (
      <Fragment>
        <div className="fixed-background" />
        <main>
          <div className="container">
            <Row className="h-100">
              <Colxx xxs="12" md="10" className="mx-auto my-auto">
                <Card className="auth-card">
                  <div className="form-side" style={{ width: "100%" }}>
                    <NavLink to={`/`} className="white">
                      <img
                        style={{ width: "15%" }}
                        src="/assets/img/symba_logo_big.png"
                        alt=""
                      />
                    </NavLink>
                    <br></br>
                    <br></br>
                    <CardTitle className="mb-4">
                      <span>
                      Oops, this is an invalid page. Please click {" "}
                        <a style={{ color: "#17B298" }} href={this.state.landingpage}>
                          here
                        </a>{" "}
                        to go back.
                      </span>
                      {/* <IntlMessages id="Sorry, we couldn't find that page. Click here to go back to Symba's home page. 404" /> */}
                    </CardTitle>

                    {/* <Button
                      href="/user"
                      color="primary"
                      className="btn-shadow"
                      size="lg"
                    >
                      <IntlMessages id="go back home" />
                    </Button> */}
                  </div>
                </Card>
              </Colxx>
            </Row>
          </div>
        </main>
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
     
      dispatch: dispatch,
    };
  };
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(UnauthorizedPage);
// export default UnauthorizedError;
