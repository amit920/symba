import { createStore, applyMiddleware, compose } from 'redux';
//import createSagaMiddleware from "redux-saga";
import RootReducer from '../reducers/root_reducer';
// import sagas from "./sagas";
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
//const sagaMiddleware = createSagaMiddleware();
//const middlewares = [sagaMiddleware];

export function configureStore(initialState) {

    const store = createStore(
        RootReducer,
        initialState,
        compose(applyMiddleware(thunk,
            createLogger({
              collapsed: true,
              duration: true,
              timestamp: false,
            }),))
    );

    // sagaMiddleware.run(sagas);

    if (module.hot) {
        module.hot.accept('../reducers/root_reducer', () => {
            const nextRootReducer = require('../reducers/root_reducer');
            store.replaceReducer(nextRootReducer);
        });
    }

    return store;
}
