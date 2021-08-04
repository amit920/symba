import React, { Component, Suspense } from "react";
import { Route, withRouter, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import AppLayout from "../../layout/AppLayout";

const Dashboard = React.lazy(() =>
  import(/* webpackChunkName: "dashboards" */ "./dashboard")
);
const Launchpad = React.lazy(() =>
  import(/* webpackChunkName: "dashboards" */ "./launchpad")
);

const Community = React.lazy(() =>
  import(/* webpackChunkName: "dashboards" */ "./community")
);

const Engage = React.lazy(() =>
  import(/* webpackChunkName: "dashboards" */ "./engage")
);

const Profile = React.lazy(() =>
  import(/* webpackChunkName: "dashboards" */ "./profile")
);
const Project = React.lazy(() =>
  import(/* webpackChunkName: "dashboards" */ "./project")
);

const Help = React.lazy(() =>
  import(/* webpackChunkName: "dashboards" */ "./help")
);

const BlankPage = React.lazy(() =>
  import(/* webpackChunkName: "blank-page" */ "./blank-page")
);

class App extends Component {
  render() {
    const { match } = this.props;

    return (
      <AppLayout>
        <div className="dashboard-wrapper">
          <Suspense fallback={<div className="loading" />}>
            <Switch>
              <Redirect
                exact
                from={`${match.url}/`}
                to={`${match.url}/admin`}
              />
              <Route
                path={`${match.url}/dashboard`}
                render={(props) => <Dashboard {...props} />}
              />
              <Route
                path={`${match.url}/admin`}
                render={(props) => <Launchpad {...props} />}
              />
              <Route
                path={`${match.url}/community`}
                render={(props) => <Community {...props} />}
              />
              <Route
                path={`${match.url}/engage`}
                render={(props) => <Engage {...props} />}
              />
              <Route
                path={`${match.url}/profile`}
                render={(props) => <Profile {...props} />}
              />
              <Route
                path={`${match.url}/project`}
                render={(props) => <Project {...props} />}
              />
              <Route
                path={`${match.url}/symba`}
                render={(props) => <Help {...props} />}
              />

              <Route
                path={`${match.url}/blank-page`}
                render={(props) => <BlankPage {...props} />}
              />
              <Redirect to="/error" />
            </Switch>
          </Suspense>
        </div>
      </AppLayout>
    );
  }
}
const mapStateToProps = ({ menu }) => {
  const { containerClassnames } = 1;
  return { containerClassnames };
};

export default withRouter(connect(mapStateToProps, {})(App));
