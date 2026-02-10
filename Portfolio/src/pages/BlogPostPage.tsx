import { useParams, useNavigate } from 'react-router-dom';
import { logs } from '../data/logs';

import { Calendar, Clock, ChevronLeft } from 'lucide-react';

export const BlogPostPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const log = logs.find(l => l.id === id);

    if (!log) {
        return (
            <div className="min-h-screen pt-24 text-center ">
                <h1 className="text-console-error text-2xl mb-4">ERROR: LOG_NOT_FOUND</h1>
                <button onClick={() => navigate('/log')} className="text-console-text hover:text-console-accent underline">
                    Return to Index
                </button>
            </div>
        );
    }

    return (
        <div className="pt-24 pb-20 min-h-screen px-6">
            <div className="max-w-4xl mx-auto">
                {/* Back Button */}
                <button
                    onClick={() => navigate('/log')}
                    className="flex items-center gap-2 text-console-dim hover:text-console-accent mb-8 transition-colors group"
                >
                    <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                    <span className="font-mono text-sm">../system_logs</span>
                </button>

                {/* Hero Image */}
                {log.image && (
                    <div className="w-full h-64 md:h-96 rounded-xl overflow-hidden mb-12 border border-sys-border/50 relative">
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-transparent z-10"></div>
                        <img src={log.image} alt={log.title} className="w-full h-full object-cover" />

                        <div className="absolute bottom-6 left-6 z-20">
                            <h1 className="text-3xl md:text-5xl font-bold text-console-light font-mono leading-tight mb-4 shadow-black drop-shadow-lg">
                                {log.title}
                            </h1>
                            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-console-dim bg-black/60 backdrop-blur-sm px-4 py-2 rounded-full border border-sys-border/30 inline-flex">
                                <span className={`px-2 py-0.5 rounded ${log.status === 'PUBLISHED' ? 'text-green-400' : 'text-yellow-500'}`}>
                                    {log.status}
                                </span>
                                <span className="w-px h-3 bg-sys-border/50"></span>
                                <span className="flex items-center gap-1.5 hover:text-console-text transition-colors">
                                    <Calendar size={12} />
                                    {log.date}
                                </span>
                                <span className="w-px h-3 bg-sys-border/50"></span>
                                <span className="flex items-center gap-1.5 hover:text-console-text transition-colors">
                                    <Clock size={12} />
                                    {log.readTime}
                                </span>
                                <span className="w-px h-3 bg-sys-border/50"></span>
                                <span className="text-console-accent">{log.category}</span>
                            </div>
                        </div>
                    </div>
                )}

                {/* Content */}
                <div className="prose prose-invert prose-lg max-w-none prose-p:font-mono prose-p:text-console-text/80 prose-headings:font-mono prose-headings:text-console-light prose-code:text-console-accent prose-pre:bg-sys-dark prose-pre:border prose-pre:border-sys-border">
                    <div className="whitespace-pre-wrap font-mono text-sm leading-relaxed">
                        {log.content}
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-16 pt-8 border-t border-sys-border/30 flex justify-between text-xs font-mono text-console-dim">
                    <span>EOF</span>
                    <span>HASH: {Math.random().toString(36).substring(7).toUpperCase()}</span>
                </div>
            </div>
        </div>
    );
};
