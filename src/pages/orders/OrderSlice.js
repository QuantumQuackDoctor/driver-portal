import { createSlice } from '@reduxjs/toolkit'

const initialState = { value: 0 }

const OrderSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    assignOrders(state) {
      state.value--
    },
    incrementByAmount(state, action) {
      state.value += action.payload
    },
  },
  extraReducers: {
  // fulfilled and rejected
  }
})

export const { increment, decrement, incrementByAmount } = OrderSlice.actions
export default counterSlice.reducer