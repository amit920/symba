import React, { Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";

// const AddEditAlumniProfile = React.lazy(() =>
//   import(/* webpackChunkName: "dashboard-default" */ "./addEditAlumniProfile")
// );
const AlumniProfile = React.lazy(() =>
  import(/* webpackChunkName: "dashboard-default" */ "./alumniProfile")
);
const AlumniResetPassword = React.lazy(() =>
  import(/* webpackChunkName: "dashboard-default" */ "./alumniResetPassword")
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
        render={(props) => <AddEditAlumniProfile {...props} />}
      /> */}
      <Route
        path={`${match.url}/view`}
        render={(props) => <AlumniProfile {...props} />}
      />
      <Route
        path={`${match.url}/reset-password`}
        render={(props) => <AlumniResetPassword {...props} />}
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
