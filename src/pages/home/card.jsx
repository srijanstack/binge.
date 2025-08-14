import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';


function Card({item}){

    const realItem = item.media_type == 'TV Show'? item.name : item.title; 

    return(<>
        <Link to={`/${item.realmediatype}/${item.id}`} className="w-[50%] md:w-[180px] lg:w-[240px] ">
        <div  className=" h-[250px] bg-[#2c2c2c] rounded-2xl  flex flex-col  p-4 box-border m-3 mx-[10px] cursor-pointer transition-transform duration-300 ease-in-out hover:scale-110 md:h-[270px] md:ml-3 lg:h-[320px]  lg:ml-3">
            <div className="w-[100%] aspect-[2/3] overflow-hidden rounded-lg ">
                <img src ={`https://image.tmdb.org/t/p/w500${item.poster_path}`}  alt={realItem} className='w-full h-full object-fill' />
            </div>

            <div className="h-[auto]w-[100%] flex flex-col my-2">
                    <h1 className={`${realItem.length > 30? "text-xs" : realItem.length > 20 ? "text-xs md:text-sm'" : "text-base"} font-bold`}>{realItem}</h1>
                <div className={`px-4 mt-0.5 flex justify-between ${item.media_type == 'TV Show' ? 'text-[10px] md:text-sm' : 'text-xs md:text-sm' }`}>
                    <p>{`${item.media_type}`}</p>
                    <p ><FontAwesomeIcon className='text-[#facc15]' icon={faStar} />{`${" " + item.vote_average.toFixed(1)}/10`}</p>
                </div>
            </div>

        </div>
        </Link>
        </>
    )
}

export default Card;
