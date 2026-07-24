export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 p-4">
      <div className="flex w-full max-w-3xl h-96 shadow-lg rounded-lg overflow-hidden">
        {/* Left Section - Form Skeleton */}
        <div className="flex-1 bg-white flex flex-col items-center justify-center p-10 relative">
          {/* Logo Skeleton */}
          <div className="absolute top-5 left-5 w-16 h-16 bg-gradient-to-r from-slate-200 to-slate-300 rounded animate-pulse" />

          <div className="w-full">
            {/* Title Skeleton */}
            <div className="text-center mb-8">
              <div className="h-6 bg-gradient-to-r from-slate-200 to-slate-300 rounded w-24 mx-auto animate-pulse" />
            </div>

            {/* Form Fields Skeleton */}
            <div className="space-y-4">
              {/* Username Field */}
              <div>
                <div className="h-4 bg-gradient-to-r from-slate-200 to-slate-300 rounded w-20 mb-2 animate-pulse" />
                <div className="h-10 bg-gradient-to-r from-slate-100 to-slate-200 rounded animate-pulse" />
              </div>

              {/* Password Field */}
              <div>
                <div className="h-4 bg-gradient-to-r from-slate-200 to-slate-300 rounded w-20 mb-2 animate-pulse" />
                <div className="h-10 bg-gradient-to-r from-slate-100 to-slate-200 rounded animate-pulse" />
              </div>
            </div>

            {/* Buttons Skeleton */}
            <div className="mt-6 space-y-3">
              <div className="h-10 bg-gradient-to-r from-slate-200 to-slate-300 rounded animate-pulse" />
              <div className="h-10 bg-gradient-to-r from-slate-200 to-slate-300 rounded animate-pulse" />
            </div>
          </div>
        </div>

        {/* Right Section - Slogan Skeleton */}
        <div className="flex-1 bg-gradient-to-br from-slate-300 to-slate-400 flex flex-col items-center justify-start p-10 pt-16">
          {/* Heading Skeleton */}
          <div className="text-center mb-6">
            <div className="h-8 bg-slate-200 rounded w-48 mx-auto mb-4 animate-pulse" />
            <div className="h-4 bg-slate-200 rounded w-full mb-2 animate-pulse" />
            <div className="h-4 bg-slate-200 rounded w-5/6 animate-pulse" />
          </div>

          {/* Thumbnail Skeleton */}
          <div className="mt-auto mb-4 w-full flex justify-center">
            <div className="w-32 h-32 bg-slate-200 rounded animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}
