import React, { Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";

const ManagerProfile = React.lazy(() =>
  import(/* webpackChunkName: "dashboard-default" */ "./managerProfile")
);
const ManagerResetPassword = React.lazy(() =>
  import(/* webpackChunkName: "dashboard-default" */ "./managerResetPassword")
);
const EditProfileForm = React.lazy(() =>
  import(/* webpackChunkName: "dashboard-default" */ "./editProfileForm")
);

const Profile = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/view`} />
      <Route
        path={`${match.url}/view`}
        render={(props) => <ManagerProfile {...props} />}
      />
      <Route
        path={`${match.url}/reset-password`}
        render={(props) => <ManagerResetPassword {...props} />}
      />
      <Route
        path={`${match.url}/edit`}
        render={(props) => <EditProfileForm {...props} />}
      />
      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default Profile;
