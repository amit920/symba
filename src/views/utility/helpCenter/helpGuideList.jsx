import React, { Component, Fragment } from "react";
// import { injectIntl } from "react-intl";
import { Row } from "reactstrap";
import { Colxx, Separator } from "../../../components/common/CustomBootstrap";
import {
  // Input,
  // Card,
  // CardBody,
  // CardTitle,
  // CardSubtitle,
  // CardImg,
  // CardText,
  Button,
  Table,
} from "reactstrap";
// import { NavLink } from "react-router-dom";
// import IntlMessages from "../../../helpers/IntlMessages";
// import { getInternList } from '../../../action/community/community';
import { connect } from "react-redux";
import * as constants from "../../../utils/constants";
import { Link } from "react-router-dom";
import Pagination from "../../../containers/pages/Pagination";

import { formatDateTime } from "../../../utils/globalFunctions";
import AddHelpGuidePopUpForm from "./addHelpGuidePopUpForm";
//   import EditOrgPopUpform from './editOrgPopUpform';
import { reset } from "redux-form";
import {
  addHelpDetails,
  AllHelpGuideList,
} from "../../../action/helpcenter/helpcenter";
class HelpCenterList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: null,
      sort_dir: null,
      sort_type: null,
      addNewHelpDetailModel: false,
      // editOrganizationModal:false,
    };
  }
  componentDidMount() {
    this.props.AllHelpGuideList({
      limit_size: constants.DEFAULT_LIMIT_SIZE,
      limit_start: 0,
      search_text: this.state.searchText,

      // sort_dir: this.state.sort_dir,
      // sort_type: this.state.sort_type
    });
  }
  //  handlePageClick = (data) => {
  //   this.setState({currentPage: data})
  //   let selected = data-1;
  //   // alert(data)
  //   let offset = Math.ceil(selected * constants.DEFAULT_LIMIT_SIZE);
  //   // this.props.organizationList({
  //   //     limit_size: constants.DEFAULT_LIMIT_SIZE,
  //   //     limit_start: offset,

  //   // })
  // };

  closeNewHelpSubmissionModal = () => {
    this.props.dispatch(reset("addHelpGuidePopUpForm"));
    this.setState({ addNewHelpDetailModel: false });
  };
  openAddNewHelpSubmissionModal = () => {
    this.setState({ addNewHelpDetailModel: true });
  };
  // closeEditSubmissionModal = () => {
  //     this.props.dispatch(reset('editOrgPopUpform'));
  //     this.setState({ editOrganizationModal: false })
  // }
  // openEditSubmissionModal = () => {
  //     this.setState({ editOverviewResourcesModal: true })
  // }
  // handleEditOrganization = (orgObj) => {
  //     this.setState({ editOrganizationModal: true, currentOrg: orgObj })
  // }
  // handleRemoveOrganizationSubmission = (org) => {
  //     this.props.removeOrganizationSubmission(org);
  // }
  submit = (values) => {
    values.createby = this.props.currentUser.UserId;
    this.props.addHelpDetails(values, this.closeNewHelpSubmissionModal);
  };
  //   submitUpdate = values => {
  //     values.createby = this.props.currentUser.UserId

  //     if(values.filelinkdata ==undefined)
  //     {
  //       values.Type='';
  //     }
  //     else{
  //       values.Type='File';
  //     }

  //     this.props.updateOrganization( values, this.closeEditSubmissionModal);
  // }
  render() {
    console.log(this.props.AllGuideList);
    return (
      <div>
        <Fragment>
          <Row>
            <Colxx xxs="12">
              <h1 style={{ textAlign: "center", fontWeight: "bold" }}>Help</h1>
              <Separator className="mb-5" />
            </Colxx>
          </Row>
          <Row>
            <Colxx sm="12" xxs="12" lg="12" xl="12">
              <Button
                style={{ float: "right" }}
                onClick={this.openAddNewHelpSubmissionModal}
                color="info"
                outline
                className="mb-2"
              >
                Add New
              </Button>
            </Colxx>
          </Row>
          <Row>
            <Colxx sm="12" xxs="12" lg="12" xl="12">
              <Table style={{ width: "100%", marginTop: 30 }}>
                <thead>
                  <tr>
                    <th>Features</th>
                    <th>Title</th>
                    <th>Description</th>
                    <th>User Type</th>
                    <th>Date Added</th>
                  </tr>
                </thead>
                <tbody>
                  {this.props.AllGuideList.length > 0 ? (
                    this.props.AllGuideList.map((guide) => {
                      return (
                        <tr>
                          <td data-title="Features">{guide.Features}</td>
                          <td data-title="Title">
                            <Link
                              //  onClick={() => this.handleEditOrganization(org)}
                              className="edit-record-link"
                            >
                              {guide.Help_title}
                            </Link>
                          </td>
                          <td
                            data-title="Description"
                            style={{ width: "500px" }}
                          >
                            {guide.Help_description}
                          </td>
                          <td data-title="User Type">{guide.User_Type}</td>
                          <td data-title="Added Date">
                            {formatDateTime(guide.Date_Added)}
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
              {this.props.orgCount >= constants.DEFAULT_LIMIT_SIZE && (
                <Pagination
                  currentPage={this.state.currentPage}
                  totalPage={this.props.pageCount}
                  onChangePage={(i) => this.handlePageClick(i)}
                />
              )}
            </Colxx>
          </Row>
        </Fragment>
        <AddHelpGuidePopUpForm
          onSubmit={this.submit}
          dispatch={this.props.dispatch}
          onRequestClose={this.closeNewHelpSubmissionModal}
          modalStatus={this.state.addNewHelpDetailModel}
          currentUser={this.props.currentUser}
        />
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    currentUser: state.userReducer.currentUser,
    AllGuideList: state.helpCenterReducer.AllGuideList,
    AllGuideCount: state.helpCenterReducer.AllGuideCount,
    pageCount: Math.ceil(
      state.helpCenterReducer.AllGuideCount / constants.DEFAULT_LIMIT_SIZE
    ),
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    AllHelpGuideList: (params) => {
      dispatch(AllHelpGuideList(params));
    },
    addHelpDetails: (params, callback) => {
      dispatch(addHelpDetails(params, callback));
    },
    // updateOrganization: ( params, callback) => {dispatch(updateOrganization( params, callback))},
    // removeOrganizationSubmission: (org) => {dispatch(removeOrganizationSubmission(org))},
    dispatch: dispatch,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(HelpCenterList);
