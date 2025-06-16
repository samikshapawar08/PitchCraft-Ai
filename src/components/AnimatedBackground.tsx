
import { motion } from 'framer-motion';

const AnimatedBackground = () => {
  const shapes = [
    { id: 1, size: 'w-48 h-48', top: '10%', left: '5%', animation: 'float 15s ease-in-out infinite', color: 'bg-cyber-teal/10' },
    { id: 2, size: 'w-24 h-24', top: '20%', left: '80%', animation: 'float 20s ease-in-out infinite reverse', color: 'bg-electric-purple/10' },
    { id: 3, size: 'w-32 h-32', top: '70%', left: '15%', animation: 'float 18s ease-in-out infinite', color: 'bg-hot-magenta/10' },
    { id: 4, size: 'w-40 h-40', top: '80%', left: '70%', animation: 'float 22s ease-in-out infinite reverse', color: 'bg-cyber-teal/10' },
    { id: 5, size: 'w-20 h-20', top: '50%', left: '50%', animation: 'float 12s ease-in-out infinite', color: 'bg-electric-purple/10' },
    { id: 6, size: 'w-36 h-36', top: '5%', left: '40%', animation: 'float 25s ease-in-out infinite reverse', color: 'bg-hot-magenta/10' },
    { id: 7, size: 'w-28 h-28', top: '90%', left: '90%', animation: 'float 16s ease-in-out infinite', color: 'bg-cyber-teal/10' },
  ];

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="starfield stars-sm" />
      <div className="starfield stars-md opacity-70" />
      <div className="starfield stars-lg opacity-40" />
      
      {shapes.map(shape => (
        <motion.div
          key={shape.id}
          className={`absolute ${shape.size} ${shape.color} rounded-full blur-3xl`}
          style={{ top: shape.top, left: shape.left, animation: shape.animation }}
        />
      ))}
    </div>
  );
};

export default AnimatedBackground;
