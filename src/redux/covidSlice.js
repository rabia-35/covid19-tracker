import {createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'

export const fetchCovid=createAsyncThunk("covid", async (country)=>{
  const res= await axios(`${process.env.REACT_APP_API_BASE_ENDPOINT}/${country ? `countries/${country}` : "" }`)
  return res.data
}) 

export const fetchCountriesCovid=createAsyncThunk("covid/country", async ()=>{
  const res= await axios(`${process.env.REACT_APP_API_BASE_ENDPOINT}/countries`)
  return res.data
}) 




export const covidSlice = createSlice({
  name: 'covid',
  initialState: {
    items:"",
    status:"idle",
    error:"",
    countries:null,
    country:null,
  },
  reducers: {
    selectedCountry:(state, action)=>{
      state.country=action.payload
    }
  },
  extraReducers:{
// The area where all data is taken - pending, fullfilled and rejected
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


// the area where all countries are taken - pending, fullfilled and rejected
    [fetchCountriesCovid.pending]: (state) => {
      state.status = 'loading';
    },
    [fetchCountriesCovid.fulfilled]: (state, action) => {
        state.countries=action.payload
        state.status = "successed";
      },
    [fetchCountriesCovid.rejected]: (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
    },

  },
 
})

// Action creators are generated for each case reducer function
export const {selectedCountry} = covidSlice.actions

export default covidSlice.reducer