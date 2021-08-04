import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const OrgengageList = React.lazy(() =>
  import(/* webpackChunkName: "dashboard-default" */ './orgengageList')
);


const ORGENGAGELIST = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/view`} />
      <Route
        path={`${match.url}/view`}
        render={props => <OrgengageList {...props} />}
      />
     
      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default ORGENGAGELIST;
