import { useEffect, useRef } from "react";

export default function Timer({timeLeftBet,setTimeLeftBet,gameBetDetails}){
    const secondCircle = useRef();

    useEffect(() => {
        const interval = setInterval(() => {
          setTimeLeftBet(prevTime => {
            if (prevTime <= 0) {
              clearInterval(interval);
              return 0;
            }
    
            // Update the strokeDashoffset property based on prevTime
            secondCircle.current.style.strokeDashoffset = `${(prevTime * 451) / 25}px`;
    
            return prevTime - 1;
          });
        }, 1000);
    
        return () => clearInterval(interval);
      }, [gameBetDetails]);
    


    return <div className="relative">
    <svg className="-rotate-90 h-48 w-48">
    <circle
        r="70"
        cx="90"
        cy="90"
        className="fill-transparent stroke-[#1d4fd8] stroke-[8px]"
    ></circle>
    <circle
        r="70"
        cx="90"
        cy="90"
        className=" fill-transparent stroke-white  stroke-[8px]"
        ref={secondCircle}
        style={{
        strokeDasharray: "451px",
        }}
    ></circle>
    </svg>
    <div className="text-white absolute top-16 left-11 text-2xl font-semibold flex flex-col items-center w-24 h-20">
    <span className="text-center">{timeLeftBet}</span>
    <span className="text-center">
        {timeLeftBet == 1 ? "Second" : "Seconds"}
    </span>
    </div>
</div>
}