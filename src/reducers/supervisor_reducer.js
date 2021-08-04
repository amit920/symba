// import _ from "lodash";

const SupervisorReducer = (
  state = { projectList: [], projectCount: 0 },
  action
) => {
  Object.freeze(state);

  switch (action.type) {
    default:
      return state;
  }
};

export default SupervisorReducer;
