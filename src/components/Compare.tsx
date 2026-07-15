import { useEffect, useState } from "react"
import type { Currency } from "../types/types"
import { useCurrencyContext } from "../contexts/CurrencyContext"
import { COUNTRIES } from "../countries"
function Compare() {
    const [spliceAmount, setSpliceAmount] = useState(8)
    const { fetchRates, baseCurrency } = useCurrencyContext()
    const [rates, setRates] = useState<Currency[]>([])
    const allowedCodes = COUNTRIES.map(code => code.code)
    const allowedCurrencies = rates.filter(rate => allowedCodes.includes(rate.quote))
    useEffect(() => {
        const getRates = async () => {
            const data = await fetchRates()
            setRates(data)
        }
        getRates()
    }, [baseCurrency])

    // New effect just to watch rates
    // useEffect(() => {
    //     console.log("rates updated:", rates)
    // }, [rates])

    // console.log("allowedCurrencies", allowedCurrencies)
    return (
        <>
            <section className="bg-neutral-700 p-4 rounded-lg">
                <div className="mb-4">
                    <h1 className="flex items-center  justify-between">
                        <span className="uppercase font-mono text-neutral-200 text-[14px]">Multi-Currency</span>
                        <span className="text-[16px] text-white font-mono uppercase">1000 from USD</span>
                    </h1>
                    <p className="text-[12px] font-mono text-neutral-200 uppercase">8 pairs</p>
                </div>

                <div>
                    {allowedCurrencies.slice(0, spliceAmount).map((currency, index) => (
                        <div className="flex items-center justify-between p-3 bg-neutral-600 mb-4 rounded-2xl" key={index}>
                            <div className="flex items-center gap-2">
                                <img src={COUNTRIES.find((country) => country.code === currency.quote)?.flag} alt="flag" className="w-5 h-5 " />
                                <div className="flex flex-col">
                                    <p className="text-[14px] text-white font-mono uppercase">{currency.quote}</p>
                                    <p className="text-[12px] text-neutral-200 font-mono">{COUNTRIES.find((country) => country.code === currency.quote)?.name}</p>
                                </div>
                            </div>
                            <div>
                                <div className="flex flex-col justify-end">
                                    <p className="text-[16px] font-mono text-white">{(currency.rate * 1000).toFixed(2)}</p>
                                    <p className="text-[10px] text-neutral-200 font-mono w-full text-end">@ {currency.rate}</p>
                                </div>
                                <div>


                                </div>
                            </div>
                        </div>
                    ))}

                    <span className="text-xs font-mono text-lime my-3"
                        onClick={() => setSpliceAmount((prev) => prev + 8)}
                    >Show more</span>
                </div>
            </section>
        </>
    )
}

export default Compare