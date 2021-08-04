import React from "react";

// import IntlMessages from "../../../helpers/IntlMessages";
// import { Field, reduxForm, FieldArray, formValueSelector } from "redux-form";
// import Select from "react-select";
// import { connect } from "react-redux";
// import {
//   renderTextField,
//   renderTextArea,
//   renderDateField,
//   validate,
//   renderSelectField,
//   ComboField,
//   renderMultiSelectField,
//   fileInput,
// } from "../../util/form-fields";
import * as constants from "../../../utils/constants";
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
import axiosInstance from "../../../utils/axiosApi";
// import _ from "lodash";
import { getAPIURL } from "../../../utils/getApiUrl";
// import { Link } from "react-router-dom";
import DataGrid, {
  Column,
  Selection,
  // FilterRow,
  Paging,
  SearchPanel,
} from "devextreme-react/data-grid";
import { assignNewInterns } from "../../../action/projects/projects";
class internAssignPopUpForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allMode: "allPages",
      checkBoxesMode: "always",
      selectedRowKeys: [],
    };

    this.onCheckBoxesModeChanged = this.onCheckBoxesModeChanged.bind(this);
    this.onAllModeChanged = this.onAllModeChanged.bind(this);
    this.onSelectionChanged = this.onSelectionChanged.bind(this);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    var data = {
      params: {
        orgid: nextProps.currentUser.organization.id,

        user_id: nextProps.currentUser.UserId,
      },
    };
    axiosInstance
      .get(getAPIURL(constants.UNASSIGN_PROJECT_USERS_LIST_URL, {}), data)
      .then((response) => {
        this.setState({ rows: response.data.users });
        const results = this.state.rows.filter(
          ({ UserId: id1 }) =>
            !this.props.assignedInternList.some(
              ({ UserId: id2 }) => id2 === id1
            )
        );
        this.setState({ rows: results });
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  onSelectionChanged({ selectedRowKeys }) {
    this.selectionChangedBySelectBox = false;

    this.setState({
      selectedRowKeys,
    });
  }

  onCheckBoxesModeChanged({ value }) {
    this.setState({ checkBoxesMode: value });
  }

  onAllModeChanged({ value }) {
    this.setState({ allMode: value });
  }

  submitSelectedUsers = () => {
    var params = {
      project: this.props.projectId,
      Users: this.state.selectedRowKeys,
      org: this.props.currentUser.organization.id,
      user_id: this.props.currentUser.UserId,
    };
    this.props.dispatch(
      assignNewInterns(this.props.projectId, params, this.props.onRequestClose)
    );
  };

  render() {
    const { allMode, checkBoxesMode, selectedRowKeys } = this.state;

    return (
      <Modal
        open={this.props.modalStatus}
        onClose={this.props.onRequestClose}
        center
      >
        <div>
          <ModalHeader>
            <h2>Assign Users to Project</h2>
          </ModalHeader>

          <ModalBody>
            <div>
              <div className="container-fluid">
                <Row style={{ marginTop: "15px" }}>
                  <Colxx xxs="12" sm="12" md="12">
                    <div className="popup-user-list">
                      <DataGrid
                        dataSource={this.state.rows}
                        showBorders={true}
                        keyExpr="UserId"
                        onSelectionChanged={this.onSelectionChanged}
                        ref={(ref) => (this.dataGrid = ref)}
                        selectedRowKeys={selectedRowKeys}
                      >
                        <SearchPanel
                          visible={true}
                          width={240}
                          placeholder="Search..."
                        />
                        <Selection
                          mode="multiple"
                          selectAllMode={allMode}
                          showCheckBoxesMode={checkBoxesMode}
                        />
                        {/* <FilterRow visible={true} /> */}
                        <Paging defaultPageSize={10} />

                        <Column
                          dataField="Name"
                          caption="Name"
                          // width={200}
                          //sortOrder="desc"
                        />
                        <Column
                          dataField="Department"
                          caption="Department"
                          // width={200}
                          //sortOrder="desc"
                        />
                      </DataGrid>
                    </div>
                  </Colxx>
                </Row>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            {this.state.selectedRowKeys.length !== 0 ? (
              <Button
                color="primary"
                type="button"
                onClick={this.submitSelectedUsers}
                className="mb-2"
              >
                Submit
              </Button>
            ) : (
              <Button
                color="primary"
                type="button"
                onClick={this.submitSelectedUsers}
                className="mb-2"
                disabled={true}
              >
                Submit
              </Button>
            )}
          </ModalFooter>
        </div>
      </Modal>
    );
  }
}
export default internAssignPopUpForm;
// const validations = {
//     required: {
//         fields: ['file_title','file_description', 'Type']
//     },
//     urls: {
//         fields: ['doclinkdata']
//     }
// };

// internAssignPopUpForm = reduxForm({
//     form: 'internAssignPopUpForm', // a unique identifier for this form
//     validate: (values) => { return validate(values, validations) },
// })(internAssignPopUpForm);

// const selector = formValueSelector('internAssignPopUpForm') // <-- same as form name

// const mapStateToProps = (state) => ({
//     currentUser: state.userReducer.currentUser,

// });

// const mapDispatchToProps = (dispatch) => ({

// });

// export default connect(
//     mapStateToProps,
//     mapDispatchToProps
// )(internAssignPopUpForm);;
