const getState = ({ getStore, getActions, setStore }) => {
    const API_BASE_URL = 'https://www.swapi.tech/api';

    const fetchWithRetry = async (url, retries = 5, delay = 1000) => {
        for (let i = 0; i < retries; i++) {
            try {
                const response = await fetch(url);
                if (response.ok) {
                    return await response.json();
                } else if (response.status === 429) {
                    await new Promise(resolve => setTimeout(resolve, delay * Math.pow(2, i)));
                } else {
                    const errorText = await response.text();
                    throw new Error(`Error ${response.status}: ${errorText}`);
                }
            } catch (error) {
                if (i === retries - 1) throw error;
                await new Promise(resolve => setTimeout(resolve, delay * Math.pow(2, i)));
            }
        }
    };

    const saveToLocalStorage = (key, data) => {
        localStorage.setItem(key, JSON.stringify(data));
    };

    const getFromLocalStorage = (key) => {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    };

    const getCachedDetails = (entityType, uid) => {
        const cacheKey = `${entityType}-details-${uid}`;
        return getFromLocalStorage(cacheKey);
    };

    const cacheDetails = (entityType, uid, details) => {
        const cacheKey = `${entityType}-details-${uid}`;
        saveToLocalStorage(cacheKey, details);
    };

    return {
        store: {
            characters: getFromLocalStorage('characters') || [],
            planets: getFromLocalStorage('planets') || [],
            ships: getFromLocalStorage('ships') || [],
            characterDetails: {},
            planetDetails: {},
            shipDetails: {},
            favorites: getFromLocalStorage('favorites') || [] // Inicialización de favoritos
        },
        actions: {
            FetchCharacters: async () => {
                if (getStore().characters.length === 0) {
                    try {
                        const response = await fetchWithRetry(`${API_BASE_URL}/people`);
                        const data = await response;
                        setStore({ characters: data.results });
                        saveToLocalStorage('characters', data.results);
                    } catch (error) {
                        console.log('Error fetching characters:', error);
                    }
                }
            },

            FetchCharacterDetails: async (uid) => {
                const cachedDetails = getCachedDetails('character', uid);
                if (cachedDetails) {
                    setStore({
                        characterDetails: {
                            ...getStore().characterDetails,
                            [uid]: cachedDetails
                        }
                    });
                } else if (!getStore().characterDetails[uid]) {
                    try {
                        const data = await fetchWithRetry(`${API_BASE_URL}/people/${uid}`);
                        setStore({
                            characterDetails: {
                                ...getStore().characterDetails,
                                [uid]: data.result.properties
                            }
                        });
                        cacheDetails('character', uid, data.result.properties);
                    } catch (error) {
                        console.log('Error fetching character details:', error);
                    }
                }
            },

            FetchPlanets: async () => {
                if (getStore().planets.length === 0) {
                    try {
                        const response = await fetchWithRetry(`${API_BASE_URL}/planets`);
                        const data = await response;
                        setStore({ planets: data.results });
                        saveToLocalStorage('planets', data.results);
                    } catch (error) {
                        console.log('Error fetching planets:', error);
                    }
                }
            },

            FetchPlanetDetails: async (uid) => {
                const cachedDetails = getCachedDetails('planet', uid);
                if (cachedDetails) {
                    setStore({
                        planetDetails: {
                            ...getStore().planetDetails,
                            [uid]: cachedDetails
                        }
                    });
                } else if (!getStore().planetDetails[uid]) {
                    try {
                        const data = await fetchWithRetry(`${API_BASE_URL}/planets/${uid}`);
                        setStore({
                            planetDetails: {
                                ...getStore().planetDetails,
                                [uid]: data.result.properties
                            }
                        });
                        cacheDetails('planet', uid, data.result.properties);
                    } catch (error) {
                        console.log('Error fetching planet details:', error);
                    }
                }
            },

            FetchShips: async () => {
                if (getStore().ships.length === 0) {
                    try {
                        const response = await fetchWithRetry(`${API_BASE_URL}/starships`);
                        const data = await response;
                        setStore({ ships: data.results });
                        saveToLocalStorage('ships', data.results);
                    } catch (error) {
                        console.log('Error fetching ships:', error);
                    }
                }
            },

            FetchShipDetails: async (uid) => {
                const cachedDetails = getCachedDetails('ship', uid);
                if (cachedDetails) {
                    setStore({
                        shipDetails: {
                            ...getStore().shipDetails,
                            [uid]: cachedDetails
                        }
                    });
                } else if (!getStore().shipDetails[uid]) {
                    try {
                        const data = await fetchWithRetry(`${API_BASE_URL}/starships/${uid}`);
                        setStore({
                            shipDetails: {
                                ...getStore().shipDetails,
                                [uid]: data.result.properties
                            }
                        });
                        cacheDetails('ship', uid, data.result.properties);
                    } catch (error) {
                        console.log('Error fetching ship details:', error);
                    }
                }
            },

            addToFavorites: (item) => {
                const store = getStore();
                const newFavorites = [...store.favorites, item];
                setStore({ favorites: newFavorites });
                saveToLocalStorage('favorites', newFavorites);
            },

            removeFromFavorites: (item) => {
                const store = getStore();
                const newFavorites = store.favorites.filter(fav => fav.uid !== item.uid);
                setStore({ favorites: newFavorites });
                saveToLocalStorage('favorites', newFavorites);
            }
        }
    };
};

export default getState;
