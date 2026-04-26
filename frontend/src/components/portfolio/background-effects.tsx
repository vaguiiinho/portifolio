export function BackgroundEffects() {
  return (
    <div className="absolute inset-0 -z-10">
      {/* Gradient Orb */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />

      {/* Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.02] grid-pattern"
      />
    </div>
  )
}