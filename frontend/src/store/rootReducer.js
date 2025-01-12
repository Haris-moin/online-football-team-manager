import { combineReducers } from 'redux';
import auth from './slices/authSlice';
import  userTeam from './slices/teamSlice';
 
const rootReducer = (asyncReducers) => (state, action) => {
  const combinedReducer = combineReducers({
    auth,
    userTeam,
    ...asyncReducers
  });
  return combinedReducer(state, action);
};
 
export default rootReducer;