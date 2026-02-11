import { Hero } from '../components/Hero';
import { About } from '../components/About';
import { EducationFetch } from '../components/EducationFetch';
import { Skills } from '../components/Skills';
import { ExperienceTimeline } from '../components/ExperienceTimeline';
import { Contact } from '../components/Contact';

export const Home = () => {
    return (
        <>
            <Hero />
            <About />

            {/* Career Section: Side-by-Side Grid */}
            <section id="career" className="pt-8 pb-12 relative overflow-hidden">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-12 items-start">
                        <ExperienceTimeline />
                        <EducationFetch />
                    </div>
                </div>
            </section>

            <Skills />
            <Contact />
        </>
    );
};
