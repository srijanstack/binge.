import Card from './card.jsx';

export  function Display({display}){



    return(
            <div className= {`container min-h-[80%] w-[97%] bg-gradient-to-br from-[#0d0d0d] to-[#343434] mt-3 flex flex-wrap felx-row p-3 rounded-3xl `}>
                {   

                   display.length ===0? <div className='h-[100%] w-[100%] flex justify-center items-center'>NOTHING TO SHOW HERE</div>:display.map((item)=>  <Card key={item.id} item={item}/>)
                }
            </div>
                )
    
}