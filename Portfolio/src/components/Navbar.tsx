import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [time, setTime] = useState(new Date());
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    // Handle scroll and time
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

    // Close mobile menu on resize if screen becomes large
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setIsMobileMenuOpen(false);
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // ... existing handleNavigation ...
    const handleNavigation = (id: string) => {
        setIsMobileMenuOpen(false); // Close menu on click
        // ... rest of logic
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

        if (location.pathname !== '/') {
            navigate('/');
            setTimeout(() => {
                const element = document.getElementById(id);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                } else {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }
            }, 100);
        } else {
            const element = document.getElementById(id);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };

    const navLinks = [
        { name: '~/home', id: 'home' },
        { name: '~/about', id: 'about' },
        { name: '~/skills', id: 'skills' },
        { name: '~/projects', id: 'projects' },
        { name: '~/log', id: 'log' },
        { name: './contact', id: 'contact' },
    ];

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-[999] transition-all duration-300 ${isScrolled || isMobileMenuOpen
                ? 'bg-sys-black/80 backdrop-blur-sm py-3'
                : 'bg-transparent py-5'
                }`}
        >
            <div className="container-terminal flex items-center justify-between font-mono text-sm">
                <div
                    className="flex items-center gap-2 cursor-pointer text-console-text hover:text-console-accent transition-colors group relative z-50 animate-pulse"
                    onClick={() => {
                        window.dispatchEvent(new Event('open-command-bar'));
                        setIsMobileMenuOpen(false);
                    }}
                >
                    <div className="absolute -bottom-8 left-0 opacity-0 group-hover:opacity-100 transition-opacity text-xs bg-sys-surface border border-sys-border px-2 py-1 text-console-muted whitespace-nowrap pointer-events-none hidden md:block">
                        Open Terminal (Cmd+K)
                    </div>
                    <span className="text-console-success">➜</span>
                    <span className="font-bold">neeraj@system</span>
                    <span className="text-console-muted">:</span>
                    <span className="text-console-accent">~</span>
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    className="md:hidden text-console-text hover:text-console-accent z-50"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>

                {/* Desktop Menu */}
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

                {/* Mobile Menu - Floating Glass Sidebar */}
                <div
                    className={`fixed top-16 right-4 w-64 rounded-2xl z-[9999] flex flex-col shadow-2xl transition-all duration-300 ease-out md:hidden border border-white/10 ${isMobileMenuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8 pointer-events-none'}`}
                    style={{
                        backgroundColor: 'rgba(5, 5, 5, 0.85)',
                        backdropFilter: 'blur(16px)',
                        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.5)'
                    }}
                >
                    {/* Removed duplicate close button as requested */}

                    <div className="flex-1 flex flex-col justify-center gap-2 p-6">
                        <ul className="flex flex-col gap-4 w-full">
                            {navLinks.map((link) => (
                                <li key={link.name}>
                                    <button
                                        onClick={() => handleNavigation(link.id)}
                                        className="text-console-text text-lg font-medium hover:text-console-accent transition-colors tracking-tight w-full text-right py-2 border-b border-white/5 last:border-0 hover:translate-x-[-4px]"
                                    >
                                        {link.name}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="p-4 border-t border-white/10 text-right bg-black/20 rounded-b-2xl">
                        <div className="text-console-muted text-[10px] font-mono mb-1 tracking-wider">SYSTEM STATUS</div>
                        <div className="text-console-success text-xs font-mono">
                            UPTIME: {time.toLocaleTimeString([], { hour12: false })}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};
