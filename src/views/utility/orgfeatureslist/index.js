import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const OrgfeaturesList = React.lazy(() =>
  import(/* webpackChunkName: "dashboard-default" */ './orgfeaturesList')
);


const ORGFEATURESLIST = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/view`} />
      <Route
        path={`${match.url}/view`}
        render={props => <OrgfeaturesList {...props} />}
      />
     
      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default ORGFEATURESLIST;
