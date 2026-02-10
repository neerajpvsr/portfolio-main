import { Mail, Linkedin, Github } from 'lucide-react';
import { Section } from './Section';
import { content } from '../data/content';

export const Contact = () => {
    const { contact } = content;

    return (
        <Section id="contact" className="py-20 border-t border-sys-border bg-sys-dark/50">
            <div className="mb-12 flex items-center justify-center gap-2 text-console-dim font-mono text-sm md:text-base px-4 md:px-8">
                <span className="text-console-accent">{">"}</span>
                <span className="text-console-text">./contact.sh</span>
                <span className="animate-pulse w-2 h-4 bg-console-accent ml-1 inline-block align-middle"></span>
            </div>

            <div className="text-center space-y-10 w-full mx-auto px-4 md:px-8">
                <div className="font-mono text-console-text text-xl md:text-2xl font-bold">
                    <span className="text-console-success">{">"}</span> Initiating connection protocol...
                </div>

                <p className="text-console-dim text-lg leading-relaxed font-mono max-w-2xl mx-auto">
                    System is open for new architecture discussions and engineering opportunities.
                </p>

                <div className="flex justify-center gap-12 pt-4">
                    <a href={`mailto:${contact.email}`} className="group flex flex-col items-center gap-3 text-console-dim hover:text-console-text transition-colors">
                        <div className="p-3 bg-sys-surface rounded-full border border-sys-border group-hover:border-console-accent group-hover:text-console-accent transition-colors">
                            <Mail size={24} />
                        </div>
                        <span className="text-xs font-mono uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">Email</span>
                    </a>
                    <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center gap-3 text-console-dim hover:text-console-text transition-colors">
                        <div className="p-3 bg-sys-surface rounded-full border border-sys-border group-hover:border-console-accent group-hover:text-console-accent transition-colors">
                            <Linkedin size={24} />
                        </div>
                        <span className="text-xs font-mono uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">LinkedIn</span>
                    </a>
                    <a href={contact.github} target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center gap-3 text-console-dim hover:text-console-text transition-colors">
                        <div className="p-3 bg-sys-surface rounded-full border border-sys-border group-hover:border-console-accent group-hover:text-console-accent transition-colors">
                            <Github size={24} />
                        </div>
                        <span className="text-xs font-mono uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">GitHub</span>
                    </a>
                </div>

                <div className="pt-20 font-mono text-xs text-console-muted">
                    <div className="animate-cursor-blink inline-block w-2.5 h-4 bg-console-accent align-middle mr-2"></div>
                    System Status: ONLINE | v2.0.4 | Engineered with React + Tailwind
                </div>
            </div>
        </Section>
    );
};
