import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Navigation from './components/navigation';
import Catalog from './pages/catolog'
import Home from './pages/home'
import Search from './pages/search'
import './App.scss'
import MoreInfo from './pages/more-info';
import NavBarLeft from './components/navbar-left';
import Favorito from './pages/favorito';

function App() {
    return (
        <Router>
            <div className='flex-view'>
                <NavBarLeft />
                <div className='flex-routes'>
                    <Navigation />
                    <Routes>
                        <Route path='/' element={<Home />} />
                        <Route path='/catalog' element={<Catalog />} />
                        <Route path='/catalog/:id/' element={<MoreInfo />} />
                        <Route path='search/:id' element={<Search />} />
                        <Route path='/myLibrary' element={<Favorito />} />
                    </Routes>
                </div>
            </div>
        </Router>
    )
}

export default App
