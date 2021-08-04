import React, { Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";

const AdminDashboard = React.lazy(() =>
  import(/* webpackChunkName: "dashboard-default" */ "./adminDashboard")
);



const Dashboard = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/admin`} />
      <Route
        path={`${match.url}/admin`}
        render={(props) => <AdminDashboard {...props} />}
      />


      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default Dashboard;
