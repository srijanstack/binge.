import { faStar,faCaretDown }  from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  useState } from 'react';
import { Link } from 'react-router-dom';



export function Card({item,  handleStatusChange, handleRemove}){

    const realItem = item.type1 == 'tv'? "TV SHOW" : "MOVIE"; 

    const [showStatus, setShowStatus] = useState(false);
        
    const statusToClass = (status) => {
    switch ((status || "").toLowerCase()) {
    case "completed":    return "text-green-600 ";
    case "watching":     return "text-blue-600 ";
    case "plan-to-watch":return "text-purple-600";
    case "dropped":      return "text-red-600 ";
    case "on-pause":     return "text-yellow-600";
    default:             return "text-[#cbc1c1]";
    }
    };





    return(
        <>
            <div className="h-[15vh] md:h-[25vh] lg:h-[50vh] bg-[#1e1e1e] flex items-center gap-x-3 p-4 rounded-2xl mt-3">
                <div className="h-[100%] w-[40%] lg:w-[20%] rounded-2xl p-2 bg-[#161616] ">
                    <img src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}  alt={item.title || item.name} className='w-full h-full object-fill rounded-2xl'  />
                </div>
                
                <div className="w-[80%]  h-[100%] flex flex-col justify-center gap-y-1 bg-[#161616] rounded-2xl">
                    <div className="h-[30%] flex flex-col lg:gap-2 mt-3">
                        <h1 className="pl-3 text-[12px] md:text-[30px] lg:text-4xl">{item.title || item.name}</h1>
                        <Link to={`/${item.type1}/${item.id}`} className=' h-fit w-fit' ><div className="lg:py-1 lg:px-2 p-1 ml-2 rounded-2xl hover:bg-[#252424] w-fit cursor-pointer text-[#d3cccc] text-[12px] md:text-[20px] lg:text-base">Details</div></Link>
                    </div>
                    <div className="h-[50%]  mt-2 lg:mt-0  pl-3 ">
                        <p className='text-[10px] md:text-[20px] lg:text-base'><FontAwesomeIcon className='text-[#facc15]' icon={faStar} />{`${" " + item?.vote_average?.toFixed(1)}/10`}</p>
                        <p className='text-[10px] md:text-[20px] lg:text-base'>{realItem}</p>
                        <div className={` relative lg:mt-1 ${statusToClass(item.status1)} rounded-2xl hover:bg-[#252424] w-fit lg:p-1 cursor-pointer text-[12px] md:text-[25px] lg:text-base`} onClick={()=>setShowStatus(!showStatus)} >
                            <div>{item.status1} <FontAwesomeIcon className='text-[white]' icon={faCaretDown} /></div>
                            { showStatus &&
                            <div className='absolute mt-2 h-auto lg:w-[10vw] flex flex-col gap-2 left-0 bg-[rgba(255,255,255,0.1)] backdrop-blur-md text-[12px] md:text-[20px] lg:text-base rounded-2xl list-none'>
                                <li className="text-green-600 mt-1 cursor-pointer ml-2 transition-transform duration-200 ease-in-out hover:scale-110" onClick={(e)=>{handleStatusChange(item.id, "Completed"); setShowStatus(false)}}>Completed</li>
                                <li className="text-blue-600 cursor-pointer ml-2 transition-transform duration-200 ease-in-out hover:scale-110" onClick={(e)=>{handleStatusChange(item.id, "Watching"); setShowStatus(false)}}>Watching</li>
                                <li className="text-purple-600 cursor-pointer ml-2 transition-transform duration-200 ease-in-out hover:scale-110" onClick={(e)=>{handleStatusChange(item.id, "Plan-to-Watch"); setShowStatus(false)}}>Plan-to-Watch</li>
                                <li className="text-red-600 cursor-pointer ml-2 transition-transform duration-200 ease-in-out hover:scale-110" onClick={(e)=>{handleStatusChange(item.id, "Droppped"); setShowStatus(false)}}>Dropped</li>
                                <li className="text-yellow-600 mb-1 cursor-pointer transition-transform duration-200 ease-in-out ml-2 hover:scale-110" onClick={(e)=>{handleStatusChange(item.id, "On-pause"); setShowStatus(false)}}>On-pause</li>
                                <li className="text-[#cbc1c1] mb-1 cursor-pointer transition-transform duration-200 ease-in-out ml-2 hover:scale-110" onClick={(e)=>{handleRemove(item.id); setShowStatus(false)}}>Remove</li>
                            </div>
                                }   
                        </div>
                        <p className='mt-1 text-[14px] text-[#d4cdcdc4] font-[Helvetica] hidden md:hidden lg:block' >{item.note1 || ""}</p>
                    </div>
                </div>

            </div>
        </>
    )
}