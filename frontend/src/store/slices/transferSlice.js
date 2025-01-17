import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import TransferService from "../../services/transferService";
import { STATUS } from "../../constants/constants";

export const initialState = {
  loading: false,
  message: "",
  redirect:'',
  status:'',
  showMessage: '',
  players:[]
};

export const toggleTransfer = createAsyncThunk(
  "transfer/toggle",
  async (data, { rejectWithValue }) => {
    try {
      const response = await TransferService.toggleTransferPlayer(data);
      const { message } = response;
      return { message };
    } catch (err) {
      return rejectWithValue(err?.response?.data?.message || "Error");
    }
  }
);

export const getTransferListedPlayers = createAsyncThunk(
  "transfer/players",
  async (data, { rejectWithValue }) => {
    try {
      const response = await TransferService.getTransferListedPlayers(data);
      return response;
    } catch (err) {
      return rejectWithValue(err?.response?.data?.message || "Error");
    }
  }
);

export const purchasePlayer = createAsyncThunk(
  "transfer/purchase",
  async (data, { rejectWithValue }) => {
    try {
      const response = await TransferService.purchasePlayer(data);
      return response;
    } catch (err) {
      return rejectWithValue(err?.response?.data?.message || "Error");
    }
  }
);

export const teansferPlayerSlice = createSlice({
  name: "transfer",
  initialState,
  reducers: { 
    resetStatus: (state) => ({
      ...state, status:'',
    }),
  },
  extraReducers: (builder) => {
    builder
      .addCase(toggleTransfer.pending, (state) => {
        return { ...state, loading: true };
      })
      .addCase(toggleTransfer.fulfilled, (state, action) => {
        const payload = action.payload;
        return {
          ...state,
          loading: false,
          message: payload.message,
          status:STATUS.SUCCESS,
          redirect: "/app/transfer-list",
        };
      })
      .addCase(toggleTransfer.rejected, (state, action) => {
        return {
          ...state,
          message: action.payload,
          loading: false,
          status: STATUS.ERROR
        };
      })
      .addCase(purchasePlayer.pending, (state) => {
        return { ...state, loading: true };
      })
      .addCase(purchasePlayer.fulfilled, (state) => {
        return {
          ...state,
          loading: false,
          status: STATUS.SUCCESS,
          redirect: "/app/my-team",
        };
      })
      .addCase(purchasePlayer.rejected, (state, action) => {
        return {
          ...state,
          message: action.payload,
          loading: false,
          status: STATUS.ERROR,
        };
      })
      .addCase(getTransferListedPlayers.pending, (state) => {
        return { ...state, loading: true };
      })
      .addCase(getTransferListedPlayers.fulfilled, (state, action) => {
        const payload = action.payload;
        return {
          ...state,
          loading: false,
          players: payload?.players,
        };
      })
      .addCase(getTransferListedPlayers.rejected, (state, action) => {
        return {
          ...state,
          message: action.payload,
          loading: false,
        };
      });
  },
});

export const {
  resetStatus,
} = teansferPlayerSlice.actions;

export default teansferPlayerSlice.reducer;
