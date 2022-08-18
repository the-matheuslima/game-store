import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Navigation from './components/navigation';
import Catalog from './pages/catolog'
import Home from './pages/home'
import Search from './pages/search'
import './App.scss'
import MoreInfo from './pages/more-info';
import SideBar from './components/side-bar';
import Favorite from './pages/favorito';
import Authentication from './pages/authentication';

function App() {
    return (
        <Router>
            <div className='flex-view'>
                <SideBar />
                <div className='flex-routes'>
                    <Navigation />
                    <Routes>
                        <Route path='/' element={<Home />} />
                        <Route path='/catalog' element={<Catalog />} />
                        <Route path='/catalog/:id/' element={<MoreInfo />} />
                        <Route path='/search' element={<Search />} />
                        <Route path='/favorites' element={<Favorite />} />
                        <Route path='/auth' element={<Authentication />} />
                    </Routes>
                </div>
            </div>
        </Router>
    )
}

export default App
