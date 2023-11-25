import { configureStore } from '@reduxjs/toolkit'

import saveUsernameReducer from './slices/saveUsernameSlice';

export default configureStore({
  reducer: {
    saveUsername: saveUsernameReducer,
  }
})