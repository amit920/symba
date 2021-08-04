// import _ from "lodash";

const DepartmentReducer = (
  state = { departmentList: [], departmentCount: 0 },
  action
) => {
  Object.freeze(state);

  switch (action.type) {
    case "DEPARTMENT/DEPARTMENT_LIST":
      return {
        ...state,
        departmentList: action.payload.departmentList,
        departmentCount: action.payload.departmentCount,
      };
      // break;
    case "DEPARTMENT/REMOVE_DEPARTMENT":
      return {
        ...state,
        departmentList: state.departmentList.filter(
          (dept) => dept.department_id !== action.payload.dept.department_id
        ),
        departmentCount: state.departmentCount - 1,
      };
      // break;
    case "DEPARTMENT/DEPARTMENT_DETAILS":
      return {
        ...state,
        departmentDetail: action.payload.departmentDetail,
      };
      // break;

    default:
      return state;
  }
};

export default DepartmentReducer;
