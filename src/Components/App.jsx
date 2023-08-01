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
    const [notificationStatus,setNotificationStatus] = useState({
        title: "",
        open: false,
        win: true,
        betAmount: 0,
        odds: 0,
        gameBetId: 0,
        selectedIndex:null
    });
    const [gameBetDetails,setGameBetDetails] = useState({
        gameBetId: 0,
        gameId: 0,
        option0: "",
        option1: "",
        round: 0
    });

    console.log("jergjerjger",notificationStatus)

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

    function receiveBetWin(betResults){
        let oddValue;
        let win = false;
        console.log(betResults.gameBetId==notificationStatus.gameBetId)
        console.log(betResults.gameBetId,notificationStatus.gameBetId)

        //if is the same bet than the client
        if(betResults.gameBetId==notificationStatus.gameBetId){
            //NaN when teamWinnerAmount was 0 so no winner got prize
            if(betResults.odd=="NaN"){
                oddValue = 1.0;
            }else{
                oddValue = betResults.odd;
            }
            //check if is winner
            if(betResults.winnerOptionIndex == notificationStatus.selectedIndex){
                win = true;
            }        
            
            setNotificationStatus({...notificationStatus,open:true,win:win,odds:oddValue})
        }
        
    }
    
    return <div className="w-full custom-min-h-96 flex flex-col gap-2">
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
            <SockJsClient url='http://localhost:8080/ws/'
            topics={['/topic/betsWins']}
            onConnect={() => {
                console.log("connected bets wins");
            }}
            onDisconnect={() => {
                console.log("Disconnected");
            }}
            onMessage={(msg) => {
                receiveBetWin(msg);
            }}
            />
        <Header jwtbet={jwtbet} credits={credits}/>
        {selectedGame ? <GameBet 
            SetCredits={SetCredits} 
            gameBetDetails={gameBetDetails} 
            creditsAmount={credits}
            notificationStatus={notificationStatus}
            setNotificationStatus={setNotificationStatus}/> : <SelectGame setSelectedGame={setSelectedGame} SetSelectedGameName={SetSelectedGameName}/>}
    </div>
}