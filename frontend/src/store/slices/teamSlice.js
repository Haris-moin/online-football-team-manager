import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import TeamService from '../../services/teamService';

export const initialState = {
  loading: false,
  message: '',
  showMessage: false,
  team:{}
};

export const getUserTeam = createAsyncThunk('user/team', async (data, { rejectWithValue }) => {
  try {
    const response = await TeamService.getTeam();
    return response;
  } catch (err) {
    return rejectWithValue(err?.response?.data?.message || 'Error');
  }
});


export const userTeamSlice = createSlice({
  name: 'userTeam',
  initialState,
  reducers: { 
    showLoading: (state) => ({ ...state, loading: true }),
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserTeam.pending, (state) => {
        return { ...state, loading: true };
      })
      .addCase(getUserTeam.fulfilled, (state, action) => {
        const payload = action.payload;
        return {
          ...state,
          loading: false,
          team: payload?.team
        };
      })
      .addCase(getUserTeam.rejected, (state, action) => {
        return {
          ...state,
          message: action.payload,
          showMessage: true,
          loading: false,
        };
      })
  }
});

export const {
  showLoading,
} = userTeamSlice.actions;

export default userTeamSlice.reducer;