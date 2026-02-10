import { Section } from './Section';
import { content } from '../data/content';
import { MapPin, Building2, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export const Experience = () => {
    const { experience } = content;

    // Use Host-based iteration (Grouping roles by Company)
    // experience already has the structure [ { host: "...", roles: [...] }, ... ]

    // Color Palette for Hosts
    const hostColors = [
        { bg: 'bg-emerald-500', border: 'border-emerald-500/50', text: 'text-emerald-500', shadow: 'shadow-emerald-500/20' },
        { bg: 'bg-cyan-500', border: 'border-cyan-500/50', text: 'text-cyan-500', shadow: 'shadow-cyan-500/20' },
        { bg: 'bg-amber-500', border: 'border-amber-500/50', text: 'text-amber-500', shadow: 'shadow-amber-500/20' },
        { bg: 'bg-fuchsia-500', border: 'border-fuchsia-500/50', text: 'text-fuchsia-500', shadow: 'shadow-fuchsia-500/20' }
    ];

    return (
        <Section id="experience">
            <div className="terminal-header mb-8">
                <span className="terminal-prompt">$</span> ./trace_execution_path.sh --mode=grouped --sync-scroll --wide
            </div>

            <div className="relative w-full mx-auto px-4 md:px-8">

                {/* Central System Bus Line */}
                <div className="absolute left-[calc(50%-1px)] top-0 bottom-0 w-0.5 bg-gradient-to-b from-sys-border via-console-accent/40 to-transparent hidden md:block"></div>
                {/* Mobile Line */}
                <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-sys-border via-console-accent/40 to-transparent md:hidden"></div>

                <div className="space-y-8 relative">
                    {experience.map((hostGroup, index) => {
                        const isRight = index % 2 === 0;
                        const colorTheme = hostColors[index % hostColors.length];
                        const isRunning = hostGroup.roles.some((r: any) => r.status === 'RUNNING');

                        return (
                            <motion.div
                                key={index}
                                className="grid grid-cols-[1fr_auto_1fr] gap-6 md:gap-12 items-start group"
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: false, margin: "-10% 0px -10% 0px" }}
                                transition={{ staggerChildren: 0.1 }}
                            >

                                {/* Left Side Component */}
                                <div className="hidden md:flex justify-end min-w-0 pt-2">
                                    {!isRight && (
                                        <HostCard hostGroup={hostGroup} colorTheme={colorTheme} isRunning={isRunning} isRight={isRight} />
                                    )}
                                </div>

                                {/* Central Node (Milestone) */}
                                <div className="relative flex justify-center h-full pt-6">
                                    <motion.div
                                        className={`w-5 h-5 rounded-full border border-sys-black z-20 flex items-center justify-center bg-sys-black relative shrink-0 shadow-[0_0_10px_rgba(0,0,0,0.5)] group-hover:scale-125 transition-transform duration-300 ${colorTheme.shadow}`}
                                        variants={{
                                            hidden: { scale: 0, opacity: 0 },
                                            visible: { scale: 1, opacity: 1, transition: { duration: 0.3 } }
                                        }}
                                    >
                                        <div className={`w-full h-full rounded-full ${colorTheme.bg} opacity-100 ${isRunning ? 'animate-pulse' : ''} flex items-center justify-center`}>
                                        </div>
                                    </motion.div>
                                </div>

                                {/* Right Side Component */}
                                <div className="col-span-2 md:col-span-1 flex justify-start min-w-0 pt-2">
                                    {isRight ? (
                                        <HostCard hostGroup={hostGroup} colorTheme={colorTheme} isRunning={isRunning} isRight={isRight} />
                                    ) : (
                                        <div className="md:hidden w-full">
                                            <HostCard hostGroup={hostGroup} colorTheme={colorTheme} isRunning={isRunning} isRight={isRight} isMobile={true} />
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </Section>
    );
};

const HostCard = ({ hostGroup, colorTheme, isRight, isMobile = false }: any) => {

    // Slide direction based on position
    const xHidden = isMobile ? 20 : (isRight ? 50 : -50);

    return (
        <motion.div
            className="w-full"
            variants={{
                hidden: { opacity: 0, x: xHidden },
                visible: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 50, damping: 20 } }
            }}
        >
            <div className={`bg-sys-surface/40 border border-sys-border rounded hover:border-console-accent/30 transition-colors relative group ${colorTheme.shadow} hover:shadow-lg backdrop-blur-sm overflow-hidden`}>

                {/* Header Section - Horizontal Company Info */}
                <div className="py-3 px-4 border-b border-sys-border/30 bg-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        {/* Logo */}
                        <div className="w-10 h-10 rounded bg-sys-black/50 p-1 flex items-center justify-center border border-sys-border/30 shrink-0 select-none">
                            {hostGroup.logo ? (
                                <img src={hostGroup.logo} alt={hostGroup.host} className="w-full h-full object-contain opacity-90" />
                            ) : (
                                <Building2 size={20} className={`${colorTheme.text}`} />
                            )}
                        </div>
                        <h3 className={`text-base font-bold ${colorTheme.text} leading-tight truncate`}>
                            {hostGroup.host}
                        </h3>
                    </div>
                    <div className="hidden sm:flex items-center gap-1 text-xs text-console-dim font-mono opacity-80">
                        <MapPin size={12} />
                        <span>{hostGroup.roles[0].location.split('•')[0].trim()}</span>
                    </div>
                </div>

                {/* Roles List - Compact */}
                <div className="py-3 px-4 flex flex-col gap-4">
                    {hostGroup.roles.map((role: any, idx: number) => {
                        const isRoleRunning = role.status === 'RUNNING';
                        return (
                            <div key={idx} className="relative pl-3 border-l border-sys-border/30 last:pb-0">
                                {/* Timeline Dot for Role */}
                                <div className={`absolute -left-[5px] top-1.5 w-2 h-2 rounded-full border border-sys-black ${isRoleRunning ? colorTheme.bg : 'bg-sys-border'}`}></div>

                                <div className="flex flex-col gap-1">
                                    <div className="flex flex-wrap justify-between items-center gap-2">
                                        <h4 className="text-sm font-semibold text-console-text leading-tight">{role.title}</h4>
                                        <div className="flex items-center gap-2">
                                            <div className="flex items-center gap-1 text-[9px] font-mono text-console-dim bg-sys-black/30 px-1.5 py-0.5 rounded border border-sys-border/30 whitespace-nowrap">
                                                <span>{role.period}</span>
                                            </div>
                                            <span className={`text-[8px] font-mono px-1 py-0 rounded border hidden sm:inline-block ${isRoleRunning ? `border-${colorTheme.text}/30 text-${colorTheme.text} bg-${colorTheme.text}/10` : 'border-sys-border text-console-dim'}`}>
                                                [{role.status}]
                                            </span>
                                        </div>
                                    </div>

                                    <p className="text-xs text-console-text/70 leading-relaxed mt-0.5 line-clamp-2 md:line-clamp-3">
                                        {role.focus}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Hover arrow decoration */}
                <div className={`absolute top-1/2 -translate-y-1/2 ${isRight || isMobile ? '-left-2' : '-right-2'} text-console-accent opacity-0 group-hover:opacity-100 transition-opacity hidden md:block scale-75`}>
                    <ArrowRight size={14} className={!(isRight || isMobile) ? 'rotate-180' : ''} />
                </div>
            </div>
        </motion.div>
    );
};
