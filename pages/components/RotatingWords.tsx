import * as motion from "motion/react-client"
import Image from "next/image"

export default function RotatingWords({size = 180}) {
    return (
        <motion.div
            animate={{
                scale:  [1, 1, 1.2, 1.2, 1, 1,  1, 1.2, 1.2, 1],
                rotate: [0, 0, 0,   0,   0, 0, 180, 180, 180, 180],
                //borderRadius: ["0%", "0%", "50%", "50%", "0%"],
            }}
            transition={{
                duration: 4,
                ease: "easeInOut",
                times: [0, 0.15, 0.2, 0.25, 0.35,0.4, 0.8, 0.85, 0.9, 1],
                repeat: 0,
                repeatDelay: 3,
              }}
            //style={box}
        >
            <Image
                src="/spin-words.png"
                alt="Rotating Box"
                width={size}
                height={size}
            />
       </motion.div>
    )
}
