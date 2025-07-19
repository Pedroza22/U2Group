export default function LoadingGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
      {Array.from({ length: 15 }).map((_, i) => (
        <div
          key={i}
          className="bg-white/10 backdrop-blur-md rounded-2xl shadow-xl overflow-hidden animate-pulse border border-white/20"
        >
          <div className="h-48 bg-gradient-to-br from-gray-200/50 to-gray-300/50"></div>
          <div className="p-4 bg-gradient-to-br from-white/5 to-transparent">
            <div className="flex justify-between items-start mb-2">
              <div className="h-6 bg-gray-200/50 rounded-lg w-24"></div>
              <div className="text-right">
                <div className="h-3 bg-gray-200/50 rounded w-16 mb-1"></div>
                <div className="h-5 bg-gray-200/50 rounded w-20"></div>
              </div>
            </div>
            <div className="h-3 bg-gray-200/50 rounded w-20 mb-2"></div>
            <div className="grid grid-cols-5 gap-2">
              {Array.from({ length: 5 }).map((_, j) => (
                <div key={j} className="text-center">
                  <div className="h-4 bg-gray-200/50 rounded mb-1"></div>
                  <div className="h-3 bg-gray-200/50 rounded"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
