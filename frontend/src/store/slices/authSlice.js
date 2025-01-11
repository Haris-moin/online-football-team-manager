import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RESET_SLICE } from '../actions/resetSlice';
import { getValueFromLocalStorage, setValuesToLocalStorage } from '../../utils/utils';
import { AUTH_TOKEN } from '../../constants/constants';
import UserService from '../../services/authServices';

export const initialState = {
  loading: false,
  message: '',
  showMessage: false,
  redirect: '',
  status: '',
  token: getValueFromLocalStorage(AUTH_TOKEN),
};

export const authenticateUser = createAsyncThunk('auth/user', async (data, { rejectWithValue }) => {
  try {
    const response = await UserService.userAuth(data);
    const { token } = response;
    setValuesToLocalStorage(AUTH_TOKEN, token);
    return { token };
  } catch (err) {
    return rejectWithValue(err?.response?.data?.message || 'Error');
  }
});

export const signOut = createAsyncThunk('auth/logout', async (data) => {
  UserService.logout();
  return { data };
});


export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authenticated: (state, action) => ({
      ...state, loading: false, redirect: '/', token: action.payload
    }),
    showAuthMessage: (state, action) => ({
      ...state, message: action.payload, showMessage: true, loading: false
    }),
    hideAuthMessage: (state) => ({
      ...state, message: '', showMessage: false, status: ''
    }),
    signOutSuccess: (state, { payload }) => ({
      ...state, loading: false, token: null, showMessage: !!payload, message: payload, user: null
    }),
    showLoading: (state) => ({ ...state, loading: true }),
    signInSuccess: (state, action) => ({ ...state, loading: false, token: action.payload }),
    updateRedirectURL: (state, action) => ({
      ...state, redirect: action.payload
    })
  },
  extraReducers: (builder) => {
    builder
      .addCase(RESET_SLICE, () => ({
        ...initialState,
        token: null,
        redirect: "/auth",
      })) // call on logout
      .addCase(authenticateUser.pending, (state) => {
        return { ...state, loading: true };
      })
      .addCase(authenticateUser.fulfilled, (state, action) => {
        const { token } = action.payload;
        return {
          ...state,
          loading: false,
          token,
          redirect:'app/my-team'
        };
      })
      .addCase(authenticateUser.rejected, (state, action) => {
        return {
          ...state,
          message: action.payload,
          showMessage: true,
          loading: false,
        };
      })
      .addCase(signOut.fulfilled, (state) => ({
        ...state,
        loading: false,
        token: null,
        redirect: "/auth",
      }))
      .addCase(signOut.rejected, (state) => ({
        ...state,
        loading: false,
        token: null,
        redirect: "/auth",
      }));
  }
});

export const {
  authenticated,
  showAuthMessage,
  hideAuthMessage,
  signOutSuccess,
  showLoading,
  signInSuccess,
  updateRedirectURL
} = authSlice.actions;

export default authSlice.reducer;