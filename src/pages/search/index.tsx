import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import CardGame from "../../components/card-game";
import Loading from "../../components/loading";

import { api } from "../../service/api/api";
import { Games } from "../../types/games";

import './style.scss'

export default function Navigation() {
    const [searchParams] = useSearchParams();
    const [search, setsearch] = useState<Games[]>([]);

    useEffect(() => {
        const getSearch = async () => {
            const response = await api.getGamesBySearch(searchParams.get('q'));
            setsearch(response.data.results)
        }
        getSearch()
    }, [searchParams]);

    return (
        <main className="search">
            <section>
                {search ?
                    <ul className="search__list">
                        {search.map(game => (
                            <CardGame key={game.id} games={game} />
                        ))}
                    </ul>
                    : <Loading />}
            </section>
        </main>
    );
}
