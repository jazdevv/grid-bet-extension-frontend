import { useEffect, useState } from "react";
import Header from "./Header";
import SelectGame from "./SelectGame";
import axios from "axios";
import SockJsClient from 'react-stomp';
import GameBet from "./GameBet";

export default function App({jwtbet}){
    const [selectedGame,setSelectedGame] = useState(undefined);
    const [selectedGameName,SetSelectedGameName] = useState("");
    const [credits,setCredits] = useState(0);
    const [gameBetDetails,setGameBetDetails] = useState({
        gameBetId: 0,
        gameId: 0,
        option0: "",
        option1: "",
        round: 0
    });

    async function SetCredits () {
        const data = await axios({
            method:"GET",
            url:"http://127.0.0.1:8080/auth/mycredit",
            params:{
                jwtbet: jwtbet
            }
        })
        setCredits(data.data);
    }
    useEffect(()=>{
        SetCredits();
    },[])

    function receivedNewBetGame(gameBet){
        if(gameBet.gameId != selectedGame){
            return;
        }
        setGameBetDetails({...gameBet});
        console.log(gameBet)
    }
    
    return <div className="w-full flex flex-col gap-2">
        <SockJsClient url='http://localhost:8080/ws/'
            topics={['/topic/bets']}
            onConnect={() => {
                console.log("connected");
            }}
            onDisconnect={() => {
                console.log("Disconnected");
            }}
            onMessage={(msg) => {
                receivedNewBetGame(msg);
            }}
            />
        <Header jwtbet={jwtbet} credits={credits}/>
        {selectedGame ? <GameBet gameBetDetails={gameBetDetails} creditsAmount={credits}/> : <SelectGame setSelectedGame={setSelectedGame} SetSelectedGameName={SetSelectedGameName}/>}
    </div>
}