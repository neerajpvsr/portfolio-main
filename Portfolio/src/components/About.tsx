import { Section } from './Section';

import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Terminal } from 'lucide-react';
import { TextGenerateEffect } from './ui/text-generate-effect';
import { useEffect, useRef, useState } from 'react';

// Counter Component for Metrics
const Counter = ({ value, label }: { value: number, label: string }) => {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-50px" });
    const motionValue = useMotionValue(0);
    const springValue = useSpring(motionValue, { damping: 50, stiffness: 100 });
    const rounded = useTransform(springValue, (latest) => Math.round(latest));

    // Create dots for alignment
    const dots = ".".repeat(Math.max(0, 30 - label.length));

    useEffect(() => {
        if (inView) {
            motionValue.set(value);
        }
    }, [inView, value, motionValue]);

    const [displayValue, setDisplayValue] = useState(0);

    useEffect(() => {
        return rounded.on("change", (latest) => {
            setDisplayValue(latest);
        });
    }, [rounded]);

    return (
        <div ref={ref} className="font-mono text-sm md:text-base text-console-dim flex justify-between md:justify-start gap-2">
            <span>{label} {dots}</span>
            <span className="text-console-text font-bold">
                {displayValue}{value > 100 || label.includes('year') ? '+' : '+'}
            </span>
        </div>
    );
};

export const About = () => {
    // 3. Specialization Stream Data
    const domains = [
        "agentic_ai", "document_intelligence", "bfsi_ai",
        "rag_pipelines", "ai_governance", "aiops",
        "computer_vision", "generative_models", "system_design"
    ];

    // 4. Personality Modules Data
    const modules = [
        "neuroscience",
        "cosmology",
        "geopolitics",
        "calisthenics"
    ];

    return (
        <Section id="about" className="!pb-0">
            <div className="mb-8 text-center md:text-left relative z-10 flex flex-col md:flex-row items-center md:text-left gap-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sys-dark border border-sys-border/50 text-console-dim text-xs font-mono">
                    <Terminal size={12} />
                    <span>user@portfolio:~/about</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
                    About<span className="text-console-accent">.sys</span>
                </h2>
            </div>

            <div className="w-full space-y-12">

                {/* 1. IDENTITY - Text Generation */}
                <div className="flex flex-col items-center w-full">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        className="border-l-2 border-console-accent/20 pl-6 md:pl-10 w-full"
                    >
                        <TextGenerateEffect
                            words="AI/ML Engineer focused on building production-ready intelligent systems. Dual Bachelor’s in CSE and Data Science. Currently working across Agentic AI, BFSI document intelligence, and scalable AI pipelines — prioritizing reliability, governance, and long-term impact over noise."
                            duration={1.2}
                            filter={true}
                            className="text-console-text font-normal text-xl md:text-2xl leading-relaxed"
                        />
                    </motion.div>
                </div>

                {/* 2. METRICS & PERSONALITY (Centered Grid) */}
                <div className="grid md:grid-cols-2 gap-8 md:gap-12 max-w-4xl mx-auto items-start">
                    {/* PERSONALITY.MODULES (Swapped to Left) */}
                    <div className="md:pl-12">
                        <div className="font-mono text-console-dim text-xs mb-4">
                            {">"} ./load_personality_modules
                            <br />
                            <span className="text-console-muted">initializing...</span>
                        </div>

                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-50px" }}
                            variants={{
                                visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
                            }}
                            className="space-y-3 font-mono text-sm pl-4"
                        >
                            {modules.map((mod, i) => (
                                <motion.div
                                    key={i}
                                    variants={{
                                        hidden: { opacity: 0, x: -10 },
                                        visible: { opacity: 1, x: 0 }
                                    }}
                                    className="flex items-center gap-3 text-console-text/80 group/item"
                                >
                                    <span className="text-console-success">✓</span>
                                    <span className="group-hover/item:text-console-light transition-colors hover:text-console-accent cursor-default">
                                        {mod}
                                    </span>
                                </motion.div>
                            ))}
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 1.5 }}
                            className="mt-6 font-mono text-xs text-console-dim pl-4"
                        >
                            status: <span className="text-console-success">modules_loaded</span>
                        </motion.div>
                    </div>

                    {/* IMPACT.METRICS (Swapped to Right) */}
                    <div>
                        <div className="font-mono text-console-dim text-xs mb-4">
                            {">"} ./load_impact_metrics
                            <br />
                            <span className="text-console-muted">analyzing...</span>
                        </div>
                        <div className="pl-4 space-y-3 font-mono text-sm">
                            <Counter label="years_experience" value={2} />
                            <Counter label="systems_delivered" value={5} />
                            <Counter label="learners_mentored" value={150} />
                            <Counter label="cloud_certifications" value={4} />
                        </div>
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.5 }}
                            className="mt-6 font-mono text-xs text-console-dim pl-4"
                        >
                            status: <span className="text-console-success">metrics_loaded</span>
                        </motion.div>
                    </div>
                </div>

                {/* 3. SYSTEM KERNEL (Moved Down) */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                    className="w-full text-center py-2"
                >
                    {/* <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sys-surface/50 border border-sys-border/30 text-console-dim text-xs font-mono mb-4">
                        <span>{">"} system.kernel</span>
                    </div> */}
                    <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight leading-tight">
                        Build robust systems. Scale intelligence. <span className="text-console-accent decoration-console-accent/30 underline underline-offset-8 decoration-2">Minimize entropy.</span>
                    </h2>
                </motion.div>

            </div>

            {/* 4. TICKER / BANNER (Moved to End) */}
            <div className="overflow-hidden py-6 relative w-screen left-1/2 -translate-x-1/2 mt-8">
                <div className="absolute top-0 left-0 bottom-0 w-32 bg-gradient-to-r from-sys-black to-transparent z-10"></div>
                <div className="absolute top-0 right-0 bottom-0 w-32 bg-gradient-to-l from-sys-black to-transparent z-10"></div>

                <div className="flex whitespace-nowrap overflow-hidden">
                    <motion.div
                        className="flex gap-12 items-center"
                        animate={{ x: ["0%", "-50%"] }}
                        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                    >
                        {[...domains, ...domains, ...domains, ...domains].map((domain, i) => (
                            <span key={i} className="text-console-text/40 font-mono text-sm uppercase tracking-[0.3em] flex items-center gap-12">
                                {domain} <span className="text-console-accent/20">•</span>
                            </span>
                        ))}
                    </motion.div>
                </div>
            </div>
        </Section>
    );
};
