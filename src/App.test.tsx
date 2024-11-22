import React, {act} from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { setupStore } from './redux/store';
import App from './App';

describe('App Component', () => {
  let store = setupStore();

  beforeEach(() => {
    store = setupStore();
  });

  const renderWithProviders = async (ui: React.ReactElement) => {
    await act(async () => {
      render(<Provider store={store}>{ui}</Provider>);
    });
  };

  test('displays lazy-loaded components after resolving', async () => {

    await renderWithProviders(<App />);

    // Wait for lazy-loaded components to resolve
    await act(async () => {
      await Promise.resolve();
    });

    expect(screen.getByLabelText('Bet Type:')).toBeInTheDocument();
  });
});
