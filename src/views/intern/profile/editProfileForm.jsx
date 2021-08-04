import React, { Component } from "react";
import { connect } from "react-redux";

import InternEditProfileForm from "./internEditProfileForm";

import { updateInternProfile } from "../../../action/profile/profile";
class internProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formError: [],
    };
  }

  componentDidMount() {}

  submit = (values) => {
    values.createby = this.props.currentUser.UserId;

    this.props.updateInternProfile(this.props.currentUser.UserId, values);
  };

  render() {
    return (
      <div className="inner-content intern-list">
        <InternEditProfileForm
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
    updateInternProfile: (values, errorCallback) => {
      dispatch(updateInternProfile(values, errorCallback));
    },
    dispatch: dispatch,
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(internProfile);
