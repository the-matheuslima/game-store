import { Link } from 'react-router-dom'
import { MdStarRate } from 'react-icons/md'
import { SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";

import './style.scss';

export default function GameList({ games }) {
  const { background_image, rating, name, id } = games;

  return (
    <SplideSlide>
      <li className='gamelist'>
        <img className='gamelist__img' src={background_image} alt={`game ${name}`} />
        <div className='gamelist__info'>
          <span className='gamelist__info__rating'><MdStarRate color='white' />{rating} / 5</span>
          <p className='gamelist__info__name'><Link replace={true} to={`/catalog/${id}`}>{name}</Link></p>
          <ul className='gamelist__genres-list'>
            {games.genres.map((genres) => (
              <li key={genres.id} className='gamelist__genres-item'>
                <span>{genres.name}</span>
              </li>
            ))}
          </ul>
        </div>
      </li>
    </SplideSlide >
  );
};
