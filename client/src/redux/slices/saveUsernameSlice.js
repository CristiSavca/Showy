import { createSlice, configureStore } from '@reduxjs/toolkit'

const usernameSlice = createSlice({
  name: 'saveUsername',
  initialState: {
    username: ""
  },
  reducers: {
    saveUsername: (state, action) => {
      state.username = action.payload.username;
    },
  }
})

export const { saveUsername } = counterSlice.actions

export default usernameSlice.reducer;