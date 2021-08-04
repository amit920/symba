import React, { Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";

const InternFeedback = React.lazy(() =>
  import(/* webpackChunkName: "dashboard-default" */ "./internFeedback")
);

const Feedback = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/view`} />
      <Route
        path={`${match.url}/view`}
        render={(props) => <InternFeedback {...props} />}
      />

      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default Feedback;
