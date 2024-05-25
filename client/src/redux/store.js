import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";
import brokerReducer from "./broker/brokerslice";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

const rootReducer = combineReducers({
  user: userReducer,
  broker: brokerReducer,
});

const persistConfig = {
  key: "root",
  storage,
  version: 1,
  whitelist: ["user", "broker"], // Ensures only 'user' and 'broker' slices are persisted
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
});

const persistor = persistStore(store);

export { store, persistor };
