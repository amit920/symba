import React from "react";
// import {
//   AvForm,
//   AvField,
//   AvGroup,
//   AvInput,
//   AvFeedback,
//   AvRadioGroup,
//   AvRadio,
//   AvCheckboxGroup,
//   AvCheckbox,
// } from "availity-reactstrap-validation";
// import IntlMessages from "../../../helpers/IntlMessages";
import { Field, reduxForm, formValueSelector } from "redux-form";
// import Select from "react-select";
import { connect } from "react-redux";
import {
  renderTextField,
  renderTextArea,
  // renderDateField,
  validate,
  // renderSelectField,
  // ComboField,
  // renderMultiSelectField,
  // fileInput,
} from "../../util/form-fields";
// import * as constants from "../../../utils/constants";
import {
  Row,
  // Card,
  // CardBody,
  // CardTitle,
  Button,
  ModalHeader,
  ModalBody,
  ModalFooter,
  // FormGroup,
  // Input,
  // Label,
} from "reactstrap";

import Modal from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import { Colxx } from "../../../components/common/CustomBootstrap";

class requestfeedbackPopupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: [],
      chars_left: 5000,
      max_chars: 5000,
    };
  }

  componentDidMount() {
    this.handelInitialValues();
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    //this.handelInitialValues();
  }

  componentWillUnmount() {}

  handelInitialValues = () => {
    const feedbackInitialObj = {
      recipient_mail: "",
      project_title: "",
      message: "",
    };
    this.props.initialize(feedbackInitialObj);
  };

  handleSelectChange = (value) => {
    console.log("You've selected:", value);
    this.setState({ value });
  };
  handleWordCount = (event) => {
    const charCount = event.target.value.length;
    const maxChar = this.state.max_chars;
    const charLength = maxChar - charCount;
    this.setState({ chars_left: charLength });
  };

  render() {
    // const { fileType, handleSubmit } = this.props;
    const { handleSubmit } = this.props;
    return (
      <Modal
        open={this.props.modalStatus}
        onClose={this.props.onRequestClose}
        center
      >
        <div>
          <form onSubmit={handleSubmit}>
            <ModalHeader>
              <h2>Request Feedback </h2>
            </ModalHeader>

            <ModalBody>
              <div>
                <div className="container-fluid">
                  <Row>
                    <Colxx xxs="12" sm="12" md="12">
                      <label className="required">Recipient Email </label>
                      <Field
                        name="recipient_mail"
                        className="form-control requestfeedback"
                        component={renderTextField}
                        rows={8}
                        type="text"
                        placeholder="Input the email address for whom you are requesting feedback from."
                        required="required"
                      />
                    </Colxx>
                  </Row>
                  <Row style={{ marginTop: "15px" }}>
                    <Colxx xxs="12" sm="12" md="12">
                      <label className="required">
                        Project Title (Please avoid special characters such as
                        *, #, %, etc in the project title){" "}
                      </label>
                      <Field
                        name="project_title"
                        className="form-control"
                        component={renderTextField}
                        rows={8}
                        type="text"
                        placeholder="Input project title here"
                        required="required"
                      />
                    </Colxx>
                  </Row>
                  <Row style={{ marginTop: "15px" }}>
                    <Colxx xxs="12" sm="12" md="12">
                      <label>Message </label>
                      <Field
                        name="message"
                        className="form-control"
                        component={renderTextArea}
                        rows={8}
                        cols={20}
                        type="text"
                        placeholder="Input your message here."
                        maxLength="5000"
                        onChange={this.handleWordCount}
                      />
                      <p style={{ fontSize: "0.70rem", marginTop: "2px" }}>
                        Characters Left: {this.state.chars_left}
                      </p>
                    </Colxx>
                  </Row>
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" type="submit">
                Submit
              </Button>
            </ModalFooter>
          </form>
        </div>
      </Modal>
    );
  }
}

const validations = {
  required: {
    fields: ["recipient_mail", "project_title", "Type"],
  },
  urls: {
    fields: [],
  },
};

requestfeedbackPopupForm = reduxForm({
  form: "requestfeedbackPopupForm", // a unique identifier for this form
  validate: (values) => {
    return validate(values, validations);
  },
})(requestfeedbackPopupForm);

const selector = formValueSelector("requestfeedbackPopupForm"); // <-- same as form name

const mapStateToProps = (state) => ({
  fileType: selector(state, "Type"),
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(requestfeedbackPopupForm);
