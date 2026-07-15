import { createContext, useContext, useState } from "react";
import type { HistoricalRate } from "../types/types";

type CurrencyContextType = {
    baseCurrency: string;
    setBaseCurrency: (currency: string) => void;
    quoteCurrency: string;
    setQuoteCurrency: (currency: string) => void;
    fetchHistoricalRates: (date: string, baseCurrency: string, quoteCurrency: string) => Promise<HistoricalRate[]>;
    fetchRates: () => Promise<any>;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export const useCurrencyContext = () => {
    const context = useContext(CurrencyContext);
    if (!context) {
        throw new Error("useCurrencyContext must be used within a CurrencyProvider");
    }
    return context;
}

export const CurrencyProvider = ({ children }: { children: React.ReactNode }) => {
    const [baseCurrency, setBaseCurrency] = useState("USD");
    const [quoteCurrency, setQuoteCurrency] = useState("EUR");

    const fetchHistoricalRates = async (date: string, baseCurrency: string, quoteCurrency: string) => {
        const response = await fetch(`https://api.frankfurter.dev/v2/rates?from=${date}&base=${baseCurrency}&quotes=${quoteCurrency}`);
        const res = await response.json();

        return res
    }

    const fetchRates = async () => {
        const data = await fetch(`https://api.frankfurter.dev/v2/rates?base=${baseCurrency}`);
        const res = await data.json();
        return res;
    }
    return (
        <CurrencyContext.Provider value={{ baseCurrency, setBaseCurrency, quoteCurrency, setQuoteCurrency, fetchHistoricalRates, fetchRates }}>
            {children}
        </CurrencyContext.Provider>
    )
}