import { Section } from './Section';
import { content } from '../data/content';
import { Clock } from 'lucide-react';

export const Education = () => {
    const { education } = content;
    const years = [2020, 2021, 2022, 2023, 2024, 2025, 2026];

    return (
        <Section id="education">
            <div className="terminal-header">
                <span className="terminal-prompt">$</span> ./learning.pipeline
            </div>

            <div className="w-full mx-auto py-6 px-4 md:px-8">

                {/* Desktop View: Shared Grid for Perfect Vertical Alignment */}
                {/* Rows are implicitly sized by the content spanning them. We enforce min-height. */}
                <div className="hidden md:grid grid-cols-[1fr_60px_1fr] gap-x-4 relative">

                    {/* CONTINUOUS VERTICAL AXIS LINE */}
                    {/* We place this absolutely to span the whole grid height */}
                    <div className="col-start-2 row-start-1 row-end-8 w-px bg-sys-border mx-auto h-full relative z-0"></div>

                    {/* YEAR MARKERS (Row 1 to 6) */}
                    {years.map((year, i) => (
                        <div key={year} className="col-start-2 flex justify-center h-16 relative z-10" style={{ gridRowStart: i + 1 }}>
                            {/* The Dot and Label */}
                            <div className="relative flex items-center justify-center w-full h-full">
                                {/* Align to top to match Cards */}
                                <div className="absolute top-0 flex flex-col items-center gap-1">
                                    <div className="bg-sys-black text-console-muted text-[10px] font-mono py-1 px-2 border border-sys-border rounded font-bold">
                                        {year}
                                    </div>
                                    <div className="w-1.5 h-1.5 rounded-full bg-sys-border"></div>
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* THREAD 01: Andhra University (Matches 2020 Start) */}
                    {/* Spans 5 Rows (2020-2024) approx? Let's say row-span-5 to take space. */}
                    <div className="col-start-1 row-start-1 row-span-5 relative text-right pr-8 pt-4">
                        {/* Precision Connector: Aligned to the Year Dot. 
                     Year dot is at top (offset by label height ~26px + gap).
                     Let's check Year Marker HTML above.
                     Label is ~24px tall. Dot is under it. Center of dot is approx 24+4+3 = 31px from top?
                     Actually: `flex flex-col items-center gap-1`. Label (24px) + Gap (4px) + Dot (6px).
                     Top of Dot is 28px. Center is 31px.
                     So we should align connector at `top-[31px]`.
                 */}
                        <div className="absolute top-[16px] right-0 w-8 h-px bg-sys-border border-b border-dashed border-sys-border"></div>
                        <div className="absolute top-[13px] right-[-3px] w-2 h-2 rounded-full ring-4 ring-sys-black bg-console-accent z-20"></div>

                        <div className="flex flex-col items-end group relative">
                            <div className="inline-block px-3 py-1 rounded bg-console-accent/10 text-console-accent text-xs font-mono mb-3 border border-console-accent/20">
                                THREAD_01: COMPLETED
                            </div>

                            <div className="bg-sys-dark border-r-2 border-console-accent border-y border-l border-sys-border p-5 rounded-l-lg hover:bg-sys-surface/50 transition-colors w-full shadow-lg">
                                <div className="flex items-center gap-4 justify-end mb-4">
                                    <div className="w-16 h-16 shrink-0 bg-sys-surface rounded overflow-hidden border border-sys-border shadow-sm p-1 order-2">
                                        <img src={education[0].logo || ""} alt="AU" className="w-full h-full object-contain" />
                                    </div>
                                    <h3 className="font-bold text-console-text text-xl md:text-2xl tracking-tight order-1">
                                        {education[0].institution}
                                    </h3>
                                </div>

                                <div className="text-console-text/90 text-sm mb-4 font-medium">{education[0].degree}</div>

                                <div className="flex flex-col items-end gap-1 mb-4">
                                    <div className="font-mono text-xs text-console-dim flex items-center gap-2 bg-sys-surface/50 px-2 py-1 rounded w-fit">
                                        <Clock size={12} />
                                        {education[0].period}
                                    </div>
                                </div>

                                <div className="text-console-dim text-xs font-mono border-t border-sys-border pt-3 mt-1 inline-block opacity-80">
                                    {education[0].focus}
                                </div>
                            </div>
                        </div>

                        <div className="absolute top-[18px] right-[-1px] w-0.5 bg-gradient-to-b from-console-accent to-transparent h-[90%]"></div>
                    </div>


                    {/* THREAD 02: IIT Madras (Matches 2021 Start) */}
                    {/* Starts exactly at Row 2. */}
                    <div className="col-start-3 row-start-2 row-span-6 relative pl-8 pt-4">
                        {/* Connector same alignment: top-[31px] relative to THIS cell top.
                     Since grid cell top matches Axis Cell 2 top, this aligns perfectly with 2021 dot.
                 */}
                        <div className="absolute top-[16px] left-0 w-8 h-px bg-sys-border border-b border-dashed border-sys-border"></div>
                        <div className="absolute top-[13px] left-[-3px] w-2 h-2 rounded-full ring-4 ring-sys-black bg-console-warn z-20"></div>

                        <div className="flex flex-col group relative">
                            <div className="inline-block w-fit px-3 py-1 rounded bg-console-warn/10 text-console-warn text-xs font-mono mb-3 border border-console-warn/20">
                                THREAD_02: Running [Resumed]
                            </div>

                            <div className="bg-sys-dark border-l-2 border-console-warn border-y border-r border-sys-border p-5 rounded-r-lg hover:bg-sys-surface/50 transition-colors w-full shadow-lg">
                                <div className="flex items-center gap-4 mb-4">
                                    <h3 className="font-bold text-console-text text-xl md:text-2xl tracking-tight">
                                        {education[1].institution}
                                    </h3>
                                    <div className="w-16 h-16 shrink-0 bg-sys-surface rounded overflow-hidden border border-sys-border shadow-sm p-1">
                                        <img src={education[1].logo || ""} alt="IITM" className="w-full h-full object-contain" />
                                    </div>
                                </div>

                                <div className="text-console-text/90 text-sm mb-4 font-medium">{education[1].degree}</div>

                                <div className="flex flex-col items-start gap-1 mb-4">
                                    <div className="font-mono text-xs text-console-dim flex items-center gap-2 bg-sys-surface/50 px-2 py-1 rounded w-fit">
                                        <Clock size={12} />
                                        {education[1].period}
                                    </div>
                                </div>

                                <div className="text-console-dim text-xs font-mono border-t border-sys-border pt-3 mt-1 inline-block opacity-80">
                                    {education[1].focus}
                                </div>
                            </div>
                        </div>

                        <div className="absolute top-[18px] left-[-1px] w-0.5 bg-gradient-to-b from-console-warn to-transparent h-[90%]"></div>
                    </div>

                </div>
            </div>
        </Section>
    );
};
