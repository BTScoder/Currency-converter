import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
// import {Star} from "/public/images/icon-star-filled.svg"
import type { Currency } from "../types/types"
import { useCurrencyContext } from "../contexts/CurrencyContext"
import useLocalStorage from "../hooks/localStorage"
import { COUNTRIES } from "../countries"
function Compare() {
    const [spliceAmount, setSpliceAmount] = useState(8)
    const { fetchRates, baseCurrency } = useCurrencyContext()
    const [rates, setRates] = useState<Currency[]>([])
    const allowedCodes = COUNTRIES.map(code => code.code)
    const allowedCurrencies = rates.filter(rate => allowedCodes.includes(rate.quote))
    const [favourite, setFavourite] = useLocalStorage("favourite", [])


    useEffect(() => {
        const getRates = async () => {
            const data = await fetchRates()
            setRates(data)
        }
        getRates()
    }, [baseCurrency])

    const checkIfFavourite = (baseCurrency: string, quoteCurrency: string) => {
        return favourite.some((fav: { base: string; quote: string }) => fav.base === baseCurrency && fav.quote === quoteCurrency)
    }

    const handleFavourite = (baseCurrency: string, quoteCurrency: string, rate: number) => {
        const isFavourite = favourite.some((fav: { base: string; quote: string }) => fav.base === baseCurrency && fav.quote === quoteCurrency)
        if (isFavourite) {
            const updatedFavourites = favourite.filter((fav: { base: string; quote: string }) => !(fav.base === baseCurrency && fav.quote === quoteCurrency))
            setFavourite(updatedFavourites)
            return
        }
        const newFavourite = {
            date: new Date().toISOString().split("T")[0],
            base: baseCurrency,
            quote: quoteCurrency,
            rate: rate
        }
        setFavourite([...favourite, newFavourite])
    }

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
                            <div className="flex items-center gap-3">
                                <div className="flex flex-col justify-end">
                                    <p className="text-[16px] font-mono text-white">{(currency.rate * 1000).toFixed(2)}</p>
                                    <p className="text-[10px] text-neutral-200 font-mono w-full text-end">@ {currency.rate}</p>
                                </div>
                                <div className="border-2 border-lime p-2 rounded-lg cursor-pointer"
                                    onClick={() => handleFavourite(currency.base, currency.quote, currency.rate)}
                                >
                                    <AnimatePresence mode="wait">
                                        {
                                            checkIfFavourite(currency.base, currency.quote) ? (
                                                <motion.img src="/images/icon-star-filled.svg" alt="star"
                                                    key="filled"
                                                    initial={{ scale: 0 }}
                                                    animate={{ scale: 1 }}
                                                    exit={{ scale: 0 }}
                                                />
                                            ) :
                                                (
                                                    <motion.img src="/images/icon-star.svg" alt="star"
                                                        key="empty"
                                                        initial={{ scale: 0 }}
                                                        animate={{ scale: 1 }}
                                                        exit={{ scale: 0 }}
                                                    />
                                                )
                                        }
                                    </AnimatePresence>


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