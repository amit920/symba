import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const BioQuestionList = React.lazy(() =>
  import(/* webpackChunkName: "dashboard-default" */ './bioQuestionList')
);


const BIOQUESTION = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/view`} />
      <Route
        path={`${match.url}/view`}
        render={props => <BioQuestionList {...props} />}
      />
     
      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default BIOQUESTION;
