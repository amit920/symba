const INITIAL_STATE = {
  isLoading: false,
};

const LayoutReducer = (state = INITIAL_STATE, action) => {
  Object.freeze(state);

  switch (action.type) {
    case "LAYOUT/CHANGE_LOADER":
      return {
        ...state,
        isLoading: action.payload.loaderState,
      };
    default:
      return state;
  }
};

export default LayoutReducer;
