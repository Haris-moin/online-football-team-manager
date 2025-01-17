import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import TeamService from '../../services/teamService';
import { STATUS } from '../../constants/constants';

export const initialState = {
  loading: false,
  message: '',
  status: '',
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
          team: payload?.team,
          status:STATUS.SUCCESS
        };
      })
      .addCase(getUserTeam.rejected, (state, action) => {
        return {
          ...state,
          message: action.payload,
          loading: false,
          status:STATUS.ERROR
        };
      })
  }
});

export default userTeamSlice.reducer;