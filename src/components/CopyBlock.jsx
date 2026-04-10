import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const CONTACT_EMAIL = "hello@realrust.gg";
const COPY_RESET_DELAY = 1800;

function copyToClipboard(value) {
  if (
    typeof navigator !== "undefined" &&
    navigator.clipboard &&
    typeof navigator.clipboard.writeText === "function"
  ) {
    return navigator.clipboard.writeText(value).then(() => true);
  }

  if (typeof document === "undefined") {
    return Promise.resolve(false);
  }

  const textarea = document.createElement("textarea");
  textarea.value = value;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "absolute";
  textarea.style.left = "-9999px";
  document.body.appendChild(textarea);
  textarea.select();

  let copied = false;

  try {
    copied = document.execCommand("copy");
  } catch {
    copied = false;
  }

  document.body.removeChild(textarea);

  return Promise.resolve(copied);
}

function CopyBlock() {
  const [isContactVisible, setIsContactVisible] = useState(false);
  const [copyLabel, setCopyLabel] = useState("Copy");
  const revealRef = useRef(null);
  const resetTimeoutRef = useRef(null);

  useEffect(() => {
    const reveal = revealRef.current;

    if (!reveal) {
      return undefined;
    }

    gsap.killTweensOf(reveal);

    if (!isContactVisible) {
      gsap.set(reveal, { autoAlpha: 0, y: -8 });
      return undefined;
    }

    gsap.fromTo(
      reveal,
      { autoAlpha: 0, y: -8 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.26,
        ease: "power2.out",
      },
    );

    return undefined;
  }, [isContactVisible]);

  useEffect(
    () => () => {
      if (resetTimeoutRef.current) {
        window.clearTimeout(resetTimeoutRef.current);
      }
    },
    [],
  );

  const handleReveal = () => {
    setIsContactVisible(true);
  };

  const handleCopy = async () => {
    const copied = await copyToClipboard(CONTACT_EMAIL);

    if (!copied) {
      return;
    }

    setCopyLabel("Copied");

    if (resetTimeoutRef.current) {
      window.clearTimeout(resetTimeoutRef.current);
    }

    resetTimeoutRef.current = window.setTimeout(() => {
      setCopyLabel("Copy");
      resetTimeoutRef.current = null;
    }, COPY_RESET_DELAY);
  };

  return (
    <section className="hero-copy" id="deck">
      <div className="hero-copy__inner">
        <div className="hero-copy__header">
          <p className="hero-kicker">
            <span className="hero-kicker__rule" aria-hidden="true" />
            <span className="hero-kicker__text">REAL RUST / CAMPAIGN SURFACES</span>
          </p>
          <h1 className="hero-title" aria-label="Put your brand on the map.">
            <span className="hero-title__line">Put your</span>
            <span className="hero-title__line">brand on</span>
            <span className="hero-title__line">the map.</span>
          </h1>
        </div>
        <p className="hero-deck">
          World-native placements, custom campaign surfaces, and premium
          activations built for selected Rust communities.
        </p>
        <div className="hero-actions" aria-label="Primary contact action">
          <button
            type="button"
            className="hero-action hero-action--primary hero-action--conversation"
            aria-controls="hero-contact-reveal"
            aria-expanded={isContactVisible}
            onClick={handleReveal}
          >
            <span className="hero-action__label">Start a conversation</span>
          </button>
          <div className="hero-contact__slot" aria-live="polite">
            <div
              className={`hero-contact__reveal${
                isContactVisible ? " is-visible" : ""
              }`}
              id="hero-contact-reveal"
              ref={revealRef}
            >
              <a
                className="hero-contact__email"
                href={`mailto:${CONTACT_EMAIL}`}
                tabIndex={isContactVisible ? 0 : -1}
              >
                {CONTACT_EMAIL}
              </a>
              <button
                type="button"
                className="hero-contact__copy"
                onClick={handleCopy}
                tabIndex={isContactVisible ? 0 : -1}
              >
                {copyLabel}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CopyBlock;
