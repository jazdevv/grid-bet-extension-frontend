import axios from "axios";
import { useEffect, useState } from "react"

export default function MyBets({jwtbet}){
    const [bets,setBets] = useState([]);

    async function getBets () {
        const data = await axios({
            method:"GET",
            url:"http://127.0.0.1:8080/bets/mybets",
            params:{
                jwtBet:jwtbet
            }
        })
        setBets(data.data);
    }
    useEffect(()=>{
        getBets();
    },[])

    const renderedBets = bets.map((bet)=>{
        return <div className="userbet flex flex-col gap-2">
            <div className="text-lg font-bold text-white">
                {bet.team1name} - {bet.team2name}
            </div>
            <div className="flex gap-2">
                <div className="bg-btn">
                    {
                        bet.chosenOption == 0
                        ?
                        <div className="text-white font-bold">
                            {bet.team1name}
                        </div>
                        :
                        <div className="text-white font-bold">
                            {bet.team2name}
                        </div>
                    }
                </div>
                {
                bet.winner != null 
                ? 
                <>
                    {
                        bet.winner == bet.chosenOption 
                        ? 
                        <div className="bg-btn text-green-500 font-bold">
                            {bet.odd}
                        </div> 
                        : 
                        <div className="bg-btn text-red-500 font-bold">
                            {bet.odd}
                        </div>
                    }
                </> 
                : 
                <></>
                }
                {
                bet.winner != null 
                ? 
                <>
                    {
                        bet.winner == bet.chosenOption 
                        ? 
                        <div className="nobg-btn text-green-500 font-bold">
                            {bet.amount}
                        </div> 
                        : 
                        <div className="nobg-btn text-red-500 font-bold">
                            {bet.amount}
                        </div>
                    }
                </> 
                : 
                <div>
                    {bet.amount}
                </div>
                }
            </div>
        </div>
    })
    console.log("bets",bets);
    return <div className="mt-4 flex flex-col gap-2">
        {renderedBets}
    </div>
}