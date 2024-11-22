import { configureStore, combineReducers } from '@reduxjs/toolkit';
import betTypeReducer from './slices/betTypeSlice';

const rootReducer = combineReducers({
    betType: betTypeReducer,
});

export const store = configureStore({
    reducer: rootReducer,
});

export const setupStore = (preloadedState?: Partial<RootState>) => {
    return configureStore({
        reducer: rootReducer,
        preloadedState,
    });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
