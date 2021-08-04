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
// import axiosInstance from "../../../utils/axiosApi";
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
import { addInternProfileImage } from "../../../action/profile/profile";

// const adaptFileEventToValue = (delegate) => (e) => delegate(e.target.files[0]);

// const FileInput = ({
//   input: { value: omitValue, onChange, onBlur, ...inputProps },
//   meta: omitMeta,
//   ...props
// }) => {
//   return (
//     <input
//       onChange={adaptFileEventToValue(onChange)}
//       onBlur={adaptFileEventToValue(onBlur)}
//       type="file"
//       {...props.input}
//       {...props}
//     />
//   );
// };

class addAlumniProfileImagePopUpForm extends React.Component {
  constructor(props) {
    super(props);
    this.SubmitInternProfileCroppingImageClick = this.SubmitInternProfileCroppingImageClick.bind(
      this
    );
    this.state = {
      userData: [],
      preview: null,
    };
    this.onCrop = this.onCrop.bind(this);
    this.onClose = this.onClose.bind(this);
    this.SubmitInternProfileCroppingImageClick = this.SubmitInternProfileCroppingImageClick.bind(
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

  SubmitInternProfileCroppingImageClick = () => {
    var params = {
      org: this.props.currentUser.organization.id,
      intern: this.props.currentUser.UserId,
      Type: "File",
      file: this.state.preview,
    };

    this.props.addInternProfileImage(params);
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
                        //width={390}
                        //height={295}
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
                  style={{ color: "#17B298" }}
                  className="cancle"
                  onClick={this.HandleCancleClick}
                  href={() => false}
                >
                  Cancel
                </a>
                {/* <Button
                  color="info"
                  type="button"
                  onClick={this.SubmitInternProfileCroppingImageClick}
                  className="default mb-2"
                >
                  Submit
                </Button> */}
                {this.state.preview !== null ? (
                  <Button
                    color="primary"
                    type="button"
                    onClick={this.SubmitInternProfileCroppingImageClick}
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
    fields: ["DocumentName", "Type"],
  },
  urls: {
    fields: ["doclinkdata"],
  },
};

addAlumniProfileImagePopUpForm = reduxForm({
  form: "addAlumniProfileImagePopUpForm", // a unique identifier for this form
  validate: (values) => {
    return validate(values, validations);
  },
})(addAlumniProfileImagePopUpForm);

const selector = formValueSelector("addAlumniProfileImagePopUpForm"); // <-- same as form name

const mapStateToProps = (state) => ({
  fileType: selector(state, "Type"),
  currentUser: state.userReducer.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
  addInternProfileImage: (params, callback) => {
    dispatch(addInternProfileImage(params, callback));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(addAlumniProfileImagePopUpForm);
