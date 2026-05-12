import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { generateGaze, GazeResult } from './services/geminiService';

export default function App() {
  const [loading, setLoading] = useState(false);
  const [gaze, setGaze] = useState<GazeResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [time, setTime] = useState('');

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-GB', { hour12: false }) + ':' + now.getMilliseconds().toString().padStart(3, '0'));
    }, 100);
    return () => clearInterval(timer);
  }, []);

  const triggerGaze = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await generateGaze();
      setGaze(result);
    } catch (err) {
      console.error(err);
      setError("SIGNAL_LOST: DIMENSIONAL_INTERFERENCE_DETECTED");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-bg relative overflow-hidden font-display p-5">
      <div className="scanline" />
      
      {/* Wrapper with border logic from design */}
      <div className="flex flex-col flex-1 border-[1px] md:border-[20px] border-bg transition-all duration-700">
        
        {/* Header Section */}
        <header className="h-[60px] border-b border-black/10 flex justify-between items-center px-5 font-mono text-[10px] md:text-xs tracking-[2px] text-accent uppercase">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-accent animate-pulse" />
            SYS_AUTH: PHILOSOPHER_V1
          </div>
          <div className="hidden md:block">STATUS: {loading ? 'SCANNING_VOID' : gaze ? 'OBSERVING_VOID' : 'IDLE'}</div>
          <div>NODE_0x{Math.floor(Math.random() * 999).toString().padStart(3, '0')} // RF_STOCHASTIC</div>
        </header>

        <main className="flex-1 flex flex-col pt-10 md:pt-20">
          {/* Hero Section */}
          <section className="px-5 mb-10 md:mb-20">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="border-l-[10px] md:border-l-[20px] border-accent pl-5 md:pl-10"
            >
              <h1 className="text-[60px] md:text-[130px] leading-[0.85] font-black tracking-[-0.04em] md:tracking-[-6px] uppercase select-none">
                VOID<br />GAZER
              </h1>
            </motion.div>
          </section>

          {/* Action / Grid Section */}
          <div className="flex-1 flex flex-col">
            <AnimatePresence mode="wait">
              {!gaze && !loading && !error ? (
                <motion.button
                  key="gate"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={triggerGaze}
                  className="mx-5 py-20 border border-black/10 hover:border-accent hover:bg-accent/5 transition-all text-accent font-mono text-xl tracking-[0.4em] uppercase group"
                >
                  <span className="group-hover:scale-110 inline-block transition-transform">
                    INITIATE_OBSERVATION
                  </span>
                </motion.button>
              ) : (
                <motion.div
                  key="content"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex-1 flex flex-col"
                >
                  {/* content-grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-[1px] bg-black/10 border-t border-b border-black/10">
                    
                    {/* The Challenge */}
                    <div className="bg-bg p-8 md:p-12 flex flex-col group hover:bg-surface transition-colors cursor-default">
                      <div className="font-mono text-[10px] text-accent uppercase mb-6 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-accent" />
                        The Challenge
                      </div>
                      <h2 className="text-2xl md:text-3xl font-bold leading-[1.1] mb-4 uppercase">
                        {loading ? '---' : gaze?.challenge?.split(' ').slice(0, 2).join(' ') || 'WAITING'}
                      </h2>
                      <p className="font-mono text-sm leading-relaxed text-zinc-500 h-full">
                        {loading ? 'EXTRACTING_CHALLENGE_PARAMETERS...' : gaze?.challenge}
                      </p>
                    </div>

                    {/* The Physics */}
                    <div className="bg-bg p-8 md:p-12 flex flex-col group hover:bg-surface transition-colors cursor-default">
                      <div className="font-mono text-[10px] text-accent uppercase mb-6 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-accent" />
                        The Physics
                      </div>
                      <h2 className="text-2xl md:text-3xl font-bold leading-[1.1] mb-4 uppercase">
                        {loading ? '---' : gaze?.physics?.split(' ').slice(0, 2).join(' ') || 'WAITING'}
                      </h2>
                      <p className="font-mono text-sm leading-relaxed text-zinc-500 h-full">
                        {loading ? 'CALCULATING_PHYSICAL_INVARIANTS...' : gaze?.physics}
                      </p>
                    </div>

                    {/* System State / Metrics */}
                    <div className="bg-bg p-8 md:p-12 flex flex-col group hover:bg-surface transition-colors cursor-default">
                      <div className="font-mono text-[10px] text-accent uppercase mb-6 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-accent" />
                        The Core State
                      </div>
                      <h2 className="text-2xl md:text-3xl font-bold leading-[1.1] mb-4 uppercase">
                        ENTROPY<br />LEVEL
                      </h2>
                      <div className="font-mono text-sm leading-relaxed text-zinc-500 space-y-2">
                        <div>THERMAL_NOISE: {(Math.random() * 0.1).toFixed(4)}dB</div>
                        <div>VOID_DENSITY: {(Math.random() * 100).toFixed(2)}%</div>
                        <div>SIGNAL_PURITY: {error ? '0.00%' : loading ? 'ERR_CALC' : '99.98%'}</div>
                      </div>
                    </div>
                  </div>

                  {/* Muse Card */}
                  {gaze && !loading && (
                    <motion.div 
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      className="bg-surface p-10 md:p-20 border-t border-accent flex items-center justify-center text-center group"
                    >
                      <p className="italic text-lg md:text-2xl text-zinc-900 max-w-4xl leading-relaxed group-hover:text-accent transition-colors">
                        &ldquo;{gaze.muse}&rdquo;
                      </p>
                    </motion.div>
                  )}

                  {/* Reset Logic */}
                  {!loading && (
                    <div className="p-8 flex justify-center bg-bg">
                      <button 
                        onClick={() => { setGaze(null); setError(null); }}
                        className="font-mono text-[10px] md:text-xs text-accent/50 hover:text-accent tracking-[2px] uppercase transition-colors"
                      >
                        [ RESET_VOID_OBSERVATION ]
                      </button>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </main>

        {/* Footer Section */}
        <footer className="h-[40px] flex justify-between items-center px-5 font-mono text-[9px] text-zinc-400 uppercase tracking-tighter">
          <div>PROTOCOL: {error ? 'FAIL-X' : '77-B'}</div>
          <div className="hidden sm:block">TIMECODE: {time}</div>
          <div>REDACTED_ADVICE_FOLLOWS</div>
        </footer>
      </div>
    </div>
  );
}

