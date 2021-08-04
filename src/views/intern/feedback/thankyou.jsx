import React, { Component } from "react";
import { 
  // Field, 
  reduxForm,
  // FieldArray, formValueSelector
  } from "redux-form";
import { connect } from "react-redux";
import {
  // renderTextField,
  // renderTextArea,
  validate,
} from "../../util/form-fields";

// import { Row } from 'react-data-grid';

class ThankYou extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  static navigationOptions = {
    headerLeft: null,
  };
  static getDerivedStateFromProps(nextProps, prevState) {
    return null;
  }

  componentDidMount() {
    // history.pushState(null, null, location.href);
    // window.onpopstate = function () {
    //     history.go(1);
    // };
  }

  render() {
    return (
      <div className="login-wrapper">
        <div className="login-response">
          <div className="project-form intern-form single-">
            <form>
              <div className="login-header">
                <img src="/assets/img/symba_logo_big.png" alt="" />
              </div>
              <div
                style={{
                  textAlign: "center",
                  marginTop: "17px",
                  fontWeight: "bold",
                }}
                className="login-content"
              >
                <label>
                  Thanks for your response! To learn more about Symba{" "}
                </label>
                <label>
                  check out{" "}
                  <a
                    style={{ color: "#0000FF", textDecoration: "none" }}
                    href="https://symba.io"
                  >
                    symba.io
                  </a>
                </label>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
const validations = {
  required: {
    fields: [],
  },
};

ThankYou = reduxForm({
  form: "ThankYou", // a unique identifier for this form
  validate: (values) => {
    return validate(values, validations);
  },
})(ThankYou);

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {};

export default connect(mapStateToProps, mapDispatchToProps)(ThankYou);
