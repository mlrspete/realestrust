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

  if (type === "desktopDottedRoute") {
    return (
      <svg
        className="board-annotation-svg"
        viewBox="0 0 760 602"
        fill="none"
        aria-hidden="true"
      >
        <path
          data-draw-path="route"
          data-final-dash="4 24"
          d="M74 216C148 190 216 182 278 200C334 216 380 178 434 120C472 80 516 60 566 56C622 52 670 82 698 142C726 198 730 262 710 322C690 384 644 430 574 458C518 482 440 494 340 490C254 488 192 510 154 556"
          stroke="currentColor"
          strokeWidth="6.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="4 24"
        />
        <circle data-draw-dot="route" cx="156" cy="554" r="7" fill="currentColor" />
        <circle data-draw-dot="route" cx="706" cy="320" r="7" fill="currentColor" />
        <circle data-draw-dot="route" cx="568" cy="58" r="6.5" fill="currentColor" />
        <circle data-draw-dot="route" cx="274" cy="202" r="6.5" fill="currentColor" />
      </svg>
    );
  }

  if (type === "desktopRouteNetwork") {
    return (
      <svg
        className="board-annotation-svg"
        viewBox="0 0 850 580"
        fill="none"
        aria-hidden="true"
      >
        <path
          data-draw-path="route"
          data-final-dash="7 18"
          d="M395 286C393 252 391 220 384 187C378 152 370 96 363 48"
          stroke="currentColor"
          strokeWidth="7.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="7 18"
        />
        <path
          data-draw-path="route"
          data-final-dash="7 18"
          d="M395 286C348 285 302 282 256 279C208 276 159 274 107 273"
          stroke="currentColor"
          strokeWidth="7.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="7 18"
        />
        <path
          data-draw-path="route"
          data-final-dash="7 18"
          d="M395 286C461 297 531 322 604 356C672 389 744 416 819 422"
          stroke="currentColor"
          strokeWidth="7.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="7 18"
        />
        <path
          data-draw-path="route"
          data-final-dash="7 18"
          d="M395 286C349 318 314 353 286 394C256 438 242 483 214 520C178 566 102 590 48 558"
          stroke="currentColor"
          strokeWidth="7.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="7 18"
        />
      </svg>
    );
  }

  if (type === "circle") {
    const strokeWidth =
      variant === "primaryOuter" ? 13.5 : variant === "primaryInner" ? 9.5 : 7.5;

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
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.95"
        />
      </svg>
    );
  }

  if (type === "arrow") {
    if (variant === "siteFlow") {
      return (
        <svg
          className="board-annotation-svg"
          viewBox="0 0 280 160"
          fill="none"
          aria-hidden="true"
        >
          <path
            data-draw-path="arrows"
            d="M24 132c44-10 88-28 130-56 36-24 70-44 110-56"
            stroke="currentColor"
            strokeWidth="8.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            data-draw-path="arrows"
            d="m214 18 48 4-28 38"
            stroke="currentColor"
            strokeWidth="8.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    }

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
