import { useState, useEffect } from "react"

export function useLocalStorage(key: string, initialValue: any) {
    const [value, setValue] = useState(() => {
        try {
            const saved = localStorage.getItem(key);
            return saved ? JSON.parse(saved) : initialValue
        } catch (error) {
            console.error("Error readind localStorage key:", key, error)
            return initialValue
        }
    })

    useEffect(() => {
        try {
            localStorage.setItem(key, JSON.stringify(value))
        } catch (error) {
            console.error("Error writing localStorage key:", key, error)
        }
    }, [key, value])

    return [value, setValue]

}

export default useLocalStorage;