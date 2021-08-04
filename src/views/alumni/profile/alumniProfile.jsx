import React, { Component } from "react";
import { connect } from "react-redux";
import ViewAlumniProfile from "./viewAlumniProfile";

class alumniProfile extends Component {
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
        <ViewAlumniProfile
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
)(alumniProfile);
