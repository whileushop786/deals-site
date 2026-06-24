export default function SkeletonCard() {
  return (
    <div className="skeleton-card">
      <div className="skeleton-img skeleton" />
      <div className="skeleton-body">
        <div className="skeleton skeleton-line" />
        <div className="skeleton skeleton-line" />
        <div className="skeleton skeleton-line short" />
        <div className="skeleton skeleton-price" />
      </div>
    </div>
  );
}

export function SkeletonGrid() {
  return (
    <div className="deals-grid">
      {Array.from({ length: 8 }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}
