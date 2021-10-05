import {configureStore} from '@reduxjs/toolkit';
import rootReducer from './reducers';

export default function configureAppStore(preloadedState) {
  const store = configureStore({
    reducer: {orderSlice},
  });

  if (process.env.NODE_ENV !== 'production' && module.hot) {
    module.hot.accept('./reducers', () => store.replaceReducer(rootReducer));
  }

  return store;
}

