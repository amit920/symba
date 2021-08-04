import React, { Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";

const EngageList = React.lazy(() =>
  import(/* webpackChunkName: "dashboard-default" */ "./engageList")
);
const AddEngage = React.lazy(() =>
  import(/* webpackChunkName: "dashboard-default" */ "./addEngage")
);

const AddEngageVideoComments = React.lazy(() =>
  import(/* webpackChunkName: "dashboard-default" */ "./addEngageVideoComments")
);

const AddTopicComment = React.lazy(() =>
  import(/* webpackChunkName: "dashboard-default" */ "./addTopicComment")
);
const Engage = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/list`} />
      <Route
        path={`${match.url}/list`}
        render={(props) => <EngageList {...props} />}
      />
      <Route
        path={`${match.url}/add`}
        render={(props) => <AddEngage {...props} />}
      />
      <Route
        path={`${match.url}/comment/:engageVideoId/:engageCategoryId`}
        render={(props) => <AddEngageVideoComments {...props} />}
      />
      <Route
        path={`${match.url}/topic/comment/:id`}
        render={(props) => <AddTopicComment {...props} />}
      />
      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default Engage;
