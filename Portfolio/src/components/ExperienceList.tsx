import { useState } from 'react';
import { content } from '../data/content';
import { Section } from './Section';
import { ExperienceDetailPane } from './ExperienceDetailPane';
import { Maximize2 } from 'lucide-react';

export const ExperienceList = () => {
    const [selectedGroup, setSelectedGroup] = useState<any | null>(null);

    return (
        <Section id="experience">
            <div className="terminal-header mb-6">
                <span className="terminal-prompt">$</span> ps aux | grep experience
            </div>

            {/* Horizontal Scroll Container */}
            <div className="relative group">
                {/* Scroll Fade Hints */}
                <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-sys-black to-transparent z-10 pointer-events-none md:hidden" />
                <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-sys-black to-transparent z-10 pointer-events-none md:hidden" />

                <div className="flex overflow-x-auto gap-4 pb-6 pt-2 px-1 custom-scrollbar snap-x">
                    {content.experience.map((group, idx) => {
                        const latestRole = group.roles[0];
                        const isRunning = group.roles.some((r: any) => r.status === 'RUNNING');

                        return (
                            <div
                                key={idx}
                                onClick={() => setSelectedGroup(group)}
                                className={`
                                    relative min-w-[280px] md:min-w-[320px] p-5 rounded-lg border cursor-pointer transition-all duration-300 snap-center
                                    flex flex-col justify-between gap-4 group/card hover:-translate-y-1 hover:shadow-lg
                                    ${selectedGroup === group
                                        ? 'bg-console-accent/5 border-console-accent shadow-[0_0_15px_rgba(59,130,246,0.2)]'
                                        : 'bg-sys-dark border-sys-border hover:border-console-accent/50'
                                    }
                                `}
                            >
                                {/* Header: Company & Logo */}
                                <div className="flex items-start justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded bg-sys-surface border border-sys-border flex items-center justify-center p-1.5">
                                            {group.logo ? (
                                                <img src={group.logo} alt="" className="w-full h-full object-contain opacity-90" />
                                            ) : (
                                                <div className="font-bold text-lg text-console-muted">
                                                    {group.host.substring(0, 1)}
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="font-bold text-sm text-console-text leading-tight">{group.host}</span>
                                            <span className="text-[10px] font-mono text-console-dim">
                                                PID: {Math.floor(Math.random() * 9000) + 1000}
                                            </span>
                                        </div>
                                    </div>
                                    {isRunning && (
                                        <div className="w-2 h-2 rounded-full bg-console-success animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
                                    )}
                                </div>

                                {/* Main: Latest Role */}
                                <div>
                                    <div className="font-mono text-xs text-console-accent mb-1">CURRENT PROCESS:</div>
                                    <div className="font-bold text-lg text-console-text leading-tight group-hover/card:text-console-accent transition-colors">
                                        {latestRole.title}
                                    </div>
                                    {group.roles.length > 1 && (
                                        <div className="text-[10px] text-console-muted mt-1 font-mono">
                                            + {group.roles.length - 1} background processes
                                        </div>
                                    )}
                                </div>

                                {/* Footer: Timeline */}
                                <div className="border-t border-sys-border pt-3 flex items-center justify-between font-mono text-xs text-console-dim">
                                    <span>{latestRole.period}</span>
                                    <Maximize2 size={14} className="opacity-0 group-hover/card:opacity-100 transition-opacity text-console-accent" />
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Side Drawer Detail View */}
            <ExperienceDetailPane group={selectedGroup} onClose={() => setSelectedGroup(null)} />
        </Section>
    );
};
