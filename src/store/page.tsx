import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import storage from 'redux-persist/lib/storage' // localStorage
import { persistReducer, persistStore } from 'redux-persist'
import userReducer from './slices/userSlice'

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ["user"], 
}

const rootReducer = combineReducers({
  counter: userReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }), // important pt persist
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
