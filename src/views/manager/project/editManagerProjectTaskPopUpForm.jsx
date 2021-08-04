import React from "react";

// import IntlMessages from "../../../helpers/IntlMessages";
import { Field, reduxForm, formValueSelector } from "redux-form";
// import Select from "react-select";
import { connect } from "react-redux";
import {
  renderTextField,
  // renderTextArea,
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
// import { getSkills } from "../../../action/master/masterData";

// import { addUserSkills } from "../../../action/profile/profile";
// import { NotificationManager } from "../../../components/common/react-notifications";
// import _ from "lodash";
// import { getAPIURL } from "../../../utils/getApiUrl";
// import { Link } from "react-router-dom";




class editManagerProjectTaskPopUpForm extends React.Component {
  constructor(props) {
    super(props);
    // let rows = [];
    this.state = {
      chars_left: 250, max_chars: 250
    };
  }
  componentDidMount() {}
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (!nextProps.dirty) {
        console.log(nextProps.task)
      this.handelInitialValues(nextProps.task);
    }
  }

  handelInitialValues = (taskObject) => {
    const projectInitialObj = {
      name: taskObject.Name,
      duedate: taskObject.Duedate,
      taskId: taskObject.Taskid,
    };
    this.props.initialize(projectInitialObj);
  };
  handleWordCount = event => {
    const charCount = event.target.value.length;
    const maxChar = this.state.max_chars;
    const charLength = maxChar - charCount;
    this.setState({ chars_left: charLength });
}
  render() {
    //   console.log(this.props.project.projectid)
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
                Edit Task<br />
                <h6>
                Please include the Task and Due Date below.
                </h6>
              </h2>
            </ModalHeader>

            <ModalBody>
            {/* <div className="container-fluid"> */}
            <div className="">
                <Row>
                  <Colxx xxs="12" sm="12" md="12">
                    <label className="required">Task Title </label>
                    <Field
                      name="name"
                      className="form-control"
                      component={renderTextField}
                      rows={8}
                      type="text"
                      placeholder="Enter Title"
                      required="required"
                      maxLength="250"
                      onChange={this.handleWordCount}  
                    />
                    <p style={{fontSize:'0.70rem',marginTop:'2px'}}>Characters Left: {this.state.chars_left}</p>

                  </Colxx>
                </Row>
                <Row style={{ marginTop: "15px" }}>
                  <Colxx xxs="12" sm="12" md="12">
                    <div className="input-box-single">
                      <label className="required">Task due date </label>
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
                {/* <Row style={{ marginTop: "15px" }}>
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
                </Row> */}
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
  
};

editManagerProjectTaskPopUpForm = reduxForm({
  form: "editManagerProjectTaskPopUpForm", // a unique identifier for this form
  validate: (values) => {
    return validate(values, validations);
  },
})(editManagerProjectTaskPopUpForm);

const selector = formValueSelector("editManagerProjectTaskPopUpForm"); // <-- same as form name

const mapStateToProps = (state) => ({
  fileType: selector(state, "Type"),
  currentUser: state.userReducer.currentUser,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(editManagerProjectTaskPopUpForm);
