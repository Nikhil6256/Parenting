export default function AuthLoading() {
  return (
    <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="card p-8 md:p-10 animate-pulse">
          {/* Logo skeleton */}
          <div className="flex flex-col items-center mb-8 gap-3">
            <div className="w-14 h-14 bg-sage-100 rounded-2xl" />
            <div className="h-6 w-36 bg-sage-100 rounded-lg" />
            <div className="h-4 w-48 bg-sage-50 rounded-lg" />
          </div>
          {/* Field skeletons */}
          <div className="space-y-4">
            <div className="h-12 bg-sage-50 rounded-xl" />
            <div className="h-12 bg-sage-50 rounded-xl" />
            <div className="h-12 bg-sage-200 rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  );
}
