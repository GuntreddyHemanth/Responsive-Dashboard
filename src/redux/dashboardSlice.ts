import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { fetchDashboardDataFromApi } from '../services/api';

export interface UserActivity {
  date: string;
  value: number;
}

export interface SalesData {
  category: string;
  value: number;
}

export interface DemographicData {
  name: string;
  value: number;
}

export interface ActivityItem {
  id: string;
  user: string;
  action: string;
  timestamp: string;
}

export interface DashboardData {
  userActivity: UserActivity[];
  salesData: SalesData[];
  demographics: DemographicData[];
  recentActivity: ActivityItem[];
  loading: boolean;
  error: string | null;
}

const initialState: DashboardData = {
  userActivity: [],
  salesData: [],
  demographics: [],
  recentActivity: [],
  loading: false,
  error: null,
};

export const fetchDashboardData = createAsyncThunk(
  'dashboard/fetchData',
  async () => {
    return await fetchDashboardDataFromApi();
  }
);

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchDashboardData.fulfilled,
        (state, action: PayloadAction<Omit<DashboardData, 'loading' | 'error'>>) => {
          state.loading = false;
          state.userActivity = action.payload.userActivity;
          state.salesData = action.payload.salesData;
          state.demographics = action.payload.demographics;
          state.recentActivity = action.payload.recentActivity;
        }
      )
      .addCase(fetchDashboardData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch dashboard data';
      });
  },
});

export default dashboardSlice.reducer;