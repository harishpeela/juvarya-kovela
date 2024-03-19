import {configureStore, combineReducers} from '@reduxjs/toolkit';
import {persistReducer, persistStore} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

//Import all reducers here
import authSlice from './slices/authSlice';
import homeFeedSlice from './slices/homeFeedSlice';
import { authService } from './services/authService';
import { homeFeedService } from './services/homeFeedService';
import { notificationService } from './services/notificationService';
import { searchService } from './services/searchService';

const rootReducers = combineReducers({
  auth: authSlice,
  homeFeed:homeFeedSlice,
  [authService.reducerPath]: authService.reducer,
  [homeFeedService.reducerPath]: homeFeedService.reducer,
  [notificationService.reducerPath]: notificationService.reducer,
  [searchService.reducerPath]:searchService.reducer,
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
    ),
});

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
