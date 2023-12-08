import { createSlice } from '@reduxjs/toolkit'

const usernameSlice = createSlice({
  name: 'saveUsername',
  initialState: {
    usernameId: "",
  },
  reducers: {
    saveUsernameId: (state, action) => {
      state.usernameId = action.payload;
    },
  }
});

export const { saveUsernameId } = usernameSlice.actions

export default usernameSlice.reducer;