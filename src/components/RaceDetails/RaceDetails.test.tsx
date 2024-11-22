import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react';
import RaceDetails from './RaceDetails';
import { RaceStart } from '../../redux/slices/betTypeSlice';

const mockRaceStarts: RaceStart[] = [
    {
        id: '1',
        number: 1,
        horse: {
            name: 'Lightning Bolt',
            age:4,
            sex: 'male',
            trainer: {
                firstName: 'John',
                lastName: 'Doe',
            },
            pedigree: {
                father: { name: 'Thunderstorm' },
            },
        },
        driver: { firstName: 'Jane', lastName: 'Smith' },
    },
    {
        id: '2',
        number: 2,
        horse: {
            name: 'Storm Chaser',
            age: 3,
            sex: 'female',
            trainer: {
                firstName: 'Emily',
                lastName: 'Blake',
            },
            pedigree: {
                father: { name: 'Hurricane' },
            },
        },
        driver: { firstName: 'Mike', lastName: 'Johnson' },
    },
];

describe('RaceDetails Component', () => {
    test('renders without crashing', () => {
        render(<RaceDetails raceStarts={[]} />);
        expect(screen.getByText(/No race details available./i)).toBeInTheDocument();
    });

    test('displays race start details', () => {
        render(<RaceDetails raceStarts={mockRaceStarts} />);
        expect(screen.getByText('Lightning Bolt')).toBeInTheDocument();
        expect(screen.getByText('Storm Chaser')).toBeInTheDocument();
        expect(screen.getByText('Jane Smith')).toBeInTheDocument();
        expect(screen.getByText('Mike Johnson')).toBeInTheDocument();
    });

    test('expands and collapses rows on click', () => {
        render(<RaceDetails raceStarts={mockRaceStarts} />);

        const firstRow = screen.getByText('Lightning Bolt');
        fireEvent.click(firstRow);

        // Check if expanded content is visible
        expect(screen.getByText(/Horse Trainer: John Doe/i)).toBeInTheDocument();
        expect(screen.getByText(/Horse Father: Thunderstorm/i)).toBeInTheDocument();

        // Collapse the row
        fireEvent.click(firstRow);
        expect(screen.queryByText(/Horse Trainer: John Doe/i)).not.toBeInTheDocument();
    });

    test('sets aria-expanded correctly', () => {
        render(<RaceDetails raceStarts={mockRaceStarts} />);

        const firstRow = screen.getByText('Lightning Bolt').closest('tr');
        expect(firstRow).toHaveAttribute('aria-expanded', 'false');

        fireEvent.click(firstRow!);
        expect(firstRow).toHaveAttribute('aria-expanded', 'true');

        fireEvent.click(firstRow!);
        expect(firstRow).toHaveAttribute('aria-expanded', 'false');
    });


    test('displays "No race details available" message when raceStarts is empty', () => {
        render(<RaceDetails raceStarts={[]} />);

        expect(screen.getByText('No race details available.')).toBeInTheDocument();
    });

    test('matches snapshot', () => {
        const { container } = render(<RaceDetails raceStarts={mockRaceStarts} />);
        expect(container).toMatchSnapshot();
    });
});
