import { useEffect, useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch , faHouse, faPlus, faCheck, faBookmark} from '@fortawesome/free-solid-svg-icons';
import { Search } from "../../api";
import { Link } from 'react-router-dom';

function InputBox(props){
    const [search, setSearch] = useState([]);
    const [searchItem, setItem] = useState("");
    const [status, setStatus] = useState("");
    const [showStatus, setShowStatus] = useState(false);
    
    

    useEffect(()=>{
            let timeOut = null;
            timeOut = setTimeout(async ()=>{
                if (searchItem.trim() !== "") {
                    const searched = await Search(searchItem);
                    setSearch(searched.slice(0,5));
                }
                     },300)
            
            
            return () =>{
                clearTimeout(timeOut);
                
            };
    }
        ,[searchItem])

        useEffect(()=>{
            if(!status) return;
            const updated = { id: props.id, type1: props.type, status1: status };
              let existing = [];
            try {
                const parsed = JSON.parse(localStorage.getItem("watchlist"));
                if (Array.isArray(parsed)) {
                    existing = parsed;
                }
            } catch {
            }
              const index = existing.findIndex(item => item.id === props.id);
                if (index !== -1) {
                if(status == "Remove"){
                 existing = existing.filter(item => !(item.id === props.id && item.type === props.type));
                setStatus("");
                    }
                else{
                    existing[index].status1 = status;
                }

                } else {    
                existing.push(updated);
                }
             localStorage.setItem("watchlist", JSON.stringify(existing));
        },[status])

        useEffect(() => {
        try {
            const parsed = JSON.parse(localStorage.getItem("watchlist"));
            if (Array.isArray(parsed)) {
                 const found = parsed.find(item => item.id === props.id);
             if (found) {
                setStatus(found.status1);
                }
             else{
                 setStatus("");
                }
             }
            } catch {}
        }, [props.id]);



    return(
        <>
        <div className="absolute z-50 top-2 left-50 lg:left-100">
            <div className="flex items-center gap-5 lg:gap-2">
                <div className="bg-[rgba(255,255,255,0.1)] backdrop-blur-md rounded-[60%] p-1 ">
                    <Link to={'/'}><FontAwesomeIcon icon={faHouse} className="text-[#d2cece] text-[70px] lg:text-2xl cursor-pointer m-2 " /> </Link>
                </div>
                <div className="w-200 lg:w-[35vw] h-30 lg:h-15  flex items-center justify-center  rounded-4xl bg-[rgba(255,255,255,0.1)] backdrop-blur-md  ">
                    <FontAwesomeIcon icon={faSearch} className="text-[#d2cece] text-[70px] lg:text-2xl cursor-pointer m-2" />
                    <input type="text" value={searchItem} className="pl-2 h-[80%] w-[90%] rounded-4xl outline-0  border-1 border-[#ffffff89] focus:border-white lg:text-base text-[50px]" onChange={(e)=>setItem(e.target.value)} />
                </div>
                
                <div className="relative">
                    <div className="bg-[rgba(255,255,255,0.1)] backdrop-blur-md rounded-[60%] p-1" onClick={()=>setShowStatus(!showStatus)}>
                        { status !== "" ?
                            <FontAwesomeIcon icon={faCheck} className="text-[#d2cece] text-[70px] lg:text-2xl cursor-pointer m-2 "  /> :
                            <FontAwesomeIcon icon={faPlus} className="text-[#d2cece] text-[70px] lg:text-2xl cursor-pointer m-2 " />
                        }           
                    </div>
                    { showStatus &&
                        <div className="absolute mt-2  h-auto lg:w-[10vw] flex flex-col gap-2 left-0 bg-[rgba(255,255,255,0.1)] backdrop-blur-md text-[15px] rounded-4xl lg:rounded-2xl list-none ">
                            <li className="text-green-600 text-[50px] lg:text-base mt-1 cursor-pointer ml-2 transition-transform duration-200 ease-in-out hover:scale-110" onClick={(e)=>{setStatus(e.target.innerText); setShowStatus(false)}}>Completed</li>
                            <li className="text-blue-600 text-[50px] lg:text-base cursor-pointer ml-2 transition-transform duration-200 ease-in-out hover:scale-110" onClick={(e)=>{setStatus(e.target.innerText); setShowStatus(false)}}>Watching</li>
                            <li className="text-purple-600 text-[50px] lg:text-base cursor-pointer ml-2 transition-transform duration-200 ease-in-out hover:scale-110" onClick={(e)=>{setStatus(e.target.innerText); setShowStatus(false)}}>Plan-to-Watch</li>
                            <li className="text-red-600 text-[50px] lg:text-base cursor-pointer ml-2 transition-transform duration-200 ease-in-out hover:scale-110" onClick={(e)=>{setStatus(e.target.innerText); setShowStatus(false)}}>Dropped</li>
                            <li className="text-yellow-600 mb-1 text-[50px] lg:text-base cursor-pointer transition-transform duration-200 ease-in-out ml-2 hover:scale-110" onClick={(e)=>{setStatus(e.target.innerText); setShowStatus(false)}}>On-pause</li>
                        </div>
                    }
                </div>
                <Link to='/watchlist' ><div className="bg-[rgba(255,255,255,0.1)] backdrop-blur-md rounded-[60%] p-1" ><FontAwesomeIcon icon={faBookmark} className="text-[#d2cece] text-[70px] lg:text-2xl cursor-pointer m-2 " /></div></Link>
            </div>
        {searchItem !== ""  && 
            <div className="h-auto ml-25 w-[250vw] lg:w-[30vw] bg-[rgba(255,255,255,0.1)] backdrop-blur-md mt-1  rounded-2xl flex flex-col">
                    
                { search.map((e)=>
                    <Link to={`/${e.realmediatype}/${e.id}`} onClick={()=>setItem("")} key={e.id} >
                       <div className="text-[50px] h-[30vh] w-[280vw] lg:text-[14px] my-2 ml-5 lg:h-auto lg:w-auto rounded-2xl flex gap-2 items-center cursor-pointer transition-transform duration-300 ease-in-out hover:scale-110" >
                            <div className="h-[20vh] w-[150px] lg:h-[50px] lg:w-[45px]">
                                <img loading="lazy" src={`https://image.tmdb.org/t/p/w92${e.poster_path}`} alt={e.name || e.title} className=" object-fill h-full w-full rounded-[3px]" />
                            </div>
                            <p className="m-2">{e.name || e.title}</p>
                        </div>
                    </Link>)
                 }
                    
            </div>
        }       
        </div>
        </>
    )
}

export default InputBox;