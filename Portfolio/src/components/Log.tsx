import { Section } from './Section';
import { logs } from '../data/logs';
import { FileText, Calendar, Clock, Terminal, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Log = () => {
    const navigate = useNavigate();

    return (
        <Section id="log">
            <div className="terminal-header mb-12">
                <span className="terminal-prompt">$</span> ./system_logs.sh --view-mode=grid
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                {logs.map((log) => (
                    <div
                        key={log.id}
                        onClick={() => navigate(`/log/${log.id}`)}
                        className="group relative bg-[#0c0c0c] border border-sys-border/50 rounded-xl overflow-hidden cursor-pointer hover:border-console-accent/50 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
                    >
                        {/* Image Header */}
                        <div className="h-48 overflow-hidden relative border-b border-sys-border/30">
                            {log.image ? (
                                <>
                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-all z-10"></div>
                                    <img
                                        src={log.image}
                                        alt={log.title}
                                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                                    />
                                </>
                            ) : (
                                <div className="w-full h-full flex items-center justify-center bg-sys-border/5">
                                    <FileText size={48} className="text-console-dim/20" />
                                </div>
                            )}

                            {/* Date Badge */}
                            <div className="absolute top-4 right-4 z-20 bg-black/80 backdrop-blur text-xs font-mono text-console-dim px-2 py-1 rounded border border-sys-border/30 flex items-center gap-2">
                                <Calendar size={10} />
                                {log.date}
                            </div>
                        </div>

                        {/* Content Body */}
                        <div className="p-6">
                            <div className="flex items-center gap-2 mb-3 text-xs font-mono text-console-accent">
                                <Terminal size={12} />
                                <span>{log.category}</span>
                            </div>

                            <h3 className="text-xl font-bold text-console-text group-hover:text-console-light font-mono mb-3 line-clamp-2">
                                {log.title}
                            </h3>

                            <p className="text-sm text-console-dim line-clamp-3 mb-6 font-mono leading-relaxed opacity-80">
                                {log.summary}
                            </p>

                            <div className="flex items-center justify-between pt-4 border-t border-sys-border/20 text-xs font-mono text-console-dim">
                                <span className="flex items-center gap-1.5">
                                    <Clock size={12} />
                                    {log.readTime}
                                </span>
                                <span className="flex items-center gap-1 group-hover:text-console-accent transition-colors">
                                    READ_FULL_LOG <ArrowRight size={12} />
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </Section>
    );
};
