import { createContext, useState } from "react";
import LoaderPage from "./loading_page";

export const LoadingContext = createContext();

export const LoadignProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);

    return (
        <LoadingContext.Provider value={{ loading, setLoading }}>
            {children}
            {loading && <LoaderPage />}
        </LoadingContext.Provider>
    );
};