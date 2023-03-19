import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    name: "counter",
    inputData: {},
}

export const inputSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {

    setData: (state, action) => {
        state.inputData = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { setData } = inputSlice.actions

export default inputSlice.reducer