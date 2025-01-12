import { combineReducers } from 'redux';
import auth from './slices/authSlice';
import userTeam from './slices/teamSlice';
import transfer from './slices/transferSlice';

const rootReducer = (asyncReducers = {}) => (state, action) => {
  const combinedReducer = combineReducers({
    auth,
    transfer,
    userTeam,
    ...asyncReducers
  });
  return combinedReducer(state, action);
};

export default rootReducer;
