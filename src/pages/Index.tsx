
import AnimatedBackground from "@/components/AnimatedBackground";
import PitchGenerator from "@/components/PitchGenerator";
import { motion } from "framer-motion";
import InteractiveGlow from "@/components/InteractiveGlow";

const Index = () => {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 overflow-x-hidden relative">
      <AnimatedBackground />
      <InteractiveGlow />

      <header className="text-center z-10 mb-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="relative inline-block"
        >
          <div className="absolute -inset-2 bg-electric-purple/30 rounded-full blur-3xl animate-pulse-glow" />
          <h1 className="text-5xl md:text-7xl font-black font-orbitron text-transparent bg-clip-text bg-gradient-to-r from-hot-magenta via-electric-purple to-cyber-teal relative">
            PitchCraft AI
          </h1>
        </motion.div>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-4 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto"
        >
          Forge compelling elevator pitches from simple ideas with the power of generative AI. Instantly craft, refine, and perfect your message.
        </motion.p>
      </header>
      
      <main className="w-full z-10">
        <PitchGenerator />
      </main>

       <footer className="text-center text-muted-foreground text-sm mt-12 z-10">
         <p>All rights reserved &copy; 2025</p>
      </footer>
    </div>
  );
};

export default Index;
