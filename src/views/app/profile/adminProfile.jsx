import React, { Component } from "react";
import { connect } from "react-redux";
import ViewAdminProfile from "./viewAdminProfile";

class adminProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formError: [],
    };
  }

  componentDidMount() {}

  render() {
    return (
      <div className="inner-content intern-list">
        <ViewAdminProfile
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
    dispatch: dispatch,
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(adminProfile);
