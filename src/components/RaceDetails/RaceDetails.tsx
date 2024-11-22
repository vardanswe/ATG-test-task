import React, {useState} from 'react';
import {RaceStart} from '../../redux/slices/betTypeSlice';

interface RaceDetailsProps {
    raceStarts: RaceStart[];
}

// TODO brake down to small react components or use Storybook components

const RaceDetails: React.FC<RaceDetailsProps> = ({raceStarts}) => {
    const [expandedRow, setExpandedRow] = useState<string | null>(null);

    if (!raceStarts || raceStarts.length === 0) {
        return <p className="text-center text-gray-500">No race details available.</p>;
    }

    return (
        <div className="race-details bg-white shadow rounded-lg p-4">
            <table className="w-full table-auto border-collapse border border-gray-200">
                <thead className="bg-gray-100">
                <tr>
                    <th className="border border-gray-300 px-4 py-2 text-left text-gray-600">Number</th>
                    <th className="border border-gray-300 px-4 py-2 text-left text-gray-600">Horse Name</th>
                    <th className="border border-gray-300 px-4 py-2 text-left text-gray-600">Driver</th>
                </tr>
                </thead>
                <tbody>
                {raceStarts.map((start) => (
                    <React.Fragment key={start.id}>
                        <tr
                            onClick={() => setExpandedRow(expandedRow === start.id ? null : start.id)}
                            className={`cursor-pointer hover:bg-gray-50 ${
                                expandedRow === start.id ? 'bg-gray-100' : ''
                            }`}
                            aria-expanded={expandedRow === start.id ? 'true' : 'false'}
                        >
                            <td className="border border-gray-300 px-4 py-2">{start.number}</td>
                            <td className="border border-gray-300 px-4 py-2">{start.horse.name}</td>
                            <td className="border border-gray-300 px-4 py-2">
                                {start.driver.firstName} {start.driver.lastName}
                            </td>
                        </tr>
                        {expandedRow === start.id && (
                            <tr>
                                <td colSpan={3} className="border border-gray-300 px-4 py-2 bg-gray-50">
                                    <div className="p-4 space-y-4 bg-gray-100 rounded">
                                        <div className="flex flex-col">
                                            <span
                                                className="text-sm font-medium text-gray-600">Horse Trainer: {start.horse.trainer.firstName} {start.horse.trainer.lastName}</span>
                                        </div>
                                        <div className="flex flex-col">
                                            <span
                                                className="text-sm font-medium text-gray-600">
                                                Horse Father: {start.horse.pedigree.father.name}
                                            </span>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </React.Fragment>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default RaceDetails;
