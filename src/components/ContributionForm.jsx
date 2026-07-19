import { useState } from "react";

function ContributionForm({ goals, onAddContribution, statusMessage }) {
  const [selectedGoalId, setSelectedGoalId] = useState(goals[0]?.id ?? "");
  const [amount, setAmount] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    const numericAmount = Number(amount);

    if (!selectedGoalId) {
      setErrorMessage("Select a savings goal.");
      return;
    }

    if (!Number.isFinite(numericAmount) || numericAmount <= 0) {
      setErrorMessage("Enter an amount greater than £0.");
      return;
    }

    onAddContribution(Number(selectedGoalId), numericAmount);
    setAmount("");
    setErrorMessage("");
  }

  return (
    <section className="contribution-panel" aria-labelledby="contribution-title">
      <p className="eyebrow">Add progress</p>
      <h2 id="contribution-title">New contribution</h2>
      <p className="panel-copy">
        Select a goal and record the amount you have saved today.
      </p>

      <form onSubmit={handleSubmit}>
        <label htmlFor="goal">Savings goal</label>
        <select
          id="goal"
          value={selectedGoalId}
          onChange={(event) => setSelectedGoalId(event.target.value)}
        >
          {goals.map((goal) => (
            <option key={goal.id} value={goal.id}>
              {goal.title}
            </option>
          ))}
        </select>

        <label htmlFor="amount">Contribution amount</label>
        <div className="money-input">
          <span>£</span>
          <input
            id="amount"
            type="number"
            min="0.01"
            step="0.01"
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
            placeholder="50.00"
          />
        </div>

        {errorMessage && <p className="form-message error">{errorMessage}</p>}

        <button type="submit">Add contribution</button>
      </form>

      <p className="form-message" aria-live="polite">
        {statusMessage}
      </p>
    </section>
  );
}

export default ContributionForm;
