import { Section } from '../components/Section';
import { content } from '../data/content';
import { Terminal, ArrowRight, Folder } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const ProjectsPage = () => {
    const navigate = useNavigate();
    const { projects } = content;

    return (
        <div className="pt-20">
            <Section id="projects-index">
                <div className="terminal-header mb-12">
                    <span className="terminal-prompt">$</span> ./list_projects.sh --all
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    {projects.map((project) => (
                        <div
                            key={project.id}
                            onClick={() => navigate(`/projects/${project.id}`)}
                            className="group relative bg-[#0c0c0c] border border-sys-border/50 rounded-xl overflow-hidden cursor-pointer hover:border-console-accent/50 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
                        >
                            {/* Image Header */}
                            <div className="h-48 overflow-hidden relative border-b border-sys-border/30">
                                {project.image ? (
                                    <>
                                        <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-all z-10"></div>
                                        <img
                                            src={project.image}
                                            alt={project.title}
                                            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                                        />
                                    </>
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-sys-border/5">
                                        <Folder size={48} className="text-console-dim/20" />
                                    </div>
                                )}
                            </div>

                            {/* Content Body */}
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-console-text group-hover:text-console-light font-mono mb-3 truncate">
                                    {project.title}
                                </h3>

                                <p className="text-sm text-console-dim line-clamp-3 mb-6 font-mono leading-relaxed opacity-80">
                                    {project.summary}
                                </p>

                                {/* Tech Stack Tags */}
                                <div className="flex flex-wrap gap-2 mb-6">
                                    {project.techStack.slice(0, 3).map((tech, i) => (
                                        <span key={i} className="text-[10px] font-mono px-2 py-0.5 rounded bg-sys-border/10 text-console-dim border border-sys-border/20">
                                            {tech}
                                        </span>
                                    ))}
                                    {project.techStack.length > 3 && (
                                        <span className="text-[10px] font-mono px-2 py-0.5 text-console-dim">
                                            +{project.techStack.length - 3}
                                        </span>
                                    )}
                                </div>

                                <div className="flex items-center justify-between pt-4 border-t border-sys-border/20 text-xs font-mono text-console-dim">
                                    <span className="flex items-center gap-1 group-hover:text-console-accent transition-colors">
                                        <Terminal size={12} /> VIEW_PROJECT
                                    </span>
                                    <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </Section>
        </div>
    );
};
