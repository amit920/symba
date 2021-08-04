import React, { Component } from "react";
import { connect } from "react-redux";

import AdminEditProfileForm from "./adminEditProfileForm";

import { updateProfile } from "../../../action/profile/profile";
class adminProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formError: [],
    };
  }

  componentDidMount() {}

  submit = (values) => {
    values.createby = this.props.currentUser.UserId;

    this.props.updateProfile(this.props.currentUser.UserId, values);
  };

  render() {
    return (
      <div className="inner-content intern-list">
        <AdminEditProfileForm
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
    updateProfile: (values, errorCallback) => {
      dispatch(updateProfile(values, errorCallback));
    },
    dispatch: dispatch,
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(adminProfile);
