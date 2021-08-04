import React, { Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";

const CommunityList = React.lazy(() =>
  import(/* webpackChunkName: "dashboard-default" */ "./communityList")
);

const ViewAllUserProfile = React.lazy(() =>
  import(/* webpackChunkName: "dashboard-default" */ "./viewAllUserProfile")
);

const Community = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/intern`} />
      <Route
        path={`${match.url}/intern`}
        render={(props) => <CommunityList {...props} />}
      />
      <Route
        path={`${match.url}/view/:id/:usertypeid`}
        render={(props) => <ViewAllUserProfile {...props} />}
      />

      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default Community;
