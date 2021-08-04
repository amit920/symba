// import _ from 'lodash';

const BioQuestionReducer = (state = { bioquestionList:[],bioquestionCount:0 }, action) => {
  Object.freeze(state);

  switch (action.type) {
   
    case 'BIOQUESTION/BIOQUESTION_LIST':
      return {
          ...state,
          bioquestionList: action.payload.bioquestionList,
          bioquestionCount: action.payload.bioquestionCount,
          
      } 
      // break;
    
    case 'BIOQUESTION/REMOVE_BIOQUESTION':
      return {
          ...state,
          bioquestionList: state.bioquestionList.filter(bioQ => bioQ.Questionmasterid !== action.payload.bioQ.Questionmasterid),
          bioquestionCount: state.bioquestionCount - 1,
      } 
      // break;

    case 'QUESTION/QUESTION_DETAILS':
      return {
          ...state,
          bioQuestionDetail: action.payload.bioQuestionDetail
      }
      // break;  
      
    default:
      return state;
  }
}

export default BioQuestionReducer;