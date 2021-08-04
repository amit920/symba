import React, { Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";

const InternCommunityList = React.lazy(() =>
  import(/* webpackChunkName: "dashboard-default" */ "./internCommunityList")
);
const ViewUserProfile = React.lazy(() =>
  import(/* webpackChunkName: "dashboard-default" */ "./viewUserProfile")
);

const Community = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/view`} />
      <Route
        path={`${match.url}/view`}
        render={(props) => <InternCommunityList {...props} />}
      />
      <Route
        path={`${match.url}/profile/:id/:usertypeid`}
        render={(props) => <ViewUserProfile {...props} />}
      />
      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default Community;
