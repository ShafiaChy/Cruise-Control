import { motion } from "framer-motion";
import { ReactNode } from "react";

type FlipLinkProps = {
  children: ReactNode;
  href: string;
};
const DURATION = 0.25;
const STAGGER = 0.025;

export const FlipLink = ({ children, href }: FlipLinkProps) => {
  return (
    <motion.a
      initial="initial"
      whileHover="hovered"
      href={href}
      className="relative block overflow-hidden hover:border-b-2 mx-1 hover:border-orange-600 border-transparent whitespace-nowrap  uppercase text-sm"
      style={{
        lineHeight: 1,
      }}
    >
      <div>
        {(children as string).split("").map((l: string, i: number) => (
          <motion.span
            variants={{
              initial: {
                y: 0,
              },
              hovered: {
                y: "-100%",
              },
            }}
            transition={{
              duration: DURATION,
              ease: "easeInOut",
              delay: STAGGER * i,
            }}
            className="inline-block"
            key={i}
          >
            {l}
          </motion.span>
        ))}
      </div>
      <div className="absolute inset-0">
        {(children as string).split("").map((l: string, i: number) => (
          <motion.span
            variants={{
              initial: {
                y: "100%",
              },
              hovered: {
                y: 0,
              },
            }}
            transition={{
              duration: DURATION,
              ease: "easeInOut",
              delay: STAGGER * i,
            }}
            className="inline-block"
            key={i}
          >
            {l}
          </motion.span>
        ))}
      </div>
    </motion.a>
  );
};
