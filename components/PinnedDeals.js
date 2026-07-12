import DealCard from './DealCard';

export default function PinnedDeals({ deals }) {
  if (!deals || deals.length === 0) return null;

  return (
    <section className="pinned-section">
      <div className="pinned-header">
        <span className="pinned-icon">📌</span>
        <h2 className="pinned-title">Featured Deals</h2>
        <div className="pinned-line" />
      </div>
      <div className="deals-grid">
        {deals.map((deal) => (
          <DealCard key={deal.id} deal={deal} />
        ))}
      </div>
    </section>
  );
}
