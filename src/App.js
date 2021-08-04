import React, { Component, Suspense } from "react";
import { connect } from "react-redux";
import * as constants from "./utils/constants";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { IntlProvider } from "react-intl";
import "./helpers/Firebase";
//import AppLocale from "./lang";
import ColorSwitcher from "./components/common/ColorSwitcher";
import NotificationContainer from "./components/common/react-notifications/NotificationContainer";
import { isMultiColorActive } from "./constants/defaultValues";
import { getDirection } from "./helpers/Utils";
import Loader from "../src/static_pages/loader";
import requireAuth from '../src/utils/requireAuth';
import {Storytime} from '@papercups-io/storytime';
/* eslint-disable */
const ViewMain = React.lazy(() =>
  import(/* webpackChunkName: "views" */ "./views")
);
const ViewApp = React.lazy(() =>
  import(/* webpackChunkName: "views-app" */ "./views/app")
);
const InternApp = React.lazy(() =>
  import(/* webpackChunkName: "views-app" */ "./views/intern")
);
const ManagerApp = React.lazy(() =>
  import(/* webpackChunkName: "views-app" */ "./views/manager")
);
const AlumniApp = React.lazy(() =>
  import(/* webpackChunkName: "views-app" */ "./views/alumni")
);
const Administration = React.lazy(() =>
  import(/* webpackChunkName: "views-user" */ "./views/utility")
);
const ViewError = React.lazy(() =>
  import(/* webpackChunkName: "views-error" */ "./views/error")
);
const Login = React.lazy(() =>
  import(/* webpackChunkName: "views-user" */ "./views/user/login")
);
const ForgotPassword = React.lazy(() =>
  import(/* webpackChunkName: "views-user" */ "./views/user/forgot-password")
);

const JWTAccessHandler = React.lazy(() =>
  import(/* webpackChunkName: "views-user" */ "./views/access/jwt")
);

// static page
const ResponseFeedback = React.lazy(() =>
  import(
    /* webpackChunkName: "views-user" */ "./views/intern/feedback/responseFeedback"
  )
);
const Thankyou = React.lazy(() =>
  import(
    /* webpackChunkName: "views-user" */ "./views/intern/feedback/thankyou"
  )
);
const UnauthorizedError = React.lazy(() =>
  import(/* webpackChunkName: "views-error" */ "./views/unauthorizedError")
);
const UnauthorizedPage = React.lazy(() =>
  import(/* webpackChunkName: "views-error" */ "./views/unauthorizedPage")
);
const TermConditionsPage = React.lazy(() =>
  import(/* webpackChunkName: "views-error" */ "./views/termConditionsPage")
);
// const AuthRoute = ({ component: Component, authUser, ...rest }) => {
//   return (

//     <Route
//       {...rest}
//       render={props =>
//         authUser || isDemo ? (
//           <Component {...props} />
//         ) : (
//           <Redirect
//             to={{
//               pathname: '/user/login',
//               state: { from: props.location }
//             }}
//           />
//         )
//       }
//     />
//   );
// }

class App extends Component {
  constructor(props) {
    super(props);
    const direction = getDirection();
    if (direction.isRtl) {
      document.body.classList.add("rtl");
      document.body.classList.remove("ltr");
    } else {
      document.body.classList.add("ltr");
      document.body.classList.remove("rtl");
    }
  }

  render() {
    // const { locale, login } = this.props;
    // const currentAppLocale = AppLocale[locale];
    if (this.props.currentUser) {
      var orgid=this.props.currentUser.organization.id
      var email= this.props.currentUser.Email
      const st = Storytime.init({
        accountId: "e09d8a48-fb81-4413-bbbc-c032288f6e33",
        customer: {
          name:
            this.props.currentUser.FirstName +
            " " +
            this.props.currentUser.LastName +
            " (" +
            this.props.currentUser.Email +
            ")",
          email: this.props.currentUser.Email,
          external_id: this.props.currentUser.UserId,
        },
        baseUrl: "https://app.papercups.io",
      });
      // churnzero (track user login)
      ChurnZero.push(['setAppKey', constants.CHURNZERO_APPLICATION_KEY]);
      ChurnZero.push(['setContact',orgid ,email ]);
      ChurnZero.push(['trackEvent', 'login' ]);
    }
    return (
      <div className="h-100">
        <IntlProvider>
          <React.Fragment>
            <NotificationContainer />
            {isMultiColorActive && <ColorSwitcher />}
            <Suspense fallback={<div className="loading" />}>
              <Router>
                <Switch>
                  <Route path="/app"  component={requireAuth(ViewApp, ['organization'])}  />
                  <Route path="/internapp" component={requireAuth(InternApp, ['intern'])}  />
                  <Route
                    path="/access/jwt"
                    render={(props) => <JWTAccessHandler {...props} />}
                  />
                  <Route path="/administrationapp" component={Administration} />
                  <Route path="/managerapp" component={requireAuth(ManagerApp, ['manager'])}   />
                  <Route path="/alumniapp" component={requireAuth(AlumniApp, ['alumni'])}   />

                  <Route
                    path="/user"
                    render={(props) => <Login {...props} />}
                  />
                  <Route
                    path="/forgot-password"
                    render={(props) => <ForgotPassword {...props} />}
                  />

                  <Route
                    path="/error"
                    exact
                    render={(props) => <ViewError {...props} />}
                  />
                  <Route
                    path="/responsefeedback/:id/:managerMail/:projectTitle/:org/:requestFeedback_id/:usertype_id"
                    render={(props) => <ResponseFeedback {...props} />}
                  />
                  <Route
                    path="/ThankYou"
                    render={(props) => <Thankyou {...props} />}
                  />
                  <Route
                    path="/"
                    exact
                    render={(props) => <ViewMain {...props} />}
                  />
                  <Route
                    path="/unauthorized"
                    exact
                    render={(props) => <UnauthorizedError {...props} />}
                  />
                  <Route
                    path="/unauthorizedpage"
                    exact
                    render={(props) => <UnauthorizedPage {...props} />}
                  />
                  <Route
                    path="/termsandconditions"
                    exact
                    render={(props) => <TermConditionsPage {...props} />}
                  />
                  <Redirect to="/error" />
                </Switch>
              </Router>
              <Loader />
            </Suspense>
          </React.Fragment>
        </IntlProvider>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.userReducer.currentUser,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    // addlaunchpadoverview: (values, errorCallback) => {
    //   dispatch(addlaunchpadoverview(values, errorCallback));
    // },
    dispatch: dispatch,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);