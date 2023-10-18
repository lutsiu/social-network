/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.scss'
import authReducer from './state/auth.ts'
import uiReducer from './state/ui.ts'
import {configureStore, combineReducers} from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import {persistReducer, persistStore} from 'redux-persist'
import storage from "redux-persist/lib/storage";
import { PersistGate } from "redux-persist/integration/react";
import thunk from 'redux-thunk';

// redux persist config 
const persistConfig = { key: "root", storage, version: 1 };

const rootReducer = combineReducers({
  auth: authReducer, // This reducer will be persisted
  ui: uiReducer, // This reducer will not be persisted
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk]
});


ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistStore(store)}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);