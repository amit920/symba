import React, { Component, Fragment } from "react";

import {
  Row,
  Card,
  CardBody,
  // Input,
  CardTitle,
  FormGroup,
  Label,
  // CustomInput,
  Button,
  // FormText,
  Form,
  // ModalHeader,
  // ModalBody,
  // ModalFooter,
  // Table,
  // Modal,
} from "reactstrap";
// import { NavLink } from "react-router-dom";
// import { injectIntl } from "react-intl";

import IntlMessages from "../../../helpers/IntlMessages";

// import DatePicker from "react-datepicker";
// import moment from "moment";
// import TagsInput from "react-tagsinput";

import "react-tagsinput/react-tagsinput.css";
import "react-datepicker/dist/react-datepicker.css";
import "rc-switch/assets/index.css";
import "rc-slider/assets/index.css";
import "react-rater/lib/react-rater.css";
import AddEngageCategoryPopUpForm from "../engage/addEngageCategoryPopUpForm";
import { Colxx, Separator } from "../../../components/common/CustomBootstrap";
import { adminAddOrgEngageCategory } from "../../../action/orgengage/orgengage";

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
  renderTextField,
  renderTextArea,
  // renderDateField,
  validate,
  // renderSelectField,
  // ComboField,
  // renderMultiSelectField,
  // fileInput,
} from "../../util/form-fields";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {} from "../../../action/launchpad/launchpad";
import {
  // Field,
  // reduxForm,
  // FieldArray,
  // formValueSelector,
  reset,
} from "redux-form";
// import * as constants from "../../../utils/constants";
// import axiosInstance from "../../../utils/axiosApi";
// import { getAPIURL } from "../../../utils/getApiUrl";
import { getCategoryList } from "../../../action/organizations/organization";
/* eslint-disable */
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

class addEditEngageForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isEditMode: false,
      isEditForm: false,
      isNewForm: false,
      // Type: "File",
      chars_left: 500, max_chars: 500,
      addEngageCategoryModel: false,

    };
  }
  componentDidMount() {
    this.props.getCategoryList(this.props.currentUser.organization.id);
    this.props.initialize(
      {
        Type: "File",

      }
    )
}
    

  handelInitialValues = (EngObj) => {
    const EngageObj = {
      Type: "File",
      engage_category: EngObj.Category,
      engage_video_title: EngObj.Title,
      engage_video_url: EngObj.Url,
      engage_video_description: EngObj.Decription,
    };
    this.props.initialize(EngageObj);
  };

  handleWordCount = event => {
    const charCount = event.target.value.length;
    const maxChar = this.state.max_chars;
    const charLength = maxChar - charCount;
    this.setState({ chars_left: charLength });
}
openAddEnagegCategoryModel = () => {
  this.setState({ addEngageCategoryModel: true });
};
closeAddEnageCategoryModal = () => {
  this.props.dispatch(reset("addEngageCategoryPopUpForm"));
  this.setState({ addEngageCategoryModel: false });
};
submitEngageCategory = (values) => {
  if (values.categoryname === undefined) {
    return;
  }
  values.categoryname = values.categoryname;
  values.createby = this.props.currentUser.UserId;
  values.organization = this.props.currentUser.organization.id;
  this.props.adminAddOrgEngageCategory(
    values,
    this.closeAddEnageCategoryModal
  );
};
  render() {
    const { fileType, handleSubmit } = this.props;
    let oOptions = [];
    if (this.props.categoryList) {
      this.props.categoryList.map((c) => {
        oOptions.push(
          <option key={c.Categoryid} value={c.Categoryid}>
            {c.Categoryname}
          </option>
        );
      });
    }
    return (

      <div className="project-form">
        <form onSubmit={handleSubmit}>
          <Fragment>
            <Row>
              <Colxx xxs="12" lg="6" md="6">
                <Link to="/app/engage/list">
                  <i
                    class="fa fa-angle-left"
                    style={{
                      fontSize: "27px",
                      color: "#1EBAD6",
                      fontWeight: "bold",
                    }}
                  ></i>
                  <div style={{ marginTop: "-26px" }}>
                    <span
                      style={{
                        fontSize: "16px",
                        color: "#1EBAD6",
                        fontWeight: "bold",
                        marginLeft: "17px",
                      }}
                    >
                      Back
                    </span>
                  </div>
                </Link>
              </Colxx>
              <Colxx xxs="12" lg="6" md="6">
                <div style={{ float: "right" }} className="form-footer">
                  <div style={{ marginTop: 0 }} className="project-form-button">
                    {
                      <Button
                        style={{ margin: "0 10px" }}
                        outline
                        className="mb-2"
                        color="success"
                        type="submit"
                        
                      >
                        Save
                      </Button>
                    }

                    {
                      <Link
                        to="/app/engage/list"
                        className="button delete-button"
                      >
                        <Button color="danger" outline className="mb-2">
                          <IntlMessages id="Cancel" />
                        </Button>
                      </Link>
                    }
                  </div>
                </div>
              </Colxx>
            </Row>
            <br></br>
            <Row>
              <Colxx xxs="12">
                <h2>Add Engage</h2>
                <Separator className="mb-5" />
              </Colxx>
            </Row>

            <Row className="mb-4">
              <Colxx xxs="1"></Colxx>
              <Colxx xxs="12">
                <Card>
                  <CardBody>
                    <CardTitle>
                      <h6 style={{ marginTop: 4 }}>
                      Please enter the URL (Youtube Video) or upload a file (.mov and .mp4 supported) to
                       add videos to the Engage gallery.
                      {" "}
                      </h6>
                    </CardTitle>
                    <Form>
                      <FormGroup row>                      
                        <Colxx xxs="9" sm="9" lg="9" xl="9">
                          <FormGroup>
                            <Label className="required">Category</Label>
                            <Field
                              name="engage_category"
                              className="form-control"
                              placeholder="Select category"
                              component="select"
                              required="required"
                            >
                              <option value="0">Select category ...</option>
                              {oOptions}
                            </Field>
                          </FormGroup>
                        </Colxx>       
                        <Colxx xxs="3" sm="3" lg="3" xl="3">  
                          <FormGroup>                       
                            <Button                              
                              className="mb-2 addnew_category"
                              outline
                              color="primary"
                              onClick={this.openAddEnagegCategoryModel}
                            >
                              <IntlMessages id="Add Category"/>
                            </Button>
                          </FormGroup>
                        </Colxx>

                        <Colxx sm="12" xxs="12" lg="12" xl="12">
                          <Label className="required">Title</Label>
                          <FormGroup>
                            <div className="input-box-single">
                              <Field
                                name="engage_video_title"
                                ref="fieldvideotitle"
                                className="form-control"
                                component={renderTextField}
                                type="text"
                                placeholder="Enter title here"
                                required="required"
                              />
                            </div>
                          </FormGroup>
                        </Colxx>
                        <Colxx sm="12" xxs="12" lg="12" xl="12">
                          <Field
                            name="Type"
                            className="form-control"
                            component="select"
                          >
                            <option value="File">File</option>
                            <option value="Link">Link</option>
                          </Field>
                        </Colxx>
                        <Colxx sm="12" xxs="12" lg="12" xl="12">
                          <FormGroup style={{ marginTop: "15px" }}>
                            {fileType === "Link" && (
                              <div className="input-box-single">
                                <Field
                                  name="engage_video_url"
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
  
                        <Colxx sm="12" xxs="12" lg="12" xl="12">
                          <Label>Video description</Label>
                          <FormGroup>
                            <div className="input-box-single">
                              <Field
                                name="engage_video_description"
                                ref="fieldvideodescription"
                                className="form-control"
                                component={renderTextArea}
                                type="text"
                                rows={5}
                                placeholder="Enter decription here"
                                maxLength="500"
                                onChange={this.handleWordCount}   
                              />
                              <p style={{fontSize:'0.70rem',marginTop:'2px'}}>Characters Left: {this.state.chars_left}</p>

                            </div>
                          </FormGroup>
                        </Colxx>
                      </FormGroup>
                    </Form>
                  </CardBody>
                </Card>
              </Colxx>
            </Row>
          </Fragment>
        </form>
        <AddEngageCategoryPopUpForm
          onSubmit={this.submitEngageCategory}
          dispatch={this.props.dispatch}
          onRequestClose={this.closeAddEnageCategoryModal}
          modalStatus={this.state.addEngageCategoryModel}
          currentUser={this.props.currentUser}
        />
      </div>
    );
  }
}

const validations = {
  required: {
    fields: ["engage_video_title", "engage_video_url", "engage_category","Type"],
  },
  // urls: {
  //     fields: ['doclinkdata']
  // }
};

addEditEngageForm = reduxForm({
  form: "addEditEngageForm", // a unique identifier for this form
  validate: (values) => {
    return validate(values, validations);
  },
})(addEditEngageForm);

const selector = formValueSelector("addEditEngageForm"); // <-- same as form name

const mapStateToProps = (state) => ({
  fileType: selector(state, "Type"),
  currentUser: state.userReducer.currentUser,
  categoryList: state.organizationReducer.categoryList,
  categoryCount: state.organizationReducer.categoryCount,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getCategoryList: (organization) => {
      dispatch(getCategoryList(organization));
    },
    adminAddOrgEngageCategory: (params, callback) => {
      dispatch(adminAddOrgEngageCategory(params, callback));
    },
    // AddEngageDetil: ( ordId, params, callback) => {dispatch(AddEngageDetil( ordId, params, callback))},
    //   updateOverviewResources: ( ordId, params, callback) => {dispatch(updateOverviewResources( ordId, params, callback))},
    //   removeResourcesSubmission: (resources) => {dispatch(removeResourcesSubmission(resources))},
    //   launchpadResourcesDocumentsList: (params) => { dispatch(launchpadResourcesDocumentsList(params)) },
    dispatch: dispatch,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(addEditEngageForm);