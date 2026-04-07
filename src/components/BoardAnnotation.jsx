function BoardAnnotation({ type }) {
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
