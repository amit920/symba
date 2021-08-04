import React, { Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";

const ProjectList = React.lazy(() =>
  import(/* webpackChunkName: "dashboard-default" */ "./projectList")
);
const ProjectForm = React.lazy(() =>
  import(/* webpackChunkName: "dashboard-default" */ "./project")
);

// const AddEngageVideoComments = React.lazy(() =>
//   import(/* webpackChunkName: "dashboard-default" */ './addEngageVideoComments')
// );

const Project = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/list`} />
      <Route
        path={`${match.url}/list`}
        render={(props) => <ProjectList {...props} />}
      />
      <Route
        path={`${match.url}/edit/:id`}
        render={(props) => <ProjectForm {...props} />}
      />
      {/* <Route
        path={`${match.url}/add`}
        render={props => <AddEngage {...props} />}
      />
      <Route
        path={`${match.url}/comment/:engageVideoId`}
        render={props => <AddEngageVideoComments {...props} />}
      /> */}
      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default Project;
