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
import {
  Field,
  reduxForm,
  // FieldArray,
  //formValueSelector,
  reset,
} from "redux-form";
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
import { Link } from "react-router-dom";
// import axiosInstance from "../../../utils/axiosApi";
// import { getAPIURL } from "../../../utils/getApiUrl";
import { engageDeleteVideo } from "../../../action/engage/engage";
//const adaptFileEventToValue = (delegate) => (e) => delegate(e.target.files[0]);
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

class editEngageVideoPopUpForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editEngageVideoModal: false, 
    };
  }

  componentDidMount() {}

  UNSAFE_componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    if (!nextProps.dirty) {
      this.handelInitialValues(nextProps.engageVideoData);
      this.setState({ engageVideoId: nextProps.engageVideoData.EngageVideoId });
      // var data = {
      //     params: {
      //     },
      // }
      // axiosInstance.get(getAPIURL(constants.GET_CATEGORY_LIST_URL, {":org": this.props.currentUser.organization.id}),data ).then(function (response) {
      //     // this.handelInitialValues(response.data);
      //         this.setState({categoryList: response.data})
      //         alert(this.state.categoryList)
      //         // if (typeof (response.data) != 'undefined') {
      //         //     this.setState({ isEditForm: true, isNewForm: false })
      //         // }
      //         // else {
      //         //     this.setState({ isEditForm: false, isNewForm: true, isEditMode: false })
      //         //     // this.props.clearInternDetails();
      //         // }
      //     }).catch((error) => {

      //     });
    }
  }

  componentWillUnmount() {}
  handelInitialValues = (docObject) => {
    const projectInitialObj = {
      // "engage_category":docObject.EngagecategoryId,
      engage_video_title: docObject.EngageVideoTitle,
      engage_video_url: docObject.EngageVideoUrl,
      engage_video_description: docObject.EngageVideoDescription,
      engage_video_id: docObject.EngageVideoId,
    };
    this.props.initialize(projectInitialObj);
  };

  handleSelectChange = (value) => {
    console.log("You've selected:", value);
    this.setState({ value });
  };
  handleDeleteVideo = () => {
    if (this.state.engageVideoId != null) {
      this.props.engageDeleteVideo(this.state.engageVideoId);
    }
    this.props.dispatch(reset("engageList"));
    this.setState({ editEngageVideoModal: false });  
  };

  render() {
    //const { fileType, handleSubmit } = this.props;
    const {  handleSubmit } = this.props;

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
                Edit Engage Details <br />
                <h6>
                  Please include the title, description, and video details
                  below.
                </h6>
              </h2>
            </ModalHeader>

            <ModalBody>
              <div>
                <div className="container-fluid">
                  {/* <Row>
                            <Colxx xxs="12" sm="12" md="12">
                            <label>Category </label>
                           
                            </Colxx>
                           
                        </Row> */}
                  <Row>
                    <Colxx xxs="12" sm="12" md="12">
                      <label className="required">Title </label>
                      <Field
                        name="engage_video_title"
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
                          name="engage_video_description"
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
                  {/* <Row style={{marginTop:'15px'}}>
                            <Colxx  xxs="12" sm="12" md="12">
                            <Field name="Type"   className="form-control"   component="select">                                  
                                      <option value='File'>File</option>
                                      <option value='Link'>Link</option>
                                            
                                  </Field>
                            </Colxx>
                            
                        </Row> */}
                  <Row style={{ marginTop: "15px" }}>
                    <Colxx sm="12" xxs="12" lg="12" xl="12">
                      <FormGroup>
                        <Field
                          name="engage_video_url"
                          className="form-control"
                          component={renderTextField}
                          type="text"
                          rows={5}
                          placeholder="Enter decription here"
                        />
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
              <Link
                to="/app/engage/list"                       
              >
                <Button
                  style={{marginRight:'15px'}}
                  color="primary"
                  type="button"
                  onClick={this.handleDeleteVideo}
                >
                  Delete
                </Button>
              </Link>
            </ModalFooter>
          </form>
        </div>
      </Modal>
    );
  }
}

const validations = {
  required: {
    fields: ["engage_video_title", "Type"],
  },
  urls: {
    fields: ["doclinkdata"],
  },
};

editEngageVideoPopUpForm = reduxForm({
  form: "editEngageVideoPopUpForm", // a unique identifier for this form
  validate: (values) => {
    return validate(values, validations);
  },
})(editEngageVideoPopUpForm);

//const selector = formValueSelector("editEngageVideoPopUpForm"); // <-- same as form name

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
  engageDeleteVideo: (engagevideoid) => {
    dispatch(engageDeleteVideo(engagevideoid));
  },
  dispatch: dispatch,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(editEngageVideoPopUpForm);
