import React, { useEffect, useState } from "react";
import CardGame from "../../components/card-game";
import Loading from "../../components/loading";
import Filter from "../../components/filter";

import { api } from "../../service/api/api";
import { Games } from "../../types/games";

import { genresList } from "../../utils/genres-list";
import { useSearchParams } from "react-router-dom";
import './style.scss'

export default function Catalog() {
    type TFtleter = {
        ordering: string,
        genres: string
    }
    const [games, setGames] = useState<Games[]>([]);
    const [loader, setLoader] = useState(false);
    const [filterParams, setFilterParams] = useSearchParams();
    const [sortOrder, setSortOrder] = useState<TFtleter>({ ordering: '-metacritic', genres: 'action' });

    useEffect(() => {
        const getGames = async () => {
            const response = await api.getListGames();
            setGames(response.data.results);
        };
        getGames()
    }, []);

    useEffect(() => {
        try {
            const getGamesByFilter = async () => {
                const response = await api.getGameByFilters(sortOrder.genres, sortOrder.ordering);
                setGames(response.data.results);
                setLoader(true);
            };
            getGamesByFilter();
        }
        catch (err) {
            console.log(err);
        }
        finally {
            setLoader(false)
        }
    }, [sortOrder.genres, sortOrder.ordering]);

    const getGenres = (slug: string) => {
        setSortOrder({ ...sortOrder, genres: slug });
        setFilterParams({ ...sortOrder, genres: slug })
    }

    const getFilterOrdering = (filter: string) => {
        setSortOrder({ ...sortOrder, ordering: filter });
        setFilterParams({ ...sortOrder, ordering: filter })
    }

    return (
        <main className="catalog">
            <section className="catalog__genres">
                <ul className="catalog__genres-list">
                    {genresList.map((genres, i) => (
                        <li className="catalog__genres-item" key={i} onClick={() => getGenres(genres.slug)}>{genres.name}</li>
                    ))}
                </ul>

                <div>
                    <h2 className="catalog__title">{sortOrder.genres}</h2>
                    <Filter handlerFilterOrdering={getFilterOrdering} />
                </div>
            </section>

            {loader ?
                <section className="catalog__games">
                    <ul className="catalog__list">
                        {games.map((game) => (
                            <CardGame key={game.id} games={game} />
                        ))}
                    </ul>
                </section>
                : <Loading />}
        </main>
    );
}
