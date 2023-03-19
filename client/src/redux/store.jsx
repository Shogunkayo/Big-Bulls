import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './inputSlice'

export const store = configureStore({
  reducer: {
        data: counterReducer
  },
})