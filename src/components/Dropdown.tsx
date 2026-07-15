import { motion } from "framer-motion"
// import type { CountryOption } from "../countries";
import { COUNTRIES } from "../countries";
import { useMemo, useState } from "react";

type DropdownProps = {
    onSelect: (countryCode: string) => void
}

function Dropdown({ onSelect }: DropdownProps) {
    const [search, setSearch] = useState("")
    const filteredCountries = useMemo(() => {
        return COUNTRIES.filter((country) => country?.code.toLowerCase().includes(search.toLowerCase()))
    }, [search])

    const checkCountry = (countryCode: string) => {
        onSelect(countryCode)
    }
    return (
        <>
            {/* DropDown Menu */}

            <motion.div className="absolute z-10 p-2 h-114.5 overflow-y-auto top-full mt-2 rounded-2xl left-0 w-full bg-neutral-600 scrollbar-thumb-neutral-500 scrollbar-thin"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
            >
                <form className="mb-2.5">
                    <div className="p-3 border-2 border-neutral-200 rounded-2xl flex items-center gap-2">
                        <span><img src="/images/icon-search.svg" alt="search" className="h-5 w-5" /></span>
                        <input type="text" className="w-full outline-0 font-mono text-[12px] text-white" placeholder="Search currencies..." value={search} onChange={(e) => setSearch(e.target.value)} />
                    </div>
                </form>
                <div>
                    <h1 className="uppercase font-mono text-neutral-200 p-2 text-[12px] border-b border-neutral-500">Popular</h1>
                    <div>
                        {COUNTRIES.filter((country) => country.popular).map((country) => (
                            <div className="flex items-center justify-between px-2 py-3" key={country.code}
                                onClick={() => checkCountry(country.code)}
                            >
                                <div className="flex items-center gap-3">
                                    <img src={country.flag} alt="flag" className="h-5 w-5" />
                                    <p className="uppercase font-mono text-white">{country.code}</p>
                                    <p className="text-neutral-200 font-mono text-[12px]">{country.name}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <h1 className="uppercase font-mono text-neutral-200 p-2 text-[12px] border-b border-neutral-500">Other currencies</h1>

                    {filteredCountries.map((country) => (

                        <div className="flex items-center justify-between px-2 py-3"
                            onClick={() => checkCountry(country.code)}
                            key={country.code}
                        >
                            <div className="flex items-center gap-3">
                                <img src={country.flag} alt="flag" className="h-5 w-5" />
                                <p className="uppercase font-mono text-white">{country.code}</p>
                                <p className="text-neutral-200 font-mono text-[12px]">{country.name}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </motion.div>

        </>
    )
}

export default Dropdown