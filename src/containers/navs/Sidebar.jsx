import React, { Component } from "react";
import { connect } from "react-redux";
import ReactDOM from "react-dom";
import { Nav, NavItem } from "reactstrap";
import { NavLink } from "react-router-dom";
import classnames from "classnames";
import { withRouter } from "react-router-dom";
import { setuserlogoutactivity } from "../../action/user/user";
//import { MobileMenuIcon, MenuIcon } from "../../components/svg";
import {
  isAdmin,
  isManager,
  isIntern,
  isAlumni,
  isSymbaAdmin,
} from "../../utils/roleChecking";
import { getFeatures_By_OrgId } from "../../action/features/features";
import IntlMessages from "../../helpers/IntlMessages";
// import localStorageService from "../../utils/localStorageService";
//import { setContainerClassnames, addContainerClassname, changeDefaultClassnames, changeSelectedMenuHasSubItems, } from "../../redux/actions";
// import menuItems from '../../constants/menu';
import Notifications from "./Notifications";
// import { css } from "@emotion/react";

// const LocalStorageService = localStorageService.getService();

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedParentMenu: "",
      viewingParentMenu: "",
      collapsedMenus: [],
      menuItems: [], // this holds the name of each list
      items: {},
      menuClass: "",
      isSidebarOpen: false,
    };
  }

  // handleWindowResize = event => {
  //   if (event && !event.isTrusted) {
  //     return;
  //   }
  //   const { containerClassnames } = this.props;
  //   // let nextClasses = this.getMenuClassesForResize(containerClassnames);
  //   this.props.setContainerClassnames(
  //     0,
  //     nextClasses.join(' '),
  //     this.props.selectedMenuHasSubItems
  //   );
  // };

  handleDocumentClick = (e) => {
    const container = this.getContainer();
    let isMenuClick = false;
    if (
      e.target &&
      e.target.classList &&
      (e.target.classList.contains("menu-button") ||
        e.target.classList.contains("menu-button-mobile"))
    ) {
      isMenuClick = true;
    } else if (
      e.target.parentElement &&
      e.target.parentElement.classList &&
      (e.target.parentElement.classList.contains("menu-button") ||
        e.target.parentElement.classList.contains("menu-button-mobile"))
    ) {
      isMenuClick = true;
    } else if (
      e.target.parentElement &&
      e.target.parentElement.parentElement &&
      e.target.parentElement.parentElement.classList &&
      (e.target.parentElement.parentElement.classList.contains("menu-button") ||
        e.target.parentElement.parentElement.classList.contains(
          "menu-button-mobile"
        ))
    ) {
      isMenuClick = true;
    }
    if (container.contains(e.target) || container === e.target || isMenuClick) {
      return;
    }
    this.setState({
      viewingParentMenu: "",
    });
    // this.toggle();
  };

  // getMenuClassesForResize = classes => {
  //   const { menuHiddenBreakpoint, subHiddenBreakpoint } = this.props;
  //   let nextClasses = classes.split(' ').filter(x => x !== '');
  //   const windowWidth = window.innerWidth;
  //   if (windowWidth < menuHiddenBreakpoint) {
  //     nextClasses.push('menu-mobile');
  //   } else if (windowWidth < subHiddenBreakpoint) {
  //     nextClasses = nextClasses.filter(x => x !== 'menu-mobile');
  //     if (
  //       nextClasses.includes('menu-default') &&
  //       !nextClasses.includes('menu-sub-hidden')
  //     ) {
  //       nextClasses.push('menu-sub-hidden');
  //     }
  //   } else {
  //     nextClasses = nextClasses.filter(x => x !== 'menu-mobile');
  //     if (
  //       nextClasses.includes('menu-default') &&
  //       nextClasses.includes('menu-sub-hidden')
  //     ) {
  //       nextClasses = nextClasses.filter(x => x !== 'menu-sub-hidden');
  //     }
  //   }
  //   return nextClasses;
  // };

  getContainer = () => {
    return ReactDOM.findDOMNode(this);
  };

  handleProps = () => {
    this.addEvents();
  };

  addEvents = () => {
    ["click", "touchstart", "touchend"].forEach((event) =>
      document.addEventListener(event, this.handleDocumentClick, true)
    );
  };

  removeEvents = () => {
    ["click", "touchstart", "touchend"].forEach((event) =>
      document.removeEventListener(event, this.handleDocumentClick, true)
    );
  };

  setSelectedLiActive = (callback) => {
    const oldli = document.querySelector(".sub-menu  li.active");
    if (oldli != null) {
      oldli.classList.remove("active");
    }

    const oldliSub = document.querySelector(".third-level-menu  li.active");
    if (oldliSub != null) {
      oldliSub.classList.remove("active");
    }

    /* set selected parent menu */
    const selectedSublink = document.querySelector(
      ".third-level-menu  a.active"
    );
    if (selectedSublink != null) {
      selectedSublink.parentElement.classList.add("active");
    }

    const selectedlink = document.querySelector(".sub-menu  a.active");
    if (selectedlink != null) {
      selectedlink.parentElement.classList.add("active");
      this.setState(
        {
          selectedParentMenu:
            selectedlink.parentElement.parentElement.getAttribute(
              "data-parent"
            ),
        },
        callback
      );
    } else {
      var selectedParentNoSubItem = document.querySelector(
        ".main-menu  li a.active"
      );
      if (selectedParentNoSubItem != null) {
        this.setState(
          {
            selectedParentMenu:
              selectedParentNoSubItem.getAttribute("data-flag"),
          },
          callback
        );
      } else if (this.state.selectedParentMenu === "") {
        this.setState(
          {
            // selectedParentMenu: menuItems[0].id
          },
          callback
        );
      }
    }
  };

  // setHasSubItemStatus = () => {
  //   const hasSubmenu = this.getIsHasSubItem();
  //   this.props.changeSelectedMenuHasSubItems(hasSubmenu);
  //   this.toggle();
  // };

  // getIsHasSubItem = () => {
  //   const { selectedParentMenu } = this.state;
  //   const menuItem = menuItems.find(x => x.id === selectedParentMenu);
  //   if (menuItem)
  //     return menuItem && menuItem.subs && menuItem.subs.length > 0
  //       ? true
  //       : false;
  //   else return false;
  // };

  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      this.setSelectedLiActive(this.setHasSubItemStatus);

      window.scrollTo(0, 0);
    }
    this.handleProps();
  }

  componentDidMount() {
    this.props.getFeatures_By_OrgId({
      orgid: this.props.currentUser.organization.id,
    });
    // window.addEventListener('resize');
    // this.handleWindowResize();
    this.handleProps();
    // this.setSelectedLiActive(this.setHasSubItemStatus);
  }

  componentWillUnmount() {
    this.removeEvents();
    // window.removeEventListener('resize');
  }

  // openSubMenu = (e, menuItem) => {
  //   const selectedParent = menuItem.id;
  //   const hasSubMenu = menuItem.subs && menuItem.subs.length > 0;
  //   this.props.changeSelectedMenuHasSubItems(hasSubMenu);
  //   if (!hasSubMenu) {
  //     this.setState({
  //       viewingParentMenu: selectedParent,
  //       selectedParentMenu: selectedParent
  //     });
  //     this.toggle();
  //   } else {
  //     e.preventDefault();

  //     const { containerClassnames, menuClickCount } = this.props;
  //     const currentClasses = containerClassnames
  //       ? containerClassnames.split(' ').filter(x => x !== '')
  //       : '';

  //     if (!currentClasses.includes('menu-mobile')) {
  //       if (
  //         currentClasses.includes('menu-sub-hidden') &&
  //         (menuClickCount === 2 || menuClickCount === 0)
  //       ) {
  //         this.props.setContainerClassnames(3, containerClassnames, hasSubMenu);
  //       } else if (
  //         currentClasses.includes('menu-hidden') &&
  //         (menuClickCount === 1 || menuClickCount === 3)
  //       ) {
  //         this.props.setContainerClassnames(2, containerClassnames, hasSubMenu);
  //       } else if (
  //         currentClasses.includes('menu-default') &&
  //         !currentClasses.includes('menu-sub-hidden') &&
  //         (menuClickCount === 1 || menuClickCount === 3)
  //       ) {
  //         this.props.setContainerClassnames(0, containerClassnames, hasSubMenu);
  //       }
  //     } else {
  //       this.props.addContainerClassname(
  //         'sub-show-temporary',
  //         containerClassnames
  //       );
  //     }
  //     this.setState({
  //       viewingParentMenu: selectedParent
  //     });
  //   }
  // };
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
  //hide notification for alumni
  hide_Notification_Alumni = () => {
    let div = [];

    if (this.props.currentUser) {
      let Container = [];
      let Row = [];
      // if (this.props.currentUser.type !== "alumni") {
      Row.push(
        <div>
          <Notifications />
        </div>
      );
      // } else {
      Row.push(<div style={{ marginTop: "18px" }}>{}</div>);
      // }
      Container.push(<div>{Row}</div>);
      div.push(<div>{Container}</div>);
    }
    return div;
  };

  handleClick = (label) => {
    // TODO: Handle sign out click better, currently depends on label name to always be "Sign out"
    if (label === "Sign out") {
      this.props.setuserlogoutactivity();
    }
  };

  handleSidebarToggle = (flag) => {
    //const { isSidebarOpen } = this.state;
    this.setState(
      {
        isSidebarOpen: !this.state.isSidebarOpen,
      },
      () => {
        if (flag) {
          document.querySelector("body").classList.add("isToggleOpen");
        } else {
          document.querySelector("body").classList.remove("isToggleOpen");
        }
      }
    );
  };

  render() {
    const {
      selectedParentMenu,
      viewingParentMenu,
      //collapsedMenus,
      isSidebarOpen,
    } = this.state;
    const { currentUser } = this.props;
    let menuItems = []; // this holds the name of each list

    if (isAdmin(currentUser)) {
      if (this.props.FeaturesDetails) {
        menuItems.push({
          id: "dashboards0",
          icon: "glyph-icon simple-icon-speedometer",
          label: "Dashboard",
          to: "/app/dashboard",
        });
        if (
          this.props.FeaturesDetails.Launchpad != null &&
          this.props.FeaturesDetails.Launchpad.length > 0
        ) {
          menuItems.push({
            id: "dashboards",
            icon: "simple-icon-rocket",
            label: this.props.FeaturesDetails.Launchpad,
            to: "/app/admin",
          });
        }
        if (
          this.props.FeaturesDetails.Engage != null &&
          this.props.FeaturesDetails.Engage.length > 0
        ) {
          menuItems.push({
            id: "dashboards1",
            icon: "simple-icon-social-youtube",
            label: this.props.FeaturesDetails.Engage,
            to: "/app/engage",
          });
        }
        if (
          this.props.FeaturesDetails.Projects != null &&
          this.props.FeaturesDetails.Projects.length > 0
        ) {
          menuItems.push({
            id: "dashboards3",
            icon: "simple-icon-folder-alt",
            label: this.props.FeaturesDetails.Projects,
            to: "/app/project",
          });
        }
        // if(this.props.FeaturesDetails.Feedback !=null && this.props.FeaturesDetails.Feedback.length > 0){
        //   menuItems.push(
        //   {
        //     id: "dashboards4",
        //     icon: "simple-icon-bubbles",
        //     label: this.props.FeaturesDetails.Feedback,
        //     to: "/app/dashboards",

        //     })
        //   }
        if (
          this.props.FeaturesDetails.Community != null &&
          this.props.FeaturesDetails.Community.length > 0
        ) {
          menuItems.push({
            id: "dashboards2",
            icon: "simple-icon-people",
            label: this.props.FeaturesDetails.Community,
            to: "/app/community",
          });
        }

        menuItems.push(
          {
            id: "dashboards5",
            icon: "simple-icon-user",
            label: "Profile",
            to: "/app/profile",
          },
          {
            id: "dashboards6",
            icon: "simple-icon-question",
            // before changing the label, fix handleClick
            label: "Help",
            to: "/app/symba",
          },

          {
            id: "dashboards7",
            icon: "simple-icon-logout",
            // before changing the label, fix handleClick
            label: "Sign out",
            to: "/",
          }
        );
      }
    }
    if (isIntern(currentUser)) {
      if (this.props.FeaturesDetails) {
        if (
          this.props.FeaturesDetails.Launchpad != null &&
          this.props.FeaturesDetails.Launchpad.length > 0
        ) {
          menuItems.push({
            id: "dashboards",
            icon: "simple-icon-rocket",
            label: this.props.FeaturesDetails.Launchpad,
            to: "/internapp/intern",
          });
        }
        if (
          this.props.FeaturesDetails.Engage != null &&
          this.props.FeaturesDetails.Engage.length > 0
        ) {
          menuItems.push({
            id: "dashboards1",
            icon: "simple-icon-social-youtube",
            label: this.props.FeaturesDetails.Engage,
            to: "/internapp/engage",
          });
        }
        if (
          this.props.FeaturesDetails.Projects != null &&
          this.props.FeaturesDetails.Projects.length > 0
        ) {
          menuItems.push({
            id: "dashboards3",
            icon: "simple-icon-folder-alt",
            label: this.props.FeaturesDetails.Projects,
            to: "/internapp/project",
          });
        }
        if (
          this.props.FeaturesDetails.Feedback != null &&
          this.props.FeaturesDetails.Feedback.length > 0
        ) {
          menuItems.push({
            id: "dashboards4",
            icon: "simple-icon-bubbles",
            label: this.props.FeaturesDetails.Feedback,
            to: "/internapp/feedback",
          });
        }
        if (
          this.props.FeaturesDetails.Community != null &&
          this.props.FeaturesDetails.Community.length > 0
        ) {
          menuItems.push({
            id: "dashboards2",
            icon: "simple-icon-people",
            label: this.props.FeaturesDetails.Community,
            to: "/internapp/community",
          });
        }

        menuItems.push(
          {
            id: "dashboards5",
            icon: "simple-icon-user",
            label: "Profile",
            to: "/internapp/profile",
          },
          {
            id: "dashboards6",
            icon: "simple-icon-question",

            label: "Help",
            to: "/internapp/symba",
          },

          {
            id: "dashboards7",
            icon: "simple-icon-logout",
            label: "Sign out",
            to: "/",
          }
        );
      }
    }
    if (isManager(currentUser)) {
      if (this.props.FeaturesDetails) {
        if (
          this.props.FeaturesDetails.Launchpad != null &&
          this.props.FeaturesDetails.Launchpad.length > 0
        ) {
          menuItems.push({
            id: "dashboards",
            icon: "simple-icon-rocket",
            label: this.props.FeaturesDetails.Launchpad,
            to: "/managerapp/manager",
          });
        }
        if (
          this.props.FeaturesDetails.Engage != null &&
          this.props.FeaturesDetails.Engage.length > 0
        ) {
          menuItems.push({
            id: "dashboards1",
            icon: "simple-icon-social-youtube",
            label: this.props.FeaturesDetails.Engage,
            to: "/managerapp/engage",
          });
        }
        if (
          this.props.FeaturesDetails.Projects != null &&
          this.props.FeaturesDetails.Projects.length > 0
        ) {
          menuItems.push({
            id: "dashboards3",
            icon: "simple-icon-folder-alt",
            label: this.props.FeaturesDetails.Projects,
            to: "/managerapp/project",
          });
        }
        //  if(this.props.FeaturesDetails.Feedback !=null && this.props.FeaturesDetails.Feedback.length > 0){
        //    menuItems.push(
        //    {
        //      id: "dashboards4",
        //      icon: "simple-icon-bubbles",
        //      label: this.props.FeaturesDetails.Feedback,
        //      to: "/managerapp/feedback",

        //      })
        //    }
        if (
          this.props.FeaturesDetails.Community != null &&
          this.props.FeaturesDetails.Community.length > 0
        ) {
          menuItems.push({
            id: "dashboards2",
            icon: "simple-icon-people",
            label: this.props.FeaturesDetails.Community,
            to: "/managerapp/community",
          });
        }

        menuItems.push(
          {
            id: "dashboards5",
            icon: "simple-icon-user",
            label: "Profile",
            to: "/managerapp/profile",
          },
          {
            id: "dashboards6",
            icon: "simple-icon-question",
            label: "Help",
            to: "/managerapp/symba",
          },
          {
            id: "dashboards7",
            icon: "simple-icon-logout",
            label: "Sign out",
            to: "/",
          }
        );
      }
    }
    if (isAlumni(currentUser)) {
      if (this.props.FeaturesDetails) {
        if (
          this.props.FeaturesDetails.Launchpad != null &&
          this.props.FeaturesDetails.Launchpad.length > 0
        ) {
          menuItems.push({
            id: "dashboards",
            icon: "simple-icon-rocket",
            label: this.props.FeaturesDetails.Launchpad,
            to: "/alumniapp/alumni",
          });
        }

        if (
          this.props.FeaturesDetails.Engage != null &&
          this.props.FeaturesDetails.Engage.length > 0
        ) {
          menuItems.push({
            id: "dashboards1",
            icon: "simple-icon-social-youtube",
            label: this.props.FeaturesDetails.Engage,
            to: "/alumniapp/engage",
          });
        }
        if (
          this.props.FeaturesDetails.Community != null &&
          this.props.FeaturesDetails.Community.length > 0
        ) {
          menuItems.push({
            id: "dashboards2",
            icon: "simple-icon-people",
            label: this.props.FeaturesDetails.Community,
            to: "/alumniapp/community",
          });
        }

        menuItems.push(
          {
            id: "dashboards5",
            icon: "simple-icon-user",
            label: "Profile",
            to: "/alumniapp/profile",
          },

          {
            id: "dashboards6",
            icon: "simple-icon-logout",
            label: "Sign out",
            to: "/",
          }
        );
      }
    }
    if (isSymbaAdmin(currentUser)) {
      menuItems.push(
        {
          id: "dashboards0",
          icon: "simple-icon-organization",
          label: "Organization",
          to: "/administrationapp/organization",
        },

        {
          id: "dashboards1",
          icon: "simple-icon-grid",
          label: "Department",
          to: "/administrationapp/Department",
        },

        {
          id: "dashboards2",
          icon: "simple-icon-social-youtube",
          label: "OrgEngage",
          to: "/administrationapp/orgengage",
        },

        {
          id: "dashboards3",
          icon: "simple-icon-drawer",
          label: "OrgFeatures",
          to: "/administrationapp/orgfeatureslist",
        },

        {
          id: "dashboards4",
          icon: "glyph-icon iconsminds-speach-bubble-asking",
          label: "BioQuestion",
          to: "/administrationapp/bioquestion",
        },

        {
          id: "dashboards5",
          icon: "simple-icon-user",
          label: "Users",
          to: "/administrationapp/users",
        },
        {
          id: "dashboards6",
          icon: "simple-icon-question",
          label: "Help",
          to: "/administrationapp/symba",
        },

        {
          id: "dashboards7",
          icon: "simple-icon-logout",
          label: "Sign out",
          to: "/",
        }
      );
    }
    return (
      <>
        <i
          class="fa fa-bars"
          aria-hidden="true"
          style={{
            fontSize: 40,
            marginTop: 20,
            marginLeft: 10,
            color: "#787571",
          }}
          onClick={() => this.handleSidebarToggle(true)}
        ></i>
        <div
          className={`sidebar main-menu sidebar_menu ${
            isSidebarOpen ? "open_sidebar" : ""
          }`}
          style={{
            width: "110px",
            backgroundColor: "#EEEEF0",
            paddingBottom: "30px",
          }}
        >
          <div className="scroll">
            {isSidebarOpen ? (
              <>
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
                    style={{
                      width: "60px",
                      height: "20px",
                      marginLeft: "1.9em",
                    }}
                    src="/assets/img/symba_logo_big.png"
                    alt=""
                  />
                </div>
              </>
            ) : null}
            <nav
              style={{
                width: "110px",
                backgroundColor: "rgb(238, 238, 240)",
                zIndex: 1000,
                boxShadow: "black 0px 0px 0px 0px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                position: "fixed",
                height: "100vh",
                padding: "20px 0",
                overflow: "visible",
              }}
            >
              <ul className="nav scrollbar">
                <Nav vertical>
                  <div
                    onClick={() => this.setState({ isSidebarOpen: false })}
                    style={{
                      marginLeft: "21px",
                      marginTop: "-10px",
                      marginBottom: "-15px",
                    }}
                  >
                    {this.hide_Notification_Alumni()}
                  </div>

                  {menuItems &&
                    menuItems.map((item) => {
                      return (
                        <NavItem
                          key={item.id}
                          onClick={() => this.handleClick(item.label)}
                          className={classnames({
                            active:
                              (selectedParentMenu === item.id &&
                                viewingParentMenu === "") ||
                              viewingParentMenu === item.id,
                          })}
                        >
                          {item.newWindow ? (
                            <a
                              style={{ height: "82px" }}
                              href={item.to}
                              rel="noopener noreferrer"
                              target="_blank"
                            >
                              <i className={item.icon} />{" "}
                              <IntlMessages id={item.label} />
                            </a>
                          ) : (
                            <NavLink
                              style={{
                                height: "70px",
                                borderBottom: "none",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center",
                                fontSize: "13px",
                              }}
                              to={item.to}
                              onClick={() =>
                                this.setState({ isSidebarOpen: false })
                              }
                              data-flag={item.id}
                            >
                              <i
                                style={{
                                  fontSize: "32px",
                                  fontWeight: "400px",
                                }}
                                className={item.icon}
                              />{" "}
                              <IntlMessages id={item.label} />
                            </NavLink>
                          )}
                        </NavItem>
                      );
                    })}
                </Nav>
              </ul>
            </nav>
          </div>
        </div>
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    currentUser: state.userReducer.currentUser,
    FeaturesDetails: state.organizationReducer.FeaturesDetails,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getFeatures_By_OrgId: (organizationId) => {
      dispatch(getFeatures_By_OrgId(organizationId));
    },
    setuserlogoutactivity: (params) => {
      dispatch(setuserlogoutactivity(params));
    },
    dispatch: dispatch,
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Sidebar));
