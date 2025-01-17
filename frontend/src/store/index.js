import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';
const middlewares = [];

const store = configureStore({
  reducer: rootReducer(), 
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    immutableCheck: true,
    serializableCheck: false,
  }).concat(middlewares),
});

store.asyncReducers = {};

export const injectReducer = (key, reducer) => {
  if (store.asyncReducers[key]) {
    return false;
  }
  store.asyncReducers[key] = reducer; 
  store.replaceReducer(rootReducer(store.asyncReducers));
  return store;
};

export default store;
