/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
                mono: ['"JetBrains Mono"', '"Fira Code"', 'Consolas', 'Monaco', '"Andale Mono"', '"Ubuntu Mono"', 'monospace'],
            },
            colors: {
                sys: {
                    black: 'var(--sys-black)',
                    dark: 'var(--sys-dark)',
                    surface: 'var(--sys-surface)',
                    border: 'var(--sys-border)',
                },
                console: {
                    text: 'var(--console-text)',
                    dim: 'var(--console-dim)',
                    muted: 'var(--console-muted)',
                    accent: 'var(--console-accent)',
                    success: 'var(--console-success)',
                    warn: 'var(--console-warn)',
                    error: 'var(--console-error)',
                }
            },
            maxWidth: {
                'terminal': '1000px',
            },
            animation: {
                'cursor-blink': 'blink 1s step-start infinite',
            },
            keyframes: {
                blink: {
                    '0%, 100%': { opacity: '1' },
                    '50%': { opacity: '0' },
                }
            }
        },
    },
    plugins: [],
}
