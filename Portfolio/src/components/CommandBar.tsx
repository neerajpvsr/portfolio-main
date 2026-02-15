import React, { useState, useEffect, useRef } from 'react';
import type { ReactNode } from 'react';
import { Terminal, X, Trash2 } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useNavigate } from 'react-router-dom';
import { content } from '../data/content';

type TerminalOutput = {
    id: string;
    type: 'command' | 'response' | 'error';
    content: ReactNode;
};

export const CommandBar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [input, setInput] = useState('');
    const [outputs, setOutputs] = useState<TerminalOutput[]>([]);
    const [history, setHistory] = useState<string[]>([]);
    const [historyIndex, setHistoryIndex] = useState(-1);

    const inputRef = useRef<HTMLInputElement>(null);
    const scrollRef = useRef<HTMLDivElement>(null);
    const { setTheme, availableThemes } = useTheme();
    const navigate = useNavigate();

    // Context-aware help message on first open
    useEffect(() => {
        if (outputs.length === 0) {
            setOutputs([{
                id: 'init',
                type: 'response',
                content: (
                    <div className="text-console-text font-mono mb-2">
                        <div className="mb-2">Welcome to Portfolio OS v2.4.0</div>
                        <div className="text-console-muted text-xs">
                            Try running: <span className="text-console-accent">help</span>
                            <span className="mx-2">|</span>
                            <span className="text-console-accent">whoami</span>
                            <span className="mx-2">|</span>
                            <span className="text-console-accent">theme cyberpunk</span>
                        </div>
                    </div>
                )
            }]);
        }
    }, []);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [outputs, isOpen]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                setIsOpen(prev => !prev);
            }
            if (e.key === 'Escape') {
                setIsOpen(false);
            }
        };

        const handleOpenEvent = () => setIsOpen(true);

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('open-command-bar', handleOpenEvent);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('open-command-bar', handleOpenEvent);
        };
    }, []);

    const handleInputKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (historyIndex < history.length - 1) {
                const newIndex = historyIndex + 1;
                setHistoryIndex(newIndex);
                setInput(history[history.length - 1 - newIndex]);
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (historyIndex > 0) {
                const newIndex = historyIndex - 1;
                setHistoryIndex(newIndex);
                setInput(history[history.length - 1 - newIndex]);
            } else if (historyIndex === 0) {
                setHistoryIndex(-1);
                setInput('');
            }
        }
    };

    useEffect(() => {
        if (isOpen && inputRef.current) {
            setTimeout(() => inputRef.current?.focus(), 10);
        }
    }, [isOpen]);

    const addToOutput = (type: 'command' | 'response' | 'error', content: ReactNode) => {
        setOutputs(prev => [...prev, { id: Math.random().toString(36).substr(2, 9), type, content }]);
    };

    const executeCommand = (cmd: string) => {
        const trimmedCmd = cmd.trim();
        if (!trimmedCmd) return;

        // Echo command
        addToOutput('command', trimmedCmd);

        // Add to history
        setHistory(prev => [trimmedCmd, ...prev]);
        setHistoryIndex(-1);
        setInput('');

        const parts = trimmedCmd.toLowerCase().split(' ');
        const mainCommand = parts[0];
        const arg = parts[1];

        switch (mainCommand) {
            case 'help':
                addToOutput('response', <HelpOutput />);
                break;
            case 'clear':
                setOutputs([]);
                break;
            case 'exit':
                setIsOpen(false);
                break;
            case 'theme':
                if (arg && availableThemes.includes(arg as any)) {
                    setTheme(arg as any);
                    addToOutput('response', `Theme switched to ${arg}`);
                } else {
                    addToOutput('error', `Usage: theme [${availableThemes.join('|')}]`);
                }
                break;
            case 'cd':
                if (arg) {
                    if (arg === '..') {
                        navigate(-1);
                        addToOutput('response', 'Navigating back...');
                    } else if (['projects', 'log', 'about', 'contact', 'skills', 'education', 'experience'].includes(arg)) {
                        if (['projects', 'log'].includes(arg)) {
                            navigate(`/${arg}`);
                            addToOutput('response', `Navigating to /${arg}...`);
                            setIsOpen(false);
                        } else {
                            navigate('/');
                            addToOutput('response', `Navigating to section #${arg}...`);
                            setIsOpen(false);
                            setTimeout(() => {
                                document.getElementById(arg)?.scrollIntoView({ behavior: 'smooth' });
                            }, 100);
                        }
                    } else {
                        addToOutput('error', `Directory not found: ${arg}`);
                    }
                } else {
                    navigate('/');
                    addToOutput('response', 'Navigating to root...');
                    setIsOpen(false);
                }
                break;
            case 'whoami':
                addToOutput('response', <IdentityOutput />);
                break;
            case 'ls':
                addToOutput('response', (
                    <div className="grid grid-cols-3 gap-2 text-console-accent text-sm font-mono">
                        {['projects', 'log', 'about', 'contact', 'skills', 'education', 'experience'].map(d => <span key={d}>{d}/</span>)}
                    </div>
                ));
                break;
            default:
                addToOutput('error', `Command not found: ${mainCommand}. Type 'help' for available commands.`);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        executeCommand(input);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4" onClick={() => setIsOpen(false)}>
            <div
                className="w-full max-w-xl h-[400px] bg-sys-black border border-console-accent/50 shadow-2xl flex flex-col overflow-hidden font-mono"
                onClick={e => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center gap-2 bg-sys-surface px-4 py-2 border-b border-sys-border">
                    <Terminal size={14} className="text-console-accent" />
                    <span className="text-xs text-console-muted">neeraj@portfolio:~</span>
                    <div className="flex-1" />
                    <button onClick={() => setOutputs([])} className="text-console-muted hover:text-console-error transition-colors mr-3" title="Clear Terminal">
                        <Trash2 size={14} />
                    </button>
                    <button onClick={() => setIsOpen(false)} className="text-console-muted hover:text-red-500 transition-colors" title="Close">
                        <X size={14} />
                    </button>
                </div>

                {/* Terminal Content */}
                <div className="flex-1 overflow-y-auto p-4 space-y-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']" ref={scrollRef}>
                    {outputs.map((out) => (
                        <div key={out.id} className="mb-2">
                            {out.type === 'command' ? (
                                <div className="flex items-center gap-2 text-console-accent font-bold">
                                    <span>➜</span>
                                    <span>~</span>
                                    <span className="text-console-text">{out.content}</span>
                                </div>
                            ) : out.type === 'error' ? (
                                <div className="text-red-500 text-sm pl-6">{out.content}</div>
                            ) : (
                                <div className="text-console-text/90 text-sm pl-6">{out.content}</div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Input Area */}
                <form onSubmit={handleSubmit} className="p-4 bg-sys-surface/50 border-t border-sys-border flex items-center gap-2">
                    <span className="text-console-accent font-bold">➜</span>
                    <span className="text-console-accent font-bold">~</span>
                    <input
                        ref={inputRef}
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleInputKeyDown}
                        className="flex-1 bg-transparent border-none outline-none text-console-text font-mono placeholder:text-console-muted/50"
                        placeholder="Type a command..."
                        autoComplete="off"
                        autoFocus
                    />
                </form>
            </div>
        </div>
    );
};

// Inline Components used in outputs

const HelpOutput = () => {
    const commands = [
        { cmd: 'help', desc: 'Show this system manual', usage: 'help' },
        { cmd: 'whoami', desc: 'Display user session & profile', usage: 'whoami' },
        { cmd: 'cd', desc: 'Navigate system directories', usage: 'cd [dir]' },
        { cmd: 'ls', desc: 'List directories', usage: 'ls' },
        { cmd: 'theme', desc: 'Switch theme (try: matrix, cyberpunk, retro, system)', usage: 'theme [name]' },
        { cmd: 'clear', desc: 'Clear history', usage: 'clear' },
        { cmd: 'exit', desc: 'Close terminal', usage: 'exit' },
    ];
    return (
        <div className="space-y-1 mt-2 mb-4">
            <div className="text-console-muted text-xs mb-2">AVAILABLE COMMANDS:</div>
            <div className="grid grid-cols-[100px_1fr] gap-4">
                {commands.map(c => (
                    <React.Fragment key={c.cmd}>
                        <div className="text-console-accent">{c.cmd}</div>
                        <div className="text-console-text/80">{c.desc}</div>
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
};

const IdentityOutput = () => (
    <div className="mt-2 mb-4 p-4 border border-console-accent/20 rounded bg-sys-surface/20 max-w-md">
        <div className="flex items-start gap-4">
            <img src={content.hero.profileImage} alt="Profile" className="w-16 h-16 rounded-full border border-console-accent/30 object-cover" />
            <div>
                <div className="text-lg font-bold text-console-text">{content.hero.name}</div>
                <div className="text-console-accent text-sm mb-2">{content.hero.role}</div>
                <div className="text-xs text-console-muted grid grid-cols-2 gap-x-8 gap-y-1">
                    <span>LOC: Remote / India</span>
                    <span>No. of Projects: {content.projects.length}</span>
                    <span>Status: ONLINE</span>
                    <span>Access: ADMIN</span>
                </div>
            </div>
        </div>
    </div>
);
