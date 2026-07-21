import { useContext, createContext } from "react"
import useLocalStorage from "../hooks/localStorage"
import type { Log } from "../types/types"

interface LogContextType {
    logs: Log[]
    setLogs: React.Dispatch<React.SetStateAction<Log[]>>
    clearLogs: () => void
    addNewLog: (newLog: Log) => void
    removeLog: (id: string) => void
}

const LogContext = createContext<LogContextType | undefined>(undefined)

export const useLogContext = () => {
    const ctx = useContext(LogContext)
    if (!ctx) throw new Error("useContext must be used within a ContextProvider")
    return ctx
}

export function LogsProvider({ children }: { children: React.ReactNode }) {
    const [logs, setLogs] = useLocalStorage("logs", [])

    const clearLogs = () => {
        setLogs([])
    }

    const addNewLog = (newLog: Log) => {
        setLogs((prev: Log[]) => [...prev, newLog])
    }

    const removeLog = (id: string) => {
        const updatedLogs = logs.filter((log: Log) => log.id !== id)
        setLogs(updatedLogs)
    }
    return (
        <LogContext.Provider value={{ logs, setLogs, clearLogs, addNewLog, removeLog }}>
            {children}
        </LogContext.Provider>
    )
}

