// import _ from 'lodash';

const OrgfeatureslistReducer = (state = { featuresList:[],featuresCount:0 }, action) => {
  Object.freeze(state);

  switch (action.type) {
   
    case 'ORGFEATURES/ORGFEATURES_LIST':
      return {
          ...state,
          featuresList: action.payload.featuresList,
          featuresCount: action.payload.featuresCount,          
      } 
    // break;

    case 'ORGFEATURES/REMOVE_ORGFEATURES':
      return {
          ...state,
          featuresList: state.featuresList.filter(features => features.Featuresid !== action.payload.features.Featuresid),
          featuresCount: state.featuresCount - 1,
      } 
    // break;

    case 'ORGFEATURES/ORGFEATURES_DETAILS':
      return {
        ...state,
        orgFeaturesDetail: action.payload.orgFeaturesDetail
      }
    // break;  
      
    default:
      return state;
  }
}

export default OrgfeatureslistReducer;