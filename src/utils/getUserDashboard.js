import createBrowserHistory from "history/createBrowserHistory";
import localStorageService from "./localStorageService";
const LocalStorageService = localStorageService.getService();
const browserHistory = createBrowserHistory();

export default function () {
  var currentUser = LocalStorageService.getCurrentUser();

  if (currentUser) {
    currentUser = JSON.parse(currentUser);
    switch (currentUser.type) {
      case "admin":
        browserHistory.push("/admin/dashboard");
        break;
      case "supervisor":
        browserHistory.push("/supervisor/dashboard");
        break;
      // case 'organization':
      //     browserHistory.push('/organization/dashboard');
      //     break
      case "intern":
        browserHistory.push("/intern/projects");
        break;
      case "administration":
        browserHistory.push("/administration/addOrganization");
        break;
      default:
        LocalStorageService.clearUser();
        browserHistory.push("/login");
    }
  } else if (currentUser == undefined) {
    browserHistory.push("/demo");
  } else {
    LocalStorageService.clearUser();
    browserHistory.push("/login");
  }
}
