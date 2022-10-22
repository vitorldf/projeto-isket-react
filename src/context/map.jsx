import React, { createContext, useState, useCallback } from 'react';
import api from "../services";

const MapContext = createContext();

const MapProvider = ({ children }) => {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);

    const getCountries = useCallback(async () => {
        setLoading(true);
        try {
            const response = await api.get("get-countries");
            setData(response.data);
        } catch (error) {
            console.log(error.message);
        } finally {
            setLoading(false);
        }
    }, [])

    const postCountries = useCallback(async (payload) => {
        try {
            await api.post("filter-countries", payload);
        } catch (error) {
            console.log(error.message);
        }
    }, [])

    return (
        <MapContext.Provider
            value={{
                maps: data,
                loading,
                getCountries,
                postCountries,
            }}
        >
            {children}
        </MapContext.Provider>
    );
}

export { MapProvider, MapContext };
