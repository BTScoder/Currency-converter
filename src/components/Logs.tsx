import useLocalStorage from "../hooks/localStorage"
import type { Log } from "../types/types"
import { useLogContext } from "../contexts/LogsContext"
function Logs() {
    const { logs, removeLog, clearLogs } = useLogContext()

    const formatRelativeTime = (time: string) => {
        const diffMs = Date.now() - new Date(time).getTime();
        const diffSeconds = Math.floor(diffMs / 1000);
        const diffMinutes = Math.floor(diffSeconds / 60);
        const diffHours = Math.floor(diffMinutes / 60);
        const diffDays = Math.floor(diffHours / 24);

        if (diffMinutes < 1) return "now";

        if (diffMinutes < 60) return `${diffMinutes}M`;

        if (diffHours < 24) return `${diffHours}H`;

        return `${diffDays}D`;
    }

    return (
        <section className="bg-neutral-700 rounded-lg py-5 px-4 ">
            <div className="space-y-2.5 mb-5">
                <h1 className="text-[16px] text-white uppercase font-mono">Conversion Logs</h1>
                <div className="flex items-center justify-between">
                    <p className="text-neutral-50 font-mono uppercase text-[12px]">{logs.length} logged</p>
                    <button className="px-3 py-2 bg-neutral-600 border-2 border-neutral-400 uppercase font-mono text-neutral-50 rounded-lg text-[12px]" onClick={() => clearLogs()}>
                        Clear all
                    </button>
                </div>
            </div>

            <div className="space-y-3">
                {logs.length === 0 ? (<p>No Logs Yet</p>) : (
                    logs.map((log: Log) => (
                        <div className="flex items-center justify-between bg-neutral-600 border-2 border-neutral-500 rounded-lg p-3"
                            key={log.id}
                        >
                            <div className="flex flex-col">
                                <p className="font-mono text-neutral-200 uppercase">{formatRelativeTime(log.time)}</p>
                                <p className="font-mono uppercase text-neutral-50">{log.from}<span className="text-neutral-200">→</span> {log.to}</p>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="flex flex-col items-start">
                                    <p className="font-mono tracking-[1px] text-neutral-100 text-[16px]">{log.amountSent?.toFixed(2)}</p>
                                    <p className="font-mono text-lime text-[16px]">{log.amountReceived?.toFixed(2)}</p>
                                </div>

                                <div className="px-2 py-2 border-2 border-neutral-500 bg-neutral-600 flex items-center justify-center rounded-lg "
                                    onClick={() => removeLog(log.id)}
                                >
                                    <img src="/images/icon-delete.svg" alt="delete-icon" className="w-[10.5] h-3" />
                                </div>
                            </div>
                        </div>
                    ))
                )}

            </div>
        </section>
    )
}

export default Logs