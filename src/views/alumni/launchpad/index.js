import React, { Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";

const AlumniLaunchpad = React.lazy(() =>
  import(/* webpackChunkName: "dashboard-default" */ "./alumniLaunchpad")
);


const Launchpad = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/launchpad`} />
      <Route
        path={`${match.url}/launchpad`}
        render={(props) => <AlumniLaunchpad {...props} />}
      />

      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default Launchpad;
