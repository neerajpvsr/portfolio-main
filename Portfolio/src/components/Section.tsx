import React, { type ReactNode } from 'react';

interface SectionProps {
    id?: string;
    children: ReactNode;
    className?: string;
}

export const Section: React.FC<SectionProps> = ({ id, children, className = '' }) => {
    return (
        <section id={id} className={`section-padding ${className}`}>
            <div className="container-terminal">
                {children}
            </div>
        </section>
    );
};
