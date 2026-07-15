export type Country = {
    end_date: string,
    iso_code: string,
    name: string,
    start_date: string,
    symbol: string
}

export type Currency = {
    date: string,
    base: string,
    quote: string,
    rate: number
}

export type Log = {
    id: string,
    time: string,
    from: string,
    to: string,
    amountSent: number | null,
    amountReceived: number | null
    // calculatedAmount: number
}

export type HistoricalRate = {
    date: string,
    base: string,
    quote: string,
    rate: number
}

export type DateRange = "1D" | "1W" | "1M" | "3M" | "1Y" | "5Y";
