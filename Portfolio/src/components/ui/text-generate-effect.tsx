import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

export const TextGenerateEffect = ({
    words,
    className,
    filter = true,
    duration = 0.5,
}: {
    words: string;
    className?: string;
    filter?: boolean;
    duration?: number;
}) => {
    let wordsArray = words.split(" ");

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.02,
            },
        },
    };

    const item = {
        hidden: {
            opacity: 0,
            filter: filter ? "blur(10px)" : "none",
        },
        show: {
            opacity: 1,
            filter: "blur(0px)",
            transition: {
                duration: duration ? duration : 1,
            },
        },
    };

    return (
        <div className={cn("font-bold", className)}>
            <div className="mt-4">
                <motion.div
                    className="leading-snug tracking-wide"
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-100px" }}
                >
                    {wordsArray.map((word, idx) => {
                        return (
                            <motion.span
                                key={word + idx}
                                variants={item}
                            >
                                {word}{" "}
                            </motion.span>
                        );
                    })}
                </motion.div>
            </div>
        </div>
    );
};
