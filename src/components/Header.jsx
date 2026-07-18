function Header({ title, subtitle }) {
  return (
    <header className="site-header">
      <div className="header-inner">
        <a className="brand" href="#top" aria-label="Money Builder home">
          <span className="brand-mark">£</span>
          <span>{title}</span>
        </a>

        <p>{subtitle}</p>
      </div>
    </header>
  );
}

export default Header;
