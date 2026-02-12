import { useState } from 'react';
import { content } from '../data/content';
import { motion, AnimatePresence } from 'framer-motion';
import { Command, BookOpen, GraduationCap, Calendar, Award } from 'lucide-react';

export const EducationFetch = () => {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    return (
        <div id="education" className="w-full relative">
            {/* Header */}
            <div className="mb-12 text-center md:text-left relative z-10 flex flex-col md:flex-row items-center md:items-center gap-4">

                <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
                    Education<span className="text-console-warn">.sh</span>
                </h2>
            </div>

            <div className="relative z-10">
                <div className="flex flex-col gap-5">
                    {content.education.map((edu: any, idx) => {
                        const isHovered = hoveredIndex === idx;

                        // Alternate themes for education cards
                        const theme = idx % 2 === 0 ? 'blue' : 'yellow';

                        const borderColor = theme === 'blue' ? 'group-hover:border-blue-500/50' : 'group-hover:border-yellow-500/50';
                        const titleColor = theme === 'blue' ? 'text-blue-400' : 'text-yellow-400';
                        const glowColor = theme === 'blue' ? 'shadow-blue-500/20' : 'shadow-yellow-500/20';


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
                                {/* Terminal Window Card */}
                                <motion.div
                                    className={`
                                        group relative bg-[#0a0a0a] border border-[#222] rounded-lg overflow-hidden cursor-pointer transition-colors duration-300
                                        ${borderColor} ${isHovered ? `shadow-2xl ${glowColor}` : ''}
                                    `}
                                    layout
                                >
                                    {/* Window Header */}
                                    <div className="h-7 border-b border-[#222] bg-[#111] flex items-center justify-between px-3">
                                        <div className="flex items-center gap-1.5">
                                            <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56] border border-[#E0443E]"></div>
                                            <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E] border border-[#D8A123]"></div>
                                            <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F] border border-[#1AAB29]"></div>
                                        </div>
                                        <div className="text-[10px] font-mono text-gray-600 flex items-center gap-1">
                                            <Command size={9} /> student@{edu.institution.split(' ')[0].toLowerCase()}
                                        </div>
                                    </div>

                                    {/* Window Content */}
                                    <div className="p-4 md:p-6">
                                        <motion.div layout="position" className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-4 mb-3">
                                            <div className="flex items-center gap-2">
                                                <span className={`font-bold text-sm ${theme === 'blue' ? 'text-blue-500' : 'text-yellow-500'}`}>➜</span>
                                                <h3 className="text-lg md:text-xl font-bold text-white tracking-tight leading-none">
                                                    {edu.degree.split('—')[0].trim()}
                                                </h3>
                                                <span className={`text-sm font-mono ${titleColor} opacity-80`}>
                                                    @ {edu.institution}
                                                </span>
                                            </div>

                                            <div className="flex items-center gap-3 pl-5 sm:pl-0">
                                                <div className="px-2 py-0.5 rounded bg-[#1a1a1a] border border-[#333] text-gray-400 text-[10px] font-mono">
                                                    {edu.period}
                                                </div>
                                            </div>
                                        </motion.div>

                                        {/* Brief Description */}
                                        <motion.div layout="position" className="pl-5 border-l border-[#222] ml-1.5 relative">
                                            <p className={`text-gray-400 text-xs md:text-sm leading-relaxed font-sans transition-all duration-300 ${isHovered ? '' : 'line-clamp-2'}`}>
                                                {edu.degree.split('—')[1] ? edu.degree.split('—')[1].trim() : edu.focus}
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

                                                        {/* Coursework / Focus */}
                                                        {edu.coursework && (
                                                            <div className="space-y-2">
                                                                <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-wider flex items-center gap-2">
                                                                    <BookOpen size={10} /> Coursework
                                                                </h4>
                                                                <div className="flex flex-wrap gap-1.5">
                                                                    {edu.coursework.map((course: string, i: number) => (
                                                                        <span key={i} className="px-2 py-1 bg-[#151515] border border-[#333] rounded text-[10px] font-mono text-gray-300">
                                                                            {course}
                                                                        </span>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        )}

                                                        {/* Meta Data */}
                                                        <div className="flex flex-wrap gap-4 pt-2 border-t border-[#222]">
                                                            <div className="flex items-center gap-1.5 text-[10px] font-mono text-gray-500">
                                                                <Calendar size={10} />
                                                                {edu.period}
                                                            </div>
                                                            <div className="flex items-center gap-1.5 text-[10px] font-mono text-gray-500">
                                                                <GraduationCap size={10} />
                                                                {edu.degree.includes('B.Tech') ? 'Bachelor of Technology' : 'Bachelor of Science'}
                                                            </div>
                                                            <div className="flex items-center gap-1.5 text-[10px] font-mono text-gray-500">
                                                                <Award size={10} />
                                                                GPA: {idx === 0 ? '8.5/10' : '9.0/10'}
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

                {/* Certifications (Stacked Under Education) */}
                <div className="mt-8 pt-8 border-t border-[#222]">
                    <div className="mb-8 relative z-10 flex flex-col md:flex-row items-center md:items-center gap-4">

                        <h2 className="text-2xl md:text-2xl font-bold text-white tracking-tight">
                            Certifications<span className="text-purple-400">.ext</span>
                        </h2>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        {content.certifications.map((cert, index) => (
                            <a
                                key={index}
                                href={cert.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group relative flex items-center justify-center p-4 transition-transform hover:scale-150 duration-300"
                                title={cert.name}
                            >
                                <img
                                    src={cert.image}
                                    alt={cert.name}
                                    className="h-20 w-auto object-contain transition-all duration-300 hover:drop-shadow-[0_0_15px_rgba(168,85,247,0.8)]"
                                />
                            </a>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
};
