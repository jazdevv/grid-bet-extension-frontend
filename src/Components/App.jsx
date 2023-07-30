import { useEffect, useState } from "react";
import Header from "./Header";
import SelectGame from "./SelectGame";
import axios from "axios";

export default function App({jwtbet}){
    const [selectedGame,setSelectedGame] = useState(undefined);
    const [credits,setCredits] = useState(0);

    async function SetCredits () {
        const data = await axios({
            method:"GET",
            url:"http://127.0.0.1:8080/auth/mycredit",
            params:{
                jwtbet: jwtbet
            }
        })
        console.log(data)
        setCredits(data.data);
    }
    useEffect(()=>{
        SetCredits();
    },[])

    return <div className="w-full flex flex-col gap-2">
        <Header jwtbet={jwtbet} credits={credits}/>
        {selectedGame ? <div>selected game is{selectedGame}</div> : <SelectGame setSelectedGame={setSelectedGame}/>}
    </div>
}