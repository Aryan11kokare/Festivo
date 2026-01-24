import { createSlice } from "@reduxjs/toolkit";
import {
  createEvent,
  getAllEvents,
  getEventById,
} from "../actions/eventActions";

const initialState = {
  events: [],
  event: undefined,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

const eventSlice = createSlice({
  name: "event",
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllEvents.pending, (state) => {
        state.isLoading = true;
        state.message = "...loading...";
      })
      .addCase(getAllEvents.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.events = action.payload;
      })
      .addCase(getAllEvents.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getEventById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.event = action.payload;
      })
      .addCase(getEventById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(createEvent.pending, (state) => {
        state.isLoading = true;
        state.message = "...loading...";
      })
      .addCase(createEvent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.message = "event created successfull";
      })
      .addCase(createEvent.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = eventSlice.actions;
export default eventSlice.reducer;
