import React, { Component } from "react";
// import cn from "classnames";
import { connect } from "react-redux";
// import { Link } from "react-router";

// import * as constants from "../../../utils/constants";
// import BackHeader from '../common/backHeader';
import AddEditLaunchpadForm from "../../../views/app/launchpad/addEditLaunchpadForm";

import { addlaunchpadoverview } from "../../../action/launchpad/launchpad";

class addLaunchpad extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // supervisorList: [],
      formError: [],
      discription: "",
    };
  }

  componentDidMount() {}
  getDiscription = (val) => {
    this.setState({
      discription: val,
    });
  };
  submit = (values) => {
    if (values.doclinkdata === undefined) {
      values.doclinkdata = "";
    }
    values.createby = this.props.currentUser.UserId;
    values.deparmentid = this.props.match.params.id;
    values.richtextdiscription = this.state.discription;
    this.props.addlaunchpadoverview(
      this.props.currentUser.organization.id,
      values
    );
  };

  // setFormError = (errors) => {
  //     this.setState({ formError: errors })
  // }

  render() {
    return (
      <div className="inner-content intern-list">
        <AddEditLaunchpadForm
          onSubmit={this.submit}
          organizationId={this.props.currentUser.organization.id}
          deptId={this.props.match.params.id}
          deptName={this.props.match.params.name}
          sendDiscription={this.getDiscription}
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
    addlaunchpadoverview: (values, errorCallback) => {
      dispatch(addlaunchpadoverview(values, errorCallback));
    },
    dispatch: dispatch,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(addLaunchpad);
