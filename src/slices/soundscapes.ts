import { createSlice } from "@reduxjs/toolkit";
import { Soundscape } from "../models/Soundscape";

const soundscapesSlice = createSlice({
  name: 'soundscapes',
  initialState: [] as Soundscape[],
  reducers: {
    // TODO: cleanup
    newSoundscape: (state, action) => [...state, { name: action.payload, id: state.length, tracks: [] }]
  }
});

export default soundscapesSlice;