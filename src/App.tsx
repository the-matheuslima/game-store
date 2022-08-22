import { BrowserRouter as Router, Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import Navigation from './components/navigation';
import Catalog from './pages/catolog'
import Home from './pages/home'
import Search from './pages/search'
import './App.scss'
import MoreInfo from './pages/more-info';
import SideBar from './components/side-bar';
import Favorite from './pages/favorito';
import Authentication from './pages/authentication';
import { useSelector } from 'react-redux';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { reloginUser } from './store/auth/auth';
import { AppDispatch, RootState } from './store/store';
import { onAuthStateChangedListener } from './service/firebase/firebase';

function App() {
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        const unsubscribe = onAuthStateChangedListener((user: any) => {
            if (user) {
                dispatch(reloginUser(user.uid))
            }
            return
        })
    }, [])

    const RoutePrivate = ({ children }) => {
        const authenticated = useSelector((state: RootState) => state.auth.user);

        if (authenticated.isLogged) {
            return <Navigate to="/" />
        }

        return children
    }

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
                        <Route path='/auth' element={<RoutePrivate><Authentication /></RoutePrivate>} />
                    </Routes>
                </div>
            </div>
        </Router>
    )
}

export default App
