import dolar from "./dolar.webp";

export default function Header({jwtbet}){
    return <div className="w-full flex justify-between">
        <div className="text-xl text-white font-bold">RapidBet</div>
        <div className="text-xl text-white font-bold  flex gap-1"><div>0</div> <img className="w-6 h-6 mt-1" src={dolar}></img></div>
    </div>
}