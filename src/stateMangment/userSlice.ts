import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
    name:"user",
    initialState:{
        user:"",
        token:"",
        loggedIn:false
    },
    reducers:{
      loggedIn:(state,action)=>{
        state.user = action.payload.user
        state.token = action.payload.token
        state.loggedIn = true
      },
      loggedOut:(state)=>{
        state.user = ""
        state.token = ""
        state.loggedIn = false
    },
}})
export const {loggedIn,loggedOut} = userSlice.actions
export default userSlice.reducer