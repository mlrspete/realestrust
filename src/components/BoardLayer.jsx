import BoardAnnotation from "./BoardAnnotation.jsx";

function toPercent(value, total) {
  return `${(value / total) * 100}%`;
}

function toPixels(value) {
  return typeof value === "number" ? `${value}px` : value;
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
    opacity: item.opacity ?? 1,
    transform: `rotate(${item.rotation ?? 0}deg)`,
    "--item-radius": item.radius ?? "0px",
  };

  if (item.fitContent) {
    if (item.minWidth !== undefined) {
      style.minWidth = toPixels(item.minWidth);
    }

    if (item.maxWidth !== undefined) {
      style.maxWidth = toPixels(item.maxWidth);
    }

    if (item.minHeight !== undefined) {
      style.minHeight = toPixels(item.minHeight);
    }
  } else {
    style.width = toPercent(item.width, boardSize.width);
    style.height = toPercent(item.height, boardSize.height);
  }

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
  const asset = item.asset ?? item.fallbackAsset;

  return (
    <img
      src={asset}
      alt={item.alt ?? ""}
      draggable="false"
      decoding={item.decoding ?? "async"}
      loading={item.loading}
      fetchPriority={item.fetchPriority}
      style={{
        objectFit: item.fit ?? "cover",
        objectPosition: item.objectPosition ?? "50% 50%",
        transform: item.imageTransform,
        transformOrigin: item.imageTransformOrigin ?? "50% 50%",
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
            <figure
              className={classes}
              key={item.id}
              style={style}
              {...itemProps}
            >
              {item.asset ? (
                <span className="board-label__asset-wrap" aria-hidden="true">
                  {renderAsset(item)}
                </span>
              ) : null}
              <span className="board-label__text">{item.text}</span>
            </figure>
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

        if (item.kind === "fileCard") {
          const variantClass = item.content?.variant
            ? `board-file-card-copy--${item.content.variant}`
            : "";

          return (
            <figure className={classes} key={item.id} style={style} {...itemProps}>
              {item.asset ? renderAsset(item) : null}
              <figcaption
                className={["board-file-card-copy", variantClass]
                  .filter(Boolean)
                  .join(" ")}
              >
                {item.content?.kicker ? (
                  <span className="board-file-card-copy__kicker">
                    {item.content.kicker}
                  </span>
                ) : null}
                {item.content?.title ? (
                  <span className="board-file-card-copy__title">
                    {item.content.title}
                  </span>
                ) : null}
                {item.content?.body ? (
                  <p className="board-file-card-copy__body">{item.content.body}</p>
                ) : null}
                {item.content?.list?.length ? (
                  <ul className="board-file-card-copy__list">
                    {item.content.list.map((entry) => (
                      <li className="board-file-card-copy__list-item" key={entry}>
                        {entry}
                      </li>
                    ))}
                  </ul>
                ) : null}
                {item.content?.rows?.length ? (
                  <div className="board-file-card-copy__rows">
                    {item.content.rows.map((row) => {
                      const parts = splitSlashRow(row);

                      return (
                        <div className="board-file-card-copy__row" key={row}>
                          <span className="board-file-card-copy__row-lead">
                            {parts.lead}
                          </span>
                          {parts.trail ? (
                            <>
                              <span className="board-file-card-copy__row-divider">/</span>
                              <span className="board-file-card-copy__row-trail">
                                {parts.trail}
                              </span>
                            </>
                          ) : null}
                        </div>
                      );
                    })}
                  </div>
                ) : null}
                {item.content?.footer ? (
                  <span className="board-file-card-copy__footer">
                    {item.content.footer}
                  </span>
                ) : null}
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
              data-annotation-variant={item.annotationVariant}
              {...itemProps}
              aria-hidden="true"
            >
              {item.asset ? (
                renderAsset(item)
              ) : (
                <BoardAnnotation
                  type={item.annotationType}
                  variant={item.annotationVariant}
                />
              )}
            </figure>
          );
        }

        if (item.kind === "annotationNote") {
          return (
            <figure
              className={classes}
              key={item.id}
              style={style}
              data-anchor-side={item.anchorSide ?? "left"}
              data-anchor-target={item.targetId}
              {...itemProps}
            >
              <span className="board-annotation-note__connector" aria-hidden="true">
                <span className="board-annotation-note__line" />
                <span className="board-annotation-note__dot" />
              </span>
              <figcaption className="board-annotation-note__text">
                {item.text}
              </figcaption>
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
