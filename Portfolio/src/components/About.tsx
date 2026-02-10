import { Section } from './Section';
import { content } from '../data/content';

export const About = () => {
    return (
        <Section id="about">
            <div className="terminal-header">
                <span className="terminal-prompt">$</span> cat /var/about.sys
            </div>

            <div className="sys-panel hover:border-console-accent/30 transition-colors bg-sys-black border-l-4 border-l-console-accent">
                <div className="font-mono text-xs text-console-muted mb-4 border-b border-sys-border pb-2 flex justify-between">
                    <span>SYSTEM_DESCRIPTION</span>
                    <span>READ_ONLY</span>
                </div>

                <div className="space-y-4 font-mono text-sm md:text-base">
                    <div className="grid grid-cols-[100px_1fr] gap-4">
                        <span className="text-console-dim">USER:</span>
                        <span className="text-console-text font-bold">{content.hero.name}</span>
                    </div>
                    <div className="grid grid-cols-[100px_1fr] gap-4">
                        <span className="text-console-dim">ROLE:</span>
                        <span className="text-console-success">{content.hero.role}</span>
                    </div>
                    <div className="grid grid-cols-[100px_1fr] gap-4">
                        <span className="text-console-dim">BIO:</span>
                        <p className="text-console-text leading-relaxed font-sans max-w-2xl">
                            {content.about.summary.join(' ')}
                        </p>
                    </div>
                    <div className="grid grid-cols-[100px_1fr] gap-4">
                        <span className="text-console-dim">MISSION:</span>
                        <span className="text-console-text">Build robust systems. Scale intelligence. Minimize entropy.</span>
                    </div>
                </div>
            </div>
        </Section>
    );
};
