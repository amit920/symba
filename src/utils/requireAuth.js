import React from "react";
import { connect } from "react-redux";
// import { browserHistory } from "react-router";
// import checkAlreadyLogin from "../utils/checkAlreadyLogin";
import { toastr } from "react-redux-toastr";
import { NotificationManager } from "../../src/components/common/react-notifications";
import createBrowserHistory from "history/createBrowserHistory";
const browserHistory = createBrowserHistory();
export default function (ComposedComponent, allwed_roles) {
  class Authenticate extends React.Component {
    componentWillMount() {
    if ( this.props.currentUser == null){      
      browserHistory.push("/error");
      window.location.reload(false);
      }
     if (!allwed_roles.includes(this.props.currentUser.type)) {
      browserHistory.push("/unauthorized");
      window.location.reload(false);
      NotificationManager.error(
        "You are not allowed to perform this action",
        "Error",
        3000,
        null,
        null,
        ""
      );
     
    }
      if (this.props.currentUser === null) {
        NotificationManager.error(
          "Please login to perform this action",
          "Error",
          3000,
          null,
          null,
          ""
        );
        
        // browserHistory.push("/login");
      }

      if (this.props.currentUser.SuperAdmin === false) {
        //change for superAdmin
        if (this.props.currentUser != null) {
          if (!allwed_roles.includes(this.props.currentUser.type)) {
            toastr.error("You are not allowed to perform this action");
          }
        }
      }
    }

    componentWillUpdate(nextProps) {
      if (nextProps.currentUser === null) {
        

        NotificationManager.error(
          "Please login to perform this action",
          "Error",
          3000,
          null,
          null,
          ""
        );
        // browserHistory.push("/login");
      }

      if (this.props.currentUser != null) {
        if (!allwed_roles.includes(this.props.currentUser.type)) {
          NotificationManager.error(
            "You are not allowed to perform this action",
            "Error",
            4000,
            null,
            null,
            ""
          );
        }
      }
    }
    render() {
      if (this.props.currentUser) {
        return <ComposedComponent {...this.props} />;
      } else {
        return <div></div>;
      }
    }
  }

  function mapStateToProps(state) {
    return {
      currentUser: state.userReducer.currentUser,
    };
  }

  return connect(mapStateToProps, {})(Authenticate);
}
