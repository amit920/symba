const INITIAL_STATE = {
  supervisorsList: [],
  supervisorCount: 0,
};

const InternReducer = (state = INITIAL_STATE, action) => {
  Object.freeze(state);

  switch (action.type) {
    case "INTERNS/SUPERVISOR_LIST":
      return {
        ...state,
        supervisorsList: action.payload.supervisorsList,
        supervisorCount: action.payload.supervisorCount,
      };
    default:
      return state;
  }
};

export default InternReducer;
