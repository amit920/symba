import React from "react";

// import IntlMessages from "../../../helpers/IntlMessages";
import {
  // Field,
  // reduxForm,
  formValueSelector,
} from "redux-form";
// import Select from "react-select";
import { connect } from "react-redux";
// import {
//   renderTextField,
//   renderTextArea,
//   // renderDateField,
//   validate,
//   // renderSelectField,
//   // ComboField,
//   // renderMultiSelectField,
//   // fileInput,
// } from "../../util/form-fields";
// import * as constants from "../../../utils/constants";
import {
  Row,
  // Card,
  // CardBody,
  // CardTitle,
  // Button,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Card,
  CardBody,
  // Table,
  // FormGroup,
  // Input,
  // Label,
} from "reactstrap";
import { formatDateTime } from "../../../utils/globalFunctions";
import PerfectScrollbar from "react-perfect-scrollbar";
import Modal from "react-responsive-modal";
import "react-responsive-modal/styles.css";
// import { Link } from "react-router-dom";
import { Colxx } from "../../../components/common/CustomBootstrap";
// import { getSkills } from "../../../action/master/masterData";

// import { addUserSkills } from "../../../action/profile/profile";
// import { NotificationManager } from "../../../components/common/react-notifications";
// import _ from "lodash";
// import { getAPIURL } from "../../../utils/getApiUrl";
// import { Link } from "react-router-dom";
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

class bessiecooperPopUpForm extends React.Component {
  constructor(props) {
    super(props);
    // let rows = [];
    this.state = {
      //   chars_left: 250, max_chars: 250
    };
  }
  componentDidMount() {}
  //   UNSAFE_componentWillReceiveProps(nextProps) {
  //     if (!nextProps.dirty) {
  //       this.handelInitialValues(nextProps.resources);
  //     }
  //   }

  //   handelInitialValues = (resourceObject) => {
  //     const projectInitialObj = {
  //       Type: "File",
  //       resource_title: resourceObject.DocumentName,
  //       doclinkdata: resourceObject.Url,
  //       resource_description: resourceObject.DocumentDescription,
  //       documentId: resourceObject.DocumentId,
  //     };
  //     this.props.initialize(projectInitialObj);
  //   };
  //   handleWordCount = event => {
  //     const charCount = event.target.value.length;
  //     const maxChar = this.state.max_chars;
  //     const charLength = maxChar - charCount;
  //     this.setState({ chars_left: charLength });
  // }
  render() {
    //   console.log(this.props.project.projectid)
    const {
      // fileType,
      handleSubmit,
    } = this.props;

    return (
      <Modal
        open={this.props.modalStatus}
        onClose={this.props.onRequestClose}
        center
      >
        <div>
          <form onSubmit={handleSubmit}>
            <ModalHeader className="modalhead">
              <h2 className="fontheavy">{this.props.selectInternName}</h2>
            </ModalHeader>

            <ModalBody>
              <div>
                <div className="container-fluid">
                  <Row style={{ marginTop: "50px" }}>
                    <Colxx xxs="12" sm="12" md="12">
                      <label style={{ fontWeight: "bold", fontSize: "18px" }}>
                        Project Submissions{" "}
                      </label>
                    </Colxx>
                  </Row>
                  <Card>
                    <CardBody>
                      <Row>
                        <Colxx xxs="12" sm="12" md="12">
                          <Row className="popupborder">
                            <Colxx lg="3">
                              <p className="text-muted texxt mb-2 ">
                                {" "}
                                Date Submitted
                              </p>
                            </Colxx>
                            <Colxx lg="4">
                              {/* <th>Owner Name</th> */}
                              <p className="text-muted texxt mb-2 ">
                                Description
                              </p>
                            </Colxx>
                            <Colxx lg="5">
                              <p className="text-muted texxt mb-2 ">
                                Click to View
                              </p>
                            </Colxx>
                          </Row>
                          {this.props.InternProjectSubmissionCount > 0 ? (
                            this.props.InternProjectSubmissionList.map(
                              (resources) => {
                                return (
                                  <div className=" flex-row mb-3 pb-3 border-bottom">
                                    <Row className="">
                                      <Colxx lg="3" data-title="date">
                                        {formatDateTime(resources.DateAdded)}
                                      </Colxx>

                                      <Colxx lg="4" data-title="type">
                                        {resources.DocumentDescription}
                                      </Colxx>
                                      <Colxx lg="5" data-title="Url">
                                        <a
                                          style={{
                                            cursor: "pointer",
                                            textDecorationLine: "underline",
                                            color: "#46BFA5",
                                          }}
                                          href={resources.Url}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                        >
                                          {" "}
                                          {resources.DocumentName}
                                        </a>
                                      </Colxx>
                                    </Row>
                                  </div>
                                );
                              }
                            )
                          ) : (
                            <tr className="no-record-found">
                              <td>No Submissions Found</td>
                            </tr>
                          )}
                        </Colxx>
                      </Row>
                    </CardBody>
                  </Card>

                  <Row>
                    <Colxx xxs="12" sm="12" md="12">
                      <label
                        style={{
                          fontWeight: "bold",
                          fontSize: "larger",
                          marginTop: "5px",
                        }}
                      >
                        Tasks Completed
                      </label>
                    </Colxx>
                  </Row>
                  <Row>
                    <Colxx xxs="12">
                      <Card>
                        <CardBody>
                          <Row>
                            <Colxx xxs="8" sm="8" md="8">
                              <p className="text-muted texxt mb-2 ">Title</p>
                            </Colxx>
                            <Colxx xxs="4" sm="4" md="4">
                              <p className="text-muted mb-2 texxt">
                                Date Completed
                              </p>
                            </Colxx>
                          </Row>
                          <div style={{ height: "150px" }}>
                            <PerfectScrollbar
                              options={{
                                suppressScrollX: true,
                                wheelPropagation: false,
                              }}
                            >
                              {this.props.CompletedTaskCount > 0 ? (
                                this.props.CompletedTaskList.map(
                                  (task, index) => {
                                    return (
                                      <div
                                        key={index}
                                        className=" flex-row mb-3 pb-3 border-bottom"
                                      >
                                        <Row>
                                          <Colxx xxs="8" sm="8" md="8">
                                            <div>
                                              <span>{task.Name}</span>
                                            </div>
                                          </Colxx>
                                          <Colxx xxs="4" sm="4" md="4">
                                            <div>
                                              <p className=" mb-0">
                                                {formatDateTime(
                                                  task.DateCompleted
                                                )}
                                              </p>
                                            </div>
                                          </Colxx>
                                        </Row>
                                      </div>
                                    );
                                  }
                                )
                              ) : (
                                <tr className="no-record-found">
                                  <td>No Tasks Completed</td>
                                </tr>
                              )}
                            </PerfectScrollbar>
                          </div>
                        </CardBody>
                      </Card>
                    </Colxx>
                  </Row>
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              {/* <Button color="primary" type="submit">
                Submit
              </Button> */}
            </ModalFooter>
          </form>
        </div>
      </Modal>
    );
  }
}

// const validations = {
//   required: {
//     fields: ["file_title", "file_description", "Type"],
//   },
//   urls: {
//     fields: ["doclinkdata"],
//   },
// };

// bessiecooperPopUpForm = reduxForm({
//   form: "bessiecooperPopUpForm", // a unique identifier for this form
//   validate: (values) => {
//     return validate(values);
//   },
// })(bessiecooperPopUpForm);

const selector = formValueSelector("bessiecooperPopUpForm"); // <-- same as form name

const mapStateToProps = (state) => ({
  fileType: selector(state, "Type"),
  currentUser: state.userReducer.currentUser,
  InternProjectSubmissionList: state.projectReducer.InternProjectSubmissionList,
  InternProjectSubmissionCount:
    state.projectReducer.InternProjectSubmissionCount,  
  CompletedTaskList: state.projectReducer.CompletedTaskList,
  CompletedTaskCount: state.projectReducer.CompletedTaskCount,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(bessiecooperPopUpForm);
