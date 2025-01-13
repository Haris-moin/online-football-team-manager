import { combineReducers } from 'redux';
import authReducer from './slices/authSlice';
import transferReducer from './slices/transferSlice';
import userTeamReducer from './slices/teamSlice';

const rootReducer = (asyncReducers = {}) => (state, action) => {
  const combinedReducer = combineReducers({
    auth: authReducer,
    transfer: transferReducer,
    userTeam: userTeamReducer,
    ...asyncReducers,
  });
  return combinedReducer(state, action);
};

export default rootReducer;
