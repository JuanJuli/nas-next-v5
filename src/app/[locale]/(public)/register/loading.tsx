export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 p-4">
      <div className="flex w-full max-w-3xl shadow-lg rounded-lg overflow-hidden">
        <div className="flex-1 bg-white flex flex-col items-center justify-center p-10">
          <div className="w-full space-y-6">
            <div className="text-center mb-2">
              <div className="h-6 bg-gradient-to-r from-slate-200 to-slate-300 rounded w-32 mx-auto animate-pulse" />
            </div>
            <div className="text-center mb-6">
              <div className="h-4 bg-gradient-to-r from-slate-200 to-slate-300 rounded w-56 mx-auto animate-pulse" />
            </div>
            <div className="space-y-4">
              {[...Array(6)].map((_, i) => (
                <div key={i}>
                  <div className="h-4 bg-gradient-to-r from-slate-200 to-slate-300 rounded w-24 mb-2 animate-pulse" />
                  <div className="h-10 bg-gradient-to-r from-slate-100 to-slate-200 rounded animate-pulse" />
                </div>
              ))}
            </div>
            <div className="mt-6">
              <div className="h-10 bg-gradient-to-r from-slate-200 to-slate-300 rounded animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
