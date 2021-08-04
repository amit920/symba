import React from "react";

// import IntlMessages from "../../../helpers/IntlMessages";
import { Field, reduxForm, formValueSelector } from "redux-form";
// import Select from "react-select";
import { connect } from "react-redux";
import {
  renderTextField,
  renderTextArea,
  renderDateField,
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

import "react-datepicker/dist/react-datepicker.css";

class addAdminProjectPopUpForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {}
  UNSAFE_componentWillReceiveProps(nextProps) {}

  handelInitialValues = (docObject) => {
    const projectInitialObj = {
      name: "",
      description: "",
      duedate: "",
    };
    this.props.initialize(projectInitialObj);
  };

  render() {
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
              <h2>
                Add Project <br />
                <h6>
                  Please include the title, description, and due-date details
                  below.
                </h6>
              </h2>
            </ModalHeader>

            <ModalBody>
            {/* <div className="container-fluid"> */}
              <div className="">
                <Row>
                  <Colxx xxs="12" sm="12" md="12">
                    <label className="required">Project Title </label>
                    <Field
                      name="name"
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
                      <label className="required">Project due date </label>
                      <Field
                        name="duedate"
                        className="input-text"
                        component={renderDateField}
                        type="text"
                        placeholder="Enter due date"
                      />
                    </div>
                  </Colxx>
                </Row>
                <Row style={{ marginTop: "15px" }}>
                  <Colxx xxs="12" sm="12" md="12">
                    <div className="input-box-single">
                      <label>Project description & instructions </label>
                      <Field
                        name="description"
                        className="form-control"
                        component={renderTextArea}
                        rows={8}
                        type="text"
                        placeholder="Enter Description"
                        required="required"
                      />
                    </div>
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
    fields: ["name", "duedate"],
  },
  urls: {
    fields: [""],
  },
};

addAdminProjectPopUpForm = reduxForm({
  form: "addAdminProjectPopUpForm",
  validate: (values) => {
    return validate(values, validations);
  },
})(addAdminProjectPopUpForm);

const selector = formValueSelector("addAdminProjectPopUpForm"); // <-- same as form name

const mapStateToProps = (state) => ({
  fileType: selector(state, "Type"),
  currentUser: state.userReducer.currentUser,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(addAdminProjectPopUpForm);
