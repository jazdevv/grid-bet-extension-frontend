import { useEffect, useState } from "react";
import Header from "./Header";
import SelectGame from "./SelectGame";
import axios from "axios";
import SockJsClient from 'react-stomp';

export default function App({jwtbet}){
    const [selectedGame,setSelectedGame] = useState(undefined);
    const [selectedGameName,SetSelectedGameName] = useState("");
    const [credits,setCredits] = useState(0);

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

    function receivedNewBetGame(gameBetId,option0,option1,round){

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
                receivedNewBetGame(msg.gameBetId,msg.option0,msg.option1,msg.round)
            }}
            />
        <Header jwtbet={jwtbet} credits={credits}/>
        {selectedGame ? <div>selected game id is{selectedGame} with name{selectedGameName}</div> : <SelectGame setSelectedGame={setSelectedGame} SetSelectedGameName={SetSelectedGameName}/>}
    </div>
}