import { useState } from "react";
import Header from "./components/Header.jsx";
import SummaryCard from "./components/SummaryCard.jsx";
import ContributionForm from "./components/ContributionForm.jsx";
import GoalCard from "./components/GoalCard.jsx";
import MoneyTip from "./components/MoneyTip.jsx";

const initialGoals = [
  {
    id: 1,
    title: "Emergency Fund",
    description: "Build a financial cushion for unexpected costs.",
    saved: 1250,
    target: 3000,
  },
  {
    id: 2,
    title: "Holiday Fund",
    description: "Save gradually for travel without using credit.",
    saved: 640,
    target: 1800,
  },
  {
    id: 3,
    title: "New Laptop",
    description: "Put money aside for a reliable work laptop.",
    saved: 420,
    target: 1200,
  },
];

const moneyTips = [
  "Automate a transfer on payday so saving happens before spending.",
  "Review subscriptions monthly and redirect unused money to a goal.",
  "Break large targets into smaller weekly amounts.",
];

function App() {
  // React state stores the current savings goals.
  const [goals, setGoals] = useState(initialGoals);
  const [statusMessage, setStatusMessage] = useState(
    "Choose a goal and add your next contribution.",
  );

  // Derived values are recalculated whenever the goals state changes.
  const totalSaved = goals.reduce((total, goal) => total + goal.saved, 0);
  const totalTarget = goals.reduce((total, goal) => total + goal.target, 0);
  const overallProgress = Math.min(
    Math.round((totalSaved / totalTarget) * 100),
    100,
  );

  function handleAddContribution(goalId, amount) {
    const selectedGoal = goals.find((goal) => goal.id === goalId);

    if (!selectedGoal) {
      setStatusMessage("Please select a valid savings goal.");
      return;
    }

    // Update only the selected goal while leaving the others unchanged.
    setGoals((currentGoals) =>
      currentGoals.map((goal) =>
        goal.id === goalId
          ? { ...goal, saved: goal.saved + amount }
          : goal,
      ),
    );

    setStatusMessage(
      `£${amount.toFixed(2)} added to ${selectedGoal.title}.`,
    );
  }

  return (
    <div className="app-shell">
      <Header
        title="Money Builder"
        subtitle="Small contributions. Clear goals. Better habits."
      />

      <main className="page-container">
        <section className="hero-section" aria-labelledby="dashboard-title">
          <div>
            <p className="eyebrow">Savings dashboard</p>
            <h1 id="dashboard-title">Build your money goals one step at a time.</h1>
            <p className="hero-copy">
              Track several savings goals and add contributions using a simple
              React interface.
            </p>
          </div>

          <SummaryCard
            totalSaved={totalSaved}
            totalTarget={totalTarget}
            progress={overallProgress}
          />
        </section>

        <section className="workspace-grid">
          <ContributionForm
            goals={goals}
            onAddContribution={handleAddContribution}
            statusMessage={statusMessage}
          />

          <section className="goals-panel" aria-labelledby="goals-title">
            <div className="section-heading">
              <div>
                <p className="eyebrow">Your plan</p>
                <h2 id="goals-title">Savings goals</h2>
              </div>
              <span>{goals.length} active goals</span>
            </div>

            <div className="goals-grid">
              {goals.map((goal) => (
                <GoalCard key={goal.id} goal={goal} />
              ))}
            </div>
          </section>
        </section>

        <section className="tips-section" aria-labelledby="tips-title">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Build the habit</p>
              <h2 id="tips-title">Money-building tips</h2>
            </div>
          </div>

          <div className="tips-grid">
            {moneyTips.map((tip, index) => (
              <MoneyTip key={tip} number={index + 1} text={tip} />
            ))}
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <p>Money Builder — React and Vite learning project.</p>
      </footer>
    </div>
  );
}

export default App;
