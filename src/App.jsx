import Body from './pages/home/Body.jsx'
import { ShowInfo } from './pages/showinfo/Showinfo.jsx'
import Wishlist from './pages/wishlist/block.jsx'
import {HashRouter as Router, Routes, Route, } from 'react-router-dom'


function App() {
    return(
        <Router>
            <Routes>
                <Route path='/' element={<Body/>}/>
                <Route path='/:type/:id' element={<ShowInfo/>}/> 
                <Route path='/watchlist' element={<Wishlist/>}/>             
            </Routes>
        </Router>
    )
}

export default App
