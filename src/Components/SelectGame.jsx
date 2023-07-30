import axios from "axios";
import { useEffect, useState } from "react";
import csgoimg from './csgo.jpg';
export default function SelectGame({setSelectedGame}){
    const [games,setGames] = useState([]);

    async function getGames(){
        const data = await axios({
            method:"GET",
            url:"http://127.0.0.1:8080/bets/getgames",
        })
        setGames([...data.data]);
    }
    useEffect(()=>{
        getGames();
    },[]);
    const renderedGames = games.map(el=>{
        return (
            <div className="p-2 border-2 border-gray-800 mt-2 mr-2">
                <div>
                    <img src={csgoimg}/>
                </div>
                <div className="flex justify-between text-white font-bold p-2">
                    <div className="p-2 text-gray-400">
                        {el.name}
                    </div>
                    <div onClick={()=>{setSelectedGame(el.id)}} className="p-2 bg-gradient rounded cursor-pointer">
                        Bet
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 inline-block">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </div>
                </div>
            </div>
        )
    })
    return <div>
        <div className="text-md font-bold text-gray-400">
            Select game to start betting
        </div>
        <div className="overflow-y-scroll scrollbar h-72">
            {renderedGames}
            <div className="p-2 border-2 border-gray-800 mt-2 mr-2">
            
                <div className="flex justify-between text-white font-bold p-2">
                    <div className="p-2 text-sm text-gray-400">
                        more games may start soon ...
                    </div>
                </div>
            </div>
        </div>
    </div>
}