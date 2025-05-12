
export interface StoreCardProps {
    id: number
    image: string
    storeName: string
    score: number
}

export function StoreCard({image, storeName, score}: StoreCardProps) {

    return (
        <>
            <div className="overflow-hidden bg-gray-700 rounded-2xl">
                <div className="relative">
                    <img src={image || "/vite.svg"} alt={storeName} className="w-full h-40 object-cover"/>
                </div>
                <div className="p-3">
                    <h3 className="font-medium mb-1 text-sm text-white">{storeName}</h3>
                    <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center gap-1">
                            <span className={`w-2 h-2 rounded-full ${
                                score === 0 ? "bg-gray-500"
                                : score < 4 ? "bg-red-500"
                                : "bg-green-500"
                            }`}/>
                            <span className="text-xs text-white">{score}</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}