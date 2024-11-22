import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../redux/store';
import { fetchBetTypeProducts, setBetType } from '../../redux/slices/betTypeSlice';

const BetTypeSelector: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const { selectedBetType, mostRecentResult, loading, error } = useSelector(
        (state: RootState) => state.betType
    );

    const betTypes = useMemo(() => ['V75', 'V86', 'GS75'], []);

    useEffect(() => {
        if (!selectedBetType) {
            dispatch(setBetType(betTypes[0])); // Dispatch the first bet type
            dispatch(fetchBetTypeProducts(betTypes[0]));
        }
    }, [dispatch, selectedBetType, betTypes]);

    const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const betType = event.target.value;
        dispatch(setBetType(betType));
        dispatch(fetchBetTypeProducts(betType));
    };

    //TODO create a storybook following Atomic Design and use components such as select below from there

    return (
        <div className="flex items-center gap-4 bg-white p-4 shadow rounded-lg">
            <label htmlFor="betType" className="text-gray-700 font-medium">
                Bet Type:
            </label>
            <select
                onChange={handleSelect}
                value={selectedBetType || ''}
                className="border border-gray-300 rounded-md p-2 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
                {betTypes.map((type) => (
                    <option key={type} value={type}>
                        {type}
                    </option>
                ))}
            </select>

            {loading && <p className="text-blue-500 font-medium">Loading...</p>}
            {error && <p className="text-red-500 font-medium">Error: {error}</p>}
            {!loading && mostRecentResult && (
                //TODO create a react component for showing details below
                <div className="ml-4 text-gray-700 text-sm">
                    <strong className="text-gray-800 mr-2">Most Recent Result :</strong>
                    <span className={'mr-2'}>Bet Type: {selectedBetType}</span>
                    <span className={'mr-2'}>Track: {mostRecentResult.tracks.map((track) => track.name).join(', ')}</span>
                    <span className={'mr-2'}>Start Time: {new Date(mostRecentResult.startTime).toLocaleString()}</span>
                </div>
            )}
        </div>
    );
};

export default BetTypeSelector;
