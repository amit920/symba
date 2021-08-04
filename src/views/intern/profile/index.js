import React, { Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";

// const AddEditInternProfile = React.lazy(() =>
//   import(/* webpackChunkName: "dashboard-default" */ "./addEditInternProfile")
// );
const InternProfile = React.lazy(() =>
  import(/* webpackChunkName: "dashboard-default" */ "./internProfile")
);
const InternResetPassword = React.lazy(() =>
  import(/* webpackChunkName: "dashboard-default" */ "./internResetPassword")
);
const EditProfileForm = React.lazy(() =>
  import(/* webpackChunkName: "dashboard-default" */ "./editProfileForm")
);

const Profile = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/view`} />
      {/* <Route
        path={`${match.url}/view`}
        render={(props) => <AddEditInternProfile {...props} />}
      /> */}
      <Route
        path={`${match.url}/view`}
        render={(props) => <InternProfile {...props} />}
      />
      <Route
        path={`${match.url}/reset-password`}
        render={(props) => <InternResetPassword {...props} />}
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
