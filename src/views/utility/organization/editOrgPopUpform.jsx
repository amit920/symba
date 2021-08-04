import React from "react";
import { Field, reduxForm, formValueSelector } from "redux-form";
// import Select from "react-select";
import { connect } from "react-redux";
import {
  renderTextField,
  // renderTextArea,
  // renderDateField,
  validate,
  // renderSelectField,
  // ComboField,
  // renderMultiSelectField,
  // fileInput,
} from "../../util/form-fields";
// import * as constants from "../../../utils/constants";
// import axiosInstance from "../../../utils/axiosApi";
// import { getAPIURL } from "../../../utils/getApiUrl";
// import { getBase64 } from "../../../utils/globalFunctions";
import Modal from "react-responsive-modal";
import "react-responsive-modal/styles.css";
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

class editOrgPopUpform extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    // this.handelInitialValues();
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (!nextProps.dirty) {
      this.handelInitialValues(nextProps.org);
    }
  }

  componentWillUnmount() {}

  handelInitialValues = (docObject) => {
    const projectInitialObj = {
      organizationname: docObject.org_name,
      orgid: docObject.org_id,
      Type: "File",
      doclinkdata: "",
      orgcommunityquote:docObject.orgcommunityquote,
    };
    this.props.initialize(projectInitialObj);
  };
  handleSelectChange = (value) => {
    console.log("You've selected:", value);
    this.setState({ value });
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
                Edit Organization <br />
              </h2>
            </ModalHeader>
            <ModalBody>
              <div className="container-fluid">
                <Row>
                  <Colxx xxs="12" sm="12" md="12">
                    <label className="required">Name </label>
                    <Field
                      name="organizationname"
                      className="form-control"
                      component={renderTextField}
                      rows={8}
                      type="text"
                      placeholder="Enter Organization Name"
                      required="required"
                    />
                  </Colxx>
                </Row>

                <Row style={{ marginTop: "15px" }}>
                   <Colxx xxs="12" sm="12" md="12">
                     <label>Community Quote </label>
                       <Field name="orgcommunityquote" 
                              className="form-control" 
                              component={renderTextField} 
                              rows={8} type="text" 
                              placeholder='Enter orgcommunityquote Name' 
                              required='required'  />
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
                            name="doclinkdata"
                            className="form-control"
                            component={renderTextField}
                            type="text"
                            placeholder="Enter URL here"
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
    fields: ["organizationname"],
  },
  // urls: {
  //     fields: ['doclinkdata']
  // }
};

editOrgPopUpform = reduxForm({
  form: "editOrgPopUpform", // a unique identifier for this form
  validate: (values) => {
    return validate(values, validations);
  },
})(editOrgPopUpform);

const selector = formValueSelector("editOrgPopUpform"); // <-- same as form name

const mapStateToProps = (state) => ({
  fileType: selector(state, "Type"),
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(editOrgPopUpform);
