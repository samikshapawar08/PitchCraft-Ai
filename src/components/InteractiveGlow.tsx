
import { useMousePosition } from '@/hooks/useMousePosition';

const InteractiveGlow = () => {
  const { x, y } = useMousePosition();

  return (
    <div
      className="pointer-events-none fixed inset-0 -z-0 transition-all duration-300"
      style={{
        background: `radial-gradient(600px circle at ${x}px ${y}px, hsl(var(--electric-purple) / 0.15), transparent 60%)`,
      }}
    />
  );
};

export default InteractiveGlow;
