import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  email: ''
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUserEmail: (state, action) => {
      state.email = action.payload;
    },
    logout: (state) => {
      state.email = '';
    }
  }
});

export const { setUserEmail, logout } = authSlice.actions;
export default authSlice.reducer;

