import React, { Component } from "react";
// import cn from "classnames";
import { connect } from "react-redux";
// import { Link } from "react-router";
// import * as constants from "../../../utils/constants";
import EditProjectForm from "../../app/project/editProjectForm";
import { editAdminProject } from "../../../action/admin/admin";
// import { NotificationManager } from "../../../../src/components/common/react-notifications";
//import createBrowserHistory from "history/createBrowserHistory";
//const browserHistory = createBrowserHistory();
class adminProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // supervisorList: [],
      formError: [],
    };
  }

  componentDidMount() {}

  submit = (values) => {
    values.createdby = this.props.currentUser.UserId;
    values.modifiedby = this.props.currentUser.UserId;
    values.modifiedon = new Date();

    this.props.editAdminProject(this.props.match.params.id, values);
  };

  setFormError = (errors) => {
    this.setState({ formError: errors });
  };
  render() {
    //const { currentUser, internList, internCount } = this.props;
    return (
      <div className="inner-content intern-list">
        <EditProjectForm
          onSubmit={this.submit}
          organizationId={this.props.currentUser.organization.id}
          formError={this.state.formError}
          projectId={this.props.match.params.id}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.userReducer.currentUser,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    editAdminProject: (projectId, values) => {
      dispatch(editAdminProject(projectId, values));
    },

    dispatch: dispatch,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(adminProject);
