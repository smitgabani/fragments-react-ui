import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: { value: null },
  reducers: {
    appLogin: (state, action) => {
      state.value = action.payload;
    },
    appLogout: (state, action) => {
      state.value = null;
    },
  },
});

export const { appLogin, appLogout } = userSlice.actions;

export default userSlice.reducer;
