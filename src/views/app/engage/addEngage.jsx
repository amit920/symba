import React, { Component } from "react";
// import cn from "classnames";
import { connect } from "react-redux";
// import { Link } from "react-router";

// import * as constants from "../../../utils/constants";
// import BackHeader from '../common/backHeader';
import AddEditEngageForm from "../../../views/app/engage/addEditEngageForm";

import { AddEngageDetail } from "../../../action/engage/engage";
// import { NotificationManager } from "../../../components/common/react-notifications";
class addEnage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // supervisorList: [],
      formError: [],
    };
  }

  componentDidMount() {}
  componentDidUpdate() {
    // if (this.props.error) {
    //   NotificationManager.warning(
    //     this.props.error,
    //     "Login Error",
    //     3000,
    //     null,
    //     null,
    //     ''
    //   );
    // }
  }

  submit = (values) => {
    values.createdby = this.props.currentUser.UserId;
    values.orgId = this.props.currentUser.organization.id
    if (values.filelinkdata === undefined) {
      values.Type = "";
    } else {
      values.Type = "File";
    }
    if(values.engage_category === undefined){
      alert('please select category')
    }
    else{
      this.props.AddEngageDetail(values);

    }
    // values.engage_video_title="";
    // values.engage_video_url="";
    // values.engage_video_description="";
    // values.engage_category="";
    // // this.props.history.push('/app/engage')
  };

  setFormError = (errors) => {
 
    this.setState({ formError: errors });
  };

  render() {
    // const {  } = this.props;
    return (
      <div className="inner-content intern-list">
        <AddEditEngageForm
          onSubmit={this.submit}
          organizationId={this.props.currentUser.organization.id}
          deptId={this.props.match.params.id}
          deptName={this.props.match.params.name}
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
    AddEngageDetail: (values, errorCallback) => {
      dispatch(AddEngageDetail(values, errorCallback));
    },
    dispatch: dispatch,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(addEnage);
