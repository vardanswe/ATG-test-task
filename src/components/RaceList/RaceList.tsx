import React, { useState, Suspense } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

const RaceDetails = React.lazy(() => import('../RaceDetails/RaceDetails'));

const RaceList: React.FC = () => {
    const races = useSelector((state: RootState) => state.betType.races);
    const [expandedRaceId, setExpandedRaceId] = useState<string | null>(null);

    const toggleRaceDetails = (raceId: string) => {
        setExpandedRaceId(expandedRaceId === raceId ? null : raceId);
    };

    // TODO brake down to small react components or use Storybook components

    return (
        <div className="race-list container mx-auto p-6">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Races</h2>
            <div className="space-y-4">
                {races.map((race) => (
                    <div
                        key={race.id}
                        className="race-row bg-white shadow rounded-lg p-4 hover:shadow-lg transition-shadow duration-200"
                    >
                        <div
                            className={`race-row-main flex justify-between items-center cursor-pointer ${
                                expandedRaceId === race.id ? 'bg-gray-100' : ''
                            }`}
                            onClick={() => toggleRaceDetails(race.id)}
                        >
                            <div className="space-y-2">
                                <p className="text-gray-700">
                                    <strong className="font-medium text-gray-800">Race Number:</strong> {race.number}
                                </p>
                                <p className="text-gray-700">
                                    <strong className="font-medium text-gray-800">Race Name:</strong> {race.name}
                                </p>
                                <p className="text-gray-700">
                                    <strong className="font-medium text-gray-800">Start Time:</strong>{' '}
                                    {new Date(race.startTime).toLocaleString()}
                                </p>
                            </div>
                            <span
                                className={`text-sm font-medium text-gray-500 ${
                                    expandedRaceId === race.id ? 'rotate-180' : ''
                                } transition-transform`}
                            >
                                ▼
                            </span>
                        </div>
                        {expandedRaceId === race.id && (
                            <div className="race-details mt-4">
                                <Suspense fallback={<p>Loading race details...</p>}>
                                    <RaceDetails raceStarts={race?.starts} />
                                </Suspense>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RaceList;
