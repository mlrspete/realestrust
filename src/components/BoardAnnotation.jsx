function BoardAnnotation({ type, variant }) {
  if (type === "route") {
    return (
      <svg
        className="board-annotation-svg"
        viewBox="0 0 720 260"
        fill="none"
        aria-hidden="true"
      >
        <path
          data-draw-path="route"
          data-final-dash="3 18"
          d="M40 212c66-26 94-81 142-81 50 0 52 68 111 68 58 0 83-102 154-102 52 0 76 56 123 56 40 0 72-27 110-61"
          stroke="currentColor"
          strokeWidth="11"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="3 18"
        />
        <circle data-draw-dot="route" cx="41" cy="212" r="11" fill="currentColor" />
        <circle data-draw-dot="route" cx="681" cy="59" r="11" fill="currentColor" />
      </svg>
    );
  }

  if (type === "flowRoute") {
    return (
      <svg
        className="board-annotation-svg"
        viewBox="0 0 1280 760"
        fill="none"
        aria-hidden="true"
      >
        <path
          data-draw-path="route"
          data-final-dash="4 22"
          d="M46 710C164 694 228 620 328 536C438 442 528 444 646 402C750 366 806 292 888 204C970 116 1036 62 1132 34"
          stroke="currentColor"
          strokeWidth="12"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="4 22"
        />
        <circle data-draw-dot="route" cx="46" cy="710" r="12" fill="currentColor" />
        <circle data-draw-dot="route" cx="646" cy="402" r="11" fill="currentColor" />
        <circle data-draw-dot="route" cx="812" cy="238" r="10" fill="currentColor" />
        <circle data-draw-dot="route" cx="1132" cy="34" r="12" fill="currentColor" />
      </svg>
    );
  }

  if (type === "plottedRoute") {
    return (
      <svg
        className="board-annotation-svg"
        viewBox="0 0 936 529"
        fill="none"
        aria-hidden="true"
      >
        <defs>
          <marker
            id="board-route-arrowhead"
            markerWidth="26"
            markerHeight="18"
            refX="19"
            refY="9"
            orient="auto"
            markerUnits="userSpaceOnUse"
          >
            <path
              d="M2 2 20 9 2 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </marker>
        </defs>
        <path
          data-draw-path="route"
          data-final-dash="4 12"
          d="M0 529C44 518 86 507 130 491C178 473 229 447 281 422C324 399 369 376 412 352C459 326 506 306 555 283C594 263 628 209 660 171C692 133 727 112 765 91C822 58 875 27 936 0"
          stroke="currentColor"
          strokeWidth="10"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="4 12"
          markerEnd="url(#board-route-arrowhead)"
        />
      </svg>
    );
  }

  if (type === "plottedRouteMobile") {
    return (
      <svg
        className="board-annotation-svg"
        viewBox="0 0 438 720"
        fill="none"
        aria-hidden="true"
      >
        <defs>
          <marker
            id="board-route-arrowhead-mobile"
            markerWidth="22"
            markerHeight="16"
            refX="17"
            refY="8"
            orient="auto"
            markerUnits="userSpaceOnUse"
          >
            <path
              d="M2 2 18 8 2 14"
              fill="none"
              stroke="currentColor"
              strokeWidth="4.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </marker>
        </defs>
        <path
          data-draw-path="route"
          data-final-dash="4 10"
          d="M20 718C70 694 116 664 156 618C200 566 236 508 256 434C284 338 328 250 367 179C390 137 412 88 438 4"
          stroke="currentColor"
          strokeWidth="9"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="4 10"
          markerEnd="url(#board-route-arrowhead-mobile)"
        />
      </svg>
    );
  }

  if (type === "circle") {
    return (
      <svg
        className="board-annotation-svg"
        viewBox="0 0 400 320"
        fill="none"
        aria-hidden="true"
      >
        <path
          data-draw-path="circle"
          d="M73 166c-8-64 35-117 127-125 82-8 146 34 154 109 8 72-47 129-130 135-77 6-142-30-151-119Z"
          stroke="currentColor"
          strokeWidth="13"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.95"
        />
      </svg>
    );
  }

  if (type === "arrow") {
    if (variant === "drop") {
      return (
        <svg
          className="board-annotation-svg"
          viewBox="0 0 320 220"
          fill="none"
          aria-hidden="true"
        >
          <path
            data-draw-path="arrows"
            d="M36 42c56 4 96 22 140 58 34 29 61 54 108 88"
            stroke="currentColor"
            strokeWidth="12"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            data-draw-path="arrows"
            d="m238 160 46 30-56 6"
            stroke="currentColor"
            strokeWidth="12"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    }

    return (
      <svg
        className="board-annotation-svg"
        viewBox="0 0 340 180"
        fill="none"
        aria-hidden="true"
      >
        <path
          data-draw-path="arrows"
          d="M28 146c66-14 112-42 162-80 42-32 72-45 118-54"
          stroke="currentColor"
          strokeWidth="12"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          data-draw-path="arrows"
          d="m258 4 50 12-34 38"
          stroke="currentColor"
          strokeWidth="12"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (type === "arrows") {
    return (
      <svg
        className="board-annotation-svg"
        viewBox="0 0 520 200"
        fill="none"
        aria-hidden="true"
      >
        <path
          data-draw-path="arrows"
          d="M34 148c82-8 128-42 176-78 49-37 96-59 168-72"
          stroke="currentColor"
          strokeWidth="12"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          data-draw-path="arrows"
          d="M335 14 381 4l-18 44"
          stroke="currentColor"
          strokeWidth="12"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          data-draw-path="arrows"
          d="M210 182c39-15 66-37 98-63"
          stroke="currentColor"
          strokeWidth="10"
          strokeLinecap="round"
        />
        <path
          data-draw-path="arrows"
          d="M273 118 309 119l-16 28"
          stroke="currentColor"
          strokeWidth="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  return null;
}

export default BoardAnnotation;
