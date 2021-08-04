// import _ from "lodash";

const MasterDataReducer = (
  state = {
    socialNetworksList: [],
    socialNetworksCount: 0,
    countriesList: [],
    statesList: [],
    departmentList: [],
    departmentCount: 0,
    masterReactsList: [],
    masterReactsCount: 0,
  },
  action
) => {
  Object.freeze(state);

  switch (action.type) {
    case "MASTERDATA/COUNTRY_LIST":
      return {
        ...state,
        countriesList: action.payload.countriesList,
      };
      // break;
    case "MASTERDATA/STATE_LIST":
      return {
        ...state,
        statesList: action.payload.statesList,
      };
      // break;
    case "MASTERDATA/CITY_LIST":
      return {
        ...state,
        citiesList: action.payload.citiesList,
      };
      // break;
    case "MASTERDATA/DEPARTMENT_LIST":
      return {
        ...state,
        departmentList: action.payload.departmentList,
        departmentCount: action.payload.departmentCount,
      };
      // break;
    case "MASTERDATA/SOCIALNETWORKS_LIST":
      return {
        ...state,
        socialNetworksList: action.payload.socialNetworksList,
        socialNetworksCount: action.payload.socialNetworksCount,
      };
      // break;
    case "MASTERDATA/SKILLS_LIST":
      return {
        ...state,
        skillsList: action.payload.skillsList,
        skillsCount: action.payload.skillsCount,
      };
      // break;
      case "MASTERDATA/INTERESTS_LIST":
      return {
        ...state,
        interestsList: action.payload.interestsList,
        interestsCount: action.payload.interestsCount,
      };
      case "MASTERDATA/MASTER_REACTIONS_LIST":
        return {
          ...state,
          masterReactsList: action.payload.masterReactsList,
          masterReactsCount: action.payload.masterReactsCount,
        }; 
      // case "MASTERDATA/MASTER_REACTIONS_LIST":
      //   return {
      //     ...state,
      //     masterReactsList: action.payload.masterReactsList,
      //     masterReactsCount: action.payload.masterReactsCount,
      //   };         
    default:
      return state;
  }
};

export default MasterDataReducer;
