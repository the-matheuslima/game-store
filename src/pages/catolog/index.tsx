import React, { useEffect, useState } from "react";
import CardGame from "../../components/card-game";
import Loading from "../../components/loading";
import Filter from "../../components/filter";

import { api } from "../../service/api/api";
import { Games } from "../../types/games";

import { genresList } from "../../utils/genres-list";
import './style.scss'

export default function Catalog() {
    const [games, setGames] = useState<Games | null>(null);
    const [loader, setLoader] = useState(false);
    const [genres, setGenres] = useState('action');
    const [sortOrder, setSortOrder] = useState({ filter: 'popularity', name: 'Popularity' });

    useEffect(() => {
        const getGames = async () => {
            const response = await api.getListGames();
            setGames(response.data.results);
        };
        getGames()
    }, []);

    useEffect(() => {
        try {
            const getGames = async () => {
                const response = await api.getGameByFilters(genres, sortOrder.filter);
                setGames(response.data.results);
                setLoader(true)
            };
            getGames();
        }
        catch (err) {
            console.log(err);
        }
        finally {
            setLoader(false)
        }
    }, [genres, sortOrder]);

    const getGenres = (slug: string) => {
        setGenres(slug)
    }

    const handlerFilterOrder = (filter: string, name: string) => {
        setSortOrder({ filter: filter, name: name });
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
                    <h2 className="catalog__title">{genres}</h2>
                    <Filter handlerFilterOrder={handlerFilterOrder} orderName={sortOrder.name} />
                </div>
            </section>

            {loader ?
                <section className="catalog__games">
                    <ul className="catalog__list">
                        {games?.map((game) => (
                            <CardGame key={game.id} games={game} />
                        ))}
                    </ul>
                </section>
                : <Loading />}
        </main>
    );
}
