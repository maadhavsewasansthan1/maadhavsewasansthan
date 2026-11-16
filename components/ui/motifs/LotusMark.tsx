interface LotusMarkProps {
  width?: number;
  height?: number;
  className?: string;
}

/**
 * Simple 6-petal lotus outline. Pure stroke, no fill.
 * Default 16×16, viewBox 0 0 24 24.
 */
export default function LotusMark({
  width = 16,
  height = 16,
  className = "",
}: LotusMarkProps) {
  // 6 petals radiating from center (12,12)
  // Each petal is an elliptical arc path rotated by 60° increments
  // We define petals using path arcs that go up then back
  const petals = Array.from({ length: 6 }, (_, i) => {
    const angle = (i * 60 * Math.PI) / 180;
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);

    // Petal tip at distance 8 from center, petal width controlled by arc
    const tipX = 12 + 8 * sin;
    const tipY = 12 - 8 * cos;

    // Control arc: sweeps from center (12,12) up to tip and back
    // Using two quadratic bezier curves with side control points
    const ctrl1X = 12 + 3 * Math.cos(angle) + 3 * sin;
    const ctrl1Y = 12 - 3 * Math.sin(angle) - 3 * cos;  // approximation; simplified
    const ctrl2X = 12 - 3 * Math.cos(angle) + 3 * sin;
    const ctrl2Y = 12 + 3 * Math.sin(angle) - 3 * cos;

    // Petal: M center Q ctrl1 tip Q ctrl2 center
    return (
      <path
        key={i}
        d={`M 12 12 Q ${ctrl1X.toFixed(2)} ${ctrl1Y.toFixed(2)} ${tipX.toFixed(2)} ${tipY.toFixed(2)} Q ${ctrl2X.toFixed(2)} ${ctrl2Y.toFixed(2)} 12 12`}
        stroke="currentColor"
        fill="none"
        strokeWidth={1.2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    );
  });

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={width}
      height={height}
      className={className}
      aria-hidden="true"
    >
      {petals}
      {/* small center dot */}
      <circle cx="12" cy="12" r="1" fill="currentColor" />
    </svg>
  );
}
