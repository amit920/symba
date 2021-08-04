// import _ from "lodash";
/* eslint-disable */

const ProjectReducer = (
  state = {
    projectList: [],
    adminProjectList: [],
    adminProjectCount: 0,
    projectCount: 0,
    internProjectList: [],
    internProjectCount: 0,
    assignedInternDocuments: [],
    assignedInternDocumentsCount: 0,
    FeedbackStatus: null,
    FeedbackDetail: null,
    allOrgProjectList:[],
    allOrgProjectCount:0,
    ProjectTaskList:[],
    ProjectTaskCount:0,
    completedProjectList:[],
    completedProjectCount:0
  },
  action
) => {
  Object.freeze(state);

  switch (action.type) {
    case "PROJECTS/PROJECTS_LIST":
      return {
        ...state,
        projectList: action.payload.projectList,
        projectCount: action.payload.projetsCount,
      };
    case "PROJECTS/ADMIN_PROJECTS_LIST":
      return {
        ...state,
        adminProjectList: action.payload.adminProjectList,
        adminProjectCount: action.payload.adminProjectCount,
      };

    case "PROJECTS/INTERN_PROJECTS_LIST":
      return {
        ...state,
        internProjectList: action.payload.internProjectList,
        internProjectCount: action.payload.internProjectCount,
      };
    case "PROJECTS/ASSIGNED_INTERN_LIST":
      return {
        ...state,
        assignedInternList: action.payload.assignedInternList,
        assignedInternsCount: action.payload.assignedInternsCount,
      };
    case "PROJECTS/ASSIGNED_DOCUMENTS_LIST":
      return {
        ...state,
        assignedDocuments: action.payload.documents,
        assignedDocumentsCount: action.payload.count,
      };
    case "PROJECTS/INTERN_PROJECTS_DOCUMENT_LIST":
      return {
        ...state,
        assignedInternDocuments: action.payload.assignedInternDocuments,
        assignedInternDocumentsCount:
          action.payload.assignedInternDocumentsCount,
      };
    case "PROJECTS/REMOVE_PROJECTS_DOCUMENT":
      return {
        ...state,
        assignedDocuments: state.assignedDocuments.filter(
          (document) =>
            document.DocumentId !== action.payload.document.DocumentId
        ),
        assignedDocumentsCount: state.assignedDocumentsCount - 1,
      };

    case "PROJECTS/REMOVE_INTERN_PROJECTS_DOCUMENT_LIST":
      return {
        ...state,
        assignedInternDocuments: state.assignedInternDocuments.filter(
          (document) =>
            document.DocumentId !== action.payload.document.DocumentId
        ),
        assignedInternDocumentsCount: state.assignedDocumentsCount - 1,
      };

    case "PROJECTS/INTERN_PROJECTS_FEEDBACK_STATUS":
      return {
        ...state,
        FeedbackStatus: action.payload.FeedbackStatus,
      };
    case "PROJECTS/INTERN_PROJECTS_FEEDBACK_LIST":
      return {
        ...state,
        FeedbackDetail: action.payload.FeedbackDetail,
      };
    case "PROJECTS/INTERN_PROJECTS_SUBMISSION_LIST":
      return {
        ...state,
        assignedInternProjectSubmission: action.payload.assignedInternProjectSubmission,
        assignedInternProjectCount:
          action.payload.assignedInternProjectCount,
      };
    case "PROJECTS/ALL_ORG_PROJECTS_LIST":
        return {
          ...state,
          allOrgProjectList: action.payload.allOrgProjectList,
          allOrgProjectCount: action.payload.allOrgProjectCount,
        };
    case "PROJECTS/INTERN_PROJECTS_STATUS":
      return {
        ...state,
        internProjectStatus: action.payload.internProjectStatus,
      }; 
      
    case "PROJECTS/USER_PROJECTS_TASK_LIST":
        return {
          ...state,
          ProjectTaskList: action.payload.ProjectTaskList,
          ProjectTaskCount: action.payload.ProjectTaskCount,
        };

    case "PROJECTS/COMPLETED_PROJECTS_LIST":
      return {
        ...state,
        completedProjectList: action.payload.completedProjectList,
        completedProjectCount: action.payload.completedProjectCount,
      };   
    case "PROJECTS/COMPLETED_PROJECTS_TASK_LIST":
        return {
          ...state,
          CompletedTaskList: action.payload.CompletedTaskList,
          CompletedTaskCount: action.payload.CompletedTaskCount,
        };        
    case "PROJECTS/INTERN_PROJECTS_DOCUMENT_SUBMISSION_LIST":
      return {
        ...state,
        InternProjectSubmissionList: action.payload.InternProjectSubmissionList,
        InternProjectSubmissionCount: action.payload.InternProjectSubmissionCount,
      };      
    case "PROJECTS/REMOVE_PROJECTS_DOCUMENT":

    default:
      return state;
  }
};

export default ProjectReducer;
