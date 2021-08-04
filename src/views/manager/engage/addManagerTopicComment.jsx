import React, { Component } from "react";
// import cn from "classnames";
import { connect } from "react-redux";
// import { Link } from "react-router";

// import * as constants from "../../../utils/constants";
// import BackHeader from '../common/backHeader';
import ManagerTopicCommentForm from "../../../views/manager/engage/managerTopicCommentForm";

import { AddTopicComment } from "../../../action/engage/engage";
// import { NotificationManager } from "../../../components/common/react-notifications";
class addManagerTopicCommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formError: [],
    };
  }

  componentDidMount() {}
 

  submit = (values) => {
    values.userid = this.props.currentUser.UserId;
    values.orgid = this.props.currentUser.organization.id;
    values.topicid = this.props.match.params.id;

    this.props.AddTopicComment(values);

  };

  setFormError = (errors) => {
    alert(errors);
    this.setState({ formError: errors });
  };

  render() {
    // const {  } = this.props;
    return (
      <div className="inner-content intern-list">
        <ManagerTopicCommentForm
          onSubmit={this.submit}
          organizationId={this.props.currentUser.organization.id}
          topicId={this.props.match.params.id}

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
    AddTopicComment: (values, errorCallback) => {
      dispatch(AddTopicComment(values, errorCallback));
    },
    dispatch: dispatch,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(addManagerTopicCommentForm);
