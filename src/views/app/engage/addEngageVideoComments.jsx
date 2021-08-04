import React, { Component } from "react";
// import cn from "classnames";
import { connect } from "react-redux";
// import { Link } from "react-router";

// import * as constants from "../../../utils/constants";
// import BackHeader from '../common/backHeader';
import AngageVideoCommentForm from "../../../views/app/engage/engageVideoCommentForm";

import { AddEngageVideoComments } from "../../../action/engage/engage";

class addEnageVideoComments extends Component {
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
    values.engage_video_id = this.props.match.params.engageVideoId;
    this.props.AddEngageVideoComments(values);
  };

  setFormError = (errors) => {
    this.setState({ formError: errors });
  };

  render() {
    // const {  } = this.props;
    return (
      <div className="inner-content intern-list">
        <AngageVideoCommentForm
          onSubmit={this.submit}
          organizationId={this.props.currentUser.organization.id}
          EngageVideoId={this.props.match.params.engageVideoId}
          EnageCategoryId={this.props.match.params.engageCategoryId}
          formError={this.state.formError}
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
    AddEngageVideoComments: (values, errorCallback) => {
      dispatch(AddEngageVideoComments(values, errorCallback));
    },
    dispatch: dispatch,
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(addEnageVideoComments);
