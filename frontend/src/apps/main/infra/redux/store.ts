import {combineReducers, configureStore} from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga';
import rootSaga from "../redux-saga";
import {FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE} from 'redux-persist'
import {meReducer} from "../../../../modules/global/me/infra/redux/me"
// @ts-ignore
import storage from 'redux-persist/lib/storage'
import {authReducer} from "../../../../modules/global/auth/infra/redux/me";

// create the saga middleware
const sagaMiddleware = createSagaMiddleware()

const persistConfig = {
  key: 'root',
  storage,
  whiteList: ['me', 'auth']
}

const rootReducer = combineReducers({
  me: meReducer,
  auth: authReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(sagaMiddleware)
})
export const persistor = persistStore(store)

sagaMiddleware.run(rootSaga(store))

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

