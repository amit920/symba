import React, { Component } from "react";
import { connect } from "react-redux";

import ManagerEditProfileForm from "./managerEditProfileForm";

import { updateManagerProfile } from "../../../action/profile/profile";
class managerProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formError: [],
    };
  }

  componentDidMount() {}

  submit = (values) => {
    values.createby = this.props.currentUser.UserId;

    this.props.updateManagerProfile(this.props.currentUser.UserId, values);
  };

  render() {
    return (
      <div className="inner-content intern-list">
        <ManagerEditProfileForm
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
    updateManagerProfile: (values, errorCallback) => {
      dispatch(updateManagerProfile(values, errorCallback));
    },
    dispatch: dispatch,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(managerProfile);
