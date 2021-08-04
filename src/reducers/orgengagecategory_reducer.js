// import _ from 'lodash';

const OrgengagecategoryReducer = (state = { categoryList:[],categoryCount:0 }, action) => {
  Object.freeze(state);

  switch (action.type) {
   
    case 'ORGENGAGECATEGORY/ORGENGAGECATEGORY_LIST':
      return {
          ...state,
          categoryList: action.payload.categoryList,
          categoryCount: action.payload.categoryCount,
          
      } 
      // break;
    case 'ORGENGAGECATEGORY/REMOVE_ORGENGAGECATEGORY':
      return {
          ...state,
          categoryList: state.categoryList.filter(orgengage => orgengage.Categoryid !== action.payload.orgengage.Categoryid),
          categoryCount: state.categoryCount - 1,
      } 
      // break;
      case 'ORGENGAGE/ORGENGAGE_DETAILS':
        return {
          ...state,
          orgEngageDetail: action.payload.orgEngageDetail
        }
        // break;  
      
    default:
      return state;
  }
}

export default OrgengagecategoryReducer;