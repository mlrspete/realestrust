function CopyBlock() {
  return (
    <section className="hero-copy" id="deck">
      <div className="hero-copy__inner">
        <div className="hero-copy__header">
          <p className="hero-kicker">
            <span className="hero-kicker__rule" aria-hidden="true" />
            <span className="hero-kicker__text">REAL RUST / CAMPAIGN SURFACES</span>
          </p>
          <h1 className="hero-title">Put your brand on the map.</h1>
        </div>
        <p className="hero-deck">
          World-native placements, custom campaign surfaces, and premium
          activations built for selected Rust communities.
        </p>
        <div className="hero-actions" aria-label="Primary actions">
          <a className="hero-action hero-action--primary" href="#placements">
            <span className="hero-action__label">Explore placements</span>
          </a>
          <a className="hero-action hero-action--secondary" href="#deck">
            <span className="hero-action__label">See the deck</span>
          </a>
        </div>
      </div>
    </section>
  );
}

export default CopyBlock;
