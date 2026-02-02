import React, { useState, useEffect } from "react";

const App = () => {
  const [isAccepted, setIsAccepted] = useState(false);
  const [noPosition, setNoPosition] = useState({ top: "70%", left: "60%" });
  const [loading, setLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isBlinking, setIsBlinking] = useState(false);
  const [eyePosition, setEyePosition] = useState({ x: 0, y: 0 });
  const [teddyRef, setTeddyRef] = useState(null);
  const [noHoverCount, setNoHoverCount] = useState(0);
  const [noButtonMoved, setNoButtonMoved] = useState(false);

  /* Loading Progress */
  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(() => setLoading(false), 500);
          return 100;
        }
        return p + 2;
      });
    }, 20);

    return () => clearInterval(interval);
  }, []);

  /* Blink */
  useEffect(() => {
    if (!loading) {
      const blink = setInterval(() => {
        setIsBlinking(true);
        setTimeout(() => setIsBlinking(false), 150);
      }, 3500);
      return () => clearInterval(blink);
    }
  }, [loading]);

  /* Eye tracking */
  useEffect(() => {
    if (!loading && teddyRef) {
      const move = (e) => {
        const rect = teddyRef.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 3;
        const dx = e.clientX - cx;
        const dy = e.clientY - cy;
        const angle = Math.atan2(dy, dx);
        const distance = Math.min(Math.sqrt(dx * dx + dy * dy) / 60, 1);
        const dist = 5 * distance;
        setEyePosition({
          x: Math.cos(angle) * dist,
          y: Math.sin(angle) * dist,
        });
      };
      window.addEventListener("mousemove", move);
      return () => window.removeEventListener("mousemove", move);
    }
  }, [loading, teddyRef]);

  const moveNoButton = () => {
    const newCount = noHoverCount + 1;
    setNoHoverCount(newCount);
    
    if (newCount >= 3) {
      // After 3 attempts, change to YES and accept
      setTimeout(() => setIsAccepted(true), 500);
    } else {
      setNoButtonMoved(true);
      const top = Math.random() * 60 + 20;
      const left = Math.random() * 60 + 20;
      setNoPosition({ top: `${top}%`, left: `${left}%` });
    }
  };

  /* ---------- Loading ---------- */
  if (loading) {
    return (
      <div style={styles.loaderPage}>
        <div style={styles.loaderContent}>
          <div style={styles.loaderHeart}>
            <svg width="80" height="80" viewBox="0 0 80 80">
              <path
                d="M40 65 L15 40 Q15 20 27 20 Q33 20 40 27 Q47 20 53 20 Q65 20 65 40 Z"
                fill="url(#heartGradient)"
                className="heartPulse"
              />
              <defs>
                <linearGradient id="heartGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ff4d6d" />
                  <stop offset="100%" stopColor="#ff758f" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <h2 style={styles.loaderTitle}>Preparing Love Magic...</h2>
          <div style={styles.barOuter}>
            <div style={{ ...styles.barInner, width: `${loadingProgress}%` }} />
          </div>
          <p style={styles.loaderPercent}>{loadingProgress}%</p>
        </div>
      </div>
    );
  }

  /* ---------- Accepted ---------- */
  if (isAccepted) {
    return (
      <div style={styles.victoryPage}>
        <div style={styles.victoryCard}>
          <div className="successCheckmark">
            <svg width="120" height="120" viewBox="0 0 120 120">
              <circle
                cx="60"
                cy="60"
                r="54"
                fill="none"
                stroke="#ff4d6d"
                strokeWidth="4"
                className="checkCircle"
              />
              <path
                d="M35 60 L52 77 L85 40"
                fill="none"
                stroke="#ff4d6d"
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="checkMark"
              />
            </svg>
          </div>
          <h1 style={styles.victoryTitle}>You Said YES! ❤️</h1>
          <p style={styles.victoryText}>See you at our Valentine date ✨</p>
          <div className="confetti"></div>
        </div>
      </div>
    );
  }

  /* ---------- Main ---------- */
  return (
    <div style={styles.mainContainer}>
      <div className="heartsBg"></div>

      <div style={styles.card}>
        <div style={styles.badge}>Valentine's 2026</div>

        <div style={styles.scriptTitle}>Will you be my Valentine?</div>

        {/* Enhanced Teddy */}
        <div style={styles.teddyWrapper} ref={setTeddyRef}>
          <div style={styles.teddyBody}>
            {/* Head */}
            <div style={styles.teddyHead}>
              {/* Ears */}
              <div style={{ ...styles.ear, left: "-15px" }}>
                <div style={styles.earInner}></div>
              </div>
              <div style={{ ...styles.ear, right: "-15px" }}>
                <div style={styles.earInner}></div>
              </div>

              {/* Eyes */}
              <div
                style={{
                  ...styles.eye,
                  left: "22px",
                  height: isBlinking ? "3px" : "18px",
                }}
              >
                <div
                  style={{
                    ...styles.pupil,
                    transform: `translate(calc(-50% + ${eyePosition.x}px), calc(-50% + ${eyePosition.y}px))`,
                  }}
                >
                  <div style={styles.eyeShine}></div>
                </div>
              </div>

              <div
                style={{
                  ...styles.eye,
                  right: "22px",
                  height: isBlinking ? "3px" : "18px",
                }}
              >
                <div
                  style={{
                    ...styles.pupil,
                    transform: `translate(calc(-50% + ${eyePosition.x}px), calc(-50% + ${eyePosition.y}px))`,
                  }}
                >
                  <div style={styles.eyeShine}></div>
                </div>
              </div>

              {/* Blush */}
              <div style={{ ...styles.blush, left: "12px" }}></div>
              <div style={{ ...styles.blush, right: "12px" }}></div>

              {/* Snout */}
              <div style={styles.snout}>
                <div style={styles.nose}></div>
                <div style={styles.mouth}>
                  <div style={styles.mouthLeft}></div>
                  <div style={styles.mouthRight}></div>
                </div>
              </div>
            </div>

            {/* Heart bow */}
            <div style={styles.heartBow}>
              <svg width="40" height="40" viewBox="0 0 40 40">
                <path
                  d="M20 35 L7 22 Q7 12 13 12 Q16 12 20 15 Q24 12 27 12 Q33 12 33 22 Z"
                  fill="#ff1744"
                  className="heartBeat"
                />
              </svg>
            </div>

            {/* Arms */}
            <div style={{ ...styles.arm, left: "-8px" }} className="armWave"></div>
            <div style={{ ...styles.arm, right: "-8px" }} className="armWave2"></div>
          </div>
        </div>

        <p style={styles.subText}>
          {noHoverCount === 0 && "Say yes and make my day brighter ✨"}
          {noHoverCount === 1 && "Are you sure? 🥺"}
          {noHoverCount === 2 && "Please? Pretty please? 💕"}
          {noHoverCount >= 3 && "I knew you'd come around! 💖"}
        </p>

        <div style={styles.buttons}>
          <button style={styles.yesBtn} onClick={() => setIsAccepted(true)}>
            <span>YES ❤️</span>
            <div className="buttonShine"></div>
          </button>

          <button
            style={
              noButtonMoved
                ? {
                    ...styles.noBtn,
                    ...styles.noBtnAbsolute,
                    top: noPosition.top,
                    left: noPosition.left,
                    ...(noHoverCount >= 3 && styles.noBtnTransformed),
                  }
                : {
                    ...styles.noBtn,
                    ...(noHoverCount >= 3 && styles.noBtnTransformed),
                  }
            }
            onMouseEnter={moveNoButton}
            onTouchStart={moveNoButton}
            className={noHoverCount >= 3 ? "buttonTransform" : ""}
          >
            {noHoverCount >= 3 ? "YES ❤️" : "NO"}
          </button>
        </div>
      </div>

      {/* Floating hearts */}
      <div className="floatingHearts">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="floatingHeart"
            style={{
              left: `${10 + i * 10}%`,
              animationDelay: `${i * 0.8}s`,
              fontSize: `${14 + Math.random() * 8}px`,
            }}
          >
            💗
          </div>
        ))}
      </div>
    </div>
  );
};

/* ---------- Styles ---------- */

const styles = {
  loaderPage: {
    height: "100vh",
    background: "linear-gradient(135deg, #1a0012 0%, #300018 100%)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "#ffb6c1",
  },

  loaderContent: {
    textAlign: "center",
  },

  loaderHeart: {
    marginBottom: "30px",
  },

  loaderTitle: {
    fontFamily: "'Great Vibes', cursive",
    fontSize: "38px",
    marginBottom: "30px",
    fontWeight: "400",
  },

  barOuter: {
    width: 280,
    height: 6,
    background: "rgba(255, 255, 255, 0.1)",
    borderRadius: 10,
    overflow: "hidden",
    margin: "0 auto",
  },

  barInner: {
    height: "100%",
    background: "linear-gradient(90deg, #ff4d6d, #ff758f)",
    transition: "width 0.3s ease",
    boxShadow: "0 0 20px rgba(255, 77, 109, 0.6)",
  },

  loaderPercent: {
    marginTop: "15px",
    fontSize: "14px",
    letterSpacing: "2px",
    opacity: 0.8,
  },

  mainContainer: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #1a0012 0%, #300018 50%, #1a0012 100%)",
    overflow: "hidden",
    padding: "20px",
    position: "relative",
  },

  card: {
    background: "rgba(26, 0, 18, 0.8)",
    backdropFilter: "blur(10px)",
    padding: "50px 40px",
    borderRadius: 30,
    textAlign: "center",
    color: "white",
    position: "relative",
    boxShadow: "0 30px 80px rgba(0, 0, 0, 0.7), 0 0 1px rgba(255, 182, 193, 0.3)",
    border: "1px solid rgba(255, 182, 193, 0.1)",
    maxWidth: "500px",
    width: "100%",
  },

  badge: {
    display: "inline-block",
    padding: "8px 20px",
    background: "linear-gradient(135deg, rgba(255, 77, 109, 0.2), rgba(255, 117, 143, 0.2))",
    border: "1px solid rgba(255, 77, 109, 0.3)",
    color: "#ff758f",
    borderRadius: "50px",
    fontSize: "11px",
    fontFamily: "'Inter', sans-serif",
    fontWeight: "600",
    letterSpacing: "1.5px",
    textTransform: "uppercase",
    marginBottom: "20px",
  },

  scriptTitle: {
    fontFamily: "'Great Vibes', cursive",
    fontSize: "46px",
    color: "#ffb6c1",
    marginBottom: "20px",
    fontWeight: "400",
  },

  teddyWrapper: {
    height: 220,
    position: "relative",
  },

  teddyBody: {
    width: 140,
    height: 130,
    background: "linear-gradient(135deg, #ff85a2, #ff6f91)",
    borderRadius: "50%",
    position: "relative",
    margin: "40px auto 0",
    boxShadow: "0 10px 40px rgba(255, 77, 109, 0.4)",
  },

  teddyHead: {
    width: 120,
    height: 110,
    background: "linear-gradient(135deg, #ff9db3, #ff85a2)",
    borderRadius: "50% 50% 48% 48%",
    position: "absolute",
    top: "-70px",
    left: "10px",
    boxShadow: "0 8px 30px rgba(255, 77, 109, 0.3)",
  },

  ear: {
    width: 38,
    height: 38,
    background: "linear-gradient(135deg, #ff85a2, #ff6f91)",
    borderRadius: "50%",
    position: "absolute",
    top: "5px",
    boxShadow: "0 4px 15px rgba(255, 77, 109, 0.2)",
  },

  earInner: {
    width: "22px",
    height: "22px",
    background: "#ffd1dc",
    borderRadius: "50%",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },

  eye: {
    width: 18,
    background: "white",
    borderRadius: "50%",
    position: "absolute",
    top: 42,
    overflow: "hidden",
    transition: "height 0.1s ease",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
  },

  pupil: {
    width: 10,
    height: 10,
    background: "#1a1a1a",
    borderRadius: "50%",
    position: "absolute",
    top: "50%",
    left: "50%",
    transition: "transform 0.15s ease-out",
  },

  eyeShine: {
    width: "4px",
    height: "4px",
    background: "white",
    borderRadius: "50%",
    position: "absolute",
    top: "2px",
    left: "2px",
  },

  blush: {
    width: "20px",
    height: "14px",
    background: "radial-gradient(ellipse, rgba(255, 77, 109, 0.4), transparent)",
    borderRadius: "50%",
    position: "absolute",
    top: "62px",
  },

  snout: {
    width: 42,
    height: 32,
    background: "linear-gradient(135deg, #ffe5ec, #ffd1dc)",
    borderRadius: "50%",
    position: "absolute",
    bottom: 16,
    left: 39,
    boxShadow: "0 3px 10px rgba(0, 0, 0, 0.08)",
  },

  nose: {
    width: 12,
    height: 10,
    background: "#c7004c",
    borderRadius: "50%",
    margin: "8px auto 0",
    boxShadow: "0 2px 4px rgba(199, 0, 76, 0.4)",
  },

  mouth: {
    position: "absolute",
    top: 18,
    left: "50%",
    transform: "translateX(-50%)",
  },

  mouthLeft: {
    width: "10px",
    height: "6px",
    border: "2px solid #ff85a2",
    borderTop: "none",
    borderRight: "none",
    borderRadius: "0 0 0 10px",
    position: "absolute",
    right: "0",
  },

  mouthRight: {
    width: "10px",
    height: "6px",
    border: "2px solid #ff85a2",
    borderTop: "none",
    borderLeft: "none",
    borderRadius: "0 0 10px 0",
    position: "absolute",
    left: "0",
  },

  heartBow: {
    position: "absolute",
    top: 35,
    left: "50%",
    transform: "translateX(-50%)",
  },

  arm: {
    width: "32px",
    height: "70px",
    background: "linear-gradient(135deg, #ff85a2, #ff6f91)",
    borderRadius: "50px",
    position: "absolute",
    top: "50px",
    boxShadow: "0 4px 15px rgba(255, 77, 109, 0.2)",
  },

  subText: {
    opacity: 0.9,
    fontSize: "16px",
    color: "#ffb6c1",
    marginTop: "20px",
    minHeight: "24px",
    fontFamily: "'Inter', sans-serif",
  },

  buttons: {
    marginTop: 30,
    position: "relative",
    minHeight: "60px",
  },

  yesBtn: {
    background: "linear-gradient(135deg, #ff4d6d, #ff758f)",
    border: "none",
    color: "white",
    padding: "16px 50px",
    borderRadius: 50,
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "600",
    fontFamily: "'Inter', sans-serif",
    letterSpacing: "1px",
    position: "relative",
    overflow: "hidden",
    boxShadow: "0 8px 25px rgba(255, 77, 109, 0.4)",
    transition: "all 0.3s ease",
  },

  noBtn: {
    border: "2px solid rgba(255, 182, 193, 0.5)",
    background: "transparent",
    color: "#ffb6c1",
    padding: "14px 35px",
    borderRadius: 50,
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "500",
    fontFamily: "'Inter', sans-serif",
    letterSpacing: "1px",
    transition: "all 0.2s ease",
  },

  noBtnAbsolute: {
    position: "absolute",
  },

  noBtnTransformed: {
    background: "linear-gradient(135deg, #ff4d6d, #ff758f)",
    color: "white",
    border: "none",
    boxShadow: "0 8px 25px rgba(255, 77, 109, 0.4)",
  },

  victoryPage: {
    height: "100vh",
    background: "linear-gradient(135deg, #1a0012 0%, #300018 100%)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    overflow: "hidden",
  },

  victoryCard: {
    padding: "60px",
    background: "rgba(26, 0, 18, 0.8)",
    backdropFilter: "blur(10px)",
    borderRadius: 30,
    color: "white",
    textAlign: "center",
    boxShadow: "0 30px 80px rgba(0, 0, 0, 0.7)",
    border: "1px solid rgba(255, 182, 193, 0.1)",
  },

  victoryTitle: {
    fontFamily: "'Great Vibes', cursive",
    fontSize: "56px",
    color: "#ffb6c1",
    marginTop: "20px",
    marginBottom: "10px",
    fontWeight: "400",
  },

  victoryText: {
    fontSize: "18px",
    color: "#ff758f",
    fontFamily: "'Inter', sans-serif",
  },
};

/* Inject fonts + animations */
if (typeof document !== "undefined") {
  const link = document.createElement("link");
  link.href =
    "https://fonts.googleapis.com/css2?family=Great+Vibes&family=Inter:wght@400;500;600;700&display=swap";
  link.rel = "stylesheet";
  document.head.appendChild(link);

  const style = document.createElement("style");
  style.innerHTML = `
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    .heartsBg {
      position: absolute;
      width: 100%;
      height: 100%;
      background-image: radial-gradient(circle, rgba(255, 77, 109, 0.1) 1px, transparent 1px);
      background-size: 50px 50px;
      opacity: 0.3;
      pointer-events: none;
    }

    .heartPulse {
      animation: pulse 1.5s ease-in-out infinite;
      filter: drop-shadow(0 5px 20px rgba(255, 77, 109, 0.5));
    }

    @keyframes pulse {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.08); }
    }

    .heartBeat {
      animation: heartbeat 1.6s ease-in-out infinite;
    }

    @keyframes heartbeat {
      0%, 100% { transform: scale(1); }
      10% { transform: scale(1.1); }
      20% { transform: scale(1); }
      30% { transform: scale(1.1); }
      40% { transform: scale(1); }
    }

    .armWave {
      animation: wave1 3s ease-in-out infinite;
    }

    .armWave2 {
      animation: wave2 3s ease-in-out infinite;
    }

    @keyframes wave1 {
      0%, 100% { transform: rotate(-15deg); }
      50% { transform: rotate(-5deg); }
    }

    @keyframes wave2 {
      0%, 100% { transform: rotate(15deg); }
      50% { transform: rotate(5deg); }
    }

    button:hover {
      transform: translateY(-3px) scale(1.02);
    }

    button:active {
      transform: translateY(-1px) scale(0.98);
    }

    .buttonShine {
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
      animation: shine 3s infinite;
    }

    @keyframes shine {
      to { left: 200%; }
    }

    .floatingHearts {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      pointer-events: none;
      overflow: hidden;
    }

    .floatingHeart {
      position: absolute;
      bottom: -50px;
      animation: rise 12s linear infinite;
      opacity: 0.2;
    }

    @keyframes rise {
      to {
        transform: translateY(-110vh) rotate(360deg);
        opacity: 0;
      }
    }

    .successCheckmark {
      margin: 0 auto 20px;
      width: 120px;
    }

    .checkCircle {
      stroke-dasharray: 340;
      stroke-dashoffset: 340;
      animation: drawCircle 0.7s ease-out forwards;
    }

    .checkMark {
      stroke-dasharray: 100;
      stroke-dashoffset: 100;
      animation: drawCheck 0.5s ease-out 0.7s forwards;
    }

    @keyframes drawCircle {
      to { stroke-dashoffset: 0; }
    }

    @keyframes drawCheck {
      to { stroke-dashoffset: 0; }
    }

    .buttonTransform {
      animation: transformToYes 0.5s ease-out forwards;
    }

    @keyframes transformToYes {
      0% {
        transform: scale(1) rotate(0deg);
      }
      50% {
        transform: scale(1.2) rotate(10deg);
      }
      100% {
        transform: scale(1) rotate(0deg);
      }
    }

    .confetti {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      pointer-events: none;
    }
  `;
  document.head.appendChild(style);
}

export default App;