import reducer, { fetchBetTypeProducts, setBetType } from './betTypeSlice';
import { setupStore } from '../store';
import { Action } from '@reduxjs/toolkit';

// Mock API responses
jest.mock('../../utils/api', () => ({
    fetchProducts: jest.fn(),
    fetchGame: jest.fn(),
}));

import { fetchProducts, fetchGame } from '../../utils/api';

describe('betTypeSlice', () => {
    const initialState = {
        selectedBetType: null,
        mostRecentResult: null,
        races: [],
        loading: false,
        error: null,
    };

    let store = setupStore();

    beforeEach(() => {
        jest.clearAllMocks();
        store = setupStore();
    });

    test('should return the initial state', () => {
        expect(reducer(undefined, {} as Action)).toEqual(initialState);
    });

    test('should handle setBetType action', () => {
        const state = reducer(initialState, setBetType('V75'));
        expect(state.selectedBetType).toBe('V75');
    });

    describe('fetchBetTypeProducts', () => {
        const mockMostRecentResult = {
            betType: 'V75',
            tracks: [{ id: 1, name: 'Track A' }],
            startTime: '2024-11-19T18:00:00Z',
        };

        const mockRaces = [
            {
                id: '1',
                name: 'Race 1',
                startTime: '2024-11-19T18:00:00Z',
                number: 1,
                starts: [
                    {
                        id: 'start-1',
                        number: 1,
                        horse: {
                            name: 'Horse A',
                            age: 5,
                            sex: 'M',
                            trainer: { firstName: 'Trainer', lastName: 'One' },
                            pedigree: { father: { name: 'Father A' } },
                        },
                        driver: { firstName: 'Driver', lastName: 'One' },
                    },
                ],
            },
        ];

        test('should handle pending state', () => {
            const action = { type: fetchBetTypeProducts.pending.type };
            const state = reducer(initialState, action);
            expect(state.loading).toBe(true);
            expect(state.error).toBeNull();
        });

        test('should handle fulfilled state', async () => {
            (fetchProducts as jest.Mock).mockResolvedValueOnce({
                results: [mockMostRecentResult],
            });
            (fetchGame as jest.Mock).mockResolvedValueOnce({ races: mockRaces });

            await store.dispatch(fetchBetTypeProducts('V75') as unknown as Action);
            const state = store.getState().betType;

            expect(state.loading).toBe(false);
            expect(state.error).toBeNull();
            expect(state.mostRecentResult).toEqual(mockMostRecentResult);
            expect(state.races).toEqual(mockRaces);
        });

        test('should handle rejected state', async () => {
            const mockError = 'Failed to fetch data';

            (fetchProducts as jest.Mock).mockRejectedValueOnce(new Error(mockError));

            await store.dispatch(fetchBetTypeProducts('V75') as unknown as Action);
            const state = store.getState().betType;

            expect(state.loading).toBe(false);
            expect(state.error).toBe(mockError);
        });
    });
});
