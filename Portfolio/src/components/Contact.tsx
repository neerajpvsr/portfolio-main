import { useState, useRef, FormEvent } from 'react';
import { Mail, Linkedin, Github, Loader2, CheckCircle2 } from 'lucide-react';
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
        <Section id="contact" className="py-20 border-t border-sys-border bg-sys-dark/50">
            <div className="mb-12 flex items-center justify-center gap-2 text-console-dim font-mono text-sm md:text-base px-4 md:px-8">
                <span className="text-console-accent">{">"}</span>
                <span className="text-console-text">./contact.sh</span>
                <span className="animate-pulse w-2 h-4 bg-console-accent ml-1 inline-block align-middle"></span>
            </div>

            <div className="w-full max-w-6xl mx-auto px-4 md:px-8">
                {/* Header - Restored */}
                <div className="text-center space-y-6 mb-16">
                    <div className="font-mono text-console-text text-xl md:text-3xl font-bold">
                        <span className="text-console-success">{">"}</span> Initiating connection protocol...
                    </div>
                    <p className="text-console-dim text-lg leading-relaxed font-mono max-w-2xl mx-auto">
                        System is open for freelance projects, architecture discussions, and engineering opportunities.
                    </p>
                </div>

                {/* Horizontal Contact Form Box */}
                <div className="grid lg:grid-cols-2 gap-8 items-stretch border border-sys-border rounded-xl overflow-hidden bg-sys-surface/20 backdrop-blur-sm">
                    {/* Left: Contact Form */}
                    <div className="p-6 md:p-8 bg-sys-surface/30 border-b lg:border-b-0 lg:border-r border-sys-border relative">

                        <div className="font-mono text-sm text-console-muted mb-6">
                            {">"} ./compose_message <span className="text-console-warn">--secure</span>
                        </div>
                        <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-[10px] uppercase tracking-wider text-console-dim font-mono">Identity</label>
                                    <input
                                        required
                                        type="text"
                                        name="name"
                                        placeholder="Name / Org"
                                        className="w-full bg-sys-dark border border-sys-border/50 rounded p-3 text-sm text-console-text placeholder:text-console-muted/50 focus:outline-none focus:border-console-accent/50 font-mono transition-colors disabled:opacity-50"
                                        disabled={status === 'sending' || status === 'success'}
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] uppercase tracking-wider text-console-dim font-mono">Contact</label>
                                    <input
                                        required
                                        type="email"
                                        name="email"
                                        placeholder="Email"
                                        className="w-full bg-sys-dark border border-sys-border/50 rounded p-3 text-sm text-console-text placeholder:text-console-muted/50 focus:outline-none focus:border-console-accent/50 font-mono transition-colors disabled:opacity-50"
                                        disabled={status === 'sending' || status === 'success'}
                                    />
                                </div>
                            </div>
                            <div className="space-y-1">
                                <label className="text-[10px] uppercase tracking-wider text-console-dim font-mono">Query Type</label>
                                <select
                                    name="title"
                                    className="w-full bg-sys-dark border border-sys-border/50 rounded p-3 text-sm text-console-text focus:outline-none focus:border-console-accent/50 font-mono transition-colors disabled:opacity-50"
                                    disabled={status === 'sending' || status === 'success'}
                                >
                                    <option>Freelance Project</option>
                                    <option>System Architecture</option>
                                    <option>Technical Consultation</option>
                                    <option>Full-time Opportunity</option>
                                </select>
                            </div>
                            <div className="space-y-1">
                                <label className="text-[10px] uppercase tracking-wider text-console-dim font-mono">Message Payload</label>
                                <textarea
                                    required
                                    name="message"
                                    rows={4}
                                    className="w-full bg-sys-dark border border-sys-border/50 rounded p-3 text-sm text-console-text placeholder:text-console-muted/50 focus:outline-none focus:border-console-accent/50 font-mono resize-none transition-colors disabled:opacity-50"
                                    placeholder="Describe your requirements or proposition..."
                                    disabled={status === 'sending' || status === 'success'}
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                disabled={status === 'sending' || status === 'success'}
                                className="w-full py-3 bg-console-accent/10 border border-console-accent/50 text-console-accent hover:bg-console-accent hover:text-sys-black transition-all rounded font-mono text-sm font-bold uppercase tracking-wider group relative overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <span className="relative z-10 flex items-center justify-center gap-2">
                                    <Mail size={16} /> Transmit Query
                                </span>
                            </button>
                            {status === 'error' && (
                                <p className="text-xs text-red-400 font-mono text-center mt-2">
                                    Error: Transmission failed. Please try again or use direct email.
                                </p>
                            )}
                        </form>
                    </div>

                    {/* Right: 3D Object Placeholder / Status Display */}
                    <div className="relative min-h-[300px] lg:min-h-auto bg-[#050505] flex items-center justify-center group overflow-hidden">
                        {/* Grid Background */}
                        <div className="absolute inset-0 bg-[linear-gradient(rgba(30,30,30,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(30,30,30,0.2)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20"></div>

                        {/* Content Switching based on Status */}
                        <div className="relative z-10 text-center p-8 w-full">
                            {status === 'sending' ? (
                                <div className="animate-fade-in space-y-4">
                                    <div className="w-24 h-24 mx-auto border-2 border-console-text/20 border-t-console-accent rounded-full animate-spin"></div>
                                    <div className="font-mono text-console-accent text-sm animate-pulse">
                                        ESTABLISHING_UPLINK...
                                        <br />
                                        <span className="text-xs text-console-dim">Packets encryted. Transmitting...</span>
                                    </div>
                                </div>
                            ) : status === 'success' ? (
                                <div className="animate-scale-in space-y-6">
                                    <div className="w-24 h-24 mx-auto bg-console-accent/10 rounded-full flex items-center justify-center text-console-accent mb-4">
                                        <CheckCircle2 size={48} />
                                    </div>
                                    <div className="space-y-2">
                                        <h3 className="text-xl font-bold text-white font-mono">TRANSMISSION_ACKNOWLEDGED</h3>
                                        <p className="text-console-dim font-mono text-xs max-w-[200px] mx-auto">
                                            Payload delivered to secure server. Response pending availability.
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => setStatus('idle')}
                                        className="px-6 py-2 bg-sys-surface border border-sys-border text-console-text hover:text-white hover:border-console-accent rounded transition-colors font-mono text-xs uppercase tracking-wider"
                                    >
                                        [ NEW_TRANSMISSION ]
                                    </button>
                                </div>
                            ) : (
                                /* Default Placeholder State */
                                <div className="transition-opacity duration-500">
                                    <div className="w-32 h-32 mx-auto mb-6 rounded-full border-2 border-dashed border-sys-border flex items-center justify-center group-hover:border-console-accent/50 transition-colors">
                                        <span className="text-2xl animate-pulse">📦</span>
                                    </div>
                                    <div className="font-mono text-console-dim text-sm">
                                        [3D_OBJECT_RENDER_TARGET]
                                        <br />
                                        <span className="text-xs text-console-muted">Email Sending Simulation</span>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Social Links (Bottom of Right Panel) */}
                        <div className="absolute bottom-6 w-full flex justify-center gap-6">
                            <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className="text-console-dim hover:text-console-text transition-colors">
                                <Linkedin size={20} />
                            </a>
                            <a href={contact.github} target="_blank" rel="noopener noreferrer" className="text-console-dim hover:text-console-text transition-colors">
                                <Github size={20} />
                            </a>
                        </div>
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
