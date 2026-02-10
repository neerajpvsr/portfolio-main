import React, { useState, useEffect, useRef } from 'react';
import { Terminal, Send, X, ChevronRight } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useNavigate } from 'react-router-dom';

export const CommandBar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [input, setInput] = useState('');
    const [history, setHistory] = useState<string[]>([]);
    const [historyIndex, setHistoryIndex] = useState(-1);
    const inputRef = useRef<HTMLInputElement>(null);
    const { setTheme, availableThemes } = useTheme();
    const navigate = useNavigate();

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
            inputRef.current.focus();
        }
    }, [isOpen]);

    const executeCommand = (cmd: string) => {
        const trimmedCmd = cmd.trim().toLowerCase();
        const parts = trimmedCmd.split(' ');
        const mainCommand = parts[0];
        const arg = parts[1];

        // Add to history if unique or recent
        setHistory(prev => [...prev, cmd]);
        setHistoryIndex(-1);

        switch (mainCommand) {
            case 'help':
                alert('Available commands:\n- help: Show this message\n- clear: Clear history\n- theme [name]: Switch theme (matrix, cyberpunk, retro, system)\n- cd [page]: Navigate (projects, log, about)\n- whoami: Display user info');
                break;
            case 'clear':
                setHistory([]);
                break;
            case 'theme':
                if (arg && availableThemes.includes(arg as any)) {
                    setTheme(arg as any);
                } else {
                    alert(`Usage: theme [${availableThemes.join('|')}]`);
                }
                break;
            case 'cd':
                if (arg) {
                    if (arg === '..') {
                        navigate(-1);
                    } else if (['projects', 'log', 'about', 'contact', 'skills', 'education'].includes(arg)) {
                        // Special handling for hash links vs routes
                        if (['projects', 'log'].includes(arg)) {
                            navigate(`/${arg}`);
                        } else {
                            navigate('/');
                            setTimeout(() => {
                                document.getElementById(arg)?.scrollIntoView({ behavior: 'smooth' });
                            }, 100);
                        }
                    } else {
                        alert(`Directory not found: ${arg}`);
                    }
                } else {
                    navigate('/');
                }
                break;
            case 'whoami':
                alert('visitor@portfolio\nRole: Guest\nAccess: Read-Only');
                break;
            default:
                if (trimmedCmd !== '') {
                    // Optional: toast error or just ignore
                }
        }
        setInput('');
        setIsOpen(false);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        executeCommand(input);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-sys-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4" onClick={() => setIsOpen(false)}>
            <div
                className="w-full max-w-2xl bg-sys-dark border border-console-accent/50 rounded-lg shadow-2xl overflow-hidden"
                onClick={e => e.stopPropagation()}
            >
                <div className="flex items-center gap-2 bg-sys-surface px-4 py-2 border-b border-sys-border">
                    <Terminal size={16} className="text-console-accent" />
                    <span className="text-xs font-mono text-console-muted">COMMAND PALETTE</span>
                    <div className="flex-1" />
                    <button onClick={() => setIsOpen(false)} className="text-console-muted hover:text-console-error transition-colors">
                        <X size={16} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-4 flex items-center gap-3">
                    <ChevronRight className="text-console-success animate-pulse" />
                    <input
                        ref={inputRef}
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleInputKeyDown}
                        className="flex-1 bg-transparent border-none outline-none font-mono text-console-text text-lg placeholder:text-console-muted/50"
                        placeholder="Type a command (try 'help' or 'theme matrix')..."
                        autoComplete="off"
                        autoFocus
                    />
                    <button type="submit" className="p-2 text-console-accent hover:bg-sys-surface rounded transition-colors">
                        <Send size={18} />
                    </button>
                </form>

                <div className="bg-sys-black/50 px-4 py-2 text-xs font-mono text-console-muted border-t border-sys-border flex justify-between">
                    <span>[TAB] to autocomplete (TBD)</span>
                    <span>[ESC] to close</span>
                </div>
            </div>
        </div>
    );
};
