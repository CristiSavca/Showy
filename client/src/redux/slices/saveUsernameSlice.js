import { createSlice, configureStore } from '@reduxjs/toolkit'

const usernameSlice = createSlice({
  name: 'saveUsername',
  initialState: {
    username: ""
  },
  reducers: {
    saveUsername: (state, action) => {
      state.username = action.payload;
    },
  }
})

export const { saveUsername } = usernameSlice.actions

export default usernameSlice.reducer;