import React, { Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";

const AdminProfile = React.lazy(() =>
  import(/* webpackChunkName: "dashboard-default" */ "./adminProfile")
);
const AdminResetPassword = React.lazy(() =>
  import(/* webpackChunkName: "dashboard-default" */ "./adminResetPassword")
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
        render={(props) => <AdminProfile {...props} />}
      />
      <Route
        path={`${match.url}/reset-password`}
        render={(props) => <AdminResetPassword {...props} />}
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
