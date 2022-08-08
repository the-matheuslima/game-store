import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loading from "../../components/loading";
import { api } from "../../service/api/api";
import { Games } from "../../types/games";
import { genresList } from "../../utils/genres-list";
import './style.scss'
type Props = {};

export default function Catalog({ }: Props) {
    const [games, setGames] = useState<Games | null>(null);
    const [Loadinga, setLoadinga] = useState(false)
    const [genres, setGenres] = useState('');

    useEffect(() => {
        const getGames = async () => {
            const response = await api.getListGames();
            setGames(response.data.results);
            console.log(response.data);

        };
        getGames();
    }, []);

    useEffect(() => {
        try {
            const getGames = async () => {
                const response = await api.getListByGenres(genres);
                setGames(response.data.results);
                setLoadinga(true)
            };
            getGames();
        }
        catch (err) {
            console.log(err);
        }
        finally {
            setLoadinga(false)
        }
    }, [genres]);

    const getGenres = (e) => {
        setGenres(e)
    }

    return (
        <main className="catalog">
            <section className="catalog__genres">
                <div className="catalog__genres-list">
                    {genresList.map(genres => (
                        <p onClick={(e) => getGenres(genres.slug)}>{genres.name}</p>
                    ))}
                </div>
            </section>
            {Loadinga ?
                <>

                    <section className="catalog__games">
                        <ul className="catalog__list">
                            {games?.map((game) => (
                                <li className='gamelist'>
                                    <div className='gamelist__content-img'>

                                        <img className='gamelist__img' src={game.background_image} alt={`game ${game.name}`} />
                                    </div>
                                    <div className='gamelist__info'>
                                        <span className={`${Number(game.metacritic) > 50 ? 'green' : 'red'} gamelist__info-rating`}>{game.metacritic}</span>
                                        <p className='gamelist__info-name'><Link replace={true} to={`/catalog/${game.id}`}>{game.name}</Link></p>
                                        <ul className='gamelist__genres-list'>
                                            {/* {console.log(games)} */}
                                            {game.genres.map((genres) => (
                                                <li key={genres.id} className='gamelist__genres-item'>
                                                    <span>{genres.name}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </section>
                </> : <Loading />}
        </main>
    );
}
