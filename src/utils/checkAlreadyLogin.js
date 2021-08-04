import createBrowserHistory from "history/createBrowserHistory";
import localStorageService from "./localStorageService";
const LocalStorageService = localStorageService.getService();
const browserHistory = createBrowserHistory();

export default function () {
  var currentUser = LocalStorageService.getCurrentUser();
  if (currentUser) {
    currentUser = JSON.parse(currentUser);
    switch (currentUser.type) {
      case "organization":
        browserHistory.push("/app");
        window.location.reload();
        break;

      case "intern":
        browserHistory.push("/internapp");
        window.location.reload();
        break;

      case "symbaAdmin":
        browserHistory.push("/administrationapp");
        window.location.reload();
        break;

      case "manager":
        browserHistory.push("/managerapp");
        window.location.reload();
        break;

      case "alumni":
        browserHistory.push("/alumniapp");
        window.location.reload();
        break;        
      // case "intern":
      //   browserHistory.push("/intern/projects");
      //   break;

      case "superadmin":
        browserHistory.push("#/Homes");
        window.location.reload();
        break;

      default:
        LocalStorageService.clearUser();
        browserHistory.push("/login");
    }
  }
}
