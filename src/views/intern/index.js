import React, { Component, Suspense } from "react";
import { Route, withRouter, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Loader from "../../static_pages/loader";
import AppLayout from "../../layout/AppLayout";

const Launchpad = React.lazy(() =>
  import(/* webpackChunkName: "dashboards" */ "./launchpad")
);
const Feedback = React.lazy(() =>
  import(/* webpackChunkName: "dashboards" */ "./feedback")
);
const Community = React.lazy(() =>
  import(/* webpackChunkName: "dashboards" */ "./community")
);

const Engage = React.lazy(() =>
  import(/* webpackChunkName: "dashboards" */ "./engage")
);
const Project = React.lazy(() =>
  import(/* webpackChunkName: "dashboards" */ "./project")
);
const Help = React.lazy(() =>
  import(/* webpackChunkName: "dashboards" */ "./help")
);
const Profile = React.lazy(() =>
  import(/* webpackChunkName: "dashboards" */ "./profile")
);
// const Dashboards = React.lazy(() =>
//   import(/* webpackChunkName: "dashboards" */ './dashboards')
// );
// const Pages = React.lazy(() =>
//   import(/* webpackChunkName: "pages" */ './pages')
// );
// const Applications = React.lazy(() =>
//   import(/* webpackChunkName: "applications" */ './applications')
// );
// const Ui = React.lazy(() => import(/* webpackChunkName: "ui" */ './ui'));
// const Menu = React.lazy(() => import(/* webpackChunkName: "menu" */ './menu'));
// const BlankPage = React.lazy(() =>
//   import(/* webpackChunkName: "blank-page" */ './blank-page')
// );

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
                to={`${match.url}/intern`}
              />
              <Route
                path={`${match.url}/intern`}
                render={(props) => <Launchpad {...props} />}
              />
              <Route
                path={`${match.url}/feedback`}
                render={(props) => <Feedback {...props} />}
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
                path={`${match.url}/project`}
                render={(props) => <Project {...props} />}
              />
              <Route
                path={`${match.url}/symba`}
                render={(props) => <Help {...props} />}
              />
              <Route
                path={`${match.url}/profile`}
                render={(props) => <Profile {...props} />}
              />
              {/* 
               
              <Route
                path={`${match.url}/dashboards`}
                render={props => <Dashboards {...props} />}
              />
              <Route
                path={`${match.url}/applications`}
                render={props => <Applications {...props} />}
              />
              <Route
                path={`${match.url}/pages`}
                render={props => <Pages {...props} />}
              />
              <Route
                path={`${match.url}/ui`}
                render={props => <Ui {...props} />}
              />
              <Route
                path={`${match.url}/menu`}
                render={props => <Menu {...props} />}
              />
              <Route
                path={`${match.url}/blank-page`}
                render={props => <BlankPage {...props} />}
              />
              <Redirect to="/error" /> */}
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
