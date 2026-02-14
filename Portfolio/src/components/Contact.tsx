import { useState, useRef, type FormEvent } from 'react';
import { Linkedin, Github, CheckCircle2, Send } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { Section } from './Section';
import { content } from '../data/content';

export const Contact = () => {
    const { contact } = content;
    const formRef = useRef<HTMLFormElement>(null);
    const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (!formRef.current) return;

        setStatus('sending');

        // Replace these with your actual EmailJS keys from .env or dashboard
        const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_id';
        const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_id';
        const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'public_key';

        emailjs.sendForm(serviceId, templateId, formRef.current, publicKey)
            .then(() => {
                setStatus('success');
                if (formRef.current) formRef.current.reset();
                setTimeout(() => setStatus('idle'), 5000); // Optional: Auto-reset after 5s or keep success state
            }, (error) => {
                console.error('EmailJS Error:', error);
                setStatus('error');
                setTimeout(() => setStatus('idle'), 5000);
            });
    };

    return (
        <Section id="contact" className="py-20 bg-sys-dark/50 overflow-hidden">
            {/* Previous Header/Title Layout */}
            <div className="mb-8 flex items-center justify-center gap-2 text-console-dim font-mono text-sm md:text-base px-4 md:px-8">
                <span className="text-console-accent">{">"}</span>
                <span className="text-console-text">./contact.sh</span>
                <span className="animate-pulse w-2 h-4 bg-console-accent ml-1 inline-block align-middle"></span>
            </div>

            <div className="w-full max-w-6xl mx-auto px-4 md:px-8">
                {/* Header - Compact */}
                <div className="text-center space-y-4 mb-10">
                    <div className="font-mono text-console-text text-xl md:text-2xl font-bold">
                        <span className="text-console-success">{">"}</span> Initiating connection protocol...
                    </div>
                </div>

                {/* Single Horizontal Terminal Window (Rectangular & Compact) */}
                <div className="rounded-xl border border-sys-border bg-[#0a0a0a] shadow-2xl shadow-console-accent/5 overflow-hidden relative group">

                    {/* Window Header */}
                    <div className="bg-[#1a1a1a] border-b border-sys-border p-2 flex items-center justify-start select-none">
                        <div className="flex gap-2 ml-2">
                            <div className="w-2.5 h-2.5 rounded-full bg-red-500/20 group-hover:bg-red-500/80 transition-colors"></div>
                            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20 group-hover:bg-yellow-500/80 transition-colors"></div>
                            <div className="w-2.5 h-2.5 rounded-full bg-green-500/20 group-hover:bg-green-500/80 transition-colors"></div>
                        </div>
                    </div>

                    {/* Content Container */}
                    <div className="p-6 md:p-8 relative">

                        {/* Success Overlay */}
                        {status === 'success' && (
                            <div className="absolute inset-0 bg-[#0a0a0a]/95 backdrop-blur-sm z-30 flex flex-col items-center justify-center animate-fade-in custom-cursor-default">
                                <div className="p-3 bg-green-500/10 rounded-full mb-4 border border-green-500/20 animate-scale-in">
                                    <CheckCircle2 size={40} className="text-green-500" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2 font-mono tracking-tight">TRANSMISSION_COMPLETE</h3>
                                <p className="text-console-dim font-mono mb-6 text-center max-w-sm text-sm">Payload successfully delivered. Awaiting acknowledgment.</p>
                                <button
                                    onClick={() => setStatus('idle')}
                                    className="px-6 py-2 bg-console-accent/10 hover:bg-console-accent/20 border border-console-accent/50 text-console-accent transition-all font-mono text-[10px] uppercase tracking-widest"
                                >
                                    [ RESET_CONNECTION ]
                                </button>
                            </div>
                        )}

                        <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
                            <div className="grid md:grid-cols-2 gap-5">
                                <div className="space-y-1.5 group/field">
                                    <label className="text-[10px] uppercase tracking-widest text-console-dim font-mono group-focus-within/field:text-console-accent transition-colors">Identity_Ref</label>
                                    <input
                                        required
                                        type="text"
                                        name="name"
                                        placeholder="Name / Organization"
                                        className="w-full bg-[#111] border border-sys-border p-2.5 text-sm text-console-text placeholder:text-console-muted/30 focus:outline-none focus:border-console-accent font-mono transition-all disabled:opacity-50"
                                        disabled={status === 'sending'}
                                        autoComplete="off"
                                    />
                                </div>
                                <div className="space-y-1.5 group/field">
                                    <label className="text-[10px] uppercase tracking-widest text-console-dim font-mono group-focus-within/field:text-console-accent transition-colors">Network_Address</label>
                                    <input
                                        required
                                        type="email"
                                        name="email"
                                        placeholder="return_path@domain.com"
                                        className="w-full bg-[#111] border border-sys-border p-2.5 text-sm text-console-text placeholder:text-console-muted/30 focus:outline-none focus:border-console-accent font-mono transition-all disabled:opacity-50"
                                        disabled={status === 'sending'}
                                        autoComplete="off"
                                    />
                                </div>
                            </div>

                            <div className="space-y-1.5 group/field">
                                <label className="text-[10px] uppercase tracking-widest text-console-dim font-mono group-focus-within/field:text-console-accent transition-colors">Subject_Vector</label>
                                <div className="relative">
                                    <select
                                        name="title"
                                        className="w-full bg-[#111] border border-sys-border p-2.5 text-sm text-console-text focus:outline-none focus:border-console-accent font-mono transition-all appearance-none cursor-pointer hover:bg-[#161616] disabled:opacity-50"
                                        disabled={status === 'sending'}
                                    >
                                        <option>Freelance Project Inquiry</option>
                                        <option>System Architecture Consultation</option>
                                        <option>Full-time Role Opportunity</option>
                                        <option>General Communication</option>
                                    </select>
                                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-console-dim text-xs">▼</div>
                                </div>
                            </div>

                            <div className="space-y-1.5 group/field">
                                <label className="text-[10px] uppercase tracking-widest text-console-dim font-mono group-focus-within/field:text-console-accent transition-colors">Data_Payload</label>
                                <textarea
                                    required
                                    name="message"
                                    rows={4}
                                    className="w-full bg-[#111] border border-sys-border p-2.5 text-sm text-console-text placeholder:text-console-muted/30 focus:outline-none focus:border-console-accent font-mono resize-none transition-all disabled:opacity-50 block"
                                    placeholder="> Input message parameters..."
                                    disabled={status === 'sending'}
                                    spellCheck={false}
                                ></textarea>
                            </div>

                            <div className="pt-2 flex flex-col md:flex-row items-center justify-between gap-6">
                                {/* Social Links - Integrated into footer */}
                                <div className="flex gap-4 order-2 md:order-1">
                                    <a href={contact.github} target="_blank" rel="noopener noreferrer" className="p-2 text-console-dim hover:text-white hover:bg-white/5 rounded-none transition-all border border-transparent hover:border-white/10" aria-label="GitHub">
                                        <Github size={18} />
                                    </a>
                                    <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className="p-2 text-console-dim hover:text-white hover:bg-white/5 rounded-none transition-all border border-transparent hover:border-white/10" aria-label="LinkedIn">
                                        <Linkedin size={18} />
                                    </a>
                                </div>

                                <button
                                    type="submit"
                                    disabled={status === 'sending'}
                                    className="w-full md:w-auto px-8 py-2.5 bg-console-accent text-sys-black hover:bg-white transition-all font-mono text-sm font-bold uppercase tracking-wider disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:bg-console-accent order-1 md:order-2 shadow-[0_0_15px_rgba(34,197,94,0.3)] hover:shadow-[0_0_25px_rgba(34,197,94,0.5)]"
                                >
                                    <span className="flex items-center justify-center gap-2">
                                        {status === 'sending' ? (
                                            <>
                                                <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin"></div>
                                                EXECUTING...
                                            </>
                                        ) : (
                                            <>
                                                <Send size={16} /> INITIALIZE_SEND
                                            </>
                                        )}
                                    </span>
                                </button>
                            </div>

                            {status === 'error' && (
                                <div className="mt-4 p-2 border border-red-500/20 bg-red-500/5 text-center animate-fade-in">
                                    <p className="text-xs text-red-400 font-mono">
                                        [ERROR_503]: Connection refused. Check network.
                                    </p>
                                </div>
                            )}
                        </form>
                    </div>

                    {/* Progress Bar Decoration */}
                    <div className="h-0.5 w-full bg-[#111] overflow-hidden">
                        {status === 'sending' && (
                            <div className="h-full bg-console-accent animate-progress-indeterminate"></div>
                        )}
                        {status === 'idle' && (
                            <div className="h-full bg-sys-border w-[0%]"></div>
                        )}
                    </div>
                </div>

                <div className="pt-20 pb-8 text-center px-4">
                    <h2 className="text-xl md:text-3xl font-bold text-white tracking-tight leading-tight">
                        Build robust systems. Scale intelligence. <span className="text-console-accent decoration-console-accent/30 underline underline-offset-8 decoration-2">Minimize entropy.</span>
                    </h2>
                </div>

                <div className="pt-8 font-mono text-[10px] text-console-muted text-center">
                    <div className="animate-cursor-blink inline-block w-2 h-3 bg-console-accent align-middle mr-2"></div>
                    System Status: ONLINE | v2.0.4 | React + Tailwind
                </div>
            </div>
        </Section>
    );
};
