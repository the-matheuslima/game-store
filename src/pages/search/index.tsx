import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CardGame from "../../components/card-game";
import Filter from "../../components/filter";
import Loading from "../../components/loading";
import { api } from "../../service/api/api";
import { Games } from "../../types/games";
import './style.scss'

export default function Navigation() {
    const { id } = useParams()
    const [search, setsearch] = useState<Games[] | null>(null);

    useEffect(() => {
        const getSearch = async () => {
            const response = await api.getGamesBySearch(id);
            setsearch(response.data.results)
        }
        getSearch()
    }, [id]);


    return (
        <main className="search">
            <section>
                {search ?
                    <ul className="search__list">
                        {search?.map(game => (
                            <CardGame games={game} />
                        ))}
                    </ul>
                    : <Loading />}
            </section>
        </main>
    );
}
