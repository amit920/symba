import React, { Component, Fragment } from "react";

import {
  Row,
  Card,
  // CardBody,
  // Input,
  // CardTitle,
  FormGroup,
  // Label,
  // CustomInput,
  Button,
  // FormText,
  // Form,
  // ModalHeader,
  // ModalBody,
  // ModalFooter,
  // Table,
  // Modal,
} from "reactstrap";
// import { NavLink } from "react-router-dom";
// import { injectIntl } from "react-intl";

// import IntlMessages from "../../../helpers/IntlMessages";

// import DatePicker from "react-datepicker";
// import moment from "moment";
// import TagsInput from "react-tagsinput";

import "react-tagsinput/react-tagsinput.css";
import "react-datepicker/dist/react-datepicker.css";
import "rc-switch/assets/index.css";
import "rc-slider/assets/index.css";
import "react-rater/lib/react-rater.css";

import { Colxx } from "../../../components/common/CustomBootstrap";
// import Breadcrumb from "../../../containers/navs/Breadcrumb";

// import Select from "react-select";
// import CustomSelectInput from "../../../components/common/CustomSelectInput";
import {
  Field,
  reduxForm,
  // FieldArray,
  formValueSelector,
  // reset,
} from "redux-form";
import {
  // renderTextField,
  renderTextArea,
  // renderDateField,
  validate,
  // renderSelectField,
  // ComboField,
  // renderMultiSelectField,
  // fileInput,
} from "../../util/form-fields";
// import { Route, Link } from "react-router-dom";
import { connect } from "react-redux";
import {} from "../../../action/launchpad/launchpad";

// import * as constants from "../../../utils/constants";
// import axiosInstance from "../../../utils/axiosApi";
// import { getAPIURL } from "../../../utils/getApiUrl";
import StarRatingComponent from "react-star-rating-component";
import {
  AddResponse,
  getInternforFeedbackResponse,
} from "../../../action/feedback/feedback";
/* eslint-disable */

class ResponseFeedback extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isEditMode: false,
      isEditForm: false,
      isNewForm: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    this.props.getInternforFeedbackResponse(this.props.match.params.id);
  }
  onStarClick(nextValue, prevValue, name) {
    if (nextValue > 0) {
      this.setState({ rating: nextValue });
    }
  }

  getInternName = () => {
    let div = [];
    if (this.props.internInfo) {
      let Row = [];
      if (this.props.internInfo.FirstName != null) {
        Row.push(
          <div>
            <label style={{ fontSize: "15px" }} className="required">
            Requester Name
            </label>
            <input
              type="text"
              className="form-control"
              value={this.state.RecipientFullName}
              value={
                this.props.internInfo.FirstName +
                " " +
                this.props.internInfo.LastName
              }
              required="required"
              //required
            />
          </div>
        );
      } else {
        Row.push(<div>{<span></span>}</div>);
      }

      div.push(<div>{Row}</div>);
    }
    return div;
  };

  handleSubmit = () => {
    var params = {
      internuserid: this.props.match.params.id,
      recipientName: this.state.fullname,
      recipientemail: this.props.match.params.managerMail,
      project: this.props.match.params.projectTitle,
      feedbackstars: this.state.rating,
      feedbackq1response: this.refs.response1.value,
      // feedbackq2response : this.refs.response2.value,
      isactive: true,
      org: this.props.match.params.org,
      // hire_again:this.state.is_hire,
      requestfeedback_id: this.props.match.params.requestFeedback_id,
      status: true,
    };

    if (params.recipientName === undefined) {
      alert("Please provide your name");
    } else if (params.feedbackstars === undefined) {
      alert("Please provide star rating");
    } else if (params.feedbackq1response === undefined) {
      alert("Please provide your response");
    } else {
      this.props.AddResponse(params);
    }
  };
  handelUserNameChange = (event) => {
    this.setState({ fullname: event.target.value });
  };

  render() {
    // const { fileType, handleSubmit } = this.props;

    return (
      <Fragment>
        <div className="fixed-background" />
        <div className="container-fluid">
          <Row className="h-100">
            <Colxx xxs="12" md="5" sm="5" className="mx-auto my-auto">
              <Card className="auth-card" style={{ margin: "6px auto" }}>
                <div
                  className="form-side"
                  style={{ width: "100%", padding: "40px" }}
                >
                  <div style={{ textAlign: "center" }}>
                    <img
                      style={{ width: "30%" }}
                      src="/assets/img/symba_logo_big.png"
                      alt=""
                    />
                  </div>
                  <br></br>
                  <form className="av-tooltip tooltip-label-bottom">
                    <FormGroup>
                      <label style={{ fontSize: "15px" }} className="required">
                        Reviewer Name{" "}
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        value={this.state.RecipientFullName}
                        placeholder="Your name here"
                        required="required"
                        onChange={this.handelUserNameChange}
                        
                      />
                    </FormGroup>
                    <FormGroup>{this.getInternName()}</FormGroup>
                    <FormGroup>
                      <label style={{ fontSize: "15px" }} className="required">
                        Please rate {this.props.match.params.projectTitle}{" "}
                      </label>
                      <div style={{ fontSize: 35, marginTop: -11 }}>
                        <StarRatingComponent
                          ref="mystar"
                          name="rate1"
                          starCount={5}
                          starColor="#61eed2"
                          value={this.state.rating}
                          onStarClick={this.onStarClick.bind(this)}
                        />
                      </div>
                    </FormGroup>
                    <FormGroup style={{ marginTop: "-36px" }}>
                      <label style={{ fontSize: "15px" }} className="required">
                        Comments{" "}
                      </label>
                      <Field
                        name="feedback_q1_response"
                        ref="response1"
                        className="form-control"
                        component={renderTextArea}
                        rows={6}
                        type="text"
                        placeholder="Your answer here"
                      />
                    </FormGroup>
                    <div style={{ textAlign: "center" }}>
                      <Button
                        type="button"
                        color="info"
                        className="px-4"
                        onClick={this.handleSubmit}
                      >
                        Submit
                      </Button>
                    </div>
                  </form>
                </div>
              </Card>
            </Colxx>
          </Row>
        </div>
      </Fragment>
    );
  }
}

const validations = {
  required: {
    fields: ["Type"],
  },
  urls: {
    fields: ["doclinkdata"],
  },
};

ResponseFeedback = reduxForm({
  form: "ResponseFeedback", // a unique identifier for this form
  validate: (values) => {
    return validate(values, validations);
  },
})(ResponseFeedback);

const selector = formValueSelector("ResponseFeedback"); // <-- same as form name

const mapStateToProps = (state) => ({
  fileType: selector(state, "Type"),
  currentUser: state.userReducer.currentUser,
  internInfo: state.userReducer.internInfo,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getInternforFeedbackResponse: (internid) => {
      dispatch(getInternforFeedbackResponse(internid));
    },
    AddResponse: (params, callback) => {
      dispatch(AddResponse(params, callback));
    },

    dispatch: dispatch,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ResponseFeedback);
