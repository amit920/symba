import React, { Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";

const AlumniEngageList = React.lazy(() =>
  import(/* webpackChunkName: "dashboard-default" */ "./alumniEngageList")
);
const AddAlumniEngageVideoComments = React.lazy(() =>
  import(
    /* webpackChunkName: "dashboard-default" */ "./addAlumniEngageVideoComments"
  )
);
const AddAlumniTopicComment = React.lazy(() =>
  import(/* webpackChunkName: "dashboard-default" */ "./addAlumniTopicComment")
);

const Engage = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/view`} />
      <Route
        path={`${match.url}/view`}
        render={(props) => <AlumniEngageList {...props} />}
      />
    <Route
        // path={`${match.url}/comment/:engageVideoId`}
        path={`${match.url}/comment/:engageVideoId/:engageCategoryId`}
        render={(props) => <AddAlumniEngageVideoComments {...props} />}
      />
        <Route
        path={`${match.url}/topic/comment/:id`}
        render={(props) => <AddAlumniTopicComment {...props} />}
      />
      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default Engage;
