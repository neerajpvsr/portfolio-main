import { X, Calendar, MapPin, Code2, GitCommit } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ExperienceDetailPaneProps {
    group: any | null;
    onClose: () => void;
}

export const ExperienceDetailPane = ({ group, onClose }: ExperienceDetailPaneProps) => {
    return (
        <AnimatePresence>
            {group && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-sys-black/60 backdrop-blur-sm z-40 md:hidden"
                    />

                    {/* Pane */}
                    <motion.div
                        initial={{ x: '100%', opacity: 0.5 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: '100%', opacity: 0.5 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed right-0 top-0 bottom-0 w-full md:w-[500px] bg-sys-dark border-l border-sys-border shadow-2xl z-50 overflow-y-auto custom-scrollbar pt-20"
                    >
                        <div className="p-6 md:p-8 space-y-8">

                            {/* Header / Brand */}
                            <div className="flex items-start justify-between border-b border-sys-border pb-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded bg-sys-surface border border-sys-border flex items-center justify-center p-2">
                                        {group.logo ? (
                                            <img src={group.logo} alt={group.host} className="w-full h-full object-contain" />
                                        ) : (
                                            <div className="font-bold text-2xl text-console-muted">{group.host.substring(0, 1)}</div>
                                        )}
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-bold text-console-text">{group.host}</h2>
                                        <div className="text-console-muted font-mono text-xs">Process Group ID: {group.host.length * 42}</div>
                                    </div>
                                </div>
                                <button
                                    onClick={onClose}
                                    className="p-2 hover:bg-sys-surface rounded-full text-console-dim hover:text-console-error transition-colors"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            {/* Render All Roles in Group */}
                            <div className="space-y-8 relative">
                                {/* Vertical Timeline Line */}
                                <div className="absolute left-[15px] top-4 bottom-4 w-px bg-sys-border -z-10" />

                                {group.roles.map((role: any, idx: number) => (
                                    <div key={idx} className="relative pl-10">
                                        {/* Timeline Dot */}
                                        <div className={`absolute left-[11px] top-1.5 w-2 h-2 rounded-full border border-sys-dark ${idx === 0 ? 'bg-console-accent animate-pulse' : 'bg-sys-border'}`} />

                                        <div className="space-y-4">
                                            {/* Role Header */}
                                            <div>
                                                <h3 className="text-lg font-bold text-console-text leading-tight">{role.title}</h3>

                                                <div className="flex flex-wrap gap-3 mt-2">
                                                    <div className={`px-2 py-0.5 rounded border text-[10px] font-mono flex items-center gap-1.5 ${role.status === 'RUNNING' ? 'bg-console-accent/10 border-console-accent/30 text-console-accent' : 'bg-sys-surface border-sys-border text-console-dim'}`}>
                                                        STATUS: {role.status || 'TERMINATED'}
                                                    </div>
                                                    <div className="px-2 py-0.5 rounded border border-sys-border bg-sys-surface text-console-dim text-[10px] font-mono flex items-center gap-1.5">
                                                        <Calendar size={10} />
                                                        {role.period}
                                                    </div>
                                                    <div className="px-2 py-0.5 rounded border border-sys-border bg-sys-surface text-console-dim text-[10px] font-mono flex items-center gap-1.5">
                                                        <MapPin size={10} />
                                                        {role.location.split('•')[0].trim()}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Description */}
                                            <div className="space-y-2">
                                                <h4 className="text-xs font-bold text-console-muted uppercase tracking-wider flex items-center gap-2">
                                                    <GitCommit size={12} /> Log Output
                                                </h4>
                                                <div className="p-3 rounded bg-sys-black border border-sys-border font-mono text-xs text-console-dim leading-relaxed whitespace-pre-line">
                                                    {role.focus}
                                                </div>
                                            </div>

                                            {/* Tech Stack */}
                                            {role.techStack && (
                                                <div className="space-y-2">
                                                    <h4 className="text-xs font-bold text-console-muted uppercase tracking-wider flex items-center gap-2">
                                                        <Code2 size={12} /> Dependencies
                                                    </h4>
                                                    <div className="flex flex-wrap gap-1.5">
                                                        {role.techStack.map((tech: string, i: number) => (
                                                            <span key={i} className="px-2 py-1 bg-sys-surface border border-sys-border rounded text-[10px] font-mono text-console-text">
                                                                {tech}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};
