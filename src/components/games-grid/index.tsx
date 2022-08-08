import { MdStarRate } from 'react-icons/md';
import { Link } from 'react-router-dom';
import './style.scss';
import { Games } from '../../types/games'

type TGames = {
    games: Games
};

export default function GameGrid({ games }: TGames) {
    const { background_image, metacritic, name, id } = games;

    return (
        <li className='gamegrid'>
            <div className='gamegrid__img'>
                <Link to={`catalog/${id}`}>
                    <img className='gamegrid__img-content' src={background_image} alt={`game ${name}`} />
                </Link>
            </div>

            <div className='gamegrid__info'>
                <p className='gamegrid__info-name'>{name}</p>
                <ul className='gamegrid__genres-list'>
                    {games.genres.map((genres) => (
                        <li key={genres.id} className='gamegrid__genres-item'>
                            <span>{genres.name}</span>
                        </li>
                    ))}
                </ul>
            </div>
            <span className={`${Number(metacritic) > 50 ? 'green' : 'red'} gamegrid__info-metacritic`}>{metacritic}</span>
        </li>
    );
};
