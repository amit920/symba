import React, { Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";

const ManagerCommunityList = React.lazy(() =>
  import(/* webpackChunkName: "dashboard-default" */ "./managerCommunityList")
);
const UserProfileView = React.lazy(() =>
  import(/* webpackChunkName: "dashboard-default" */ "./userProfileView")
);

const Community = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/view`} />
      <Route
        path={`${match.url}/view`}
        render={(props) => <ManagerCommunityList {...props} />}
      />
      <Route
        path={`${match.url}/profile/:id/:usertypeid`}
        render={(props) => <UserProfileView {...props} />}
      />
      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default Community;
