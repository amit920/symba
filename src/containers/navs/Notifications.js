import React, { Component } from "react";
import { injectIntl } from "react-intl";
import { connect } from "react-redux";
import * as constants from "../../utils/constants";
import MagicBell, {
  FloatingNotificationInbox,
} from "@magicbell/magicbell-react";
import BellIcon from "./BellIcon";
import createBrowserHistory from "history/createBrowserHistory";
const browserHistory = createBrowserHistory();
const theme = {
  icon: { borderColor: "#17B298", width: "24px" },
  unseenBadge: { backgroundColor: "#DF4759" },
  header: {
    backgroundColor: "#17B298",
    textColor: "#ffffff",
    borderRadius: "16px",
  },

  footer: {
    backgroundColor: "#17B298",
    textColor: "#17B298",
    borderRadius: "16px",
    fontSize: "10px",
    textAlign: "center",
    cursor: "context-menu !important",
    display: "none",
  },
  button: {
    textColor: "white",
  },
  notification: {
    default: {
      textColor: "#15091F",
      borderRadius: "8px",
      backgroundColor: "#17B298",
    },
    unseen: {
      backgroundColor: "#17B298",
      textColor: "#15091F",
      borderRadius: "8px",
    },
    unread: {
      backgroundColor: "#17B298",
      textColor: "#15091F",
      borderRadius: "8px",
    },
  },
};
class Notifications extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  onclicknotify(notifactiondata) {
    if (notifactiondata.category !== "feedback") {
      switch (this.props.currentUser.type) {
        case "organization":
          browserHistory.push("/app" + notifactiondata.actionUrl);
          window.location.reload();
          break;
        case "manager":
          if (notifactiondata.category === "Launchpad") {
            browserHistory.push(
              "/managerapp/manager" + notifactiondata.actionUrl
            );
          } else {
            browserHistory.push("/managerapp" + notifactiondata.actionUrl);
          }
          window.location.reload();
          break;
        case "intern":
          if (notifactiondata.category === "Launchpad") {
            browserHistory.push(
              "/internapp/intern" + notifactiondata.actionUrl
            );
          } else {
            browserHistory.push("/internapp" + notifactiondata.actionUrl);
          }
          window.location.reload();
          break;
        case "alumni":
          if (notifactiondata.category === "Launchpad") {
            browserHistory.push(
              "/alumniapp/alumni" + notifactiondata.actionUrl
            );
          } else {
            browserHistory.push("/alumniapp" + notifactiondata.actionUrl);
          }
          window.location.reload();
          break;
        default:
      }
    } else {
      window.open(notifactiondata.actionUrl, "_blank");
    }
  }
  render() {
    return (
      <MagicBell
        apiKey={constants.MAGIC_API_KEY}
        userEmail={this.props.currentUser.Email}
        BellIcon={<BellIcon />}
        theme={theme}
        images={{
          emptyInboxUrl: "/assets/img/NotificationImage.png",
        }}
        // theme={{
        //   header: { backgroundColor: "#17b298" },
        //   footer: { backgroundColor: "#17b298" },
        //   icon: { width: "32px" },
        //   notification: {
        //     default: { backgroundColor: "#17b298" },
        //     unseen: { backgroundColor: "#17b298" },
        //     unread: { backgroundColor: "#17b298"  }
        //   } this.onclicknotify(notification)
        // }}
      >
        {(props) => (
          <FloatingNotificationInbox
            onNotificationClick={(notification) =>
              this.onclicknotify(notification)
            }
            height={550}
            placement="right-end"
            popperOptions={{
              modifiers: [
                {
                  name: "offset",
                  options: {
                    offset: [0, 30],
                  },
                },
              ],
            }}
            {...props}
          />
        )}
      </MagicBell>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.userReducer.currentUser,
  };
};
export default injectIntl(connect(mapStateToProps, {})(Notifications));
