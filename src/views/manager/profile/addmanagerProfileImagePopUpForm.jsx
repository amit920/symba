import React from "react";
import { reduxForm, formValueSelector } from "redux-form";
// import Select from "react-select";
import { connect } from "react-redux";
import {
  // renderTextField,
  // renderTextArea,
  // renderDateField,
  validate,
  // renderSelectField,
  // ComboField,
  // renderMultiSelectField,
  // fileInput,
} from "../../util/form-fields";

// import * as constants from "../../../utils/constants";
// import { getAPIURL } from "../../../utils/getApiUrl";
// import { getBase64 } from "../../../utils/globalFunctions";
import Modal from "react-responsive-modal";

import "react-responsive-modal/styles.css";
// import ReactDOM from "react-dom";
import Avatar from "react-avatar-edit";
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
import { Colxx } from "../../../components/common/CustomBootstrap";
import { addManagerProfileImage } from "../../../action/profile/profile";

class addManagerProfileImagePopUpForm extends React.Component {
  constructor(props) {
    super(props);
    this.SubmitAdminProfileCroppingImageClick = this.SubmitAdminProfileCroppingImageClick.bind(
      this
    );
    this.state = {
      userData: [],
      preview: null,
    };
    this.onCrop = this.onCrop.bind(this);
    this.onClose = this.onClose.bind(this);
    this.SubmitAdminProfileCroppingImageClick = this.SubmitAdminProfileCroppingImageClick.bind(
      this
    );
  }
  onClose() {
    this.setState({ preview: null });
  }

  onCrop(preview) {
    this.setState({ preview });
  }
  componentDidMount() {
    this.handelInitialValues();
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    //this.handelInitialValues();
  }

  componentWillUnmount() {}

  SubmitAdminProfileCroppingImageClick = () => {
    var params = {
      org: this.props.currentUser.organization.id,
      intern: this.props.currentUser.UserId,
      Type: "File",
      file: this.state.preview,
    };
    this.props.addManagerProfileImage(params);
  };
  handelInitialValues = () => {
    const projectInitialObj = {
      Type: "File",
      DocumentName: "",
      doclinkdata: "",
    };
    this.props.initialize(projectInitialObj);
  };

  handleSelectChange = (value) => {
    console.log("You've selected:", value);
    this.setState({ value });
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
              <h2>Add Profile Image</h2>
            </ModalHeader>
            <ModalBody>
              <div className="container-fluid">
                <Row>
                  <Colxx xxs="12" sm="12" md="12">
                    <div className="clearfix">
                      <Avatar
                        // width={390}
                        // height={295}
                        onCrop={this.onCrop}
                        onClose={this.onClose}
                        label="Click to Upload Photo"
                        imageWidth={290}
                        imageHeight={200}
                        src={this.state.src}
                      />
                      <img
                        style={{ marginLeft: 40, marginTop: 10 }}
                        src={this.state.preview}
                        alt="Preview"
                      />
                    </div>
                    <ul className="clearfix"></ul>
                  </Colxx>
                </Row>
              </div>
              <ModalFooter>
                <a
                  style={{ color: "#17B298" }} //"#17A2B8"
                  className="cancle"
                  onClick={this.props.onRequestClose}
                  href={() => false}
                >
                  Cancel
                </a>

                {this.state.preview !== null ? (
                  <Button
                    color="primary"
                    type="button"
                    onClick={this.SubmitAdminProfileCroppingImageClick}
                    className="default mb-2"
                  >
                    Submit
                  </Button>
                ) : (
                  <Button
                    color="primary"
                    type="button"
                    disabled={true}
                    className="default mb-2"
                  >
                    Submit
                  </Button>
                )}
              </ModalFooter>
            </ModalBody>
          </form>
        </div>
      </Modal>
    );
  }
}

const validations = {
  required: {
    fields: [],
  },
  urls: {
    fields: [],
  },
};

addManagerProfileImagePopUpForm = reduxForm({
  form: "addManagerProfileImagePopUpForm", // a unique identifier for this form
  validate: (values) => {
    return validate(values, validations);
  },
})(addManagerProfileImagePopUpForm);

const selector = formValueSelector("addManagerProfileImagePopUpForm"); // <-- same as form name

const mapStateToProps = (state) => ({
  fileType: selector(state, "Type"),
  currentUser: state.userReducer.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
  addManagerProfileImage: (params, callback) => {
    dispatch(addManagerProfileImage(params, callback));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(addManagerProfileImagePopUpForm);
