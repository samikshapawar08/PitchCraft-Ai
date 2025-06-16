
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { generatePitch } from '@/lib/gemini';
import { Copy, LoaderCircle, Wand2, Building2, Lightbulb, Users } from 'lucide-react';
import { toast } from 'sonner';
import { useTypewriter } from '@/hooks/useTypewriter';

// console.log(process.env);

const PitchGenerator = () => {
  // --- PASTE YOUR GEMINI API KEY HERE ---
  const apiKey = import.meta.env.VITE_API_KEY;
  // ------------------------------------

  const [startupName, setStartupName] = useState('');
  const [problem, setProblem] = useState('');
  const [targetAudience, setTargetAudience] = useState('');

  const [pitch, setPitch] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const displayedPitch = useTypewriter(pitch, 30);

  const handleSubmit = async (e: React.FormEvent, regenerate = false) => {
    e.preventDefault();
    if (!regenerate) {
        setPitch('');
    }
    setError('');
    setIsLoading(true);

    try {
      const generatedPitch = await generatePitch(apiKey, startupName, problem, targetAudience);
      if (generatedPitch.startsWith('Error:')) {
        setError(generatedPitch);
        setPitch('');
      } else {
        setPitch(generatedPitch);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
      setError(errorMessage);
      setPitch('');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleCopy = () => {
    navigator.clipboard.writeText(pitch);
    toast.success('Pitch copied to clipboard!');
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.4 }}
        className="glass-card p-8 space-y-6"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="startupName" className="block text-sm font-medium text-cyber-teal/80 mb-2">Startup Name</label>
            <div className="futuristic-input-container">
              <Building2 size={18} className="futuristic-input-icon" />
              <input id="startupName" type="text" value={startupName} onChange={(e) => setStartupName(e.target.value)} className="futuristic-input" placeholder="e.g., QuantumLeap" required />
            </div>
          </div>
          <div>
            <label htmlFor="problem" className="block text-sm font-medium text-cyber-teal/80 mb-2">Problem It Solves</label>
             <div className="futuristic-input-container">
              <Lightbulb size={18} className="futuristic-textarea-icon" />
              <textarea id="problem" value={problem} onChange={(e) => setProblem(e.target.value)} className="futuristic-input min-h-[100px]" placeholder="e.g., Inefficient data processing for large-scale simulations" required />
            </div>
          </div>
          <div>
            <label htmlFor="targetAudience" className="block text-sm font-medium text-cyber-teal/80 mb-2">Target Audience</label>
            <div className="futuristic-input-container">
              <Users size={18} className="futuristic-input-icon" />
              <input id="targetAudience" type="text" value={targetAudience} onChange={(e) => setTargetAudience(e.target.value)} className="futuristic-input" placeholder="e.g., Research institutions and tech companies" required />
            </div>
          </div>
          <button type="submit" className="w-full neon-button py-3 flex items-center justify-center gap-2" disabled={isLoading}>
            {isLoading ? <LoaderCircle className="animate-spin" /> : <Wand2 />}
            {isLoading ? 'Crafting...' : 'Craft Pitch'}
          </button>
        </form>
      </motion.div>

      <AnimatePresence>
        {(pitch || error) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="glass-card p-8 mt-8"
          >
            {error ? (
              <p className="text-red-400">{error}</p>
            ) : (
              <div>
                <h3 className="text-lg font-bold text-cyber-teal mb-4">Your Generated Pitch</h3>
                <p className="text-lg leading-relaxed text-foreground/90 font-mono min-h-[120px]">{displayedPitch}<span className="inline-block w-2 h-5 bg-cyber-teal animate-pulse ml-1"></span></p>
                <div className="mt-6 flex gap-4">
                  <button onClick={handleCopy} className="neon-button px-4 py-2 flex items-center justify-center gap-2">
                    <Copy size={16} />
                    Copy
                  </button>
                  <button onClick={(e) => handleSubmit(e, true)} className="neon-button px-4 py-2 flex items-center justify-center gap-2" disabled={isLoading}>
                    {isLoading && !pitch ? <LoaderCircle className="animate-spin" size={16} /> : <Wand2 size={16} />}
                    Regenerate
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PitchGenerator;
