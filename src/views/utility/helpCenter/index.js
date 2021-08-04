import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const HelpGuideList = React.lazy(() =>
  import(/* webpackChunkName: "dashboard-default" */ './helpGuideList')
);


const Help = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/help-center`} />
      <Route
        path={`${match.url}/help-center`}
        render={props => <HelpGuideList {...props} />}
      />
     
      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default Help;
