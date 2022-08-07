import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Navigation from './components/navigation';
import Catalog from './pages/catolog'
import Home from './pages/home'
import Search from './pages/search'
import './App.css'
import MoreInfo from './pages/more-info';
import NavBarLeft from './components/navbar-left';

function App() {
  return (
    <Router>
      <div className='as'>
        <NavBarLeft />
        <div className='abb'>
          <Navigation />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/catalog' element={<Catalog />} />
            {/* <Route path='catalog/:id?' /> */}
            <Route path='/catalog/:id/' element={<MoreInfo />} />
            <Route path='search/:id' element={<Search />} />
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App
