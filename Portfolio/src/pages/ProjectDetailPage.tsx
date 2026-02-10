import { useParams, useNavigate } from 'react-router-dom';
import { content } from '../data/content';
import { ChevronLeft, Folder, ExternalLink, Code } from 'lucide-react';

export const ProjectDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const project = content.projects.find(p => p.id === id);

    if (!project) {
        return (
            <div className="min-h-screen pt-24 text-center">
                <h1 className="text-console-error text-2xl mb-4">ERROR: PROJECT_NOT_FOUND</h1>
                <button onClick={() => navigate('/projects')} className="text-console-text hover:text-console-accent underline">
                    Return to Projects
                </button>
            </div>
        );
    }

    return (
        <div className="pt-24 pb-20 min-h-screen px-6">
            <div className="max-w-4xl mx-auto">
                {/* Back Button */}
                <button
                    onClick={() => navigate('/projects')}
                    className="flex items-center gap-2 text-console-dim hover:text-console-accent mb-8 transition-colors group"
                >
                    <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                    <span className="font-mono text-sm">../list_projects</span>
                </button>

                {/* Hero Image */}
                {project.image && (
                    <div className="w-full h-64 md:h-96 rounded-xl overflow-hidden mb-12 border border-sys-border/50 relative">
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-transparent z-10"></div>
                        <img src={project.image} alt={project.title} className="w-full h-full object-cover" />

                        <div className="absolute bottom-6 left-6 z-20">
                            <h1 className="text-3xl md:text-5xl font-bold text-console-light font-mono leading-tight mb-4 shadow-black drop-shadow-lg">
                                {project.title}
                            </h1>
                            <div className="flex flex-wrap gap-2">
                                {project.techStack.map((tech, i) => (
                                    <span key={i} className="text-xs font-mono px-2 py-1 rounded bg-black/60 backdrop-blur border border-sys-border/30 text-console-dim">
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {/* Main Content */}
                    <div className="md:col-span-2 prose prose-invert prose-lg max-w-none prose-p:font-mono prose-p:text-console-text/80 prose-headings:font-mono prose-headings:text-console-light prose-code:text-console-accent prose-pre:bg-sys-dark prose-pre:border prose-pre:border-sys-border">
                        <div className="whitespace-pre-wrap font-mono text-sm leading-relaxed">
                            {project.content}
                        </div>
                    </div>

                    {/* Sidebar / Metadata */}
                    <div className="space-y-8">
                        <div className="p-6 rounded-lg border border-sys-border bg-sys-dark/50">
                            <h3 className="text-console-light font-bold mb-4 flex items-center gap-2 font-mono">
                                <Folder size={16} /> REPOSITORY
                            </h3>
                            <div className="space-y-4">
                                <a
                                    href={project.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-between p-3 rounded bg-sys-black border border-sys-border hover:border-console-accent/50 group transition-all"
                                >
                                    <span className="text-sm font-mono text-console-dim group-hover:text-console-text">View Source</span>
                                    <ExternalLink size={14} className="text-console-dim group-hover:text-console-accent" />
                                </a>
                                {project.id === 'portfolio' && (
                                    <div className="text-xs text-console-dim font-mono mt-2">
                                        * You are currently viewing a live instance of this project.
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="p-6 rounded-lg border border-sys-border bg-sys-dark/50">
                            <h3 className="text-console-light font-bold mb-4 flex items-center gap-2 font-mono">
                                <Code size={16} /> TECH_STACK
                            </h3>
                            <ul className="space-y-2 font-mono text-sm text-console-dim">
                                {project.techStack.map((tech) => (
                                    <li key={tech} className="flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-console-accent"></span>
                                        {tech}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-16 pt-8 border-t border-sys-border/30 flex justify-between text-xs font-mono text-console-dim">
                    <span>END_OF_FILE</span>
                    <span>PROJECT_ID: {project.id.toUpperCase()}</span>
                </div>
            </div>
        </div>
    );
};
