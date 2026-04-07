import BoardAnnotation from "./BoardAnnotation.jsx";

function toPercent(value, total) {
  return `${(value / total) * 100}%`;
}

const defaultParallaxDepthByRole = {
  base: 0.12,
  proof: 0.24,
  support: 0.22,
  detail: 0.18,
  target: 0.12,
  annotation: 0.08,
  note: 0.34,
  prop: 0.3,
  accent3d: 0.18,
};

function createItemStyle(item, boardSize) {
  const style = {
    left: toPercent(item.x, boardSize.width),
    top: toPercent(item.y, boardSize.height),
    width: toPercent(item.width, boardSize.width),
    height: toPercent(item.height, boardSize.height),
    opacity: item.opacity ?? 1,
    transform: `rotate(${item.rotation ?? 0}deg)`,
    "--item-radius": item.radius ?? "0px",
  };

  if (item.zIndex !== undefined) {
    style.zIndex = item.zIndex;
  }

  if (item.blendMode) {
    style.mixBlendMode = item.blendMode;
  }

  return style;
}

function renderAsset(item) {
  return (
    <img
      src={item.asset}
      alt={item.alt ?? ""}
      draggable="false"
      decoding={item.decoding ?? "async"}
      loading={item.loading}
      fetchPriority={item.fetchPriority}
      style={{
        objectFit: item.fit ?? "cover",
        objectPosition: item.objectPosition ?? "50% 50%",
      }}
    />
  );
}

function BoardLayer({ band, items, boardSize }) {
  return (
    <div className={`board-layer board-layer--${band}`} data-band={band}>
      {items.map((item) => {
        const style = createItemStyle(item, boardSize);
        const parallaxDepth =
          item.parallaxDepth ?? defaultParallaxDepthByRole[item.role] ?? 0.1;
        const classes = [
          "board-item",
          `board-item--${item.role}`,
          `board-item--${item.kind}`,
          item.className,
        ]
          .filter(Boolean)
          .join(" ");

        if (item.kind === "label") {
          return (
            <div
              className={classes}
              key={item.id}
              style={style}
              data-item-id={item.id}
              data-item-kind={item.kind}
              data-item-role={item.role}
              data-parallax-depth={parallaxDepth}
            >
              <img src={item.asset} alt="" aria-hidden="true" draggable="false" />
              <span>{item.text}</span>
            </div>
          );
        }

        if (item.kind === "note") {
          return (
            <figure
              className={classes}
              key={item.id}
              style={style}
              data-item-id={item.id}
              data-item-kind={item.kind}
              data-item-role={item.role}
              data-parallax-depth={parallaxDepth}
            >
              {renderAsset(item)}
              <figcaption className="board-note-copy">
                <span className="board-note-copy__kicker">{item.lines?.[0]}</span>
                <span className="board-note-copy__body">{item.lines?.[1]}</span>
              </figcaption>
            </figure>
          );
        }

        if (item.kind === "target") {
          return (
            <div
              className={classes}
              key={item.id}
              style={style}
              aria-hidden="true"
              data-item-id={item.id}
              data-item-kind={item.kind}
              data-item-role={item.role}
              data-parallax-depth={parallaxDepth}
            >
              <span className="board-target__halo" />
              <span className="board-target__pulse" />
              <span className="board-target__dot" />
            </div>
          );
        }

        if (item.kind === "annotation") {
          return (
            <figure
              className={classes}
              key={item.id}
              style={style}
              data-item-id={item.id}
              data-item-kind={item.kind}
              data-item-role={item.role}
              data-annotation-type={item.annotationType}
              data-parallax-depth={parallaxDepth}
              aria-hidden="true"
            >
              <BoardAnnotation type={item.annotationType} />
            </figure>
          );
        }

        return (
          <figure
            className={classes}
            key={item.id}
            style={style}
            data-item-id={item.id}
            data-item-kind={item.kind}
            data-item-role={item.role}
            data-parallax-depth={parallaxDepth}
          >
            {renderAsset(item)}
          </figure>
        );
      })}
    </div>
  );
}

export default BoardLayer;
