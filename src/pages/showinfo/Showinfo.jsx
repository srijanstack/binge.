import { GetSpecific, GetTrailer, GetCast, GetWheretowatch } from "../../api.js"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar} from '@fortawesome/free-solid-svg-icons';
import InputBox from "./Inputbox.jsx";

export function ShowInfo(){
    const { id, type } = useParams();
    const [item1, setItem ] = useState({});
    const [key, setKey] = useState("");
    const [cast, setCast] = useState({});
    const [note, setNote] = useState("");
    const [wTw, setwTw] = useState({});

    useEffect (()=>{
        let timeoutid;
        timeoutid = setTimeout(async()=>{
            const item = await GetSpecific(id,type);
            const trail1 = await GetTrailer(id,type);
            const cast1 = await GetCast(id,type);
            const wtw = await GetWheretowatch(id,type);
            setwTw(wtw);
            setCast(cast1);
            setItem(item);
            const trailerKey = await trail1.find((video) => video.site === "YouTube" && video.type === "Trailer")?.key;
            setKey(trailerKey);

              try {
                const watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
                const found = watchlist.find(item => item.id.toString() === id.toString());
                    if (found && found.note1) {
                    setNote(found.note1);
                } else {
                setNote("");
                }
                } catch {
                setNote("");
                }
                }
        
                ,300)
                return ()=> clearTimeout(timeoutid);
            },[id, type])

    function getFilterd(item){
        return item?.cast?.slice(0,12)
    }

    function getFilterd2(item){
        return item?.crew?.slice(0,11)
    }

    function handleNote(){
        const locList = JSON.parse(localStorage.getItem('watchlist'));
        const updated = locList.map(i=> i.id.toString() === id.toString()?{ ...i, note1: note} : i)
        localStorage.setItem('watchlist', JSON.stringify(updated));
       

    }


    return(<>
        <div className="h-[150vh] w-400 lg:w-[100vw] lg:h-[90vh] relative">
                
            <div className="h-[90%] w-full lg:w-[100vw] lg:h-[80vh] relative ">
                <img src={`https://image.tmdb.org/t/p/original${item1.backdrop_path}`} alt="" className=" absolute h-full w-full object-fill" />
                <div className="absolute inset-0 bg-[rgba(0,0,0,0.6)] z-10"></div>
                <InputBox id={id} type={type} />
            </div>
                 <div className="absolute rounded-2xl h-[60vh] w-[100vw] bottom-0 left-20 lg:left-25 z-20 lg:h-[45vh] lg:w-[17vw] bg-[#2c2c2c] p-3 lg:rounded-xl">
                    <img src={`https://image.tmdb.org/t/p/w500${item1.poster_path}`} alt="" className="h-full w-full object-fill rounded-2xl " />
                    <div className="absolute inset-0 bg-[rgba(0,0,0,0.2)] z-10 rounded-2xl"></div>
                    
                </div>
                    <div className="text-[50px] top-[120vh] absolute left-[130vw] w-[225vw] lg:top-120 lg:left-95 z-40 h-[auto] lg:w-[70vw] bg-[#2c2c2c] p-4 rounded-3xl lg:text-[14px]">
                        <h1 className="text-bold text-[70px] lg:text-[35px] ">{`${item1.title || item1.name}`}</h1>
                        <h3 className="text-[60px] lg:text-[20px]  mt-[7px] italic">{item1?.tagline !== "" ? `"${item1.tagline}"` : ""}</h3>
                        <p className="mt-[10px] lg:mt-[7px]">{`Release Date: ${item1.release_date || item1.first_air_date}`}</p>
                        <p className="mt-[10px] lg:mt-[7px]"><FontAwesomeIcon className='text-[#facc15]' icon={faStar} />{`${" " + item1?.vote_average?.toFixed(1)}/10`}</p>
                        <p className="mt-[10px] lg:mt-[7px] text-[#d4cdcdc4] font-[Helvetica]">{`"${item1?.overview?.slice(0,300)}"`}</p>
                        <p className="mt-[10px] lg:mt-[7px]">Genre: {item1.genres?.map((g)=>g.name).join(', ')}</p>
                        <p className="mt-[10px] lg:mt-[7px]">Available on: {wTw?.length>0 ? wTw.map((p)=>p.provider_name).join(", ") : "Not Available"}</p>
                        <p className="mt-[10px] lg:mt-[7px]">{item1.runtime?`Runtime: ${item1.runtime}min` : `Episodes: ${item1.number_of_episodes}` }</p>
                        <p className="mt-[10px] lg:mt-[7px]">Country of origin: {item1?.origin_country?.join(", ")}</p>
                        <p className="mt-[10px] lg:mt-[7px]">Production: {item1.production_companies?.map((p=>p.name)).join(', ')}</p>
                        <p className="mt-[10px] lg:mt-[7px]">{(item1?.revenue? `Revenue: $${item1.revenue.toLocaleString()}`: `Creators: ${item1?.created_by?.map((p) => p.name).join(', ')}`) || []}</p>
                        <p className="mt-[10px] lg:mt-[7px]">Languages: {item1.spoken_languages?.map(l=>(l.english_name +", " + l.name)).join(', ')}</p>

                    </div>
        </div>

        <div className="relative h-[40vh] w-[110vw] lg:h-[260px] lg:w-[300px] bg-gradient-to-r from-[#1e1b4b] via-[#4b0082] to-[#a020f0] mt-8 ml-10 rounded-3xl">
            <textarea  onChange={(e) => setNote(e.target.value)} value={note} name="" id="" className="resize-none overflow-hidden p-4 h-full w-full focus:ring-1 focus:ring-purple-300 focus:outline-0 rounded-3xl text-[50px] lg:text-base" placeholder="Leave a note" />
            <button className="absolute left-80 lg:left-60 bottom-1 cursor-pointer text-[50px] lg:text-base"  onClick={()=>handleNote()}>add</button>
        </div>

        <div className="relative flex  h-[190vh] lg:h-auto w-auto mt-10 ml-10 lg:mt-0 lg:ml-0">
            
            <div className="lg:absolute flex flex-col items-center max-h-[80%] lg:max-h-[100%] lg:w-[250px] w-[120vw] text-[#e4dfdfe1] bg-gradient-to-r from-[#1e1b4b] via-[#4b0082] to-[#a020f0] left-295 z-50 p-3 top-0  mt-3 rounded-3xl lg:rounded-2xl text-[40px] lg:text-base"> Cast & Crew: {getFilterd(cast)?.map((c,i)=><p key={i} className={ c.name.length > 15 ? 'text-[30px] lg:text-base': 'text-[40px] lg:text-base' }>{c.name}</p>) || []} {getFilterd2(cast)?.map((c,i)=><p key={i} className={ c.name.length > 12 ? 'text-[30px] lg:text-base': 'text-[40px] lg:text-base' }>{c.name}</p>) || []}</div>
            <div className="absolute h-[60vh] bottom-3 left-110 lg:static ml-20 mt-5 p-3 lg:w-[70vw] lg:h-[87vh] aspect-video bg-[#2c2c2c] rounded-2xl">
                <iframe className="h-full w-full  rounded-2xl border-0 " allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" src={`https://www.youtube.com/embed/${key}`} title={item1.title}></iframe>
            </div>
        </div>
        <div className="h-5 w-full"> </div>
        </>
        )
}