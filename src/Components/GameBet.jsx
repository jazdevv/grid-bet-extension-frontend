import { useEffect, useRef, useState } from "react"
import Timer from "./Timer";
import dolar from "./dolar.webp";

export default function GameBet({ gameBetDetails, creditsAmount }) {
    const [timeLeftBet, setTimeLeftBet] = useState(25);
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [errorMsg, setErrorMsg] = useState("");
    const [succeddMsg, setSucceddMsg] = useState("");
    const [amount, setAmount] = useState(1);
    const [bettedThisRound, setBettedThisRound] = useState(false);

    function onChangeAmount(e) {
        console.log(e.target.value.split(".").length)
        if (e.target.value.split(".")[1]?.length > 1) {
            return
        }
        setAmount(e.target.value);
        setErrorMsg("")
    }

    function onClickSetSelectedIndex(index) {
        setErrorMsg("");
        setSelectedIndex(index);
    }

    function onSubmit() {
        if (selectedIndex == null) {
            setErrorMsg("Please choose an option before placing your bet")
            return
        }
        if (amount > creditsAmount) {
            setErrorMsg("Insufficient Funds: You have exceeded your available balance")
            return
        }
        setBettedThisRound(true);
        let optionName;
        if(selectedIndex==0){
            optionName = gameBetDetails.option0
        }else{
            optionName = gameBetDetails.option1
        }
        setSucceddMsg(`Success! You have successfully placed a bet of $${amount} on ${optionName}.`)
    }

    useEffect(() => {
        console.log("resetting bet time")
        setBettedThisRound(false);
        setSucceddMsg("");
        setTimeLeftBet(25)
    }, [gameBetDetails]);

    // Calculate the angle for the circle
    //const angle = timeLeftBet === 25 ? 360 : ((25 - timeLeftBet) / 25) * 360;

    return (
        <div>
            <div className="flex ">
                <div className="flex bg-blue-700 bg-gradient2 p-2 font-bold m-auto">
                    {`${gameBetDetails.option0} vs ${gameBetDetails.option1}`}
                </div>
            </div>
            {timeLeftBet > 0 && bettedThisRound == false ? (
                <div className="flex flex-col gap-2 pb-4">
                    <div className="flex w-full justify-center">
                        <Timer timeLeftBet={timeLeftBet} setTimeLeftBet={setTimeLeftBet} gameBetDetails={gameBetDetails} />
                    </div>
                    <div className="flex justify-between px-10 py-4  font-bold text-md">
                        {
                            selectedIndex == 0
                                ?
                                <div className="bg-blue-700 hover:bg-blue-700 p-2 rounded cursor-pointer">
                                    {gameBetDetails.option0}
                                </div>
                                :
                                <div onClick={() => {
                                    onClickSetSelectedIndex(0);
                                }} className="bg-blue-900 hover:bg-blue-700 p-2 rounded cursor-pointer">
                                    {gameBetDetails.option0}
                                </div>
                        }
                        {
                            selectedIndex == 1
                                ?
                                <div className="bg-blue-700 hover:bg-blue-700 p-2 rounded cursor-pointer">
                                    {gameBetDetails.option1}
                                </div>
                                :
                                <div onClick={() => {
                                    onClickSetSelectedIndex(1);
                                }} className="bg-blue-900 hover:bg-blue-700 p-2 rounded cursor-pointer">
                                    {gameBetDetails.option1}
                                </div>
                        }
                    </div>
                    <div className="flex justify-end items-center gap-4 h-10 px-10 pb-2">
                        <div className="flex gap-1">
                            <div className="flex text-white items-center">
                                amount:
                            </div>
                            <input value={amount} onChange={onChangeAmount} type="number" step="0.1" min="1" className=" border-gray-500 border rounded-lg p-2 mt-4 mb-5 text-sm w-16 h-10 bg-gray-900 text-white w-12" />
                            <div className="flex text-white items-center">
                                $
                            </div>
                        </div>
                        <button onClick={onSubmit} type="button" className="p-2 w-44 h-10 bg-gradient2 rounded cursor-pointer font-bold">
                            <span className="inline-block mr-2"> Place Bet</span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 inline-block">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </button>
                    </div>
                    {errorMsg.length > 0 ? <div className="px-6 py-2 bg-red-500 text-white font-bold rounded">
                        {errorMsg}
                    </div> : <></>}
                    

                </div>
            ) :
                <div className="flex flex-col py-10 justify-between gap-12">
                    <div class="flex border-t-transparent border-solid animate-spin rounded-full border-blue-700 border-8 h-16 w-16 m-auto"></div>
                    <div className="p-2 bg-blue-700 font-bold self-end m-auto">
                        Waiting for next round to start the bet
                    </div>
                </div>
            }
            {succeddMsg.length > 0 ? <div className="px-6 py-2 bg-green-500 font-bold rounded">
                        {succeddMsg}
                    </div> : <></>}
        </div>

    );
}