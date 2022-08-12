import {createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'

export const fetchCovid=createAsyncThunk("covid", async ()=>{
  const res= await axios(`${process.env.REACT_APP_API_BASE_ENDPOINT}/`)
  return res.data
}) 

export const fetchCountryCovid=createAsyncThunk("covid/country", async ()=>{
  const res= await axios(`${process.env.REACT_APP_API_BASE_ENDPOINT}/countries`)
  return res.data
}) 


export const covidSlice = createSlice({
  name: 'covid',
  initialState: {
    items:"",
    status:"idle",
    error:"",
    country:null,
  },
  reducers: {},
  extraReducers:{
    [fetchCovid.pending]: (state) => {
      state.status = 'loading';
  },
  [fetchCovid.fulfilled]: (state, action) => {
      state.items=action.payload
      state.status = "successed";
    },
  [fetchCovid.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
  },
  [fetchCountryCovid.pending]: (state) => {
    state.status = 'loading';
},
[fetchCountryCovid.fulfilled]: (state, action) => {
    state.country=action.payload
    state.status = "successed";
  },
[fetchCountryCovid.rejected]: (state, action) => {
    state.status = "failed";
    state.error = action.error.message;
},
  },
 
})

// Action creators are generated for each case reducer function
//export const {} = covidCardSlice.actions

export default covidSlice.reducer