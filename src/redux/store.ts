import { configureStore, combineReducers } from '@reduxjs/toolkit';

const rootReducer = combineReducers({
    betType: {},
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
