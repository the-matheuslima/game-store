import { MdStarRate } from 'react-icons/md';
import { Link } from 'react-router-dom';
import './style.scss';
import { Games } from '../../types/games'

type TGames = {
    games: Games
};

export default function GameGrid({ games }: TGames) {
    console.log(games);

    const { background_image, rating, name, id } = games;

    return (
        <li className='gamegrid'>
            <div className='gamegrid__img'>
                <img className='gamegrid__img-content' src={background_image} alt={`game ${name}`} />
            </div>

            <div className='gamegrid__info'>
                <span className='gamegrid__info__rating'><MdStarRate color='white' />{rating} / 5</span>
                <p className='gamegrid__info__name'><Link to={`catalog/${id}`}>{name}</Link></p>
                <ul className='gamegrid__genres-list'>
                    {games.genres.map((genres) => (
                        <li key={genres.id} className='gamegrid__genres-item'>
                            <span>{genres.name}</span>
                        </li>
                    ))}
                </ul>
            </div>

        </li>
    );
};
