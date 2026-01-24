import { createAsyncThunk } from "@reduxjs/toolkit";
import { clientServer } from "../index.jsx";

export const getEventById = createAsyncThunk(
  "/event/getEventById",
  async (user, thunkApi) => {
    try {
      const responce = await clientServer.get(`/event/${user.id}`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      return thunkApi.fulfillWithValue(responce.data);
    } catch (e) {
      return thunkApi.rejectWithValue(e.responce.data);
    }
  },
);

export const getAllEvents = createAsyncThunk(
  "/event/getAllEvents",
  async (_, thunkApi) => {
    try {
      const responce = await clientServer.get("/events", {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      return thunkApi.fulfillWithValue(responce.data.events.reverse());
    } catch (e) {
      return thunkApi.rejectWithValue(e.responce.data);
    }
  },
);

export const createEvent = createAsyncThunk(
  "/event/createEvent",
  async (user, thunkApi) => {
    try {
      const {
        media,
        title,
        description,
        category,
        date,
        startTime,
        endTime,
        location,
        totalTickets,
        price,
      } = user;

      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("category", category);
      formData.append("totalTickets", totalTickets);
      formData.append("date", date);
      formData.append("startTime", startTime);
      formData.append("endTime", endTime);
      formData.append("location", JSON.stringify(location));
      formData.append("price", price);
      formData.append("media", media);

      const responce = await clientServer.post("/event", formData, {
        headers: {
          token: localStorage.getItem("token"),
          "Content-Type": "multipart/form-data",
        },
      });
      if (responce.status === 200) {
        return thunkApi.fulfillWithValue("Event Uploaded");
      } else {
        return thunkApi.fulfillWithValue("Event not Uploaded");
      }
    } catch (err) {
      return thunkApi.rejectWithValue(err.response.data);
    }
  },
);

export const deleteEvent = createAsyncThunk(
  "event/deleteEvent",
  async (user, thunkApi) => {
    try {
      const { id } = user;
      const responce = await clientServer.delete(`/event/${id}`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      if (responce.status === 200) {
        return thunkApi.fulfillWithValue("event deleted");
      } else {
        return thunkApi.fulfillWithValue("event not deleted");
      }
    } catch (e) {
      return thunkApi.rejectWithValue(e.responce.data);
    }
  },
);

export const createReview = createAsyncThunk(
  "event/createReview",
  async (userData, thunkApi) => {
    try {
      const { eventId, comment, rating } = userData;

      const responce = await clientServer.post(
        "/review",
        {
          eventId: eventId,
          comment: comment,
          rating: rating,
        },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        },
      );
      if (responce.status === 200) {
        return thunkApi.fulfillWithValue("review created");
      } else {
        return thunkApi.fulfillWithValue("review not created");
      }
    } catch (e) {
      return thunkApi.rejectWithValue(e.responce.data);
    }
  },
);

export const deleteReview = createAsyncThunk(
  "event/deleteReview",
  async (userData, thunkApi) => {
    try {
      const { eventId, reviewId } = userData;

      const responce = await clientServer.delete(
        "/review",
        {
          evnentId: eventId,
          reviewId: reviewId,
        },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        },
      );
      if (responce.status === 200) {
        return thunkApi.fulfillWithValue("review deleted");
      } else {
        return thunkApi.fulfillWithValue("review not created");
      }
    } catch (e) {
      return thunkApi.rejectWithValue(e.responce.data);
    }
  },
);

export const createTicket = createAsyncThunk(
  "event/createTicket",
  async (userData, thunkApi) => {
    try {
      const { numberOfTickets, eventId, totalAmount } = userData;

      const responce = await clientServer.post(
        "/ticket",
        {
          numberOfTickets: numberOfTickets,
          eventId: eventId,
          totalAmount: totalAmount,
        },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        },
      );
      if (responce.status === 200) {
        return thunkApi.fulfillWithValue("ticket created");
      } else {
        return thunkApi.fulfillWithValue("ticket not created");
      }
    } catch (e) {
      return thunkApi.rejectWithValue(e.responce.data);
    }
  },
);

export const getAllTickets = createAsyncThunk(
  "/event/getAllTickets",
  async (_, thunkApi) => {
    try {
      const responce = await clientServer.get("/tickets", {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      return thunkApi.fulfillWithValue(responce.data.reverse());
    } catch (e) {
      return thunkApi.rejectWithValue(e.responce.data);
    }
  },
);
