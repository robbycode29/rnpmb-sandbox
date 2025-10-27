import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  user: { email: string; password: string } | null;
}

const initialState: AuthState = {
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signUp: (state, action: PayloadAction<{ email: string; password: string }>) => {
      // Placeholder logic for now
      state.user = { email: action.payload.email, password: action.payload.password };
    },
  },
});

export const { signUp } = authSlice.actions;
export default authSlice.reducer;