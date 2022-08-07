import * as React from 'react';
import './style.scss'
import { useNavigate } from 'react-router-dom';
import { GiMagnifyingGlass } from 'react-icons/gi'

export default function Navigation() {
    const [search, setSearch] = React.useState('');
    const navigator = useNavigate()

    const handlerChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
    };

    const hanlderSearch = () => {
        navigator(`search/${search}`)
    };

    return (
        <nav className='nav'>
            <div className='nav__input__box'>
                <input type="text" value={search} onChange={handlerChangeSearch} placeholder='Search for name' />
                <button onClick={hanlderSearch}><GiMagnifyingGlass /></button>
            </div>
        </nav>
    );
}
