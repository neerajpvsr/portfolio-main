import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'system' | 'matrix' | 'cyberpunk' | 'retro';

interface ThemeContextType {
    theme: Theme;
    setTheme: (theme: Theme) => void;
    availableThemes: Theme[];
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    // Default to 'system'
    const [theme, setThemeState] = useState<Theme>(() => {
        const saved = localStorage.getItem('portfolio-theme');
        return (saved as Theme) || 'system';
    });

    useEffect(() => {
        const root = window.document.documentElement;
        // Remove all theme classes
        root.classList.remove('theme-matrix', 'theme-cyberpunk', 'theme-retro');

        // Add current theme class (unless it's 'system' which is default)
        if (theme !== 'system') {
            root.classList.add(`theme-${theme}`);
        }

        localStorage.setItem('portfolio-theme', theme);
    }, [theme]);

    const setTheme = (newTheme: Theme) => {
        setThemeState(newTheme);
    };

    const availableThemes: Theme[] = ['system', 'matrix', 'cyberpunk', 'retro'];

    return (
        <ThemeContext.Provider value={{ theme, setTheme, availableThemes }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};
