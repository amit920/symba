import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const AddOrganization = React.lazy(() =>
  import(/* webpackChunkName: "dashboard-default" */ './addOrganization')
);


const ORGANIZATION = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/view`} />
      <Route
        path={`${match.url}/view`}
        render={props => <AddOrganization {...props} />}
      />
     
      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default ORGANIZATION;
