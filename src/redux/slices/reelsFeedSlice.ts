import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';


export interface ReelsFeedState {
  reelsFeedData: any;
}

const initialState: ReelsFeedState = {
  reelsFeedData: [],
};

export const reelsFeedSlice = createSlice({
  name: 'reelsFeed',
  initialState,
  reducers: {
    addVideoToFeed: (state, action: PayloadAction<any>) => {
      state.reelsFeedData.push(action.payload);
    },
    setReelsFeedData: (state, action: PayloadAction<any[]>) => {
      state.reelsFeedData = action.payload;
    },
  },
});

export const { addVideoToFeed, setReelsFeedData } = reelsFeedSlice.actions;

export default reelsFeedSlice.reducer;