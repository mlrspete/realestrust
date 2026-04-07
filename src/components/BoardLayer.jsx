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

  if (item.color) {
    style.color = item.color;
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

function getItemProps(item, parallaxDepth) {
  return {
    "data-item-id": item.id,
    "data-item-kind": item.kind,
    "data-item-role": item.role,
    "data-parallax-depth": parallaxDepth,
  };
}

function splitSlashRow(row) {
  if (typeof row !== "string" || !row.includes(" / ")) {
    return { lead: row, trail: "" };
  }

  const [lead, ...rest] = row.split(" / ");

  return {
    lead,
    trail: rest.join(" / "),
  };
}

function BoardLayer({ band, items, boardSize }) {
  return (
    <div className={`board-layer board-layer--${band}`} data-band={band}>
      {items.map((item) => {
        const style = createItemStyle(item, boardSize);
        const parallaxDepth =
          item.parallaxDepth ?? defaultParallaxDepthByRole[item.role] ?? 0.1;
        const itemProps = getItemProps(item, parallaxDepth);
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
              {...itemProps}
            >
              <img src={item.asset} alt="" aria-hidden="true" draggable="false" />
              <span className="board-label__text">{item.text}</span>
            </div>
          );
        }

        if (item.kind === "text") {
          return (
            <div className={classes} key={item.id} style={style} {...itemProps}>
              <span className="board-text__content">{item.text}</span>
            </div>
          );
        }

        if (item.kind === "note") {
          return (
            <figure
              className={classes}
              key={item.id}
              style={style}
              {...itemProps}
            >
              {renderAsset(item)}
              <figcaption className="board-note-copy">
                <span className="board-note-copy__kicker">{item.lines?.[0]}</span>
                <span className="board-note-copy__body">{item.lines?.[1]}</span>
              </figcaption>
            </figure>
          );
        }

        if (item.kind === "surfaceStrip") {
          return (
            <article className={classes} key={item.id} style={style} {...itemProps}>
              <div className="board-surface-strip-copy">
                <div className="board-surface-strip-copy__main">
                  <span className="board-surface-strip-copy__kicker">
                    {item.content?.kicker}
                  </span>
                  <span className="board-surface-strip-copy__title">
                    {item.content?.title}
                  </span>
                </div>
                <div className="board-surface-strip-copy__meta">
                  <div className="board-surface-strip-copy__chips">
                    {item.content?.chips?.map((chip, index) => (
                      <span className="board-surface-strip-copy__chip-group" key={chip}>
                        {index > 0 ? (
                          <span className="board-surface-strip-copy__divider">/</span>
                        ) : null}
                        <span className="board-surface-strip-copy__chip">{chip}</span>
                      </span>
                    ))}
                  </div>
                  <span className="board-surface-strip-copy__footer">
                    {item.content?.footer}
                  </span>
                </div>
              </div>
            </article>
          );
        }

        if (item.kind === "checklist") {
          return (
            <figure className={classes} key={item.id} style={style} {...itemProps}>
              {item.asset ? renderAsset(item) : null}
              <figcaption className="board-checklist-copy">
                <span className="board-checklist-copy__heading">
                  {item.content?.heading}
                </span>
                <ul className="board-checklist-copy__items">
                  {item.content?.items?.map((entry) => (
                    <li className="board-checklist-copy__item" key={entry}>
                      <span className="board-checklist-copy__tick" aria-hidden="true" />
                      <span className="board-checklist-copy__text">{entry}</span>
                    </li>
                  ))}
                </ul>
              </figcaption>
            </figure>
          );
        }

        if (item.kind === "fileCard") {
          return (
            <figure className={classes} key={item.id} style={style} {...itemProps}>
              {item.asset ? renderAsset(item) : null}
              <figcaption className="board-file-card-copy">
                <span className="board-file-card-copy__kicker">
                  {item.content?.kicker}
                </span>
                <span className="board-file-card-copy__title">
                  {item.content?.title}
                </span>
                <div className="board-file-card-copy__rows">
                  {item.content?.rows?.map((row) => {
                    const parts = splitSlashRow(row);

                    return (
                      <div className="board-file-card-copy__row" key={row}>
                        <span className="board-file-card-copy__row-lead">
                          {parts.lead}
                        </span>
                        <span className="board-file-card-copy__row-divider">/</span>
                        <span className="board-file-card-copy__row-trail">
                          {parts.trail}
                        </span>
                      </div>
                    );
                  })}
                </div>
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
              {...itemProps}
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
              data-annotation-type={item.annotationType}
              {...itemProps}
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
            {...itemProps}
          >
            {renderAsset(item)}
          </figure>
        );
      })}
    </div>
  );
}

export default BoardLayer;
