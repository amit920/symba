import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const AddDepartment = React.lazy(() =>
  import(/* webpackChunkName: "dashboard-default" */ './addDepartment')
);


const DEPARTMENT = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/view`} />
      <Route
        path={`${match.url}/view`}
        render={props => <AddDepartment {...props} />}
      />
     
      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default DEPARTMENT;
