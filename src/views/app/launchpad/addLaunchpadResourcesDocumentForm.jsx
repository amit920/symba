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
  FormGroup,
  // Input,
  // Label,
} from "reactstrap";

import Modal from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import { Colxx } from "../../../components/common/CustomBootstrap";
const adaptFileEventToValue = (delegate) => (e) => delegate(e.target.files[0]);

const FileInput = ({
  input: { value: omitValue, onChange, onBlur, ...inputProps },
  meta: omitMeta,
  ...props
}) => {
  return (
    <input
      onChange={adaptFileEventToValue(onChange)}
      onBlur={adaptFileEventToValue(onBlur)}
      type="file"
      {...props.input}
      {...props}
    />
  );
};

class addlaunchpadResourcesDocumentForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: [],
      chars_left: 250,
      max_chars: 250,
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
    const projectInitialObj = {
      Type: "File",
      resource_title: "",
      resource_link: "",
      resource_description: "",
    };
    this.props.initialize(projectInitialObj);
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
    const { fileType, handleSubmit } = this.props;
    return (
      <Modal
        open={this.props.modalStatus}
        onClose={this.props.onRequestClose}
        center
      >
        <div>
          <form onSubmit={handleSubmit}>
            <ModalHeader>
              <h2>
                Add Resources and Documents <br />
                <h6>
                  Please include the title, description, and document details
                  below.
                </h6>
              </h2>
            </ModalHeader>

            <ModalBody>
              <div>
                <div className="container-fluid">
                  <Row>
                    <Colxx xxs="12" sm="12" md="12">
                      <label className="required">Title </label>
                      <Field
                        name="resource_title"
                        className="form-control"
                        component={renderTextField}
                        rows={8}
                        type="text"
                        placeholder="Enter Title"
                        required="required"
                      />
                    </Colxx>
                  </Row>
                  <Row style={{ marginTop: "15px" }}>
                    <Colxx xxs="12" sm="12" md="12">
                      <div className="input-box-single">
                        <label>Description </label>
                        <Field
                          name="resource_description"
                          className="form-control"
                          component={renderTextArea}
                          rows={8}
                          type="text"
                          placeholder="Enter Description"
                          required="required"
                          maxLength="250"
                          onChange={this.handleWordCount}
                        />
                        <p style={{ fontSize: "0.70rem", marginTop: "2px" }}>
                          Characters Left: {this.state.chars_left}
                        </p>
                      </div>
                    </Colxx>
                  </Row>
                  <Row style={{ marginTop: "15px" }}>
                    <Colxx xxs="12" sm="12" md="12">
                      <Field
                        name="Type"
                        className="form-control"
                        component="select"
                      >
                        <option value="File">File</option>
                        <option value="Link">Link</option>
                      </Field>
                    </Colxx>
                  </Row>
                  <Row style={{ marginTop: "15px" }}>
                    <Colxx sm="12" xxs="12" lg="12" xl="12">
                      <FormGroup>
                        {fileType === "Link" && (
                          <div className="input-box-single">
                            <Field
                              name="resource_link"
                              className="form-control"
                              component={renderTextField}
                              type="text"
                              placeholder="Enter full URL here. For example https://google.com"
                            />
                          </div>
                        )}
                        {fileType === "File" && (
                          <div className="input-box-single">
                            <Field
                              name="filelinkdata"
                              className="form-control"
                              component={FileInput}
                              required="required"
                            />
                          </div>
                        )}
                      </FormGroup>
                    </Colxx>
                  </Row>
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <Colxx xxs="12" sm="12" md="12" lg="12">
                <Button
                  color="primary"
                  type="submit"
                  style={{ float: "Right", marginRight: "-5%" }}
                >
                  Submit
                </Button>
              </Colxx>
            </ModalFooter>
          </form>
        </div>
      </Modal>
    );
  }
}

const validations = {
  required: {
    fields: ["resource_title", "Type","resource_link"],
  },
  urls: {
    fields: ["doclinkdata"],
  },
};

addlaunchpadResourcesDocumentForm = reduxForm({
  form: "addlaunchpadResourcesDocumentForm", // a unique identifier for this form
  validate: (values) => {
    return validate(values, validations);
  },
})(addlaunchpadResourcesDocumentForm);

const selector = formValueSelector("addlaunchpadResourcesDocumentForm"); // <-- same as form name

const mapStateToProps = (state) => ({
  fileType: selector(state, "Type"),
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(addlaunchpadResourcesDocumentForm);
