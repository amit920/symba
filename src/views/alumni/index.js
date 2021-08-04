import React, { Component, Suspense } from "react";
import { Route, withRouter, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Loader from "../../static_pages/loader";
import AppLayout from "../../layout/AppLayout";

const Launchpad = React.lazy(() =>
  import(/* webpackChunkName: "dashboards" */ "./launchpad")
);
const Engage = React.lazy(() =>
  import(/* webpackChunkName: "dashboards" */ "./engage")
);
const Community = React.lazy(() =>
  import(/* webpackChunkName: "dashboards" */ "./community")
);

const Profile = React.lazy(() =>
  import(/* webpackChunkName: "dashboards" */ "./profile")
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
                to={`${match.url}/alumni`}
              />
              <Route
                path={`${match.url}/alumni`}
                render={(props) => <Launchpad {...props} />}
              />
              <Route
                path={`${match.url}/engage`}
                render={(props) => <Engage {...props} />}
              />
             <Route
                path={`${match.url}/community`}
                render={(props) => <Community {...props} />}
              />


              <Route
                path={`${match.url}/profile`}
                render={(props) => <Profile {...props} />}
              /> 
              
              <Redirect to="/error" />
            </Switch>
            <Loader />
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
