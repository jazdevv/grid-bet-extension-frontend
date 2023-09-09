import Cookies from 'js-cookie';
import Login from './Components/Login';
import { useState } from 'react';
import App from "./Components/App"
function Main() {
  const [firstRender,setFirstRender] = useState(true);
  const [jwtBet,setJwtBet] = useState(undefined);
  const jwtbetLocal = localStorage.getItem("jwtbet");
  if(jwtBet == undefined && firstRender == true){
    setJwtBet(jwtbetLocal);
    setFirstRender(false);
  }
  console.log("jwtbet",jwtBet);
  return (
    <div className="p-4 w-96 custom-min-h-96 bg-gray-900">
      {jwtBet ? <App jwtbet={jwtBet} /> : <Login setJwtBet={setJwtBet}/>}
    </div>  
  );
}

export default Main;
