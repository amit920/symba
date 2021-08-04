import React, { Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";


const AdminProjectList = React.lazy(() =>
  import(/* webpackChunkName: "dashboard-default" */ "./adminProjectList")
);
const AdminProject = React.lazy(() =>
  import(/* webpackChunkName: "dashboard-default" */ "./adminProject")
);
const ViewAllProject = React.lazy(() =>
  import(/* webpackChunkName: "dashboard-default" */ "./viewAllProject")
);
const CompleteAdminProject = React.lazy(() =>
  import(/* webpackChunkName: "dashboard-default" */ "./completeAdminProject")
);
const Project = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>

    <Switch >
      <Redirect exact from={`${match.url}/`} to={`${match.url}/list`} />
      <Route
        path={`${match.url}/list`}
        render={(props) => <AdminProjectList {...props} />}
      />
      <Route
        path={`${match.url}/edit/:id`}
        render={(props) => <AdminProject {...props} />}
      />
      <Route
        path={`${match.url}/view/:id`}
        render={(props) => <ViewAllProject {...props} />}
      />
     <Route
        path={`${match.url}/complete/view/:id`}
        render={(props) => <CompleteAdminProject {...props} />}
      />
      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default Project;
