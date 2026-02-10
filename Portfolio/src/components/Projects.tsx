import { Github, ExternalLink, Terminal } from 'lucide-react';
import { Section } from './Section';
import { content } from '../data/content';

export const Projects = () => {
  const { projects } = content;

  return (
    <Section id="projects">
      <div className="terminal-header">
        <span className="terminal-prompt">$</span> tail -f /var/log/projects/
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <div
            key={index}
            className="group flex flex-col h-full bg-sys-dark border border-sys-border rounded overflow-hidden hover:border-console-accent/50 transition-all duration-300 relative"
          >
            {/* Top Bar */}
            <div className="bg-sys-surface border-b border-sys-border px-4 py-2 flex items-center justify-between">
              <div className="flex gap-1.5">
                <div className="w-2 h-2 rounded-full bg-red-500/50"></div>
                <div className="w-2 h-2 rounded-full bg-yellow-500/50"></div>
                <div className="w-2 h-2 rounded-full bg-green-500/50"></div>
              </div>
              <div className="font-mono text-[10px] text-console-muted flex items-center gap-2">
                <Terminal size={10} />
                PID: {1000 + index}
              </div>
            </div>

            <div className="p-6 flex flex-col flex-grow relative">
              <div className="flex justify-between items-start mb-4">
                <div className="space-y-1">
                  <h3 className="font-mono text-lg font-bold text-console-text group-hover:text-console-accent transition-colors">
                    {project.title}
                  </h3>
                  <div className="text-[10px] font-mono text-console-success flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-console-success animate-pulse"></span>
                    EXECUTING
                  </div>
                </div>

                <div className="flex gap-3 text-console-muted z-10">
                  <a href={project.link} className="hover:text-console-text transition-colors" aria-label="GitHub"><Github size={18} /></a>
                  <a href={project.link} className="hover:text-console-text transition-colors" aria-label="Live Demo"><ExternalLink size={18} /></a>
                </div>
              </div>

              <p className="text-console-dim text-sm leading-relaxed mb-6 flex-grow font-mono">
                {">"} {project.content}
              </p>

              <div className="pt-4 border-t border-sys-border border-dashed mt-auto">
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] font-mono font-medium text-console-accent bg-console-accent/5 px-2 py-1 rounded border border-console-accent/10"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Hover effect overlay */}
              <div className="absolute inset-0 bg-console-accent/5 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity"></div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
};
