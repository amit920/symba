import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const UsersList = React.lazy(() =>
  import(/* webpackChunkName: "dashboard-default" */ './usersList')
);


const USERS = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/view`} />
      <Route
        path={`${match.url}/view`}
        render={props => <UsersList {...props} />}
      />
     
      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default USERS;
