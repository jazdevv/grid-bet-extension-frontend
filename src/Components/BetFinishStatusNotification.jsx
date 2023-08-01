export default function BetFinishStatusNotification({ status,setNotificationStatus,setSucceddMsg }) {
    return <>{status.win == true ? <div className="absolute bg-verde z-10 w-full h-85 font-bold flex flex-col gap-2 ">
        <div className="bg-gray-700 text-white text-md px-4 py-4">
            {status.title}
        </div>
        <div className="text-white">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="m-auto mt-4 w-20 h-16">
                <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 002.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 012.916.52 6.003 6.003 0 01-5.395 4.972m0 0a6.726 6.726 0 01-2.749 1.35m0 0a6.772 6.772 0 01-3.044 0" />
            </svg>
        </div>
        <div className="text-3xl mx-auto text-white h-8">
            WINNER
        </div>
        <div className="text-3xl mx-auto text-white h-8">
            {status.betAmount * status.odds}$
        </div>
        <div className="text-md mx-auto text-white h-8">
            Betted {status.betAmount}$ odds: {status.odds}
        </div>
        <div onClick={()=>{setSucceddMsg("");setNotificationStatus({...status,open:false})}} className="text-3xl bg-gray-800 mx-auto text-white py-2 px-6 mb-4 rounded cursor-pointer">
            OK
        </div>

    </div> :
        <div className="absolute bg-red-400 z-10 w-full h-85 font-bold flex flex-col gap-2 ">
            <div className="bg-gray-700 text-white text-md px-4 py-4">
                Team Vitality vs Natus Vincere round 10
            </div>
            <div className="text-white">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="m-auto mt-4 w-20 h-16">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                </svg>
            </div>
            <div className="text-3xl mx-auto text-white h-8">
                GOOD LUCK NEXT
            </div>
            <div className="text-md mx-auto text-white h-8">
                Betted {status.betAmount}$ odds: {status.odds}
            </div>
            <div onClick={()=>{setSucceddMsg("");setNotificationStatus({...status,open:false})}} className="text-3xl bg-gray-800 mx-auto text-white py-2 px-6 mb-4 rounded cursor-pointer">
                OK
            </div>

        </div>}
    </>
}
//hola papi soy natjaz programando jeje te quiero y tambien quiero nuggets para senar grachiaas te quiero  papiiiiiiii   UUUUUUUUUUUUUUU