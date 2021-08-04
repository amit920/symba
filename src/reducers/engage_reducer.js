// import _ from "lodash";

const EngageReducer = (
  state = {
    engageVideoList: [],
    engageVideoCount: 0,
    videoCommentList: [],
    videoCommentCount: 0,
    topicList:[],
    topicCount:0,
    topicCommentList:[],
    topicCommentCount:0
  },
  action
) => {
  Object.freeze(state);

  switch (action.type) {
    case "ENGAGE/ENGAGEVIDEO_LIST":
      return {
        ...state,
        engageVideoList: action.payload.engageVideoList,
        engageVideoCount: action.payload.engageVideoCount,
      };
      // break;
    case "ENGAGE/ENGAGEVIDEO_DETAILS":
      return {
        ...state,
        engageVideoDetail: action.payload.engageVideoDetail,
      };
      // break;
    case "ENGAGE/ENGAGEVIDEOCOMMENTS_LIST":
      return {
        ...state,
        videoCommentList: action.payload.videoCommentList,
        videoCommentCount: action.payload.videoCommentCount,
      };
      // break;
      case 'DISCUSSION/TOPIC_LIST':
        return {
            ...state,
            topicList: action.payload.topicList,
           topicCount: action.payload.topicCount,
            
        }
        // break; 
      case "DISCUSSION/TOPIC_DETAILS":
        return {
          ...state,
          topicDetail: action.payload.topicDetail,
        };
        // break;
      case "DISCUSSION/TOPIC_COMMENTS_LIST":
        return {
          ...state,
          topicCommentList: action.payload.topicCommentList,
          topicCommentCount: action.payload.topicCommentCount,
        };          
    default:
      return state;
  }
};

export default EngageReducer;
