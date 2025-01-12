import { combineReducers } from 'redux';
import authReducer from './slices/authSlice';
import transferReducer from './slices/transferSlice';
import userTeamReducer from './slices/teamSlice';

const rootReducer = () => (state, action) => {
  const combinedReducer = combineReducers({
    auth: authReducer,
    transfer: transferReducer,
    userTeam: userTeamReducer,
  });
  return combinedReducer(state, action);
};

export default rootReducer;
