import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';


export interface HomeFeedState {
  homeFeedData: null;
}

const initialState: HomeFeedState = {
  homeFeedData: null,
};

export const homeFeedSlice = createSlice({
  name: 'homeFeed',
  initialState,
  reducers: {
    homeFeedAction: (state, action: PayloadAction<any>) => {
      state.homeFeedData = action.payload;;
    }
  },
});

export const { homeFeedAction} =
homeFeedSlice.actions;

export default homeFeedSlice.reducer;
