import { useState, useEffect } from 'react';

export const BootSequence = ({ onComplete }: { onComplete: () => void }) => {
    const [lines, setLines] = useState<string[]>([]);

    useEffect(() => {
        const bootLines = [
            "BIOS DATE 01/01/24 15:23:01 VER 1.0.2",
            "CPU: AMD Ryzen 9 5950X 16-Core Processor",
            "Memory Test: 65536K OK",
            "Detecting System Storage...",
            "Loading OS...",
            "Initializing Graphics Driver...",
            "Loading Portfolio Interface...",
            "Access Granted.",
            "Welcome, user."
        ];

        let delay = 0;
        bootLines.forEach((line, _index) => {
            delay += Math.random() * 300 + 100;
            setTimeout(() => {
                setLines(prev => [...prev, line]);
                // Scroll to bottom
                window.scrollTo(0, document.body.scrollHeight);
            }, delay);
        });

        setTimeout(() => {
            onComplete();
        }, delay + 800);

    }, [onComplete]);

    return (
        <div className="fixed inset-0 bg-black z-[100] p-8 font-mono text-sm md:text-base overflow-hidden flex flex-col justify-end pb-20">
            {lines.map((line, _index) => (
                <div key={_index} className="text-[#33ff33] mb-1">
                    <span className="opacity-50 mr-2">[{new Date().toLocaleTimeString()}]</span>
                    {line}
                </div>
            ))}
            <div className="animate-pulse text-[#33ff33] mt-2">_</div>
        </div>
    );
};
