import { Link } from 'react-router-dom'
import { MdStarRate } from 'react-icons/md'
import { SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";

import './style.scss';
import CardGame from '../card-game';

export default function GameList({ games }) {

  return (
    <SplideSlide>
      <CardGame games={games} />
    </SplideSlide >
  );
};
