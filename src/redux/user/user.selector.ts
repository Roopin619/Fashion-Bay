import { createSelector } from "reselect";

import { RootState } from "../store";

import { UserState } from "./user.reducer";

export const selectUserReducer = (state: RootState): UserState => state.userReducer;

export const selectCurrentUser = createSelector(
  selectUserReducer,
  (userSlice) => userSlice.currentUser
);
