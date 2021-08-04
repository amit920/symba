import React, { Component } from "react";
import { injectIntl } from "react-intl";

// import {
//   UncontrolledDropdown,
//   DropdownItem,
//   DropdownToggle,
//   DropdownMenu,
//   Input,
// } from "reactstrap";

// import { NavLink } from "react-router-dom";
import { connect } from "react-redux";

// import IntlMessages from "../../helpers/IntlMessages";
// import { setContainerClassnames, clickOnMobileMenu } from "../../redux/actions";

// import {
//   menuHiddenBreakpoint,
//   searchPath,
//   localeOptions,
//   isDarkSwitchActive,
// } from "../../constants/defaultValues";

// import { MobileMenuIcon, MenuIcon } from "../../components/svg";
// import TopnavEasyAccess from "./Topnav.EasyAccess";
// import TopnavNotifications from "./Topnav.Notifications";
// import TopnavDarkSwitch from "./Topnav.DarkSwitch";

//import { getDirection, setDirection } from "../../helpers/Utils";
class TopNav extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  getCurrentUserOrganization = () => {
    let div = [];
    if (this.props.currentUser) {
      let Container = [];
      if (this.props.currentUser.organization.image_URL != null) {
        Container.push(
          <div>
            {
              <img
                className="orgLogo"
                style={{
                  width: "70px",
                  height: "70px",
                  marginLeft: "1.5em",
                  marginTop: "-15px",
                }}
                src={this.props.currentUser.organization.image_URL}
                alt=""
              ></img>
            }
          </div>
        );
      } else {
        Container.push(
          <div>
            {
              <img
                className="orgLogo"
                style={{
                  width: "70px",
                  height: "70px",
                  marginLeft: "1.5em",
                  marginTop: "-15px",
                }}
                src="/assets/img/default-logo.png"
                alt=""
              />
            }
          </div>
        );
      }
      div.push(<div>{Container}</div>);
    }
    return div;
  };
  render() {
    //const { containerClassnames, menuClickCount, locale } = this.props;
    //const { messages } = this.props.intl;
    return (
      <nav
        className="navbar fixed-top"
        style={{
          width: "110px",
          backgroundColor: "#EEEEF0",
          height: "130px",
          zIndex: "1000",
          boxShadow: "0 0 0 0 black",
        }}
      >
        <div className="d-flex align-items-center navbar-left">
          {this.getCurrentUserOrganization()}
          <br></br>
        </div>

        <div style={{ marginTop: "5px" }}>
          <span
            className="orgLogo"
            style={{
              fontSize: "9px",
              marginLeft: "2.8em",
              color: "#6B6C72",
              fontFamily: "sans-serif",
            }}
          >
            POWERED BY
          </span>
          <img
            className="orgLogo"
            style={{ width: "60px", height: "20px", marginLeft: "1.9em" }}
            src="/assets/img/symba_logo_big.png"
            alt=""
          />
        </div>
      </nav>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.userReducer.currentUser,
  };
};
export default injectIntl(connect(mapStateToProps, {})(TopNav));
