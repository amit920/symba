import React, { Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";

const AdminLaunchpad = React.lazy(() =>
  import(/* webpackChunkName: "dashboard-default" */ "./adminLaunchpad")
);
const AddLaunchpad = React.lazy(() =>
  import(/* webpackChunkName: "dashboard-default" */ "./addLaunchpad")
);
// const ContentDefault = React.lazy(() =>
//   import(/* webpackChunkName: "dashboard-content" */ './content')
// );
// const AnalyticsDefault = React.lazy(() =>
//   import(/* webpackChunkName: "dashboard-analytics" */ './analytics')
// );
// const EcommerceDefault = React.lazy(() =>
//   import(/* webpackChunkName: "dashboard-ecommerce" */ './ecommerce')
// );

const Launchpad = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/launchpad`} />
      <Route
        path={`${match.url}/launchpad`}
        render={(props) => <AdminLaunchpad {...props} />}
      />
      <Route
        path={`${match.url}/edit/:id/:name`}
        render={(props) => <AddLaunchpad {...props} />}
      />
      {/* <Route
        path={`${match.url}/content`}
        render={props => <ContentDefault {...props} />}
      />
      <Route
        path={`${match.url}/ecommerce`}
        render={props => <EcommerceDefault {...props} />}
      />
      <Route
        path={`${match.url}/analytics`}
        render={props => <AnalyticsDefault {...props} />}
      /> */}
      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default Launchpad;
