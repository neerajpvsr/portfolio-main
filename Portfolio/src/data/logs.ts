import agenticAi from '../content/posts/agentic-ai.md?raw';
import minimalism from '../content/posts/minimalism.md?raw';

export type LogEntry = {
    id: string;
    title: string;
    date: string;
    category: string;
    readTime: string;
    status: 'PUBLISHED' | 'DRAFT';
    summary: string;
    content: string;
    image?: string;
};

export const logs: LogEntry[] = [
    {
        id: 'log_001',
        title: 'The Rise of Agentic AI',
        date: '2025-01-15',
        category: 'AI / Engineering',
        readTime: '4 min read',
        status: 'PUBLISHED',
        summary: 'The shift from chat-based LLMs to autonomous agents marks a new era in software engineering. We are moving from "asking" computers to "assigning" tasks.',
        content: agenticAi,
        image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1200' // Abstract AI Network
    },
    {
        id: 'log_002',
        title: 'Digital Minimalism in UI',
        date: '2024-12-10',
        category: 'Design / Psychology',
        readTime: '3 min read',
        status: 'DRAFT',
        summary: 'Why do we love terminal interfaces? Because they strip away the "noise" of modern UI. Building a portfolio that mimics this is a statement about efficiency.',
        content: minimalism,
        image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200' // Terminal Code
    }
];
