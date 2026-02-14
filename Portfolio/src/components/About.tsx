import { Section } from './Section';

import { motion } from 'framer-motion';
import { TextGenerateEffect } from './ui/text-generate-effect';


// Rolling Digit Component
const RollingDigit = ({ digit, delay = 0 }: { digit: number, delay?: number }) => {
    return (
        <div className="relative h-[1em] w-[0.6em] overflow-hidden">
            <motion.div
                initial={{ y: 0 }}
                whileInView={{ y: -1 * digit * 10 + "%" }}
                viewport={{ once: true }}
                transition={{
                    duration: 3,
                    ease: [0.34, 1.56, 0.64, 1], // Elastic/Cartoonish ease
                    delay: delay
                }}
                className="absolute top-0 left-0 flex flex-col items-center"
            >
                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                    <span key={num} className="h-[1em] flex items-center justify-center">
                        {num}
                    </span>
                ))}
            </motion.div>
        </div>
    );
};

// Rolling Number Component
const RollingNumber = ({ value }: { value: number }) => {
    const digits = value.toString().split('').map(Number);
    return (
        <div className="flex items-center">
            {digits.map((d, i) => (
                <RollingDigit key={i} digit={d} delay={i * 0.1} />
            ))}
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

    const metrics = [
        { label: "years_experience", value: 2 },
        { label: "systems_delivered", value: 5 },
        { label: "learners_mentored", value: 150 },
        { label: "cloud_certifications", value: 4 }
    ];

    return (
        <Section id="about" className="!pb-0">
            <div className="mb-8 text-center md:text-left relative z-10 flex flex-col md:flex-row items-center md:text-left gap-4">
                <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
                    About<span className="text-console-accent">.sys</span>
                </h2>
            </div>

            <div className="w-full space-y-16">

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

                {/* 2. PERSONALITY (Centered) */}
                <div className="max-w-2xl mx-auto text-center">
                    <div className="font-mono text-console-dim text-xs mb-6">
                        {">"} ./load_personality_modules <span className="text-console-success">--verbose</span>
                    </div>

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-50px" }}
                        variants={{
                            visible: { transition: { staggerChildren: 0.1 } }
                        }}
                        className="flex flex-wrap justify-center gap-4 md:gap-8"
                    >
                        {modules.map((mod, i) => (
                            <motion.div
                                key={i}
                                variants={{
                                    hidden: { opacity: 0, scale: 0.9 },
                                    visible: { opacity: 1, scale: 1 }
                                }}
                                className="px-4 py-2 bg-sys-surface/40 border border-sys-border/50 rounded-full font-mono text-sm text-console-text/80 hover:border-console-accent/50 hover:text-console-accent transition-all cursor-crosshair"
                            >
                                {mod}
                            </motion.div>
                        ))}
                    </motion.div>
                </div>

                {/* 3. IMPACT METRICS (Cartoon Rolling Mode) */}
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 px-4 md:px-0">
                        {metrics.map((m, i) => (
                            <div
                                key={i}
                                className="flex flex-col items-center justify-center p-4"
                            >
                                <div className="flex items-center justify-center gap-1 mb-2">
                                    <div className="text-6xl md:text-7xl font-black text-white tracking-tighter overflow-hidden h-[1em] flex items-center">
                                        <RollingNumber value={m.value} />
                                    </div>
                                    <motion.span
                                        initial={{ opacity: 0, scale: 0.5 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: 2.5, type: "spring" }}
                                        className="text-3xl md:text-4xl text-console-accent font-bold pb-1"
                                    >
                                        +
                                    </motion.span>
                                </div>
                                <div className="text-xs font-mono text-gray-500 uppercase tracking-widest text-center">
                                    {m.label.replace(/_/g, ' ')}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>




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
