import { content } from '../data/content';
import { Section } from './Section';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';



const TerminalTyper = ({ items, delay = 0 }: { items: any[], delay?: number }) => {
    const [charIndex, setCharIndex] = useState(0);
    const [startTyping, setStartTyping] = useState(false);

    // Calculate the full text layout to determine total length
    // We'll use this to control the typing animation progress
    const separator = " | ";
    const fullTextLength = items.reduce((acc, item, index) => {
        return acc + item.name.length + (index < items.length - 1 ? separator.length : 0);
    }, 0);

    useEffect(() => {
        const timer = setTimeout(() => {
            setStartTyping(true);
        }, delay * 1000);
        return () => clearTimeout(timer);
    }, [delay]);

    useEffect(() => {
        if (!startTyping) return;

        const typingInterval = setInterval(() => {
            setCharIndex((prev) => {
                if (prev < fullTextLength) {
                    return prev + 1;
                }
                clearInterval(typingInterval);
                return prev;
            });
        }, 40); // Typing speed

        return () => clearInterval(typingInterval);
    }, [startTyping, fullTextLength]);

    // Render logic
    let runningCharCount = 0;

    return (
        <div className="font-mono text-sm md:text-base text-console-text min-h-[1.5em] break-all leading-relaxed">
            <span className="text-console-dim mr-2 select-none">{`>>`}</span>
            {items.map((item, index) => {
                const isLast = index === items.length - 1;
                const itemStart = runningCharCount;
                const itemEnd = itemStart + item.name.length;
                const sepEnd = itemEnd + (isLast ? 0 : separator.length);

                // Update running count for next iteration
                runningCharCount = sepEnd;

                // Determine what to show
                const showIcon = charIndex >= itemStart; // Show icon when typing starts for this item
                const visibleTextLength = Math.max(0, Math.min(item.name.length, charIndex - itemStart));
                const visibleText = item.name.slice(0, visibleTextLength);

                const visibleSepLength = Math.max(0, Math.min(separator.length, charIndex - itemEnd));
                const visibleSep = isLast ? "" : separator.slice(0, visibleSepLength);

                if (!showIcon && visibleTextLength === 0 && visibleSepLength === 0) return null;

                return (
                    <span key={index} className="inline-flex items-center align-middle">
                        <span className="inline-flex items-center transition-transform duration-300 ease-out hover:scale-110 cursor-pointer origin-center pl-1">
                            {showIcon && item.icon && (
                                <img
                                    src={item.icon}
                                    alt=""
                                    className="w-5 h-5 mr-1.5 inline-block opacity-100 transition-opacity duration-300"
                                    style={{
                                        animation: 'fadeIn 0.2s ease-out forwards',
                                        verticalAlign: 'middle' // Ensure alignment with text
                                    }}
                                />
                            )}
                            <span>{visibleText}</span>
                        </span>
                        <span>{visibleSep}</span>
                    </span>
                );
            })}
            <motion.span
                animate={{ opacity: [1, 1, 0, 0] }}
                transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    times: [0, 0.5, 0.5, 1],
                    ease: "linear"
                }}
                className="inline-block w-2 h-4 bg-[#16a34a] ml-1 align-middle"
            />
        </div>
    );
};

export const Skills = () => {
    const { skills } = content;

    return (
        <Section id="skills" className="pb-20">
            <div className="mb-8 relative z-10 px-4 md:px-8">
                <h2 className="text-3xl md:text-3xl font-bold text-white tracking-tight mb-2">
                    Skills<span className="text-[#16a34a]">.exe</span>
                </h2>
            </div>

            <div className="w-full max-w-6xl mx-auto px-4 md:px-8 flex flex-col gap-6">
                {skills.map((group, groupIdx) => (
                    <div key={groupIdx} className="flex flex-col md:flex-row items-baseline gap-4 md:gap-8 border-b border-sys-border/20 pb-6 last:border-0 relative">
                        {/* Connecting Line (Decorative) */}
                        <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-sys-border/20 md:hidden"></div>

                        {/* Left: Domain Header */}
                        <div className="w-full md:w-64 shrink-0 relative pl-4 md:pl-0">
                            <h3 className="text-lg font-bold text-white font-mono flex items-center gap-3 group">
                                <span className="text-[#16a34a] hidden md:inline group-hover:animate-pulse">{">"}</span>
                                <span className="group-hover:text-[#16a34a] transition-colors duration-300 pointer-events-none">
                                    {group.category}
                                </span>
                            </h3>
                        </div>

                        {/* Right: Skill Terminal text */}
                        <div className="flex-1 pl-4 md:pl-0 w-full">
                            <TerminalTyper items={group.items} delay={groupIdx * 1.5} />
                        </div>
                    </div>
                ))}
            </div>
        </Section>
    );
};
