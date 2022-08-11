import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { addInFavorites, removeInFavorites } from "../../store/my-favorite/my-favorite.store";
import { RootState } from "../../store/store";

import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import './style.scss'

import { useEffect, useState } from "react";

export default function CardGame({ games }) {
    const { background_image, name, id, metacritic } = games;
    const FavoritesGames = useSelector((state: RootState) => state.favorites.favorite);
    const [fvActive, setFvActive] = useState(false);

    const dispatch = useDispatch();

    const handleFavorites = () => {
        if (fvActive) {
            dispatch(removeInFavorites(games))
            setFvActive(false)
        } else {
            dispatch(
                addInFavorites({
                    id: games.id,
                    name: games.name,
                    background_image: games.background_image,
                    metacritic: games.metacritic,
                    genres: games.genres,
                })
            );
            setFvActive(true)
        }
    };

    useEffect(() => {
        FavoritesGames.forEach(favorite => favorite.id === games.id ? setFvActive(true) : null)
    }, [])

    return (
        <div className='gamelist'>
            <div className='gamelist__content-img'>
                <img className='gamelist__img' src={background_image} alt={`game ${name}`} />
            </div>
            <div className='gamelist__info'>
                <span className={`${Number(metacritic) > 50 ? 'green' : 'red'} gamelist__info-rating`}>{metacritic}</span>
                <p className='gamelist__info-name'><Link replace={true} to={`/catalog/${id}`}>{name}</Link></p>
                <ul className='gamelist__genres-list'>
                    {games.genres.map((genres) => (
                        <li key={genres.id} className='gamelist__genres-item'>
                            <span>{genres.name}</span>
                        </li>
                    ))}
                </ul>

                <div className="gamelist__favorite" onClick={() => handleFavorites()} >
                    {fvActive ? <MdFavorite color="red" /> : <MdFavoriteBorder color="red" />}
                </div>
            </div>
        </div>
    );
}
