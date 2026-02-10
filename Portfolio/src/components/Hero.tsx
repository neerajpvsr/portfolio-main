import { Terminal, ArrowRight } from 'lucide-react';
import { content } from '../data/content';
import { useNavigate } from 'react-router-dom';

export const Hero = () => {
    const { name, role, tagline, resumeLink, profileImage } = content.hero;
    const navigate = useNavigate();

    return (
        <section className="min-h-[85vh] flex items-center pt-28 pb-6 relative overflow-hidden">

            {/* Background Grid Decoration */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#111_1px,transparent_1px),linear-gradient(to_bottom,#111_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none opacity-20"></div>

            <div className="container-terminal relative z-10">
                <div className="grid md:grid-cols-2 gap-16 items-center">

                    {/* Console Output Column */}
                    <div className="space-y-8 order-2 md:order-1">

                        <div className="font-mono text-console-accent text-sm mb-4">
                            $ whoami
                        </div>

                        <div className="space-y-4">
                            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold leading-none tracking-tighter text-console-text">
                                {name}
                                <span className="text-console-accent animate-pulse">_</span>
                            </h1>

                            <div className="flex items-center gap-3 text-lg md:text-xl font-mono text-console-success bg-sys-surface/50 w-fit px-4 py-2 rounded border border-sys-border">
                                <span className="text-console-muted">role:</span>
                                "{role}"
                            </div>

                            <p className="text-xl text-console-dim max-w-lg leading-relaxed font-light border-l-2 border-sys-border pl-6 py-2">
                                {tagline}
                            </p>
                        </div>

                        <div className="flex flex-wrap items-center gap-5 pt-4">
                            <a
                                href={resumeLink}
                                download
                                className="group flex items-center gap-3 px-6 py-3 bg-console-text text-sys-black font-mono font-bold text-sm rounded hover:bg-white transition-all shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]"
                            >
                                <Terminal size={16} />
                                <span>./download_resume</span>
                            </a>
                            <button
                                onClick={() => navigate('/projects')}
                                className="group flex items-center gap-3 px-6 py-3 border border-sys-border text-console-text font-mono font-bold text-sm rounded transition-all bg-sys-surface/50 shadow-[4px_4px_0px_0px_rgba(255,255,255,0.1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] hover:border-console-accent hover:text-console-accent"
                            >
                                <span>cd ./projects</span>
                                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    </div>

                    {/* System Visual Column */}
                    <div className="order-1 md:order-2 flex justify-center md:justify-end relative">
                        <div className="relative w-72 h-72 md:w-[420px] md:h-[420px] group">
                            <div className="absolute inset-0 bg-console-accent/10 rounded overflow-hidden border border-sys-border group-hover:border-console-accent/50 transition-colors">
                                <div className="absolute top-0 left-0 right-0 h-6 bg-sys-surface border-b border-sys-border flex items-center px-2 gap-1.5">
                                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/50"></div>
                                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50"></div>
                                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/50"></div>
                                </div>
                                <img
                                    src={profileImage}
                                    alt={name}
                                    className="absolute inset-0 mt-6 w-full h-[calc(100%-1.5rem)] object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
                                />
                                {/* Scanline Effect */}
                                <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[size:100%_4px] pointer-events-none opacity-20"></div>
                            </div>

                            {/* Decorative floating elements */}
                            <div className="absolute -right-6 -bottom-6 bg-sys-black border border-sys-border p-3 font-mono text-xs text-console-muted z-20 shadow-xl">
                                <div>CPU: 23%</div>
                                <div>MEM: 4.2GB</div>
                                <div className="text-console-success">SYS: ONLINE</div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};
