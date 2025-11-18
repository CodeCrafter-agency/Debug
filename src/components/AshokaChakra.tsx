interface AshokaChakraProps {
  className?: string;
  size?: number;
}

export function AshokaChakra({ className = "", size = 24 }: AshokaChakraProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Outer circle */}
      <circle cx="50" cy="50" r="48" stroke="currentColor" strokeWidth="2" fill="none" />
      
      {/* Inner circle */}
      <circle cx="50" cy="50" r="8" fill="currentColor" />
      
      {/* 24 spokes */}
      {[...Array(24)].map((_, i) => {
        const angle = (i * 15 * Math.PI) / 180;
        const x1 = 50 + 8 * Math.cos(angle);
        const y1 = 50 + 8 * Math.sin(angle);
        const x2 = 50 + 48 * Math.cos(angle);
        const y2 = 50 + 48 * Math.sin(angle);
        
        return (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="currentColor"
            strokeWidth="1.5"
          />
        );
      })}
    </svg>
  );
}
