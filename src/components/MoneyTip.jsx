function MoneyTip({ number, text }) {
  return (
    <article className="tip-card">
      <span>{String(number).padStart(2, "0")}</span>
      <p>{text}</p>
    </article>
  );
}

export default MoneyTip;
