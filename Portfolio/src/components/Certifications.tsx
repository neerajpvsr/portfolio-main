import { Section } from './Section';
import { content } from '../data/content';

export const Certifications = () => {
    const { certifications } = content;

    return (
        <Section id="certifications">
            <div className="terminal-header mb-8">
                <span className="terminal-prompt">$</span> ./trusted.extensions
            </div>

            <div className="max-w-6xl mx-auto px-4">
                {/* Minimal Horizontal Banner */}
                <div className="flex flex-wrap items-center justify-center gap-12 md:gap-20">
                    {certifications.map((cert, index) => (
                        <a
                            key={index}
                            href={cert.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group relative flex items-center justify-center transition-transform hover:scale-110 duration-300 focus:outline-none"
                            aria-label={`Verify ${cert.name}`}
                        >
                            {/* Logo */}
                            <img
                                src={cert.image}
                                alt={cert.name}
                                className="h-32 w-auto object-contain transition-all duration-500 ease-out"
                            />

                            {/* Subtle Underline on Hover */}
                            <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-sys-border group-hover:w-full transition-all duration-300"></span>
                        </a>
                    ))}
                </div>


            </div>
        </Section>
    );
};
