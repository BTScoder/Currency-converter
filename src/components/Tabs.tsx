import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

import History from "./History"
import Compare from "./Compare"
import Favorites from "./Favorites"
import Logs from "./Logs"
function Tabs() {
    const dropdownRef = useRef<HTMLDivElement>(null)
    const [activeTab, setActiveTab] = useState<"history" | "compare" | "favorites" | "logs">("compare")
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        if (!isOpen) return;

        function handleClickOutside(e: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setIsOpen(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)

        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [isOpen])

    return (
        <section className="">
            <div className="p-3 relative bg-neutral-600 border-2 border-neutral-500 rounded-lg flex items-center justify-between mb-4" onClick={() => setIsOpen(!isOpen)}
                ref={dropdownRef}>
                <p className="text-white uppercase font-mono">{activeTab}</p>

                <span>
                    <img src="/images/icon-chevron-down.svg" alt="" />
                </span>
            </div>
            {/* Dropdown Menu */}
            <AnimatePresence>


                {isOpen && (
                    <motion.div className="bg-neutral-600 absolute left-3 right-3 mt-5 top-full w-auto rounded-lg "
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                    >
                        <p className="text-white uppercase font-mono hover:bg-lime p-3" onClick={() => setActiveTab("history")}>History</p>
                        <p className="text-white uppercase font-mono hover:bg-lime p-3" onClick={() => setActiveTab("compare")}>Compare</p>
                        <p className="text-white uppercase font-mono hover:bg-lime p-3" onClick={() => setActiveTab("favorites")}>Favorites</p>
                        <p className="text-white uppercase font-mono hover:bg-lime p-3" onClick={() => setActiveTab("logs")}>Logs</p>
                    </motion.div>
                )}
            </AnimatePresence>


            {/* View Content */}
            <div>
                {activeTab === "history" && <History />}
                {activeTab === "compare" && <Compare />}
                {activeTab === "favorites" && <Favorites />}
                {activeTab === "logs" && <Logs />}
            </div>
        </section>
    )
}

export default Tabs