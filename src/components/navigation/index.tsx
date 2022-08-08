import * as React from 'react';
import './style.scss'
import { Link, useNavigate } from 'react-router-dom';
import { GiMagnifyingGlass } from 'react-icons/gi'
import { api } from '../../service/api/api';
import { Games } from '../../types/games';

export default function Navigation() {
    const [search, setSearch] = React.useState('');
    const [listSearch, setListSearch] = React.useState<Games[] | null>(null);
    const navigator = useNavigate()

    const handlerChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
    };

    const hanlderSearch = () => {
        navigator(`search/${search}`)
        setSearch('')
    };

    React.useEffect(() => {
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
            <div className='nav__input__box'>
                <input type="text" value={search} onChange={handlerChangeSearch} placeholder='Search for name' />
                <button onClick={hanlderSearch}><GiMagnifyingGlass /></button>

                {search !== '' &&
                    <div className='nav__game-list'>
                        {listSearch?.slice(0, 7).map(listSearch => (
                            <div className='nav__game-item'>
                                <div className='nav__game-img'>
                                    <img src={listSearch.background_image} alt="" />
                                </div>
                                <Link to={`/catalog/${listSearch.id}`} onClick={() => setSearch('')}>{listSearch.name}</Link>
                            </div>
                        ))}
                    </div>
                }
            </div>
        </nav>
    );
}
