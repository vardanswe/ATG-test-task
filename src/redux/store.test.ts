import { setupStore } from './store';
import { setBetType, fetchBetTypeProducts } from './slices/betTypeSlice';

describe('Redux Store', () => {
    let store = setupStore();

    beforeEach(() => {
        store = setupStore();
    });

    test('initializes with the correct default state', () => {
        const state = store.getState();
        expect(state.betType).toEqual({
            selectedBetType: null,
            mostRecentResult: null,
            loading: false,
            error: null,
            races: [],
        });
    });

    test('updates state when setBetType is dispatched', () => {
        const betType = 'V75';
        store.dispatch(setBetType(betType));
        const state = store.getState();
        expect(state.betType.selectedBetType).toBe(betType);
    });

    test('handles fetchBetTypeProducts.pending action', () => {
        store.dispatch({ type: fetchBetTypeProducts.pending.type });
        const state = store.getState();
        expect(state.betType.loading).toBe(true);
        expect(state.betType.error).toBeNull();
    });

    test('handles fetchBetTypeProducts.rejected action', () => {
        const mockError = 'Failed to fetch data';
        store.dispatch({
            type: fetchBetTypeProducts.rejected.type,
            payload: mockError,
        });
        const state = store.getState();
        expect(state.betType.loading).toBe(false);
        expect(state.betType.error).toBe(mockError);
    });

});
