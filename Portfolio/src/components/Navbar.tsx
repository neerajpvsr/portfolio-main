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
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${isScrolled || isMobileMenuOpen
                ? 'bg-sys-black/95 backdrop-blur-sm border-sys-border py-3'
                : 'bg-transparent border-transparent py-5'
                }`}
        >
            <div className="container-terminal flex items-center justify-between font-mono text-sm">
                <div
                    className="flex items-center gap-2 cursor-pointer text-console-text hover:text-console-accent transition-colors group relative z-50"
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

                {/* Mobile Menu Overlay */}
                <div className={`fixed inset-0 bg-sys-black/95 backdrop-blur-md flex flex-col items-center justify-center gap-8 transition-transform duration-300 md:hidden ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                    <ul className="flex flex-col gap-8 text-center">
                        {navLinks.map((link) => (
                            <li key={link.name}>
                                <button
                                    onClick={() => handleNavigation(link.id)}
                                    className="text-console-text text-xl hover:text-console-accent transition-colors tracking-tight hover:underline decoration-console-accent/50 underline-offset-8"
                                >
                                    {link.name}
                                </button>
                            </li>
                        ))}
                    </ul>
                    <div className="text-console-muted text-xs mt-8">
                        UPTIME: {time.toLocaleTimeString([], { hour12: false })}
                    </div>
                </div>
            </div>
        </nav>
    );
};
