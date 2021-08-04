import React, { Component } from "react";
// import cn from "classnames";
import { connect } from "react-redux";
// import { Link } from "react-router";
// import * as constants from "../../../utils/constants";
import AddEditProjectForm from "../../../views/manager/project/addEditProject";
import { editProject } from "../../../action/projects/projects";

class ProjectForm extends Component {
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

    this.props.editProject(this.props.match.params.id, values);
  };

  setFormError = (errors) => {
    this.setState({ formError: errors });
  };
  render() {
    //const { } = this.props;
    return (
      <div className="inner-content intern-list">
        <AddEditProjectForm
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
    editProject: (projectId, values) => {
      dispatch(editProject(projectId, values));
    },

    dispatch: dispatch,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ProjectForm);
