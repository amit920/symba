import React, { Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";

const InternProjectList = React.lazy(() =>
  import(/* webpackChunkName: "dashboard-default" */ "./internProjectList")
);
const InterProjectSubmission = React.lazy(() =>
  import(/* webpackChunkName: "dashboard-default" */ "./interProjectSubmission")
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
        render={(props) => <InternProjectList {...props} />}
      />
      <Route
        path={`${match.url}/projectsubmission/:id`}
        render={(props) => <InterProjectSubmission {...props} />}
      />
      {/* <Route
        path={`${match.url}/edit/:id`}
        render={props => <ProjectForm {...props} />}
      /> */}
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
