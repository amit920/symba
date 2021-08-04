import React, { Component } from "react";
import { connect } from "react-redux";

import AlumniEditProfileForm from "./alumniEditProfileForm";

import { updateAlumniProfile } from "../../../action/profile/profile";
class alumniProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formError: [],
    };
  }

  componentDidMount() {}

  submit = (values) => {
    values.createby = this.props.currentUser.UserId;

    this.props.updateAlumniProfile(this.props.currentUser.UserId, values);
  };

  render() {
    return (
      <div className="inner-content intern-list">
        <AlumniEditProfileForm
          onSubmit={this.submit}
          organizationId={this.props.currentUser.organization.id}
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
    updateAlumniProfile: (values, errorCallback) => {
      dispatch(updateAlumniProfile(values, errorCallback));
    },
    dispatch: dispatch,
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(alumniProfile);
