import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TextGenerateEffect } from './ui/text-generate-effect';

export const BootSequence = ({ onComplete }: { onComplete: () => void }) => {
    // Phases: 'typing' -> 'reveal' -> 'exit'
    const [phase, setPhase] = useState<'typing' | 'reveal'>('typing');
    const [text, setText] = useState('');
    const command = "> whoami";

    useEffect(() => {
        // Typing animation
        if (text.length < command.length) {
            const timeout = setTimeout(() => {
                setText(command.slice(0, text.length + 1));
            }, 100);
            return () => clearTimeout(timeout);
        } else {
            // Finished typing, wait before reveal
            const timeout = setTimeout(() => setPhase('reveal'), 500);
            return () => clearTimeout(timeout);
        }
    }, [text]);

    useEffect(() => {
        if (phase === 'reveal') {
            const timeout = setTimeout(onComplete, 2500); // Allow time for text reveal
            return () => clearTimeout(timeout);
        }
    }, [phase, onComplete]);

    return (
        <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
        >
            {/* Grid Background */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#333_1px,transparent_1px),linear-gradient(to_bottom,#333_1px,transparent_1px)] bg-[size:32px_32px] opacity-20 pointer-events-none"></div>

            <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-4xl px-4">

                {/* Command Line */}
                <div className="flex items-center gap-2 font-mono text-xl md:text-3xl text-gray-400 mb-8 h-10">
                    <span>{text}</span>
                    <motion.span
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ repeat: Infinity, duration: 0.8 }}
                        className="w-3 h-8 bg-green-500 block"
                    />
                </div>

                {/* Results */}
                <AnimatePresence>
                    {phase === 'reveal' && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="text-center space-y-4"
                        >
                            <div className="text-5xl md:text-8xl font-bold tracking-tighter text-white">
                                <TextGenerateEffect
                                    words="Neeraj"
                                    className="text-white"
                                    duration={0.8}
                                />
                            </div>
                            <div className="text-xl md:text-3xl font-mono text-green-500">
                                <TextGenerateEffect
                                    words="AI/ML Engineer"
                                    className="text-green-500"
                                    duration={0.8}
                                />
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
};
