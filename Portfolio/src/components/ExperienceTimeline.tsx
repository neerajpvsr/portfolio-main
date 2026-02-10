import { useState } from 'react';
import { content } from '../data/content';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Command, Code2, GitCommit, Calendar, MapPin } from 'lucide-react';

export const ExperienceTimeline = () => {
    // Track hover state for each card independently if needed, 
    // but CSS group-hover is often smoother for simple interactions.
    // However, for Framer Motion height animation, we need state or layout props.
    // Let's use Framer Motion's layout prop for automatic height animation.

    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    return (
        <div className="w-full relative">
            {/* Background Grid - Global now */}

            {/* Header */}
            <div className="mb-12 text-center md:text-left relative z-10 flex flex-col md:flex-row items-center md:items-center gap-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sys-dark border border-sys-border/50 text-console-dim text-xs font-mono">
                    <Terminal size={12} />
                    <span>user@portfolio:~/career</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
                    Experience<span className="text-console-accent">.log</span>
                </h2>
            </div>

            <div className="relative z-10">
                <div className="flex flex-col gap-5">
                    {content.experience.map((group, idx) => {
                        const latestRole = group.roles[0];
                        const isHovered = hoveredIndex === idx;

                        const borderColor = group.style === 'blue' ? 'group-hover:border-blue-500/50' :
                            group.style === 'cyan' ? 'group-hover:border-cyan-500/50' :
                                group.style === 'emerald' ? 'group-hover:border-emerald-500/50' :
                                    group.style === 'orange' ? 'group-hover:border-orange-500/50' :
                                        'group-hover:border-console-accent/50';

                        const titleColor = group.style === 'blue' ? 'text-blue-400' :
                            group.style === 'cyan' ? 'text-cyan-400' :
                                group.style === 'emerald' ? 'text-emerald-400' :
                                    group.style === 'orange' ? 'text-orange-400' :
                                        'text-console-accent';

                        const glowColor = group.style === 'blue' ? 'shadow-blue-500/20' :
                            group.style === 'cyan' ? 'shadow-cyan-500/20' :
                                group.style === 'emerald' ? 'shadow-emerald-500/20' :
                                    group.style === 'orange' ? 'shadow-orange-500/20' :
                                        'shadow-emerald-500/20';

                        return (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 15 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.2, delay: idx * 0.05 }}
                                className="w-full"
                                onMouseEnter={() => setHoveredIndex(idx)}
                                onMouseLeave={() => setHoveredIndex(null)}
                            >
                                {/* Terminal Window Card - EXPANDABLE */}
                                <motion.div
                                    className={`
                                        group relative bg-[#0a0a0a] border border-[#222] rounded-lg overflow-hidden cursor-pointer transition-colors duration-300
                                        ${borderColor} ${isHovered ? `shadow-2xl ${glowColor}` : ''}
                                    `}
                                    layout // This handles the smooth height resizing
                                >
                                    {/* Window Header */}
                                    <div className="h-7 border-b border-[#222] bg-[#111] flex items-center justify-between px-3">
                                        <div className="flex items-center gap-1.5">
                                            <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56] border border-[#E0443E]"></div>
                                            <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E] border border-[#D8A123]"></div>
                                            <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F] border border-[#1AAB29]"></div>
                                        </div>
                                        <div className="text-[10px] font-mono text-gray-600 flex items-center gap-1">
                                            <Command size={9} /> {group.host.toLowerCase()}
                                        </div>
                                    </div>

                                    {/* Window Content */}
                                    <div className="p-4 md:p-6">
                                        <motion.div layout="position" className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-4 mb-3">
                                            <div className="flex items-center gap-2">
                                                <span className="text-emerald-500 font-bold text-sm">➜</span>
                                                <h3 className="text-lg md:text-xl font-bold text-white tracking-tight leading-none">
                                                    {latestRole.title}
                                                </h3>
                                                <span className={`text-sm font-mono ${titleColor} opacity-80`}>
                                                    @ {group.host}
                                                </span>
                                            </div>

                                            <div className="flex items-center gap-3 pl-5 sm:pl-0">
                                                <div className="px-2 py-0.5 rounded bg-[#1a1a1a] border border-[#333] text-gray-400 text-[10px] font-mono">
                                                    {latestRole.period}
                                                </div>
                                                {group.roles.some((r: any) => r.status === 'RUNNING') && (
                                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
                                                )}
                                            </div>
                                        </motion.div>

                                        {/* Brief Description (Always Visible) */}
                                        <motion.div layout="position" className="pl-5 border-l border-[#222] ml-1.5 relative">
                                            <p className={`text-gray-400 text-xs md:text-sm leading-relaxed font-sans transition-all duration-300 ${isHovered ? '' : 'line-clamp-2'}`}>
                                                {latestRole.focus}
                                            </p>
                                        </motion.div>

                                        {/* Expanded Content (Hover Only) */}
                                        <AnimatePresence>
                                            {isHovered && (
                                                <motion.div
                                                    initial={{ opacity: 0, height: 0 }}
                                                    animate={{ opacity: 1, height: 'auto' }}
                                                    exit={{ opacity: 0, height: 0 }}
                                                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                                                    className="pl-5 border-l border-[#222] ml-1.5 overflow-hidden"
                                                >
                                                    <div className="pt-6 space-y-6">

                                                        {/* Full Tech Stack for Latest Role */}
                                                        {latestRole.techStack && (
                                                            <div className="space-y-2">
                                                                <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-wider flex items-center gap-2">
                                                                    <Code2 size={10} /> Current Stack
                                                                </h4>
                                                                <div className="flex flex-wrap gap-1.5">
                                                                    {latestRole.techStack.map((tech: string, i: number) => (
                                                                        <span key={i} className="px-2 py-1 bg-[#151515] border border-[#333] rounded text-[10px] font-mono text-gray-300">
                                                                            {tech}
                                                                        </span>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        )}

                                                        {/* Previous Roles History */}
                                                        {group.roles.length > 1 && (
                                                            <div className="pt-4 border-t border-[#222] space-y-4">
                                                                <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-wider flex items-center gap-2">
                                                                    <GitCommit size={10} /> Role History
                                                                </h4>
                                                                <div className="space-y-4 relative">
                                                                    {/* Timeline Line */}
                                                                    <div className="absolute left-[5px] top-2 bottom-2 w-px bg-[#222]"></div>

                                                                    {group.roles.slice(1).map((role: any, rIdx: number) => (
                                                                        <div key={rIdx} className="pl-4 relative">
                                                                            <div className="absolute left-[3px] top-[7px] w-1.5 h-1.5 rounded-full bg-[#333]"></div>
                                                                            <div className="flex justify-between items-baseline mb-1">
                                                                                <h5 className="text-sm font-bold text-gray-300">{role.title}</h5>
                                                                                <span className="text-[10px] font-mono text-gray-500">{role.period}</span>
                                                                            </div>
                                                                            <p className="text-xs text-gray-500 mb-2">{role.focus}</p>
                                                                            {role.techStack && (
                                                                                <div className="flex flex-wrap gap-1">
                                                                                    {role.techStack.map((t: string, ti: number) => (
                                                                                        <span key={ti} className="text-[9px] text-gray-600 px-1.5 py-0.5 border border-[#222] rounded bg-[#111]">
                                                                                            {t}
                                                                                        </span>
                                                                                    ))}
                                                                                </div>
                                                                            )}
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        )}

                                                        {/* Meta Data */}
                                                        <div className="flex flex-wrap gap-4 pt-2 border-t border-[#222]">
                                                            <div className="flex items-center gap-1.5 text-[10px] font-mono text-gray-500">
                                                                <Calendar size={10} />
                                                                {latestRole.period}
                                                            </div>
                                                            <div className="flex items-center gap-1.5 text-[10px] font-mono text-gray-500">
                                                                <MapPin size={10} />
                                                                {latestRole.location || 'Remote'}
                                                            </div>
                                                            <div className="flex items-center gap-1.5 text-[10px] font-mono text-gray-500">
                                                                <GitCommit size={10} />
                                                                {latestRole.status || 'COMMITTED'}
                                                            </div>
                                                        </div>

                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>

                                    </div>
                                </motion.div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};
