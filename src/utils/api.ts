const BASE_URL = 'https://www.atg.se/services/racinginfo/v1/api';

/**
 * Fetch products for a specific bet type.
 * @param betType - The type of bet (e.g., V75, V86, GS75)
 */
export const fetchProducts = async (betType: string) => {
    const response = await fetch(`${BASE_URL}/products/${betType}`);
    if (!response.ok) throw new Error('Failed to fetch products');
    return response.json();
};

/**
 * Fetch game details for a specific game ID.
 * @param id - The game ID
 */
export const fetchGame = async (id: string) => {
    const response = await fetch(`${BASE_URL}/games/${id}`);
    if (!response.ok) throw new Error('Failed to fetch game details');
    return response.json();
};
