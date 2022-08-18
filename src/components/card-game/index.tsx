import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { addInFavorites, removeInFavorites } from "../../store/my-favorite/my-favorite.store";
import { RootState } from "../../store/store";

import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import './style.scss'

import { useEffect, useState } from "react";
import moment from "moment";

export default function CardGame({ games }) {
    const { background_image, name, id, metacritic, released } = games;
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
                    id: id,
                    name: name,
                    background_image: background_image,
                    metacritic: metacritic,
                    released: released
                })
            );
            setFvActive(true)
        }
    };

    useEffect(() => {
        FavoritesGames.forEach(favorite => favorite.id === games.id ? setFvActive(true) : null)
    }, []);

    return (
        <div className='gamelist'>
            <div className='gamelist__content-img'>
                <img className='gamelist__img' src={background_image} alt={`game ${name}`} />
            </div>
            <div className='gamelist__info'>
                <span className={`${Number(metacritic) > 50 ? 'green' : 'red'} gamelist__info-rating`}>{metacritic}</span>
                <div className="gamelist__flex">
                    <p className='gamelist__info-name'><Link to={`/catalog/${id}`}>{name}</Link></p>

                    <div className="gamelist__info-favorite" onClick={() => handleFavorites()} >
                        {fvActive ? <MdFavorite className="gamelist__info-favorite-icon" /> : <MdFavoriteBorder />}
                    </div>
                </div>

                <div className="gamelist__date">
                    <span className="gamelist__date-released">{moment(released).format("MMM Do YY")}</span>
                </div>
            </div>
        </div>
    );
}
