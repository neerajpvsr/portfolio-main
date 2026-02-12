import { useEffect, useState, useRef } from 'react';
import { Terminal, ArrowRight } from 'lucide-react';
import { content } from '../data/content';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';

export const Hero = () => {
    const { name, role, resumeLink, profileImage } = content.hero;
    const navigate = useNavigate();
    const [descriptorIndex, setDescriptorIndex] = useState(0);

    const descriptors = [
        "designing AI pipelines for production systems",
        "scaling machine learning architectures",
        "optimizing intelligent workflows",
        "minimizing entropy in complex systems"
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setDescriptorIndex((prev) => (prev + 1) % descriptors.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    const containerRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });
    const linePosition = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
    const lineOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.2, 0.8, 0.2]);

    return (
        <section ref={containerRef} className="min-h-[85vh] flex items-center pt-28 pb-12 relative overflow-hidden">

            {/* Background Grid Decoration */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#111_1px,transparent_1px),linear-gradient(to_bottom,#111_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none opacity-20"></div>

            <div className="container-terminal relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-[55%_1px_40%] gap-8 items-center justify-center">

                    {/* Left Column: Content (Widened) */}
                    <div className="space-y-10 order-2 md:order-1 pl-0 md:pl-12">

                        <div className="font-mono text-console-accent text-sm mb-4">
                            $ whoami
                        </div>

                        <div className="space-y-6">
                            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold leading-none tracking-tighter text-console-text">
                                {name}
                                <span className="text-console-accent animate-pulse">_</span>
                            </h1>

                            <div className="flex items-center gap-3 text-lg md:text-xl font-mono text-console-success bg-sys-surface/50 w-fit px-4 py-2 rounded border border-sys-border">
                                <span className="text-console-muted">role:</span>
                                "{role}"
                            </div>

                            {/* Rotating Descriptors (Absolute Ticker) */}
                            <div className="h-12 overflow-hidden relative font-mono text-lg md:text-xl text-console-dim border-l-2 border-sys-border pl-6 max-w-full">
                                <AnimatePresence initial={false}>
                                    <motion.div
                                        key={descriptorIndex}
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -30 }}
                                        transition={{ duration: 0.5, ease: "easeInOut" }}
                                        className="absolute top-0 left-6 h-full flex items-center whitespace-nowrap"
                                    >
                                        {">"} {descriptors[descriptorIndex]}
                                    </motion.div>
                                </AnimatePresence>
                            </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-5 pt-2">
                            <a
                                href={resumeLink}
                                download
                                className="group flex items-center gap-3 px-6 py-3 bg-console-text text-sys-black font-mono font-bold text-sm rounded hover:bg-white transition-all shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]"
                            >
                                <Terminal size={16} />
                                <span>./download_resume</span>
                            </a>
                            <button
                                onClick={() => navigate('/projects')}
                                className="group flex items-center gap-3 px-6 py-3 border border-sys-border text-console-text font-mono font-bold text-sm rounded transition-all bg-sys-surface/50 shadow-[4px_4px_0px_0px_rgba(255,255,255,0.1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] hover:border-console-accent hover:text-console-accent"
                            >
                                <span>cd ./projects</span>
                                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    </div>

                    {/* Middle Column: Animated Divider (High Visibility) */}
                    <div className="hidden md:block w-0.5 bg-sys-border/40 h-[450px] mx-auto relative overflow-hidden order-last md:order-2 rounded-full">
                        <motion.div
                            className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-transparent via-console-accent to-transparent shadow-[0_0_15px_rgba(74,222,128,0.3)]"
                            style={{ top: linePosition, opacity: lineOpacity }}
                        />
                    </div>

                    {/* Right Column: Visual (New Right Side) */}
                    <div className="order-1 md:order-3 flex justify-center md:justify-end relative">
                        <div className="relative w-64 h-64 md:w-[380px] md:h-[380px] grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-700">
                            {/* Rotating Rings */}
                            <motion.div
                                className="absolute inset-0 rounded-full border-2 border-sys-border"
                                animate={{ rotate: 360 }}
                                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                            />
                            <motion.div
                                className="absolute -inset-4 rounded-full border border-console-accent/20 border-dashed"
                                animate={{ rotate: -360 }}
                                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                            />
                            <img
                                src={profileImage}
                                alt={name}
                                className="w-full h-full object-cover rounded-full border-4 border-sys-dark relative z-10"
                            />

                            {/* Floating Stats */}
                            <div className="absolute -right-4 -bottom-4 md:-right-8 md:-bottom-8 bg-sys-black border border-sys-border p-3 font-mono text-xs text-console-muted z-20 shadow-xl rounded backdrop-blur-md">
                                <div>CPU: 23%</div>
                                <div>MEM: 4.2GB</div>
                                <div className="text-console-success">SYS: ONLINE</div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};
