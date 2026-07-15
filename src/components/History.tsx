import { useEffect, useState } from "react";
import type { HistoricalRate, DateRange } from "../types/types";
import { useCurrencyContext } from "../contexts/CurrencyContext";
import { getStartDate } from "../utils/getStartDate";
import Chart from "./Chart";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
function History() {
    const [history, setHistory] = useState<HistoricalRate[] | []>([])
    const [fromDate, setFromDate] = useState<DateRange>("1D")
    const open = history[0]?.rate
    const last = history[history.length - 1]?.rate
    const change = Number((last - open).toFixed(6))
    const changePercentage = Number(((change / open) * 100).toFixed(4))
    const { baseCurrency, quoteCurrency, fetchHistoricalRates } = useCurrencyContext();

    const stylingColors = {
        backgroundColor: "#171719",
        lineColor: "#CEF739",
        textColor: "#D9D9D9",
        areaTopColor: "#CEF739",
        areaBottomColor: "#000",
    }



    useEffect(() => {
        async function loadHistory() {
            const from = getStartDate(fromDate)?.toISOString().split("T")[0];

            const data = await fetchHistoricalRates(
                from,
                baseCurrency,
                quoteCurrency
            );

            setHistory(data);
            // console.log(data)
        }

        loadHistory();
    }, [fromDate, baseCurrency, quoteCurrency]);

    const chartData = history.map((item) => (
        {
            time: item.date,
            value: item.rate
        }
    ))

    console.log(history)
    return (
        <>
            <section>
                <div>

                    {/* Open, Last, Change, Change % */}
                    <div className="grid grid-cols-2 gap-2.5 mb-5">
                        {/* Open */}
                        <div className="flex flex-col gap-4 bg-neutral-600 rounded-2xl px-5 py-3">
                            <p className="font-mono uppercase text-neutral-50 text-30 tracking-wider">Open</p>
                            <p className="text-[30px] text-white font-mono">{open}</p>
                        </div>
                        {/* Last */}
                        <div className="flex flex-col gap-4 bg-neutral-600 rounded-2xl px-5 py-3">
                            <p className="font-mono uppercase text-neutral-50 text-30 tracking-wider">Last</p>
                            <p className="text-[30px] text-white font-mono">{last}</p>
                        </div>
                        {/* Change */}
                        <div className="flex flex-col gap-4 bg-neutral-600 rounded-2xl px-5 py-3">
                            <p className="font-mono0 uppercase text-neutral-50 text-30 tracking-wider">Change</p>
                            <p className="text-[30px] overflow-x-scroll scrollbar-none text-green font-mono">
                                <span>{change > 0 ? '+' : ''}{change}</span>
                            </p>
                        </div>
                        {/* Change % */}
                        <div className="flex flex-col gap-4 bg-neutral-600 rounded-2xl px-5 py-3">
                            <p className="font-mono uppercase text-neutral-50 text-30 tracking-wider">Change %</p>
                            <p className=" flex items-center   font-mono text-green">
                                <span className="*:h-6 *:w-6 *:inline-block">{changePercentage > 0 ? (
                                    <ChevronDown className="rotate-180" />
                                ) : (
                                    <ChevronDown />
                                )}</span>

                                <span className="text-[20px]">{changePercentage} %</span>
                            </p>
                        </div>
                    </div>
                    {/* Choosing dates/range */}
                    <div className="flex items-center bg-neutral-600 *:text-neutral-200 text-[20px] *:font-mono *:uppercase *:px-4 *:py-3 w-fit rounded-lg" >
                        <motion.button className={`rounded-lg ${fromDate === "1D" ? "bg-neutral-500" : ""}`} onClick={() => setFromDate("1D")}>1D</motion.button>
                        <motion.button className={`rounded-lg ${fromDate === "1W" ? "bg-neutral-500" : ""}`} onClick={() => setFromDate("1W")}>1W</motion.button>
                        <motion.button className={`rounded-lg ${fromDate === "1M" ? "bg-neutral-500" : ""}`} onClick={() => setFromDate("1M")}>1M</motion.button>
                        <motion.button className={`rounded-lg ${fromDate === "3M" ? "bg-neutral-500" : ""}`} onClick={() => setFromDate("3M")}>3M</motion.button>
                        <motion.button className={`rounded-lg ${fromDate === "1Y" ? "bg-neutral-500" : ""}`} onClick={() => setFromDate("1Y")}>1Y</motion.button>
                        <motion.button className={`rounded-lg ${fromDate === "5Y" ? "bg-neutral-500" : ""}`} onClick={() => setFromDate("5Y")}>5Y</motion.button>
                    </div>
                </div>

                {/* Graph */}
                <div className="space-y-5 py-4 px-3 bg-neutral-700 rounded-2xl mt-4">
                    <div className="flex items-center justify-between font-mono">
                        <span className="text-[16px] text-white">{baseCurrency}/{quoteCurrency}</span>
                        <p className="text-[14px] font-mono text-neutral-400">
                            {/* 0.853 . May 14 16:00 CET */}
                            <span>{history[0]?.rate}</span>
                            <span>.</span>

                        </p>
                    </div>
                    <Chart data={chartData} colors={stylingColors} />
                </div>

            </section>
        </>
    )
}

export default History