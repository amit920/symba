// const INITIAL_STATE = {
//     resourcesList: [],
//     resourcesCount: 0,

// }

const OverviewResourceReducer = (state = { resourcesList: [] }, action) => {
  Object.freeze(state);

  switch (action.type) {
    case "LAUNCHPAD/OVERVIEW_RESOURCES_DOCUMENT_LIST":
      return {
        ...state,
        resourcesList: action.payload.resourcesList,
        resourcesCount: action.payload.resourcesCount,
      };
    case "ORGANIZATION/REMOVE_OVERVIEW_RESOURCES_DOCUMENT":
      return {
        ...state,
        resourcesList: state.resourcesList.filter(
          (resources) =>
            resources.Resourceid !== action.payload.resources.Resourceid
        ),
        resourcesCount: state.resourcesCount - 1,
      };
    default:
      return state;
  }
};

export default OverviewResourceReducer;
