import React, { Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";

const InternEngageList = React.lazy(() =>
  import(/* webpackChunkName: "dashboard-default" */ "./internEngageList")
);
const AddInternEngageVideoComments = React.lazy(() =>
  import(
    /* webpackChunkName: "dashboard-default" */ "./addInternEngageVideoComments"
  )
);
const AddInternTopicComment = React.lazy(() =>
  import(/* webpackChunkName: "dashboard-default" */ "./addInternTopicComment")
);

const Engage = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/view`} />
      <Route
        path={`${match.url}/view`}
        render={(props) => <InternEngageList {...props} />}
      />
      <Route
        path={`${match.url}/comment/:engageVideoId/:engageCategoryId`}
        render={(props) => <AddInternEngageVideoComments {...props} />}
      />
      <Route
        path={`${match.url}/topic/comment/:id`}
        render={(props) => <AddInternTopicComment {...props} />}
      />
      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default Engage;
