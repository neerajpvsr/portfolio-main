import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [time, setTime] = useState(new Date());
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };

        const timer = setInterval(() => setTime(new Date()), 1000);

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
            clearInterval(timer);
        };
    }, []);

    const handleNavigation = (id: string) => {
        if (id === 'log') {
            navigate('/log');
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }
        if (id === 'projects') {
            navigate('/projects');
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }

        // If trying to navigate to a section but not on home page
        if (location.pathname !== '/') {
            navigate('/');
            // Wait for navigation to complete before scrolling
            setTimeout(() => {
                const element = document.getElementById(id);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                } else {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }
            }, 100);
        } else {
            // Already on home page
            const element = document.getElementById(id);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };

    const navLinks = [
        { name: '~/about', id: 'about' },
        { name: '~/skills', id: 'skills' },
        { name: '~/projects', id: 'projects' },
        { name: '~/log', id: 'log' },
        { name: './contact', id: 'contact' },
    ];

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${isScrolled
                ? 'bg-sys-black/95 backdrop-blur-sm border-sys-border py-3'
                : 'bg-transparent border-transparent py-5'
                }`}
        >
            <div className="container-terminal flex items-center justify-between font-mono text-sm">
                <div
                    className="flex items-center gap-2 cursor-pointer text-console-text hover:text-console-accent transition-colors group relative"
                    onClick={() => {
                        window.dispatchEvent(new Event('open-command-bar'));
                    }}
                >
                    <div className="absolute -bottom-8 left-0 opacity-0 group-hover:opacity-100 transition-opacity text-xs bg-sys-surface border border-sys-border px-2 py-1 text-console-muted whitespace-nowrap pointer-events-none">
                        Open Terminal (Cmd+K)
                    </div>
                    {/* existing logo content... kept pure text here for brevity in replacement but strict edit needed */}
                    <span className="text-console-success">➜</span>
                    <span className="font-bold">neeraj@system</span>
                    <span className="text-console-muted">:</span>
                    <span className="text-console-accent">~</span>
                </div>

                <div className="hidden md:flex items-center gap-8">
                    <ul className="flex gap-6">
                        {navLinks.map((link) => (
                            <li key={link.name}>
                                <button
                                    onClick={() => handleNavigation(link.id)}
                                    className="text-console-dim hover:text-console-accent transition-colors tracking-tight hover:underline decoration-console-accent/50 underline-offset-4"
                                >
                                    {link.name}
                                </button>
                            </li>
                        ))}
                    </ul>

                    <div className="h-4 w-px bg-sys-border"></div>

                    <div className="text-console-muted text-xs">
                        UPTIME: {time.toLocaleTimeString([], { hour12: false })}
                    </div>
                </div>
            </div>
        </nav>
    );
};
