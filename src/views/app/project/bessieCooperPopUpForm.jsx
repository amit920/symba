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
// import { internProjectSubmissionList,
//   getcompletedInternProjectTaskList } from "../../../../src/action/admin/admin";
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

class bessieCooperPopUpForm extends React.Component {
  constructor(props) {
    super(props);
    // let rows = [];
    this.state = {
      //   chars_left: 250, max_chars: 250
    };
  }
  componentDidMount() {
    //  this.props.internProjectSubmissionList({
    //   orgid: this.props.currentUser.organization.id,
    //   projectid: this.props.projectId,
    // });
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (!nextProps.dirty) {
      // this.props.getcompletedInternProjectTaskList({
      //   orgid: this.props.currentUser.organization.id,
      //   projectid: this.props.projectId,
      //   userid: nextProps.selectedInternId,
      // });
      // this.handelInitialValues(nextProps.Uid);
    }
  }

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
  // renderSelectedInternSubmission = () => {
  //   let table = [];
  //   // let status;
  //   if (this.props.assignedInternList) {
  //     if (this.props.assignedInternsCount > 0) {
  //       let Title = [];
  //       for (let i = 0; i < this.props.assignedInternsCount; i++) {
  //         Title.push(
  //           <div>
  //             {this.props.assignedInternList[i].internProjectdocumentCount >
  //             0 ? (
  //               this.props.assignedInternList[i].internProjectdocumentList.map(
  //                 (doc, index) => {
  //                   return (
  //                     <div
  //                       key={index}
  //                       className=" flex-row mb-3 pb-1 border-bottom"
  //                     >
  //                       <Row>
  //                         <Colxx lg="4" sm="4" md="4" data-title="date">
  //                           {formatDateTime(doc.DateAdded)}
  //                         </Colxx>
  //                         <Colxx lg="4" sm="4" md="4" data-title="type">
  //                           {doc.DocumentDescription}
  //                         </Colxx>
  //                         <Colxx lg="4" sm="4" md="4" data-title="Url">
  //                           <a
  //                             style={{ cursor: "pointer" }}
  //                             href={doc.Url}
  //                             target="_blank"
  //                             rel="noopener noreferrer"
  //                           >
  //                             {" "}
  //                             {doc.DocumentName}
  //                           </a>
  //                         </Colxx>
  //                       </Row>
  //                     </div>
  //                   );
  //                 }
  //               )
  //             ) : (
  //               <tr className="no-record-found">
  //                 <td>No Submissions Found</td>
  //               </tr>
  //             )}
  //           </div>
  //         );
  //       }
  //       table.push(Title);
  //     }
  //   }
  //   return table;
  // };
  // renderSelectedInternCompletedTask = () => {
  //   let table = [];
  //   if (this.props.assignedInternList) {
  //     if (this.props.assignedInternsCount > 0) {
  //       let Title = [];
  //       for (let i = 0; i < this.props.assignedInternsCount; i++) {
  //         Title.push(
  //           <div>
  //             {this.props.assignedInternList[i]
  //               .interncompletedProjectTaskCount > 0 ? (
  //               this.props.assignedInternList[
  //                 i
  //               ].interncompletedProjectTaskList.map((task, index) => {
  //                 return (
  //                   <div
  //                     key={index}
  //                     className=" flex-row mb-3 pb-1 border-bottom"
  //                   >
  //                     <Row>
  //                       <Colxx xxs="8" sm="8" md="8">
  //                         <div>
  //                           <a
  //                             href="/#"
  //                             target="_blank"
  //                             rel="noopener noreferrer"
  //                           >
  //                             {task.Name}
  //                           </a>
  //                         </div>
  //                       </Colxx>
  //                       <Colxx xxs="4" sm="4" md="4">
  //                         <div>
  //                           <p className="text-muted mb-0 text-small">
  //                             {formatDateTime(task.DateCompleted)}
  //                           </p>
  //                         </div>
  //                       </Colxx>
  //                     </Row>
  //                   </div>
  //                 );
  //               })
  //             ) : (
  //               <tr className="no-record-found">
  //                 <td>No Submissions Found</td>
  //               </tr>
  //             )}
  //           </div>
  //         );
  //       }
  //       table.push(Title);
  //     }
  //   }
  //   return table;
  // };
  render() {
    // const { fileType, handleSubmit } = this.props;
    return (
      <Modal
        open={this.props.modalStatus}
        onClose={this.props.onRequestClose}
        center
      >
        <ModalHeader className="modalhead">
          <h2 className="fontheavy">{this.props.selectInternName}</h2>
        </ModalHeader>
        <ModalBody>
          <div className="container-fluid">
            <Row style={{ marginTop: "15px" }}>
              <Colxx xxs="12" sm="12" md="12">
                <label style={{ fontWeight: "bold", fontSize: "18px" }}>
                  Project Submissions{" "}
                </label>
              </Colxx>
            </Row>
            <Card>
              <CardBody>
                <Row className="popupborder">
                  <Colxx lg="3" sm="4" md="4">
                    <span className="text-muted mb-2 texxt">
                      {" "}
                      Date Submitted
                    </span>
                  </Colxx>
                  <Colxx lg="4" sm="4" md="4">
                    <span className="text-muted mb-2 texxt">Description</span>
                  </Colxx>
                  <Colxx lg="5" sm="4" md="4">
                    <span className="text-muted mb-2 texxt">Click to View</span>
                  </Colxx>
                </Row>
                <div style={{ height: "150px" }}>
                  <PerfectScrollbar
                    options={{
                      suppressScrollX: true,
                      wheelPropagation: false,
                    }}
                  >
                    {this.props.InternProjectSubmissionCount > 0 ? (
                      this.props.InternProjectSubmissionList.map(
                        (doc, index) => {
                          return (
                            <div
                              key={index}
                              className=" flex-row mb-3 pb-3 border-bottom"
                            >
                              <Row>
                                <Colxx lg="3" sm="4" md="4" data-title="date">
                                  {formatDateTime(doc.DateAdded)}
                                </Colxx>
                                <Colxx lg="4" sm="4" md="4" data-title="type">
                                  {doc.DocumentDescription}
                                </Colxx>
                                <Colxx lg="5" sm="4" md="4" data-title="Url">
                                  <a
                                   
                                    href={doc.Url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{
                                      textDecorationLine: "underline",
                                      color: "#46BFA5", cursor: "pointer" 
                                    }}
                                  >
                                    {" "}
                                    {doc.DocumentName}
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
                  </PerfectScrollbar>
                </div>
              </CardBody>
            </Card>
            <Row>
              <Colxx xxs="12" sm="12" md="12">
                <label
                  style={{
                    fontWeight: "bold",
                    fontSize: "18px",
                    marginTop: "15px",
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
                        <p className="text-muted mb-2 texxt">Date Completed</p>
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
                          this.props.CompletedTaskList.map((task, index) => {
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
                                        {formatDateTime(task.DateCompleted)}
                                      </p>
                                    </div>
                                  </Colxx>
                                </Row>
                              </div>
                            );
                          })
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
        </ModalBody>
        <ModalFooter></ModalFooter>
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

// bessieCooperPopUpForm = reduxForm({
//   form: "bessieCooperPopUpForm", // a unique identifier for this form
//   validate: (values) => {
//     return validate(values);
//   },
// })(bessieCooperPopUpForm);

const selector = formValueSelector("bessieCooperPopUpForm"); // <-- same as form name

const mapStateToProps = (state) => ({
  fileType: selector(state, "Type"),
  currentUser: state.userReducer.currentUser,
  CompletedTaskList: state.projectReducer.CompletedTaskList,
  CompletedTaskCount: state.projectReducer.CompletedTaskCount,
  InternProjectSubmissionList: state.projectReducer.InternProjectSubmissionList,
  InternProjectSubmissionCount:
    state.projectReducer.InternProjectSubmissionCount,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(bessieCooperPopUpForm);
