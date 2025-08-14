import { faHome }  from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState, useEffect } from 'react';
import { Card } from './Wishcard';
import { GetSpecific } from '../../api';
import  { Link } from 'react-router-dom'

function Wishlist(){

    const [watchlist, setWatchlist] = useState([]);
    const [watchlist1, setWatchlist1] = useState([]);
    
    useEffect( ()=>{
         let timeoutid;
         function getdata() {
            timeoutid = setTimeout(async ()=>{
            const list = JSON.parse(localStorage.getItem('watchlist')) || [];
            setWatchlist1(list);
            if(!list.length) return
            const favlist = await Promise.all(list.map(async(i)=> {const data = await GetSpecific(i.id, i.type1); return { ...i, ...data }; }));
            setWatchlist(favlist);
            
            }
        ,300)
        }
        getdata();
        return ()=>clearTimeout(timeoutid);
    }, [])

    const handleStatusChange = (id,newStatus) => {

    const updatedList = watchlist1.map(w => 
        w.id.toString() === id.toString()  ? { ...w, status1: newStatus } : w);

    setWatchlist1(updatedList); 
    localStorage.setItem("watchlist", JSON.stringify(updatedList));

    setWatchlist(prev =>
    prev.map(item =>
      item.id.toString()  === id.toString() ? { ...item, status1: newStatus } : item
    ))
    };

    const handleRemove = id => {
        const updatedRaw = watchlist1.filter(item => item.id.toString() !== id.toString());
        localStorage.setItem('watchlist', JSON.stringify(updatedRaw));
        setWatchlist1(updatedRaw);
        setWatchlist(prev => prev.filter(item => item.id.toString() !== id.toString()));
    };
    
    return(
        
        <>
        <nav className='bg-black h-[10vh] flex items-center gap-4'>
            <h1 className='text-3xl font-bold ml-4'>binge.</h1>
            <Link to='/'>
            <div className='bg-[#323232] p-2 rounded-[50%] cursor-pointer'>
                <FontAwesomeIcon icon={faHome} className='text-[#d2cece]  text-2xl' />
            </div>
            </Link>
        </nav>
        <main className="bg-[#0e0e0e] p-4 ml-[6vw] m-4 h-auto w-[90%] rounded-2xl">
            {
                watchlist.length ===0? 
                <div className='h-[100%] w-[100%] flex justify-center items-center'>NOTHING TO SHOW HERE</div>:
                watchlist.map((item)=>  <Card key={item.id} item={item}   handleStatusChange={handleStatusChange} handleRemove={handleRemove}/>)
            }
        </main>
        </>
    )

}

export default Wishlist;