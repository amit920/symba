// import _ from "lodash";

const OrganizationReducer = (
  state = {
    internDetail: {},
    userDetail: {},
    adminUserDetail: {},
    departmentSelectList: [],
    orgList: [],
    orgCount: 0,
    organizationList: [],
    adminDetail: {},
    categoryList: [],
    categoryCount: 0,
    managerDetail: {},
  },
  action
) => {
  Object.freeze(state);

  switch (action.type) {
    case "ORGANIZATION/ADMINISTRATORS_COMMUNITY_LIST":
      return {
        ...state,
        administratorsList: action.payload.administratorsList,
        administrators_count: action.payload.administrators_count,
      };
    case "ORGANIZATION/TEAM_MEMBERS_COMMUNITY_LIST":
      return {
        ...state,
        teammembersList: action.payload.teammembersList,
        teammembersList_count: action.payload.teammembersList_count,
      };

    case "ORGANIZATION/ORGANIZATION_DETAILS":
      return {
        ...state,
        organizationDetail: action.payload.organizationDetail,
      };
    case "ORGANIZATION/INTERNS_LIST":
      return {
        ...state,
        internList: action.payload.internList,
        internCount: action.payload.internCount,
      };

    case "ORGANIZATION/OGANIZATION_LIST":
      return {
        ...state,
        orgList: action.payload.orgList,
        orgCount: action.payload.orgCount,
      };
      // break;
    case "ORGANIZATION/REMOVE_ORGANIZATION":
      return {
        ...state,
        orgList: state.orgList.filter(
          (org) => org.org_id !== action.payload.org.org_id
        ),
        orgCount: state.orgCount - 1,
      };
    case "ORGANIZATION/ALL_OGANIZATION_LIST":
      return {
        ...state,
        organizationList: action.payload.organizationList,
        // organizationCount: action.payload.organizationCount,
      };
      // break;
    case "ORGANIZATION/ADMIN_DETAILS":
      return {
        ...state,
        adminDetail: action.payload.adminDetail,
      };
    case "ORGANIZATION/MANAGER_DETAILS":
      return {
        ...state,
        managerDetail: action.payload.managerDetail,
      };
      // break;
    // case 'ORGANIZATION/WORKER_DETAILS':
    // return {
    //   ...state,
    //   workerDetail: action.payload.workerDetail
    // }
    // break;
    // case 'ORGANIZATION/APPLICATION_LIST':
    //   return {
    //       ...state,
    //       applicationList: action.payload.applicationList,
    //       applicationCount: action.payload.applicationCount,

    //   }
    //   break;
    // case 'ORGANIZATION/APPLICATION_DETAILS':
    //   return {
    //     ...state,
    //     applicationDetails: action.payload.applicationDetails
    //   }
    //   break;
    // case 'ORGANIZATION/REMOVE_APPLICATION':
    //   return {
    //       ...state,
    //       applicationList: state.applicationList.filter(app => app.application_id !== action.payload.app.application_id),
    //       applicationCount: state.applicationCount - 1,
    //   }
    //   break;
    case "SIDEBAR/FEATURES_LIST":
      return {
        ...state,
        FeaturesDetails: action.payload.FeaturesDetails,
      };
      // break;
    // case 'ORGANIZATION/SCREEN_LIST':
    //   return {
    //       ...state,
    //       screenList: action.payload.screenList,
    //       screenCount: action.payload.screenCount,

    //   }
    //   break;
    // case 'ORGANIZATION/SCREENS_BY_APPLICATION_ID':
    //   return {
    //       ...state,
    //       screens: action.payload.screens,

    //   }
    //   break;
    // case 'ORGANIZATION/SCREEN_DETAILS_BY_ID':
    //   return {
    //     ...state,
    //     screenDetails: action.payload.screenDetails
    //   }
    //   break;
    case "ORGANIZATION/INTERN_DETAILS":
      return {
        ...state,
        internDetail: action.payload.internDetail,
      };
      // break;
    case "ORGANIZATION/COMMUNITY_USER_DETAILS":
      return {
        ...state,
        userDetail: action.payload.userDetail,
      };
      // break;
    case "ORGANIZATION/ALL_ADMIN_COMMUNITY_USER_DETAILS":
      return {
        ...state,
        adminUserDetail: action.payload.adminUserDetail,
      };
      // break;
    case "ORGANIZATION/CATEGORY_LIST":
      return {
        ...state,
        categoryList: action.payload.categoryList,
        categoryCount: action.payload.categoryCount,
      };
      // break;
    default:
      return state;
  }
};

export default OrganizationReducer;
