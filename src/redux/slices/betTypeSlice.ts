import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { fetchProducts, fetchGame } from '../../utils/api';

interface Track {
    id: number;
    name: string;
}

export interface RaceStart {
    id: string;
    number: number;
    horse: {
        name: string;
        age: number;
        sex: string;
        trainer: {
            firstName: string;
            lastName: string;
        };
        pedigree: {
            father: {
                name: string
            };
        };

    };
    driver: {
        firstName: string;
        lastName: string;
    };
}

interface Race {
    starts: RaceStart[];
    id: string;
    name: string;
    startTime: string;
    number: number;
}

interface BetTypeState {
    selectedBetType: string | null;
    mostRecentResult: {
        betType: string;
        tracks: Track[];
        startTime: string;
    } | null;
    races: Race[];
    loading: boolean;
    error: string | null;
}

const initialState: BetTypeState = {
    selectedBetType: null,
    mostRecentResult: null,
    races: [],
    loading: false,
    error: null,
};

export const fetchBetTypeProducts = createAsyncThunk(
    'betType/fetchProducts',
    async (betType: string, { rejectWithValue }) => {
        try {
            const data = await fetchProducts(betType);
            // better to check by date but assuming first item in array is the most recent result for this test task only
            const mostRecentResult = data.results[0];
            const mostRecentId = mostRecentResult.id;
            // fetching game details using id from most recent record
            const gameDetails = await fetchGame(mostRecentId);
            const races = gameDetails.races;
            return { mostRecentResult, races };
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

const betTypeSlice = createSlice({
    name: 'betType',
    initialState,
    reducers: {
        setBetType: (state, action: PayloadAction<string>) => {
            state.selectedBetType = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchBetTypeProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchBetTypeProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.mostRecentResult = action.payload.mostRecentResult;
                state.races = action.payload.races;
            })
            .addCase(fetchBetTypeProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
    },
});

export const { setBetType } = betTypeSlice.actions;
export default betTypeSlice.reducer;
