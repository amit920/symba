//=================== Add by vk env setup ===============
//export const ENV = process.env.REACT_APP_ENV
export let DEFAULT_LIMIT_SIZE = 10;
export let LIVE_DOMAIN_URL = process.env.REACT_APP_LIVE_DOMAIN_URL;
//export let STAGING_DOMAIN_URL = process.env.REACT_APP_STAGING_DOMAIN_URL
//export let LOCAL_DOMAIN_URL = process.env.REACT_APP_LOCAL_DOMAIN_URL
//export let DEFAULT_COUNTRY_ID = process.env.REACT_APP_DEFAULT_COUNTRY_ID
export let BUCKET_NAME = process.env.REACT_APP_BUCKET_NAME;
export let AWS_REGION = process.env.REACT_APP_AWS_REGION;
export let AWS_ACCESS_KEY_ID = process.env.REACT_APP_AWS_ACCESS_KEY_ID;
export let AWS_ACCESS_SECRET_ID = process.env.REACT_APP_AWS_ACCESS_SECRET_ID;
export let METABASE_SECRET_KEY = process.env.REACT_APP_METABASE_SECRET_ID;
export let METABASE_URL = process.env.REACT_APP_METABASE_URL;
export let MAGIC_API_KEY = process.env.REACT_APP_MAGICBELL_API_KEY;
export let CHURNZERO_APPLICATION_KEY = process.env.REACT_APP_CHURNZERO_APPLICATION_KEY // teack user
//=======================================================
// =====================useractivity log ===================
// export const USER_LOGIN_LOG = "useractivity_create";
export const USER_LOGOUT_LOG = "useractivity_logoutlog/:id";
//=================== user CONST ==========================
export const GETY_USER_URL = "user/:id";

//=================== users CONST ==========================
export const LOGIN_URL = "users/login/";
export const LOGOUT_URL = "users/logout/";
export const FORGOT_PASSWORD_URL = "sendmail_forget";
export const RESET_PASSWORD_URL = "sendmail_ResetPassword";
//=================== Interns CONST ==========================
// export const ALL_INTERN_LIST_URL = 'get_all_interns/'
// export const INTERN_DETAIL_URL = 'interns/:id'
// export const ADD_INTERN_DETAIL_URL = 'intern/create'
// export const UPDATE_INTERN_DETAIL_URL = 'interns/:id/update'
// export const UPDATE_INTERN_PROFILE_DETAIL_URL = 'interns/profile/:id/update'
// export const UPDATE_USER_PROFILE_IMAGE_URL = 'UserProfileImageUpdate/:id'
// export const DELETE_INTERN_URL = 'interns/:id'
// export const INTERN_SUPERVISORS_URL = 'supervisorsbyintern/'
// export const INTERN_REQUEST_FEEDBACK_URL = 'internRequestFeedback'
// export const INTERN_RESPONSE_FEEDBACK_URL = 'feedbackresponseinsert'

// //=================== SuperVisor CONST ==========================
// export const SUPERVISOR_LIST_URL = 'supervisors'
// export const ALL_SUPERVISOR_LIST_URL = 'supervisors/get_all'
// export const SUPERVISOR_DETAIL_URL = 'supervisors/:id'
// export const ADD_SUPERVISOR_DETAIL_URL = 'supervisors/create'
// export const UPDATE_SUPERVISOR_DETAIL_URL = 'supervisors/:id/update'
// export const UPDATE_SUPERVISOR_PROFILE_DETAIL_URL = 'supervisor/profile/:id/update'
// export const DELETE_SUPERVISOR_URL = 'supervisors/:id'
// export const SUPERVISOR_PROJECT_LIST_URL = 'supervisors/projects'
// export const SUPERVIS0R_INTERN_LIST_URL = 'get_internslist/'

// //=================== MasterData CONST ==========================
export const GET_COUNTRY_LIST_URL = "get_countries/";
export const GET_STATE_LIST_URL = "get_states/:country_id";
export const GET_CITY_LIST_URL = "city/";
export const GET_SOCIALNETWORKS_LIST_URL = "get_socialnetworks_list";
export const GET_SKILLS_LIST_URL = "get_skills_list";
export const GET_INTERESTS_LIST_URL = "get_interests_list";

// //==================== SIDEBAR CONST ============================
export const GET_FEATURES_LIST_BY_ORGID_URL = "getorgfeatureslist_byorgid/";

//launchpad URL
export const LAUNCHPAD_OVERVIEW_RESOURCES_DOCUMENT_DETAIL_URL =
  "getalllaunchpad_list_by_deptid";
export const LAUNCHPAD_OVERVIEW_RESOURCES_DOCUMENT_UPDATE_URL =
  "launchpadresource_Update/:resource_id";
export const LAUNCHPAD_OVERVIEW_RESOURCES_DOCUMENT_SUBMISSIONS_CREATE_URL =
  "launchpadresources_create";
export const LAUNCHPAD_RESOURCES_DOCUMENT_DELETE_URL =
  "launchpadresource_delete/:resource_id";
export const LAUNCHPAD_OVERVIEW_SUBMISSIONS_CREATE_URL = "launchpadOverview";
export const ADMIN_LAUNCHPAD_ORG_OVERVIEW_DETAIL_URL = "launchapdOverView_get";
export const LAUNCHPAD_DRAGDROP_URL = "updateindex_byresource";

//Community

export const ADMINISTRATORS_LIST_URL = "administrators_community_list";
export const TEAM_MEMBERS_LIST_URL = "teammembers_community_list";
export const INTERN_DETAIL_URL = "interns/:id/";

//Engage
export const GET_CATEGORY_LIST_URL = "getorgengagecategory_byorgid/:org";
export const ENGAGE_CREATE_URL = "engagevideo";
export const GET_ENGAGE_VIDEO_LIST_BY_CATEGORYID_URL =
  "getengagevideo_bycategoryid";
export const GET_ENGAGE_VIDEO_LIST_BY_ENGAGEVIDEOID_URL =
  "getengagevideoById/:id";
export const ENGAGE_VEDIO_UPDATE_URL =
  "engagevideodetail_Update/:engage_video_id";
export const ENGAGE_VEDIO_DELETE_URL =
  "engagevideodetail_delete/:engage_video_id";

//engage comments
export const ENGAGE_COMMENTS_CREATE_URL = "engagecomments";
export const GET_ENGAGECOMMENTS_LIST_BY_VIDEOID_URL =
  "getengagecomments_byengagevideoid";

//feedback
export const INTERN_REQUEST_FEEDBACK_URL = "internRequestFeedback";
export const INTERN_LIST_INFO_FOR_FEEDBACKRESPONSE_URL =
  "getInternForResponse/:id";
export const INTERN_RESPONSE_FEEDBACK_CREATE_URL =
  "feedbackresponseforinterninsert";

// intern profile
export const INTERN_PROFILE_URL = "internsprofile/:id";
export const UPDATE_INTERN_PROFILE_QUESTIONRESPONSE_URL =
  "interns/questionresponse/:id/update";
export const RESUME_DELETE_URL = "internresume_delete/:user_id";
export const SOCIAL_NETWORK_DELETE_URL = "socialnetwork_delete/:id";
export const SOCIAL_LINKS_CREATE_URL = "create_usersociallinks";
export const USER_SKILLS_CREATE_URL = "create_userskills";
export const USER_INTERESTS_CREATE_URL = "create_userinterests";
export const USER_SKILLS_DELETE_URL = "userskill_delete/:id";
export const USER_INTERESTS_DELETE_URL = "userinterest_delete/:id";
export const UPDATE_USER_PROFILE_IMAGE_URL = "UserProfileImageUpdate/:id";

// manager
export const ADD_PROJECT_DETAIL_URL = "projects";
export const ASSIGN_NEW_PROJECT_USERS_URL = "assign_users";
export const USER_LIST_URL = "users/";
export const ASSIGN_INTERN_DELETE_URL = "assignIntern_delete/:id";
// export const CUREENT_PROJECT_DETAILS_URL = 'get_currentproject'
export const DOCUMENT_CREATE_URL = "projectdocuments_create";
export const DOCUMENT_LIST_URL = "documents/";
export const MANAGER_PROJECT_LIST_URL = "manager/projects";
export const UPDATE_PROJECT_DETAILS_URL = "UpdateProject/:id/";
export const MANAGER_RESOURCE_DELETE_URL = "managerresource_delete/:id";
export const DOCUMENT_UPDATE_URL = "projectdocuments_Update/:documentId";

export const UNASSIGN_INTERN_DETAIL_URL = "unassigninternsdetails/:id";
export const UNASSIGN_PROJECT_USERS_LIST_URL = "UnAsssignusers/";

// inter Project
export const INTERN_PROJECT_LIST_URL = "intern/projects";
export const PROJECT_DETAILS_PROJECT_BOARD_URL =
  "projects_internprojectboard/:id";
export const INTERN_PROJECT_SUBMISSIONS_CREATE_URL =
  "InternprojectdocumentsCreate";
export const INTERN_PROJECT_DOCUMENTS_URL = "Internsdocuments/";
export const INTERN_PROJECT_SUBMISSIONS_UPDATE_URL =
  "Internprojectdocuments_Update/:document_id";
export const INTERN_RESOURCE_DELETE_URL = "internresource_delete/:id";
export const UPDATE_INTERN_PROJECT_STATUS_URL = "internproject_status_update"; // may 24 2020
export const GET_INTERN_PROJECT_STATUS_URL = "intern/get_internproject_status"; // may 25 2020
export const Manager_PROJECT_DELETE_URL = "adminproject_delete/:project_id";
export const INTERN_PROJECT_TASK_STATUS_URL = "intern_project_task_status";
export const GET_INTERN_COMPLETED_PROJECT_TASK_STATUS_URL = "get_completedtaskstatus_listbyproject";


// Admin Project
export const ADD_ADMIN_PROJECT_DETAIL_URL = "adminprojects_create";
export const ADMIN_PROJECT_LIST_URL = "admin/projects";
export const ADMIN_PROJECT_DETAILS_URL = "adminprojects_details/:id";
export const ADMIN_UPDATE_PROJECT_DETAILS_URL = "admin_UpdateProject/:id/";
export const ADMIN_RESOURCE_CREATE_URL = "admin_project_resource_create";
export const ADMIN_DOCUMENT_LIST_URL = "admin_documents/";
export const ADMIN_DOCUMENT_UPDATE_URL = "projectdocuments_Update/:documentId";
export const Admin_RESOURCE_DELETE_URL = "admin_resource_delete/:id";

export const INTEN_PROJECT_SUBMISSION_URL = "interndocumentbyproject";

export const ALL_ORG_PROJECT_LIST_URL = "all/org_projects";
export const ADMIN_PROJECT_DELETE_URL = "adminproject_delete/:project_id";

export const MARK_COMPLETED_PROJECT_BOARD_URL =
  "checkprojectboard_Update/:project_id";
export const ADMIN_COMPLETED_PROJECT_BOARD_URL = "admin/completedprojectboard";
export const ADD_DUPLICATE_PROJECT_DETAIL_URL = "duplicateprojects_create";
// export const GET_INTERN_COMPLETED_PROJECT_TASK_STATUS_URL = "get_completedtaskstatus_listbyproject";
export const GET_INTERN_PROJECT_SUBMISSION_LIST_URL = "get_internsubmission_listbyproject";

// admin profile
export const ADMIN_PROFILE_URL = "adminprofile/:id";
export const UPDATE_ADMIN_PROFILE_QUESTIONRESPONSE_URL =
  "admin/questionresponse/:id/update";

// manager profile
export const MANAGER_PROFILE_URL = "managerprofile/:id";
export const UPDATE_MANAGER_PROFILE_QUESTIONRESPONSE_URL =
  "manager/questionresponse/:id/update";

// intern Community profile
export const INTERN_COMMUNITY_PROFILE_URL = "communityuserprofile/:id";

// admin Community profile
export const ADMIN_COMMUNITY_PROFILE_URL = "allcommunityuserprofile/:id";

// export const INTERN_FEEDBACK_URL = 'get_internInstantFeedback/:id'
export const INTERN_FEEDBACK_URL = "interns_List_withfilter";

// //===================== Organization Constants ===============================
// export const DEPARTMENT_LIST_URL = 'organizations/:id/departments/';
// export const ADMIN_ORG_OVERVIEW_DETAIL_URL = 'OrgOverView_get'
// export const ORG_OVERVIEW_RESOURCES_DOCUMENT_DETAIL_URL = 'org_overvewresources_get'
// export const ORG_OVERVIEW_RESOURCES_DOCUMENT_DELETE_URL = 'orginternoverview_delete/:overview_id'
// export const ADMIN_DETAIL_URL = 'admin/:id'
// export const UPDATE_ADMIN_PROFILE_DETAIL_URL = 'admin/profile/:id/update'
// //===================== Projects Constants ===============================
// export const GET_ALL_ORGANIZATION_USER_URL = 'nonadminusers/'
// export const UPDATE_PROJECT_DETAILS_URL = 'UpdateProject/:id/'
export const PROJECT_DETAILS_URL = "projects/:id";
// export const PROJECT_REVIEW_STATUS_URL = 'InternProjectReviewStatus'

// export const DOCUMENT_LIST_URL = 'documents/'
// export const UNASSIGN_PROJECT_USERS_URL = 'unassign_users'
// export const UNASSIGN_PROJECT_USERS_LIST_URL = 'UnAsssignusers/'
// export const DOCUMENT_CREATE_URL = 'projectdocuments_create'
// export const DOCUMENT_UPDATE_URL = 'projectdocuments_Update/:documentId'
// export const INTERN_PROJECT_DOCUMENTS_URL = 'Internsdocuments/'
// export const REMOVE_PROJECT_DOCUMENTS_URL = 'projectdocumentsDelete/:document_id/'

// export const INTERN_PROJECT_SUBMISSIONS_URL = 'projectdocumentsDelete/:document_id/'
// export const INTERN_PROJECT_SUBMISSIONS_CREATE_URL = 'InternprojectdocumentsCreate'
// export const INTERN_PROJECT_SUBMISSIONS_UPDATE_URL = 'Internprojectdocuments_Update/:document_id'
// export const INTERN_PROJECT_SUBMISSIONS_DELETE_URL = 'Internprojectdocuments_Delete/:document_id'
// export const INTERN_PROJECT_FEEDBACK_URL = 'get_internProjectFeedback'
// export const INTERN_PROJECT_REVIEW_URL = 'InternProjectReview'
// export const INTERN_PROJECT_FEEDBACK_VIEW_TO_SUPERVISOR_URL = 'get_SupervisorProjectFeedback'
// export const INTERN_OVERVIEW_SUBMISSIONS_CREATE_URL = 'internOverview'
// export const INTERN_OVERVIEW_RESOURCES_DOCUMENT_SUBMISSIONS_CREATE_URL = 'internOverviewResources_Document'

// //================================= Global config ==================================

// AWS S3 Bucket

// // User utility pages

export const ADD_NEW_ORGANIZATION_URL = "organizationInsert/";
export const ORG_UPDATE_URL = "organizationUpdate/:org_id";
export const ORG_DELETE_URL = "organizationDelete/:org_id";
export const GET_ALL_ORGANIZATION_URL = "organization_list/";
export const ORGANIZATION_DETAIL_URL = "orgBy_orgId/:id";
export const GET_ALL_ORGANIZATION_LIST_URL = "getallorganization_list/";
export const ADD_NEW_ORG_DEPARTMENT_URL = "orgDepartmentInsert/";
export const ADD_UTILITY_USER_DETAIL_URL = "utility/user/create";

export const GET_ALL_DEPARTMENT_URL = "orgdepartment_list";
export const DEPT_UPDATE_URL = "orgDepartmentUpdate/:department_id";
export const DEPARTMENT_DETAIL_BY_ID_URL = "dept_profileslugbydeptid/:id";
// export const ORG_DELETE_URL = 'organizationDelete/:org_id'
export const DEPT_DELETE_URL = "orgDepartmentDelete/:department_id";
export const ALL_USER_LIST_URL = "all_user_list";

export const UTILITY_USER_DETAIL_BY_USERID_URL = "utility_user/:id";
export const UTILITY_USER_UPDATE_URL = "utility_user_update/:id";
export const UTILITY_USER_DELETE_URL = "utility_user_delete/:userId";
export const GET_DEPARTMENT_LIST_URL = "get_department/:org";

// export const ADD_ORGANIZATION_CUSTOM_LABEL_URL = 'orgcustomlabelmaster/create'
// export const GET_ORGANIZATION_CUSTOM_LABEL_URL = 'all_label_list'
// export const UTILITY_ORGLABEL_DETAIL_BY_LABEL_URL = 'utility_org_customlabel/:id'
// export const UTILITY_ORGLABEL_UPDATE_URL = 'utility_org_customlabel_update/:id'

// export const ADD_NEW_ORG_APPLICATION_URL = 'applicationmaster_details/create'
// export const GET_ALL_APPLICATION_LIST_URL = 'all_application_list'
// export const GET_ALL_APPLICATION_LIST_BY_ORGID_URL = 'all_application_list_by_orgid'

// export const ORG_APPLICATION_DETAIL_BY_ID_URL = 'get_application_byid/:id'
// export const ORG_APPLICATION_UPDATE_URL = 'application_update/:application_id'
// export const ORG_APPLICATION_DELETE_URL = 'application_delete/:application_id'
// export const GET_APPLICATION_LIST_BY_ORGID_URL = 'get_application_by_orgid'

// export const ADD_NEW_SCREEN_URL = 'screenmaster/create'
// export const GET_ALL_SCREEN_LIST_URL = 'all_screen_list'
// export const ORG_SCREEN_DETAIL_BY_ID_URL = 'get_screen_byid/:id'
// export const ORG_SCREEN_UPDATE_URL = 'screen_update/:screen_id'
// export const GET_SCREEN_LIST_BY_APPID_URL = 'screen_list_by_appid'

// user

// Admin
export const ORGLABEL_DETAIL_BY_ORGID_URL = "orgcustomlabel_by_orgid/:orgid";
export const ADD_AVENUES_TABLE1_DETAILS_URL = "create/avenues_table1_details";

export const ORGLABEL_DETAIL_BY_SCREENID_URL =
  "utility_org_customlabel_by_screenid/:id";

//discussion board
export const ADDTOPIC_CREATE_URL = "topicmaster_create";
export const DISCUSSION_TOPIC_LIST_URL = "getalltopicmaster_list";
export const GET_TOPIC_BY_TOPICID_URL = "gettopicbyid/:id";
//delete topic in admin
export const ADMIN_TOPIC_DELETE_URL = "admintopic_delete/:topic_id";
export const UPDATE_TOPIC_BY_TOPICIDID_URL = "topic_update/:id";

export const ADD_TOPIC_COMMENT_CREATE_URL = "topiccomment_create";
export const GET_TOPIC_COMMENTS_LIST_BY_TOPICID_URL =
  "gettopiccomment_bytopicid";
export const ADMIN_COMMENT_DELETE_URL = "admincomment_delete/:comment_id";
export const UPDATE_TOPICCOMMENT_BY_COMMENTID_URL = "topic_comment_update/:id";
export const ADD_REPLY_ON_COMMENT_URL = "reply_on_comment";


// Project Task
export const PROJECT_TASK_CREATE_URL = "taskmasterInsert";
export const GET_PROJECT_TASK_LIST_URL = "getalltaskmaster_list";
export const UPDATE_TASK_BY_TASKID_URL = "taskmaster_update/:id";
export const PROJECT_TASK_DELETE_URL = "taskmaster_delete/:id";

// Project Task for intern
export const GET_PROJECT_TASK_LIST_FOR_INTERN_URL =
  "getinterntask_listbyproject";

// All other project task list
export const GET_ALLOTHER_PROJECT_TASK_LIST_URL =
  "getallOtherProjecttaskmaster_list";
export const ADD_ALLOTHERPROJECT_RESOURCE_CREATE_URL =
  "admin_project_resource_create";
export const ADMIN_UPDATE_ALLOTHER_PROJECT_DETAILS_URL =
  "admin_UpdateProject/:id/";

// export const STUDENT_LIST_INFO_URL = 'studentinfoById/:id'
// export const INTERN_LIST_INFO_FOR_FEEDBACKRESPONSE_URL = 'getInternForResponse/:id'
// export const INTERN_INSTANTFEEDBACK_URL = 'get_internInstantFeedback/:id'

// //worker
// export const WORKER_DETAIL_URL = 'worker/:id'
// export const UPDATE_WORKER_PROFILE_DETAIL_URL = 'worker/profile/:id/update'

//OrgEngage
export const GET_ALL_ORG_ENGAGE_CATEGORY_LIST_URL = "getallorgengage_list";
export const ADD_NEW_ORG_ENGAGE_CATEGORY_URL = "orgengagecategoryInsert";
export const ORG_ENGAGE_CATEGORY_ID_DETAIL_URL = "getorgengageById/:id";
export const UPDATE_ORG_ENGAGE_CATEGORY_LIST_URL =
  "orgengageUpdate/:Categoryid";
export const ORG_ENGAGE_DELETE_URL = "orgengageresource_delete/:Categoryid";
//OrgFeatures
export const GET_ALL_ORG_FEATURES_LIST_URL = "getallorgfeatures_list";
export const ADD_NEW_ORG_FEATURES_LIST_URL = "orgfeatures_create";
export const UPDATE_ORG_FEATURES_LIST_URL = "orgfeaturesUpdate/:org_id";
export const ORG_FEATURES_LIST_DETAIL_URL = "getorgfeaturesById/:id";
export const ORG_FEATURES_DELETE_URL = "orgfeaturesresource_delete/:Featuresid";
//BioQuestion
export const GET_ALL_BIO_QUESTIONS_LIST_URL = "getallbioquestion_list";
export const ADD_NEW_BIO_QUESTIONS_LIST_URL = "bioquestionInsert";
export const UPDATE_BIO_QUESTIONS_LIST_URL =
  "bioquestionUpdate/:Questionmasterid";
export const BIO_QUESTIONS_LIST_DETAIL_URL =
  "getbioquestionById/:Questionmasterid";
export const BIO_QUESTION_DELETE_URL =
  "bioquestionresource_delete/:Questionmasterid";

//user utility screen
export const ADMIN_USER_LIST_URL = "superadmin_user";
export const ADD_NEW_USERS_LIST_URL = "admin/user/create";
export const UPDATE_USER_DETAILS_URL = "userUpdate/:UserId";

//help center utility screen
export const ADD_NEW_HELPCENTER_DETAILS_URL = "helpcenter/create";
export const GET_USER_HELPCENTER_DETAILS_URL = "user/helpguide";
export const GET_ALL_HELPGUIDE_LIST_URL = "helpguide_list";

// help center log
export const GET_USER_HELPCENTER_LOG = "guidelog";

// Terms and condition
export const USER_TERMS_CONDITION_AGREE_URL = "usertermsconditions_agree";
// re-activated project from completed project tab for admin :
export const RE_ACTIVATE_PROJECT_BY_PROJECTID_URL =
  "reactivate_projectstatus/:id";
//  Topic Reacts(emoji)  
export const ADD_TOPIC_REACTS_URL =
  "topicreacts_insert";
 // reactions master list 
export const GET_MASTERREACTIONS_LIST_URL =
  "get_reactionsmaster_list";  
 // user topic reaction list 
export const GET_USER_TOPIC_REACTIONS_LIST_URL =
  "get_usertopic_reactions_list"; 
//  comment Reacts(emoji)  
export const ADD_COMMENT_REACTS_URL =
  "commentreacts_insert";  
// get completed project for manager  
export const MANAGER_COMPLETED_PROJECT_BOARD_URL = "manager/completedprojectboard";  
