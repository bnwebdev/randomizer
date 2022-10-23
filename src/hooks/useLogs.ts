import { useCallback, useState } from "react"

export const useLogs = (limitLogs: number) => {
    const [logs, setLogs] = useState<Array<{id: string, text: string, context: Record<string, any>}>>([])

    const pushLog = useCallback((newLog: string, context: Record<string, any> = {}) => {
        setLogs((prev) => [...prev, { 
            text: newLog, 
            id: Math.random().toString(32) + Date.now(),
            context
        }].slice(-limitLogs))
    }, [limitLogs])
    return {
        pushLog,
        logs
    }
}