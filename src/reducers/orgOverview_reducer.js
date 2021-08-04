const INITIAL_STATE = {
  LaunchpadDetail: null,
  OverviewCount: 0,
};

const OverviewReducer = (state = INITIAL_STATE, action) => {
  Object.freeze(state);

  switch (action.type) {
    case "LAUNCHPAD/ORG_OVERVIEW_LIST":
      return {
        ...state,
        LaunchpadDetail: action.payload.LaunchpadDetail,
        LaunchpadCount: action.payload.LaunchpadCount,
      };
    default:
      return state;
  }
};

export default OverviewReducer;
