import { combineReducers } from "redux";
import { reducer as toastrReducer } from "react-redux-toastr";

import userReducer from "./user_reducer";
import organizationReducer from "./organization_reducer";
import masterReducer from "./masterData_reducer";
import SupervisorReducer from "./supervisor_reducer";
import ProjectReducer from "./project_reducer";
import InternReducer from "./intern_reducer";
import LayoutReducer from "./layout_reducer";
import InternFeedbackReducer from "./internFeedback_reducer";
import OverviewReducer from "./orgOverview_reducer";
import OverviewResourceReducer from "./overviewResources_reducer";
import DepartmentReducer from "./department_reducer";
import EngageReducer from "./engage_reducer";

import OrgfeatureslistReducer from './orgfeatures_reducer'
import OrgengagecategoryReducer from './orgengagecategory_reducer'
import BioQuestionReducer from './bioquestion_reducers'
import HelpCenterReducer from './helpcenter_reducer'

import { reducer as formReducer } from "redux-form";

const RootReducer = combineReducers({
  toastr: toastrReducer,
  userReducer: userReducer,
  organizationReducer: organizationReducer,
  projectReducer: ProjectReducer,
  form: formReducer,
  masterReducer: masterReducer,
  supervisorReducer: SupervisorReducer,
  internReducer: InternReducer,
  layout: LayoutReducer,
  internFeedbackReducer: InternFeedbackReducer,
  overviewReducer: OverviewReducer,
  overviewResourceReducer: OverviewResourceReducer,
  departmentReducer: DepartmentReducer,
  engageReducer: EngageReducer,

  orgfeatureslistReducer:OrgfeatureslistReducer,
  orgengagecategoryReducer:OrgengagecategoryReducer,
  bioquestionReducer:BioQuestionReducer,
  helpCenterReducer:HelpCenterReducer
});

export default RootReducer;
