interface CrescentProps {
  size?: number;
  color?: string;
  opacity?: number;
  className?: string;
}

/**
 * Thick crescent moon rendered via SVG mask.
 * A full circle with an offset circle subtracted to create the crescent shape.
 */
export default function Crescent({
  size = 48,
  color = "#d4bf8a",
  opacity = 0.85,
  className = "",
}: CrescentProps) {
  const id = `crescent-mask-${size}`;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      className={className}
    >
      <defs>
        <mask id={id}>
          {/* Full white circle = visible area */}
          <circle cx="50" cy="50" r="40" fill="white" />
          {/* Black circle offset to the right carves out the crescent */}
          <circle cx="62" cy="46" r="32" fill="black" />
        </mask>
      </defs>
      <circle
        cx="50"
        cy="50"
        r="40"
        fill={color}
        fillOpacity={opacity}
        mask={`url(#${id})`}
      />
    </svg>
  );
}
