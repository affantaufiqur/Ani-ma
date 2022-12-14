export default function LoadingIndicator() {
  return (
    <div className="flex items-center justify-center space-x-2">
      <div className="h-4 w-4 animate-pulse rounded-full bg-port-gore-400"></div>
      <div className="h-4 w-4 animate-pulse rounded-full bg-port-gore-400"></div>
      <div className="h-4 w-4 animate-pulse rounded-full bg-port-gore-400"></div>
    </div>
  )
}
