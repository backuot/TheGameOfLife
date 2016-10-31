import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';
const nextRootReducer = require('../reducers');

export default function configureStore(initialState) {
  const logger = createLogger();
  const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(thunk, logger));
  store.asyncReducers = {};

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}
