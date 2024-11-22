import fetchMock from 'jest-fetch-mock';
import { fetchProducts, fetchGame } from './api';

fetchMock.enableMocks();

beforeEach(() => {
    fetchMock.resetMocks();
});

describe('utils API functions', () => {
    it('fetchProducts should fetch products for a given bet type', async () => {
        const mockBetType = 'V75';
        const mockResponse = { data: 'mocked products' };
        fetchMock.mockResponseOnce(JSON.stringify(mockResponse));

        const result = await fetchProducts(mockBetType);

        expect(fetchMock).toHaveBeenCalledTimes(1);
        expect(fetchMock).toHaveBeenCalledWith(
            `https://www.atg.se/services/racinginfo/v1/api/products/${mockBetType}`
        );
        expect(result).toEqual(mockResponse);
    });

    it('fetchProducts should throw an error if the response is not ok', async () => {
        const mockBetType = 'V75';
        fetchMock.mockResponseOnce('', { status: 500 });

        await expect(fetchProducts(mockBetType)).rejects.toThrow('Failed to fetch products');
    });

    it('fetchGame should fetch game details for a given game ID', async () => {
        const mockGameId = '12345';
        const mockResponse = { data: 'mocked game details' };
        fetchMock.mockResponseOnce(JSON.stringify(mockResponse));

        const result = await fetchGame(mockGameId);

        expect(fetchMock).toHaveBeenCalledTimes(1);
        expect(fetchMock).toHaveBeenCalledWith(
            `https://www.atg.se/services/racinginfo/v1/api/games/${mockGameId}`
        );
        expect(result).toEqual(mockResponse);
    });

    it('fetchGame should throw an error if the response is not ok', async () => {
        const mockGameId = '12345';
        fetchMock.mockResponseOnce('', { status: 404 });

        await expect(fetchGame(mockGameId)).rejects.toThrow('Failed to fetch game details');
    });
});
