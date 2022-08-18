import React, { useEffect } from 'react';
import { createSearchParams, Link, useNavigate, useSearchParams } from 'react-router-dom';

import { Games } from '../../types/games';
import { api } from '../../service/api/api';

import { GiMagnifyingGlass } from 'react-icons/gi'
import Logo from '../../assets/image/logo-tr.png'
import './style.scss'

export default function Navigation() {
    const [search, setSearch] = React.useState('');
    const [listSearch, setListSearch] = React.useState<Games[]>([]);
    const navigator = useNavigate()

    const [searchParams, setSearchParams] = useSearchParams();

    const handlerChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
    };

    const hanlderSearch = () => {
        setSearchParams({ q: search })
        navigator({
            pathname: '/search',
            search: createSearchParams({
                q: search
            }).toString(),
        })
    };

    useEffect(() => {
        if (search !== '') {
            const getGameSearch = async () => {
                const response = await api.getGamesBySearch(search);
                setListSearch(response.data.results)
            }
            getGameSearch()
        }
        return
    }, [search])

    return (
        <nav className='nav'>
            <div className='nav__logo'>
                <Link to='/'>
                    <img src={Logo} alt="" />
                </Link>
            </div>

            <div className='nav__input-box'>
                <input type="text" value={search} onChange={handlerChangeSearch} placeholder='Search for name' />
                <button onClick={hanlderSearch}><GiMagnifyingGlass /></button>

                {search !== '' &&
                    <ul className='nav__game-list'>
                        {listSearch?.slice(0, 7).map(listSearch => (
                            <li className='nav__game-item'>
                                <div className='nav__game-img'>
                                    <img src={listSearch.background_image} alt="" />
                                </div>
                                <div className='nav__game-name'>
                                    <Link to={`/catalog/${listSearch.id}`} onClick={() => setSearch('')}>{listSearch.name}</Link>
                                </div>
                            </li>
                        ))}
                    </ul>
                }
            </div>
        </nav>
    );
}
