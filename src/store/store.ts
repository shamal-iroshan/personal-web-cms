import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import createSagaMiddleware from 'redux-saga';
import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import rootReducer from './rootReducer';
import rootSaga from './rootSaga';

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  whitelist: ['signInReducer', 'userProfileReducer'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const sagaMiddleware = createSagaMiddleware();

const middlewares = [];

if (process.env.NODE_ENV === `development`) {
  middlewares.push(logger);
}

middlewares.push(sagaMiddleware);

const store = configureStore({
  reducer: persistedReducer,
  middleware: middlewares,
});

export const persist = persistStore(store);
sagaMiddleware.run(rootSaga);

export default store;
