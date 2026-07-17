import { useEffect, useState } from "react"
import useLocalStorage from "../hooks/localStorage"
import type { Favourite } from "../types/types"
import { useCurrencyContext } from "../contexts/CurrencyContext"

function Favorites() {
    const [favourite, setFavourite] = useLocalStorage("favourite", [])
    const [changes, setChanges] = useState<any[]>([])
    const { fetchHistoricalRates } = useCurrencyContext()
    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(today.getDate() - 1)

    useEffect(() => {
        async function loadChanges() {
            const changes = await Promise.all(favourite.map(async (fav: Favourite) => {
                const historicalRates = await fetchHistoricalRates(yesterday.toISOString().split("T")[0], fav.base, fav.quote)
                return historicalRates
            }))
            setChanges(changes)
        }

        loadChanges()
    }, [favourite])

    // const handleFavourite = (date: string, baseCurrency: string, quoteCurrency: string, rate: number) => {

    //     const updatedFavourites = favourite.filter((fav: { base: string; quote: string }) => !(fav.base === baseCurrency && fav.quote === quoteCurrency))
    //         setFavourite(updatedFavourites)
    //         return
    //     }
    // }


    const removeFavourite = (baseCurrency: string, quoteCurrency: string) => {
        const updatedFavourites = favourite.filter((fav: { base: string; quote: string }) => !(fav.base === baseCurrency && fav.quote === quoteCurrency))
        setFavourite(updatedFavourites)
    }

    return (
        <section className="bg-neutral-600 rounded-lg p-4 space-y-4">
            <div className="flex items-center justify-between">
                <p className="text-[16px] uppercase font-mono text-white">Pinned pairs</p>
                <p className="text-neutral-50 uppercase font-mono text-[12px]">10 favorites</p>
            </div>

            <div className="space-y-3">

                {changes.map((fav: Favourite[], index: number) => {
                    const change = ((fav[0].rate - fav[1].rate) / fav[1].rate * 100).toFixed(2)
                    return (
                        <div className="flex items-center justify-between p-3 bg-neutral-500 rounded-lg"
                            key={`${fav[1].base}-${fav[1].quote}`}
                            onClick={() => removeFavourite(fav[1].base, fav[1].quote)}
                        >
                            <div className="flex items-center gap-1">
                                <p className="text-neutral-50 text-[14px] font-mono">{fav[1].base}</p>
                                <span className="text-neutral-50 text-[14px]">→</span>
                                <p className="text-neutral-50 text-[14px] font-mono">{fav[1].quote}</p>
                            </div>
                            <div className="flex items-center gap-5">
                                <div className="flex flex-col ">
                                    <p className="text-[16px] text-neutral-50 font-mono">{fav[1].rate.toFixed(2)}</p>
                                    <p className="text-green text-[10px] font-mono">+{change}</p>
                                </div>
                                <div className="border-2 border-lime p-2 rounded-lg cursor-pointer">
                                    <img src="/images/icon-star-filled.svg" alt="star"

                                    />
                                </div>
                            </div>
                        </div>
                    )

                })}
            </div>

        </section>
    )
}

export default Favorites