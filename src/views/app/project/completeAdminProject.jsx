import React, { Component } from "react";
// import cn from "classnames";
import { connect } from "react-redux";
// import { Link } from "react-router";
// import * as constants from "../../../utils/constants";
import ViewCompleteAdminProjectForm from "../../app/project/viewCompleteAdminProjectForm";
// import { editAdminProject } from "../../../action/admin/admin";

class completeAdminProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // supervisorList: [],
      formError: [],
    };
  }

  componentDidMount() {}

//   submit = (values) => {
//     values.createdby = this.props.currentUser.UserId;
//     values.modifiedby = this.props.currentUser.UserId;
//     values.modifiedon = new Date();

//     this.props.editAdminProject(this.props.match.params.id, values);
//   };

  setFormError = (errors) => {
    this.setState({ formError: errors });
  };
  render() {
    //const { } = this.props;
    return (
      <div className="inner-content intern-list">
        <ViewCompleteAdminProjectForm
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
    // editAdminProject: (projectId, values) => {
    //   dispatch(editAdminProject(projectId, values));
    // },

    dispatch: dispatch,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(completeAdminProject);
