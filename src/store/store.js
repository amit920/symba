import { createStore, applyMiddleware } from "redux";
import RootReducer from "../reducers/root_reducer";
import thunk from "redux-thunk";
import { createLogger } from "redux-logger";
import { composeWithDevTools } from "redux-devtools-extension";

const configureStore = (preloadedState = {}) =>
  createStore(
    RootReducer,
    preloadedState,
    composeWithDevTools(
      applyMiddleware(
        thunk,
        createLogger({
          collapsed: true,
          duration: true,
          timestamp: false,
        })
      )
    )
  );

export default configureStore;
