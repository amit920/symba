import React, { Component, Suspense } from 'react';
import { Route, withRouter, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Loader from '../../static_pages/loader';
import AppLayout from '../../layout/AppLayout';

const Organization = React.lazy(() =>
  import(/* webpackChunkName: "dashboards" */ './organization')
);

const Department = React.lazy(() =>
  import(/* webpackChunkName: "dashboards" */ './department')
);

const Orgengage = React.lazy(() =>
  import(/* webpackChunkName: "dashboards" */ './orgengage')
);

const Orgfeatureslist = React.lazy(() =>
  import(/* webpackChunkName: "dashboards" */ './orgfeatureslist')
);

const Bioquestion = React.lazy(() =>
  import(/* webpackChunkName: "dashboards" */ './bioquestion')
);

const Users = React.lazy(() =>
  import(/* webpackChunkName: "dashboards" */ './users')
);
const HelpCenter = React.lazy(() =>
  import(/* webpackChunkName: "dashboards" */ './helpCenter')
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
                to={`${match.url}/organization`}
              />
                <Route
                path={`${match.url}/organization`}
                render={props => <Organization {...props} />}
                />

                <Route
                path={`${match.url}/department`}
                render={props => <Department {...props} />}
                />

                <Route
                path={`${match.url}/orgengage`}
                render={props => <Orgengage {...props} />}
                />

                <Route
                path={`${match.url}/orgfeatureslist`}
                render={props => <Orgfeatureslist {...props} />}
                />

                <Route
                path={`${match.url}/bioquestion`}
                render={props => <Bioquestion {...props} />}
                />

                <Route
                path={`${match.url}/users`}
                render={props => <Users {...props} />}
                />  
                <Route
                path={`${match.url}/symba`}
                render={props => <HelpCenter {...props} />}
                />                
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

export default withRouter(
  connect(
    mapStateToProps,
    {}
  )(App)
);
