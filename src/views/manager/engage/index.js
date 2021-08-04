import React, { Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";

const ManagerEngageList = React.lazy(() =>
  import(/* webpackChunkName: "dashboard-default" */ "./managerEngageList")
);
// const AddEngage = React.lazy(() =>
//   import(/* webpackChunkName: "dashboard-default" */ "./addEngage")
// );

const AddManagerEngageVideoComments = React.lazy(() =>
  import(/* webpackChunkName: "dashboard-default" */ "./addManagerEngageVideoComments")
);

const AddManagerTopicComment = React.lazy(() =>
  import(/* webpackChunkName: "dashboard-default" */ "./addManagerTopicComment")
);
const Engage = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/list`} />
      <Route
        path={`${match.url}/list`}
        render={(props) => <ManagerEngageList {...props} />}
      />
      {/* <Route
        path={`${match.url}/add`}
        render={(props) => <AddEngage {...props} />}
      />
      <Route
        path={`${match.url}/comment/:engageVideoId`}
        render={(props) => <AddManagerEngageVideoComments {...props} />}
      /> */}
        <Route
        path={`${match.url}/comment/:engageVideoId/:engageCategoryId`}
        render={(props) => <AddManagerEngageVideoComments {...props} />}
      />
      <Route
        path={`${match.url}/topic/comment/:id`}
        render={(props) => <AddManagerTopicComment {...props} />}
      />
      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default Engage;
