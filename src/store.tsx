import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../src/features/authentication/userSlice";
import { firestoreApi } from "./firestoreApi";

// const store = configureStore({
//     reducer: {
//         user: userReducer,
//         [firestoreApi.reducerPath]: firestoreApi.reducer,
//     },
//         middleware: (getDefaultMiddleware) => {
//       return getDefaultMiddleware().concat(firestoreApi.middleware);
//     },
// });

export const setupStore = () =>
  configureStore({
    reducer: {
      user: userReducer,
      [firestoreApi.reducerPath]: firestoreApi.reducer,
    },
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware().concat(firestoreApi.middleware);
    },
  });

export const store = setupStore();

export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

// export default store

// export type RootState = ReturnType<typeof store.getState>
// export type AppDispatch = typeof store.dispatch
// export default store;
