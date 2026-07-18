function formatCurrency(amount) {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    maximumFractionDigits: 0,
  }).format(amount);
}

function SummaryCard({ totalSaved, totalTarget, progress }) {
  return (
    <article className="summary-card">
      <p>Total saved</p>
      <strong>{formatCurrency(totalSaved)}</strong>
      <span>of {formatCurrency(totalTarget)} combined target</span>

      <div
        className="progress-track"
        role="progressbar"
        aria-label="Overall savings progress"
        aria-valuemin="0"
        aria-valuemax="100"
        aria-valuenow={progress}
      >
        <div className="progress-fill" style={{ width: `${progress}%` }} />
      </div>

      <small>{progress}% complete</small>
    </article>
  );
}

export default SummaryCard;
