import { configureStore } from '@reduxjs/toolkit';
import themeReducer from './themeSlice';
import dashboardReducer from './dashboardSlice';
import settingsReducer from './settingsSlice';

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    dashboard: dashboardReducer,
    settings: settingsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;