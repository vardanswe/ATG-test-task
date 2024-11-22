import React, { Suspense } from 'react';

const BetTypeSelector = React.lazy(() => import('./components/BetTypeSelector/BetTypeSelector'));
const RaceList = React.lazy(() => import('./components/RaceList/RaceList'));

const App: React.FC = () => {
    return (
        <div className="min-h-screen bg-gray-100 text-gray-800">
            <header className="bg-blue-600 text-white py-4">
                <h1 className="text-center text-2xl font-bold">Horse Betting</h1>
            </header>
            <main className="p-6">
                <Suspense fallback={<p>Loading Bet Type Selector...</p>}>
                    <BetTypeSelector />
                </Suspense>
                <Suspense fallback={<p>Loading Races...</p>}>
                    <RaceList />
                </Suspense>
            </main>
        </div>
    );
};

export default App;
