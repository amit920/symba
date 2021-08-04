import React, { Component, Fragment } from "react";

import {
  Row,
  Card,
  CardBody,
  // Input,
  CardTitle,
  FormGroup,
  // Label,
  // CustomInput,
  Button,
  // FormText,
  Form,
  // ModalHeader,
  // ModalBody,
  // ModalFooter,
  Table,
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

import { EditorState, convertToRaw, ContentState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import htmlToDraft from "html-to-draftjs";
import { Colxx, Separator } from "../../../components/common/CustomBootstrap";
// import Breadcrumb from "../../../containers/navs/Breadcrumb";

// import Select from "react-select";
// import CustomSelectInput from "../../../components/common/CustomSelectInput";
import {
  Field,
  reduxForm,
  // FieldArray,
  formValueSelector,
  reset,
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
import {
  launchpadResourcesDocumentsList,
  addOverviewResources,
  removeResourcesSubmission,
  updateOverviewResources,
} from "../../../action/launchpad/launchpad";
import AddLaunchpadResourcesDocumentForm from "../launchpad/addLaunchpadResourcesDocumentForm";
import EditLaunchpadResourcesDocumentForm from "../launchpad/editLaunchpadResourcesDocumentForm";
import * as constants from "../../../utils/constants";
import axiosInstance from "../../../utils/axiosApi";
import { getAPIURL } from "../../../utils/getApiUrl";
// import createBrowserHistory from "history/createBrowserHistory";
// const browserHistory = createBrowserHistory();

const adaptFileEventToValue = (delegate) => (e) => delegate(e.target.files[0]);
const editorStyleObject = {
  padding: "6px 5px 0",
  borderRadius: "2px",
  border: "1px solid #F1F1F1",
  marginBottom: "5px",
  height: "200px",
};
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

class addEditlaunchpadForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isEditMode: false,
      isEditForm: false,
      isNewForm: false,
      addNewOverviewResourcesModal: false,
      editOverviewResourcesModal: false,
      currentResource: {},
      chars_left: 5000,
      max_chars: 5000,
      editorState: EditorState.createEmpty(),
      discription: "",
    };
  }
  componentDidMount() {
    // this.handelInitialValues();
    this.props.launchpadResourcesDocumentsList({
      deptid: this.props.deptId,
      orgid: this.props.currentUser.organization.id,
    });

    var data = {
      params: {
        orgid: this.props.currentUser.organization.id,
        deptid: this.props.deptId,
      },
    };
    axiosInstance
      .get(
        getAPIURL(constants.ADMIN_LAUNCHPAD_ORG_OVERVIEW_DETAIL_URL, {}),
        data
      )
      .then((response) => {
        this.handelInitialValues(response.data);
        this.setState({ overview: response.data });
        if (typeof response.data != "undefined") {
          this.setState({ isEditForm: true, isNewForm: false });
        } else {
          this.setState({
            isEditForm: false,
            isNewForm: true,
            isEditMode: false,
          });
          // this.props.clearInternDetails();
        }
      })
      .catch((error) => {
        // browserHistory.push("/unauthorizedpage");
        // window.location.reload(false);
      });
  }
  onEditorStateChange = (editorState) => {
    draftToHtml(convertToRaw(editorState.getCurrentContent()));
    const charCount = editorState.getCurrentContent().getPlainText("").length;
    const maxChar = this.state.max_chars;
    const charLength = maxChar - charCount;
    this.setState({ chars_left: charLength });
    if (charLength >= 0) {
      this.setState({
        editorState,
      });
    } else {
      alert(`Sorry, you've exceeded your limit of ${maxChar}`);
    }

    let discription_values = draftToHtml(
      convertToRaw(editorState.getCurrentContent())
    );
    this.setState({
      discription: discription_values,
    });
  };
  handleEditResources = (documentObj) => {
    this.setState({
      editOverviewResourcesModal: true,
      currentResource: documentObj,
    });
  };

  handleTagChange = (tags) => {
    this.setState({ tags });
  };
  closeAddNewOverviewSubmissionModal = () => {
    this.props.dispatch(reset("addlaunchpadResourcesDocumentForm"));
    this.setState({ addNewOverviewResourcesModal: false });
  };

  openAddNewOverviewSubmissionModal = () => {
    this.setState({ addNewOverviewResourcesModal: true });
  };
  closeEditSubmissionModal = () => {
    this.props.dispatch(reset("addlaunchpadResourcesDocumentForm"));
    this.setState({ editOverviewResourcesModal: false });
  };
  handleRemoveResourcesSubmission = (resources) => {
    this.props.removeResourcesSubmission(resources);
  };
  handelInitialValues = (OverviewObj) => {
    const overviewObj = {
      Type: "Link",
      launchpaddescription: OverviewObj.overviewDescription,// use when text is existis 
      filelinkdata: "",
      doclinkdata: OverviewObj.videourl,
      richtextdiscription: this.state.discription,// use for first time 
    };
    this.props.initialize(overviewObj);
    const blocksFromHtml = htmlToDraft(OverviewObj.overviewDescription);
    const { contentBlocks, entityMap } = blocksFromHtml;
    const contentState = ContentState.createFromBlockArray(
      contentBlocks,
      entityMap
    );
    const editorState = EditorState.createWithContent(contentState);
    this.setState({
      editorState: editorState,
    });
  };

  submit = (values) => {
    values.createdby = this.props.currentUser.UserId;
    values.departmentid = this.props.deptId;
    this.props.addOverviewResources(
      this.props.currentUser.organization.id,
      values,
      this.closeAddNewOverviewSubmissionModal
    ); // values.createby = this.props.currentUser.UserId
  };
  submitUpdate = (values) => {
    values.createby = this.props.currentUser.UserId;
    values.departmentid = this.props.deptId;
    this.props.updateOverviewResources(
      this.props.currentUser.organization.id,
      values,
      this.closeEditSubmissionModal
    );
  };
  // handleWordCount = (event) => {
  //   const charCount = event.target.value.length;
  //   const maxChar = this.state.max_chars;
  //   const charLength = maxChar - charCount;
  //   this.setState({ chars_left: charLength });
  // };

  render() {
    const { editorState } = this.state;
    const { fileType, handleSubmit } = this.props;
    return (
      <div className="project-form">
        <form onSubmit={handleSubmit}>
          <Fragment>
            <Row>
              <Colxx xxs="12" lg="6" md="6">
                <Link to="/app/admin/launchpad">
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
                        onClick={this.props.sendDiscription(
                          this.state.discription
                        )}
                      >
                        Save
                      </Button>
                      // <button type="submit" onSubmit={this.submit}  className="button button-submit">Save</button>
                    }

                    {
                      <Link
                        to="/app/admin/launchpad"
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
            <Row>
              <Colxx xxs="12">
                <h2>{this.props.deptName}</h2>
                {/* <Breadcrumb heading="menu.form-layouts" match={this.props.match} /> */}
                <Separator className="mb-5" />
              </Colxx>
            </Row>

            <Row className="mb-4">
              <Colxx xxs="12">
                <Card>
                  <CardBody>
                    <CardTitle>
                      <h4
                        style={{
                          fontWeight: "bold",
                          borderBottom: 0,
                          paddingBottom: 0,
                        }}
                      >
                        Welcome Video{" "}
                      </h4>
                      <h6 style={{ marginTop: 4 }}>
                        Please enter the URL of a video to share. You may upload
                        a photo if a video is not available.{" "}
                      </h6>
                    </CardTitle>
                    <Form>
                      <FormGroup row>
                        <Colxx xxs="12" sm="6" lg="6" xl="6">
                          <FormGroup>
                            <Field
                              name="Type"
                              className="form-control"
                              component="select"
                            >
                              <option value="File">File</option>
                              <option value="Link">Link</option>
                            </Field>
                          </FormGroup>
                        </Colxx>
                        <Colxx sm="6" xxs="12" lg="6" xl="6">
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
                                  required="required"
                                />
                              </div>
                            )}
                          </FormGroup>
                        </Colxx>
                        <Colxx sm="12" xxs="12" lg="12" xl="12">
                          <h4
                            style={{
                              fontWeight: "bold",
                              borderBottom: 0,
                              paddingBottom: 0,
                            }}
                          >
                            Program Description{" "}
                          </h4>
                          <h6 style={{ marginTop: 4 }}>
                            Please provide a program description.
                          </h6>
                        </Colxx>
                        <Colxx sm="12" xxs="12" lg="12" xl="12">
                          <div>
                            <Editor
                              name="launchpaddescription"
                              editorState={editorState}
                              wrapperClassName="wrapper-class"
                              editorClassName="editor-class"
                              toolbarClassName="toolbar-class"
                              editorStyle={editorStyleObject}
                              onEditorStateChange={this.onEditorStateChange}
                              component={renderTextArea}
                              toolbar={{
                                options: [
                                  "inline",
                                  "blockType",
                                  "fontSize",
                                  "list",
                                  "textAlign",
                                ],
                                // inline: { inDropdown: true },
                                // list: { inDropdown: true },
                                // textAlign: { inDropdown: true },
                                // link: { inDropdown: true },
                              }}
                            />
                            {/* <textarea
                              value={draftToHtml(
                                convertToRaw(editorState.getCurrentContent())
                              )}
                            /> */}
                          </div>
                          {/* <Field
                            style={{ marginTop: 7 }}
                            name="launchpaddescription"
                            className="form-control"
                            component={renderTextArea}
                            rows={5}
                            type="text"
                            placeholder="Enter description here...."
                            maxLength="5000"
                            onChange={this.handleWordCount}
                          /> */}
                          <p style={{ fontSize: "0.70rem", marginTop: "2px" }}>
                            Characters Left: {this.state.chars_left}
                          </p>
                        </Colxx>
                        <Colxx sm="9" xxs="12" lg="8" xl="8">
                          <h4 style={{ marginTop: 35, fontWeight: "bold" }}>
                            Resources and Documents
                          </h4>
                        </Colxx>
                        <Colxx sm="3" xxs="12" lg="4" xl="4">
                          <div className="project-head clearfix">
                            <Button
                              style={{ float: "right" }}
                              className="lanuchpad_addnew_rnd"
                              color="primary"
                              outline
                              //className="lanuchpad_add_resources"
                              onClick={this.openAddNewOverviewSubmissionModal}
                            >
                              <IntlMessages id="Add New" />
                            </Button>
                          </div>
                        </Colxx>
                        <br></br>
                        <Colxx xxs="12" sm="12" md="12" lg="12">
                          <Table
                            size="sm"
                            style={{ width: "100%", marginTop: 30 }}
                          >
                            <thead>
                              <tr>
                                <th style={{ width: "25%" }}>
                                  Title
                                  <br /> <span>(Click to Edit)</span>
                                </th>
                                <th style={{ width: "40%" }}>Description</th>
                                <th style={{ width: "25%" }}>Click to View</th>
                                <th
                                  style={{ textAlign: "center", width: "10%" }}
                                >
                                  Delete
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {this.props.resourcesList.length > 0 ? (
                                this.props.resourcesList.map((resources) => {
                                  return (
                                    <tr>
                                      <td data-title="Name">
                                        <Link
                                          style={{
                                            textDecoration: "underline",
                                            cursor: "pointer",
                                          }}
                                          onClick={() =>
                                            this.handleEditResources(resources)
                                          }
                                        >
                                          {resources.Resource_title}
                                        </Link>
                                      </td>

                                      <td data-title="type">
                                        {resources.Resource_description}
                                      </td>
                                      <td data-title="Url">
                                        <a
                                          style={{
                                            textDecoration: "underline",
                                            cursor: "pointer",
                                          }}
                                          href={resources.Resource_link}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                        >
                                          {resources.Resource_title}
                                        </a>
                                      </td>
                                      <td
                                        style={{ textAlign: "center" }}
                                        data-title="Delete"
                                      >
                                        <i
                                          onClick={() => {
                                            if (
                                              window.confirm(
                                                "Are you sure you want to delete this resource?"
                                              )
                                            ) {
                                              this.handleRemoveResourcesSubmission(
                                                resources
                                              );
                                            }
                                          }}
                                          style={{
                                            fontSize: "17px",
                                            cursor: "pointer",
                                          }}
                                          class="fa fa-trash-o"
                                        ></i>
                                      </td>
                                    </tr>
                                  );
                                })
                              ) : (
                                <tr className="no-record-found">
                                  <td>No Record Found</td>
                                </tr>
                              )}
                            </tbody>
                          </Table>
                        </Colxx>
                      </FormGroup>
                    </Form>
                  </CardBody>
                </Card>
              </Colxx>
            </Row>
          </Fragment>
        </form>
        <AddLaunchpadResourcesDocumentForm
          onSubmit={this.submit}
          dispatch={this.props.dispatch}
          onRequestClose={this.closeAddNewOverviewSubmissionModal}
          modalStatus={this.state.addNewOverviewResourcesModal}
          currentUser={this.props.currentUser}
          deptId={this.props.deptId}
        />
        <EditLaunchpadResourcesDocumentForm
          onSubmit={this.submitUpdate}
          dispatch={this.props.dispatch}
          onRequestClose={this.closeEditSubmissionModal}
          modalStatus={this.state.editOverviewResourcesModal}
          currentUser={this.props.currentUser}
          resources={this.state.currentResource}
        />
      </div>
    );
  }
}

const validations = {
  required: {
    fields: ["Type"],
  },
  urls: {
    fields: ["doclinkdata"],
  },
};

addEditlaunchpadForm = reduxForm({
  form: "addEditlaunchpadForm", // a unique identifier for this form
  validate: (values) => {
    return validate(values, validations);
  },
})(addEditlaunchpadForm);

const selector = formValueSelector("addEditlaunchpadForm"); // <-- same as form name

const mapStateToProps = (state) => ({
  fileType: selector(state, "Type"),
  currentUser: state.userReducer.currentUser,
  resourcesList: state.overviewResourceReducer.resourcesList,
  resourcesCount: state.overviewResourceReducer.resourcesCount,
});

const mapDispatchToProps = (dispatch) => {
  return {
    addOverviewResources: (ordId, params, callback) => {
      dispatch(addOverviewResources(ordId, params, callback));
    },
    updateOverviewResources: (ordId, params, callback) => {
      dispatch(updateOverviewResources(ordId, params, callback));
    },
    removeResourcesSubmission: (resources) => {
      dispatch(removeResourcesSubmission(resources));
    },
    launchpadResourcesDocumentsList: (params) => {
      dispatch(launchpadResourcesDocumentsList(params));
    },
    dispatch: dispatch,
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(addEditlaunchpadForm);
