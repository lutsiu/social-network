import { createSlice } from "@reduxjs/toolkit";
import {
  InitialStateUI,
  ActionWithAudience,
  ActionWithWhoCanReply,
} from "../interfaces/redux";
const initialState: InitialStateUI = {
  audience: "everyone",
  whoCanReply: "everyone",
  tweet: "",
  showSidebarMenu: false,
};

const slice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setAudience(state, action: ActionWithAudience) {
      state.audience = action.payload === "everyone" ? "everyone" : "circle";
    },
    setWhoCanReply(state, action: ActionWithWhoCanReply) {
      const { payload } = action;
      if (payload === "everyone") {
        state.whoCanReply = payload;
      }
      if (payload === "following") {
        state.whoCanReply = payload;
      }
      if (payload === "mentioned") {
        state.whoCanReply = payload;
      }
    },
    setTweet(state, action: { payload: string }) {
      state.tweet = action.payload;
    },
    setShowSidebarMenu(state) {
      state.showSidebarMenu = state.showSidebarMenu ? false : true;
    },
  },
});

export default slice.reducer;
export const { setAudience, setWhoCanReply, setTweet, setShowSidebarMenu } = slice.actions;
