const INITIAL_STATE = {
    UserGuideList: [],
    GuideCount: 0,
    AllGuideList:[],
    AllGuideCount:0,

  };
  
  const HelpCenterReducer = (state = INITIAL_STATE, action) => {
    Object.freeze(state);
  
    switch (action.type) {
      case "USER/GUIDE_LIST":
        return {
          ...state,
          UserGuideList: action.payload.UserGuideList,
          GuideCount: action.payload.GuideCount,
        };
      case "UTILITY/ALL_HELPGUIDE_LIST":
        return {
          ...state,
          AllGuideList: action.payload.AllGuideList,
          AllGuideCount: action.payload.AllGuideCount,
        };
      default:
        return state;
    }
  };
  
  export default HelpCenterReducer;
  