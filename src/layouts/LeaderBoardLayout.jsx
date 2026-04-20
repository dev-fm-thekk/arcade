import BackButton from '../components/BackButton';
import LeaderBoardElement from '../components/LeaderBoardElement';
import { motion } from 'framer-motion';

export default function LeaderBoardLayout(props) {
    return (
        <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full min-h-dvh lg:h-dvh overflow-auto lg:overflow-hidden flex flex-col lg:flex-row justify-center align-center"
        >
            <motion.div
                layoutId="left-panel"
                className="relative w-full lg:w-1/2 bg-[#F8FFD7] min-h-[60dvh] lg:h-full flex flex-col items-start py-12 lg:py-8 overflow-hidden"
            >
                <motion.div
                    layoutId="back-btn-wrapper"
                    className="absolute top-[42px] left-[59px] w-full max-w-[200px] h-[clamp(40px,10vw,100px)] rounded-xl flex justify-center items-center hover:scale-[1.02] transition-transform"
                >
                    <BackButton bg={props.accentColor} name={props.name} />
                </motion.div>

                <div className="mt-48 px-[69px] flex flex-col gap-25 w-full">

                    <motion.p
                        layoutId="game-name"
                        style={{ color: `#${props.accentColor}` }}
                        className="text-[clamp(8em,8vw,6rem)] font-base-neue-trial leading-none uppercase"
                    >
                        {props.name}
                    </motion.p>

                    <div className="flex flex-col">
                        <motion.p
                            layoutId="player-rank-label"
                            style={{ color: `#${props.accentColor}99` }}
                            className="text-[clamp(4em,3vw,2rem)] font-base-neue-trial leading-none mb-1"
                        >
                            Your Rank
                        </motion.p>

                        <div className="flex items-start gap-0.5">
                            <motion.span
                                style={{ color: `#${props.accentColor}` }}
                                className="text-[clamp(4em,4vw,3rem)] font-base-neue-trial leading-none mt-4"
                            >
                                #
                            </motion.span>
                            <motion.span
                                style={{ color: `#${props.accentColor}` }}
                                className="text-[clamp(16em,15vw,12rem)] font-base-neue-trial leading-none"
                            >
                                63
                            </motion.span>
                        </div>
                    </div>
                </div>
            </motion.div>
            <motion.div
                layoutId="right-panel"
                style={{ backgroundColor: `#${props.accentColor}` }}
                className="w-full lg:w-1/2 min-h-[60dvh] lg:h-full flex flex-col text-center items-center py-12 lg:py-8 px-4 md:px-12 lg:px-8 xl:px-16 overflow-hidden"
            >
                <div className="relative left-0 top-0 flex w-full mb-[5em]">
                    <p
                        className="w-full text-center text-[clamp(7rem,12vw,6rem)] font-base-neue-trial leading-none uppercase text-[#F8FFD7] whitespace-nowrap"
                    >LEADERBOARD</p>
                </div>
                <LeaderBoardElement name={'Akshay M'} score={'9842'} color={props.accentColor} />
                <LeaderBoardElement name={'Gowtham S'} score={'9500'} color={props.accentColor} />
                <LeaderBoardElement name={'Arpitha S'} score={'8907'} color={props.accentColor} />
                <LeaderBoardElement name={'Abhiram A R'} score={'8507'} color={props.accentColor} />
                <LeaderBoardElement name={'Abhiram A P'} score={'1201'} color={props.accentColor} />
            </motion.div>
        </motion.main>
    )
}