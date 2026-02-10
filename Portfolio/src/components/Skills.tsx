import { content } from '../data/content';
import { Section } from './Section';
import { motion, useInView } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { Terminal } from 'lucide-react';

const BinaryStream = () => {
    // Generate a long string of block characters for the animation
    const stream = "█-█-█-█-█-█-█-█-█-█-";

    return (
        <div className="overflow-hidden whitespace-nowrap mask-gradient font-mono text-[10px] w-32 select-none text-console-accent">
            <motion.div
                animate={{ x: ["0%", "-50%"] }}
                transition={{
                    repeat: Infinity,
                    duration: 5,
                    ease: "linear",
                }}
                className="flex gap-0"
            >
                <span>{stream}</span>
                <span>{stream}</span>
            </motion.div>
        </div>
    );
};

const SkillProcess = ({ category, items }: { category: string, items: any[] }) => {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, amount: 0.2 });
    const [status, setStatus] = useState("WAITING");

    useEffect(() => {
        if (inView) {
            setStatus("TRANSFERRING");
            const timer = setTimeout(() => {
                setStatus("COMPLETE");
            }, 800); // Quick sync
            return () => clearTimeout(timer);
        }
    }, [inView]);

    return (
        <div ref={ref} className="group font-mono p-5 border border-sys-border/40 bg-sys-black/40 hover:bg-sys-surface/40 hover:border-console-accent/30 transition-all duration-300 rounded overflow-hidden relative">
            {/* Corner Markers */}
            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-console-dim opacity-20 group-hover:opacity-100 transition-opacity"></div>
            <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-console-dim opacity-20 group-hover:opacity-100 transition-opacity"></div>
            <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-console-dim opacity-20 group-hover:opacity-100 transition-opacity"></div>
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-console-dim opacity-20 group-hover:opacity-100 transition-opacity"></div>

            {/* Compact Header Line */}
            <div className="flex flex-wrap items-center gap-3 text-xs md:text-sm mb-4 border-b border-sys-border/30 pb-3">
                <span className="text-console-accent font-bold whitespace-nowrap">
                    ./{category.toLowerCase().replace(/\s+/g, '-')}
                </span>

                {/* Inline Binary Stream */}
                <div className="flex items-center gap-2 overflow-hidden opacity-40 group-hover:opacity-80 transition-opacity">
                    <span className="text-console-dim hidden md:inline">{`>>`}</span>
                    <BinaryStream />
                </div>

                <span className={`text-xs font-bold tracking-wider ${status === "COMPLETE" ? "text-console-success animate-pulse" : "text-console-warn"}`}>
                    [{status === "COMPLETE" ? "LIVE" : "SYNC"}]
                </span>
            </div>

            {/* Icons Reveal - Direct reveal under header */}
            <div className="min-h-[2rem]">
                {status === "COMPLETE" && (
                    <motion.div
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ staggerChildren: 0.05 }}
                        className="flex flex-wrap gap-x-6 gap-y-4"
                    >
                        {items.map((skill: any, idx: number) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="flex items-center gap-2"
                            >
                                <img
                                    src={skill.icon}
                                    alt={skill.name}
                                    className="w-4 h-4 object-contain transition-all duration-300 transform group-hover:scale-110"
                                />
                                <span className="text-xs text-console-dim group-hover:text-console-text transition-colors duration-300">
                                    {skill.name}
                                </span>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export const Skills = () => {
    const { skills } = content;

    return (
        <Section id="skills">
            <div className="mb-12 relative z-10 px-4 md:px-8 flex flex-col md:flex-row items-start md:items-center gap-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sys-dark border border-sys-border/50 text-console-dim text-xs font-mono">
                    <Terminal size={12} />
                    <span>user@portfolio:~/skills</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
                    Skills<span className="text-orange-400">.yaml</span>
                </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full mx-auto px-4 md:px-8">
                {skills.map((skillGroup, idx) => (
                    <SkillProcess
                        key={idx}
                        category={skillGroup.category}
                        items={skillGroup.items}
                    />
                ))}
            </div>
        </Section>
    );
};
