import React, { Component } from "react";
// import cn from "classnames";
import { connect } from "react-redux";
// import { Link } from "react-router";
// import * as constants from "../../../utils/constants";
import ViewProjectForm from "./viewProjectForm";
import { editAllOtherProject } from "../../../action/admin/admin";

class ViewAllProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // supervisorList: [],
      formError: [],
    };
  }

  componentDidMount() {}
  submit = (values) => {
    values.modifiedby = this.props.currentUser.UserId;
    values.modifiedon = new Date();
    this.props.editAllOtherProject(this.props.match.params.id, values);
  };


  setFormError = (errors) => {
    this.setState({ formError: errors });
  };
  render() {
    //const { } = this.props;
    return (
      <div className="inner-content intern-list">
        <ViewProjectForm
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
    editAllOtherProject: (projectId, values) => {
      dispatch(editAllOtherProject(projectId, values));
    },

    dispatch: dispatch,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ViewAllProject);
