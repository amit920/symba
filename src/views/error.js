import React, { Component, Fragment } from "react";
import { Row, Card, CardTitle, Button } from "reactstrap";
import { NavLink } from "react-router-dom";
import { Colxx } from "../components/common/CustomBootstrap";
import IntlMessages from "../helpers/IntlMessages";

class Error extends Component {
  componentDidMount() {
    document.body.classList.add("background");
    document.body.classList.add("no-footer");
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
                        Sorry, we couldn't find that page. Click{" "}
                        <a style={{ color: "#17B298" }} href="/user">
                          here
                        </a>{" "}
                        to go back to Symba's home page. 404
                      </span>
                      {/* <IntlMessages id="Sorry, we couldn't find that page. Click here to go back to Symba's home page. 404" /> */}
                    </CardTitle>

                    <Button
                      href="/user"
                      color="primary"
                      className="btn-shadow"
                      size="lg"
                    >
                      <IntlMessages id="go back home" />
                    </Button>
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
export default Error;
