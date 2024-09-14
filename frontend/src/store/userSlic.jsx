import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user : null
}

export const userSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    setUserDetails : (state , Action) =>{
        state.user = Action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { setUserDetails} = userSlice.actions

export default userSlice.reducer