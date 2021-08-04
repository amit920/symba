import React, { Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";

const HelpView = React.lazy(() =>
  import(/* webpackChunkName: "dashboard-default" */ "./help")
);
const HelpGuideOptionForm = React.lazy(() =>
  import(/* webpackChunkName: "dashboard-default" */ "./helpGuideOptionForm")
);
const HelpGuideDetailsForm = React.lazy(() =>
  import(/* webpackChunkName: "dashboard-default" */ "./helpGuideDetailsForm")
);
const Help = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/help`} />
      <Route
        path={`${match.url}/help`}
        render={(props) => <HelpView {...props} />}
      />
      <Route
        path={`${match.url}/help-center/option`}
        render={(props) => <HelpGuideOptionForm {...props} />}
      />
      <Route
        path={`${match.url}/help-center/guide/:usertype/:features`}
        render={(props) => <HelpGuideDetailsForm {...props} />}
      />
      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default Help;
