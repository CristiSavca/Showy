import { createSlice } from '@reduxjs/toolkit'

const usernameSlice = createSlice({
  name: 'saveUsername',
  initialState: {
    username: "",
    usernameId: "",
  },
  reducers: {
    saveUsername: (state, action) => {
      state.username = action.payload;
    },
    saveUsernameId: (state, action) => {
      state.usernameId = action.payload;
    },
  }
});

export const { saveUsername, saveUsernameId } = usernameSlice.actions

export default usernameSlice.reducer;