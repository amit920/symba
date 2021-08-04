import localStorageService from "../utils/localStorageService";

const LocalStorageService = localStorageService.getService();
var currentUser = JSON.parse(LocalStorageService.getCurrentUser());
const UserReducer = (
  state = {
    currentUser: currentUser,
    userList: [],
    userCount: 0,
    adminUserDetail: null,
  },
  action
) => {
  Object.freeze(state);

  switch (action.type) {
    case "USER_GET":
      return {
        ...state,
        currentUser: action.payload.currentUser,
      };
    case "USER_LOGOUT":
      return {
        ...state,
        currentUser: null,
      };
    case "USER/USER_LIST":
      return {
        ...state,
        userList: action.payload.userList,
        userCount: action.payload.userCount,
      };
    case "USER/USER_DETAILS_BY_ID":
      return {
        ...state,
        UserDetails: action.payload.UserDetails,
      };
    case "INTERN/INTERN_RESPONSE_FEEDBACK":
      return {
        ...state,
        internInfo: action.payload.internInfo,
      };
      //break;
    // case 'UTILITY/REMOVE_USER':
    //   return {
    //       ...state,
    //       userList: state.userList.filter(user => user.UserId !== action.payload.user.UserId),
    //       userCount: state.userCount - 1,
    //   }
    //   break;
    default:
      return state;
  }
};

export default UserReducer;
