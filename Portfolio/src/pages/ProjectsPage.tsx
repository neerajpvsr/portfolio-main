

export const ProjectsPage = () => {
    return (
        <div className="min-h-screen pt-24 flex flex-col items-center justify-center text-center px-4">
            <div className="font-mono text-console-accent mb-4">
                $ ./projects.sh --status
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-console-text mb-6 tracking-tight">
                COMING SOON
                <span className="text-console-accent animate-pulse">_</span>
            </h1>
            <div className="text-console-dim font-mono text-sm max-w-md leading-relaxed">
                Project modules are currently compiling.
                <br />
                Please check back later for system updates.
            </div>
        </div>
    );
};
