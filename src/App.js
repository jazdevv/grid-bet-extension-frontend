import Cookies from 'js-cookie';
import Login from './Components/Login';
import { useState } from 'react';

function App() {
  const [jwtCookie,setJwtCookie] = useState(undefined);
  const jwtcookie = localStorage.getItem("jwtbet");
  if(jwtCookie != undefined && !jwtcookie){
    setJwtCookie(jwtcookie);
  }
  console.log("jwtcookie",jwtCookie);
  return (
    <div className="p-4 w-80 h-96 bg-gray-900">
      {jwtcookie ? <div className='text-white'>Logged</div> : <Login setJwtCookie={setJwtCookie}/>}
    </div>  
  );
}

export default App;
