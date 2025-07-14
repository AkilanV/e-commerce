import { createSlice } from "@reduxjs/toolkit";

const loaderSlice = createSlice({
  name: "loaderState",
  initialState: { loading: false, requestCount: 0 },
  reducers: {
    startLoading: (state) => {
      state.requestCount += 1;
      state.loading = true;
    },
    stopLoading: (state) => {
      state.requestCount = Math.max(0, state.requestCount - 1);
      if (state.requestCount === 0) {
        state.loading = false;
      }
    },
    resetLoading: (state) => {
      state.loading = false;
      state.requestCount = 0;
    },
  },
});

export const { startLoading, stopLoading, resetLoading } = loaderSlice.actions;
export default loaderSlice.reducer;
