import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { getUser } from "../../action/user/user";
import * as QueryString from "query-string";
import { Card, CardTitle, Row } from "reactstrap";
import { Colxx } from "../../components/common/CustomBootstrap";
import { NavLink } from "react-router-dom";
import localStorageService from "../../utils/localStorageService";
import jwt from "jwt-decode";

const LocalStorageService = localStorageService.getService();

export class Jwt extends Component {
  componentDidMount() {
    const params = QueryString.parse(this.props.location.search);
    LocalStorageService.setToken(params.jwt);
    const raw_token = jwt(params.jwt); // decode token to get user_id
    this.props.fetchUser(raw_token["user_id"]);
  }

  render() {
    return (
      <Fragment>
        <div className="fixed-background" />
        <main>
          <div className="container" style={{ marginLeft: "-168px" }}>
            <Row className="h-50">
              <Colxx xxs="12" md="10" sm="10" className="mx-auto my-auto">
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
                    <CardTitle className="mb-0">Signing in to Symba</CardTitle>
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
    fetchUser: (user_id) => {
      dispatch(getUser(user_id));
    },
    dispatch: dispatch,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Jwt);
