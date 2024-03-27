import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

//Import all reducers here
import authSlice from './slices/authSlice';
import homeFeedSlice from './slices/homeFeedSlice';
import { authService } from './services/authService';
import { homeFeedService } from './services/homeFeedService';
import { notificationService } from './services/notificationService';
import { searchService, searchService2 } from './services/searchService';
import { templeProfileService, templeProfileService2, templeProfileService3, templeProfileService4 } from './services/templeProfileService';
import reelsFeedSlice from './slices/reelsFeedSlice';
import { reelsFeedService } from './services/reelsFeedService';

const rootReducers = combineReducers({
  auth: authSlice,
  homeFeed: homeFeedSlice,
  reelsFeed: reelsFeedSlice,
  [authService.reducerPath]: authService.reducer,
  [homeFeedService.reducerPath]: homeFeedService.reducer,
  [notificationService.reducerPath]: notificationService.reducer,
  [searchService.reducerPath]: searchService.reducer,
  [searchService2.reducerPath]: searchService2.reducer,
  [templeProfileService.reducerPath]: templeProfileService.reducer,
  [templeProfileService2.reducerPath]: templeProfileService2.reducer,
  [templeProfileService3.reducerPath]: templeProfileService3.reducer,
  [templeProfileService4.reducerPath]: templeProfileService4.reducer,
  [reelsFeedService.reducerPath]: reelsFeedService.reducer,
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['auth'],
};

const persistedReducer = persistReducer(persistConfig, rootReducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(
      authService.middleware,
      homeFeedService.middleware,
      notificationService.middleware,
      searchService.middleware,
      searchService2.middleware,
      templeProfileService.middleware,
      templeProfileService2.middleware,
      templeProfileService3.middleware,
      templeProfileService4.middleware,
      reelsFeedService.middleware,
    ),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
