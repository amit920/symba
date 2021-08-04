import React from "react";

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
// import { getSkills } from "../../../action/master/masterData";

// import { addUserSkills } from "../../../action/profile/profile";
// import { NotificationManager } from "../../../components/common/react-notifications";
// import _ from "lodash";
// import { getAPIURL } from "../../../utils/getApiUrl";
// import { Link } from "react-router-dom";
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

class editResourceSubmissionPopUpForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      chars_left: 100, max_chars: 100,
      charsTitle_left: 100, maxTitle_chars: 100
    };
  }
  componentDidMount() {}
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (!nextProps.dirty) {
      this.handelInitialValues(nextProps.resources);
    }
  }

  handelInitialValues = (resourceObject) => {
    const projectInitialObj = {
      Type: "File",
      resource_title: resourceObject.DocumentName,
      doclinkdata: resourceObject.Url,
      resource_description: resourceObject.DocumentDescription,
      documentId: resourceObject.DocumentId,
    };
    this.props.initialize(projectInitialObj);
  };
  handleWordCount = event => {
    const charCount = event.target.value.length;
    const maxChar = this.state.max_chars;
    const charLength = maxChar - charCount;
    this.setState({ chars_left: charLength });
}
handleTitleWordCount = event => {
  const charCount = event.target.value.length;
  const maxChar = this.state.maxTitle_chars;
  const charLength = maxChar - charCount;
  this.setState({ charsTitle_left: charLength });
}

  render() {
    //   console.log(this.props.project.projectid)
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
                Edit your Submission <br />
                <h6>
                  Please include the title, description, and details for your
                  project submission
                </h6>
              </h2>
            </ModalHeader>

            <ModalBody>
              <div>
              {/* <div className="container-fluid"> */}
                <div className="">
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
                        maxLength="100"
                        onChange={this.handleWordCount}  
                      />
                      <p style={{fontSize:'0.70rem',marginTop:'2px'}}>Characters Left: {this.state.chars_left}</p>

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
                          maxLength="100"
                          onChange={this.handleWordCount}  
                          
                        />
                        <p style={{fontSize:'0.70rem',marginTop:'2px'}}>Characters Left: {this.state.chars_left}</p>

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
                      <FormGroup style={{ marginLeft:"1px", marginRight:"1px" }}>
                        {fileType === "Link" && (
                          <div className="input-box-single">
                            <Field
                              name="doclinkdata"
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
    fields: ["file_title", "file_description", "Type"],
  },
  urls: {
    fields: ["doclinkdata"],
  },
};

editResourceSubmissionPopUpForm = reduxForm({
  form: "editResourceSubmissionPopUpForm", // a unique identifier for this form
  validate: (values) => {
    return validate(values, validations);
  },
})(editResourceSubmissionPopUpForm);

const selector = formValueSelector("editResourceSubmissionPopUpForm"); // <-- same as form name

const mapStateToProps = (state) => ({
  fileType: selector(state, "Type"),
  currentUser: state.userReducer.currentUser,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(editResourceSubmissionPopUpForm);
