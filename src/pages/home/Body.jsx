import {useState, useEffect} from 'react';
import {Display} from './Display.jsx';
import { Search, PopItems, LatDATA, GetPopTV, GetPopMovie, GetLatMovie, GetLatTV, Trending} from '../../api.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faBars, faXmark, faBookmark} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';



function Body() {
     
        const [searchItem, setSearch] = useState("");
        const [popData, setData] = useState([]);
        const [popLat, setPopLat] = useState("Popular");
        const [latData, setLatData] = useState([]);
        const [toShow, setToShow ] = useState([]);
        const [latMovie, setLatMovie] = useState([]);
        const [latTv, setLatTV ] = useState([]);
        const [popMovie, setPopMovie ] = useState([]);
        const [popTv, setPopTv ] = useState([]);
        const [movieTV, setMovieTV] = useState("");
        const [trending, setTrending] = useState([]);
        const [menuOpen, setMenuOpen] = useState(false);

           function getFiltered(items){
            return items.filter(item => item.vote_average >= 1 && item.poster_path).slice(0,30);
           }

        useEffect(()=>
            {   
                if(searchItem !== "")return;
                let timeOut = null;
                function getdata(){
                    timeOut = setTimeout(async ()=>{
                    const popdata = await PopItems();
                    const laTdata = await LatDATA();
                    const latmovie = await GetLatMovie();
                    const  lattv = await GetLatTV();
                    const poomovie = await GetPopMovie();
                    const poptv = await GetPopTV();
                    const trend = await Trending();
                    setPopTv(getFiltered(poptv));
                    setPopMovie(getFiltered(poomovie));
                    setLatTV(getFiltered(lattv));
                    setLatMovie(getFiltered(latmovie));
                    setLatData(getFiltered(laTdata));
                    setData(getFiltered(popdata));
                    setTrending(getFiltered(trend));
                    setToShow(getFiltered(popdata));
                    

                            },300);
                    }
                    getdata();
                return ()=> clearTimeout(timeOut);
                }
            ,[])
    
    
    
    
        useEffect(()=>{
            
                if(searchItem.trim() == ""){
                    setToShow(popData);
                    return;
                }
      
                let timeOut = null;
                timeOut = setTimeout(async ()=>{
                const searched = await Search(searchItem);
                setToShow(getFiltered(searched));
                     },200)
            
            return () =>{
                clearTimeout(timeOut);
                
            };
    
        },[searchItem])
        


        useEffect(()=>{
            let timeoutid = null;
            timeoutid = setTimeout( ()=>{

            if(movieTV === 'Movie'){
                if(popLat === "Popular"){
                    setToShow(popMovie);
                }
                else if(popLat ==="Latest"){
                    setToShow(latMovie);
                }
           
            }
            else if(movieTV === 'TV'){
                  if(popLat === "Popular"){
                    setToShow(popTv);
                }
                else if(popLat ==="Latest"){
                    setToShow(latTv);
                }

            }
            else if(movieTV === 'Trend'){
                setToShow(trending);
            }
            else if(movieTV === ''){
                     if(popLat === "Popular"){
                    setToShow(popData);
                }
                else if(popLat ==="Latest"){
                    setToShow(latData);
                }
            }
               
        }      
                ,300)
                return ()=>  clearTimeout(timeoutid);
        }   
        ,[popLat,movieTV] )

        

    return(<>
        { /*navbar*/}
        <div className='lg:fixed top-0 left-0 w-full z-50'>
       <nav className="h-[10vh] w-full bg-[#0f0f0f] flex items-center justify-between px-[20px] md:px-8 py-2 " >
            <span className=" font-bold text-3xl ">binge.</span>
            <div className='flex gap-2 items-center'>
                <div className="h-[7vh] bg-[#2c2c2c] flex items-center w-[40vw] gap-2 rounded-4xl  mt-2 md:h-[5vh] md:mt-0 md:w-[35vw] lg:h-[7vh]">
                    <FontAwesomeIcon icon={faSearch} className="text-[#d2cece] text-2xl cursor-pointer m-2 md:text-3xl lg:text-2xl" />
                    <input type="text" value={searchItem}   onChange={(e) => setSearch(e.target.value)} placeholder='Discover' className="h-[5vh] w-[90%]  shadow-none border-none outline-none bg-transparent p-2"/>
                    {searchItem !== "" && (<FontAwesomeIcon  icon={faXmark} className="text-[#d2cece] text-2xl cursor-pointer mx-3" onClick={() => setSearch("")}  />)}
                </div>
                <Link to='/watchlist'>
                <div className='bg-[#2e2e2e] p-3 md:p-2 rounded-[50%] cursor-pointer'>
                    <FontAwesomeIcon icon={faBookmark} className='text-[#d2cece] text-2xl md:p-2  md:text-3xl lg:text-2xl lg:p-1' />
                </div>
                </Link>
            </div> 
            <div></div>
       </nav>
       </div>
        
        { /*main*/}
        <main className="h-[auto] w-[full] lg:my-20 my-3 flex flex-col items-center ">
                <div className=' text-bold  h-[8vh] w-[97%] rounded-3xl  bg-gradient-to-r from-[#1e1b4b] via-[#4b0082] to-[#a020f0] px-5  flex items-center gap-2 justify-between'>
                         <select className="w-[30vw] h-[5vh] text-xl text-bold rounded-md outline-0 md:w-[17vw] md:text-3xl lg:text-2xl lg:w-[8vw]"  name="Select" value={popLat} onChange={(e)=>setPopLat(e.target.value)} >
                            <option value="Popular" className='bg-white'>Popular</option>
                            <option value="Latest">Latest</option>
                        </select>
                        
                              <div className="md:hidden">
                                <FontAwesomeIcon icon={menuOpen ? faXmark : faBars}onClick={() => setMenuOpen(!menuOpen)} className="text-2xl cursor-pointer" />

                                </div>
                        <ul className=" text-[#d2cece] hidden gap-10 md:flex md:text-2xl lg:text-base">
                            <li className= "cursor-pointer hover:text-white"onClick={()=>setMovieTV('Trend')}>Trending</li>
                            <li className= "cursor-pointer hover:text-white"onClick={()=>setMovieTV('Movie')}>Movies</li>
                            <li className = "cursor-pointer hover:text-white"onClick={()=>setMovieTV('TV')}>Tv Shows</li>
                        </ul>
                            {menuOpen &&(
                                <ul className="absolute top-[60px] left-0 w-full bg-[#474444] text-white flex flex-col gap-5 p-4 md:hidden z-50 rounded-b-xl">
                                    <li className="cursor-pointer" onClick={() => { setMovieTV('Trend'); setMenuOpen(false); }}>Trending</li>
                                    <li className="cursor-pointer" onClick={() => { setMovieTV('Movie'); setMenuOpen(false); }}>Movies</li>
                                    <li className="cursor-pointer" onClick={() => { setMovieTV('TV'); setMenuOpen(false); }}>TV Shows</li>
                                </ul>
                            )}
            
                </div>
                <Display display = {toShow} />   

         </main>
        </>
    );
}

export default Body;