function formatCurrency(amount) {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    maximumFractionDigits: 0,
  }).format(amount);
}

function GoalCard({ goal }) {
  const progress = Math.min(Math.round((goal.saved / goal.target) * 100), 100);
  const remaining = Math.max(goal.target - goal.saved, 0);

  return (
    <article className="goal-card">
      <div className="goal-card-heading">
        <div>
          <h3>{goal.title}</h3>
          <p>{goal.description}</p>
        </div>
        <span>{progress}%</span>
      </div>

      <div
        className="progress-track progress-track-small"
        role="progressbar"
        aria-label={`${goal.title} progress`}
        aria-valuemin="0"
        aria-valuemax="100"
        aria-valuenow={progress}
      >
        <div className="progress-fill" style={{ width: `${progress}%` }} />
      </div>

      <div className="goal-figures">
        <div>
          <span>Saved</span>
          <strong>{formatCurrency(goal.saved)}</strong>
        </div>
        <div>
          <span>Remaining</span>
          <strong>{formatCurrency(remaining)}</strong>
        </div>
      </div>
    </article>
  );
}

export default GoalCard;
