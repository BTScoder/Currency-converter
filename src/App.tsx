import { useEffect, useState } from "react"
import type { Currency, Favourite } from "./types/types"
import useLocalStorage from "./hooks/localStorage"
import { useCurrencyContext } from "./contexts/CurrencyContext"
import { COUNTRIES } from "./countries"
import NavBar from "./components/NavBar"
import Dropdown from "./components/Dropdown"
import Tabs from "./components/Tabs"
import { AnimatePresence } from "framer-motion";
// import Star from "/images/icon-star.svg"

function App() {
  const { baseCurrency, setBaseCurrency, quoteCurrency, setQuoteCurrency } = useCurrencyContext();
  const [isSentOpen, setIsSentOpen] = useState(false);
  const [isReceivedOpen, setIsReceivedOpen] = useState(false);
  const [baseAmount, setBaseAmount] = useState<number>(0.00)
  const [quoteAmount, setQuoteAmount] = useState<number>(0.00)
  const [lastEdited, setLastEdited] = useState<"to" | "from">("from")
  const [favourite, setFavourite] = useLocalStorage("favourite", [])
  const isAlreadyFavourite = favourite.some((fav: Favourite) => fav.base === baseCurrency && fav.quote === quoteCurrency)

  async function fetchRates() {
    let calculatedAmount: number;
    if (!quoteCurrency && !baseCurrency) return;
    const res = await fetch(`https://api.frankfurter.dev/v2/rates?base=${baseCurrency} `)
    const data = await res.json();
    // console.log(data)
    const quoteCurrencySelected = data.find((d: Currency) => d.quote === quoteCurrency)
    if (lastEdited === "from") {
      calculatedAmount = Number((baseAmount * quoteCurrencySelected.rate).toFixed(2))
      setQuoteAmount(calculatedAmount)

    } else if (lastEdited === "to") {
      calculatedAmount = Number((quoteAmount / quoteCurrencySelected.rate).toFixed(2))
      setBaseAmount(calculatedAmount)

    } else {
      return
    }
  }

  useEffect(() => {
    fetchRates()
  }, [quoteCurrency, baseCurrency, baseAmount, quoteAmount])

  const swapCurrencies = () => {
    setQuoteCurrency(baseCurrency)
    setBaseCurrency(quoteCurrency)
  }

  const handleFavourites = () => {


    if (isAlreadyFavourite) {
      const updatedFqavourites = favourite.filter((fav: Favourite) => !(fav.base === baseCurrency && fav.quote === quoteCurrency))
      setFavourite(updatedFqavourites)
      return
    };

    const newFavorite = {
      base: baseCurrency,
      quote: quoteCurrency,
      rate: quoteAmount / baseAmount
    }

    setFavourite([...favourite, newFavorite])

  }

  return (
    <>
      <section className="bg-neutral-900 min-h-screen ">
        <NavBar />

        <main className="px-4 py-8">
          <h1 className="text-[20px] uppercase text-white font-mono leading-6 mb-4">Check the rate</h1>
          {/* Send and Receive Section */}
          <section className="bg-neutral-700 p-4 space-y-4">
            <div className="p-4 bg-neutral-600 border-2 border-neutral-500 rounded-2xl relative">
              <h1 className="text-[20px] uppercase text-white font-mono mb-5">Send</h1>
              <div className="flex items-center justify-between ">
                <form>
                  <input type="number" className="text-white w-29.5 outline-0 text-[32px] font-mono " placeholder="0.00" value={baseAmount} onChange={(e) => {
                    setLastEdited("from")
                    setBaseAmount(Number(e.target.value))
                  }} />
                </form>


                <div className=" bg-neutral-600 border-2 border-neutral-500 rounded-2xl p-2.5 cursor-pointer"
                  onClick={() => setIsSentOpen(!isSentOpen)}
                >
                  <div className="flex items-center gap-2">

                    <img src={COUNTRIES.find((country) => country.code === baseCurrency)?.flag} alt="flag" className="w-5 h-5" />
                    <p className="font-mono text-white uppercase">{baseCurrency}</p>
                    <img src="/images/icon-chevron-down.svg" alt="chevron-down" />
                  </div>

                </div>

                {/* DropDown Menu */}
                <AnimatePresence mode="wait">
                  {isSentOpen && <Dropdown onSelect={(countryCode) => {
                    setBaseCurrency(countryCode)
                    setIsSentOpen(false)
                  }} />}
                </AnimatePresence>
              </div>
            </div>

            {/* Swap Button */}
            <div className="h-12 w-12 bg-neutral-600 border-2 border-neutral-500 rounded-2xl mx-auto flex items-center justify-center"
              onClick={() => swapCurrencies()}
            >
              <img src="/images/icon-exchange-vertical.svg" alt="exchange-icon" />
            </div>

            {/* Receive Div */}
            <div className="p-4 bg-neutral-600 border-2 border-neutral-500 rounded-2xl relative">
              <h1 className="text-[20px] uppercase text-white font-mono mb-5">Receive</h1>
              <div className="flex items-center justify-between">
                <form>
                  <input type="number" className="text-lime w-29.5 outline-0 text-[32px] font-mono " placeholder="0.00" value={quoteAmount} onChange={(e) => {
                    setLastEdited("to")
                    setQuoteAmount(Number(e.target.value))
                  }} />
                </form>
                <div className="flex items-center gap-2 bg-neutral-600 border-2 border-neutral-500 rounded-2xl p-2.5"
                  onClick={() => setIsReceivedOpen(!isReceivedOpen)}
                >
                  <img src={COUNTRIES.find((country) => country.code === quoteCurrency)?.flag} alt="flag" className="w-5 h-5" />
                  <p className="font-mono text-white uppercase">{quoteCurrency}</p>
                  <img src="/images/icon-chevron-down.svg" alt="chevron-down" />
                </div>
              </div>
              {/* Dropdown Menu */}
              <AnimatePresence mode="wait">
                {isReceivedOpen && <Dropdown onSelect={(countryCode) => {
                  setQuoteCurrency(countryCode)
                  setIsReceivedOpen(false)
                }} />}
              </AnimatePresence>
            </div>
          </section>
          {/* Favourite and Log Conversion Buttons */}
          <section className="border-t border-dotted border-neutral-500 bg-neutral-600 rounded-b-2xl p-4 space-y-4 mb-10">
            <p className="text-center text-white font-mono text-[10px]">1 USD = 0.85 EUR</p>
            <div className="flex items-center justify-center gap-4 ">
              <button className="px-3 rounded-2xl py-2 bg-neutral-600 text-neutral-200 uppercase font-mono flex items-center gap-2 border-2 border-neutral-200"
                onClick={handleFavourites}
              >
                {/* <Star /> */}
                Favourite
              </button>
              <button className="px-3 py-2 border-2 border-lime rounded-2xl text-white  uppercase font-mono">
                Log Conversion
              </button>
            </div>
          </section>

          {/* Tabs section */}
          <Tabs />
        </main>
      </section>
    </>
  )
}

export default App
