const INITIAL_STATE = {
  feedbackList: [],
  feedbackCount: 0,
  instantfeedbackList: [],
  instantCount: 0,
};

const InternFeedbackReducer = (state = INITIAL_STATE, action) => {
  Object.freeze(state);

  switch (action.type) {
    // case 'INTERNS/PROJECT_FEEDBACK_LIST':
    //     return {
    //         ...state,
    //         feedbackList: action.payload.feedbackList,
    //         feedbackCount: action.payload.feedbackCount,
    //     }
    case "INTERNS/FEEDBACK_LIST":
      return {
        ...state,
        feedbackList: action.payload.feedbackList,
        feedbackCount: action.payload.feedbackCount,
      };
    // case 'INTERNS/REQUEST_FEEDBACK_LIST':
    //         return {
    //             ...state,
    //             requestfeedbackList: action.payload.requestfeedbackList,
    //             instantCount: action.payload.instantCount,
    //         }
    default:
      return state;
  }
};

export default InternFeedbackReducer;
